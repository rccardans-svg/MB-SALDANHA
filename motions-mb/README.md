# Motions MB Saldanha

Biblioteca de motions prontos para os Reels da MB Saldanha, já no padrão da marca: azul #1F66E5, marinho #0A1B3F, Montserrat em caixa alta, palavra-chave em faixa azul e logo branco no canto (sem "domiciliar", a não ser em post de domiciliar). Nada de flash ou tela branca, tela dividida ou linhas presas no corpo.

A lista completa com os parâmetros de cada um está em [CATALOGO.md](CATALOGO.md). O passo a passo de uso, com qual motion escolher para cada fala, está em [ROTEIRO.md](ROTEIRO.md). Prévias renderizadas: `previa-NN.mp4` na pasta "Motions MB" do Drive (separada por grupo) e em `/mnt/project-files/reels/motions-mb/previas/`.

## Grupos

| Grupo | Motions | Para quê |
|---|---|---|
| A. Academia e performance | 01 a 10 | barra que carrega, contador de reps, cronômetro, prancheta, RPE, anilhas como tópicos, placar de evolução, kit da sala, escada de agilidade, batimento |
| B. Erro x certo | 11 a 16 | carimbo ERRADO/ASSIM, rebobinar, placar erro x técnica, lupa, checklist, nota da técnica |
| C. Corpo e fisioterapia | 17 a 24 | mapa da dor, raio-X, termômetro da dor, antes e depois, casa segura, estalo de quiropraxia, músculo que acende, linha do tempo |
| D. Texto e legenda | 25 a 30 | palavra que bate com a voz, texto atrás da pessoa, máquina de escrever, contagem do gancho, balões de conversa, mito ou verdade |
| E. Transições e câmera | 31 a 35 | passada azul, zoom de impacto, câmera lenta com rastro, card que gira, corte no ritmo |
| F. Séries e app X1 | 36 a 40 | React do Ullisses, desafio da flexão, tela do app, bastidores, fechamento padrão |
| G. Chamadas e identidade | 41 a 45 | botão tocado (salvar, enviar, seguir), comenta a palavra, crachá, resposta a comentário, enquete. Primeira versão, vai ser refeita no estilo escolhido |
| L. Linha premium (amostra) | `lux-*` | acabamento de cinema, véu, título editorial, contador fino com dicas, frase com vídeo congelado, passagem, crachá de vidro, salvar |
| P. Pixel art (amostra) | `px-*` | FASE 1/VAI!, vilão com barra de vida, XP e LEVEL UP, corte em blocos, diálogo de RPG, JOGO SALVO |

## Estilo dos próximos motions (desde 2026-11-04)

O Paulo achou os motions 01 a 40 com cara de amador (quique, partículas, tremida, sons de pop, texto pesado em todo lugar) e pediu personalidade e cara premium. Foram feitas duas amostras com o mesmo vídeo do Ullisses (levantamento terra) para ele comparar: `exemplos/amostra-premium.json` (linha premium, motions `lux-*`) e `exemplos/amostra-pixel.json` (pixel art, motions `px-*`). Os vídeos estão em `/mnt/project-files/reels/amostras-estilo/`. Os motions 41 em diante seguem o estilo que ele escolher.

Linha premium, em resumo: um foco por vez; Montserrat com contraste de peso (200 fino x 800 forte); rótulos em letra de máquina (JetBrains Mono) com espaçamento largo; linhas finas; vidro marinho fosco sem brilho; texto que sobe de dentro de uma fenda com easing expo; nada de quique, partícula, tremida ou pop; a coluna de pontos do logo (as vértebras) como assinatura; sons discretos `lux_*` (ar, grave, clique, traço, sino).

## Como usar

1. Escreva um spec JSON (veja os exemplos em `exemplos/previa-NN.json` e a ajuda no topo de `motor/montar.py`).
2. Rode:

