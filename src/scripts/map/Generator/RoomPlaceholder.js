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
            this.doors.push([false, false])
        }
    }

    addNeighbour(room) {
        for(let i = 0; i < this.neighbours.length; i++) {
            let otherRoom = this.neighbours[i]
            if (otherRoom.x === room.x && otherRoom.y === room.y) return true
        }
        this.neighbours.push(room)
        this.createDoorToNeighbour(room)
        room.addNeighbour(this)
    }

    createDoorToNeighbour(neighbour) {
        let floor = 0
        if(neighbour.y > this.y) floor = this.y + this.height - neighbour.y
        console.log([this.doors, floor, this.y, neighbour.y])
        const side = ((this.x < neighbour.x) ? 0 : 1)
        this.doors[floor][side] = true
        console.log([this, neighbour])
    }
}