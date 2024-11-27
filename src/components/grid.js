'use client'
import React, { useEffect, useState } from "react";
import ColorSelector from "./colorSelector";
import { getSocket } from "@/lib/socket";


const GRID_SIZE = 15;

export default function Grid() {

  const socket = getSocket();


  useEffect(() => {
    // Escuchar el evento 'pixelPainted' que el servidor emite
    socket.on('pixelPainted', (data) => {
        console.log('Pixel pintado actualizado:', data);
        const {x, y, newColor} = data;
        pixelChange(x, y, newColor)
        // Aquí puedes actualizar el estado de los pixeles en el cliente
        // Por ejemplo, actualizando el estado de tu aplicación o la UI
    });

    return () => {
        // Limpiar el listener cuando el componente se desmonte
        socket.off('pixelPainted');
    };
}, []);


  // Inicializamos la matriz con colores predeterminados
  const initializeGrid = () => {
    return Array.from({ length: GRID_SIZE }, () =>
      Array.from({ length: GRID_SIZE }, () => "transparent") // Color inicial
    );
  };

  const [grid, setGrid] = useState(initializeGrid());
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [isMouseDown, setIsMouseDown] = useState(false); // Estado para saber si el mouse está presionado


  const pixelChange = (x, y, color) => {
    const newGrid = [...grid]; // Copiar la matriz actual
    newGrid[x][y] = color; // Actualizar el color de la celda seleccionada
    setGrid(newGrid); // Actualizar el estado con la nueva matriz
  }

  const sendPixelPaintedSocket = (x,y, newColor) => {
    socket.emit('pixelPainted', {x, y, newColor})

    console.log('pixel nuevo pintado enviado')
  }

  // Función para manejar el clic en un cuadro
  const handleClick = (x, y) => {
   pixelChange(x,y, selectedColor)
   sendPixelPaintedSocket(x, y, selectedColor)
  };

  // Función para manejar la pintura cuando el mouse está presionado
  const handleMouseEnter = (x, y) => {
    if (isMouseDown) {
      handleClick(x,y)
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
