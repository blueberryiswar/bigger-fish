import RoomPlaceholder from "./RoomPlaceholder"

export default class Generator {
    constructor(width, height, options) {
        this.options = options
        this.map = Array(height).fill().map(() => Array(width))
        this.height = height
        this.width = width
    }

    generateMap() {
        for (let y = 0; y < this.map.length; y++) {
            const currentFloor = this.map[y]
            const remainingHeight = this.map.length - y
            let stairsOnFloor = ((y > 0) ? 2 : 1)
            const targetRoom = currentFloor.filter(room => room.height > 1)
            for (let x = 0; x < currentFloor.length; x++) {
                const currentRoom = currentFloor[x];
                if (currentRoom) {
                    if (!currentRoom.requiresAdjacentRoom && currentRoom.y < y) currentRoom.requiresAdjacentRoom = true
                    continue
                }

                const remainingLength = currentFloor.length - (x + 1)
                const room = new RoomPlaceholder(x, y, remainingHeight, remainingLength, this.options)

                let makeRoom = false
                if (x !== 0) {
                    if (currentFloor[x - 1] !== undefined && currentFloor[x - 1].requiresAdjacentRoom) {
                        makeRoom = true
                    } else if (targetRoom.length > 0 && targetRoom[0].x < x) {
                        makeRoom = true
                    }
                } else {
                    makeRoom = true
                }
                if (!makeRoom) continue
                   
                //if(room.width === 3) room.height = 1
                if (room.height > 1) stairsOnFloor--
                room.requiresAdjacentRoom = (((room.height > 1) && stairsOnFloor <= 0) ? false : true)
                if (room.width > 2 && currentFloor[x + 2]) room.width = 2
                if (room.width > 1 && currentFloor[x + 1]) room.width = 1

                for (let i = 0; i < room.width; i++) {
                    currentFloor[x + i] = room
                    for (let iy = 0; iy < room.height; iy++) {
                        this.map[y + iy][x + i] = room
                    }
                }

                if (currentFloor[x]) {
                    currentFloor[x].name = `room ${x} ${y}`
                }
            }
            const floorHasStairs = currentFloor.filter(room => (room.y + room.height - 1) >= y && room.height > 1)
            console.log(currentFloor)
            if (floorHasStairs.length === 0) {
                this.map[y] = currentFloor.map(() => undefined)
                console.log(`Found no staircase on Floor ${y}`)
            }
        }
        this.setNeighbours()
        console.log("Room Layout", this.map)
        
    }

    setNeighbours() {
        let lastRoom = []
        for(let y = 0; y < this.map.length; y++) {
            for(let x = 0; x < this.map.length; x++) {
                let room = this.map[y][x]
                if(!room) continue
                if(lastRoom.includes(room.name)) continue
                lastRoom.push(room.name)
                for(let i = 0; i<room.height; i++) {
                    if(room.width + room.x <= this.width && this.map[y+i][room.x + room.width]) room.addNeighbour(this.map[y+i][room.x + room.width])
                    if(room.x > 0 && this.map[y+i][room.x-1]) room.addNeighbour(this.map[y+i][room.x-1])
                }
                
            }
        }
    }

    getMap() {
        this.generateMap()
        return this.map
    }
}