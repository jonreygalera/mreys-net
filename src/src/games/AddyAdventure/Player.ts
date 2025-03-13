import IGameConfig from "../../interface/IGameConfig";
import Character from "./Character";
import { basedScreenSize } from "./Game";

export default class Player extends Character {
  public shieldTextureName?: string;
  public shieldSkill?: Phaser.Physics.Arcade.Sprite;
  public shieldCollider?: Phaser.Types.Physics.Arcade.ArcadeColliderType;
  public shieldCounter = 5;
  public shieldCounterText?: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, gameConfig: IGameConfig) {
    super(scene, x, y, texture, gameConfig);
  }

  createShield(shieldTextureName: string, shieldCollider: Phaser.Types.Physics.Arcade.ArcadeColliderType)
  {
    this.shieldTextureName = shieldTextureName;
    this.shieldCollider = shieldCollider;

    this.shieldCounterText = this.scene.add.text(150, 16, `${this.shieldCounter}🐈`, { fontSize: "32px", color: "#fff" });
  }

  addShield(numberOfShield: number)
  {
    this.shieldCounter += numberOfShield;
    this.renderShieldText();
  }

  renderShieldText()
  {
    this.shieldCounterText?.setText(`${this.shieldCounter}🐈`);
  }

  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    if(this.gameConfig.debugger.debug) {
      this.positionText.setText(`Player X: ${Math.round(this.x)}, Y: ${Math.round(this.y)}`);
    }
    const speedX = 250;
    const baseHeight = basedScreenSize.height;
    const jumpVelocity = -380 * (this.scene.scale.height / baseHeight); 
    if (!cursors) return;
    const { left, right, space, up  } = cursors;
    if (left.isDown) {
    this.setVelocityX(-speedX);
    this.anims.play("left", true);
    } else if (right.isDown) {
      this.setVelocityX(speedX);
      this.anims.play("right", true);
    } else {
      this.setVelocityX(0);
      this.anims.play("turn");
    }

    if (up.isDown && this?.body?.touching.down) { 
      this.setVelocityY(jumpVelocity);
      this.scene.sound.play("jump");
    }
    if(space.isDown) {
      this.summonSkill();
    }
  }

  handleAnimation()
  {
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers(this.textureName, { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "turn",
      frames: [ { key: this.textureName, frame: 4 } ],
      frameRate: 20
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers(this.textureName, { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
  }

  summonSkill()
  {
    if(!this.shieldTextureName || this.shieldSkill || !this.shieldCollider || this.shieldCounter < 1) return;
    this.shieldCounter--;
    this.renderShieldText();

    this.shieldSkill = this.scene.physics.add.sprite(this.x, this.y, this.shieldTextureName)
      .setOrigin(0.5)
      .setDepth(5)
      .setAlpha(0.5);
      
    this.shieldSkill.setCircle(50);
    if (this.shieldSkill.body instanceof Phaser.Physics.Arcade.Body) {
      this.shieldSkill.body.setAllowGravity(false);
      this.shieldSkill.body.immovable = true;
      this.shieldSkill.body!.setOffset(
        this.shieldSkill.width / 2 - 50, // Adjust X to center
        this.shieldSkill.height / 2 - 50 // Adjust Y to center
      );
    }

    this.scene.physics.add.collider(this.shieldSkill, this.shieldCollider, (_shield, collider) => {
      this.scene.sound.play("explosion");
      collider.destroy();
    });

    this.scene.time.delayedCall(100, () => {
      this.shieldSkill?.destroy();
      this.shieldSkill = undefined;
    });
  }

  knockback()
  {
    const knockbackX = Phaser.Math.Between(-300, 300);
    const knockbackY = -200;
    this.setVelocity(knockbackX, knockbackY);
  }

  hitEffect()
  {
    this.setTint(0xff0000);
    this.scene.time.delayedCall(500, () => this.clearTint(), [], this);
  }

  bombHit()
  {
    this.anims.play("turn");
    this.hitEffect();
    this.knockback();
  }

}
