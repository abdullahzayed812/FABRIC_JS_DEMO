import React, { useState, useEffect, useRef } from "react";
import {
  Canvas,
  Textbox,
  FabricObject,
  util,
  loadSVGFromString,
  Rect,
  Circle,
} from "fabric";
import TextEditor from "./components/TextEditor";
import BackgroundUploader from "./components/BackgroundUploader";
import ToolsPanel from "./components/ToolsPanel";
import CanvasContainer from "./components/CanvasContainer";
import Header from "./components/Header";
import { LayersPanel } from "./components/LayersPanel";

const App: React.FC = () => {
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

    const svgObject = util.groupSVGElements(
      objects.filter((obj) => obj !== null),
      options
    );

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
      textbox.set(prop as keyof Textbox, value);
    });

    canvas.requestRenderAll();
  };

  const toggleVisibility = (object: FabricObject): void => {
    if (!canvas) return;

    const currentOpacity = object.get("opacity");
    object.set("opacity", currentOpacity === 1 ? 0 : 1); // toggle visibility
    canvas.requestRenderAll();
  };

  const moveObjectUp = (object: FabricObject): void => {
    if (!canvas) return;

    const index = canvas.getObjects().indexOf(object);
    if (index < canvas.getObjects().length - 1) {
      canvas.moveTo(object, index + 1); // Move the object up by increasing its index
      canvas.requestRenderAll();
      updateLayers();
    }
  };

  // Move the object one step down in the z-order
  const moveObjectDown = (object: FabricObject): void => {
    if (!canvas) return;

    const index = canvas.getObjects().indexOf(object);
    if (index > 0) {
      canvas.moveTo(object, index - 1); // Move the object down by decreasing its index
      canvas.requestRenderAll();
      updateLayers();
    }
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
    <div className="min-h-screen bg-gray-100">
      <Header exportCanvas={exportCanvas} />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-3/4">
            <CanvasContainer canvasRef={canvasRef} />
          </div>

          <div className="w-full md:w-1/4 space-y-4">
            <ToolsPanel
              addText={addText}
              addRectangle={addRectangle}
              addCircle={addCircle}
              canvasWidth={canvasWidth}
              canvasHeight={canvasHeight}
              setCanvasWidth={setCanvasWidth}
              setCanvasHeight={setCanvasHeight}
            />

            <BackgroundUploader addSvgBackground={addSvgBackground} />

            {selectedObject && selectedObject.type === "textbox" && (
              <TextEditor
                selectedObject={selectedObject as Textbox}
                updateTextProperties={updateTextProperties}
              />
            )}

            <LayersPanel
              layers={layers}
              moveObjectDown={moveObjectDown}
              moveObjectUp={moveObjectUp}
              toggleVisibility={toggleVisibility}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
