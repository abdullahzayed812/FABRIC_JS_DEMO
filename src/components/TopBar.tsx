import React from "react";
import { Save, Share, Undo, Redo, Download } from "lucide-react";

export const TopBar: React.FC = () => {
  return (
    <div className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">Funnel GDE</h1>
        <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center">
          <Share size={16} className="mr-2" />
          Share
        </button>
        <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 flex items-center">
          <Save size={16} className="mr-2" />
          Save
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-gray-800">
          <Undo size={20} />
        </button>
        <button className="text-gray-600 hover:text-gray-800">
          <Redo size={20} />
        </button>
        <button className="text-gray-600 hover:text-gray-800">
          <Download size={20} />
        </button>
        <select className="border border-gray-300 rounded px-2 py-1">
          <option>1920 x 1080</option>
          <option>1280 x 720</option>
          <option>Custom</option>
        </select>
      </div>
    </div>
  );
};
