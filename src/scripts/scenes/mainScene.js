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
      roomSize: {x: 16, y: 8},
      defaultBackgroundTile: 27,
      backgroundTileFrom: 0,
      backgroundTileTo: 59,
      innerWall: {
        leftTop: 119,
        rightTop: 120,
        leftBottom: 122,
        rightBottom: 121,
        left: 115,
        top: 111,
        bottom: 113,
        right: 117
      },

 outerWall: {
        leftTop: 91,
        rightTop: 92,
        leftBottom: 94,
        rightBottom: 93,
        left: 83,
        top: 95,
        bottom: 103,
        right: 101
      },

 platForm: {
        left: 77,
        middle: 68,
        right: 80
      }
    }

    this.structure = new Structure(8, 6, defaults, this);
    
    this.zoomState = 0
    this.interruptZoom = false
    this.structure.drawMap();
  
    
    this.player = new Player(this, this.structure.startingRoom.x + 90, this.structure.startingRoom.y + 90)
    this.physics.add.collider(this.player, this.structure.walls)
    this.physics.add.collider(this.player, this.structure.doorGroup, this.handleCollision)
    this.setUpCamera();
   
  }

  handleCollision(active, target) {
    target.openDoor()
  }

  setUpCamera() {
		this.cameras.main.startFollow(this.player, true, 0.2, 0.2, 0, 50);
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
    this.player.update(time, delta)
    if (this.controls.showDebug.isDown) {
      console.log(`${this.interruptZoom} ${this.zoomState}`)
      this.setZoom()
  } else {
      this.interruptZoom = false
  }
  }
}
