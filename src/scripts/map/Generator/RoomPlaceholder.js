export default class RoomPlaceholder {
    constructor(x, y, remainingHeight, remainingLength, defaults) {
        this.x = x
        this.y = y
        this.width = Phaser.Math.Between(1, ((3 > remainingLength) ? remainingLength : 3))
        this.height = Phaser.Math.Between(1, ((3 > remainingHeight) ? remainingHeight : 3))
        this.defaults = defaults
        this.doors = []
        this.name = `Room ${y} ${x}`
        this.requiresAdjacentRoom = false
        this.neighbours = []
        this.setDefaultDoors()
    }

    setDefaultDoors() {
        for(let i = 0; i < this.height; i++) {
            this.doors.push({left: false, right: false})
        }
    }

    addNeighbour(room) {
        this.neighbours.push(room)
        room.addNeighbour(this)
    }
}