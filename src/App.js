import React, { useEffect, useState } from "react";
import './App.css';
import './game.css';
import { moveCircles, headerTitle, tableOfContents, aboutMe, projects, sortBy, checkSort, addModels } from './section_script/sectionScripts.js';
import { run_game } from "./section_script/game";

function App() {

  useEffect(() => {
    headerTitle();
    moveCircles();
    addModels();

    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);



  const themeChange = () => {

    const BODY = document.body;
    const THEME_IMG = document.getElementById("themeImage");
    const THEME_LABEL = document.getElementById("themeLabel");
    let bodyID = BODY.id;
    console.log(THEME_IMG.src)

    if (bodyID == "body")
    {
      BODY.id = "darkBody";
      THEME_IMG.src = process.env.PUBLIC_URL + "/img/light-mode.png";
      THEME_LABEL.innerHTML = "GO LIGHT";
    }
    else
    {
      BODY.id = "body";
      THEME_IMG.src = process.env.PUBLIC_URL + "/img/dark-mode.png";
      THEME_LABEL.innerHTML = "GO DARK";
    }
  }

  const handleScroll = () => {
    if (document.querySelector(".App-header").getBoundingClientRect().top < 0) {
      tableOfContents();
      aboutMe();
    }

    const abtmeRect = document.querySelector(".App-about-me").getBoundingClientRect();

    if (abtmeRect.top < -(abtmeRect.height / 1.2)) {
      projects();
    }
  }

  const gameCanvasStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/img/game/background.gif)`,
  };
  const startStopGame = () => {

    const startStopButton = document.getElementById("gameStartStopButton");
  
    if (startStopButton.value == "Start")
    {
      run_game(true);
    }
    else
    {
      run_game(false)
    }
  }

  const [checkedBoxes, setCheckedBoxes] = useState({
    "C++": true,
    "Python": true,
    "JavaScript": true,
    "HTML/CSS": true,
    "Bash": true,
    "Racket": true,
    "WordPress": true,
    "PHP": true,
    "SQL": true
  });
  
  const handleCheckboxChange = (event) => {
    const checkboxName = event.target.name;
    const isChecked = event.target.checked;
    setCheckedBoxes({
      ...checkedBoxes,
      [checkboxName]: isChecked
    });

    checkSort(checkboxName);
  }

  return (

    <div className="App">
      <div className="theme-button-container">
        <p className="theme-label" id="themeLabel">Go Dark</p>
        <div className="theme-button" id="themeButton" onClick={themeChange}>
          <img src={process.env.PUBLIC_URL + "/img/dark-mode.png"} alt="dark mode" id="themeImage"></img>
        </div>
      </div>

      <a id="top"></a>
      <header className="App-header">
        <div className="circle small"></div>
        <div className="circle small"></div>
        <div className="circle small"></div>
        <div className="circle small"></div>
        <div className="circle medium"></div>
        <div className="circle medium"></div>
        <div className="circle medium"></div>
        <div className="circle medium"></div>
        <div className="circle large"></div>
        <div className="circle large"></div>
        <div className="circle large"></div>
        <div className="circle large"></div>
        <canvas id="header-canvas"></canvas>
      </header>
      <div className="App-table-of-contents">
        <canvas id="table-of-contents-canvas"></canvas>
      </div>
      <a id="AboutMe"></a>
      <div className="App-about-me">
        <canvas id="about-me-canvas"></canvas>
      </div>

      <a id="Game"></a>
      <div className="App-game">
        <div id="gameNavBar">
          <input type="button" id="gameStartStopButton" value="Start" readOnly onClick={startStopGame}/>
          <div className="game-header"><p>Asteroid Field</p></div>
          <input type="text" value="0" id="scoreDisplay" readOnly/>
        </div>
        <div id="gameMenu" className="animate-in">
          <p>Press the start button to play</p>
          <p id="gamePrevScore">Your Score: {window.localStorage.getItem("prevScore")}</p>
          <p id="gameHighScore">High Score: {window.localStorage.getItem("highScore")}</p>
        </div>
        <canvas id="game-canvas" style={gameCanvasStyle}></canvas>
      </div>
      <div className="line"></div>
      <a id="Projects"></a>
      <div className="App-projects">
        <canvas id="projects-canvas"></canvas>
        <div className="App-projects-select-container" id="App-projects-select-container">
          <div className="App-projects-select-container-nav" id="projects-nav">
            <label></label>Sort By: 
            <select name="sortby" id="sortby" className='App-projects-select-container-nav-select' onChange={sortBy}>
              <option value="best">Best</option>
              <option value="new">Date - New</option>
              <option value="old">Date - Old</option>
            </select>
            <div id="languageOptions" className="animate-in checkbox-wrapper-13">
              <label>
              <input type="checkbox" name="C++" id='C++' checked={checkedBoxes["C++"]} onChange={handleCheckboxChange} />
              C++
              </label>
              <label>
                <input type="checkbox" name="Python" id='Python' checked={checkedBoxes["Python"]} onChange={handleCheckboxChange} />
                Python
              </label>
              <label>
                <input type="checkbox" name="JavaScript" id='JavaScript' checked={checkedBoxes["JavaScript"]} onChange={handleCheckboxChange} />
                JavaScript
              </label>
              <br />
              <label>
                <input type="checkbox" name="HTML/CSS" id='HTML/CSS' checked={checkedBoxes["HTML/CSS"]} onChange={handleCheckboxChange} />
                HTML/CSS
              </label>
              <label>
                <input type="checkbox" name="Bash" id="Bash" checked={checkedBoxes["Bash"]} onChange={handleCheckboxChange} />
                Bash
              </label>
              <label>
                <input type="checkbox" name="Racket" id="Racket" checked={checkedBoxes["Racket"]} onChange={handleCheckboxChange} />
                Racket
              </label>
              <label>
                <input type="checkbox" name="PHP" id="PHP" checked={checkedBoxes["PHP"]} onChange={handleCheckboxChange} />
                PHP
              </label>
              <label>
                <input type="checkbox" name="SQL" id="SQL" checked={checkedBoxes["SQL"]} onChange={handleCheckboxChange} />
                SQL
              </label>
            </div>
          </div>
        </div>
        <div id="modalContainer"></div>
      </div>
      <footer className="footer" id="footer">
        <div className="footer-link-container">
          <p>Connect with me on Linkedin! : </p>
          <a href="https://www.linkedin.com/in/jasper-charlinski-02ab41238" target="_blank">&nbsp;Jasper Charlinski</a>
          <a href="https://www.linkedin.com/in/jasper-charlinski-02ab41238" target="_blank"><img src={process.env.PUBLIC_URL + "/img/linkedIn-Icon.png"}alt="linkedin-icon" className="footer-link-img"></img></a>
        </div>
        <div className="footer-link-container">
          <p>Send me an Email to get in contact : </p>
          <a href="mailto:jjcharlinski@gmail.com">&nbsp;jjcharlinski@gmail.com</a>
          <a href="mailto:jjcharlinski@gmail.com"><img src={process.env.PUBLIC_URL + "/img/mail-Icon.png"}alt="email-icon" className="footer-link-mail"></img></a>
        </div>
        <div className="footer-link-container">
          <p>To see more of my projects visit my GitHub : </p>
          <a href="https://github.com/charlijj" target="_blank">&nbsp;charlijj</a>
          <a href="https://github.com/charlijj" target="_blank"><img src={process.env.PUBLIC_URL + "/img/github-Icon.png"}alt="github-icon" className="footer-link-img"></img></a>
        </div>
        <p>View <a href="https://github.com/charlijj/portfolio-2.0" target="_blank"><strong>source code</strong></a> for this website</p>
        <p>Jasper Charlinski, Feb 16th 2023 &copy;</p>
        <a href="#top"><strong>TOP</strong></a>
        </footer>
    </div>
  );
}

export default App;
