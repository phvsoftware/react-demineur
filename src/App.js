import React, { useState, useEffect } from "react";
import "./App.css";
import Grid from "./composants/Grid";
import Score from "./composants/Score";

let interval = null;
let timer = 0;

function App() {
  const [game, setGame] = useState(0); // 0 = jeu en attente, 1 = jeu démarré, 2 = gagné, -1 = perdu
  const [bombLeft, setBombLeft] = useState(0);
  const [secElapsed, setSecElapsed] = useState(0);
  const [smiley, setSmiley] = useState(1);

  useEffect(() => {
    if (game === 1) {
      startTimer();
    } else if (game === 2 || game === -1) {
      stopTimer();
    }
  }, [game]);

  const onStartButton = () => {
    stopTimer();
    setSmiley(1);
    setBombLeft(0);
    setSecElapsed(0);
    setGame(0);
  };

  const incTimer = () => {
    timer++;
    setSecElapsed(timer);
  };

  const startTimer = () => {
    timer = 0;
    interval = setInterval(() => {
      incTimer();
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(interval);
    timer = 0;
  };

  return (
    <div className="App">
      <div className="amiga-window-outer">
        <div className="amiga-window-title">
          <div className="amiga-close-window-outer">
            <div className="amiga-close-window-inner"></div>
            <div className="amiga-close-window-outer-border"></div>
          </div>
          <div className="amiga-window-title-text">Amiga Démineur par PhV</div>
        </div>
        <div className="grid-container">
          <Score onStartButton={onStartButton} smiley={smiley} bombLeft={bombLeft} secElapsed={secElapsed} />
          <Grid setSmiley={setSmiley} game={game} setGame={setGame} bombLeft={bombLeft} setBombLeft={setBombLeft} />
        </div>
      </div>
    </div>
  );
}

export default App;
