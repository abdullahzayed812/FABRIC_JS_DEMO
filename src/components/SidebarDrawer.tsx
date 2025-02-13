import React from "react";
import { X } from "lucide-react";
import { ToolType } from "../App";

interface SidebarDrawerProps {
  selectedTool: ToolType;
  setSelectedTool: (tool: ToolType) => void;
}

const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  selectedTool,
  setSelectedTool,
}) => {
  if (!selectedTool) return null;

  const renderContent = () => {
    switch (selectedTool) {
      case "text":
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">Add Text</h3>
            <button className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
              Add a heading
            </button>
            <button className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
              Add a subheading
            </button>
            <button className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
              Add a little bit of body text
            </button>
          </div>
        );
      case "image":
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">Add Image</h3>
            <button className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
              Upload an image
            </button>
            <div className="grid grid-cols-2 gap-2">
              <div className="aspect-square bg-gray-200 rounded"></div>
              <div className="aspect-square bg-gray-200 rounded"></div>
              <div className="aspect-square bg-gray-200 rounded"></div>
              <div className="aspect-square bg-gray-200 rounded"></div>
            </div>
          </div>
        );
      case "background":
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">Change Background</h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="aspect-square bg-red-500 rounded"></div>
              <div className="aspect-square bg-blue-500 rounded"></div>
              <div className="aspect-square bg-green-500 rounded"></div>
              <div className="aspect-square bg-yellow-500 rounded"></div>
              <div className="aspect-square bg-purple-500 rounded"></div>
              <div className="aspect-square bg-pink-500 rounded"></div>
            </div>
          </div>
        );
      default:
        return <div>Content for {selectedTool}</div>;
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold capitalize">{selectedTool}</h2>
        <button
          onClick={() => setSelectedTool(null)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default SidebarDrawer;
