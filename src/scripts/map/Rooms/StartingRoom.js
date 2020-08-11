export default class StartingRoom {
    name
    roomLayout

    constructor(x, y, width, height) {
        const tileSize = 16
        this.x = x * tileSize
        this.y = y * tileSize
        this.width = width;
        this.height = height;
        this.name = "Starting Room"
        this.roomLayout = Array(height * tileSize).fill().map(() => Array(width * tileSize))
        console.log(this.roomLayout)
    }
}