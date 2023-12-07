import React, { useEffect } from "react";
import { useCanvas } from "../../context/CanvasContext/CanvasContext";

/**
 * Функциональный компонент холста
 * @returns 
 */
const Canvas = () => {
  const {
    canvasRef,
    prepareCanvas,
    startDrawing,
    finishDrawing,
    draw,
  } = useCanvas();

  useEffect(() => {
    prepareCanvas();
  }, []);

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
    />
  );
}

export default Canvas;