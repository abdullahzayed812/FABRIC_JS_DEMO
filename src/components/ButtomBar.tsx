import React from "react";
import { ZoomIn, ZoomOut, Layers, Grid } from "lucide-react";

export const BottomBar: React.FC = () => {
  return (
    <div className="h-12 bg-white border-t border-gray-200 flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-gray-800">
          <Layers size={20} />
        </button>
        <button className="text-gray-600 hover:text-gray-800">
          <Grid size={20} />
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <button className="text-gray-600 hover:text-gray-800">
          <ZoomOut size={20} />
        </button>
        <span className="text-sm">100%</span>
        <button className="text-gray-600 hover:text-gray-800">
          <ZoomIn size={20} />
        </button>
      </div>
    </div>
  );
};
