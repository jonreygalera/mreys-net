import IGameConfig from "../../interface/IGameConfig";
import Character from "./Character";
import { basedScreenSize } from "./Game";

export default class Player extends Character {

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, gameConfig: IGameConfig) {
    super(scene, x, y, texture, gameConfig);
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
      alert('yes');
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
