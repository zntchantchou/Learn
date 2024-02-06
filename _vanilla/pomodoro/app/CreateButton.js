function CreateButton() {
  this.anchorElt = document.getElementById("root");
  this.element;
  this.draw = draw;
  this.listen = listen;
  // methods can be defined as arrow functions
  this.handleClick = handleClick.bind(this);
  this.handleClickAway = handleClickAway.bind(this);
  this.getOverlayElement = getOverlayElement;

  function getOverlayElement() {
    return document.getElementById("overlay");
  }

  function listen() {
    this.element.addEventListener("click", this.handleClick);
    this.getOverlayElement().addEventListener(
      "mousedown",
      this.handleClickAway
    );
  }

  function draw() {
    console.log("CreateBtn [DRAW]");
    this.element = document.createElement("div");
    this.element.id = "create-btn";
    const spanElt = document.createElement("span");
    spanElt.textContent = "+";
    this.element.appendChild(spanElt);
    this.anchorElt.appendChild(this.element);
    this.listen();
  }

  function handleClick(e) {
    console.log("CreateBtn [handleClick]", this.getOverlayElement());
    e.preventDefault();
    this.getOverlayElement().style.visibility = "visible";
  }

  /**
   * handles clicks on the overlay element
   * @param {MouseEvent} e
   */
  function handleClickAway(e) {
    console.log("[handleClickAway]");
    let overlayElt = this.getOverlayElement();
    if (overlayElt?.id == e.target.id) {
      overlayElt.style.visibility = "hidden";
    }
  }
}

export default CreateButton;
