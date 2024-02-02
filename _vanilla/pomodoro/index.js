import { millisecondsToMinsAndSecs } from "./utils.js";

const statuses = Object.freeze({
  PAUSED: "PAUSED",
  STOPPED: "STOPPED",
  COUNTING: "COUNTING",
});

const countdownElt = document.getElementById("countdown");
const startBtnElt = document.getElementById("start-pause-btn");
const progressCircleElt = document.getElementById("circle-progress");

const CIRCLE_RADIUS = 45;
const circumference = 2 * CIRCLE_RADIUS * Math.PI;
const minutes = 1 / 4;
const seconds = minutes * 60;
const milliseconds = seconds * 1000;
let timeLeftInMs = milliseconds;
let intervalId;
let status = statuses.STOPPED;

/** Size of the step in the progress circle each second */
const tickOffset = circumference / seconds;

function click() {
  console.log("[CLICK]");
  if ([statuses.PAUSED, statuses.STOPPED].includes(status)) {
    start();
    return;
  }
  pause();
}

function reset() {
  console.log("[RESET]");
  startBtnElt.innerHTML = "start";
  countdownElt.innerHTML = millisecondsToMinsAndSecs(milliseconds);
  timeLeftInMs = milliseconds;
  progressCircleElt.style.strokeDasharray = circumference;
  progressCircleElt.style.strokeDashoffset = 0;
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
  reset();
}

function tick() {
  console.log("[TICK]");
  timeLeftInMs = Number(timeLeftInMs);
  if (timeLeftInMs < 1000) {
    console.log("< 1000");
  }
  timeLeftInMs -= 1000;
  countdownElt.innerHTML = millisecondsToMinsAndSecs(timeLeftInMs);
  if (timeLeftInMs <= 0) {
    console.log("none");
    stop();

    return;
  }
  let currentOffset = Number(progressCircleElt.style.strokeDashoffset);
  currentOffset -= tickOffset;
  progressCircleElt.style.strokeDashoffset = currentOffset;
}

// START
startBtnElt.addEventListener("click", click);
reset();
