import { Canvas } from "fabric";
import { useCanvasContext } from "../context/canvasContext";

export const SVGShapes = () => {
  const { shapes } = useCanvasContext();

  // Handle shape selection from the sidebar
  const handleSidebarShapeClick = (shapeId) => {
    const selectedShape = shapes.find((shape) => shape.id === shapeId);
    const shape = new fabric[selectedShape.type](selectedShape.preview);
    canvas.clear();
    canvas.add(shape);
    canvas.renderAll();
    setSelectedObject(shape);
  };

  // Render a Fabric.js object preview (for the sidebar)
  const renderShapePreview = (shape: any) => {
    const previewCanvas = new Canvas("", {
      width: 50, // small width for preview
      height: 50, // small height for preview
    });

    const fabricObject = new shape.type(shape.preview.toObject());
    previewCanvas.add(fabricObject);
    previewCanvas.renderAll();

    const dataUrl = previewCanvas.toDataURL(); // Get a data URL for the preview image
    return dataUrl;
  };

  <div className="w-72 p-5 border-l bg-gray-50 overflow-y-auto">
    <h3 className="text-xl font-semibold mb-5">Shape Previews</h3>
    <div>
      {shapes.length === 0 ? (
        <p>No shapes available. Please upload an SVG file.</p>
      ) : (
        shapes.map((shape) => (
          <div
            key={shape.id}
            className="mb-3 p-2 border rounded-md cursor-pointer hover:bg-gray-200"
            onClick={() => handleSidebarShapeClick(shape.id)}
          >
            <p className="text-sm font-medium">{shape.type}</p>
            <img src={renderShapePreview(shape)} alt={shape.type} className="mt-2 w-12 h-12 border rounded-md" />
          </div>
        ))
      )}
    </div>
  </div>;
};
