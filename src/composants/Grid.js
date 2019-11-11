import React, { useState } from "react";
import "./Grid.css";
import Cell from "./Cell";

const Grid = () => {
  const emptyGrid = () => {
    const tempGrid = [];
    let colGrid = [];
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        const cell = { x: x, y: y, bomb: false, reveled: false, flag: false, count: Math.round(Math.random() * 8) };
        colGrid.push(cell);
      }
      tempGrid.push(colGrid);
      colGrid = [];
    }
    return tempGrid;
  };

  const [grid, setGrid] = useState(emptyGrid());

  return (
    <div className="grid">
      {grid.map((row, index) => {
        return (
          <div className="row" key={index}>
            {row.map((cell, index) => {
              return <Cell key={index} reveled={cell.reveled} bomb={cell.bomb} flag={cell.flag} count={cell.count} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
