import { k } from "../main";
import { QUANTIDADE_PARTICULAS } from "../recursos/configuracoes-constantes";
function criarParticula(pos, cor) {
  const particulas = k.add([
    k.circle(3),
    k.pos(pos),
    k.move(k.vec2(Math.random() - 0.5, Math.random() - 0.5), 100),
    k.opacity(1),
    k.animate(),
    k.color(cor),
    "particula",
  ]);
  return particulas;
}

export function criarExplosaoParticulas(objeto, cor) {
  for (let index = 0; index < QUANTIDADE_PARTICULAS; index++) {
    const particula = criarParticula(objeto.pos, cor);
    // particula.onUpdate(() => {
    //   particula.opacity -= 0.03;
    //   if (particula.opacity <= 0) {
    //     particula.destroy();
    //   }
    // });
    particula.use(
      k.lifespan(0.2, {
        fade: 0.5,
      })
    );
  }
}
