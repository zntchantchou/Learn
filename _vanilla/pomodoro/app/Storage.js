import Timer from "./Timer.js";

const DEFAULT_TIME_MS = 200000;

export const DEFAULT_TIMER = {
  name: "Default",
  totalTime: DEFAULT_TIME_MS,
  timeStamps: [],
};

function Storage() {
  this.updateCurrentTimer = updateCurrentTimer;
  this.getCurrentTimer = getCurrentTimer;
  this.getStoredTimers = getStoredTimers;
  this.get = get;
  this.addTimeStamp = addTimeStamp;
  // constructor behaviour

  function get(key) {
    console.log("key ", key);
    const value = localStorage.getItem(key);
    console.log("VALUE ", JSON.stringify(value));
    console.log("Typescript ", key);
    return value ? JSON.parse(value) : null;
  }

  function getCurrentTimer() {
    return this.get("default");
  }
  function getStoredTimers() {
    return this.get("stored");
  }


  function updateCurrentTimer(timerData) {
    const existingData = this ? this.getCurrentTimer() : DEFAULT_TIMER;
    localStorage.setItem(
      "default",
      JSON.stringify({ ...existingData, ...timerData })
    );
  }

  function addTimeStamp(timer) {
    if (!timer instanceof Timer) {
      throw Error(
        "Must provide Storage.addTimeStamp with an instance of a Timer"
      );
    }
    const stored = localStorage.getItem(timer.name);
    console.log('timer.name', timer.name)
    if (!stored) {
      localStorage.setItem(
        timer.name,
        JSON.stringify({
          timeStamps: [new Date().toISOString()],
          totalTime: timer.totalTime,
        })
      );
      return;
    }

    return localStorage.setItem(timer.name, JSON.stringify({}));
  }
}

export default new Storage();
