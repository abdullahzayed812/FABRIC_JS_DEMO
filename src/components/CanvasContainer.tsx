interface CanvasContainerProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

const CanvasContainer: React.FC<CanvasContainerProps> = ({ canvasRef }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="overflow-auto flex justify-center items-center">
        <canvas ref={canvasRef} className="border border-gray-300"></canvas>
      </div>
    </div>
  );
};

export default CanvasContainer;
