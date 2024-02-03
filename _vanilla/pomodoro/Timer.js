import { addIdToElements } from "./utils.js";

function Timer() {
  // circle configuration
  this.statuses = Object.freeze({
    PAUSED: "PAUSED",
    STOPPED: "STOPPED",
    COUNTING: "COUNTING",
  });
  this.name = "Default";
  this.status = this.statuses.PAUSED;
  this.anchorElementId = "background";
  this.anchorElt;
  this.totalTime = 25000;
  this.timeLeft = this.totalTime;
  this.draw = draw;
  this.play_unicode_char = "&#9654";
  draw();

  function draw() {
    const divs = Array(5)
      .fill(null)
      .map((_) => document.createElement("div"));
    const [
      timerElt,
      countDownContainerElt,
      countDownElt,
      controlsElt,
      startPauseBtn,
    ] = addIdToElements(divs, [
      "timer",
      "countdown-ctn",
      "countdown",
      "controls",
      "start-pause-btn",
    ]);
    controlsElt.appendChild(startPauseBtn);
    countDownContainerElt.innerHTML = `
    <svg viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="45" transform="rotate(-90, 50, 50)" id="circle-progress">
    <circle cx="50" cy="50" r="48" id="circle-background">
    </svg>
    `;
    countDownContainerElt.appendChild(countDownElt);
    timerElt.appendChild(countDownContainerElt);
    timerElt.appendChild(controlsElt);
    console.log("anchor", this);
    anchorElt.appendChild(timerElt);
  }
  // pause
  // stop
  // start
  // toggleBtn
  // reset
  // editing
}

export default Timer;

const anchorElt = document.getElementById("background");
