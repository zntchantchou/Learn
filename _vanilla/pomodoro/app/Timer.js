// import Storage from "./Storage.js";
import Storage from "./Storage.js";
import { addIdToElements } from "./utils.js";
import { millisecondsToClockTime } from "./utils.js";

function Timer({ name = "default", totalTime = 5000 }) {
  this.statuses = Object.freeze({
    PAUSED: "PAUSED",
    STOPPED: "STOPPED",
    COUNTING: "COUNTING",
  });
  this.name = name;
  this.status = this.statuses.STOPPED;
  this.timeLeft = this.totalTime;
  this.totalTime = totalTime;
  this.intervalId;
  // METHODS
  this.draw = draw;
  this.displayTimeLeft = displayTimeLeft;
  this.stop = stop;
  this.tick = tick.bind(this);
  this.syncWithStorage = syncWithStorage;
  this.start = start;
  this.pause = pause;
  this.updateProgressCircle = updateProgressCircle;

  this.setStatus = setStatus;
  this.getStrokeDashOffset = getStrokeDashOffset;
  this.totalSeconds = totalSeconds;
  this.timeElapsedInSeconds = timeElapsedInSeconds;
  // SVG
  this.circleRadius = 45;
  this.circleCircumference = 2 * this.circleRadius * Math.PI;
  // DOM
  this.startBtnElt;
  this.anchorElt = document.getElementById("main-timer");
  this.toggleBtn = toggleBtn;
  this.countDownElt;
  this.svgCircleElt;

  // Storage.createTimer(this.name, this.totalTime);

  function start() {
    console.log("START");
    console.log("WATCH HAHA");
    Storage.addTimeStamp(this.name);
  }

  function draw() {
    if (!this.anchorElt)
      throw new Error("Invalid anchor provided: ", "main-timer");
    const divs = Array(6)
      .fill(null)
      .map((_) => document.createElement("div"));
    const [
      timerElt,
      countDownContainerElt,
      countDownElt,
      controlsElt,
      startPauseBtn,
      restartBtn,
    ] = addIdToElements(divs, [
      "timer",
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
    controlsElt.appendChild(restartBtn);
    this.startBtnElt = startPauseBtn;
    restartBtn.addEventListener("click", () => this.stop());
    this.startBtnElt.addEventListener("click", () => this.toggleBtn());
    countDownContainerElt.innerHTML = `
    <svg viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="45" transform="rotate(-90, 50, 50)" id="circle-progress">
    <circle cx="50" cy="50" r="48" id="circle-background">
    </svg>
    `;
    countDownContainerElt.appendChild(countDownElt);
    this.countDownElt = countDownElt;
    this.svgCircleElt = countDownContainerElt.children[0];
    // here use timeleft to calculate strokeDashoffset
    this.svgCircleElt.style.strokeDasharray = this.circleCircumference;
    timerElt.appendChild(countDownContainerElt);
    timerElt.appendChild(controlsElt);
    this.anchorElt.appendChild(timerElt);
    // move to setup function
    this.syncWithStorage();
		window.onbeforeunload = function() {
			console.log('ON before upload');
			// if(this.status === this.statuses.COUNTING) {
				Storage.addTimeStamp(this.name);
			localStorage.setItem('name', JSON.stringify(this.name)); 
			console.log('----- timestamp saved ---')
			// }
		}
		console.log("TIME ELAPSED", Storage.getTimeElapsedInMs(this.name));
  }

  function syncWithStorage() {
    const timerObj = Storage.getTimerByName(this.name);
    this.totalTime = timerObj.timer.totalTime;
    console.log("syncWithStorage", timerObj);
    this.timeLeft = this.totalTime - Storage.getTimeElapsedInMs(this.name);
    // calculate timeleft from timestamps;
    console.log("TIMER LEFT ", this.timeLeft);
    this.displayTimeLeft();
    this.updateProgressCircle();
  }

  function updateProgressCircle() {
    console.log("updateProgressCircle ");
    if (Storage.getTimeElapsedInMs(this.name) <= 0) return;
    const percentage = Storage.getTimeElapsedInMs(this.name) / this.totalTime;
    const strokeDashoffset = percentage * this.circleCircumference;
    this.svgCircleElt.style.strokeDashoffset = strokeDashoffset * -1;
  }

  function setStatus(status) {
    this.status = status;
  }

  function stop() {
    console.log("[stop]", this.intervalId);
    this.timeLeft = this.totalTime;
    clearInterval(this.intervalId);
    Storage.clearTimer(this.name);
    this.setStatus(this.statuses.STOPPED);
    this.svgCircleElt.style.strokeDashoffset = this.getStrokeDashOffset();
    this.displayTimeLeft();
  }

  function start() {
    console.log("[start]");
    if (this.status == this.statuses.COUNTING) return;
    this.setStatus(this.statuses.COUNTING);
    Storage.addTimeStamp(this.name);
    this.intervalId = window.setInterval(this.tick, 1000);
  }

  function pause() {
    console.log("[pause] ", this.intervalId);
    this.setStatus(this.statuses.PAUSED);
    Storage.addTimeStamp(this.name);
    clearInterval(this.intervalId);
  }

  function tick() {
    if (this.timeLeft <= 1000) {
      this.stop();
      return;
    }
    this.timeLeft -= 1000;
    this.svgCircleElt.style.strokeDashoffset = this.getStrokeDashOffset();
    this.displayTimeLeft();
    const elapsed = Storage.getTimeElapsedInMs(this.name);
    console.log("elapsed ", elapsed);
    console.log("totalTime ", this.totalTime);
    return;
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
    if (this.timeLeft >= this.totalTime) {
      console.log("this.totalSeconds", this.totalSeconds());
      return 0;
    }
    return (this.totalTime - this.timeLeft) / 1000;
  }

  function totalSeconds() {
    return this.totalTime ? this.totalTime / 1000 : 0;
  }

  function displayTimeLeft() {
    this.countDownElt.innerHTML = millisecondsToClockTime(this.timeLeft);
  }

  function toggleBtn() {
    console.log("[toggleBtn]");
    if ([this.statuses.STOPPED, this.statuses.PAUSED].includes(this.status)) {
      this.startBtnElt.classList.remove("pause-btn");
      this.startBtnElt.classList.add("start-btn");
      this.startBtnElt.innerHTML = "||";
      this.start();
      return;
    }
    this.startBtnElt.classList.add("pause-btn");
    this.startBtnElt.classList.remove("start-btn");
    this.startBtnElt.innerHTML = play_unicode_char;
    this.pause();
    return;
  }
}

export default Timer;

const play_unicode_char = "&#9654";
