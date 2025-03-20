interface ToolsPanelProps {
  addText: () => void;
  canvasWidth: number;
  canvasHeight: number;
  setCanvasWidth: (width: number) => void;
  setCanvasHeight: (height: number) => void;
}

const ToolsPanel: React.FC<ToolsPanelProps> = ({
  addText,
  canvasWidth,
  canvasHeight,
  setCanvasWidth,
  setCanvasHeight,
}) => {
  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h2 className="font-bold text-lg border-b pb-2">Tools</h2>

      <div>
        <button onClick={addText} className="w-full bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded">
          Add Text
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
              onChange={(e) => setCanvasWidth(parseInt(e.target.value) || 100)}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-xs">Height</label>
            <input
              type="number"
              value={canvasHeight}
              onChange={(e) => setCanvasHeight(parseInt(e.target.value) || 100)}
              className="w-full border rounded px-2 py-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsPanel;
