import 'phaser'

import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'

const DEFAULT_HEIGHT = window.innerHeight
const DEFAULT_WIDTH = DEFAULT_HEIGHT / 9 * 16


const config = {
  type: Phaser.WEBGL,
  backgroundColor: '#000000',
  width: 1280,
  height: 720,
  pixelArt: true,
  
  scene: [PreloadScene, MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 400 }
    }
  }
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
