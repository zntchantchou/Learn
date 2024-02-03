

function Storage() {
  this.initialize = initialize;
  this.getCurrentTimer = getCurrentTimer;
  this.getStoredTimers = getStoredTimers;
  this.getValueFromStorage = getValueFromStorage;
  this.updateCurrentTimer = updateCurrentTimer;

  // constructor behaviour
  this.initialize();

  function getCurrentTimer() {
    const result = this.getValueFromStorage('current');
    if(result) {
      return JSON.parse(result);
    }
    return null;
  }
  
  function getStoredTimers() {
    return this.getValueFromStorage('stored');
  }

  function getValueFromStorage(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
  
  function initialize() {
    console.log('Storage [initialize]');
    if(!this.getCurrentTimer()) {
      updateCurrentTimer(this.getCurrentTimer())
    }
  }

  function updateCurrentTimer(timer) {
     localStorage.setItem('current', JSON.stringify(timer));
  }
}

const DEFAULT_TIME_MS = 25000;
const DEFAULT_TIMER = {
  totalTime: DEFAULT_TIME_MS,
  timeLeft: DEFAULT_TIME_MS / 2, 
  name: 'Default'
};

export default Storage;