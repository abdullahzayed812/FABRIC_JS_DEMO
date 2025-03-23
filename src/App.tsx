import React from "react";
import { PropertiesPanel } from "./components/PropertiesPanel";
import { ToolsPanel } from "./components/ToolsPanel";
import { CanvasContainer } from "./components/CanvasContainer";
import { Header } from "./components/Header";
import { LayersPanel } from "./components/LayersPanel";
import { useCanvasContext } from "./context/canvasContext";

const App: React.FC = () => {
  const { selectedObject } = useCanvasContext();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-3/4">
            <CanvasContainer />
          </div>

          <div className="w-full md:w-1/4 space-y-4">
            <ToolsPanel />

            {selectedObject && selectedObject.type === "textbox" && (
              <PropertiesPanel />
            )}

            <LayersPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
