import IGameConfig from "../../interface/IGameConfig";

export default class Platforms extends Phaser.Physics.Arcade.StaticGroup {
  public texture: string;
  public gameConfig: IGameConfig;
  private debug = true;

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

    this.create(gameWidth / 2, gameHeight - 20, texture)
      .setOrigin(0.5, 0)
      .setScale(gameWidth, 1)
      .refreshBody();

    const staticPlatforms = [
      { index: 0, x: 0, y: gameHeight - 120, width: 250, height: 1 },
      { index: 1, x: 450, y: gameHeight - 220, width: 550, height: 1 },
      { index: 2, x: 500 * 2, y: gameHeight - 244, width: 200, height: 7 },
      { index: 3, x: 0, y: gameHeight - 320, width: 550, height: 1 },
      { index: 4, x: 700, y: gameHeight - 444, width: 5, height: 7 },
      { index: 5, x: 500, y: gameHeight - 444, width: 50, height: 7 },
      { index: 6, x: 445, y: gameHeight - 400, width: 60, height: 1 },
      { index: 7, x: 600, y: gameHeight - 320, width: 60, height: 1 },
      { index: 8, x: 610, y: gameHeight - 420, width: 60, height: 1 },
      { index: 9, x: 628, y: gameHeight - 540, width: 20, height: 0.25 },
      { index: 10, x: 595, y: gameHeight - 567, width: 5, height: 3 },
      { index: 11, x: 0, y: gameHeight - 530, width: 550, height: 5 },
      { index: 12, x: 595, y: gameHeight - 650, width: 5, height: 1 },
      { index: 13, x: 600, y: gameHeight - 620, width: 5, height: 0.1 },
      { index: 14, x: 264, y: gameHeight - 650, width: 300 , height: 0.3 },
      { index: 15, x: 828, y: gameHeight - 600, width: 120, height: 0.25 },
      { index: 16, x: 828, y: gameHeight - 591, width: 10, height: 5 },
      { index: 17, x: 928, y: gameHeight - 540, width: 10, height: 5 },
      { index: 18, x: gameWidth, y: gameHeight - 540, width: 510, height: 5 },
      { index: 19, x: 978, y: gameHeight - 389, width: 91, height: 0.25 },
      { index: 20, x: 978, y: gameHeight - 489, width: 10, height: 0.25 },
      { index: 21, x: 500, y: gameHeight - 138, width: 30, height: 3 },
      { index: 22, x: 565, y: gameHeight - 120, width: 30, height: 3 },
      { index: 23, x: 625, y: gameHeight - 80, width: 30, height: 1.8 },
    ];

    staticPlatforms.forEach(({ x, y, width, height, index }) => {
      const platform = this.create(x, y, texture);
      if(this.debug) {
        this.scene.add.text(x, y - 20, `(${x}, ${y}, ${index})`, {
          fontSize: "14px",
          color: "#ffffff",
        }).setOrigin(0)
        .setDepth(1);
      }
      platform.setOrigin(0.5, 0).setScale(width / platform.width, height).refreshBody();
    });
  }
}
