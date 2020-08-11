import { StartingRoom } from "./Rooms/StartingRoom"
import Room from "./Rooms/Room"


export default class Structure {
    map
    roomLayoutSketch

    constructor(x, y) {
        this.map = Array(y).fill().map(() => Array(x))
        //this.map[2][5] = this.roomFactory("Starting Room")
        console.log(this.map)
        this.generateRoomLayoutSketch()

    }

    
    roomFactory(type, room) {
        switch (type) {
            case "Starting Room":
                const startingRoom = new StartingRoom(room.x, room.y, room.width, room.height)
                return startingRoom
            case "Room":
                const regularRoom = new Room(room.x, room.y, room.width, room.height, room.name)
                return regularRoom
            default:
                return null
        }
    }
    
    generateRooms() {
        for(let y=0; y < this.map.length; y++) {
            let currentFloor = this.map[y]
            for(let x = 0; x < currentFloor.length; x++) {
                let currentRoom = currentFloor[x]
                if(currentRoom) continue
                let room = this.roomLayoutSketch[y][x]
                if(room !== undefined) {
                    console.log(this.roomFactory("Room", room))
                }
                console.log(`Room ${x} ${y}`, room)
            }
        }
        console.log(this.map)
    }

    generateRoomLayoutSketch() {
        this.roomLayoutSketch = Array(this.map.length).fill().map(() => Array(this.map[0].length));
        for (let y = 0; y < this.roomLayoutSketch.length; y++) {
            let currentFloor = this.roomLayoutSketch[y]
            let remainingHeight = this.roomLayoutSketch.length - (y + 1)
            for (let x = 0; x < currentFloor.length; x++) {
                let currentRoom = currentFloor[x];
                if (currentRoom) {
                    if (!currentRoom.requiresAdjacentRoom && currentRoom.y < y) currentRoom.requiresAdjacentRoom = true
                    continue
                }
                let makeRoom = false
                if (x !== 0) {
                    if (currentFloor[x - 1] !== undefined && currentFloor[x - 1].requiresAdjacentRoom) {
                        makeRoom = true
                    }
                } else {
                    let decisions = Phaser.Math.Between(0, 3)
                    if (decisions > 0) makeRoom = true
                }
                if (!makeRoom) continue


                let remainingLength = currentFloor.length - (x + 1)

                let room = {
                    x: x,
                    y: y,
                    width: Phaser.Math.Between(1, ((3 > remainingLength) ? remainingLength : 3)),
                    height: Phaser.Math.Between(1, ((3 > remainingHeight) ? remainingHeight : 3)),
                    name: "Room",
                    requiresAdjacentRoom: null
                }
                room.requiresAdjacentRoom = ((room.height > 1) ? false : true)

                for (let i = 0; i < room.width; i++) {
                    currentFloor[x + i] = room
                }

                for (let i = 0; i < room.height; i++) {
                    this.roomLayoutSketch[y + i][x] = room
                }
                if (currentFloor[x]) {
                    currentFloor[x].name = `room ${x} ${y}`

                }


            }

        }
        console.log("Room Layout", this.roomLayoutSketch)
        this.generateRooms()
    }


}