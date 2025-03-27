import { Canvas, util } from "fabric";
import React, { useEffect, useRef } from "react";
import { CanvasSerializer, CanvasTemplate } from "./CanvasSerializer";

interface CanvasCardProps {
  templateName: string;
}

export const CanvasCard: React.FC<CanvasCardProps> = ({ templateName }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const loadTemplateFromLocalStorage = async (canvas: Canvas) => {
      const canvasSerializer = new CanvasSerializer(canvas);

      const savedTemplate: CanvasTemplate | null = canvasSerializer.loadFromLocalStorage();

      if (!savedTemplate) return;

      try {
        canvas.clear();

        canvas.set({
          width: savedTemplate?.width,
          height: savedTemplate?.height,
          backgroundColor: savedTemplate?.background,
          selectable: false,
        });

        const enlivenedObjects = await util.enlivenObjects(savedTemplate?.objects as any[]);

        enlivenedObjects.forEach((obj: any) => {
          canvas.add(obj);
          obj.set({
            selectable: false,
            evented: false,
            hoverCursor: "default",
          });
        });

        canvas.requestRenderAll();
      } catch (error) {
        console.error("Error loading template:", error);
      }
    };

    const canvas = new Canvas(canvasRef.current!);

    loadTemplateFromLocalStorage(canvas);

    return () => {
      canvas.dispose();
    };
  }, [templateName]);

  return (
    <div className="card p-4 w-fit  mx-auto border rounded-lg shadow-lg bg-white relative">
      <h2 className="card-title text-xl font-semibold mb-4">Canvas Card (Read-Only)</h2>
      <div className="card-content relative">
        <canvas ref={canvasRef} width="500" height="500" />
        <div className="absolute top-2 right-2 text-gray-500">
          <i className="fa fa-lock"></i>
        </div>
      </div>
    </div>
  );
};
