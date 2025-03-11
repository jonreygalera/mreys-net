export default class Player extends Phaser.Physics.Arcade.Sprite {
  
  private positionText!: Phaser.GameObjects.Text;
  private debug = true;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.create();
  }

  create()
  {
    this.setBounce(0.2);
    this.setCollideWorldBounds(true);

    if (this?.body) {
      (this.body as Phaser.Physics.Arcade.Body).setGravityY(300);
    }
    
    this.showPosition();
  }

  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    if(this.debug) {
      this.positionText.setText(`Player X: ${Math.round(this.x)}, Y: ${Math.round(this.y)}`);
    }

    if (!cursors) return;
    const { left, right, space,  } = cursors;
    if (left.isDown) {
      this.setVelocityX(-160);
      this.anims.play("left", true);
      } else if (right.isDown) {
        this.setVelocityX(160);
        this.anims.play("right", true);
      } else {
        this.setVelocityX(0);
        this.anims.play("turn");
      }

      if (space.isDown && this?.body?.touching.down) { 
        this.setVelocityY(-400);
      }
  }

  handleAnimation()
  {
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
  }

  showPosition()
  {
    if(this.debug) {
      this.positionText = this.scene.add.text(0, 200, "X: 0, Y: 0", {
        fontSize: "16px",
        color: "#ffffff",
        backgroundColor: "#000000",
      });
    }
  }
}
