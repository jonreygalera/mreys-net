import IGameConfig from "../../interface/IGameConfig";
import { basedScreenSize } from "./Game";

export default class Platforms extends Phaser.Physics.Arcade.StaticGroup {
  public texture: string;
  public gameConfig: IGameConfig;

  constructor(scene: Phaser.Scene, texture:string, gameConfig: IGameConfig) {
    super(scene.physics.world, scene);
    this.texture = texture;
    this.gameConfig = gameConfig;
    scene.add.existing(this);
  }

  createPlatforms()
  {
      const gameHeight = this.gameConfig.height;
      const gameWidth = this.gameConfig.width;
      const texture = this.texture;
  
      const baseWidth = basedScreenSize.width;
      const baseHeight = basedScreenSize.height;
      
      const scaleX = gameWidth / baseWidth;
      const scaleY = gameHeight / baseHeight;
      
      this.create(gameWidth / 2, gameHeight - 20 * scaleY, texture)
        .setOrigin(0.5, 0)
        .setScale(gameWidth, 1)
        .refreshBody();
  
      const staticPlatforms = [
        { index: 0, x: 0, y: 600, width: 250, height: 1 },
        { index: 1, x: 450, y: 500, width: 550, height: 1 },
        { index: 2, x: 1000, y: 476, width: 200, height: 7 },
        { index: 3, x: 10, y: 400, width: 550, height: 1 },
        { index: 4, x: 700, y: 276, width: 5, height: 7 },
        { index: 5, x: 500, y: 276, width: 50, height: 7 },
        { index: 6, x: 445, y: 320, width: 60, height: 1 },
        { index: 7, x: 600, y: 400, width: 60, height: 1 },
        { index: 8, x: 610, y: 300, width: 60, height: 1 },
        { index: 9, x: 628, y: 180, width: 20, height: 0.25 },
        { index: 10, x: 595, y: 153, width: 5, height: 3 },
        { index: 11, x: 0, y: 190, width: 550, height: 2.5 },
        { index: 12, x: 595, y: 108, width: 5, height: 1 },
        { index: 13, x: 600, y: 137, width: 5, height: 0.1 },
        { index: 14, x: 350, y: 108, width: 300 , height: 0.3 },
        { index: 15, x: 828, y: 120, width: 120, height: 0.25 },
        { index: 16, x: 828, y: 128, width: 10, height: 5 },
        { index: 17, x: 928, y: 179, width: 10, height: 5 },
        { index: 18, x: 1270, y: 179, width: 510, height: 5 },
        { index: 19, x: 978, y: 331, width: 91, height: 0.25 },
        { index: 20, x: 978, y: 231, width: 10, height: 0.25 },
        { index: 21, x: 475, y: 530, width: 5, height: 5.5 },
        { index: 22, x: 565, y: 610, width: 30, height: 3 },
        { index: 23, x: 630, y: 650, width: 30, height: 1.8 },
        { index: 24, x: 1150, y: 149, width: 10, height: 1 },
        { index: 25, x: 1220, y: 80, width: 150, height: 0.5 },
        { index: 26, x: 270, y: 110, width: 10, height: 2.5 },
        { index: 27, x: 0, y: 319, width: 550, height: 1 },
        { index: 28, x: 1095, y: 390, width: 10, height: 3 },
        { index: 29, x: 800, y: 400, width: 75, height: 0.2 },
        { index: 30, x: 870, y: 600, width: 75, height: 0.2 },
        { index: 4, x: 705, y: 350, width: 7, height: 0.2 },

      ];
      
      staticPlatforms.forEach(({ x, y, width, height, index }) => {
        x *= scaleX;
        y = gameHeight - (baseHeight - y) * scaleY;
        width *= scaleX;
        height *= scaleY;
  
        const platform = this.create(x, y, texture);
        const { debug, indexOnly }  = this.gameConfig.debugger;

        if(debug) {
          this.scene.add.text(x, y - 20, indexOnly ? `${index}` : `(${x}, ${y}, ${index})`, {
            fontSize: "8px",
            color: "#ffffff",
          }).setOrigin(0)
          .setDepth(1);
        }
        platform.setOrigin(0.5, 0).setScale(width / platform.width, height).refreshBody();
      });
  }
  
}
