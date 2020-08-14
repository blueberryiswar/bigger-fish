import Door from '../objects/Door'

export default class InteractableObjects extends Phaser.Physics.Arcade.StaticGroup {
    constructor(world, scene) {
        super(world, scene)
        this.scene = scene
    }

    createDoor(door) {
        console.log(door)
        let obj = null
        switch(door.type) {
            case 'regular':
                obj = new Door(this.scene, door.x, door.y)
                console.log(obj)
                break
            default:
                return false
        }
        this.add(obj)
        return true
    }
}