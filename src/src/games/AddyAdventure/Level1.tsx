import Phaser from "phaser"; 
import { gameSize } from "./Game";

class Level1 extends Phaser.Scene {
  public player!: Phaser.Physics.Arcade.Sprite;
  public platforms!: Phaser.Physics.Arcade.StaticGroup;
  public cursors!: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  public hearts!: Phaser.Physics.Arcade.Group;
  public collectedHearts: number = 0;
  public collectedHeartsText!: Phaser.GameObjects.Text;
  public bombs!: Phaser.Physics.Arcade.Group;
  public gameOver: boolean = false;

  constructor() {
    super("Level1");
  }

  preload(this: Level1) {
    this.load.image("background", "/src/assets/games/addy-adventure/background.png");
    this.load.image("ground", "/src/assets/games/addy-adventure/platform.png");
    this.load.image("heart", "/src/assets/games/addy-adventure/heart.png");
    this.load.image("bomb", "/src/assets/games/addy-adventure/bomb.png");
    // this.load.spritesheet("player", "/src/assets/games/addy-adventure/player/player.png", {
    //   frameWidth: 128,
    //   frameHeight: 128,
    // });
    this.load.spritesheet("player", 
      "/src/assets/games/addy-adventure/player/player.png",
      { frameWidth: 32, frameHeight: 48 }
    );

  }
  
  create(this: Level1) {
    this.add.image(0, 0, "background").setOrigin(0, 0).setDisplaySize(this.scale.width, this.scale.height);
    this.cursors = this.input.keyboard?.createCursorKeys();
    this.platforms = this.physics.add.staticGroup();
    
    // Platforms
    this.platforms.create(0, gameSize.height - 20, "ground").setOrigin(0, 0).setScale(2).refreshBody();
    this.platforms.create(110, gameSize.height - 100, "ground");
    this.platforms.create(550, gameSize.height - 200, "ground").refreshBody();

    this.collectedHeartsText = this.add.text(16, 16, "0 💔", { fontSize: "32px", color: "#000" });

    this.hearts = this.physics.add.group({
      key: "heart",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    });

    this.bombs = this.physics.add.group();

    this.player = this.physics.add.sprite(0, gameSize.height - 100, "player");

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    
    if (this.player?.body) {
      (this.player.body as Phaser.Physics.Arcade.Body).setGravityY(300);
    }
    

    this.physics.add.collider(this.player, this.platforms);

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "turn",
      frames: [ { key: "player", frame: 4 } ],
      frameRate: 20
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

  
    this.physics.add.collider(this.bombs, this.platforms);
    this.physics.add.collider(this.player, this.bombs, this.hitBomb, undefined, this);

    this.hearts.children.iterate((child) => {
      if (child instanceof Phaser.Physics.Arcade.Sprite) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      }
      return null;
    });
    
    


    this.physics.add.collider(this.hearts, this.platforms);
    this.physics.add.overlap(this.player, this.hearts, this.collectHeart, undefined, this);

  }
  
  update(this: Level1) {
    if (!this.cursors) return;
    const { left, right, space } = this.cursors;
    const player = this.player;
  
    if (left.isDown) {
      player.setVelocityX(-160);
      player.anims.play("left", true);
    } else if (right.isDown) {
      player.setVelocityX(160);
      player.anims.play("right", true);
    } else {
      player.setVelocityX(0);
      player.anims.play("turn");
    }
  
    if (space.isDown && player?.body?.touching.down) { 
      player.setVelocityY(-400);
    }
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
  
}

export default Level1;