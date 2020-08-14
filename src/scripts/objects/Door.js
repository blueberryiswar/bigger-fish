export default class Door extends Phaser.Physics.Arcade.Sprite {
	constructor (scene, x, y) {
        super(scene, x, y, 'door', 1)
        this.setZ(20)
        console.log(this)
    }
}