import Room from './Room'

export default class StartingRoom extends Room {

    constructor(x, y, width, height, defaults) {
        super(x, y, width, height, defaults, "Starting Room")
    }
}