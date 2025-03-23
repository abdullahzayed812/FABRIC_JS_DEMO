import {
  Canvas,
  Rect,
  Circle,
  FabricObject,
  Textbox,
  loadSVGFromString,
  util,
  FabricObjectProps,
  SerializedObjectProps,
  ObjectEvents,
} from "fabric";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface CanvasContextType {
  canvas: Canvas | null;
  canvasRef: React.RefObject<HTMLCanvasElement | null> | null;
  layers: FabricObject[];
  selectedObject: FabricObject | null;
  setSelectedObject: Dispatch<SetStateAction<FabricObject | null>>;
  canvasWidth: number;
  canvasHeight: number;
  setCanvasWidth: Dispatch<SetStateAction<number>>;
  setCanvasHeight: Dispatch<SetStateAction<number>>;
  addText: () => void;
  addRectangle: () => void;
  addCircle: () => void;
  addSvgBackground: (svgString: string) => void;
  updateTextProperties: (properties: Partial<Textbox>) => void;
  toggleVisibility: (object: FabricObject) => void;
  exportCanvas: () => void;
}

// Create context with default values
export const CanvasContext = createContext<CanvasContextType>({
  canvas: null,
  canvasRef: null,
  layers: [],
  selectedObject: null,
  setSelectedObject: () => {},
  canvasWidth: 800,
  canvasHeight: 800,
  setCanvasWidth: () => {},
  setCanvasHeight: () => {},
  addText: () => {},
  addRectangle: () => {},
  addCircle: () => {},
  addSvgBackground: () => {},
  updateTextProperties: () => {},
  toggleVisibility: () => {},
  exportCanvas: () => {},
});

export const CanvasProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [selectedObject, setSelectedObject] = useState<FabricObject | null>(
    null
  );
  const [canvasWidth, setCanvasWidth] = useState<number>(800);
  const [canvasHeight, setCanvasHeight] = useState<number>(800);
  const [layers, setLayers] = useState<FabricObject[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvas) {
      canvas.dispose();
    }

    if (!canvasRef.current) return;

    const initCanvas = new Canvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: "#ffffff",
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

  const updateLayers = () => {
    if (!canvas) return;
    setLayers(canvas.getObjects());
  };

  const addText = (): void => {
    if (!canvas) return;

    const text = new Textbox("Edit This Text", {
      left: 100,
      top: 100,
      width: 200,
      fontFamily: "Arial",
      fontSize: 30,
      fill: "#000000",
      padding: 10,
      borderColor: "#000000",
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.requestRenderAll();
    updateLayers();
  };

  const addRectangle = (): void => {
    if (!canvas) return;

    const rect = new Rect({
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      fill: "#f00",
    });

    canvas.add(rect);
    canvas.setActiveObject(rect);
    canvas.requestRenderAll();
    updateLayers();
  };

  const addCircle = (): void => {
    if (!canvas) return;

    const circle = new Circle({
      left: 100,
      top: 100,
      radius: 50,
      fill: "#00f",
    });

    canvas.add(circle);
    canvas.setActiveObject(circle);
    canvas.requestRenderAll();
    updateLayers();
  };

  const addSvgBackground = async (svgString: string): Promise<void> => {
    if (!canvas) return;

    const result = await loadSVGFromString(svgString);
    const { objects, options } = result;

    const filteredObjects = objects.filter(
      (
        obj
      ): obj is FabricObject<
        Partial<FabricObjectProps>,
        SerializedObjectProps,
        ObjectEvents
      > => obj !== null
    );

    const svgObject = util.groupSVGElements(filteredObjects, options);

    svgObject.set({
      left: 100,
      top: 100,
      scaleX: 0.5,
      scaleY: 0.5,
    });

    canvas.add(svgObject);
    canvas.requestRenderAll();
    updateLayers();
  };

  const updateTextProperties = (properties: Partial<Textbox>): void => {
    if (!canvas || !selectedObject || selectedObject.type !== "textbox") return;

    const textbox = selectedObject as Textbox;

    Object.entries(properties).forEach(([prop, value]) => {
      if (prop === "x") {
        textbox.setX(+value!);
      } else if (prop === "y") {
        textbox.setY(+value!);
      } else {
        textbox.set(prop as keyof Textbox, value);
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

    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
      multiplier: 1,
    });

    const link = document.createElement("a");
    link.download = "canvas-design.png";
    link.href = dataURL;
    link.click();
  };
  return (
    <CanvasContext.Provider
      value={{
        canvas,
        canvasRef,
        layers,
        selectedObject,
        setSelectedObject,
        canvasWidth,
        setCanvasWidth,
        canvasHeight,
        setCanvasHeight,
        addText,
        addRectangle,
        addCircle,
        addSvgBackground,
        updateTextProperties,
        toggleVisibility,
        exportCanvas,
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
