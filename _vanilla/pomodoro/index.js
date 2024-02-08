import Timer from "./app/Timer.js";
import CreateButton from "./app/CreateButton.js";
import { millisecondsToClockTime } from "./app/utils.js";


const timers = [new Timer("main-timer")];
timers.forEach((timer) => timer.draw());
const createBtn = new CreateButton();
createBtn.draw();
const milliseconds = 200000;

console.log("MILLIS FOR :", milliseconds);
console.log("RES :", millisecondsToClockTime(milliseconds));
