import React from "react";
import { Textbox } from "fabric";

interface TextEditorProps {
  selectedObject: Textbox;
  updateTextProperties: (properties: Record<string, any>) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ selectedObject, updateTextProperties }) => {
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

  const updateText = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    selectedObject.set("text", e.target.value);
    selectedObject.canvas?.requestRenderAll();
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h2 className="font-bold text-lg border-b pb-2">Text Editor</h2>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Text Content</label>
        <textarea value={selectedObject.text} onChange={updateText} className="w-full border rounded px-2 py-1 h-20" />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Font Family</label>
        <select
          value={selectedObject.fontFamily}
          onChange={(e) => updateTextProperties({ fontFamily: e.target.value })}
          className="w-full border rounded px-2 py-1"
        >
          {fontFamilies.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Font Size</label>
        <input
          type="number"
          value={selectedObject.fontSize}
          onChange={(e) => updateTextProperties({ fontSize: parseInt(e.target.value) || 12 })}
          className="w-full border rounded px-2 py-1"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Text Color</label>
          <input
            type="color"
            value={selectedObject.fill as string}
            onChange={(e) => updateTextProperties({ fill: e.target.value })}
            className="w-full h-8 border rounded"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Background</label>
          <input
            type="color"
            value={(selectedObject.backgroundColor as string) || "#ffffff"}
            onChange={(e) =>
              updateTextProperties({
                backgroundColor: e.target.value === "#ffffff" ? "" : e.target.value,
              })
            }
            className="w-full h-8 border rounded"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Text Style</label>
        <div className="flex space-x-2">
          <button
            onClick={() =>
              updateTextProperties({
                fontWeight: selectedObject.fontWeight === "bold" ? "normal" : "bold",
              })
            }
            className={`px-3 py-1 border rounded ${selectedObject.fontWeight === "bold" ? "bg-gray-300" : "bg-white"}`}
          >
            B
          </button>
          <button
            onClick={() =>
              updateTextProperties({
                fontStyle: selectedObject.fontStyle === "italic" ? "normal" : "italic",
              })
            }
            className={`px-3 py-1 border rounded ${selectedObject.fontStyle === "italic" ? "bg-gray-300" : "bg-white"}`}
          >
            I
          </button>
          <button
            onClick={() =>
              updateTextProperties({
                underline: !selectedObject.underline,
              })
            }
            className={`px-3 py-1 border rounded ${selectedObject.underline ? "bg-gray-300" : "bg-white"}`}
          >
            U
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
