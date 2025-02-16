import React from "react";
import {
  Type,
  Image,
  Square,
  Circle,
  Triangle,
  PenTool,
  Palette,
} from "lucide-react";
import { ToolType } from "../App";
import Tooltip from "./Tooltip";
import {
  Canvas,
  Rect,
  Circle as FabricCircle,
  Polygon,
  Ellipse,
  Triangle as FabricTriangle,
  Line,
  Path,
} from "fabric";

interface ToolbarProps {
  selectedTool: ToolType;
  setSelectedTool: (tool: ToolType) => void;
  canvas: Canvas | null;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  selectedTool,
  setSelectedTool,
  canvas,
}) => {
  const tools = [
    { name: "text", icon: Type },
    { name: "image", icon: Image },
    { name: "rectangle", icon: Square },
    { name: "circle", icon: Circle },
    { name: "triangle", icon: Triangle },
    { name: "draw", icon: PenTool },
    { name: "background", icon: Palette },
  ] as const;

  const handleAddShape = (shapeType: string) => {
    let shape;

    // Create shape based on the shapeType
    switch (shapeType) {
      case "rect":
        shape = new Rect({
          left: 100,
          top: 100,
          width: 150,
          height: 150,
          fill: "blue",
        });
        break;
      case "circle":
        shape = new FabricCircle({
          left: 100,
          top: 100,
          radius: 75,
          fill: "green",
        });
        break;
      case "triangle":
        shape = new FabricTriangle({
          left: 100,
          top: 100,
          width: 150,
          height: 150,
          fill: "red",
        });
        break;
      case "line":
        shape = new Line([100, 100, 200, 200], {
          stroke: "purple",
          strokeWidth: 5,
        });
        break;
      case "polygon":
        shape = new Polygon(
          [
            { x: 100, y: 100 },
            { x: 150, y: 50 },
            { x: 200, y: 100 },
            { x: 150, y: 150 },
          ],
          {
            fill: "orange",
            stroke: "black",
            strokeWidth: 2,
          }
        );
        break;
      case "path":
        shape = new Path("M 100 100 Q 200 200, 100 300", {
          fill: "transparent",
          stroke: "black",
          strokeWidth: 5,
        });
        break;
      case "ellipse":
        shape = new Ellipse({
          left: 100,
          top: 100,
          rx: 100,
          ry: 60,
          fill: "pink",
        });
        break;
      case "star":
        shape = new Polygon(
          [
            { x: 200, y: 50 },
            { x: 220, y: 90 },
            { x: 270, y: 90 },
            { x: 230, y: 130 },
            { x: 250, y: 170 },
            { x: 200, y: 150 },
            { x: 150, y: 170 },
            { x: 170, y: 130 },
            { x: 130, y: 90 },
            { x: 180, y: 90 },
          ],
          {
            fill: "yellow",
            stroke: "black",
            strokeWidth: 2,
          }
        );
        break;
      default:
        break;
    }

    if (shape) {
      canvas?.add(shape);
    }
  };

  return (
    <div className="w-16 bg-white border-r border-gray-200">
      {tools.map((tool) => (
        <Tooltip content={tool.name} position="right">
          <button
            key={tool.name}
            className={`w-full p-4 hover:bg-gray-100 focus:outline-none ${
              selectedTool === tool.name ? "bg-gray-200" : ""
            }`}
            // title={tool.name}
            onClick={() => setSelectedTool(tool.name)}
          >
            <tool.icon size={24} />
          </button>
        </Tooltip>
      ))}
    </div>
  );
};
