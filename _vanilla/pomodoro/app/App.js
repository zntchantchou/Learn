import Timer from "./Timer.js";
import Storage from "./Storage.js";
import CreateButton from "./CreateButton.js";

// start central ticker here
// Render default timer or store timers depending on store
export default function App() {
  console.log("[App] constructor");
  this.draw = draw;
  this.draw();
  function draw() {
    const createBtn = new CreateButton();
    createBtn.draw();
    localStorage.clear();
    Storage.createTimer("one", 20000);
    Storage.createTimer("two", 30000);
    const timers = Storage.getTimers();
    timers.forEach((t) => new Timer(t).draw());
    console.log("App timers ", timers);
  }
}
