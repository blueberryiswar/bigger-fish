import StartingRoom from "./Rooms/StartingRoom"
import Room from "./Rooms/Room"


export default class Structure {
    map
    roomLayoutSketch

    constructor(x, y, defaults) {
        this.width = x * 12 * 16
        this.height = y * 10 * 16
        this.map = Array(y).fill().map(() => Array(x))
        this.defaults = defaults
        this.startingRoom = null
        //this.map[2][5] = this.roomFactory("Starting Room")
        console.log(this.map)
        this.generateRoomLayoutSketch()

    }

    
    roomFactory(type, room) {
        switch (type) {
            case "Starting Room":
                const startingRoom = new StartingRoom(room.x, room.y, room.width, room.height, this.defaults)
                console.log(startingRoom)
                return startingRoom
            case "Room":
                const regularRoom = new Room(room.x, room.y, room.width, room.height, this.defaults, room.name)
                return regularRoom
            default:
                return null
        }
    }
    
    generateRooms() {
        let hasStartingRoom = false
        for(let y=0; y < this.map.length; y++) {
            let currentFloor = this.map[y]
            for(let x = 0; x < currentFloor.length; x++) {
                let currentRoom = currentFloor[x]
                if(currentRoom) continue
                let room = this.roomLayoutSketch[y][x]
                if(room !== undefined) {
                    if(room.x === x && room.y === y) {
                        if(!hasStartingRoom && room.width === 1) {
                            this.map[y][x] = this.roomFactory("Starting Room", room)
                            this.startingRoom = this.map[y][x]
                            hasStartingRoom = true
                        } else {
                            this.map[y][x] = this.roomFactory("Room", room)
                        }
                        
                    }
                }
            }
        }
        console.log(this.map)
    }

    generateRoomLayoutSketch() {
        this.roomLayoutSketch = Array(this.map.length).fill().map(() => Array(this.map[0].length));
        for (let y = 0; y < this.roomLayoutSketch.length; y++) {
            const currentFloor = this.roomLayoutSketch[y]
            const remainingHeight = this.roomLayoutSketch.length - (y + 1)
            let stairsOnFloor = ((y > 0) ? 2 : 1)
            const targetRoom = currentFloor.filter(room => room.height > 1)
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
                    } else if (targetRoom.length > 0 && targetRoom[0].x < x) {
                        makeRoom = true
                    }
                } else {
                    //let decisions = Phaser.Math.Between(0, 3)
                    //if (decisions > 0) makeRoom = true
                    makeRoom  = true
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
                //if(room.width === 3) room.height = 1
                if(room.height > 1) stairsOnFloor--
                room.requiresAdjacentRoom = (((room.height > 1) && stairsOnFloor <= 0) ? false : true)
                if(room.width > 2 && currentFloor[x+2]) room.width = 2
                if(room.width > 1 && currentFloor[x+1]) room.width = 1

                for (let i = 0; i < room.width; i++) {
                    currentFloor[x + i] = room
                    for (let iy = 0; iy < room.height; iy++) {
                        this.roomLayoutSketch[y + iy][x + i] = room
                    }
                }

                if (currentFloor[x]) {
                    currentFloor[x].name = `room ${x} ${y}`
                }


            }
            const floorHasStairs = currentFloor.filter(room => (room.y + room.height -1) >= y && room.height > 1)
            console.log(floorHasStairs)
            if(floorHasStairs.length === 0) {
                this.roomLayoutSketch[y] = currentFloor.map(() => undefined)
                console.log(`Found no staircase on Floor ${y}`)
            }
        }
        console.log("Room Layout", this.roomLayoutSketch)
        this.generateRooms()
    }


}