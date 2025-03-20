import { useRef } from "react";

interface BackgroundUploaderProps {
  addSvgBackground: (svgUrl: string) => void;
}

const BackgroundUploader: React.FC<BackgroundUploaderProps> = ({ addSvgBackground }) => {
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
      if (event.target?.result) {
        addSvgBackground(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h2 className="font-bold text-lg border-b pb-2">Background</h2>

      <div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded"
        >
          Upload SVG Background
        </button>
        <input type="file" accept=".svg" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
      </div>
    </div>
  );
};

export default BackgroundUploader;
