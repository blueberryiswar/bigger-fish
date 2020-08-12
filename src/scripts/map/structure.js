import StartingRoom from "./Rooms/StartingRoom"
import Room from "./Rooms/Room"
import Generator from "./Generator/Generator"


export default class Structure {
    map
    roomLayoutSketch

    constructor(x, y, defaults, scene) {
        this.width = x * 12 * 16
        this.height = y * 10 * 16
        this.scene = scene
        this.map = Array(y).fill().map(() => Array(x))
        this.defaults = defaults
        this.startingRoom = null
        //this.map[2][5] = this.roomFactory("Starting Room")
        this.generator = new Generator(x, y, defaults)
        this.roomLayoutSketch = this.generator.getMap()
        this.generateRooms();
    }


    roomFactory(type, room) {
        switch (type) {
            case "Starting Room":
                const startingRoom = new StartingRoom(room, this.defaults)
                console.log(startingRoom)
                return startingRoom
            case "Room":
                const regularRoom = new Room(room, this.defaults, room.name)
                return regularRoom
            default:
                return null
        }
    }

    generateRooms() {
        let hasStartingRoom = false
        for (let y = 0; y < this.map.length; y++) {
            let currentFloor = this.map[y]
            for (let x = 0; x < currentFloor.length; x++) {
                const room = this.roomLayoutSketch[y][x]
                if (room !== undefined && !room.placeholder) {
                    if (room.x === x && room.y === y) {
                        if (!hasStartingRoom && room.width === 1) {
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

    drawMap() {
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                if (this.map[y][x] !== undefined) {
                    for (let posY = 0; posY < this.map[y][x].roomLayout.length; posY++) {
                        for (let posX = 0; posX < this.map[y][x].roomLayout[posY].length; posX++) {
                            let sx = this.defaults.tileSize / 2 + this.map[y][x].x + posX * this.defaults.tileSize;
                            let sy = this.defaults.tileSize / 2 + this.map[y][x].y + posY * this.defaults.tileSize;
                            this.scene.add.sprite(sx, sy, this.defaults.tileSet, this.map[y][x].roomLayout[posY][posX])
                        }
                    }
                }
            }
        }
    }
}