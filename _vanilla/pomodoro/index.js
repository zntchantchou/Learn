import Timer from "./app/Timer.js";

const storedTimers = Array(1000)
  .fill(null)
  .map((_) => new Timer("timers"));

const timers = [new Timer("main-timer")].concat(storedTimers);
timers.forEach((timer) => timer.draw());
