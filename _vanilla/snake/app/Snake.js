import Cell from './Cell.js';
import { DIRECTIONS } from '../constants/enums.js';
import config from '../constants/config.js';

function Snake() {
  this.CANVAS_HEIGHT = config.canvas.height;
  this.CANVAS_WIDTH = config.canvas.width;
  this.CELL_WIDTH = this.CANVAS_WIDTH / config.canvas.tilesPerRow;
  this.columns = this.CANVAS_WIDTH / this.CELL_WIDTH;
  this.rows = this.CANVAS_HEIGHT / this.CELL_WIDTH;
  this.canvasElt = document.getElementById('canvas');
  this.context = this.canvasElt.getContext('2d');
  this.posX = this.CANVAS_WIDTH / 2;
  this.posY = this.CANVAS_HEIGHT / 2;
  this.movesArchived = [];
  this.movesPending = [];
  this.saveMove = saveMove;
  this.isAtBreakPoint = isAtBreakPoint;
  this.directions = DIRECTIONS;
  this.appendCell = appendCell;
  this.length = 0;
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
  /**
   * @type {[] || Cell}
   */
  this.cells = [];

  function setup() {
    document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    this.appendHead();
    this.animate();
  }

  function appendHead() {
    console.log('[appendHead]');
    const cell = new Cell({
      context: this.context,
      width: this.CELL_WIDTH,
      x: this.CANVAS_WIDTH / 2,
      y: this.CANVAS_HEIGHT / 2,
      direction: this.getRandomDirection()
    });
    this.cells = [cell];
  }

  function animate() {
    this.drawGrid();
    // Only pass a move if a breakpoint is reached
    this.getHead()?.draw({
      move: this.isAtBreakPoint() ? this.popNextMove() : null,
      isAtBreakPoint: this.isAtBreakPoint()
    });
    requestAnimationFrame(this.animate);
  }

  /**
   * Moves the last executed moves to the archived moves
   * @returns {{direction: string} | null} the next move in line to be rendered
   */
  function popNextMove() {
    if (!this.movesPending.length) return null;
    this.movesArchived.unshift(this.movesPending[0]);
    this.movesPending.splice(0, 1);
    return this.movesArchived[0];
  }

  function appendCell() {
    console.log('AppendCell');
    const cell = this.getTail().grow();
    this.cells.push(cell);
  }

  /** save moves that have yet to be performed */
  function saveMove(direction) {
    this.movesPending.push({ direction });
    this.appendCell();
  }

  function handleKeyPress(e) {
    switch (e.keyCode) {
      case 38:
      case 87:
        this.saveMove(this.directions.UP);
        break;
      case 40:
      case 83:
        this.saveMove(this.directions.DOWN);
        break;
      case 37:
      case 65:
        this.saveMove(this.directions.LEFT);
        break;
      case 39:
      case 68:
        this.saveMove(this.directions.RIGHT);
        break;
      default:
        e.preventDefault();
    }
  }

  function setDirection(direction) {
    if (!Object.values(this.directions).includes(direction)) {
      throw new Error(`Invalid direction: ${direction}`);
    }
    this.direction = direction;
  }

  function drawGrid() {
    this.canvasElt.width = this.CANVAS_WIDTH;
    this.canvasElt.height = this.CANVAS_HEIGHT;
    // Draw grid row by row
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j <= this.rows; j++) {
        this.context.fillStyle = (j + i) % 2 ? '#FCB24F' : '#FBC04E';
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

  /**
   * Whether the snake's head is crossing a line at this frame
   * @returns {boolean}
   */
  function isAtBreakPoint() {
    let result = false;
    const { x, y, direction } = this.getHead();
    switch (direction) {
      case this.directions.UP:
      case this.directions.DOWN:
        result = y % this.CELL_WIDTH === 0;
        break;
      case this.directions.LEFT:
      case this.directions.RIGHT:
        result = x % this.CELL_WIDTH === 0;
        break;
      default:
    }
    return result;
  }

  /**
   * gets the first cell
   * @returns {Cell?}
   */
  function getHead() {
    return this.cells[0] || null;
  }

  /**
   * gets the last added cell
   * @returns {Cell?}
   */
  function getTail() {
    return this.cells[this.cells.length - 1] || null;
  }

  function getRandomDirection() {
    const randomDirection = Object.values(this.directions)[
      Math.floor(Math.random() * 4)
    ];
    return randomDirection;
  }
}
export default Snake;
