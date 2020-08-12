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
    this.fpsText = new FpsText(this)
    this.controls = new Controls(this)
    

    console.log(this)
    

    this.structure = new Structure(10, 8);
    this.zoomState = 0
    this.interruptZoom = false
    const map = this.structure.map

 
    for(let y = 0; y < map.length; y++) {
      for(let x = 0; x < map[y].length; x++) {
        if(map[y][x] !== undefined) {
          for(let posY = 0; posY < map[y][x].roomLayout.length; posY++) {
            for(let posX = 0; posX < map[y][x].roomLayout[posY].length; posX++) {
              let sx = 8 + map[y][x].x + posX * 16;
              let sy = 8 + map[y][x].y + posY * 16;
              this.add.sprite(sx, sy, "backgroundSpriteSheet", map[y][x].roomLayout[posY][posX])
              //console.log(sx,sy, "backgroundSpriteSheet", map[y][x].roomLayout[posY][posX])
            }
          }
        }
      }
    }
    this.player = new Player(this, this.structure.startingRoom.x + 90, this.structure.startingRoom.y + 90)
    this.setUpCamera();
   
  }

  setUpCamera() {
		this.cameras.main.startFollow(this.player, true, 0.2, 0.2);
		this.cameras.main.setDeadzone(20, 20);
		this.cameras.main.setBounds(0, 0, this.structure.map.width, this.structure.map.height);
		this.cameras.main.setZoom(3);
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
    this.fpsText.update()

    const speed = 20 * delta / 100

    if(this.controls.left()) this.player.setX(this.player.x - speed)
    if(this.controls.up()) this.player.setY(this.player.y - speed)
    if(this.controls.right()) {
      this.player.setX(this.player.x + speed)
      console.log(delta)
    }
    if(this.controls.down()) this.player.setY(this.player.y + speed)
    if(this.controls.showDebug.isDown) {
      console.log(`${this.interruptZoom} ${this.zoomState}`)
      this.setZoom()
      
    } else {
      this.interruptZoom = false
    }
  }
}
