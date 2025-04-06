import React, { useEffect, useState } from "react";
import { useCanvasContext } from "../context/canvasContext";
import { Circle, Textbox, TFiller } from "fabric";

const fontFamilies = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Courier New",
  "Georgia",
  "Trebuchet MS",
  "Verdana",
  "Impact",
];

interface PropertiesType {
  content: string;
  width: string;
  height: string;
  x: string;
  y: string;
  fontSize: string;
  strokeWidth: number;
  stroke: string | TFiller;
  backgroundColor: string;
  fill: string | TFiller;
  radius: number;
  label?: string;
  tag?: string;
}

export const PropertiesPanel = () => {
  const { selectedObject, updateObjectProperties } = useCanvasContext();

  const isTextbox = selectedObject instanceof Textbox;
  const isCircle = selectedObject instanceof Circle;

  const [properties, setProperties] = useState<PropertiesType>({
    content: "",
    width: "",
    height: "",
    x: "",
    y: "",
    fontSize: "",
    strokeWidth: 0,
    stroke: "",
    backgroundColor: "",
    fill: "",
    radius: 0,
    label: "",
    tag: "",
  });

  useEffect(() => {
    setProperties({
      content: isTextbox ? selectedObject?.text : "",
      width: Math.round(selectedObject?.width || 0).toString() || "",
      height: Math.round(selectedObject?.height || 0).toString() || "",
      x: Math.round(selectedObject?.getX() || 0).toString() || "",
      y: Math.round(selectedObject?.getY() || 0).toString() || "",
      fontSize: isTextbox ? selectedObject.fontSize.toString() : "",
      strokeWidth: selectedObject?.strokeWidth || 0,
      stroke: selectedObject?.stroke || "",
      backgroundColor: selectedObject?.backgroundColor || "",
      fill: selectedObject?.fill || "",
      radius: isCircle ? selectedObject.radius : 0,
      label: isTextbox && "label" in selectedObject ? (selectedObject as any).label : "",
      tag: isTextbox && "tag" in selectedObject ? (selectedObject as any).tag : "",
    });
  }, [selectedObject, isTextbox, isCircle]);

  const handlePropertiesChange = (prop: string, value: string) => {
    setProperties((prev) => ({ ...prev, [prop]: value }));
  };

  const updateText = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    handlePropertiesChange("content", e.target.value);
    updateObjectProperties({ text: e.target.value });
  };

  const handleInputChange = (propType: string, value: string) => {
    handlePropertiesChange(propType, value);
    updateObjectProperties({ [propType]: parseInt(value) });
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h2 className="font-bold text-lg border-b pb-2">Properties Panel</h2>

      {isTextbox ? (
        <>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Text Content</label>
            <textarea
              value={properties.content}
              onChange={updateText}
              className="w-full border rounded px-2 py-1 h-20"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Label</label>
            <input
              type="text"
              value={properties.label}
              onChange={(e) => handleInputChange("label", e.target.value)}
              className="w-full rounded p-2 border"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Tag</label>
            <input
              type="text"
              value={properties.tag}
              onChange={(e) => handleInputChange("tag", e.target.value)}
              className="w-full rounded p-2 border"
            />
          </div>
        </>
      ) : null}

      <div className="space-y-2">
        {!isCircle ? (
          <div className="flex gap-2">
            <div>
              <label className="block text-sm mb-2">Width</label>
              <input
                type="number"
                value={properties.width}
                onChange={(e) => handleInputChange("width", e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Height</label>
              <input
                type="number"
                value={properties.height}
                onChange={(e) => handleInputChange("height", e.target.value)}
                className="w-full border rounded px-2 py-1"
              />
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-sm mb-2">Radius</label>
            <input
              type="number"
              value={properties.radius}
              onChange={(e) => handleInputChange("radius", e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex gap-2">
          <div>
            <label className="block text-sm mb-2">X</label>
            <input
              type="number"
              value={properties.x}
              onChange={(e) => handleInputChange("x", e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Y</label>
            <input
              type="number"
              value={properties.y}
              onChange={(e) => handleInputChange("y", e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>
        </div>
      </div>

      {isTextbox ? (
        <div className="space-y-2">
          <label className="block text-sm font-medium">Font Family</label>
          <select
            value={selectedObject?.fontFamily}
            onChange={(e) => updateObjectProperties({ fontFamily: e.target.value })}
            className="w-full border rounded px-2 py-1"
          >
            {fontFamilies.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      {isTextbox ? (
        <div className="space-y-2">
          <label className="block text-sm font-medium">Font Size</label>
          <input
            type="number"
            value={properties.fontSize}
            onChange={(e) => handleInputChange("fontSize", e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-2">
        {isTextbox ? (
          <div className="space-y-2">
            <label className="block text-sm font-medium">Text Color</label>
            <input
              type="color"
              value={properties.fill as string}
              onChange={(e) => updateObjectProperties({ fill: e.target.value })}
              className="w-full h-8 border rounded"
            />
          </div>
        ) : null}

        {!isTextbox ? (
          <div className="space-y-2">
            <label className="block text-sm font-medium">Stroke Color</label>
            <input
              type="color"
              value={properties.stroke as string}
              onChange={(e) => updateObjectProperties({ stroke: e.target.value })}
              className="w-full h-8 border rounded"
            />
          </div>
        ) : null}

        <div className="space-y-2">
          <label className="block text-sm font-medium">Background</label>
          <input
            type="color"
            value={properties.backgroundColor}
            onChange={(e) => {
              const prop = isTextbox ? "backgroundColor" : "fill";
              updateObjectProperties({ [prop]: e.target.value });
            }}
            className="w-full h-8 border rounded"
          />
        </div>
      </div>

      <div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Stroke Width</label>
          <input
            type="number"
            value={properties.strokeWidth}
            onChange={(e) => handleInputChange("strokeWidth", e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>
      </div>

      {isTextbox ? (
        <div className="space-y-2">
          <label className="block text-sm font-medium">Text Style</label>
          <div className="flex space-x-2">
            <button
              onClick={() =>
                updateObjectProperties({
                  fontWeight: selectedObject?.fontWeight === "bold" ? "normal" : "bold",
                })
              }
              className={`px-3 py-1 border rounded ${
                selectedObject?.fontWeight === "bold" ? "bg-gray-300" : "bg-white"
              }`}
            >
              B
            </button>
            <button
              onClick={() =>
                updateObjectProperties({
                  fontStyle: selectedObject?.fontStyle === "italic" ? "normal" : "italic",
                })
              }
              className={`px-3 py-1 border rounded ${
                selectedObject?.fontStyle === "italic" ? "bg-gray-300" : "bg-white"
              }`}
            >
              I
            </button>
            <button
              onClick={() =>
                updateObjectProperties({
                  underline: !selectedObject?.underline,
                })
              }
              className={`px-3 py-1 border rounded ${selectedObject?.underline ? "bg-gray-300" : "bg-white"}`}
            >
              U
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
