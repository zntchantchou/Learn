import Storage from "./Storage.js";
import Timer from "./Timer.js";
import { millisecondsToMinsAndSecs } from "./utils.js";

const PLAY_CHAR = "&#9654";
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
const minutes = 0;
const seconds = minutes * 60;
let milliseconds = seconds * 1000;
let timeLeftInMs = milliseconds;
let intervalId;
let status = statuses.STOPPED;
new Timer();
// /** Size of the step in the progress circle each second */
// function getTickOffset() {
//   return circumference / (Storage.getCurrentTimer().totalTime / 1000);
// }

// function click() {
//   console.log("[CLICK]");
//   if (status === statuses.COUNTING) {
//     pause();
//   } else {
//     start();
//   }
// }

// function getTimeElapsed() {
//   let result;
//   const currentTimer = Storage.getCurrentTimer();
//   if (!currentTimer) return 0;
//   result = (currentTimer.totalTime - currentTimer.timeLeft) / 1000;
//   return currentTimer.totalTime > currentTimer.timeLeft ? result : 0;
// }

// function resetCounter() {
//   toggleBtn();
//   let timeLeft;
//   let currentTimer = Storage.getCurrentTimer() || DEFAULT_TIMER;
//   timeLeft = currentTimer.timeLeft;
//   const tickOffset = getTickOffset();
//   timeLeftInMs = timeLeft;
//   countdownElt.innerHTML = millisecondsToMinsAndSecs(timeLeft);
//   progressCircleElt.style.strokeDasharray = circumference;
//   const strokeDashoffset = -1 * tickOffset * getTimeElapsed();
//   progressCircleElt.style.strokeDashoffset = strokeDashoffset;
//   progressCircleElt.style.stroke = "rgb(186, 73, 73)";
//   progressCircleElt.style.visibility = "visible";
//   // disable animation when resetting
//   progressCircleElt.style.transition = "stroke-dashoffset 0s";
// }

// function start() {
//   console.log("[START]");
//   status = statuses.COUNTING;
//   toggleBtn();
//   intervalId = setInterval(tick, 1000);
//   progressCircleElt.transition =
//     "stroke-dashoffset 0.2s cubic-bezier(0.23, 1, 0.32, 1)";
//   progressCircleElt.style.stroke = "rgb(186, 73, 73)";
//   progressCircleElt.style.visibility = "visible";
// }

// function toggleBtn() {
//   console.log("[toggleBtn]");
//   if ([statuses.STOPPED, statuses.PAUSED].includes(status)) {
//     startBtnElt.innerHTML = PLAY_CHAR;
//     startBtnElt.classList.remove("pause-btn");
//     startBtnElt.classList.add("start-btn");
//     return;
//   }
//   startBtnElt.classList.add("pause-btn");
//   startBtnElt.classList.remove("start-btn");
//   startBtnElt.innerHTML = "||";
// }

// function pause() {
//   console.log("[PAUSE]");
//   status = statuses.PAUSED;
//   toggleBtn();
//   clearInterval(intervalId);
// }

// function stop() {
//   console.log("[STOP]");
//   status = statuses.STOPPED;
//   toggleBtn();
//   const currentTimer = Storage.getCurrentTimer();
//   Storage.updateCurrentTimer({ timeLeft: currentTimer.totalTime });
//   clearInterval(intervalId);
//   resetCounter();
// }

// function tick() {
//   console.log(
//     "--------------------------------------------- [TICK]  ---------------------------------------------"
//   );
//   console.log("Status", status);
//   timeLeftInMs = Number(timeLeftInMs);
//   timeLeftInMs -= 1000;
//   countdownElt.innerHTML = millisecondsToMinsAndSecs(timeLeftInMs);
//   Storage.updateCurrentTimer({
//     timeLeft: timeLeftInMs,
//   });
//   let currentOffset = Number(progressCircleElt.style.strokeDashoffset);
//   currentOffset -= getTickOffset();
//   progressCircleElt.style.strokeDashoffset = currentOffset;
//   if (timeLeftInMs <= 0) return stop();
// }

// // START
// startBtnElt.addEventListener("click", click);
// resetCounter();
