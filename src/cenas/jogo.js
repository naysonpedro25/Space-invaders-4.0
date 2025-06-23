import { fimJogo } from "../elementos/fim-jogo";
import { criarGrade } from "../elementos/grade-inimigos";
import { criarNave } from "../elementos/nave";
import { k } from "../main";
// import { Dificuldade } from "../recursos/configuracoes-constantes";

export function iniciarJogo(dificuldade, dificuldadeString) {
  k.scene("jogo", () => {
    let nivel = 1;
    let pontos = 0;
    let pontuacaoMaxima = k.getData("pontuacaoMaxima");

    const dificuldadeTexto = k.add([
      k.text("Dificuldade: " + dificuldadeString, {
        font: "pixelFont",
        size: 15,
      }),
      k.pos(20, 20),
    ]);
    const pontosTexto = k.add([
      k.text("Pontos: 0", {
        font: "pixelFont",
        size: 15,
      }),
      k.pos(20, 50),
    ]);

    const nivelTexo = k.add([
      k.text("Nivel: 1", {
        font: "pixelFont",
        size: 15,
      }),
      k.anchor("center"),
      k.pos(k.center().x, 20 + 5),
    ]);

    const pontuacaoMaximaTexto = k.add([
      k.text("Pontuação máxima: " + pontuacaoMaxima, {
        font: "pixelFont",
        size: 15,
        width: 350,
      }),
      k.anchor("right"),
      k.pos(k.width(), 20),
    ]);

    const nave = criarNave();
    let grade = criarGrade(dificuldade);

    k.onUpdate(() => {
      if (grade.inimigos.length === 0) {
        k.play("proximo-nivel", {
          volume: 0.1,
        });
        grade = criarGrade(dificuldade);
        nivel += 1;
        nivelTexo.text = "Nível: " + nivel;
      }
    });

    nave.onDestroy(() => {
      fimJogo();
    });

    k.onCollide("projetil-jogador", "inimigo", () => {
      if (nave.exists()) {
        pontos += 10;
        pontosTexto.text = "Pontos: " + pontos;
        pontuacaoMaxima = Math.max(pontuacaoMaxima, pontos);
        pontuacaoMaximaTexto.text = "Pontuacao Máxima: " + pontuacaoMaxima;

        k.setData("pontuacaoMaxima", pontuacaoMaxima);
      }
    });
  });

  k.go("jogo");
}
