import Phaser from 'phaser'

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'blob', 0)
        this.setZ(40)
        this.scene.add.existing(this);
        this.scene.anims.create({
            key: "float",
            frames: this.scene.anims.generateFrameNumbers('blob', { start: 0, end: 6}),
            frameRate: 10,
            repeat: -1
        })
        this.anims.play("float")
    }


}