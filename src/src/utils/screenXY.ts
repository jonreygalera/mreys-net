export function screenXY(
  gameWidth: number,
  gameHeight: number,
  x: number,
  y: number,
  baseWidth = 1280,
  baseHeight = 720,
) {
  const scaleX = gameWidth / baseWidth;
  const scaleY = gameHeight / baseHeight;

  return {
    x: x * scaleX,
    y: gameHeight - (baseHeight - y) * scaleY,
    scaleX,
    scaleY,
  };
}
