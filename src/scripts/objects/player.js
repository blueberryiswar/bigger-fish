import Phaser from 'phaser'

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'backgroundSpriteSheet', 3)
        this.setZ(40)
        this.scene.add.existing(this);
    }


}