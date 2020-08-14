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
        this.side = ""
    }

    connectRooms() {
        let diffY = (this.roomA.y + this.roomA.height - this.roomB.y - this.roomB.height) * this.roomA.defaults.roomSize.y
        if(diffY < 0) diffY = 0
        this.globalY = (this.roomA.y + this.roomA.height) * this.roomA.defaults.roomSize.y  - diffY - this.height - 1
        this.y = this.roomA.height * this.roomA.defaults.roomSize.y - diffY - this.height - 1
        
        if(this.roomA.x > this.roomB.x) {
            this.globalX = this.roomA.x * this.roomA.defaults.roomSize.x
            this.x = 0
            this.side = "left"
        } else {
            this.globalX = (this.roomA.x + this.roomA.width) * this.roomA.defaults.roomSize.x - 1
            this.x = this.roomA.width * this.roomA.defaults.roomSize.x - 1
            this.side = "right"
        }
        this.name = "Own Door"

        console.log(`${this.roomA.name} to ${this.roomB.name}`, this)
    }

    getConfig() {
        return {
            type: "regular",
            x: this.globalX * this.roomA.defaults.tileSize,
            y: this.globalY * this.roomA.defaults.tileSize + this.roomA.defaults.tileSize * this.height / 2,
        }
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