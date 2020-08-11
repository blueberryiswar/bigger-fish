export class StartingRoom {
    name
    roomLayout

    constructor(x, y, width, height) {
        const tileSize = 16
        const defaultRoom = {x: 26, y:20}
        this.x = x * tileSize * defaultRoom.x
        this.y = y * tileSize * defaultRoom.y
        this.width = width;
        this.height = height;
        this.name = "Starting Room"
        this.roomLayout = Array(height * tileSize).fill().map(() => Array(width * tileSize))
        console.log(this.roomLayout)
    }
}