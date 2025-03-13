import { useEffect, useRef } from "react";
import Phaser from "phaser";
import GameScene from "./GameScene";
import TitleScene from "./TitleScene";
import IGameConfig from "../../interface/IGameConfig";

export const basedScreenSize = {
  width: 1280,
  height: 720
}

export const gameConfig: IGameConfig = {
  width: innerWidth,
  height: innerHeight,
  debugger: { debug: false, indexOnly: true}
};

const gravity = 500;

const Game = () => {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: gameConfig.width,
      height: gameConfig.height,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: gravity, x: 0 },
          debug: gameConfig.debugger?.debug,
        },
      },
      scene: [
        TitleScene, 
        GameScene
      ],
      parent: gameRef.current || undefined,
    };

    const game = new Phaser.Game(config);

    const handleResize = () => {
      game.scale.resize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      game.destroy(true);
    };
  }, []);

  return (
    <div
      ref={gameRef}
      style={{ width: gameConfig.width, height: gameConfig.height }}
    ></div>
  )
};

export default Game;
