import {
  Canvas,
  FabricObject,
  Textbox,
  loadSVGFromString,
  FabricObjectProps,
  SerializedObjectProps,
  ObjectEvents,
  FabricImage,
  Group,
} from "fabric";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useRef, useState } from "react";
import { CanvasSerializer } from "../components/CanvasSerializer";

interface CanvasContextType {
  canvas: Canvas | null;
  canvasRef: React.RefObject<HTMLCanvasElement | null> | null;
  layers: CustomFabricObject[];
  selectedLayer: string | null;
  selectedObject: FabricObject | null;
  setSelectedObject: Dispatch<SetStateAction<FabricObject | null>>;
  canvasWidth: number;
  canvasHeight: number;
  setCanvasWidth: Dispatch<SetStateAction<number>>;
  setCanvasHeight: Dispatch<SetStateAction<number>>;
  addSvgBackground: (svgString: string) => void;
  addImage: (image: string) => void;
  updateObjectProperties: (properties: Partial<Textbox>) => void;
  toggleVisibility: (object: FabricObject) => void;
  exportCanvas: () => void;
  addIdToObject: (object: any) => void;
  selectLayerInCanvas: (layerId: string) => void;
  moveSelectedLayer: (direction: "UP" | "DOWN" | "CLEAR") => void;
}

export interface CustomFabricObject extends FabricObject {
  id?: string;
  zIndex?: number;
  label?: string;
  tag?: string;
}

interface SVGShape {
  id: string;
  element: FabricObject;
  originalFill: string | undefined;
}

// Create context with default values
export const CanvasContext = createContext<CanvasContextType>({
  canvas: null,
  canvasRef: null,
  layers: [],
  selectedLayer: null,
  selectedObject: null,
  setSelectedObject: () => {},
  canvasWidth: 800,
  canvasHeight: 800,
  setCanvasWidth: () => {},
  setCanvasHeight: () => {},
  addSvgBackground: () => {},
  addImage: () => {},
  updateObjectProperties: () => {},
  toggleVisibility: () => {},
  exportCanvas: () => {},
  addIdToObject: () => {},
  selectLayerInCanvas: () => {},
  moveSelectedLayer: () => {},
});

