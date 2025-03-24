import { useRef } from "react";
import { useCanvasContext } from "../context/canvasContext";

export const ImageUploader = () => {
  const { addImage } = useCanvasContext();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;

        addImage(dataUrl);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <button
        onClick={() => fileInputRef.current?.click()}
        className="w-full bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded"
      >
        Upload Image
      </button>
      <input
        type="file"
        accept="*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
};
