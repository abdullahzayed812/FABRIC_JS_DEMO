import { useCanvasContext } from "../context/canvasContext";
import { EyeOff, MoveUp, MoveDown } from "lucide-react";

export const LayersPanel = () => {
  const { layers, toggleVisibility, selectedLayer, selectLayerInCanvas } =
    useCanvasContext();

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h3 className="font-bold text-lg border-b pb-2">Layers</h3>
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
            <button
              className="bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded"
              onClick={() => toggleVisibility(layer)}
            >
              <EyeOff />
            </button>
            <button
              className="bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded"
              onClick={() => {}}
            >
              <MoveUp />
            </button>
            <button
              className="bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded"
              onClick={() => {}}
            >
              <MoveDown />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
