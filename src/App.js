import React from "react";
import "./App.css";
import Grid from "./composants/Grid";
import Score from "./composants/Score";

function App() {
  return (
    <div className="App">
      <h1>Démineur</h1>
      <div className="grid-container">
        <Score />
        <Grid />
      </div>
    </div>
  );
}

export default App;
