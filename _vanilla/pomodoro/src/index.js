import Storage from "./Storage.js";
import { millisecondsToMinsAndSecs } from "./utils.js";

const statuses = Object.freeze({
  PAUSED: "PAUSED",
  STOPPED: "STOPPED",
  COUNTING: "COUNTING",
});

const DEFAULT_TIMER = {
  name: "Default",
  totalTime: 10000,
  timeLeft: 1000,
}

const countdownElt = document.getElementById("countdown");
const startBtnElt = document.getElementById("start-pause-btn");
const progressCircleElt = document.getElementById("circle-progress");

const CIRCLE_RADIUS = 45;
const circumference = 2 * CIRCLE_RADIUS * Math.PI;
const minutes = 0;
const seconds = minutes * 60;
let milliseconds = seconds * 1000;
let timeLeftInMs = milliseconds;
let intervalId;
let status = statuses.STOPPED;

/** Size of the step in the progress circle each second */ 
function getTickOffset() {
  return circumference / (storage.getCurrentTimer().totalTime / 1000);
}

function click() {
  console.log("[CLICK]");
  if (status === statuses.COUNTING) {
    pause();
  } else {
    start();
  }
}

function getTimeElapsed() {
  const currentTimer = storage.getCurrentTimer();
  let result = 0;
  let hasDecremented = currentTimer && currentTimer.totalTime > currentTimer.timeLeft
  if(hasDecremented) {
    result = (currentTimer.totalTime - currentTimer.timeLeft) / 1000;
  }
  return result;
}


function resetCounter() {
  console.log("[RESET]");
  startBtnElt.innerHTML = "start";
  const timeLeft = storage.getCurrentTimer().timeLeft;
  const tickOffset = getTickOffset();
  timeLeftInMs = timeLeft;
  countdownElt.innerHTML = millisecondsToMinsAndSecs(timeLeft);
  console.log('TIME ELAPSED', getTimeElapsed())
  console.log('Tick offset', tickOffset);
  progressCircleElt.style.strokeDasharray = circumference;
  progressCircleElt.style.strokeDashoffset = -1* tickOffset * getTimeElapsed();
  progressCircleElt.style.stroke = "rgb(186, 73, 73)";
  progressCircleElt.style.visibility = "visible";
  // disable animation when resetting
  progressCircleElt.style.transition = "stroke-dashoffset 0s";
}

function start() {
  console.log("[START]");
  if(status !== statuses.PAUSED) {
    progressCircleElt.style.strokeDashoffset = 0;
  } 
  status = statuses.COUNTING;
  startBtnElt.innerHTML = "pause";
  intervalId = setInterval(tick, 1000);
  progressCircleElt.transition =
    "stroke-dashoffset 0.2s cubic-bezier(0.23, 1, 0.32, 1)";
  progressCircleElt.style.stroke = "rgb(186, 73, 73)";
  progressCircleElt.style.visibility = "visible";
}

function pause() {
  console.log("[PAUSE]");
  status = statuses.PAUSED;
  startBtnElt.innerHTML = "start";
  clearInterval(intervalId);
}

function stop() {
  console.log("[STOP]");
  status = statuses.STOPPED;
  clearInterval(intervalId);
  progressCircleElt.style.visibility = "hidden";
  resetCounter();
}

function tick() {
  console.log("[TICK]");
  timeLeftInMs = Number(timeLeftInMs);
  if (timeLeftInMs < 1000) {
    console.log("< 1000");
  }
  timeLeftInMs -= 1000;

  countdownElt.innerHTML = millisecondsToMinsAndSecs(timeLeftInMs);
  storage.updateCurrentTimer({...storage.getCurrentTimer(), timeLeft: timeLeftInMs})

  if (timeLeftInMs <= 0) {
    console.log("none");
    stop();

    return;
  }
  let currentOffset = Number(progressCircleElt.style.strokeDashoffset);
  currentOffset -= getTickOffset();
  progressCircleElt.style.strokeDashoffset = currentOffset;
}

// START
startBtnElt.addEventListener("click", click);
const storage = new Storage();
resetCounter();
