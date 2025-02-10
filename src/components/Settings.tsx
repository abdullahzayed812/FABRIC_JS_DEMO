import { Canvas, Circle, FabricObject, Rect, TFiller } from "fabric";
import React, { useEffect, useState } from "react";
import { Input } from "./Input";

interface SettingsProps {
  canvas: Canvas | null;
}

export const Settings: React.FC<SettingsProps> = ({ canvas }) => {
  const [selectedObject, setSelectedObject] = useState<FabricObject | null>(null);
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [diameter, setDiameter] = useState<string>("");
  const [color, setColor] = useState<string | TFiller | null>("");

  useEffect(() => {
    if (canvas) {
      canvas.on("selection:created", (event) => {
        handleObjectSelection(event.selected[0]);
      });
      canvas.on("selection:updated", (event) => {
        handleObjectSelection(event.selected[0]);
      });
      canvas.on("object:scaling", (event) => {
        handleObjectSelection(event.target);
      });
      canvas.on("selection:cleared", () => {
        clearSettings();
      });
    }
  }, [canvas]);

  useEffect(() => {
    updateObjectProperties();
  }, [width, height, diameter, color]);

  const updateObjectProperties = () => {
    if (selectedObject && canvas) {
      if (selectedObject.type === "rect") {
        const rect = selectedObject as Rect;
        if (width && !isNaN(Number(width))) rect.set({ width: Number(width) });
        if (height && !isNaN(Number(height))) rect.set({ height: Number(height) });
        if (color) rect.set({ fill: color });
      } else if (selectedObject.type === "circle") {
        const circle = selectedObject as Circle;
        if (diameter && !isNaN(Number(diameter))) circle.set({ radius: Number(diameter) });
        if (color) circle.set({ fill: color });
      }
      canvas.renderAll();
    }
  };

  const handleObjectSelection = (object: FabricObject | null) => {
    if (!object) return;

    setSelectedObject(object);

    if (object?.type === "rect") {
      setWidth(Math.round(object?.width * object?.scaleX).toString());
      setHeight(Math.round(object?.height * object?.scaleY).toString());
      setColor(object?.fill);
      setDiameter("");
    } else if (object?.type === "circle") {
      const circle = object as Circle;
      setColor(circle?.fill);
      setDiameter(circle?.radius.toString());
      setHeight("");
      setWidth("");
    }
  };

  const clearSettings = () => {
    setWidth("");
    setHeight("");
    setDiameter("");
    setColor("");
  };

  return (
    <section className="fixed top-[50%] translate-x-[50%] left-0 bg-gray-800 p-3 rounded-lg">
      {selectedObject ? (
        <section className="flex flex-col">
          <Input value={width} setValue={setWidth} />
          <Input value={height} setValue={setHeight} />
          <Input value={diameter} setValue={setDiameter} />
          <Input value={color?.toString() ?? ""} setValue={setColor} />
        </section>
      ) : null}
    </section>
  );
};
