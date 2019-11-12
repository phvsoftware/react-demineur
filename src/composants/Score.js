import React from "react";
import "./Score.css";
import Counter from "./Counter";
import ButtonStart from "./ButtonStart";

const Score = ({ mineCount, secCount }) => {
  return (
    <div className="score-container">
      <Counter value={9} />
      <ButtonStart smileyIndex={1} />
      <Counter value={10} />
    </div>
  );
};

export default Score;
