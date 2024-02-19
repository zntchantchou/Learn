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
    new CreateButton().draw();
    // localStorage.clear();
    // creates and stores timers
    // new Array(1)
    //   .fill(null)
    //   .map((_, i) => Storage.createTimer("timer" + (i + 1), (i + 1) * 5000));
    Storage.getTimers().forEach((t) => {
      new Timer(t).draw();
			console.log('Salut');
    });

    // timers.forEach((t) => t.draw());
  }
  // Storage.clearTimer("timer1");
}
