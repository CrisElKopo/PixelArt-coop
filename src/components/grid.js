'use client'
import React, { useState } from "react";
import ColorSelector from "./colorSelector";

const GRID_SIZE = 15;

export default function Grid() {
  // Inicializamos la matriz con colores predeterminados
  const initializeGrid = () => {
    return Array.from({ length: GRID_SIZE }, () =>
      Array.from({ length: GRID_SIZE }, () => "transparent") // Color inicial
    );
  };

  const [grid, setGrid] = useState(initializeGrid());
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [isMouseDown, setIsMouseDown] = useState(false); // Estado para saber si el mouse está presionado

  // Función para manejar el clic en un cuadro
  const handleClick = (x, y) => {
    const newGrid = [...grid]; // Copiar la matriz actual
    newGrid[x][y] = selectedColor; // Actualizar el color de la celda seleccionada
    setGrid(newGrid); // Actualizar el estado con la nueva matriz
  };

  // Función para manejar la pintura cuando el mouse está presionado
  const handleMouseEnter = (x, y) => {
    if (isMouseDown) {
      const newGrid = [...grid]; // Copiar la matriz actual
      newGrid[x][y] = selectedColor; // Actualizar el color de la celda seleccionada
      setGrid(newGrid); // Actualizar el estado con la nueva matriz
    }
  };

  // Función para manejar el inicio de la pintura (cuando el mouse es presionado)
  const handleMouseDown = (x, y) => {
    setIsMouseDown(true); // El mouse está presionado
    handleClick(x, y); // Pintar la celda inicial
  };

  // Función para manejar cuando el mouse se suelta
  const handleMouseUp = () => {
    setIsMouseDown(false); // Dejar de pintar cuando el mouse se suelta
  };

  return (
    <>
      <div
        className="grid grid-cols-15 gap-0"
        onMouseUp={handleMouseUp} // Detectar cuando se suelta el mouse
      >
        {grid.map((row, x) => {
          return (
            <div key={x} className="flex">
              {row.map((color, y) => {
                return (
                  <div
                    key={y}
                    className="w-8 h-8 border border-gray-600"
                    style={{ backgroundColor: color }}
                    onMouseDown={() => handleMouseDown(x, y)} // Empezar a pintar cuando se hace clic
                    onMouseEnter={() => handleMouseEnter(x, y)} // Seguir pintando cuando el mouse se mueve
                  ></div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Selector de color */}
      <ColorSelector color={selectedColor} setColor={setSelectedColor} />
    </>
  );
}
