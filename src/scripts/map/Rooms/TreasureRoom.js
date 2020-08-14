import Room from './Room'

export default class TreasureRoom extends Room {

    constructor(room, defaults, objects) {
        super(room, defaults, objects, `Treasure Room ${room.y} ${room.x}`)
        this.wallTiles = this.defaults.outerWall
    }
}