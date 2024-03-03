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
  this.xDirections = [DIRECTIONS.LEFT, DIRECTIONS.RIGHT];
  this.yDirections = [DIRECTIONS.UP, DIRECTIONS.DOWN];
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
  this.tailLength = 0;
  this.drawTail = drawTail;
  this.drawCell = drawCell;
  this.coordsFromMove = coordsFromMove;

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
      console.log('NEXT MOVE', nextMove);
      // the moves are stored as their opposite to avoid reversing them while drawing the canvas at each frame
      this.setDirection(this.reverseDirection(nextMove.direction));
    }
  }

  function animate() {
    if (!this.initialized) {
      console.log('STARTING');
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

  function coordsFromMove({ x, y, direction, offset }) {
    console.log('direction', direction);
    if (!direction || !Object.values(DIRECTIONS).includes(direction)) {
      throw new Error('[Coords From Move]: Invalid direction provided');
    }
    // head moves using velocity, body moves by offset relative to head or turning point
    let distance = offset ? offset * this.cellWidth : this.velocity;
    const moveFns = {
      [DIRECTIONS.LEFT]: () => ({ y, x: x - distance }),
      [DIRECTIONS.RIGHT]: () => ({ y, x: x + distance }),
      [DIRECTIONS.UP]: () => ({ x, y: y - distance }),
      [DIRECTIONS.DOWN]: () => ({ x, y: y + distance })
    };
    return moveFns[direction]();
  }

  function move() {
    this.keepInbound();
    const coords = this.coordsFromMove({
      x: this.x,
      y: this.y,
      direction: this.direction
    });
    this.x = coords.x;
    this.y = coords.y;
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

  function drawCell({ x, y }) {
    console.log('------ DRAWING CELL ------');
    this.context.roundRect(
      x,
      y,
      this.cellWidth - this.padding,
      this.cellWidth - this.padding,
      [5]
    );
    this.context.stroke();
    this.context.fillStyle = 'darkGray';
    this.context.fill();
  }

  function drawTail() {
    if (this.tailLength < 1) {
      return;
    }
    // total cells drawn thus far
    let distanceCovered = 0;
    let moveIndex = 0;
    let pivot = { x: this.x, y: this.y };
    while (this.previousMoves.next() && distanceCovered < this.tailLength) {
      let current = this.previousMoves.peek();
      console.log(
        'DISTANCE COVERED ',
        distanceCovered,
        this.tailLength - distanceCovered
      );
      const playableIndex = Math.min(
        current.distance,
        this.tailLength - distanceCovered
      );
      for (let i = 0; i < playableIndex; i++) {
        // this is the tail so the minimum offset needs to be 1, 0 would draw on top of the head
        const coords = this.coordsFromMove({
          direction: current.direction,
          offset: i + 1,
          x: pivot.x,
          y: pivot.y
        });
        if (i == playableIndex - 1) {
          console.log('== OUT ===========', pivot, coords);
          console.log('== OUT INDEX ==', i + 1);
          console.log('== OUT PIVOT ==', pivot);
          console.log('== OUT COORDS ==', coords);
          console.log('== OUT COVERED ==', distanceCovered);
          distanceCovered += i;
          pivot.x = coords.x;
          pivot.y = coords.y;
          console.log('== OUT PIVOT AFTER ==', pivot);
        }
        this.drawCell({ x: coords.x, y: coords.y });
      }
    }
    this.previousMoves.front();
  }

  /**
   * Moves the last executed moves to the previous moves
   * @returns {{direction: string} | null} the next move in line to be rendered
   */
  function popNextMove() {
    if (!this.nextMoves.length) return null;
    this.previousMoves.insert({
      item: this.nextMoves[0],
      maxSize: this.tailLength
    });
    console.log('this.prevMoves', this.previousMoves.top());
    this.nextMoves.splice(0, 1);
    this.tailLength++;
    return this.previousMoves.top();
  }

  /** save moves that have yet to be performed */
  function saveMove({ direction }) {
    this.nextMoves.push({ direction, linesCrossed: this.linesCrossed });
  }

  function handleKeyPress(e) {
    const directionsByKeyCode = {
      [38]: DIRECTIONS.DOWN,
      [87]: DIRECTIONS.DOWN,
      [40]: DIRECTIONS.UP,
      [83]: DIRECTIONS.UP,
      [37]: DIRECTIONS.RIGHT,
      [65]: DIRECTIONS.RIGHT,
      [39]: DIRECTIONS.LEFT,
      [68]: DIRECTIONS.LEFT
    };
    const direction = directionsByKeyCode[e.keyCode];
    if (direction && direction !== this.direction) {
      this.saveMove({
        direction,
        linesCrossed: this.linesCrossed
      });
    }
  }

  function setDirection(direction) {
    if (!Object.values(DIRECTIONS).includes(direction)) {
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
    const randomDirection =
      Object.values(DIRECTIONS)[Math.floor(Math.random() * 4)];
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
  this.position = 0;
  this.top = top;
  this.next = next;
  this.front = front;
  this.lastDistance = 0;
  this.distance = 0;

  function log(...msg) {
    console.log('[Capped List] ', ...msg);
  }

  function insert({ item, maxSize }) {
    this.log('insert', item);
    let distance = this.lastDistance
      ? this.lastDistance - item.linesCrossed
      : item.linesCrossed;
    item.distance = Math.abs(distance);
    this.collection.unshift(item);
    this.lastDistance = item.linesCrossed;
  }

  function size() {
    return this.collection.length;
  }

  function peek() {
    // this.log('peek');
    return this.collection[this.position];
  }

  function next() {
    if (this.position < this.size() - 1) {
      this.position++;
      return true;
    }
    return false;
  }

  function top() {
    return this.collection[0];
  }

  function front() {
    this.position = 0;
  }
}
