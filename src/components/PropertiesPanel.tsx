import React, { useEffect, useState } from "react";
import { useCanvasContext } from "../context/canvasContext";
import { Textbox } from "fabric";

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

export const PropertiesPanel = () => {
  const { selectedObject, canvas, updateTextProperties } = useCanvasContext();

  const isTextObject = selectedObject instanceof Textbox;

  const [properties, setProperties] = useState({
    content: "",
    width: "",
    height: "",
    x: "",
    y: "",
    fontSize: "",
  });

  useEffect(() => {
    setProperties({
      content: isTextObject ? selectedObject?.text : "",
      width: selectedObject?.width.toString() || "",
      height: selectedObject?.height.toString() || "",
      x: selectedObject?.getX().toString() || "",
      y: selectedObject?.getY().toString() || "",
      fontSize: isTextObject ? selectedObject.fontSize.toString() : "",
    });
  }, [selectedObject]);

  const handlePropertiesChange = (prop: string, value: string) => {
    setProperties((prev) => ({ ...prev, [prop]: value }));
  };

  const updateText = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    handlePropertiesChange("content", e.target.value);
    selectedObject?.set("text", e.target.value);
    selectedObject?.canvas?.requestRenderAll();
  };

  const handleInputChange = (
    inputType: string,
    propType: string,
    value: string
  ) => {
    handlePropertiesChange(propType, value);
    updateTextProperties({ [inputType]: parseInt(value) });
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h2 className="font-bold text-lg border-b pb-2">Properties Panel</h2>

      {isTextObject ? (
        <div className="space-y-2">
          <label className="block text-sm font-medium">Text Content</label>
          <textarea
            value={properties.content}
            onChange={updateText}
            className="w-full border rounded px-2 py-1 h-20"
          />
        </div>
      ) : null}

      <div className="space-y-2">
        <div className="flex gap-2">
          <div>
            <label className="block text-sm mb-2">Width</label>
            <input
              type="number"
              value={properties.width}
              onChange={(e) =>
                handleInputChange("width", "width", e.target.value)
              }
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Height</label>
            <input
              type="number"
              value={properties.height}
              onChange={(e) =>
                handleInputChange("height", "height", e.target.value)
              }
              className="w-full border rounded px-2 py-1"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex gap-2">
          <div>
            <label className="block text-sm mb-2">X</label>
            <input
              type="number"
              value={properties.x}
              onChange={(e) => handleInputChange("x", "x", e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Y</label>
            <input
              type="number"
              value={properties.y}
              onChange={(e) => handleInputChange("y", "y", e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>
        </div>
      </div>

      {isTextObject ? (
        <div className="space-y-2">
          <label className="block text-sm font-medium">Font Family</label>
          <select
            value={selectedObject?.fontFamily}
            onChange={(e) =>
              updateTextProperties({ fontFamily: e.target.value })
            }
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

      {isTextObject ? (
        <div className="space-y-2">
          <label className="block text-sm font-medium">Font Size</label>
          <input
            type="number"
            value={properties.fontSize}
            onChange={(e) =>
              handleInputChange("fontSize", "fontSize", e.target.value)
            }
            className="w-full border rounded px-2 py-1"
          />
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Text Color</label>
          <input
            type="color"
            value={selectedObject?.fill as string}
            onChange={(e) => updateTextProperties({ fill: e.target.value })}
            className="w-full h-8 border rounded"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Background</label>
          <input
            type="color"
            value={(selectedObject?.backgroundColor as string) || "#ffffff"}
            onChange={(e) =>
              updateTextProperties({
                backgroundColor:
                  e.target.value === "#ffffff" ? "" : e.target.value,
              })
            }
            className="w-full h-8 border rounded"
          />
        </div>
      </div>

      {isTextObject ? (
        <div className="space-y-2">
          <label className="block text-sm font-medium">Text Style</label>
          <div className="flex space-x-2">
            <button
              onClick={() =>
                updateTextProperties({
                  fontWeight:
                    selectedObject?.fontWeight === "bold" ? "normal" : "bold",
                })
              }
              className={`px-3 py-1 border rounded ${
                selectedObject?.fontWeight === "bold"
                  ? "bg-gray-300"
                  : "bg-white"
              }`}
            >
              B
            </button>
            <button
              onClick={() =>
                updateTextProperties({
                  fontStyle:
                    selectedObject?.fontStyle === "italic"
                      ? "normal"
                      : "italic",
                })
              }
              className={`px-3 py-1 border rounded ${
                selectedObject?.fontStyle === "italic"
                  ? "bg-gray-300"
                  : "bg-white"
              }`}
            >
              I
            </button>
            <button
              onClick={() =>
                updateTextProperties({
                  underline: !selectedObject?.underline,
                })
              }
              className={`px-3 py-1 border rounded ${
                selectedObject?.underline ? "bg-gray-300" : "bg-white"
              }`}
            >
              U
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
