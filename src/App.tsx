import React, { useEffect, useState } from "react";
import { PropertiesPanel } from "./components/PropertiesPanel";
import { ToolsPanel } from "./components/ToolsPanel";
import { CanvasContainer } from "./components/CanvasContainer";
import { Header } from "./components/Header";
import { LayersPanel } from "./components/LayersPanel";
import { useCanvasContext } from "./context/canvasContext";
import { CanvasCard } from "./components/CanvasCard";

const App: React.FC = () => {
  const { selectedObject } = useCanvasContext();
  const [showSavedTemplate, setShowSavedTemplate] = useState(false);

  useEffect(() => {
    (() => {
      const canvasExists = localStorage.getItem("canvasTemplate");

      setShowSavedTemplate(canvasExists ? true : false);
    })();
  }, []);

  return (
    <div className="bg-gray-100 h-full">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-3/4">
            <CanvasContainer />
          </div>

          <div className="w-full md:w-1/4 space-y-4 max-h-[80vh] overflow-y-auto">
            <ToolsPanel />

            <LayersPanel />

            {selectedObject ? <PropertiesPanel /> : null}
          </div>
        </div>
      </div>

      {showSavedTemplate ? <CanvasCard templateName="Template 1" /> : null}
    </div>
  );
};

export default App;
