function CreateButton() {
  this.anchorElt = document.getElementById("root");
  this.element;
  this.draw = draw;
  console.log("hellow");
  function draw() {
    console.log("CREATE BTN DRAW");
    this.element = document.createElement("div");
    this.element.id = "create-btn";
    this.element.textContent = "+";
    this.anchorElt.appendChild(this.element);
  }
}

export default CreateButton;
