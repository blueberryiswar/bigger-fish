import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'
import Structure from '../map/structure'
import Controls from '../utils/controls'
import Player from '../objects/player.js'

export default class MainScene extends Phaser.Scene {
  fpsText

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    /**
     * Delete all the code below to start a fresh scene
     */
    //snew PhaserLogo(this, this.cameras.main.width / 2, 0)
    //this.fpsText = new FpsText(this)
    this.controls = new Controls(this)
    

    console.log(this)
    

    const defaults = {
      tileSize: 16,
      tileSet: "metal",
      roomSize: {x: 28, y: 16},
      defaultBackgroundTile: 27,
      backgroundTileFrom: 0,
      backgroundTileTo: 59,
      innerWall: {
        leftTop: 97,
        rightTop: 98,
        leftBottom: 99,
        rightBottom: 100,
        left: 101,
        top: 111,
        bottom: 113,
        left: 115,
        right: 117
      }
    }

    this.structure = new Structure(10, 8, defaults, this);
    //this.structure = new Structure(4,4,defaults, this)
    this.zoomState = 0
    this.interruptZoom = false
    this.structure.drawMap();

    
    this.player = new Player(this, this.structure.startingRoom.x + 90, this.structure.startingRoom.y + 90)
    this.setUpCamera();
   
  }

  setUpCamera() {
		this.cameras.main.startFollow(this.player, true, 0.2, 0.2, 0, 40);
		this.cameras.main.setDeadzone(20, 5);
		this.cameras.main.setBounds(0, 0, this.structure.map.width, this.structure.map.height);
		this.cameras.main.setZoom(4);
  }
  
  setZoom() {
    if(this.interruptZoom) return
    this.interruptZoom = true
    switch(this.zoomState) {
      case 0:
        this.cameras.main.setZoom(0.5)
        this.zoomState = 1
        break
      case 1:
        this.cameras.main.setZoom(0.25)
        this.zoomState = 2
        break
      case 2:
        this.cameras.main.setZoom(1)
        this.zoomState = 3
        break
      case 3:
        this.cameras.main.setZoom(3)
        this.zoomState = 0
    }
  }

  update(time, delta) {
   

    const speed = 20 * delta / 100

    if(this.controls.left()) this.player.setX(Phaser.Math.FloorTo(this.player.x - speed))
    if(this.controls.up()) this.player.setY(Phaser.Math.FloorTo(this.player.y - speed))
    if(this.controls.right()) this.player.setX(Phaser.Math.FloorTo(this.player.x + speed))
    if(this.controls.down()) this.player.setY(Phaser.Math.FloorTo(this.player.y + speed))
    if(this.controls.showDebug.isDown) {
      console.log(`${this.interruptZoom} ${this.zoomState}`)
      this.setZoom()
    } else {
      this.interruptZoom = false
    }
  }
}
