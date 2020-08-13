import StartingRoom from "./Rooms/StartingRoom"
import Room from "./Rooms/Room"
import Generator from "./Generator/Generator"
import TargetRoom from "./Rooms/TargetRoom"
import TreasureRoom from "./Rooms/TreasureRoom"


export default class Structure {
    map
    roomLayoutSketch

    constructor(x, y, defaults, scene) {
        this.width = x
        this.height = y
        this.scene = scene
        this.map = Array(y).fill().map(() => Array(x))
        this.defaults = defaults
        this.startingRoom = null
        this.rooms = []
        //this.map[2][5] = this.roomFactory("Starting Room")
        this.generator = new Generator(x, y, defaults)
        this.roomLayoutSketch = this.generator.getMap()
        this.generateRooms();
    }


    roomFactory(type, room) {
        switch (type) {
            case "Starting Room":
                return new StartingRoom(room, this.defaults)
            case "Target Room":
                return new TargetRoom(room, this.defaults)
            case "Treasure Room":
                return new TreasureRoom(room, this.defaults)
            case "Room":
                return new Room(room, this.defaults, room.name)
            default:
                return null
        }
    }

    generateRooms() {
        let hasStartingRoom = false
        let hasTargetRoom = false
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const room = this.roomLayoutSketch[y][x]
                if (room !== undefined) {
                    if (room.x === x && room.y === y) {
                        let type = "Room"
                        if (!hasStartingRoom && room.width === 1) {
                            type = "Starting Room"
                            hasStartingRoom = true
                        } else if(hasStartingRoom && !hasTargetRoom && room.doors.length === 1) {
                            type = "Target Room"
                            hasTargetRoom = true
                        } else if(room.doors.length === 1) {
                            type = "Treasure Room"
                        }
                        const newRoom = this.roomFactory(type, room)
                        this.map[y][x] = newRoom
                        if (type = "Starting Room") this.startingRoom = newRoom
                        this.rooms.push(newRoom)
                        newRoom.makeRoomLayout()
                    }
                }
            }
        }

        console.log(this.map)
    }

    drawMap() {
        for (let i = 0; i < this.rooms.length; i++) {
            for (let posY = 0; posY < this.rooms[i].roomLayout.length; posY++) {
                for (let posX = 0; posX < this.rooms[i].roomLayout[posY].length; posX++) {
                    let x = this.defaults.tileSize / 2 + this.rooms[i].x + posX * this.defaults.tileSize;
                    let y = this.defaults.tileSize / 2 + this.rooms[i].y + posY * this.defaults.tileSize;
                    this.scene.add.sprite(x, y, this.defaults.tileSet, this.rooms[i].roomLayout[posY][posX])
                }
            }
        }
    }
}