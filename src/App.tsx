import { Canvas, Circle, Rect } from "fabric";
import { useEffect, useRef, useState } from "react";
import { Toolbar } from "./components/Toolbar";
import { ToolbarButton } from "./components/Button";
import { Settings } from "./components/Settings";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, { width: 500, height: 500 });

      initCanvas.backgroundColor = "#FFF";
      initCanvas.renderAll();

      setCanvas(initCanvas);

      return () => {
        initCanvas.dispose();
      };
    }
  }, []);

  const addRectangle = () => {
    if (canvas) {
      const rect = new Rect({ top: 100, left: 100, width: 50, height: 50, fill: "#F0F" });
      canvas.add(rect);
    }
  };

  const addCircle = () => {
    if (canvas) {
      const rect = new Circle({ top: 100, left: 100, radius: 50, fill: "#FF0" });
      canvas.add(rect);
    }
  };

  return (
    <main className="bg-gray-300 h-full flex justify-center items-center">
      <Toolbar>
        <ToolbarButton text="Add Rectangle" onClick={addRectangle} />
        <ToolbarButton text="Add Circle" onClick={addCircle} />
      </Toolbar>
      <Settings canvas={canvas} />
      <canvas id="canvas" ref={canvasRef} />
    </main>
  );
}

export default App;
