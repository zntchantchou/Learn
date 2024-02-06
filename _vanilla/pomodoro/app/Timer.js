import Storage from "./Storage.js";
import { addIdToElements } from "../utils.js";
import { millisecondsToClockTime } from "../utils.js";

function Timer(rootId) {
  this.statuses = Object.freeze({
    PAUSED: "PAUSED",
    STOPPED: "STOPPED",
    COUNTING: "COUNTING",
  });
  this.name = "Default";
  this.status = this.statuses.STOPPED;
  this.timeLeft = this.totalTime;
  this.intervalId;
  // METHODS
  this.draw = draw;
  this.displayTimeLeft = displayTimeLeft;
  this.click = click;
  this.start = start;
  this.tick = tick;
  this.pause = pause;
  this.stop = stop;
  this.reset = reset;
  this.setStatus = setStatus;
  this.getStrokeDashOffset = getStrokeDashOffset;
  this.totalSeconds = totalSeconds;
  this.timeElapsedInSeconds = timeElapsedInSeconds;
  // SVG
  this.circleRadius = 45;
  this.circleCircumference = 2 * this.circleRadius * Math.PI;
  // DOM
  this.startBtnElt;
  this.anchorElt = document.getElementById(rootId);
  this.toggleBtn = toggleBtn;
  this.countDownElt;
  this.svgCircleElt;

  function draw() {
    if (!this.anchorElt) throw new Error("Invalid anchor provided: ", rootId);
    const divs = Array(6)
      .fill(null)
      .map((_) => document.createElement("div"));
    const [
      timerElt,
      countDownContainerElt,
      countDownElt,
      controlsElt,
      startPauseBtn,
      resetBtn,
    ] = addIdToElements(divs, [
      rootId == "timers" ? "timer-stored" : "timer",
      "countdown-ctn",
      "countdown",
      "controls",
      "start-pause-btn",
      "reset-btn",
    ]);
    startPauseBtn.innerHTML = play_unicode_char;
    startPauseBtn.classList.remove("pause-btn");
    startPauseBtn.classList.add("start-btn");
    controlsElt.appendChild(startPauseBtn);
    console.log("resetBtn ", resetBtn);
    controlsElt.appendChild(resetBtn);

    this.startBtnElt = startPauseBtn;
    this.startBtnElt.addEventListener("click", () => this.click());
    countDownContainerElt.innerHTML = `
    <svg viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="45" transform="rotate(-90, 50, 50)" id="circle-progress">
    <circle cx="50" cy="50" r="48" id="circle-background">
    </svg>
    `;
    countDownContainerElt.appendChild(countDownElt);
    this.countDownElt = countDownElt;
    this.svgCircleElt = countDownContainerElt.children[0];
    timerElt.appendChild(countDownContainerElt);
    timerElt.appendChild(controlsElt);
    this.anchorElt.appendChild(timerElt);
    this.reset();
  }

  function setStatus(status) {
    this.status = status;
  }

  function start() {
    console.log("[START]");
    this.intervalId = setInterval(() => {
      this.tick();
    }, 1000);
    this.setStatus(this.statuses.COUNTING);
    this.toggleBtn();
  }

  function pause() {
    console.log("[PAUSE]", this.statuses);
    clearInterval(this.intervalId);
    this.status = this.statuses.PAUSED;
    this.toggleBtn();
  }

  function stop() {
    console.log("[STOP]", this.statuses);
    clearInterval(this.intervalId);
    this.status = this.statuses.STOPPED;
    this.toggleBtn();
    this.timeLeft = this.totalTime;
    this.svgCircleElt.strokeDashoffset = this.getStrokeDashOffset();
    Storage.updateCurrentTimer({ timeLeft: this.timeLeft });
    this.displayTimeLeft();
  }

  function getStrokeDashOffset() {
    if (!(this.totalSeconds() && this.timeElapsedInSeconds())) return 0;
    if (this.timeElapsedInSeconds() >= this.totalSeconds()) return 0;
    return (
      (this.circleCircumference / this.totalSeconds()) *
      this.timeElapsedInSeconds() *
      -1
    );
  }

  function timeElapsedInSeconds() {
    if (this.timeLeft >= this.totalTime) return this.totalSeconds();
    return (this.totalTime - this.timeLeft) / 1000;
  }

  function totalSeconds() {
    return this.totalTime ? this.totalTime / 1000 : 0;
  }

  function reset() {
    console.log("[RESET]", this);
    this.status = this.statuses.STOPPED;
    let currentTimer = Storage.getCurrentTimer() || DEFAULT_TIMER;
    this.timeLeft = currentTimer.timeLeft;
    this.totalTime = currentTimer.totalTime;
    this.svgCircleElt.style.strokeDasharray = this.circleCircumference;
    this.svgCircleElt.style.strokeDashoffset = this.getStrokeDashOffset();
    this.displayTimeLeft();
  }

  function displayTimeLeft() {
    this.countDownElt.innerHTML = millisecondsToClockTime(this.timeLeft);
  }

  function tick() {
    console.log("[TICK]", this);
    this.timeLeft -= 1000;
    this.svgCircleElt.style.strokeDashoffset = this.getStrokeDashOffset();
    Storage.updateCurrentTimer({ timeLeft: this.timeLeft });
    this.displayTimeLeft();
    if (this.timeLeft < 1000) {
      return this.stop();
    }
  }

  function click() {
    console.log("CLICK", this);
    if (this.status === this.statuses.COUNTING) {
      this.pause();
    } else {
      this.start();
    }
  }

  function toggleBtn() {
    console.log("[toggleBtn]");
    if ([this.statuses.STOPPED, this.statuses.PAUSED].includes(this.status)) {
      this.startBtnElt.innerHTML = play_unicode_char;
      this.startBtnElt.classList.remove("pause-btn");
      this.startBtnElt.classList.add("start-btn");
      return;
    }
    this.startBtnElt.classList.add("pause-btn");
    this.startBtnElt.classList.remove("start-btn");
    this.startBtnElt.innerHTML = "||";
  }
}

export default Timer;

const play_unicode_char = "&#9654";
