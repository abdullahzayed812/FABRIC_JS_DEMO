import { SVGUploader } from "./SVGUploader";
import { useCanvasContext } from "../context/canvasContext";
import { ImageUploader } from "./ImageUploader";
import { CreateShapes } from "./CreateShapes";

export const ToolsPanel = () => {
  const { canvasWidth, canvasHeight, setCanvasWidth, setCanvasHeight } = useCanvasContext();

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h2 className="font-bold text-lg border-b pb-2">Tools</h2>

      <SVGUploader />
      <ImageUploader title="Developer Logo" />
      <ImageUploader title="Project Logo" />

      <CreateShapes />

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
