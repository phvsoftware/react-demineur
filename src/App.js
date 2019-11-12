import React, { useState } from "react";
import "./App.css";
import Grid from "./composants/Grid";
import Score from "./composants/Score";

function App() {
  const [game, setGame] = useState(0); // 0 = jeu démarré, 1 = gagné, -1 = perdu
  const [score, setScore] = useState(0);
  const [secElapsed, setSecElapsed] = useState(0);
  const [smiley, setSmiley] = useState(1);

  const onStartButton = () => {};

  return (
    <div className="App">
      <h1>Démineur</h1>
      <div className="grid-container">
        <Score onStartButton={onStartButton} smiley={smiley} />
        <Grid setSmiley={setSmiley} setGame={setGame} />
      </div>
    </div>
  );
}

export default App;
