import IGameConfig from "../../interface/IGameConfig";

export default class StaticGameObject extends Phaser.Physics.Arcade.Sprite {
  
  public positionText!: Phaser.GameObjects.Text;
  public textureName: string;
  public gameConfig: IGameConfig;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, gameConfig: IGameConfig) {
    super(scene, x, y, texture);
    this.textureName = texture;
    scene.add.existing(this);
    scene.physics.add.staticGroup().add(this);
    this.gameConfig = gameConfig;
    this.showPosition();
  }

  showPosition()
  {
    const { debug }  = this.gameConfig.debugger;
    if(debug) {
      this.positionText = this.scene.add.text(0, 200, "X: 0, Y: 0", {
        fontSize: "11px",
        color: "#ffffff",
        backgroundColor: "#000000",
      });
    }
  }
}
