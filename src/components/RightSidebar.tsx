import React from "react";
import { Sliders, Type, Image, Square } from "lucide-react";

export const RightSidebar: React.FC = () => {
  return (
    <div className="bg-white border-l border-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-4">Element Properties</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Position</h3>
          <div className="flex space-x-2">
            <input
              type="number"
              className="w-20 px-2 py-1 border rounded"
              placeholder="X"
            />
            <input
              type="number"
              className="w-20 px-2 py-1 border rounded"
              placeholder="Y"
            />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">Size</h3>
          <div className="flex space-x-2">
            <input
              type="number"
              className="w-20 px-2 py-1 border rounded"
              placeholder="Width"
            />
            <input
              type="number"
              className="w-20 px-2 py-1 border rounded"
              placeholder="Height"
            />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">Style</h3>
          <div className="flex items-center space-x-2">
            <button className="p-2 border rounded hover:bg-gray-100">
              <Type size={16} />
            </button>
            <button className="p-2 border rounded hover:bg-gray-100">
              <Image size={16} />
            </button>
            <button className="p-2 border rounded hover:bg-gray-100">
              <Square size={16} />
            </button>
            <button className="p-2 border rounded hover:bg-gray-100">
              <Sliders size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
