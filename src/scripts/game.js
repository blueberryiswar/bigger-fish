import 'phaser'
import '@babel/polyfill'

import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'

const DEFAULT_HEIGHT = window.innerHeight
const DEFAULT_WIDTH = DEFAULT_HEIGHT / 9 * 16


const config = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  pixelArt: true,
  roudPixels: true,
  scene: [PreloadScene, MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 400 }
    }
  }
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
