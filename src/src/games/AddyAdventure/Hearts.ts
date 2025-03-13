import IGameConfig from "../../interface/IGameConfig";
import { basedScreenSize } from "./Game";

export default class Hearts extends Phaser.Physics.Arcade.StaticGroup {
  public texture: string;
  public gameConfig: IGameConfig;

  constructor(scene: Phaser.Scene, texture:string, gameConfig: IGameConfig) {
    super(scene.physics.world, scene);
    this.texture = texture;
    this.gameConfig = gameConfig;
    scene.add.existing(this);
  }

  createHearts() {
    const gameHeight = this.gameConfig.height;
    const gameWidth = this.gameConfig.width;
    const texture = this.texture;
    
    const refWidth = basedScreenSize.width;
    const refHeight = basedScreenSize.height;
  
    const scaleX = gameWidth / refWidth;
    const scaleY = gameHeight / refHeight;
  
    // Adjusted heart size
    const heartSizeWidth = 20 * scaleX;
    const heartSizeHeight = 0.7 * scaleY;
  
    let staticHearts = [
      { index: 1, x: 384, y: 670 },
      { index: 2, x: 57, y: 570 },
      { index: 3, x: 242, y: 570 },
      { index: 4, x: 442, y: 470 },
      { index: 5, x: 324, y: 370 },
      { index: 6, x: 212, y: 370 },
      { index: 7, x: 120, y: 370 },
      { index: 8, x: 20, y: 370 },
      { index: 9, x: 150, y: 470 },
      { index: 10, x: 445, y: 290 },
      { index: 11, x: 324, y: 290 },
      { index: 12, x: 1075, y: 450 },
      { index: 13, x: 212, y: 290 },
      { index: 14, x: 20, y: 290 },
      { index: 15, x: 550, y: 470 },
      { index: 16, x: 650, y: 470 },
      { index: 17, x: 600, y: 370 },
      { index: 18, x: 610, y: 280 },
      { index: 19, x: 20, y: 170 },
      { index: 20, x: 790, y: 370 },
      { index: 21, x: 212, y: 170 },
      { index: 22, x: 212, y: 40 },
      { index: 23, x: 430, y: 40 },
      { index: 24, x: 255, y: 70 },
      { index: 25, x: 628, y: 160 },
      { index: 26, x: 701, y: 250 },
      { index: 27, x: 718, y: 470 },
      { index: 28, x: 532, y: 670 },
      { index: 29, x: 595, y: 670 },
      { index: 30, x: 760, y: 670 },
      { index: 31, x: 500, y: 560 },
      { index: 32, x: 565, y: 580 },
      { index: 33, x: 625, y: 620 },
      { index: 34, x: 324, y: 220 },
      { index: 35, x: 596, y: 40 },
      { index: 36, x: 500, y: 90 },
      { index: 37, x: 1000, y: 370 },
      { index: 38, x: 790, y: 90 },
      { index: 39, x: 860, y: 90 },
      { index: 40, x: 500, y: 250 },
      { index: 41, x: 979, y: 210 },
      { index: 42, x: 949, y: 310 },
      { index: 43, x: 1002, y: 310 },
      { index: 44, x: 1020, y: 44 },
      { index: 45, x: 870, y: 580 },
      { index: 46, x: 1250, y: 40 },
      { index: 47, x: 1170, y: 40 },
      { index: 48, x: 1250, y: 155 },
      { index: 49, x: 1170, y: 155 },
      { index: 50, x: 924, y: 450 },
    ];

    staticHearts.forEach(({ x, y, index }) => {
      const scaledX = x * scaleX;
      const scaledY = gameHeight - (refHeight - y) * scaleY;
  
      const heartObject = this.create(scaledX, scaledY, texture);
      const { debug, indexOnly }  = this.gameConfig.debugger;
      if (debug) {
        this.scene.add.text(scaledX, scaledY - 20, indexOnly ? `${index}` : `(${scaledX}, ${scaledY}, ${index})`, {
          fontSize: "8px",
          color: "#ffffff",
        }).setOrigin(0).setDepth(1);
      }
  
      heartObject
        .setOrigin(0.5, 0)
        .setScale(heartSizeWidth / heartObject.width, heartSizeHeight)
        .refreshBody();
  
      this.scene.tweens.add({
        targets: heartObject,
        y: scaledY - 5,
        duration: 500,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
      });
    });
  }
}
