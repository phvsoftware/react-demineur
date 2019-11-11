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
        const cell = { x: x, y: y, bomb: false, revealed: false, flag: false, count: 0, bombclicked: false };
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
      } while (
        (x === xPos && y === yPos) ||
        (x === xPos - 1 && y === yPos - 1) ||
        (x === xPos && y === yPos - 1) ||
        (x === xPos + 1 && y === yPos - 1) ||
        (x === xPos - 1 && y === yPos) ||
        (x === xPos + 1 && y === yPos) ||
        (x === xPos - 1 && y === yPos + 1) ||
        (x === xPos && y === yPos + 1) ||
        (x === xPos + 1 && y === yPos + 1) ||
        bombs.find(bomb => bomb.x === x && bomb.y === y) !== undefined
      );
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
          revealed: x === xPos && y === yPos,
          flag: false,
          count: 0,
          bombclicked: false
        };
        colGrid.push(cell);
      }
      tempGrid.push(colGrid);
      colGrid = [];
    }
    // calcule les compteurs de bombes
    for (let y = 0; y < nbRow; y++) {
      for (let x = 0; x < nbCol; x++) {
        if (!tempGrid[y][x].bomb) {
          let count = 0;
          for (let y2 = y - 1; y2 <= y + 1; y2++) {
            for (let x2 = x - 1; x2 <= x + 1; x2++) {
              if (x2 >= 0 && x2 < nbCol && y2 >= 0 && y2 < nbRow && (x2 !== x || y2 !== y)) {
                if (tempGrid[y2][x2].bomb) {
                  count++;
                }
              }
            }
          }
          tempGrid[y][x].count = count;
        }
      }
    }
    return tempGrid;
  };

  const [grid, setGrid] = useState(emptyGrid());
  const [firstClick, setFirstClick] = useState(false);

  const onLeftClick = (x, y) => {
    // au 1er click on remplit la grille
    if (!firstClick) {
      const tempGrid = fixBomb(x, y);
      recurseReveale(tempGrid, x, y);
      setGrid(tempGrid);
      setFirstClick(true);
    } else {
      const tempGrid = [...grid];
      // récupère la case qu'on a cliqué
      const cell = tempGrid[y][x];
      // on clique sur une case vide non révélée et sans drapeau
      if (!cell.bomb && !cell.revealed && !cell.flag) {
        if (cell.count === 0) {
          recurseReveale(tempGrid, x, y);
        } else {
          tempGrid[y][x].revealed = true;
        }
        setGrid(tempGrid);
      } else if (tempGrid[y][x].bomb) {
        // on clique sur une mine !
        tempGrid[y][x].bombclicked = true;
        // on révèle tout !
        for (let y2 = 0; y2 < nbRow; y2++) {
          for (let x2 = 0; x2 < nbCol; x2++) {
            tempGrid[y2][x2].revealed = true;
          }
        }

        setGrid(tempGrid);
      }
    }
  };

  const recurseReveale = (tab, x, y) => {
    tab[y][x].revealed = true;
    for (let y2 = y - 1; y2 <= y + 1; y2++) {
      for (let x2 = x - 1; x2 <= x + 1; x2++) {
        if (x2 >= 0 && x2 < nbCol && y2 >= 0 && y2 < nbRow && (x2 !== x || y2 !== y)) {
          if (!tab[y2][x2].revealed && !tab[y2][x2].bomb && !tab[y2][x2].flag) {
            if (tab[y2][x2].count === 0) {
              recurseReveale(tab, x2, y2);
            } else {
              tab[y2][x2].revealed = true;
            }
          }
        }
      }
    }
  };

  const onRightClick = (x, y) => {
    // au 1er click on remplit la grille
    if (!firstClick) {
      const tempGrid = fixBomb(x, y);
      recurseReveale(tempGrid, x, y);
      setGrid(tempGrid);
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
                  revealed={cell.revealed}
                  bomb={cell.bomb}
                  flag={cell.flag}
                  count={cell.count}
                  bombclicked={cell.bombclicked}
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
