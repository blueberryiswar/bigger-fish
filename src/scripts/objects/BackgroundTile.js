import Phaser from 'phaser'

export default class BackgroundTile extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, tileSet, sprite) {
        super(scene, x, y, tileSet, sprite)
        this.scene.add.existing(this);
    }


}