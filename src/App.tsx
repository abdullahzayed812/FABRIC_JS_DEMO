import { TopBar } from "./components/TopBar";
import { Toolbar } from "./components/Toolbar";
import { BottomBar } from "./components/ButtomBar";
import { RightSidebar } from "./components/RightSidebar";
// import { Canvas } from "./components/CanvasArea";
import SidebarDrawer from "./components/SidebarDrawer";
import { useState } from "react";
import { CanvasProvider, useCanvasContext } from "./context/canvasContext";
import { CanvasArea } from "./components/CanvasArea";

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
  const { canvas, canvasRef } = useCanvasContext();

  // console.log(canvasRef.current);

  return (
    <CanvasProvider>
      <div className="flex flex-col h-screen bg-gray-100">
        <TopBar />
        <div className="flex flex-1 overflow-hidden">
          <Toolbar
            canvas={canvas}
            selectedTool={selectedTool}
            setSelectedTool={setSelectedTool}
          />
          <div className="flex flex-1">
            <SidebarDrawer
              selectedTool={selectedTool}
              setSelectedTool={setSelectedTool}
            />
            <div className="flex flex-col flex-1">
              {/* <CanvasArea canvasRef={canvasRef} /> */}
              <canvas id="canvas" ref={canvasRef} />
              <BottomBar />
            </div>
          </div>
          <RightSidebar />
        </div>
      </div>
    </CanvasProvider>
  );
}

export default App;
