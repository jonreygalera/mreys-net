import { useEffect, useRef } from "react";
import Phaser from "phaser";
import Level1 from "./Level1";

export const gameSize = {
  width: window.innerWidth,
  height: window.innerHeight
}

const gravity = 500

const Game = () => {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: gameSize.width,
      height: gameSize.height,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: gravity },
          debug: true,
        },
      },
      scene: [Level1],
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

  return <div ref={gameRef} className="w-full h-[600px]"></div>;
};

export default Game;
