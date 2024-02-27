import { DIRECTIONS } from "./enums.js";
import config from "./config.js";

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
  this.grow = grow;
  this.generateCell = generateCell;
  this.lastMove = null;

  function draw({ move }) {
    // this.context.strokeStyle = "green";
    this.context.fillStyle = "black";
    this.context.roundRect(this.x, this.y, this.width, this.width, [2]);
    this.context.fill();
    this.context.stroke();
    if (this.next) {
      console.log("this.next");
      this.next.draw({ move: this.lastMove });
    }
    if (move) {
      this.setDirection(move.direction);
    }
    this.move();
  }

  function grow() {
    console.log("[grow]");
    const cell = this.generateCell();
    this.next = cell;
    console.log("[grow] NEXT", this.next);
    return cell;
  }

  function generateCell() {
    let x;
    let y;
    switch (this.direction) {
      case DIRECTIONS.UP:
        x = this.x;
        y = this.y + this.width;
        break;
      case DIRECTIONS.DOWN:
        x = this.x;
        y = this.y - this.width;
        break;
      case DIRECTIONS.LEFT:
        y = this.y;
        x = this.x + this.width;
        break;
      case DIRECTIONS.RIGHT:
        y = this.y;
        x = this.x - this.width;
        break;
      default:
        console.log("Move DEFAULT");
    }
    return new Cell({ width, context, x, y, direction: this.direction });
  }

  function move() {
    switch (this.direction) {
      case DIRECTIONS.UP:
        if (this.y <= 0 - this.width) {
          this.y = config.canvas.height;
        } else {
          this.y -= this.velocity;
        }
        break;
      case DIRECTIONS.DOWN:
        if (this.y > config.canvas.height) {
          this.y = 0 - this.width;
        } else {
          this.y += this.velocity;
        }
        break;
      case DIRECTIONS.LEFT:
        if (this.x <= 0) {
          this.x = config.canvas.height;
        } else {
          this.x -= this.velocity;
        }
        break;
      case DIRECTIONS.RIGHT:
        if (this.x > config.canvas.height) {
          this.x = 0 - this.width;
        } else {
          this.x += this.velocity;
        }
        break;
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
