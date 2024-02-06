import { createElement } from "../utils";

export default function TimerModal() {
  // mode CREATION vs EDITION
  this.anchorElt = document.getElementById("overlay");
  this.draw = draw;
  this.element;

  function bootStrap() {
    const dialogElt = createElement("div", { classes: ["dialog"] });
    const dialogContentElt = createElement("div", {
      classes: ["dialog-content"],
    });
    const nameEditorElt = createElement("div", { classes: ["name-editor"] });
    const nameInput = document.createElement("input");
    nameInput.placeholder = "Choose a name";
    nameInput.type = "text";
    const timeEditor = createElement("div", { classes: ["time-editor"] });
    const editorControls = Array(3)
      .fill(null)
      .map((_) =>
        createElement("div", { classes: ["editor-control", "increment"] })
      );
    const footerElt = createElement("div", { classes: ["dialog-footer"] });
  }

  function draw() {
    console.log("Timermodal draw");
    this.anchorElt.appendChild(this.element);
  }
}
