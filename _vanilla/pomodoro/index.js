import Timer from "./app/Timer.js";
import CreateButton from "./app/CreateButton.js";
import { millisecondsToClockTime } from "./utils.js";


// const storedTimers = Array(30)
//   .fill(null)
//   .map((_) => new Timer("timers"));

const timers = [new Timer("main-timer")]
// .concat(storedTimers);
timers.forEach((timer) => timer.draw());
const createBtn = new CreateButton();
createBtn.draw();


const milliseconds = 20000000 
console.log('MILLIS FOR :', milliseconds);
console.log('RES :', millisecondsToClockTime(milliseconds));