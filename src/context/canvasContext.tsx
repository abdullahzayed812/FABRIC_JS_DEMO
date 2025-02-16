import { Canvas } from "fabric";
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
  setCanvas: Dispatch<SetStateAction<Canvas | null>>;
}

// Create context with default values
export const CanvasContext = createContext<CanvasContextType>({
  canvas: null,
  canvasRef: null,
  setCanvas: () => null,
});

export const CanvasProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
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

  return (
    <CanvasContext.Provider value={{ canvas, canvasRef, setCanvas }}>
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
