import { Canvas, Rect, Circle as FabricCircle, Polygon, Ellipse, Triangle as FabricTriangle, Line, Path } from "fabric";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useRef, useState } from "react";

interface CanvasContextType {
  canvas: Canvas | null;
  canvasRef: React.RefObject<HTMLCanvasElement | null> | null;
  setCanvas: Dispatch<SetStateAction<Canvas | null>>;
  addCanvasShape: ((shapeType: string) => void) | null;
}

// Create context with default values
export const CanvasContext = createContext<CanvasContextType>({
  canvas: null,
  canvasRef: null,
  setCanvas: () => null,
  addCanvasShape: null,
});

export const CanvasProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        width: 500,
        height: 500,
      });

      initCanvas.backgroundColor = "#FFF";
      initCanvas.renderAll();

      setCanvas(initCanvas);

      return () => {
        initCanvas.dispose();
      };
    }
  }, []);

  const addCanvasShape = (shapeType: string) => {
    let shape;

    switch (shapeType) {
      case "rect":
        shape = new Rect({
          left: 100,
          top: 100,
          width: 150,
          height: 150,
          fill: "blue",
        });
        break;
      case "circle":
        shape = new FabricCircle({
          left: 100,
          top: 100,
          radius: 75,
          fill: "green",
        });
        break;
      case "triangle":
        shape = new FabricTriangle({
          left: 100,
          top: 100,
          width: 150,
          height: 150,
          fill: "red",
        });
        break;
      case "line":
        shape = new Line([100, 100, 200, 200], {
          stroke: "purple",
          strokeWidth: 5,
        });
        break;
      case "polygon":
        shape = new Polygon(
          [
            { x: 100, y: 100 },
            { x: 150, y: 50 },
            { x: 200, y: 100 },
            { x: 150, y: 150 },
          ],
          {
            fill: "orange",
            stroke: "black",
            strokeWidth: 2,
          }
        );
        break;
      case "path":
        shape = new Path("M 100 100 Q 200 200, 100 300", {
          fill: "transparent",
          stroke: "black",
          strokeWidth: 5,
        });
        break;
      case "ellipse":
        shape = new Ellipse({
          left: 100,
          top: 100,
          rx: 100,
          ry: 60,
          fill: "pink",
        });
        break;
      case "star":
        shape = new Polygon(
          [
            { x: 200, y: 50 },
            { x: 220, y: 90 },
            { x: 270, y: 90 },
            { x: 230, y: 130 },
            { x: 250, y: 170 },
            { x: 200, y: 150 },
            { x: 150, y: 170 },
            { x: 170, y: 130 },
            { x: 130, y: 90 },
            { x: 180, y: 90 },
          ],
          {
            fill: "yellow",
            stroke: "black",
            strokeWidth: 2,
          }
        );
        break;
      default:
        break;
    }

    if (shape) {
      canvas?.add(shape);
      canvas?.renderAll();
    }

    console.log("Add canvas shape works...");
  };

  return (
    <CanvasContext.Provider value={{ canvas, canvasRef, setCanvas, addCanvasShape }}>{children}</CanvasContext.Provider>
  );
};

export const useCanvasContext = () => {
  const context = useContext(CanvasContext);

  if (!context) {
    throw new Error("Can't use canvas context..........");
  }

  return context;
};
