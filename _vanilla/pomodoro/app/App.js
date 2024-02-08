
import Clock from "./Clock.js"
import Timer from "./Timer.js";
import CreateButton from './CreateButton.js'

// start central ticker here 
// Render default timer or store timers depending on store
export default function App() {
  console.log('[App] constructor');
  this.clock = Clock;
  this.draw = draw;
  this.clock.start(); 
  this.draw()


  function draw() {
    const createBtn = new CreateButton();
    createBtn.draw();
    const timers = [new Timer("main-timer")];
    timers.forEach((timer) => timer.draw());
    }
}