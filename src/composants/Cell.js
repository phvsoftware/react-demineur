import React from "react";
import "./Cell.css";
import mine_gris from "../images/mine_gris.bmp";
import mine_rouge from "../images/mine_rouge.bmp";
import mine_barree from "../images/mine_barree.bmp";
import flag from "../images/drapeau.bmp";

const Cell = props => {
  return (
    <div
      className={props.reveled ? "cell flat-border" : "cell edge-border"}
      onClick={() => props.onLeftClick(props.posX, props.posY)}
      onContextMenu={event => {
        event.preventDefault();
        props.onRightClick(props.posX, props.posY);
      }}
    >
      {props.reveled && props.bomb && <img src={mine_gris} alt="" />}
      {!props.reveled && props.flag && <img src={flag} alt="" />}
      {props.reveled && props.bomb && props.flag && <img src={flag} alt="" />}
      {props.reveled && !props.bomb && props.flag && <img src={mine_barree} alt="" />}
      {props.count > 0 && <h3 className={"color" + props.count}>{props.count}</h3>}
    </div>
  );
};

export default Cell;
