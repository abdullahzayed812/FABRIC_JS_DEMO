import { useCanvasContext } from "../context/canvasContext";

export const CanvasContainer = () => {
  const { canvasRef } = useCanvasContext();

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="overflow-auto flex justify-center items-center">
        <canvas ref={canvasRef} className="border border-gray-300"></canvas>
      </div>
    </div>
  );
};
