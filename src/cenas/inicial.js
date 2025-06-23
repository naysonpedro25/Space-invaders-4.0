import { k } from "../main";
import { Dificuldade } from "../recursos/configuracoes-constantes";
import { iniciarJogo } from "./jogo";

export function iniciarInicio() {
  k.scene("inicio", () => {
    const titulo = k.add([
      k.text("Space Invaders", {
        font: "pixelFont",
        size: 40,
      }),
      k.anchor("center"),
      k.pos(k.center().x, k.center().y - 200),
      k.color("#FFFFFF"),
    ]);

    const subTexto = k.add([
      k.text("Escolha um modo de jogo", {
        font: "pixelFont",
        size: 20,
      }),
      k.anchor("center"),
      k.pos(k.center().x, titulo.pos.y + 80),
      k.color("#FFFFFF"),
    ]);

    const opcoesModos = k.add([k.pos(k.center().x, subTexto.pos.y + 100)]);

    const opcoesTexto = ["Fácil", "Médio", "Difícil"];
    const opcoesChaves = ["FACIL", "MEDIO", "DIFICIL"];

    opcoesTexto.forEach((texto, index) => {
      const opcao = opcoesModos.add([
        k.rect(k.width() / 4, 60, {
          radius: 4,
        }),
        k.anchor("center"),
        k.pos(0, index * 80 /** 80 é a altura mais o gap */),
        k.area(), // é preciso para o on click
      ]);
      opcao.add([
        k.text(texto, {
          font: "pixelFont",
          size: 17,
        }),
        k.anchor("center"),
        k.color("#000000"),
      ]);

      opcao.onClick(() => {
        let dificuldade = Dificuldade[opcoesChaves[index]];
        let dificuldadeTexto = opcoesTexto[index];
        iniciarJogo(dificuldade, dificuldadeTexto);
      });
    });
  });
  k.go("inicio");
}
