export default class Door extends Phaser.Physics.Arcade.Sprite {
	constructor (scene, x, y) {
        super(scene, x, y, 'door', 0)
        this.setZ(20)
        this.scene.physics.world.add(this)
        this.scene.add.existing(this)
        this.closed = true
        
        this.scene.anims.create({
            key: "openDoor",
            frames: this.scene.anims.generateFrameNumbers('door', {
                start: 0,
                end: 4
            }),
            frameRate: 10,
            repeat: 0
        })
        console.log(this)
    }

    openDoor() {
        if(this.closed) {
            this.anims.play("openDoor")
            this.closed = false
            this.once("animationcomplete", () => {
                console.log("open")
                this.body.destroy()
            })
        }
    }
}