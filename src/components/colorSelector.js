import React from "react";

const colorList = [
  { name: "Erase", value: "transparent"}
];

export default function ColorSelector({ color, setColor }) {

    const changeColor = (newColor) => {
        setColor(newColor)
    }

  return (
    <div className="flex items-center justify-center">
      <div className="flex gap-10 justify-center items-center">

      <div className="text-center">
              <div
                className="w-12 h-12 mb-2 border-4 border-gray-400"
                style={{ background: color }}
              ></div>
              <p>Actual</p>
            </div>

        {colorList.map((colorItem, i) => {
          return (
            <div key={colorItem.name} onClick={() => { changeColor(colorItem.value)}}  className="text-center">
              <div
                className="cursor-pointer border-4 border-gray-400 w-12 h-12 mb-2 hover:w-14 hover:h-14 transition-all"
                style={{ background: colorItem.value }}
              ></div>
              <p>{colorItem.name}</p>
            </div>
          );
        })}

        <div className="flex flex-col justify-center items-center text-center">
            <div className="cursor-pointer w-12 h-12 mb-2 hover:w-14 hover:h-14 transition-all">
            <input className="cursor-pointer w-12 h-12 mb-2 hover:w-14 hover:h-14 transition-all" onChange={(e) => {changeColor(e.target.value)}} type="color"/>
            </div>

            <p>Personalizado</p>
        </div>

      </div>

    </div>
  );
}
