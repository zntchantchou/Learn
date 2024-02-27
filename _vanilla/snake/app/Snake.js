import Cell from "./Cell.js";
import { DIRECTIONS } from "./enums.js";

function Snake() {
  this.CANVAS_HEIGHT = 500;
  this.CANVAS_WIDTH = 500;
  this.CELL_WIDTH = this.CANVAS_WIDTH / 25;
  this.columns = this.CANVAS_WIDTH / this.CELL_WIDTH;
  this.rows = this.CANVAS_HEIGHT / this.CELL_WIDTH;
  this.canvasElt = document.getElementById("canvas");
  this.context = this.canvasElt.getContext("2d");
  this.posX = this.CANVAS_WIDTH / 2;
  this.posY = this.CANVAS_HEIGHT / 2;
  this.movesArchived = [];
  this.movesPending = [];
  this.saveMove = saveMove;
  this.isAtBreakPoint = isAtBreakPoint;
  this.archiveMove = archiveMove;
  this.directions = DIRECTIONS;
  this.addCell = addCell;
  this.length = 0;

  // EVENT LISTENERS
  // METHODS
  this.drawGrid = drawGrid;
  this.animate = animate.bind(this);
  this.handleKeyPress = handleKeyPress;
  this.getRandomDirection = getRandomDirection;
  this.setDirection = setDirection;
  this.setup = setup;
  this.getHead = getHead;
  this.getTail = getTail;
  this.popNextMove = popNextMove;
  this.appendHead = appendHead;
  this.cells = [];

  function setup() {
    console.log("[SETUP]");
    document.addEventListener("keydown", (e) => this.handleKeyPress(e));
    this.appendHead();
    this.addCell({
      x: this.CANVAS_WIDTH / 2 - 50,
      y: this.CANVAS_HEIGHT / 2 - 5,
      direction: this.direction,
    });
    this.animate();
  }

  function appendHead() {
    console.log(`[addHappendHeadead]`);
    const cell = new Cell({
      context: this.context,
      width: this.CELL_WIDTH,
      x: this.CANVAS_WIDTH / 2,
      y: this.CANVAS_HEIGHT / 2,
      direction: this.getRandomDirection(),
    });
    this.cells = [cell];
  }

  function animate() {
    this.drawGrid();
    // Only pass a move if a breakpoint is reached
    this.getHead()?.draw({
      move: this.isAtBreakPoint() ? this.popNextMove() : null,
    });
    requestAnimationFrame(this.animate);
  }

  /**
   * Moves the last executed moves to the archived moves
   * @returns {{direction: string} | null} the next move in line to be rendered
   */
  function popNextMove() {
    // console.log("----- PopNeXT -----");
    if (!this.movesPending.length) return null;
    this.movesArchived.unshift(this.movesPending[0]);
    this.movesPending.splice(0, 1);
    return this.movesArchived[0];
  }

  function addCell({ x, y, direction }) {
    // console.log(`AddCell X => ${x}, Y = ${y}`);
    const cell = new Cell({
      context: this.context,
      width: this.CELL_WIDTH,
      x,
      y,
      direction,
    });
    const tail = this.getTail();
    if (tail) {
      tail.append(cell);
      console.log("THIS", this);
    }
    this.cells.push(cell);
  }

  /** save moves that have yet to be performed */
  function saveMove(direction) {
    // console.log("[saveMove]");
    this.movesPending.push({ direction });
    console.log("moves PENDING ====>", this.movesPending);
    console.log("moves ARCHIVED ====> ", this.movesArchived);
  }

  /** Stores the moves that have already been performed  */
  function archiveMove() {}

  function handleKeyPress(e) {
    let direction;
    switch (e.keyCode) {
      case 38:
      case 87:
        direction = this.directions.UP;
        this.saveMove(this.directions.UP);
        // console.log("[up]");
        break;
      case 40:
      case 83:
        this.saveMove(this.directions.DOWN);
        // console.log("[down]");
        break;
      case 37:
      case 65:
        this.saveMove(this.directions.LEFT);
        // console.log("[left]");
        break;
      case 39:
      case 68:
        this.saveMove(this.directions.RIGHT);
        // console.log("[right]");
        break;
      default:
        console.log("[handleKeypress] DEFAULT", this.direction);
    }
  }

  function setDirection(direction) {
    if (!Object.values(this.directions).includes(direction)) {
      throw new Error(`Invalid direction: ${direction}`);
    }
    // only peforms the direction change when a breakpoint is reached
    // this is to keep the snake within the lines

    this.direction = direction;
    console.log("Direction SET TO : ", this.direction);
  }

  function drawGrid() {
    this.canvasElt.width = this.CANVAS_WIDTH;
    this.canvasElt.height = this.CANVAS_HEIGHT;
    // for each row draw all cells the move down
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.context.fillStyle = (j + i) % 2 ? "#efefef" : "#cecece";
        this.context.beginPath();
        this.context.rect(
          i * this.CELL_WIDTH,
          j * this.CELL_WIDTH,
          this.CELL_WIDTH,
          this.CELL_WIDTH
        );
        this.context.fill();
      }
    }
  }

  /** Whether the snake's head is crossing a line at this frame*/
  function isAtBreakPoint() {
    let result = false;
    let { x, y, direction } = this.getHead();
    switch (direction) {
      case this.directions.UP:
      case this.directions.DOWN:
        console.log("Y", y);
        console.log("CELL WIDTH: ", this.CELL_WIDTH);
        result = y % this.CELL_WIDTH === 0;
        break;
      case this.directions.LEFT:
      case this.directions.RIGHT:
        result = x % this.CELL_WIDTH === 0;
        break;
      default:
    }
    if (result == true) {
      console.log("IS AT BREAK POINT direction: ", result);
    }
    return result;
  }

  function getHead() {
    return this.cells[0];
  }

  function getTail() {
    return this.cells[this.cells.length - 1];
  }

  function getRandomDirection() {
    const randomDirection = Object.values(this.directions)[
      Math.floor(Math.random() * 4)
    ];
    return randomDirection;
  }
}
export default Snake;