export const CanvasProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [selectedObject, setSelectedObject] = useState<FabricObject | null>(null);
  const [canvasWidth, setCanvasWidth] = useState<number>(800);
  const [canvasHeight, setCanvasHeight] = useState<number>(800);
  const [layers, setLayers] = useState<CustomFabricObject[]>([]);
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const [extractedShapes, setExtractedShapes] = useState<SVGShape[]>([]);
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvas) {
      canvas.dispose();
    }

    if (!canvasRef.current) return;

    const initCanvas = new Canvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: "#FFFFFF",
    });

    initCanvas.on("selection:created", (e) => {
      if (e.selected && e.selected.length > 0) {
        setSelectedObject(e.selected[0]);
      }
    });

    initCanvas.on("selection:updated", (e) => {
      if (e.selected && e.selected.length > 0) {
        setSelectedObject(e.selected[0]);
      }
    });

    initCanvas.on("selection:cleared", () => {
      setSelectedObject(null);
    });

    setCanvas(initCanvas);

    return () => {
      initCanvas.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasWidth, canvasHeight]);

  useEffect(() => {
    if (canvas) {
      canvas.on("object:added", updateLayers);
      canvas.on("object:removed", updateLayers);
      canvas.on("object:modified", updateLayers);

      canvas.on("selection:created", handleObjectSelected);
      canvas.on("selection:updated", handleObjectSelected);
      canvas.on("selection:cleared", handleObjectSelected);

      updateLayers();

      return () => {
        canvas.off("object:added", updateLayers);
        canvas.off("object:removed", updateLayers);
        canvas.off("object:modified", updateLayers);
        canvas.off("selection:created", handleObjectSelected);
        canvas.off("selection:updated", handleObjectSelected);
        canvas.off("selection:cleared", () => setSelectedLayer(null));
      };
    }
  }, [canvas]);

  const addIdToObject = (object: CustomFabricObject) => {
    if (!object.id) {
      const timestamp = new Date().getTime();
      object.id = `${object.type}_${timestamp}`;
    }
  };

  const handleObjectSelected = (e: any) => {
    const selectedObject = e.selected ? e.selected[0] : null;

    if (selectedObject) {
      setSelectedLayer(selectedObject.id);
    } else {
      setSelectedLayer(null);
    }
  };

  const selectLayerInCanvas = (layerId: string) => {
    if (!canvas) return;

    const object = canvas.getObjects().find((obj: CustomFabricObject) => obj.id === layerId);

    if (object) {
      canvas.setActiveObject(object);
      canvas.requestRenderAll();
    }
  };

  const moveSelectedLayer = (direction: "UP" | "DOWN" | "CLEAR") => {
    if (!selectedLayer || !canvas) return;

    const objects = canvas.getObjects();
    const object = objects.find((obj: CustomFabricObject) => obj.id === selectedLayer);

    if (object) {
      const currentIndex = objects.indexOf(object);

      if (direction === "UP" && currentIndex < objects.length - 1) {
        const temp = objects[currentIndex];
        objects[currentIndex] = objects[currentIndex + 1];
        objects[currentIndex + 1] = temp;
      } else if (direction === "DOWN" && currentIndex > 0) {
        const temp = objects[currentIndex];
        objects[currentIndex] = objects[currentIndex - 1];
        objects[currentIndex - 1] = temp;
      }

      const backgroundColor = canvas.backgroundColor;

      canvas.clear();

      objects.forEach((obj) => canvas.add(obj));

      canvas.backgroundColor = backgroundColor;

      canvas.requestRenderAll();

      objects.forEach((obj: CustomFabricObject, index) => (obj.zIndex = index));

      canvas.setActiveObject(object);

      canvas.requestRenderAll();

      updateLayers();
    }
  };

  (Canvas.prototype as any).updateZIndices = function () {
    const objects = this.getObjects();
    objects.forEach((obj: any, index: number) => {
      addIdToObject(obj);
      obj.zIndex = index;
    });
  };

  const updateLayers = () => {
    if (!canvas) return;

    (canvas as any).updateZIndices();

    const objects = canvas
      .getObjects()
      .filter((obj: CustomFabricObject) => !(obj.id?.startsWith("vertical-") || obj.id?.startsWith("horizontal-")))
      .map((obj: CustomFabricObject) => ({
        id: obj.id,
        zIndex: obj.zIndex,
        type: obj.type,
      }));

    setLayers([...objects].reverse() as CustomFabricObject[]);
  };

  const addSvgBackground = async (svgString: string): Promise<void> => {
    if (!canvas) return;

    const result = await loadSVGFromString(svgString);
    const { objects, options } = result;

    const filteredObjects = objects.filter(
      (obj): obj is FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents> => obj !== null
    );

    const group = new Group(filteredObjects, options);

    group.set({
      left: 100,
      top: 100,
      scaleX: 0.5,
      scaleY: 0.5,
    });

    canvas.add(group);
    canvas.requestRenderAll();

    extractShapesFromSVG(filteredObjects);
  };

  const extractShapesFromSVG = (objects: FabricObject[]) => {
    const shapes: SVGShape[] = objects.map((obj, index) => {
      const id = `shape_${index}_${Date.now()}`;

      const originalFill = obj.fill?.toString();

      return {
        id,
        element: obj,
        originalFill,
      };
    });

    setExtractedShapes(shapes);
  };

  const addImage = async (image: string) => {
    if (!canvas) return;

    const imageObject = await FabricImage.fromURL(image);

    imageObject.set({
      left: 100,
      top: 100,
      scaleX: 0.5,
      scaleY: 0.5,
    });

    canvas.add(imageObject);
    canvas.requestRenderAll();
  };

  const updateObjectProperties = (properties: Partial<CustomFabricObject>): void => {
    if (!canvas || !selectedObject) return;

    Object.entries(properties).forEach(([prop, value]) => {
      if (prop === "x") {
        selectedObject.setX(+value!);
      } else if (prop === "y") {
        selectedObject.setY(+value!);
      } else {
        selectedObject.set(prop as keyof Textbox, value);
      }
    });

    canvas.requestRenderAll();
  };

  const toggleVisibility = (object: FabricObject): void => {
    if (!canvas) return;

    const currentOpacity = object.get("opacity");
    object.set("opacity", currentOpacity === 1 ? 0 : 1); // toggle visibility
    canvas.requestRenderAll();
  };

  const exportCanvas = (): void => {
    if (!canvas) return;

    const canvasSerializer = new CanvasSerializer(canvas);
    canvasSerializer.saveToLocalStorage();
  };

  return (
    <CanvasContext.Provider
      value={{
        canvas,
        canvasRef,
        layers,
        selectedLayer,
        selectedObject,
        setSelectedObject,
        canvasWidth,
        setCanvasWidth,
        canvasHeight,
        setCanvasHeight,
        addSvgBackground,
        addImage,
        updateObjectProperties,
        toggleVisibility,
        exportCanvas,
        addIdToObject,
        selectLayerInCanvas,
        moveSelectedLayer,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvasContext = () => {
  const context = useContext(CanvasContext);

  if (!context) {
    throw new Error("Can't use canvas context..........");
  }

  return context;
};
