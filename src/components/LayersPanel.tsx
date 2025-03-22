import { FabricObject } from "fabric";

interface LayersPanelProps {
  layers: FabricObject[];
  toggleVisibility: (layer: FabricObject) => void;
  moveObjectUp: (layer: FabricObject) => void;
  moveObjectDown: (layer: FabricObject) => void;
}

export const LayersPanel: React.FC<LayersPanelProps> = ({
  layers,
  toggleVisibility,
  moveObjectDown,
  moveObjectUp,
}) => {
  return (
    <div>
      <h3>Layers</h3>
      <ul>
        {layers.map((layer, index) => (
          <li key={index}>
            <span>{`Layer ${index + 1}`}</span>
            <button onClick={() => toggleVisibility(layer)}>
              Toggle Visibility
            </button>
            <button onClick={() => moveObjectUp(layer)}>Move Up</button>
            <button onClick={() => moveObjectDown(layer)}>Move Down</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
