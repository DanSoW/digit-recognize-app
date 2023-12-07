import React, { useContext, useRef, useState } from "react";

// Создание элемента React-контекста
const CanvasContext = React.createContext();

// Ширина / высота холста
const width = 512;
const height = 512;

/**
 * Провайдер холста
 * @param {*} param0 Параметры провайдера
 * @returns 
 */
export const CanvasProvider = ({ children }) => {
  // Состояние рисования
  const [isDrawing, setIsDrawing] = useState(false);

  // Ссылка на холст
  const canvasRef = useRef(null);

  // Ссылка на контекст
  const contextRef = useRef(null);

  /**
   * Подготовка холста (первоначальная стилизация)
   */
  const prepareCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = width * 2;
    canvas.height = height * 2;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.style.border = "1px solid black";
    canvas.style.background = "black";

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "white";
    context.lineWidth = 8;
    context.fillStyle = "black";
    contextRef.current = context;
  };

  /**
   * Начало рисования
   * @param {*} param0 Параметры
   */
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  /**
   * Завершение рисования
   */
  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  /**
   * Рисование
   * @param {*} param0 Параметры
   * @returns 
   */
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  /**
   * Очистка холста
   */
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")
    context.fillStyle = "black"
    context.fillRect(0, 0, canvas.width, canvas.height)
  };

  /**
   * Конвертация снимка холста в изображение
   */
  const getImage = () => {
    return canvasRef.current.toDataURL("image/jpeg");
  };

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        contextRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        clearCanvas,
        draw,
        getImage
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);
