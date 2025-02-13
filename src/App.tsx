import { TopBar } from "./components/TopBar";
import { Toolbar } from "./components/Toolbar";
import { BottomBar } from "./components/ButtomBar";
import { RightSidebar } from "./components/RightSidebar";
import { Canvas } from "./components/Canvas";
import SidebarDrawer from "./components/SidebarDrawer";
import { useState } from "react";

export type ToolType =
  | "text"
  | "image"
  | "rectangle"
  | "circle"
  | "triangle"
  | "draw"
  | "background"
  | null;

function App() {
  const [selectedTool, setSelectedTool] = useState<ToolType>(null);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Toolbar
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
        />
        <div className="flex flex-1">
          <SidebarDrawer
            selectedTool={selectedTool}
            setSelectedTool={setSelectedTool}
          />
          <div className="flex flex-col flex-1">
            <Canvas />
            <BottomBar />
          </div>
        </div>
        <RightSidebar />
      </div>
    </div>
  );
}

export default App;
