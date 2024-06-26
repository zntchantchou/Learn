const DEFAULT_TIME_MS = 3000;
const DEFAULT_TIMER_NAME = "default";
const TIMERS_KEY = "timers";

export const DEFAULT_TIMER = {
  name: DEFAULT_TIMER_NAME,
  totalTime: DEFAULT_TIME_MS,
  timeStamps: [],
  lastUpdatedAt: null,
};

function Storage() {
  // METHODS
  this.getTimers = getTimers;
  this.createTimer = createTimer;
  this.getTimerByName = getTimerByName;
  this.getTimeElapsedInMs = getTimeElapsedInMs;
  this.get = get;
  this.addTimeStamp = addTimeStamp;
  this.setup = setup;
  this.updateTimer = updateTimer;
  this.updateTimers = updateTimers;
  this.deleteTimer = deleteTimer;
  this.clearTimer = clearTimer;
  this.setup();
  // PROPERTIES

  function get(key) {
    console.log("[GET]");
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  function getTimers() {
    return this.get(TIMERS_KEY);
  }

  /**
   *
   * @param {string} name (must be unique)
   * @param {number} totalTime
   */
  function createTimer(name, totalTime) {
    console.log("CREATE TIMER");
    const timer = { name, totalTime, timeStamps: [] };
    let timers = this.getTimers();
    if (Array.isArray(timers)) {
      timers.unshift(timer);
    } else {
      timers = [timer];
    }
    localStorage.setItem(TIMERS_KEY, JSON.stringify(timers));
    return;
  }

  function clearTimer(name) {
    console.log("[clearTimer]");
    return this.updateTimer(name, { timeStamps: [] });
  }

  function getTimerByName(name) {
    const timers = this.getTimers();
    let foundAtIndex = -1;
    console.log("TIMERS ", timers, name);
    const timer = timers.find((elt, index) => {
      if (elt.name === name) {
        foundAtIndex = index;
        return true;
      }
      return false;
    });
    // makes it easier to delete or update later on
    return { timer: timer || null, index: foundAtIndex };
  }

  /**
   * Calculates the time remaining on a timer
   * @param {string} name
   * @returns PAUSED => the remaining time in MS from the timestamps, RUNNING => 0, STOPPED => totalTime
   */
  function getTimeElapsedInMs(name) {
    const storedTimer = this.getTimerByName(name);
    console.log("getTimeElapsedInMs ", name);
    let timeElapsedInMs = 0;
    if (storedTimer && storedTimer?.timer) {
      const { timeStamps } = storedTimer.timer;
      if (timeStamps.length < 1) {
        return 0;
      }
      for (let i = 1; i < timeStamps.length; i += 2) {
        const diff = new Date(timeStamps[i]) - new Date(timeStamps[i - 1]);
        if (diff > 0) {
          timeElapsedInMs += Math.floor(diff / 1000) * 1000;
        }
        console.log("diff at " + i + " " + diff);
      }
      console.log("timeElapsed ", timeElapsedInMs);
    }
    return timeElapsedInMs;
  }

  function deleteTimer(name) {
    console.log("[DeleteTimer] name: ", name);
    const { timer, index } = this.getTimerByName(name);
    if (timer && index >= 0) {
      let timers = this.getTimers();
      timers.splice(index, 1);
      return this.updateTimers(timers);
    }
    return false;
  }

  function setup() {
    console.log("[SETUP]");
  }

  function updateTimer(name, data) {
    const { timer, index } = this.getTimerByName(name);
    let updatedTimer;
    let updatedTimers = this.getTimers();
    if (index < 0) return false;
    // update the timer with the provided data
    updatedTimer = { ...timer, ...data };
    updatedTimers[index] = updatedTimer;
    localStorage.setItem(TIMERS_KEY, JSON.stringify(updatedTimers));
    return true;
  }

  // overwrites timers in localStorage
  function updateTimers(timers) {
    console.log("[UpdateTimers]");
    localStorage.setItem(TIMERS_KEY, timers);
  }

  function addTimeStamp(name) {
    const { timer } = this.getTimerByName(name);
    let timeStamps = timer.timeStamps;
    if (timeStamps && Array.isArray(timeStamps)) {
      timeStamps.push(new Date().toISOString());
      this.updateTimer(name, { ...timer, timeStamps });
      return true;
    }
    return false;
  }
}

export default new Storage();
