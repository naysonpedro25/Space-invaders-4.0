import { k } from "../main";

export function carregarArquivos() {
  k.loadRoot("./");
  k.loadSound("projetil", "/sounds/shoot.mp3");
  k.loadSound("acerto", "/sounds/hit.mp3");
  k.loadSound("explosao", "/sounds/explosion.mp3");
  k.loadSound("proximo-nivel", "/sounds/next_level.mp3");
  k.loadSprite("nave", "/sprites/spaceship.png");
  k.loadSprite("motor", "/sprites/engine.png");
  k.loadSprite("inimigo", "/sprites/invader-sprites.png", {
    sliceX: 2,
    anims: {
      run: {
        from: 0,
        to: 1,
        loop: true,
        speed: 5,
      },
    },
  });
  k.loadSprite("motor-ligado", "/sprites/engine-effects.png", {
    sliceX: 4,
    anims: {
      run: {
        from: 0,
        to: 3,
        loop: true,
        speed: 12,
      },
    },
  });

  k.loadFont("pixelFont", "fonts/PressStart2P-Regular.ttf");
}
