import Phaser from "phaser"; 

class TitleScene extends Phaser.Scene {

  constructor() {
    super({ key: "TitleScene" });
  }

  preloadSounds() {
    this.load.audio("bgm", "/assets/sounds/suspense-music.wav");
  }

  preloadImages() {
    this.load.image("background", "/assets/addy-adventure/background.png");
  }

  preload(this: TitleScene) {
    this.preloadImages();
    this.preloadSounds();
  }
  
  create(this: TitleScene) {
    const backgroundMusic = this.sound.add("bgm", { loop: true, volume: 0.2 });
    backgroundMusic.play();
    this.add.image(0, 0, "background").setOrigin(0, 0).setDisplaySize(this.scale.width, this.scale.height);

    this.add.text(this.scale.width / 2, this.scale.height / 3, "Addy.chan", {
      fontSize: "48px",
      color: "#ffffff",
    }).setOrigin(0.5);

    const startText = this.add.text(this.scale.width / 2, this.scale.height / 2, "Click to Start", {
      fontSize: "32px",
      color: "#ffff00",
    }).setOrigin(0.5);

    startText.setInteractive();

    startText.on("pointerdown", () => {
      this.scene.start("GameScene");
    })
  }

}

export default TitleScene;