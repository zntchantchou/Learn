const DEFAULT_TIME_MS = 6000000;

export const DEFAULT_TIMER = {
  totalTime: DEFAULT_TIME_MS,
  timeLeft: DEFAULT_TIME_MS,
  name: "Default",
};

function Storage() {
  this.updateCurrentTimer = updateCurrentTimer;
  this.getCurrentTimer = getCurrentTimer;
  this.initialize = initialize;
  this.getStoredTimers = getStoredTimers;
  this.get = get;
  // constructor behaviour
  this.initialize();

  function get(key) {
    console.log('key ', key)
    const value = localStorage.getItem(key);
    console.log('VALUE ', JSON.stringify(value));
    console.log('Typescript ', key)
    return value ? JSON.parse(value) : null;
  } 

  function getCurrentTimer() {
    return this.get("current");
  }
  function getStoredTimers() {
    return this.get("stored");
  }

  function initialize() {
    if (!this.getCurrentTimer()) {
      const { timeLeft, totalTime } = DEFAULT_TIMER;
      updateCurrentTimer({
        totalTime: Math.round(totalTime / 1000) * 1000,
        timeLeft: Math.round(timeLeft / 1000) * 1000,
      });
    }
  }

  function updateCurrentTimer(timerData) {
    const existingData = this ? this.getCurrentTimer() : DEFAULT_TIMER;
    localStorage.setItem(
      "current",
      JSON.stringify({ ...existingData, ...timerData })
    );
  }
}

export default new Storage();
