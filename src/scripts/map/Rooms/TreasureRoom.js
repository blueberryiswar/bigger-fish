import Room from './Room'

export default class TreasureRoom extends Room {

    constructor(room, defaults) {
        super(room, defaults, `Treasure Room ${room.y} ${room.x}`)
        this.wallTiles = this.defaults.outerWall
    }
}