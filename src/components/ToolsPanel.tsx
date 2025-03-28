import { RectangleHorizontal, Circle, TextCursor, ChartSpline } from "lucide-react";
import { SVGUploader } from "./SVGUploader";
import { useCanvasContext } from "../context/canvasContext";
import { ImageUploader } from "./ImageUploader";
import { FabricShapeGenerator } from "./ShapeGenerator";

export const ToolsPanel = () => {
  const { canvas, canvasWidth, canvasHeight, setCanvasWidth, setCanvasHeight } = useCanvasContext();

  const fabricShapeGenerator = new FabricShapeGenerator(canvas);

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h2 className="font-bold text-lg border-b pb-2">Tools</h2>

      <SVGUploader />
      <ImageUploader />

      <div className="flex items-center gap-4">
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
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Canvas Size</label>
        <div className="flex gap-2">
          <div>
            <label className="block text-xs">Width</label>
            <input
              type="number"
              value={canvasWidth}
              onChange={(e) => setCanvasWidth(parseInt(e.target.value))}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-xs">Height</label>
            <input
              type="number"
              value={canvasHeight}
              onChange={(e) => setCanvasHeight(parseInt(e.target.value))}
              className="w-full border rounded px-2 py-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
