import Phaser from 'phaser'

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'blob', 0)
        this.setZ(40)
        // enable physics
        this.scene.physics.world.enable(this);
        this.speed = 100
        this.jump = 250
        this.body.setSize(14, 18);
        this.body.setOffset(0, 6);
        this.facing = "right"

        this.setBounce(0.2, 0.1)

        this.scene.add.existing(this);
        this.scene.anims.create({
            key: "float",
            frames: this.scene.anims.generateFrameNumbers('blob', {
                start: 0,
                end: 6
            }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.play("float")

    }

    update(time, delta) {
        if (this.scene.controls.left()) {
            this.setVelocityX(this.speed * -1)
            if(this.facing !== "left") {
                this.setFlipX(true)
                this.facing = "left"
            }
        } else if (this.scene.controls.right()) {
            this.setVelocityX(this.speed);
            if(this.facing !== "right") {
                this.setFlipX(false)
                this.facing = "right"
            }
        } else if (this.body.touching.down) {
            this.setVelocityX(0);
        }

        if (this.scene.controls.up() && this.body.touching.down) {
            this.setVelocityY(this.jump * -1);
        }
    }


}