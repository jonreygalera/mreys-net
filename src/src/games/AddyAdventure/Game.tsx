import { useEffect, useRef } from "react";
import Phaser from "phaser";
import GameScene from "./GameScene";
import TitleScene from "./TitleScene";
import IGameConfig from "../../interface/IGameConfig";

const MIN_WIDTH = 1280;
const MIN_HEIGHT = 720;

export const gameConfig: IGameConfig = {
  width: MIN_WIDTH,
  height: 800,
};

const gravity = 500;

const Game = () => {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < MIN_WIDTH || window.innerHeight < MIN_HEIGHT) {
      alert(`Screen too small! Please use at least ${MIN_WIDTH}x${MIN_HEIGHT}`);
      return;
    }

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: gameConfig.width,
      height: gameConfig.height,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: gravity, x: 0 },
          debug: true,
        },
      },
      scene: [GameScene, TitleScene],
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
    <div className="flex items-center justify-center h-screen w-screen bg-gray-900">
      {window.innerWidth < MIN_WIDTH || window.innerHeight < MIN_HEIGHT ? (
        <div className="text-center text-red-500 p-4 text-lg">
          Screen too small! Please use at least {MIN_WIDTH}x{MIN_HEIGHT}.
        </div>
      ) : (
        <div
          ref={gameRef}
          style={{ width: gameConfig.width, height: gameConfig.height }}
        ></div>
      )}
    </div>
  );
};

export default Game;
