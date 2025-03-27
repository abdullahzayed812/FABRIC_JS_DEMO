import { Canvas, util } from "fabric";

export interface CanvasTemplate {
  version: string;
  objects: any[];
  background: string;
  width: number;
  height: number;
}

export class CanvasSerializer {
  constructor(private canvas: Canvas | null) {}

  public serializeCanvas(): CanvasTemplate | undefined {
    if (!this.canvas) return;

    return {
      version: "1.0",
      objects: this.canvas.toJSON().objects,
      background: this.canvas.backgroundColor as string,
      width: this.canvas.width || 800,
      height: this.canvas.height || 800,
    };
  }

  public saveToLocalStorage(key: string = "canvasTemplate") {
    if (!this.canvas) return;

    try {
      const serializedCanvas = this.serializeCanvas();
      localStorage.setItem(key, JSON.stringify(serializedCanvas));
    } catch (error) {
      console.error("Error saving canvas to localStorage:", error);
    }
  }

  public loadFromLocalStorage(key: string = "canvasTemplate"): CanvasTemplate | null {
    try {
      const savedTemplate = localStorage.getItem(key);
      return savedTemplate ? JSON.parse(savedTemplate) : null;
    } catch (error) {
      console.error("Error loading canvas from localStorage:", error);
      return null;
    }
  }

  public exportToFile(filename: string = "canvas-template.json") {
    const serializedCanvas = this.serializeCanvas();
    const blob = new Blob([JSON.stringify(serializedCanvas, null, 2)], {
      type: "application/json",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  public async importFromFile(file: File): Promise<CanvasTemplate | undefined> {
    if (!this.canvas) return;

    try {
      const reader = new FileReader();

      const fileContent = await new Promise<string>((resolve, reject) => {
        reader.onload = (event) => {
          if (event.target?.result) {
            resolve(event.target.result as string);
          } else {
            reject("Failed to read file");
          }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
      });

      const parsedTemplate: CanvasTemplate = JSON.parse(fileContent);

      this.canvas.clear();
      this.canvas.set("width", parsedTemplate.width);
      this.canvas.set("height", parsedTemplate.height);
      this.canvas.backgroundColor = parsedTemplate.background;

      const enlivenedObjects = await util.enlivenObjects(parsedTemplate.objects);

      enlivenedObjects.forEach((obj: any) => {
        this.canvas?.add(obj);
      });

      this.canvas?.renderAll();

      return parsedTemplate;
    } catch (error) {
      console.error("Error importing file:", error);
      throw error;
    }
  }
}

export const useCanvasSaveLoad = (canvas: Canvas | null) => {
  const canvasSerializer = new CanvasSerializer(canvas);

  const saveToLocalStorage = (key?: string) => {
    if (canvas) {
      canvasSerializer.saveToLocalStorage(key);
    }
  };

  const loadFromLocalStorage = (key?: string) => {
    if (canvas) {
      const template = canvasSerializer.loadFromLocalStorage(key);
      return template;
    }
    return null;
  };

  const exportTemplate = (filename?: string) => {
    if (canvas) {
      canvasSerializer.exportToFile(filename);
    }
  };

  const importTemplate = async (file: File) => {
    if (canvas) {
      return canvasSerializer.importFromFile(file);
    }
  };

  return {
    saveToLocalStorage,
    loadFromLocalStorage,
    exportTemplate,
    importTemplate,
  };
};

// export const CanvasTemplateManager: React.FC = () => {
//   const [canvas, setCanvas] = useState<Canvas | null>(null);
//   const { saveToLocalStorage, loadFromLocalStorage, exportTemplate, importTemplate } = useCanvasSaveLoad(canvas);

//   // File input handler for importing
//   const handleFileImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file && canvas) {
//       try {
//         await importTemplate(file);
//       } catch (error) {
//         console.error("Import failed:", error);
//       }
//     }
//   };

//   return (
//     <div>
//       <button onClick={() => saveToLocalStorage()}>Save Template to Local Storage</button>
//       <button onClick={() => loadFromLocalStorage()}>Load Template from Local Storage</button>
//       <button onClick={() => exportTemplate()}>Export Template</button>
//       <input type="file" accept=".json" onChange={handleFileImport} />
//     </div>
//   );
// };
