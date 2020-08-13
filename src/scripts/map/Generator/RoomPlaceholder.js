import { DoorPlaceholder } from "./DoorPlaceholder"

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
        //this.setDefaultDoors()
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
        let door = null
        if(!this.hasDoorToNeighbour(room)) door = this.createDoorToNeighbour(room)
        //if(!room.hasDoorToNeighbour(this)) room.createDoorAtLocation(this, door)
    }

    hasDoorToNeighbour(neighbour) {
        return !!this.doors.filter(door => door.roomB.name === neighbour.name).length
    }

    createDoorToNeighbour(neighbour) {
        let myDoor = new DoorPlaceholder(this, neighbour)
        myDoor.connectRooms()
        this.doors.push(myDoor)
        return myDoor
    }

    createDoorAtLocation(room, door) {
        const myDoor = new DoorPlaceholder(room, this)
        myDoor.connectRoomsAtLocation(door)
        room.doors.push(myDoor)
    }
}