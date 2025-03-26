import { Canvas, util } from "fabric";
import { CustomFabricObject } from "./types"; // Assuming you have a types file
import { useState } from "react";

interface CanvasTemplate {
  version: string;
  objects: any[];
  background: string;
  width: number;
  height: number;
}

class CanvasSerializer {
  /**
   * Serialize the entire canvas to a JSON string
   * @param canvas Fabric Canvas instance
   * @returns Serialized canvas template
   */
  static serializeCanvas(canvas: Canvas): CanvasTemplate {
    return {
      version: "1.0",
      objects: canvas.toJSON(["id", "zIndex"]).objects,
      background: canvas.backgroundColor as string,
      width: canvas.width || 800,
      height: canvas.height || 800,
    };
  }

  /**
   * Save canvas to localStorage
   * @param canvas Fabric Canvas instance
   * @param key Storage key
   */
  static saveToLocalStorage(canvas: Canvas, key: string = "canvasTemplate") {
    try {
      const serializedCanvas = this.serializeCanvas(canvas);
      localStorage.setItem(key, JSON.stringify(serializedCanvas));
    } catch (error) {
      console.error("Error saving canvas to localStorage:", error);
    }
  }

  /**
   * Load canvas from localStorage
   * @param canvas Fabric Canvas instance
   * @param key Storage key
   * @returns Loaded template or null
   */
  static loadFromLocalStorage(
    canvas: Canvas,
    key: string = "canvasTemplate"
  ): CanvasTemplate | null {
    try {
      const savedTemplate = localStorage.getItem(key);
      return savedTemplate ? JSON.parse(savedTemplate) : null;
    } catch (error) {
      console.error("Error loading canvas from localStorage:", error);
      return null;
    }
  }

  /**
   * Export canvas to downloadable JSON file
   * @param canvas Fabric Canvas instance
   * @param filename Filename for the export
   */
  static exportToFile(
    canvas: Canvas,
    filename: string = "canvas-template.json"
  ) {
    const serializedCanvas = this.serializeCanvas(canvas);
    const blob = new Blob([JSON.stringify(serializedCanvas, null, 2)], {
      type: "application/json",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  /**
   * Import canvas template from a file
   * @param canvas Fabric Canvas instance
   * @param file File object
   * @returns Promise resolving to the loaded template
   */
  static importFromFile(canvas: Canvas, file: File): Promise<CanvasTemplate> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const templateContent = event.target?.result as string;
          const parsedTemplate: CanvasTemplate = JSON.parse(templateContent);

          // Clear existing canvas
          canvas.clear();

          // Set canvas dimensions
          canvas.set("width", parsedTemplate.width);
          canvas.set("height", parsedTemplate.height);
          canvas.backgroundColor = parsedTemplate.background;

          // Load objects
          parsedTemplate.objects.forEach((objData) => {
            util.enlivenObjects([objData], (objects) => {
              objects.forEach((obj) => {
                canvas.add(obj);
              });
              canvas.renderAll();
            });
          });

          resolve(parsedTemplate);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  }
}

// React Hook for managing canvas save/load
export const useCanvasSaveLoad = (canvas: Canvas | null) => {
  const saveToLocalStorage = (key?: string) => {
    if (canvas) {
      CanvasSerializer.saveToLocalStorage(canvas, key);
    }
  };

  const loadFromLocalStorage = (key?: string) => {
    if (canvas) {
      const template = CanvasSerializer.loadFromLocalStorage(canvas, key);
      return template;
    }
    return null;
  };

  const exportTemplate = (filename?: string) => {
    if (canvas) {
      CanvasSerializer.exportToFile(canvas, filename);
    }
  };

  const importTemplate = async (file: File) => {
    if (canvas) {
      return CanvasSerializer.importFromFile(canvas, file);
    }
  };

  return {
    saveToLocalStorage,
    loadFromLocalStorage,
    exportTemplate,
    importTemplate,
  };
};

// Example usage in a React component
export const CanvasTemplateManager: React.FC = () => {
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const {
    saveToLocalStorage,
    loadFromLocalStorage,
    exportTemplate,
    importTemplate,
  } = useCanvasSaveLoad(canvas);

  // File input handler for importing
  const handleFileImport = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && canvas) {
      try {
        await importTemplate(file);
      } catch (error) {
        console.error("Import failed:", error);
      }
    }
  };

  return (
    <div>
      <button onClick={() => saveToLocalStorage()}>
        Save Template to Local Storage
      </button>
      <button onClick={() => loadFromLocalStorage()}>
        Load Template from Local Storage
      </button>
      <button onClick={() => exportTemplate()}>Export Template</button>
      <input type="file" accept=".json" onChange={handleFileImport} />
    </div>
  );
};

export default CanvasSerializer;
