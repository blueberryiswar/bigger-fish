export class DoorPlaceholder {
    constructor(roomA, roomB) {
        this.roomA = roomA
        this.roomB = roomB
        this.closed = false
        this.y = 0
        this.x = 0
        this.globalY = 0
        this.globalX = 0
        this.height = 3
        this.name = ""
    }

    connectRooms() {
        if(this.roomA.y + this.roomA.height > this.roomB.y + this.roomB.height) {
            this.globalY = (this.roomB.y + this.roomB.height) * this.roomB.defaults.roomSize.y - this.height - 1
            this.y = this.roomB.height * this.roomB.defaults.roomSize.y - this.height - 1
        } else {
            this.globalY = (this.roomA.y + this.roomA.height) * this.roomA.defaults.roomSize.y - this.height - 1
            this.y = this.roomA.height * this.roomA.defaults.roomSize.y - this.height - 1
        }
        if(this.roomA.x > this.roomB.x) {
            this.globalX = this.roomA.x * this.roomA.defaults.roomSize.x -1
            this.x = 0
        } else {
            this.globalX = this.roomB.x * this.roomB.defaults.roomSize.x - 1
            this.x = this.roomA.width * this.roomA.defaults.roomSize.x -1
        }
        this.name = "Own Door"

        console.log(`${this.roomA.name} to ${this.roomB.name}`, this)
    }

    connectRoomsAtLocation(location) {
        
        this.y = location.globalY - this.roomA.y * this.roomA.defaults.roomSize.y
        this.globalY = this.y + this.roomA.y * this.roomA.defaults.roomSize.y
        
        if(location.x === 0) {
            this.x = this.roomA.width * this.roomA.defaults.roomSize.x - 1
            this.globalX = (this.roomA.width + this.roomA.x) * this.roomA.defaults.roomSize.x - 1
        } else {
            this.x = 0
            this.globalX = this.roomA.x * this.roomA.defaults.roomSize.x
        }
        this.name = "Other Door"
    }

}