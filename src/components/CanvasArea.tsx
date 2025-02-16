import React from "react";

interface CanvasAreaProps {
  canvasRef: React.Ref<HTMLCanvasElement> | undefined;
}

export const CanvasArea: React.FC<CanvasAreaProps> = ({ canvasRef }) => {
  // console.log(canvasRef?.current);
  return (
    <canvas id="canvas" ref={canvasRef} />
    // <div className="flex-1 p-4 overflow-auto">
    //   <div className="bg-white w-full h-[calc(100vh-8rem)] shadow-lg rounded-lg relative">
    //     <div
    //       className="absolute inset-0"
    //       style={{
    //         backgroundImage:
    //           "linear-gradient(to right, #d1d5db 1px, transparent 1px), linear-gradient(to bottom, #d1d5db 1px, transparent 1px)",
    //         backgroundSize: "20px 20px",
    //       }}
    //     >

    //     </div>
    //   </div>
    // </div>
  );
};
