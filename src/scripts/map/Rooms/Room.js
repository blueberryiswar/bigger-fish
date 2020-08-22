export default class Room {

    constructor(room, defaults, structure, name) {
        this.defaults = defaults
        this.x = room.x * this.defaults.roomSize.x * this.defaults.tileSize
        this.y = room.y * this.defaults.tileSize * this.defaults.roomSize.y
        this.width = room.width
        this.height = room.height
        this.doors = room.doors
        this.name = name
        this.structure = structure
        this.wallTiles = this.defaults.innerWall
        this.roomLayout = Array(this.defaults.roomSize.y * room.height).fill().map(() => Array(this.defaults.roomSize.x * room.width))
        //this.roomLayout = this.getRoomLayout(`${height}x${width}`);
        
    }

    makeRoomLayout() {

        //this.roomLayout[0].fill(0).map(() => this.defaults.defaultWallTiles[Phaser.Math.Between(0, this.defaults.defaultWallTiles.length)])
        for(let y = 0; y < this.roomLayout.length; y++) {
            for(let x = 0; x < this.roomLayout[y].length; x++) {
                if (Phaser.Math.Between(0, 2) < 2) {
                    this.roomLayout[y][x] = this.defaults.defaultBackgroundTile
                } else {
                    this.roomLayout[y][x] = Phaser.Math.Between(this.defaults.backgroundTileFrom, this.defaults.backgroundTileTo)
                }
                
            }
        }
        this.makeWalls()
        this.makeDoors()
        console.log(this.roomLayout)
    }
   
    makeWalls() {
        this.roomLayout[0][0] = this.wallTiles.leftTop
        this.roomLayout[0][this.roomLayout[0].length - 1] = this.wallTiles.rightTop
        this.roomLayout[this.roomLayout.length - 1][0] = this.wallTiles.leftBottom
        this.roomLayout[this.roomLayout.length - 1][this.roomLayout[0].length - 1] = this.wallTiles.rightBottom
        for(let i = 1; i < this.roomLayout[0].length -1; i++) {
            this.roomLayout[0][i] = this.wallTiles.top
            this.roomLayout[this.roomLayout.length - 1][i] = this.wallTiles.bottom
        }
        for(let i = 1; i < this.roomLayout.length - 1; i++) {
            this.roomLayout[i][0] = this.wallTiles.left
            this.roomLayout[i][this.roomLayout[0].length - 1] = this.wallTiles.right
        }

        if(this.height > 1) {
            const pStart = Phaser.Math.FloorTo(this.roomLayout[0].length / 4)
            for(let hi = 1; hi < this.height; hi++) {
                let py = this.y + (this.height - hi) * this.defaults.roomSize.y * this.defaults.tileSize + 3 * this.defaults.tileSize - this.defaults.tileSize / 2
                let pyDoor = this.y + (this.height - hi) * this.defaults.roomSize.y * this.defaults.tileSize - this.defaults.tileSize / 2
                for(let i = 1; i < this.roomLayout[0].length /2 - 1; i++) {
                    let px = this.x + pStart * 16 + i * 16 + 8
                    this.structure.platforms.push({
                        sprite: this.defaults.platform.middle,
                        x: px,
                        y: py
                    })
                }
                this.structure.platforms.push({
                    sprite: this.defaults.platform.left,
                    x: this.x + pStart * 16 + 8,
                    y: py
                })
                this.structure.platforms.push({
                    sprite: this.defaults.platform.right,
                    x: this.x + 24,
                    y: pyDoor
                })

                this.structure.platforms.push({
                    sprite: this.defaults.platform.left,
                    x: this.x + (this.width * this.defaults.roomSize.x) * 16 - 24,
                    y: pyDoor
                })
                
                this.structure.platforms.push({
                    sprite: this.defaults.platform.right,
                    x: this.x + pStart * 16 + (this.roomLayout[0].length / 2 - 1) * 16 + 8,
                    y: py
                })
            }
        } 
    }

    makeDoors() {
        const width = this.roomLayout[0].length - 1
        const roomHeight = this.defaults.roomSize.y
        
        for(let i = 0; i < this.doors.length; i++) {
            console.log(`Door: ${this.doors[i].name} this.roomLayout[${this.doors[i].y}][${this.doors[i].x}]`)
            if(this.roomLayout[this.doors[i].y]) {
                for (let dy = 0; dy < this.doors[i].height; dy++) {
                    this.roomLayout[this.doors[i].y + dy][this.doors[i].x] = this.defaults.defaultBackgroundTile
                }
                /*if(this.height > 1) {
                    let py = this.y + this.doors[i].y * 16 + this.doors[i].height * 16 + 8
                    let sx = -1 * this.defaults.tileSize
                    if(this.doors[i].side === "left") {
                        sx = this.defaults.tileSize
                    }
                    for (let ii = 0; ii < 3; ii++) {
                        this.structure.platforms.push({
                            sprite: this.defaults.platform.middle,
                            x: this.x + this.doors[i].x * this.defaults.tileSize + sx * ii + sx/2,
                            y: py
                        })
                    }
                    this.structure.platforms.push({
                        sprite: ((sx === 16) ? this.defaults.platform.right : this.defaults.platform.left),
                        x: this.x + this.doors[i].x * 16 + sx * 3 + sx/2 - 1,
                        y: py
                    })
                    
                }*/
                if (this.doors[i].side === "left") {
                    this.structure.doors.push(this.doors[i].getConfig())
                }
            }
        }
        
        
    }

}