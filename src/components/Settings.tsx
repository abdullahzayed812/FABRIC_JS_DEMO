import { Canvas, FabricObject, TEvent, TPointerEvent } from "fabric";
import { useEffect, useState } from "react";

interface SettingsProps {
  canvas: Canvas;
}

export const Settings: React.FC<SettingsProps> = ({ canvas }) => {
  const [selectedObject, setSelectedObject] = useState(null);
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [diameter, setDiameter] = useState();
  const [color, setColor] = useState();

  useEffect(() => {
    if (canvas) {
      canvas.on("selection:created", (event) => {
        handleObjectSelection(event);
      });
    }
  }, [canvas]);

  const handleObjectSelection = (event: Partial<TEvent<TPointerEvent>>) => {
    console.log(event);
  };

  return <>Test</>;
};
