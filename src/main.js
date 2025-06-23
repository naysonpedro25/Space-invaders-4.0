import kaplay from "kaplay";
import { iniciarJogo } from "./cenas/jogo";
import { carregarArquivos } from "./recursos/carregar-arquivos";
import { iniciarInicio } from "./cenas/inicial";

export const k = kaplay({
  background: "#121212",
});

k.debug.inspect = 0;

carregarArquivos();
iniciarInicio();
// iniciarJogo();
