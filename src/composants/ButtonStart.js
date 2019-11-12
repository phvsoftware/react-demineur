import React from "react";
import "./ButtonStart.css";
import smiley1 from "../images/smiley1.bmp";
import smiley2 from "../images/smiley2.bmp";
import smiley3 from "../images/smiley3.bmp";
import smiley4 from "../images/smiley3.bmp";

const ButtonStart = ({ smileyIndex }) => {
  return (
    <div className="button-start">
      {smileyIndex === 1 && <img src={smiley1} alt="" />}
      {smileyIndex === 2 && <img src={smiley2} alt="" />}
      {smileyIndex === 3 && <img src={smiley3} alt="" />}
      {smileyIndex === 4 && <img src={smiley4} alt="" />}
    </div>
  );
};

export default ButtonStart;
