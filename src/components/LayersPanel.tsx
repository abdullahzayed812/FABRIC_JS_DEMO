import { useCanvasContext } from "../context/canvasContext";
import { EyeOff, MoveUp, MoveDown } from "lucide-react";

export const LayersPanel = () => {
  const { layers, selectedLayer, selectLayerInCanvas, moveSelectedLayer } = useCanvasContext();

  const moveUpDisabled = !selectedLayer || layers[0].id === selectedLayer;
  const moveDownDisabled = !selectedLayer || layers[layers.length - 1].id === selectedLayer;

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h3 className="font-bold text-lg border-b pb-2">Layers</h3>

      <div className="flex items-center gap-4">
        <button
          className={`bg-gray-100 disabled:bg-gray-700 hover:bg-gray-200 py-2 px-4 rounded ${
            moveUpDisabled ? "cursor-not-allowed" : ""
          }`}
          onClick={() => moveSelectedLayer("UP")}
          disabled={moveUpDisabled}
        >
          <MoveUp />
        </button>
        <button
          className={`bg-gray-100 disabled:bg-gray-700 hover:bg-gray-200 py-2 px-4 rounded ${
            moveDownDisabled ? "cursor-not-allowed" : ""
          }`}
          onClick={() => moveSelectedLayer("DOWN")}
          disabled={moveDownDisabled}
        >
          <MoveDown />
        </button>
      </div>
      <ul className="flex flex-col space-y-2">
        {layers.map((layer, index) => (
          <li
            key={index}
            className={`flex items-center space-x-4 p-2 ${layer.id === selectedLayer ? "bg-blue-100" : ""}`}
            onClick={() => selectLayerInCanvas(layer.id!)}
          >
            <span className="font-bold">{`${layer.type} (${layer.zIndex})`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
