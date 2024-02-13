const DEFAULT_TIME_MS = 200000;
const DEFAULT_TIMER_NAME = 'default'
const TIMERS_KEY = 'timers'

export const DEFAULT_TIMER = {
  name: DEFAULT_TIMER_NAME,
  totalTime: DEFAULT_TIME_MS,
  timeStamps: [],
  lastUpdatedAt: null
};

function Storage() {
  // METHODS
  this.getTimers = getTimers;
  this.getTimerByName = getTimerByName;
  this.get = get;
  this.addTimeStamp = addTimeStamp;
  this.setup = setup;
  this.updateTimer = updateTimer;
  this.updateTimers = updateTimers;
  this.deleteTimer = deleteTimer;
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

  function getTimerByName(name) {
    const timers = this.getTimers();
    let foundAtIndex = -1;
    const timer = timers.find((elt, index) => {
      if(elt.name === name) {
        foundAtIndex = index;
        return true;
      }
      return false;
    });
    // makes it easier to delete or update later on
    return {timer: timer || null, index: foundAtIndex}
  }

  function deleteTimer(name) {
    console.log('[DeleteTimer]')
    const {timer, index} = getTimerByName();
    if(timer && index > 0) {
      let timers = this.getTimers();
      timers.splice(index, 1);
      this.updateTimers(timers);
    }
  }
 
  function setup() {
    console.log('[SETUp]')
    if(!localStorage.getItem("timers")) {
      console.log('[SETUp] No timers')
      localStorage.setItem("timers", JSON.stringify([DEFAULT_TIMER]));
    }
  }

  function updateTimer(name, data) {
    const {timer, index} = this.getTimerByName(name);
    let updatedTimer;
    let updatedTimers = this.getTimers();
    if(index < 0) return false;
    if(index >= 0) {
      // update the timer with the provided data
      updatedTimer = {...timer, ...data};
      updatedTimers[index] = updatedTimer;
      localStorage.setItem(TIMERS_KEY, JSON.stringify(updatedTimers));
    }
  }
 // overwrites timers in localStorage 
  function updateTimers(timers) {
    console.log('[UpdateTimers]')
    localStorage.setItem(TIMERS_KEY, timers);
  }

  function addTimeStamp(name) {
    const {timer} = this.getTimerByName(name);
    let timeStamps = timer.timeStamps;
    if(timeStamps && Array.isArray(timeStamps)) {
      timeStamps.push(new Date().toISOString());  
      this.updateTimer(name, {...timer, timeStamps})
      return true;
    }
    return false;
  }
}

export default new Storage();
