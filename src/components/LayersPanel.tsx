import { useCanvasContext } from "../context/canvasContext";
import { EyeOff, MoveUp, MoveDown } from "lucide-react";

export const LayersPanel = () => {
  const { layers, selectedLayer, selectLayerInCanvas, moveSelectedLayer } =
    useCanvasContext();

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h3 className="font-bold text-lg border-b pb-2">Layers</h3>

      <div className="flex items-center gap-4">
        <button
          className="bg-gray-100 disabled:bg-gray-700 hover:bg-gray-200 py-2 px-4 rounded"
          onClick={() => moveSelectedLayer("UP")}
          disabled={!selectedLayer || layers[0].id === selectedLayer}
        >
          <MoveUp />
        </button>
        <button
          className="bg-gray-100 disabled:bg-gray-700 hover:bg-gray-200 py-2 px-4 rounded"
          onClick={() => moveSelectedLayer("DOWN")}
          disabled={
            !selectedLayer || layers[layers.length - 1].id === selectedLayer
          }
        >
          <MoveDown />
        </button>
      </div>
      <ul className="flex flex-col space-y-2">
        {layers.map((layer, index) => (
          <li
            key={index}
            className={`flex items-center space-x-4 p-2 ${
              layer.id === selectedLayer ? "bg-blue-100" : ""
            }`}
            onClick={() => selectLayerInCanvas(layer.id!)}
          >
            <span className="font-bold">{`${layer.type} (${layer.zIndex})`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
