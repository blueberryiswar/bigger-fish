import Room from './Room'

export default class TargetRoom extends Room {

    constructor(room, defaults, objects) {
        super(room, defaults, objects, "Target Room")
        this.wallTiles = this.defaults.outerWall
    }
}