import React from "react";

export const Canvas: React.FC = () => {
  return (
    <div className="flex-1 p-4 overflow-auto">
      <div className="bg-white w-full h-[calc(100vh-8rem)] shadow-lg rounded-lg relative">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, #d1d5db 1px, transparent 1px), linear-gradient(to bottom, #d1d5db 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        >
          {/* Canvas content will go here */}
        </div>
      </div>
    </div>
  );
};
