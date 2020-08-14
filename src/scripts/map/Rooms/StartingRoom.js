import Room from './Room'

export default class StartingRoom extends Room {

    constructor(room, defaults, objects) {
        super(room, defaults, objects, "Starting Room")
    }
}