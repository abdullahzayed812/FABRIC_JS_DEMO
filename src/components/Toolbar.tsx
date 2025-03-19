import React from "react";
import { Type, Image, Square, Circle, Triangle, PenTool, Palette } from "lucide-react";
import { ToolType } from "../App";
import Tooltip from "./Tooltip";

interface ToolbarProps {
  selectedTool: ToolType;
  setSelectedTool: (tool: ToolType) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ selectedTool, setSelectedTool }) => {
  const tools = [
    { name: "text", icon: Type },
    { name: "image", icon: Image },
    { name: "rectangle", icon: Square },
    { name: "circle", icon: Circle },
    { name: "triangle", icon: Triangle },
    { name: "draw", icon: PenTool },
    { name: "background", icon: Palette },
  ] as const;

  return (
    <div className="w-16 bg-white border-r border-gray-200">
      {tools.map((tool) => (
        <Tooltip key={tool.name} content={tool.name} position="right">
          <button
            key={tool.name}
            className={`w-full p-4 hover:bg-gray-100 focus:outline-none ${
              selectedTool === tool.name ? "bg-gray-200" : ""
            }`}
            onClick={() => setSelectedTool(tool.name)}
          >
            <tool.icon size={24} />
          </button>
        </Tooltip>
      ))}
    </div>
  );
};
