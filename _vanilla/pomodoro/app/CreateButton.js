function CreateButton() {
  this.anchorElt = document.getElementById("root");
  this.element;
  this.draw = draw;
  this.listen = listen;
  // methods can be defined as arrow functions
  this.handleClickCreate = handleClickCreate.bind(this);
  this.handleClickAway = handleClickAway.bind(this);
  this.getOverlayElement = getOverlayElement;

  function getOverlayElement() {
    return document.getElementById("overlay");
  }

  function listen() {
    this.element.addEventListener("click", this.handleClickCreate);
    this.getOverlayElement().addEventListener("click", this.handleClickAway);
  }

  function draw() {
    console.log("CreateBtn [DRAW]");
    this.element = document.createElement("div");
    this.element.id = "create-btn";
    this.element.textContent = "+";
    this.anchorElt.appendChild(this.element);
    this.listen();
  }

  function handleClickCreate(e) {
    console.log("[handleClickCreate]", this.getOverlayElement());
    e.preventDefault();
    this.getOverlayElement().style.visibility = "visible";
  }

  function handleClickAway(e) {
    console.log("[handleClickAway]");
    let overlayElt = this.getOverlayElement();
    e.preventDefault();
    if (overlayElt?.id == e.target.id) {
      overlayElt.style.visibility = "hidden";
    }
  }
}

export default CreateButton;
