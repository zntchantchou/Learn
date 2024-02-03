import Storage from "./Storage.js";
import { addIdToElements } from "./utils.js";

function Timer() {
  this.statuses = Object.freeze({
    PAUSED: "PAUSED",
    STOPPED: "STOPPED",
    COUNTING: "COUNTING",
  });
  this.name = "Default";
  this.status = this.statuses.STOPPED;
  this.anchorElt = document.getElementById("background");
  this.startBtnElt;
  this.timeLeft = this.totalTime;
  this.draw = draw;
  this.intervalId;
  this.milliseconds = this.seconds * 1000;
  this.timeLeftInMs = this.milliseconds;
  this.click = click;
  this.start = start;
  this.toggleBtn = toggleBtn;
  this.tick = tick;
  this.pause = pause;
  this.stop = stop;
  this.reset = reset;
  this.setStatus = setStatus;
  this.svgCircleElt;
  this.getStrokeDashOffset = getStrokeDashOffset;
  this.totalSeconds = totalSeconds;
  this.timeElapsedInSeconds = timeElapsedInSeconds;
  // circle configuration
  this.circleRadius = 45;
  this.circleCircumference = 2 * this.circleRadius * Math.PI;

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
    startPauseBtn.innerHTML = play_unicode_char;
    startPauseBtn.classList.remove("pause-btn");
    startPauseBtn.classList.add("start-btn");
    controlsElt.appendChild(startPauseBtn);
    this.startBtnElt = startPauseBtn;
    this.startBtnElt.addEventListener("click", () => {
      this.click();
      console.log("STATUS : ", this.status);
    });
    countDownContainerElt.innerHTML = `
    <svg viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="45" transform="rotate(-90, 50, 50)" id="circle-progress">
    <circle cx="50" cy="50" r="48" id="circle-background">
    </svg>
    `;
    countDownContainerElt.appendChild(countDownElt);
    this.svgCircleElt = countDownContainerElt.children[0];
    console.log("svgCircleElt ", this.svgCircleElt);
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
    console.log("STOK DASH OFFSET", this.getStrokeDashOffset());
    Storage.updateCurrentTimer({ timeLeft: this.timeLeft });
  }

  function getStrokeDashOffset() {
    // console.log("this.circ", this.circleCircumference, this.totalSeconds());
    // console.log("this.timeElapsed", this.timeElapsedInSeconds());
    if (!(this.totalSeconds() && this.timeElapsedInSeconds())) return 0;
    if (this.timeElapsedInSeconds() >= this.totalSeconds()) return 0;
    console.log("total seconds", this.totalSeconds());
    console.log("TEIS", this.timeElapsedInSeconds());
    return (
      (this.circleCircumference / this.totalSeconds()) *
      this.timeElapsedInSeconds() *
      -1
    );
  }

  function timeElapsedInSeconds() {
    // console.log("TIME ELSAPSED ", this.timeLeft, this.totalTime);
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
    console.log("GET STROKE DASH OFFSET", this.getStrokeDashOffset());
    this.svgCircleElt.style.strokeDashoffset = this.getStrokeDashOffset();
    console.log("reset ", this.timeLeft);
  }

  function tick() {
    console.log("[TICK]", this);
    console.log("[TICKING] ABOVE 1000");
    this.timeLeft -= 1000;
    this.svgCircleElt.style.strokeDashoffset = this.getStrokeDashOffset();
    Storage.updateCurrentTimer({ timeLeft: this.timeLeft });
    if (this.timeLeft < 1000) {
      console.log("TICK OFFSET <= 1000 ", this.getStrokeDashOffset());
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
  // pause
  // stop
  // toggleBtn
  // reset
  // editing
}

export default Timer;

const play_unicode_char = "&#9654";
