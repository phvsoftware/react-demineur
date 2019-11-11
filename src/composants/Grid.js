import React, { useState } from "react";
import "./Grid.css";
import Cell from "./Cell";

const Grid = () => {
  const nbBomb = 10;
  const nbCol = 9;
  const nbRow = 9;

  // initialise une grille sans bombes pour le 1er click
  const emptyGrid = () => {
    const tempGrid = [];
    let colGrid = [];
    for (let y = 0; y < nbRow; y++) {
      for (let x = 0; x < nbCol; x++) {
        const cell = { x: x, y: y, bomb: false, reveled: false, flag: false, count: 0 };
        colGrid.push(cell);
      }
      tempGrid.push(colGrid);
      colGrid = [];
    }
    return tempGrid;
  };

  // initialise la grille en rajoutant les bombes après le 1er click, on fixe aussi les compteurs
  const fixBomb = (xPos, yPos) => {
    // tableaux de x bombes, pas à la place où on a cliqué
    let bombs = [];
    for (let i = 0; i < nbBomb; i++) {
      let x = 0;
      let y = 0;
      do {
        x = Math.round(Math.random() * (nbCol - 1));
        y = Math.round(Math.random() * (nbRow - 1));
      } while ((x === xPos && y === yPos) || bombs.find(bomb => bomb.x === x && bomb.y === y) !== undefined);
      const pos = { x, y };
      bombs.push(pos);
    }
    // remplit la grille avec les bombes et découvre la case cliquée
    const tempGrid = [];
    let colGrid = [];
    for (let y = 0; y < nbRow; y++) {
      for (let x = 0; x < nbCol; x++) {
        const cell = {
          x: x,
          y: y,
          bomb: bombs.find(bomb => bomb.x === x && bomb.y === y) !== undefined,
          reveled: x === xPos && y === yPos,
          flag: false,
          count: 0
        };
        colGrid.push(cell);
      }
      tempGrid.push(colGrid);
      colGrid = [];
    }
    // calcule les compteurs de bombes
    return tempGrid;
  };

  const [grid, setGrid] = useState(emptyGrid());
  const [firstClick, setFirstClick] = useState(false);

  const onLeftClick = (x, y) => {
    if (!firstClick) {
      setGrid(fixBomb(x, y));
      setFirstClick(true);
    } else {
    }
  };

  const onRightClick = (x, y) => {
    if (!firstClick) {
      setGrid(fixBomb(x, y));
      setFirstClick(true);
    } else {
    }
  };

  return (
    <div className="grid">
      {grid.map((row, index) => {
        return (
          <div className="row" key={index}>
            {row.map((cell, index) => {
              return (
                <Cell
                  key={index}
                  posX={cell.x}
                  posY={cell.y}
                  reveled={cell.reveled}
                  bomb={cell.bomb}
                  flag={cell.flag}
                  count={cell.count}
                  onLeftClick={onLeftClick}
                  onRightClick={onRightClick}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
