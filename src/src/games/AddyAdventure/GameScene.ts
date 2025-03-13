import Phaser from "phaser"; 
import { gameConfig } from "./Game";
import Player from "./Player";
import Platforms from "./Platforms";
import Bomb from "./Bomb";
import Hearts from "./Hearts";
import Character from "./Character";
import StaticGameObject from "./StaticGameObject";
import { screenXY } from "../../utils/screenXY";
// 2001-03-27
const MIN_SCORE_TO_ACTIVATE_BOMB = 6;
const MAX_HEART = 50;

const LEVEL_CONFIG = [
  {
    score: 1,
    message: "Go Addy.chan! You're doing amazing! 💖✨"
  },
  {
    score: MIN_SCORE_TO_ACTIVATE_BOMB,
    bomb: 3,
    message: "Be careful with the bomb, Addy.chan! Stay safe! 💣💓"
  },
  {
    score: 10,
    bomb: 2,
    message: "Wow! You're so talented, Addy.chan! Keep going! 🥰🔥",
    shield: 1
  },
  {
    score: 15,
    message: "You're on fire, Addy.chan! Nothing can stop you! 🚀💓"
  },
  {
    score: 25,
    bomb: 2,
    message: "You're dodging like a pro! My heart can't take this! 💘"
  },
  {
    score: 30,
    message: "You're my hero, Addy.chan! Show them your power! 💪💖",
    shield: 2
  },
  {
    score: 35,
    bomb: 1,
    message: "You're making this look easy! So proud of you! 😍"
  },
  {
    score: 40,
    bomb: 1,
    message: "Almost there, Addy.chan! Keep dazzling me! 💞",
  },
  {
    score: 45,
    message: "My heart skips a beat watching you play! Keep it up! 💓✨",
    shield: 2
  },
  {
    score: MAX_HEART,
    message: "You've completed the hearts, Addy.chan!"
  }
];


class GameScene extends Phaser.Scene {
  public player!: Player;
  public npc!: Character;
  public gate!: StaticGameObject;
  public platforms!: Platforms;
  public cursors!: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  public hearts!: Hearts;
  public collectedHearts: number = 0;
  public collectedHeartsText!: Phaser.GameObjects.Text;
  public bombs!: Phaser.Physics.Arcade.Group;
  public gameOver: boolean = false;
  public starGame: boolean = false;
  public readonly maxBomb = 10;
  private npcMessageBox?: Phaser.GameObjects.Rectangle;
  private npcMessageText?: Phaser.GameObjects.Text;

  constructor() {
    super({ key: "GameScene" });
  }

  preloadSounds()
  {
    this.load.audio("jump", "/assets/sounds/jump.mp3");
    this.load.audio("heart-collect", "/assets/sounds/collect.wav");
    this.load.audio("explosion", "/assets/sounds/explosion.wav");
    this.load.audio("bgm", "/assets/sounds/suspense-music.wav");
  }

  preloadImages()
  {
    this.load.image("gate", "/assets/addy-adventure/gate.png");
    this.load.image("npc", "/assets/addy-adventure/npc.png");
    this.load.image("shield", "/assets/addy-adventure/cat-face.png");
    this.load.image("background", "/assets/addy-adventure/background.png");
    this.load.image("ground", "/assets/addy-adventure/platform.png");
    this.load.image("heart", "/assets/addy-adventure/heart.png");
    this.load.image("bomb", "/assets/addy-adventure/bomb.png");
    this.load.spritesheet("player", 
      "/assets/addy-adventure/player/player.png",
      { frameWidth: 32, frameHeight: 48 }
    );
  }

  preload(this: GameScene) {
    this.preloadSounds();
    this.preloadImages();
  }
  
  create(this: GameScene) {
    const backgroundMusic = this.sound.add("bgm", { loop: true, volume: 0.2 });
    backgroundMusic.play();
    this.add.image(0, 0, "background").setOrigin(0, 0).setDisplaySize(this.scale.width, this.scale.height);

    this.cursors = this.input.keyboard?.createCursorKeys() as Phaser.Types.Input.Keyboard.CursorKeys;;
    this.platforms = new Platforms(this, "ground", gameConfig);
    this.hearts = new Hearts(this, "heart", gameConfig);
    this.platforms.createPlatforms();
    this.hearts.createHearts();

    this.collectedHeartsText = this.add.text(16, 16, `${this.collectedHearts}💔`, { fontSize: "32px", color: "#fff" });

    const playerX = 0;
    const playerY = gameConfig.height - 100
    this.player = new Player(this, playerX, playerY, "player", gameConfig);
    this.npc = new Character(this, gameConfig.width - 80, gameConfig.height - 65, "npc", gameConfig);

    const { x: gateX, y: gateY } = screenXY(gameConfig.width, gameConfig.height, 1095, 370);

    this.gate = new StaticGameObject(this, gateX, gateY, "gate", gameConfig);
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.npc, this.platforms);
    this.physics.add.overlap(this.player, this.npc, this.npcCollided as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this);
    this.physics.add.collider(this.player, this.gate, this.gateCollided as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this);

