import {
  Black,
  CanvasDriver,
  Input,
  Sprite,
  GameObject,
  StageScaleMode,
  StageOrientation,
  AssetManager,
  Graphics,
} from 'black-engine'
import cascade from 'res/cascade.png'

class Game extends GameObject {
  constructor() {
    super()

    Black.stage.scaleMode = StageScaleMode.CONTAIN
    Black.stage.setSize(750, 1500)
    Black.stage.orientation = StageOrientation.PORTRAIT
  }

  onAdded() {
    const { default: assetManager } = AssetManager
    assetManager.enqueueImage('cascade', cascade)
    assetManager.loadQueue()

    assetManager.on('complete', () => {
      const { centerX, centerY } = this.stage
      const logo = new Sprite('cascade')
      logo.alignAnchor()
      logo.x = centerX
      logo.y = centerY
      logo.scale = 0.2
      this.addChild(logo)
    })
  }

  onUpdate() {
    if (this.border) return
    const { width, height } = this.stage
    const border = new Graphics()
    this.border = border
    border.beginPath()
    border.lineStyle(10, 0xf9b626)
    border.rect(0, 0, width, height)
    border.stroke()
    this.add(border)
  }
}

const black = new Black('game-container', Game, CanvasDriver, [Input])
black.start()
black.pauseOnBlur = false
black.pauseOnHide = false
