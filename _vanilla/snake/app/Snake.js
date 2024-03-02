import { DIRECTIONS } from '../constants/enums.js';
import config from '../constants/config.js';

function Snake() {
  this.canvasHeight = config.canvas.cellWidth * config.canvas.cellsPerRow;
  this.canvasWidth = config.canvas.cellWidth * config.canvas.cellsPerRow;
  this.cellWidth = config.canvas.cellWidth;
  this.columns = config.canvas.cellsPerRow;
  this.rows = config.canvas.cellsPerRow;
  this.canvasElt = document.getElementById('canvas');
  this.context = this.canvasElt.getContext('2d');
  this.padding = config.canvas.cellWidth / 10;
  this.velocity = config.canvas.cellWidth / 5;
  // position of the head
  this.x = this.canvasWidth / 2;
  this.y = this.canvasHeight / 2;
  // moves
  this.nextMoves = [];
  this.previousMoves = new CappedCollection();
  this.saveMove = saveMove;
  this.isAtBreakPoint = isAtBreakPoint;
  this.popNextMove = popNextMove;
  this.direction;
  this.directions = DIRECTIONS;
  this.xDirections = [this.directions.LEFT, this.directions.RIGHT];
  this.yDirections = [this.directions.UP, this.directions.DOWN];
  this.length = 0;
  this.drawGrid = drawGrid;
  this.keepInbound = keepInbound;
  this.reverseDirection = reverseDirection;
  this.animate = animate.bind(this);
  this.handleKeyPress = handleKeyPress;
  this.getRandomDirection = getRandomDirection;
  this.setDirection = setDirection;
  this.move = move;
  this.setup = setup;
  this.playNextMove = playNextMove;
  this.drawHead = drawHead;
  this.logCoords = logCoords;
  this.initialized = false;
  this.linesCrossed = 0;
  this.tailLength = 5;
  this.drawTail = drawTail;

  function setup() {
    document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    this.saveMove({
      direction: this.getRandomDirection(),
      linesCrossed: this.linesCrossed
    });
    this.animate();
  }

  function playNextMove() {
    let nextMove = this.popNextMove();
    if (nextMove) {
      console.log('NextMove', nextMove);
      this.setDirection(this.reverseDirection(nextMove.direction));
    }
  }

  function animate() {
    if (!this.initialized) {
      this.playNextMove();
    }
    if (this.isAtBreakPoint()) {
      this.linesCrossed++;
      this.playNextMove();
    }
    this.drawGrid();
    this.move();
    this.drawHead();
    this.drawTail();
    this.initialized = true;
    requestAnimationFrame(this.animate);
  }

  function logCoords() {
    console.log('Coords: ---------- \n ');
    console.log('x ', this.x);
    console.log('y', this.y);
    console.log('Is Breakpoint: ', this.isAtBreakPoint());
    console.log('this.nextMoves: ', this.nextMoves);
  }

  function reverseDirection(direction) {
    const reverse = {
      [DIRECTIONS.LEFT]: DIRECTIONS.RIGHT,
      [DIRECTIONS.RIGHT]: DIRECTIONS.LEFT,
      [DIRECTIONS.UP]: DIRECTIONS.DOWN,
      [DIRECTIONS.DOWN]: DIRECTIONS.UP
    };
    return reverse[direction] || null;
  }

  function move() {
    const moveFnByDirection = {
      [DIRECTIONS.LEFT]: () => (this.x -= this.velocity),
      [DIRECTIONS.RIGHT]: () => (this.x += this.velocity),
      [DIRECTIONS.UP]: () => (this.y -= this.velocity),
      [DIRECTIONS.DOWN]: () => (this.y += this.velocity)
    };
    this.keepInbound();
    let moveFn = moveFnByDirection[this.direction];
    if (moveFn) moveFn();
  }

  function keepInbound() {
    // snake reappears on opposite side if it hits a wall
    if (this.y > this.canvasHeight) {
      this.y = 0;
      return;
    }
    if (this.y <= 0 - this.cellWidth) {
      this.y = this.canvasHeight;
      return;
    }
    if (this.x >= this.canvasWidth + this.cellWidth) {
      this.x = 0 - this.cellWidth;
      return;
    }
    if (this.x <= 0 - this.cellWidth) {
      this.x = this.canvasWidth;
      return;
    }
  }
  function drawHead() {
    this.context.roundRect(
      this.initialized ? this.x : this.canvasWidth / 2,
      this.initialized ? this.y : this.canvasWidth / 2,
      this.cellWidth - this.padding,
      this.cellWidth - this.padding,
      [5]
    );
    this.context.stroke();
    this.context.fillStyle = 'black';
    this.context.fill();
  }

  function drawTail() {
    console.log('PREVMoves', this.previousMoves);
    if (this.tailLength < 1) {
      return;
    }
  }

  /**
   * Moves the last executed moves to the previous moves
   * @returns {{direction: string} | null} the next move in line to be rendered
   */
  function popNextMove() {
    if (!this.nextMoves.length) return null;
    this.previousMoves.insert({
      item: this.nextMoves[0],
      distance: this.linesCrossed,
      maxSize: this.tailLength
    });
    this.nextMoves.splice(0, 1);
    return this.previousMoves.peek();
  }

  /** save moves that have yet to be performed */
  function saveMove({ direction }) {
    this.nextMoves.push({ direction, linesCrossed: null });
    // flush older useless moves depending on the snake's size
    // a snake of size 3 cannot display 4 moves
    // this.previousMoves.splice(
    //   this.tailLength - 1,
    //   this.previousMoves.length - this.tailLength + 1
    // );
    // update the distance information on the previous move
    // if (this.previousMoves.size() > 0) {
    // this.previousMoves[0].linesCrossed = this.linesCrossed;
    // }/
  }

  function handleKeyPress(e) {
    switch (e.keyCode) {
      case 38:
      case 87:
        this.saveMove({
          direction: this.directions.DOWN,
          linesCrossed: this.linesCrossed
        });
        break;
      case 40:
      case 83:
        this.saveMove({
          direction: this.directions.UP,
          linesCrossed: this.linesCrossed
        });
        break;
      case 37:
      case 65:
        this.saveMove({
          direction: this.directions.RIGHT,
          linesCrossed: this.linesCrossed
        });
        break;
      case 39:
      case 68:
        this.saveMove({
          direction: this.directions.LEFT,
          linesCrossed: this.linesCrossed
        });
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
    this.canvasElt.width = this.canvasWidth;
    this.canvasElt.height = this.canvasHeight;
    // Draw grid row by row
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j <= this.rows; j++) {
        this.context.fillStyle = (j + i) % 2 ? '#FCB24F' : '#FBC04E';
        this.context.beginPath();
        this.context.rect(
          i * this.cellWidth,
          j * this.cellWidth,
          this.cellWidth,
          this.cellWidth
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
    if (this.yDirections.includes(this.direction)) {
      return this.y % this.cellWidth === 0;
    }

    if (this.xDirections.includes(this.direction)) {
      return this.x % this.cellWidth === 0;
    }
    return false;
  }

  function getRandomDirection() {
    const randomDirection = Object.values(this.directions)[
      Math.floor(Math.random() * 4)
    ];
    console.log('RDNM', randomDirection);
    return randomDirection;
  }
}

export default Snake;

/**
 * when inserting, this collection will flush moves
 * the snake is two small to display
 */

function CappedCollection() {
  this.collection = [];
  this.log = log;
  /** prepends element into the collection */
  this.insert = insert;
  /** get last added element in the collection */
  this.peek = peek;
  /** number of elements in the collection */
  this.size = size;
  /** delete unplayable passed moves */
  this.flush = flush;
  this.totalDistance = 0;

  function log(...msg) {
    console.log('[Capped List] ', ...msg);
  }

  function peek() {
    this.log('peek');
    return this.collection[0];
  }

  function insert({ item, maxSize }) {
    this.log('insert');
    this.log('max', maxSize);
    this.collection.unshift(item);
    this.collection.splice(maxSize, this.collection.length - maxSize);
  }

  function flush(max) {}

  function size() {
    return this.collection.length;
  }
}
