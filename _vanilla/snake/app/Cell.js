import { DIRECTIONS } from "./enums.js";

function Cell({ context, width, x, y, direction }) {
  this.x = x;
  this.y = y;
  this.next;
  this.velocity = 5;
  this.direction = direction;
  this.width = width;
  this.draw = draw;
  this.move = move;
  this.setDirection = setDirection;
  this.context = context;
  this.append = append;

  function draw({ move }) {
    // this.context.strokeStyle = "green";
    this.context.fillStyle = "purple";
    this.context.roundRect(this.x, this.y, this.width, this.width, [2]);
    this.context.fill();
    this.context.stroke();
    if (move) {
      this.setDirection(move.direction);
    }
    this.move();
  }

  function append(cell) {
    if (!(cell instanceof Cell)) {
      throw new Error("Only a cell can be appended to another Cell");
    }
    this.next = cell;
  }

  function move() {
    switch (this.direction) {
      case DIRECTIONS.UP: {
        this.y -= this.velocity;
        break;
      }
      case DIRECTIONS.DOWN: {
        this.y += this.velocity;
        break;
      }
      case DIRECTIONS.LEFT: {
        this.x -= this.velocity;
        break;
      }
      case DIRECTIONS.RIGHT: {
        this.x += this.velocity;
        break;
      }
      default:
        console.log("Move DEFAULT");
    }
  }

  function setDirection(direction) {
    if (!Object.values(DIRECTIONS).includes(direction)) {
      throw new Error(`Invalid direction: ${direction}`);
    }
    this.direction = direction;
  }
}

export default Cell;
