import { k } from "../main";
import {
  DirecaoTiro,
  INCLINACAO_JOGADOR,
  VELOCIDADE_JOGADOR,
} from "../recursos/configuracoes-constantes";
import { criarExplosaoParticulas } from "./particula";
import { criarProjetil } from "./projetil";

export function criarNave() {
  const nave = k.add([
    k.sprite("nave", { width: 90 }),
    k.rotate(),
    k.pos(k.center().x, k.height() - 50),
    k.anchor("center"),
    k.timer(),
    k.area({
      shape: new k.Rect(k.vec2(0, 0), 50, 55),
    }),
    "jogador",
  ]);

  const motor = nave.add([
    k.sprite("motor", { width: 80 }),
    k.pos(0, 10),
    k.anchor("center"),
  ]);

  motor.add([
    k.sprite("motor-ligado", {
      width: 80,
      anim: "run",
    }),
    k.anchor("center"),
    k.pos(0, 5),
  ]);

  nave.onUpdate(() => {
    nave.angle = k.lerp(nave.angle, 0, 0.09);
  });

  nave.onKeyDown((tecla) => {
    if (tecla === "left") {
      nave.angle = k.lerp(nave.angle, -INCLINACAO_JOGADOR, 0.1);
      if (nave.pos.x > nave.width / 2) {
        nave.move(k.vec2(-VELOCIDADE_JOGADOR, 0));
      }
    }

    if (tecla === "right") {
      nave.angle = k.lerp(nave.angle, INCLINACAO_JOGADOR, 0.1);
      if (nave.pos.x < k.width() - nave.width / 2) {
        nave.move(k.vec2(VELOCIDADE_JOGADOR, 0));
      }
    }
  });

  nave.onKeyPress((tecla) => {
    if (tecla === "up") {
      k.play("projetil", {
        volume: 0.3,
      });

      const projetil = criarProjetil(
        k.vec2(nave.pos.x, nave.pos.y - nave.height / 2 + 5),
        DirecaoTiro.CIMA
      );
      projetil.tag("projetil-jogador");
    }
  });

  nave.onCollide("projetil-inimigo", (projetil) => {
    nave.destroy();
    projetil.destroy();
    k.play("explosao", {
      volume: 0.1,
    });

    criarExplosaoParticulas(nave, "#FFFFFF");

    // k.destroyAll("projetil-jogador");
  });

  return nave;
}
