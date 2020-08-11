import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'
import Structure from '../map/structure'

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

    this.add.sprite(0, 0, "backgroundSpriteSheet", 0)

    let structure = new Structure(10, 8);
    let map = structure.map;
 
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
   
  }

  update() {
    this.fpsText.update()
  }
}
