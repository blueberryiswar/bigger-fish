export class StartingRoom {
    name
    roomLayout

    constructor(x, y) {
        this.name = "Starting Room"
        this.roomLayout = Array(y).fill().map(() => Array(x))
        console.log(this.roomLayout)
    }
}