```bash
python3 motor/montar.py meu-reel.json --brutos PASTA_DOS_VIDEOS --saida PASTA_DE_SAIDA [--final]
```

Saída: `NOME.mp4` (completo), `NOME-leve.mp4` (~3,5 Mbps) e `NOME-capa.jpg`.

Exemplo com três motions:

```json
{
  "nome": "reel-agachamento",
  "brutos": "/caminho/dos/brutos",
  "base": [
    {"src": "IMG_0743.MOV", "ss": 1.2, "dur": 3},
    {"tipo": "congela", "src": "IMG_0743.MOV", "ss": 4.2, "dur": 2.5},
    {"src": "IMG_0743.MOV", "ss": 4.2, "dur": 3}
  ],
  "motions": [
    {"id": "28", "em": 0, "texto": "3 ERROS QUE|*TRAVAM* SEU|AGACHAMENTO"},
    {"id": "11", "em": 3.0, "carimbos": [[0.2, "errado"]]},
    {"id": "40", "em": 8.5, "frase": "TÉCNICA É|*PERFORMANCE*"}
  ]
}
```

## Ferramentas de apoio

- `motor/recorte.py ENTRADA.mp4 SAIDA.webm`: recorta a pessoa com fundo transparente (MediaPipe). O montar.py chama sozinho quando o extra tem `"recorte": true` (motion 26).
- `motor/transcrever.py VIDEO --ss 2 --dur 6 --chaves dor,erro`: palavras com tempo para o motion 25.
- `motor/sfx.py`: refaz os efeitos sonoros em `motor/assets/sfx` (`--pixel` só os 8 bits `px_*`, `--luxo` só os discretos `lux_*`).
- `motor/rosto.py ENTRADA.mp4 SAIDA.mp4`: corta um quadrado com o rosto centralizado (bolha do React). O montar.py usa sozinho no extra "rosto".
- `motor/gerar_catalogo.py`: refaz o CATALOGO.md depois de mudar um modelo.

## Ideias guardadas

`guardados/serie-viloes/`: série com vilões e barra de vida. O desenho em vetor foi reprovado. A versão em pixel art já existe como amostra (`px-luta`, a Gordurinha em pixel, na `amostra-pixel`).

## Como criar um motion novo

Cada motion é um `MB.def("NN", {parâmetros padrão}, function (P, K) {...})` num arquivo de `modelos/`, mais uma linha em `modelos/catalogo.json`. O `K` traz as ferramentas: `K.t(seg)` (tempo relativo ao `em`), `K.el`, `K.svg`, `K.vidro`, `K.ft`/`K.to`/`K.set` (GSAP), `K.sfx`, `K.conta`, `K.treme`, `K.desenha`, `K.passada`, `K.particulas`, `K.ticker`, `K.cam`, `K.logo`, `K.espelho(i)`, `K.extra(id)`, `K.usar(id, params)`, `K.depois(fn)` (roda depois que todos os motions do spec foram montados, para motions que dependem uns dos outros) e `K.rnd()` (sorteio com semente fixa). Nunca use `Math.random` nem relógio: o render precisa sair igual toda vez.

Cuidado com duas animações na mesma propriedade (por exemplo, a entrada e a saída de um texto): a que começa depois tem que terminar depois, senão a mais antiga continua rodando e o elemento volta para a tela. Calcule a saída a partir do fim da entrada, ou encurte a entrada. Elemento que entra com `K.ft` precisa começar escondido (`opacity:0` no estilo ou `gsap.set` na montagem).

Fontes: Montserrat (texto), JetBrains Mono (rótulos), Press Start 2P e Pixelify Sans (pixel; a Press Start 2P só sem acento, porque as maiúsculas acentuadas parecem minúsculas). Todas com licença OFL, ao lado dos arquivos em `motor/assets/`.

Anatomia (motions 17 e 23): polígonos do react-body-highlighter, licença MIT em `modelos/anatomia-LICENSE.txt`.
