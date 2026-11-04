# Série com vilões (guardada)

Ideia do Paulo: vilões do treino (Gordurinha, Preguiça, Platô, Desculpinha, Dona Dor, Postura Torta) vencidos pelo exercício certo, com barra de vida.

- **2026-11-04:** o desenho em vetor (estilo cartoon) foi reprovado ("ficaram feios"). O Paulo pediu para guardar a ideia para depois, com **pegada pixel art** (jogo retrô).
- **O que funciona e pode ser reaproveitado:**
  - barra de vida com dano em atraso e K.O.;
  - anilha caindo a cada repetição;
  - espada que mira e corta;
  - cura no erro com carimbo;
  - placa de vitória;
  - mapa da jornada.
- **Para reativar:**
  1. Redesenhe os vilões em pixel art (sprites).
  2. Volte `G-serie-historia.js` para `modelos/`.
  3. Recoloque as linhas 41 a 48 em `modelos/catalogo.json` (todas com `"arquivo": "G-serie-historia.js"`; a 45 usa a 11 e a 48 usa a 41).
  4. Rode `motor/gerar_catalogo.py`.
- **Exemplo de episódio:** `ep1-gordurinha.json`. Os golpes caem no topo de cada repetição, achado com a pose do MediaPipe.
