import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CanvasProvider } from "./context/canvasContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CanvasProvider>
      <App />
    </CanvasProvider>
  </StrictMode>
);
