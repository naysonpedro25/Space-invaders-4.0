import { k } from "../main";

export function fimJogo() {
  //   const sobreposicao = k.add([k.rect(k.width(), k.height()), k.opacity(0)]);
  k.add([
    k.text("Você perdeu", {
      font: "pixelFont",
      size: 40,
    }),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y - 100),
    k.color("#FFFFFF"),
  ]);

  const botaoResetar = k.add([
    k.rect(k.width() / 4, 60, {
      radius: 4,
    }),
    k.anchor("center"),
    k.pos(k.center()),
    k.area(), // é preciso para o on click
  ]);
  botaoResetar.add([
    k.text("Recomeçar", {
      font: "pixelFont",
      size: 17,
    }),
    k.anchor("center"),
    k.color("#000000"),
  ]);

  botaoResetar.onClick(() => {
    k.go("jogo");
  });
}
