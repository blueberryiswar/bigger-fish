import Room from './Room'

export default class TargetRoom extends Room {

    constructor(room, defaults) {
        super(room, defaults, "Target Room")
        this.wallTiles = this.defaults.outerWall
    }
}