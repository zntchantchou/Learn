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
    localStorage.clear();
    // creates and stores timers
    new Array(2).fill(null).map(
      (_, i) =>
        new Timer({
          totalTime: (i + 1) * 3000,
          name: "Timer " + String(i + 1),
        })
    );
    // retrieves and draws timers
    const storedTimers = Storage.getTimers();
    storedTimers.forEach((t) => new Timer(t).draw());
  }
}
