import Phaser from "phaser"; 
import { gameConfig } from "./Game";
import Player from "./Player";
import Platforms from "./Platforms";
// 2001-03-27
class GameScene extends Phaser.Scene {
  public player!: Player;
  public platforms!: Platforms;
  public cursors!: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  public hearts!: Phaser.Physics.Arcade.Group;
  public collectedHearts: number = 0;
  public collectedHeartsText!: Phaser.GameObjects.Text;
  public bombs!: Phaser.Physics.Arcade.Group;
  public gameOver: boolean = false;

  constructor() {
    super({ key: "GameScene" });
  }

  preload(this: GameScene) {
    this.load.image("background", "/src/assets/games/addy-adventure/background.png");
    this.load.image("ground", "/src/assets/games/addy-adventure/platform.png");
    this.load.image("heart", "/src/assets/games/addy-adventure/heart.png");
    this.load.image("bomb", "/src/assets/games/addy-adventure/bomb.png");
    this.load.spritesheet("player", 
      "/src/assets/games/addy-adventure/player/player.png",
      { frameWidth: 32, frameHeight: 48 }
    );

  }
  
  create(this: GameScene) {
    this.add.image(0, 0, "background").setOrigin(0, 0).setDisplaySize(this.scale.width, this.scale.height);
    this.cursors = this.input.keyboard?.createCursorKeys() as Phaser.Types.Input.Keyboard.CursorKeys;;
    this.platforms = new Platforms(this, "ground", gameConfig);
    
    this.platforms.createPlatforms();
    this.collectedHeartsText = this.add.text(16, 16, "0 💔", { fontSize: "32px", color: "#fff" });
    // this.hearts = this.physics.add.group({
    //   key: "heart",
    //   repeat: 11,
    //   setXY: { x: 12, y: 0, stepX: 70 }
    // });

    this.bombs = this.physics.add.group();
    const playerX = 592; //  Default = 0
    const playerY = 126 ; // Default gameConfig.height - 100
    this.player = new Player(this, playerX, playerY, "player");

    this.physics.add.collider(this.player, this.platforms);

    this.handleAnimation();
  
    this.physics.add.collider(this.bombs, this.platforms);
    this.physics.add.collider(this.player, this.bombs, this.hitBomb as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this);

    // this.hearts.children.iterate((child) => {
    //   if (child instanceof Phaser.Physics.Arcade.Sprite) {
    //     child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    //   }
    //   return null;
    // });

    // this.physics.add.collider(this.hearts, this.platforms);
    this.physics.add.overlap(this.player, this.hearts, this.collectHeart as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this);

  }
  
  update(this: GameScene) {
    if (!this.cursors) return;
    this.player.update(this.cursors);
  }
  
  collectHeart(player: Phaser.Physics.Arcade.Sprite, heart: Phaser.Physics.Arcade.Sprite) {
    heart.disableBody(true, true); // Hide the heart
    this.collectedHearts += 1;
    this.collectedHeartsText.setText(`${this.collectedHearts} 💓`);

    if(this.hearts.countActive(true) === 0) {
      this.hearts.children.iterate((child) => {
        if (child instanceof Phaser.Physics.Arcade.Sprite) {
          child.enableBody(true, child.x, 0, true, true);
        }
        return null;
      });
    
      
      const x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
      const bomb = this.bombs.create(x, 16, "bomb");
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
  }

  hitBomb(player: Phaser.Physics.Arcade.Sprite, bomb: Phaser.Physics.Arcade.Sprite) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play("turn");

    this.gameOver = true;
  }

  handleAnimation()
  {
    this.player.handleAnimation();
  }
}


export default GameScene;