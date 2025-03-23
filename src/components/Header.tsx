import { useCanvasContext } from "../context/canvasContext";

export const Header = () => {
  const { exportCanvas } = useCanvasContext();

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Design Template</h1>
        <button
          onClick={exportCanvas}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Export Design
        </button>
      </div>
    </header>
  );
};
