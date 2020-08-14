import 'phaser'

import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'

const DEFAULT_HEIGHT = window.innerHeight
const DEFAULT_WIDTH = DEFAULT_HEIGHT / 9 * 16


const config = {
  type: Phaser.WEBGL,
  backgroundColor: '#ffffff',
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
  pixelArt: true,
  roundPixels: true,
  scene: [PreloadScene, MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 400 }
    }
  },
  fps: {
    target: 60,
    min: 30,
    forceSetTimeout: true
  }
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
