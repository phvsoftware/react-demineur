import React, { useState, useEffect } from "react";
import "./App.css";
import Grid from "./composants/Grid";
import Score from "./composants/Score";
import amigaTitle from "./images/amiga-title.png";
import windowsTitle from "./images/windows-title.png";

let interval = null;
let timer = 0;

function App() {
  const [game, setGame] = useState(0); // 0 = jeu en attente, 1 = jeu démarré, 2 = gagné, -1 = perdu
  const [bombLeft, setBombLeft] = useState(0);
  const [secElapsed, setSecElapsed] = useState(0);
  const [smiley, setSmiley] = useState(1);
  const [theme, setTheme] = useState("amiga");
  const [menuOpen, setMenuOpen] = useState(false);
  const [level, setLevel] = useState("beginner");

  useEffect(() => {
    document.addEventListener("mousedown", clickOutsideMenu);
  }, []);

  useEffect(() => {
    if (game === 1) {
      startTimer();
    } else if (game === 2 || game === -1) {
      stopTimer();
    }
  }, [game]);

  useEffect(() => {
    // si on gagne sur mobile après un appui long pour mettre un drapeau, on a un setTimeout qui va remettre le smiley à 1 alors qu'on a gagné
    if (smiley === 1) {
      if (game === 2) {
        setSmiley(4);
      } else if (game === -1) {
        setSmiley(3);
      }
    }
  }, [smiley]);

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

  const clickOutsideMenu = e => {
    if (!e.target.className.includes("amiga-menu-item")) {
      setMenuOpen(false);
    }
  };

  return (
    <div className={theme + "-app disable-selection"}>
      <div className={theme + "-window-outer"}>
        <div className={theme + "-window-title"}>
          <div
            className="invisible-menu"
            onClick={event => {
              setMenuOpen(!menuOpen);
            }}
          ></div>
          {menuOpen && (
            <div className="amiga-menu">
              <ul>
                <li
                  className={theme === "windows" ? "amiga-menu-item select" : "amiga-menu-item"}
                  onClick={() => {
                    setMenuOpen(false);
                    setTheme("windows");
                  }}
                >
                  Thème Windows 3.1
                </li>
                <li
                  className={theme === "amiga" ? "amiga-menu-item select" : "amiga-menu-item"}
                  onClick={() => {
                    setMenuOpen(false);
                    setTheme("amiga");
                  }}
                >
                  Thème Amiga
                </li>
                {/* <hr />
                <li
                  className={level === "beginner" ? "amiga-menu-item select" : "amiga-menu-item"}
                  onClick={() => {
                    setMenuOpen(false);
                    setLevel("beginner");
                  }}
                >
                  Niveau débutant
                </li>
                <li
                  className={level === "intermediate" ? "amiga-menu-item select" : "amiga-menu-item"}
                  onClick={() => {
                    setMenuOpen(false);
                    setLevel("intermediate");
                  }}
                >
                  Niveau intermédiaire
                </li>
                <li
                  className={level === "expert" ? "amiga-menu-item select" : "amiga-menu-item"}
                  onClick={() => {
                    setMenuOpen(false);
                    setLevel("expert");
                  }}
                >
                  Niveau expert
                </li> */}
                <hr />
                <li
                  className="amiga-menu-item"
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                >
                  Informations...
                </li>
              </ul>
            </div>
          )}
          <img src={theme === "amiga" ? amigaTitle : windowsTitle} className="amiga-title-img" alt="" />
          <div className={theme + "-window-title-text"}>
            Démineur<span className="micro-text">© 2019 PhvSoftware</span>
          </div>
        </div>
        <div className={theme + "-grid-container"}>
          <Score onStartButton={onStartButton} smiley={smiley} bombLeft={bombLeft} secElapsed={secElapsed} />
          <Grid
            setSmiley={setSmiley}
            game={game}
            setGame={setGame}
            bombLeft={bombLeft}
            setBombLeft={setBombLeft}
            level={level}
            onStartButton={onStartButton}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
