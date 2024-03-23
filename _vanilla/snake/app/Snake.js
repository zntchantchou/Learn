import { DIRECTIONS } from "../constants/enums.js"
import config from "../constants/config.js"

function Snake() {
    this.canvasHeight = config.canvas.cellWidth * config.canvas.cellsPerRow
    this.canvasWidth = config.canvas.cellWidth * config.canvas.cellsPerRow
    this.cellWidth = config.canvas.cellWidth
    this.columns = config.canvas.cellsPerRow
    this.rows = config.canvas.cellsPerRow
    this.canvasElt = document.getElementById("canvas")
    this.context = this.canvasElt.getContext("2d")
    this.padding = config.canvas.cellWidth / 10
    this.velocity = config.canvas.cellWidth / 5
    // position of the head
    this.x = this.canvasWidth / 2
    this.y = this.canvasHeight / 2
    this.length = 1
    this.isAtBreakPoint = isAtBreakPoint
    this.direction
    this.xDirections = [DIRECTIONS.LEFT, DIRECTIONS.RIGHT]
    this.yDirections = [DIRECTIONS.UP, DIRECTIONS.DOWN]
    this.drawGrid = drawGrid
    this.getHead = getHead
    this.animate = animate.bind(this)
    this.handleKeyPress = handleKeyPress
    this.getRandomDirection = getRandomDirection
    this.setDirection = setDirection
    this.drawCell = drawCell
    this.updateCellCoords = updateCellCoords
    this.updateCellDirection = updateCellDirection
    this.append = append
    this.setup = setup
    this.getTail = getTail
    this.queuedMoves = []
    this.nextMoves = []
    this.popNextMove = popNextMove
    this.getInboundCoords = getInboundCoords
    this.initialized = false
    this.flushMoves = flushMoves
    this.cells = [
        {
            x: this.canvasWidth / 2,
            y: this.canvasHeight / 2,
            direction: null
        }
    ]
    this.log = log
    this.moveUpdateFns = []

    this.queueMove = queueMove
    this.setup()

    function getHead() {
        return this.cells[0]
    }

    function setup() {
        document.addEventListener("keydown", (e) => this.handleKeyPress(e))
        this.cells[0].direction = this.getRandomDirection()
        this.animate()
    }

    function queueMove(move) {
        this.queuedMoves.push(move)
    }

    function updateCellCoords(cell, index) {
        if (isNaN(cell.x) || isNaN(cell.y) || !Object.values(DIRECTIONS).includes(cell.direction)) {
            throw new Error("[getUpdatedCoords] Invalid coords")
        }
        const coordsFromDirection = {
            [DIRECTIONS.DOWN]: {
                ...cell,
                y: cell.y + this.velocity
            },
            [DIRECTIONS.UP]: {
                ...cell,
                y: cell.y - this.velocity
            },
            [DIRECTIONS.RIGHT]: {
                ...cell,
                x: cell.x + this.velocity
            },
            [DIRECTIONS.LEFT]: {
                ...cell,
                x: cell.x - this.velocity
            }
        }
        return {
            ...cell,
            ...this.getInboundCoords(coordsFromDirection[cell.direction])
        }
    }

    function append() {
        const tail = this.getTail()
        const coordsFromDirection = {
            [DIRECTIONS.UP]: {
                ...tail,
                y: tail.y + this.cellWidth
            },
            [DIRECTIONS.DOWN]: {
                ...tail,
                y: tail.y - this.cellWidth
            },
            [DIRECTIONS.LEFT]: {
                ...tail,
                x: tail.x + this.cellWidth
            },
            [DIRECTIONS.RIGHT]: {
                ...tail,
                x: tail.x - this.cellWidth
            }
        }
        this.cells.push(coordsFromDirection[tail.direction])
    }

    function popNextMove() {
        if (this.queuedMoves && this.queuedMoves.length > 0) {
            const nextMove = this.queuedMoves[0]
            this.nextMoves.push(nextMove)
            this.queuedMoves.splice(0, 1)
            return nextMove
        }
        return null
    }

    function updateCellDirection(cell, index) {
        if (!this.nextMoves.length) {
            return cell
        }
        let moveIndex = this.nextMoves.findIndex((mv) => mv.playCount === index)
        if (moveIndex > -1) {
            this.moveUpdateFns.push(() => {
                this.nextMoves[moveIndex].playCount++
            })
            return {
                ...cell,
                direction: this.nextMoves[moveIndex].direction
            }
        }
        return cell
    }

    function flushMoves() {
        this.nextMoves = this.nextMoves.filter((move) => move.playCount < this.cells.length)
    }

    function animate() {
        this.drawGrid()
        let isAtBreakPoint = this.isAtBreakPoint(this.getHead())
        if (isAtBreakPoint) {
            if (this.moveUpdateFns.length) {
                for (let updateMoveCount of this.moveUpdateFns) updateMoveCount()
            }
            this.moveUpdateFns = []
            this.popNextMove()
            this.flushMoves()
        }
        this.cells = this.cells.map((cell, index) => {
            if (isAtBreakPoint) {
                return this.updateCellCoords(this.updateCellDirection(cell, index))
            }
            return this.updateCellCoords(cell)
        })
        for (let cell of this.cells) {
            this.drawCell(cell)
        }
        this.initialized = true
        this.log()
        requestAnimationFrame(this.animate)
    }

    function log() {
        if (this.queuedMoves.length || this.nextMoves.length) {
            console.log("#--------------------------")
            console.log("#NEXTMOVE: ", this.nextMoves)
            console.log("#QUEUED MOVES: ", this.queuedMoves)
        }
    }
    function getInboundCoords({ x: xPosition, y: yPosition }) {
        // snake reappears on opposite side if it hits a wall
        let x = xPosition
        let y = yPosition
        if (y >= this.canvasWidth + this.cellWidth) {
            y = 0
        }
        if (y <= 0 - this.cellWidth) {
            y = this.canvasWidth
        }
        if (x >= this.canvasWidth + this.cellWidth) {
            x = 0
        }
        if (x <= 0 - this.cellWidth) {
            x = this.canvasWidth
        }
        return {
            x,
            y
        }
    }

    function drawCell({ x, y }) {
        this.context.roundRect(x, y, this.cellWidth - this.padding, this.cellWidth - this.padding, [
            7
        ])
        this.context.stroke()
        this.context.fillStyle = "purple"
        this.context.fill()
    }

    function handleKeyPress(e) {
        const directionsByKeyCode = {
            [38]: DIRECTIONS.UP,
            [87]: DIRECTIONS.UP,
            [40]: DIRECTIONS.DOWN,
            [83]: DIRECTIONS.DOWN,
            [37]: DIRECTIONS.LEFT,
            [65]: DIRECTIONS.LEFT,
            [39]: DIRECTIONS.RIGHT,
            [68]: DIRECTIONS.RIGHT
        }
        this.queueMove({
            direction: directionsByKeyCode[e.keyCode],
            playCount: 0
        })
        this.append()
    }

    function setDirection(direction) {
        if (!Object.values(DIRECTIONS).includes(direction)) {
            throw new Error(`Invalid direction: ${direction}`)
        }
        this.direction = direction
    }

    function drawGrid() {
        this.canvasElt.width = this.canvasWidth
        this.canvasElt.height = this.canvasHeight
        // Draw grid row by row
        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j <= this.rows; j++) {
                this.context.fillStyle = (j + i) % 2 ? "#FCB24F" : "#FBC04E"
                this.context.beginPath()
                this.context.rect(
                    i * this.cellWidth,
                    j * this.cellWidth,
                    this.cellWidth,
                    this.cellWidth
                )
                this.context.fill()
            }
        }
    }

    /**
     * Whether the snake's head is crossing a line at this frame
     * @returns {boolean}
     */
    function isAtBreakPoint({ x, y, direction }) {
        if (this.yDirections.includes(direction)) {
            return y % this.cellWidth === 0
        }

        if (this.xDirections.includes(direction)) {
            return x % this.cellWidth === 0
        }
        return false
    }

    function getRandomDirection() {
        return Object.values(DIRECTIONS)[Math.floor(Math.random() * 4)]
    }

    function getTail() {
        return this.cells[this.cells.length - 1]
    }
}

export default Snake
