function Clock() {
  this.start = start;
  this.stop = stop;
  this.intervalId;
  this.start();


  function start() {
    console.log('Clock START ')
    this.intervalId = setInterval(() => {
      console.log('TICK')
    }, 1000)
  
  }

  function stop() {
    console.log('Clock STOP ')
    this.intervalId = clearInterval(this.intervalId);
  }
}


/**
 When play or pause happen in a timer : 
  - push currentTime into the said timer 
  - Clock should have a method calculateElapsedTime used for started timers
  -  
 */


export default new Clock();