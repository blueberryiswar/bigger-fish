import StartingRoom from "./Rooms/StartingRoom"
import Room from "./Rooms/Room"
import Generator from "./Generator/Generator"
import TargetRoom from "./Rooms/TargetRoom"
import TreasureRoom from "./Rooms/TreasureRoom"
import InteractableObjects from "../Groups/InteractableObjects"


export default class Structure {
    map
    roomLayoutSketch

    constructor(x, y, defaults, scene) {
        this.width = x
        this.height = y
        this.widthInTiles = x * defaults.roomSize.x
        this.heightInTiles = y * defaults.roomSize.y
        this.widthInPixel = x * defaults.tileSize * defaults.roomSize.x
        this.heightInPixel = y * defaults.tileSize * defaults.roomSize.y
        this.scene = scene
        this.map = Array(y).fill().map(() => Array(x))
        this.defaults = defaults
        this.startingRoom = null
        this.rooms = []
        //this.map[2][5] = this.roomFactory("Starting Room")
        this.generator = new Generator(x, y, defaults)
        this.roomLayoutSketch = this.generator.getMap()
        this.walls = this.scene.physics.add.staticGroup()
        this.doors = []
        this.platforms = []
        this.doorGroup = new InteractableObjects(scene.physics.world, scene)
        //this.interactableObjects = new InteractableObjects(scene.physics.world, scene)
        this.generateRooms();
    }


    roomFactory(type, room) {
        switch (type) {
            case "Starting Room":
                return new StartingRoom(room, this.defaults, this)
            case "Target Room":
                return new TargetRoom(room, this.defaults, this)
            case "Treasure Room":
                return new TreasureRoom(room, this.defaults, this)
            case "Room":
                return new Room(room, this.defaults, this, room.name)
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
                if (room) {
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
                    //sprite = new BackgroundTile(this.scene, x, y, this.defaults.tileSet, this.rooms[i].roomLayout[posY][posX])
                    if(this.rooms[i].roomLayout[posY][posX] <= this.defaults.backgroundTileTo) {
                        this.scene.add.image(x, y, this.defaults.tileSet, this.rooms[i].roomLayout[posY][posX]).setZ(1)
                    } else {
                        this.walls.create(x, y, this.defaults.tileSet, this.rooms[i].roomLayout[posY][posX]).setZ(1)
                    }
                    
                    //this.walls.create(x, y, this.defaults.tileSet, this.rooms[i].roomLayout[posY][posX])
                }
            }
        }
        for (let i = 0; i < this.doors.length; i++) {
            this.doorGroup.createDoor(this.doors[i])
        }
        
        for(let i = 0; i < this.platforms.length; i++) {
            console.log(this.platforms[i])
            this.walls.create(this.platforms[i].x, this.platforms[i].y, this.defaults.tileSet, this.platforms[i].sprite)
        }
    }
}