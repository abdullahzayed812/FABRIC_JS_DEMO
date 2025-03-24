import { useRef } from "react";
import { useCanvasContext } from "../context/canvasContext";

export const SVGUploader = () => {
  const { addSvgBackground } = useCanvasContext();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Only accept SVG files
    if (file.type !== "image/svg+xml") {
      alert("Please upload an SVG file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target?.result && typeof event.target.result === "string") {
        const base64Data = event.target.result.replace(
          "data:image/svg+xml;base64,",
          ""
        );
        const svgString = atob(base64Data);

        addSvgBackground(svgString);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <button
        onClick={() => fileInputRef.current?.click()}
        className="w-full bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded"
      >
        Upload SVG Background
      </button>
      <input
        type="file"
        accept=".svg"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
