import { FabricShapeGenerator } from "./ShapeGenerator";
import { RectangleHorizontal, Circle, TextCursor, ChartSpline } from "lucide-react";
import { useCanvasContext } from "../context/canvasContext";

export const CreateShapes = () => {
  const { canvas } = useCanvasContext();

  const fabricShapeGenerator = new FabricShapeGenerator(canvas);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <button
        onClick={() => fabricShapeGenerator.createText()}
        className=" bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded"
      >
        <TextCursor />
      </button>
      <button
        onClick={() => fabricShapeGenerator.createRectangle()}
        className=" bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded"
      >
        <RectangleHorizontal />
      </button>
      <button
        onClick={() => fabricShapeGenerator.createCircle()}
        className=" bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded"
      >
        <Circle />
      </button>
      <button
        onClick={() => fabricShapeGenerator.createLine([200, 200, 350, 250])}
        className=" bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded"
      >
        <ChartSpline />
      </button>
      <button
        onClick={() =>
          fabricShapeGenerator.createPolygon(
            [
              { x: 0, y: 0 },
              { x: 50, y: 30 },
              { x: 40, y: 70 },
              { x: 10, y: 70 },
            ],
            { left: 200, top: 200 }
          )
        }
        className=" bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded"
      >
        Poly
      </button>

      <button
        onClick={() => fabricShapeGenerator.createRegularPolygon({ left: 50, top: 350, sides: 6 })}
        className=" bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded"
      >
        Reg Poly
      </button>
      <button
        onClick={() => fabricShapeGenerator.createEditableCurve()}
        className=" bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded"
      >
        Path
      </button>
      <button
        onClick={() =>
          fabricShapeGenerator.createEditablePolygon([
            { x: 100, y: 100 },
            { x: 150, y: 50 },
            { x: 200, y: 100 },
            { x: 175, y: 150 },
            { x: 125, y: 150 },
          ])
        }
        className=" bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded"
      >
        Ed Poly
      </button>
      <button
        onClick={() => fabricShapeGenerator.createGradientRectangle()}
        className=" bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded"
      >
        Gradient
      </button>
    </div>
  );
};
