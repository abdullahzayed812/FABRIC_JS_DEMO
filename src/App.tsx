import React, { useState, useEffect, useRef } from "react";
import { Canvas, Textbox, FabricObject, util, loadSVGFromString } from "fabric";
import TextEditor from "./components/TextEditor";
import BackgroundUploader from "./components/BackgroundUploader";
import ToolsPanel from "./components/ToolsPanel";
import CanvasContainer from "./components/CanvasContainer";
import Header from "./components/Header";

const App: React.FC = () => {
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [selectedObject, setSelectedObject] = useState<FabricObject | null>(null);
  const [canvasWidth, setCanvasWidth] = useState<number>(1080);
  const [canvasHeight, setCanvasHeight] = useState<number>(1080);
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
    canvas.renderAll();
  };

  const updateTextProperties = (properties: Partial<Textbox>): void => {
    if (!canvas || !selectedObject || selectedObject.type !== "textbox") return;

    const textbox = selectedObject as Textbox;

    Object.entries(properties).forEach(([prop, value]) => {
      textbox.set(prop as keyof Textbox, value);
    });

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
              canvasWidth={canvasWidth}
              canvasHeight={canvasHeight}
              setCanvasWidth={setCanvasWidth}
              setCanvasHeight={setCanvasHeight}
            />

            <BackgroundUploader addSvgBackground={addSvgBackground} />

            {selectedObject && selectedObject.type === "textbox" && (
              <TextEditor selectedObject={selectedObject as Textbox} updateTextProperties={updateTextProperties} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
