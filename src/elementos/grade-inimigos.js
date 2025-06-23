import { k } from "../main";
import {
  DirecaoTiro,
  VELOCIDADE_INIMIGO,
} from "../recursos/configuracoes-constantes";
import { criarInimigo } from "./inimigo";
import { criarExplosaoParticulas } from "./particula";
import { criarProjetil } from "./projetil";

export function criarGrade(dificuldade) {
  const grade = {};
  grade.inimigos = [];

  const linhas = Math.round(k.rand(6) + 1);
  const colunas = Math.round(k.rand(6) + 1);

  for (let linha = 0; linha < linhas; linha++) {
    for (let coluna = 0; coluna < colunas; coluna++) {
      const x = 30 + coluna * 50;
      const y = 100 + linha * 50;
      const inimigo = criarInimigo(k.vec2(x, y));

      grade.inimigos.push(inimigo);
    }
  }

  grade.destruirInimigos = () => {
    grade.inimigos.forEach((inimigo) => {
      if (inimigo.exists()) {
        inimigo.destroy();
      }
    });
  };

  // movimento
  let moverParaDireita = true;

  k.onUpdate(() => {
    const { inimigos } = grade;
    if (inimigos.length === 0) {
      return;
    }

    let xInimigoMaisADireita = 0; // valores iniciais para calcular a pos x do inimigo mais a direita
    let xInimigoMaisADEsquerda = k.width(); // o mesmo de cima só que pra esquerda

    const larguraInimigo = inimigos[0].width;

    inimigos.forEach((inimigo) => {
      if (inimigo.exists()) {
        xInimigoMaisADEsquerda = Math.min(
          inimigo.pos.x,
          xInimigoMaisADEsquerda
        );
        xInimigoMaisADireita = Math.max(inimigo.pos.x, xInimigoMaisADireita);
      }
    });

    if (xInimigoMaisADEsquerda < larguraInimigo / 2) {
      moverParaDireita = true;
    }
    if (xInimigoMaisADireita > k.width() - larguraInimigo / 2) {
      moverParaDireita = false;
    }

    inimigos.forEach((inimigo) => {
      if (inimigo.exists()) {
        if (moverParaDireita) {
          inimigo.move(k.vec2(VELOCIDADE_INIMIGO, 0));
        } else {
          inimigo.move(k.vec2(-VELOCIDADE_INIMIGO, 0));
        }
      }
    });
  });

  grade.inimigos.forEach((inimigo) => {
    inimigo.onCollide("projetil-jogador", (projetil) => {
      if (k.get("jogador").length !== 0) {
        k.play("acerto", {
          volume: 0.1,
        });

        criarExplosaoParticulas(inimigo, "#9927ff");
        inimigo.destroy();
        projetil.destroy();
        grade.inimigos = k.get("inimigo"); // atualiza o array para retirar os inimigos mortos

        //   pontos += 10;
        //   pontosTexto.innerText = pontos;
        //   if (pontos > maiorPontuacao) {
        //     maiorPontuacao = pontos;
        //     localStorage.setItem("maiorPontuacao", maiorPontuacao);
        //     maiorPontuacaoTexto.innerText = maiorPontuacao;
        //   }
      }
    });
  });
  // logica onde um inimigo aleatório atira 1 projetil a cada instate
  function atirarInimigoAleatorio() {
    const naveViva = k.get("jogador").length > 0;
    if (!naveViva) return; // se n estier viva n faz mais

    const inimigos = grade.inimigos;
    if (inimigos.length === 0) return;

    const indexInimigoAleatorio = Math.floor(k.rand(0, inimigos.length));
    const inimigoAleatorio = inimigos[indexInimigoAleatorio];
    if (!inimigoAleatorio) return;

    const projetil = criarProjetil(
      k.vec2(
        inimigoAleatorio.pos.x,
        inimigoAleatorio.pos.y + inimigoAleatorio.height / 2
      ),
      DirecaoTiro.BAIXO
    );

    projetil.tag("projetil-inimigo");
  }

  k.loop(dificuldade, () => {
    atirarInimigoAleatorio();
  });

  return grade;
}
