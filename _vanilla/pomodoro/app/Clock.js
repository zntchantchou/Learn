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


export default new Clock();