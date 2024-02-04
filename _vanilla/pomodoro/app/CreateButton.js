function CreateButton() {
  this.anchorElt = document.getElementById("root");
  this.element;
  this.draw = draw;
  this.listen = listen;
  this.handleClickCreate = handleClickCreate.bind(this);
  this.handleClickAway = handleClickAway.bind(this);
  const overlayElt = document.getElementById("overlay");

  function listen() {
    this.element.addEventListener("click", this.handleClickCreate);
    overlayElt.addEventListener("click", this.handleClickAway);
  }

  function draw() {
    console.log("CreateBtn [DRAW]");
    this.element = document.createElement("div");
    this.element.id = "create-btn";
    this.element.textContent = "+";
    // arrow function can be used as well
    this.anchorElt.appendChild(this.element);
    this.listen();
  }

  function handleClickCreate(e) {
    console.log("[handleClickCreate]", overlayElt);
    e.preventDefault();
    overlayElt.style.visibility = "visible";
  }

  function handleClickAway(e) {
    console.log("[handleClickAway]", overlayElt, e);
    e.preventDefault();
    overlayElt.style.visibility = "hidden";
  }
}

export default CreateButton;
