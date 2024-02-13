
import Timer from "./Timer.js";
import Storage from "./Storage.js";
import CreateButton from './CreateButton.js'

// start central ticker here 
// Render default timer or store timers depending on store
export default function App() {
  console.log('[App] constructor');
  this.draw = draw;
  this.draw()


  function draw() {
    const createBtn = new CreateButton();
    createBtn.draw();
    const storedTimers = Storage.getTimers();
    console.log("[App]", storedTimers);
    storedTimers.forEach(({name, totalTime}) => new Timer({name: name, totalTime: totalTime}).draw())
  }
}