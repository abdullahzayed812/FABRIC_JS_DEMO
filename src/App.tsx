// App.tsx
import React, { useState, useEffect, useRef } from "react";
import { Canvas, Textbox, FabricObject, util, loadSVGFromURL, Group } from "fabric";
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

  // Initialize canvas
  useEffect(() => {
    // Clean up any existing canvas
    if (canvas) {
      canvas.dispose();
    }

    if (!canvasRef.current) return;

    // Create new canvas with Fabric v6
    const initCanvas = new Canvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: "#ffffff",
    });

    // Set up event listeners
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

    // Cleanup function
    return () => {
      initCanvas.dispose();
    };
  }, [canvasWidth, canvasHeight]);

  // Add text to canvas
  const addText = (): void => {
    if (!canvas) return;

    // Create a new Textbox with Fabric.js v6
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

  // // Upload SVG as background
  const addSvgBackground = (svgUrl: string): void => {
    if (!canvas) return;

    loadSVGFromURL(svgUrl, (objects, options) => {
      console.log({ svgUrl, objects, options });
      const svgObject = util.groupSVGElements(objects, options);

      // Resize to fit canvas
      const scaleFactor = Math.min(canvasWidth / svgObject.width!, canvasHeight / svgObject.height!);

      svgObject.scale(scaleFactor);

      // Send to back
      canvas.add(svgObject);
      svgObject.sendToBack();
      canvas.requestRenderAll();
    });
  };

  // Update text properties
  const updateTextProperties = (properties: Record<string, any>): void => {
    if (!canvas || !selectedObject || selectedObject.type !== "textbox") return;

    Object.keys(properties).forEach((prop) => {
      (selectedObject as any).set(prop, properties[prop]);
    });

    canvas.requestRenderAll();
  };

  // Export canvas as image
  const exportCanvas = (): void => {
    if (!canvas) return;
    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
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
