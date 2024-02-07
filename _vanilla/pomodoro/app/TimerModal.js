import {
  createElement,
  createElements,
  incrementUpTo,
  zeroPadTime,
} from "./utils.js";

export default function TimerModal() {
  this.incrementSeconds = incrementSeconds.bind(this);
  this.incrementMinutes = incrementMinutes.bind(this);
  this.incrementHours = incrementHours.bind(this);
  this.decrementSeconds = decrementSeconds.bind(this);
  this.decrementMinutes = decrementMinutes.bind(this);
  this.decrementHours = decrementHours.bind(this);
  this.currentTime = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  this.hoursElt;
  this.minutesElt;
  this.secondsElt;
  // mode CREATION vs EDITION
  this.anchorElt = document.getElementById("overlay");
  this.draw = draw;
  this.element;
  this.bootStrap = bootStrap;
  this.remove = remove;
  this.bootStrap();

  function bootStrap() {
    this.element = createElement("div", { classes: ["timer-modal"] });
    const timerModalHeaderElt = createElement("div", {
      classes: ["timer-modal-header"],
      text: "NEW TIMER",
    });
    const nameInput = document.createElement("input");
    nameInput.placeholder = "Choose a name";
    nameInput.type = "text";
    const nameEditorElt = createElement("div", { classes: ["name-editor"] });
    const timerModalContent = createElement("div", {
      classes: ["timer-modal-content"],
    });
    const timeEditorElt = createElement("div", { classes: ["time-editor"] });
    const timeDisplayElt = createElement("div", { id: "editor-time-display" });
    const editorControlElts = createElements("div", 2, {
      classes: ["editor-controls"],
    });
    const incrementControls = createElements("div", 3, {
      classes: ["editor-control", "increment"],
    });
    const decrementControls = createElements("div", 3, {
      classes: ["editor-control", "decrement"],
    });
    this.hoursElt = createElement("div", {
      classes: ["editor-digits"],
      id: "editor-hours",
    });
    this.minutesElt = createElement("div", {
      classes: ["editor-digits"],
      id: "editor-minutes",
    });
    this.secondsElt = createElement("div", {
      classes: ["editor-digits"],
      id: "editor-seconds",
    });
    const colonElements = createElements("div", 2, {
      classes: ["editor-colon"],
      text: ":",
    });
    const footerElt = createElement("div", {
      classes: ["timer-modal-footer"],
    });

    // HEADER
    this.element.appendChild(timerModalHeaderElt);
    this.element.appendChild(timerModalContent);
    this.element.appendChild(footerElt);
    timerModalContent.appendChild(timeEditorElt);
    timerModalContent.appendChild(nameEditorElt);
    nameEditorElt.appendChild(nameInput);

    // TIME
    [this.incrementHours, this.incrementMinutes, this.incrementSeconds].forEach(
      (fn, i) => {
        console.log("increment control ", incrementControls[i], fn);
        incrementControls[i].addEventListener("click", fn);
      }
    );
    [this.decrementHours, this.decrementMinutes, this.decrementSeconds].forEach(
      (fn, i) => {
        decrementControls[i].addEventListener("click", fn);
      }
    );
    incrementControls.forEach((ctl) => editorControlElts[0].appendChild(ctl));
    decrementControls.forEach((ctl) => editorControlElts[1].appendChild(ctl));
    timeEditorElt.appendChild(editorControlElts[0]);
    timeEditorElt.appendChild(timeDisplayElt);
    timeEditorElt.appendChild(editorControlElts[1]);
    [
      this.hoursElt,
      colonElements[0],
      this.minutesElt,
      colonElements[1],
      this.secondsElt,
    ].forEach((elt) => timeDisplayElt.appendChild(elt));
  }

  function draw() {
    console.log("Timermodal draw");
    this.anchorElt.appendChild(this.element);
  }

  function incrementSeconds(e) {
    console.log("incrementSeconds", e);
    this.currentTime.seconds = incrementUpTo(this.currentTime.seconds, 59);
    this.secondsElt.innerHTML = zeroPadTime(this.currentTime.seconds);
  }

  function incrementMinutes(e) {
    console.log("incrementMinutes", e);
    this.currentTime.minutes = incrementUpTo(this.currentTime.minutes, 59);
    this.minutesElt.innerHTML = zeroPadTime(this.currentTime.minutes);
  }

  function incrementHours(e) {
    console.log("incrementHours ", this.currentTime.hours);
    this.currentTime.hours = incrementUpTo(this.currentTime.hours, 24);
    this.hoursElt.innerHTML = zeroPadTime(this.currentTime.hours);
  }

  function decrementSeconds(e) {
    console.log("decrementSeconds", e);
  }

  function decrementMinutes(e) {
    console.log("decrementMinutes", e);
  }

  function decrementHours(e) {
    console.log("decrementHours", e);
  }

  function remove() {
    console.log("removing modal");
    this.element.remove();
  }
}