    const bombSpeed = Phaser.Math.Between(300, 500);

    this.bombs = this.physics.add.group({
      bounceX: 1,
      bounceY: 1, 
      collideWorldBounds: true,
      velocityX: bombSpeed,
      velocityY: bombSpeed,
      maxSize: this.maxBomb
    });
    this.handleAnimation();
    this.player.createShield("shield", this.bombs);
    this.physics.add.collider(this.bombs, this.platforms);
    this.physics.add.collider(this.player, this.bombs, this.hitBomb as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this);

    this.physics.add.overlap(this.player, this.hearts, this.collectHeart as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback, undefined, this);

    this.showNpcMessage("Hello, Addy.chan 😍!");
  }
  
  update(this: GameScene) {
    if (!this.cursors) return;
    this.player.update(this.cursors);
  }
  
  collectHeart(player: Phaser.Physics.Arcade.Sprite, heart: Phaser.Physics.Arcade.Sprite) {
    this.sound.play("heart-collect");
    heart.disableBody(true, true);
    this.scoreUpdate(1);
    this.rule();
  }

  createBomb(numToAdd: number) {
    for(let num = 1; num <= numToAdd; num++) {
      this.addBomb();
    }
  }

  addBomb() {
    const bombX = Phaser.Math.Between(gameConfig.width - 100, 0);
    const bombY = Phaser.Math.Between(100, gameConfig.height - 100);
    const bomb = new Bomb(this, bombX, bombY, "bomb");
    this.bombs.add(bomb);
  }

  npcCollided(player: Phaser.Physics.Arcade.Sprite, npc: Phaser.Physics.Arcade.Sprite) {
    this.showNpcMessage("Thanks for saving me! It's your day, my hero! 💖✨😍");
  }

  gateCollided(player: Phaser.Physics.Arcade.Sprite, gate: Phaser.Physics.Arcade.Sprite) {
    if(this.collectedHearts === this.hearts.getLength()) {
      gate.disableBody(true, true);
    } else {
      this.showNpcMessage(`Addy.chan, You need ${MAX_HEART} hearts to open the gate.`);
    }
  }

  hitBomb(player: Phaser.Physics.Arcade.Sprite, bomb: Phaser.Physics.Arcade.Sprite) {
    this.sound.play("explosion");
    this.scoreUpdate(-1);
    let targetEnabledHearts  = this.collectedHearts === 0 ? this.hearts.getLength() : this.hearts.getLength() - this.collectedHearts;

    let currentEnabledHearts = this.hearts.countActive(true);
    let heartsToEnable = Math.max(0, targetEnabledHearts - currentEnabledHearts);
    let inactiveHearts = this.hearts.children.getArray().filter((heart) => !heart.active) as Phaser.Physics.Arcade.Sprite[];

    inactiveHearts.slice(0, heartsToEnable).forEach((heart) => {
      heart.setActive(true).setVisible(true);
      heart.enableBody(true, heart.x, heart.y, true, true);
    });

    this.cameras.main.shake(200, 0.01);
    this.player.bombHit();
    bomb.destroy();
  }

  scoreUpdate(score: number = 0)
  {
    if(this.collectedHearts === 0 && score < 0) {
      return;
    }
    this.collectedHearts += score;
    this.collectedHeartsText.setText(`${this.collectedHearts}💓`);
  }

  handleAnimation()
  {
    this.player.handleAnimation();
  }

  showNpcMessage(text: string = '') {
    this.npcMessageBox?.destroy();
    this.npcMessageText?.destroy();

    const textWidth = 200;
    const textHeight = 170;

    const x = gameConfig.width;
    const y = gameConfig.height;

    this.npcMessageBox = this.add.rectangle(
      x - 20, 
      y - 100, 
      textWidth, 
      100, 
      0x000000, 
      0.8
    )
      .setOrigin(1, 1)
      .setDepth(10);

    this.npcMessageText = this.add.text(
      x - textWidth,
      y - textHeight, 
      text, 
      {
        fontSize: "14px",
        color: "#ffffff",
        wordWrap: { width: textWidth - 20 },
      }
    )
      .setOrigin(0, 0)
      .setDepth(11);
  }
  
  rule()
  {
    const rule = LEVEL_CONFIG.find(rule => rule.score == this.collectedHearts);
    if(rule) {
      this.createBomb(rule?.bomb ?? 0);
      this.player.addShield(rule?.shield ?? 0);
      this.showNpcMessage(rule?.message ?? 'Hello');
    } else {
      if((this.collectedHearts >= MIN_SCORE_TO_ACTIVATE_BOMB && this.bombs.countActive(true) === 0)) {
        this.createBomb(5);
      }
    }
  }
}


export default GameScene;