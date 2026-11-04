# Motions MB Saldanha

Biblioteca de motions prontos para os Reels da MB Saldanha, já no padrão da marca: azul #1F66E5, marinho #0A1B3F, Montserrat em caixa alta, palavra-chave em faixa azul e logo branco no canto (sem "domiciliar", a não ser em post de domiciliar). Nada de flash ou tela branca, tela dividida ou linhas presas no corpo.

A lista completa com os parâmetros de cada um está em [CATALOGO.md](CATALOGO.md). O passo a passo de uso, com qual motion escolher para cada fala, está em [ROTEIRO.md](ROTEIRO.md). Prévias renderizadas: `previa-NN.mp4` e as compilações por grupo (`grupo-X-motions-NN-a-NN.mp4`) em `/mnt/project-files/reels/motions-mb/previas/`. Versões em fundo verde (chroma key) dos 41 a 64: `/mnt/project-files/reels/motions-mb/fundo-verde/`. Os vídeos são entregues no chat do thread; a pasta "Motions MB" do Drive guarda só o catálogo (o conector do Drive não aceita vídeo).

## Grupos

| Grupo | Motions | Para quê |
|---|---|---|
| A. Academia e performance | 01 a 10 | barra que carrega, contador de reps, cronômetro, prancheta, RPE, anilhas como tópicos, placar de evolução, kit da sala, escada de agilidade, batimento |
| B. Erro x certo | 11 a 16 | carimbo ERRADO/ASSIM, rebobinar, placar erro x técnica, lupa, checklist, nota da técnica |
| C. Corpo e fisioterapia | 17 a 24 | mapa da dor, raio-X, termômetro da dor, antes e depois, casa segura, estalo de quiropraxia, músculo que acende, linha do tempo |
| D. Texto e legenda | 25 a 30 | palavra que bate com a voz, texto atrás da pessoa, máquina de escrever, contagem do gancho, balões de conversa, mito ou verdade |
| E. Transições e câmera | 31 a 35 | passada azul, zoom de impacto, câmera lenta com rastro, card que gira, corte no ritmo |
| F. Séries e app X1 | 36 a 40 | React do Ullisses, desafio da flexão, tela do app, bastidores, fechamento padrão |
| G. Chamadas e identidade (premium) | 41 a 45 | botão tocado (salvar, enviar, seguir, agendar), comenta a palavra, crachá com nome e registro, resposta a comentário, enquete |
| H. Dados com fonte (premium) | 46 a 50 | card do estudo com a fonte, barras que comparam, anel de porcentagem, gráfico de linhas, conta que se resolve |
| I. Desenho na tela (premium) | 51 a 55 | caneta na tela (círculo, X, seta, linha), transferidor de ângulo, palavra riscada, fita métrica, mapa com pino |
| J. Formatos que viralizam (premium) | 56 a 60 | legenda que acompanha a voz, "em vez disso / faça assim", cards com o clipe dentro, cadência da repetição, barra de capítulos |
| K. Refeitos na linha premium | 62 a 64 | mapa da dor (no lugar do 17), raio-X da coluna (no lugar do 18), React do Ullisses com a caneta na tela (no lugar do 36) |
| L. Linha premium (amostra) | `lux-*` e 61 | acabamento de cinema, véu no topo, título editorial, contador fino com dicas, frase com vídeo congelado, passagem, crachá de vidro, salvar; 61 rosto premium (a voz de quem fala num círculo fino) |
| P. Pixel art (amostra) | `px-*` | FASE 1/VAI!, vilão com barra de vida, XP e LEVEL UP, corte em blocos, diálogo de RPG, JOGO SALVO |

## Estilo dos próximos motions (desde 2026-11-04)

O Paulo achou os motions 01 a 40 com cara de amador (quique, partículas, tremida, sons de pop, texto pesado em todo lugar) e pediu personalidade e cara premium. Foram feitas duas amostras com o mesmo vídeo do Ullisses (levantamento terra) para ele comparar: `exemplos/amostra-premium.json` (linha premium, motions `lux-*`) e `exemplos/amostra-pixel.json` (pixel art, motions `px-*`). Os vídeos estão em `/mnt/project-files/reels/amostras-estilo/`.

**Decisão (2026-11-04): premium em tudo.** Os motions 41 a 60 foram feitos na linha premium (o Paulo aprovou), os 62 a 64 refazem no padrão novo o mapa da dor, o raio-X e o React, e todo motion novo (65 em diante) segue a mesma linha. O pixel art fica só para a série dos vilões, se o Paulo pedir. Ele também pediu para ir melhorando sempre: a cada leva, suba um pouco o acabamento.

Linha premium, em resumo: um foco por vez; Montserrat com contraste de peso (200 fino x 800 forte); rótulos em letra de máquina (JetBrains Mono) com espaçamento largo; linhas finas; vidro marinho fosco sem brilho; texto que sobe de dentro de uma fenda com easing expo; nada de quique, partícula, tremida ou pop; a coluna de pontos do logo (as vértebras) como assinatura; sons discretos `lux_*` (ar, grave, clique, traço, sino).

As peças da linha ficam em `MB.lux` (`modelos/L-premium.js`): `rico`, `limpo`, `fenda`, `sobe`, `fecha`, `rotulo`, `linha`, `recolhe`, `apaga`, `coluna`, `colunaEntra`, `pesa`, `respira`, `fundo` (escuro só atrás do texto), mais as cores `AZ` e `CL` e o `ESC` (escapa texto). Use essas peças nos motions novos em vez de reinventar entrada e saída.

**Cor do vídeo: não mexer (pedido do Paulo em 2026-11-04, "deixe nos parâmetros").** Ele achou a imagem "pastel, branquizada" e sem a cor bonita do original. A causa era o acabamento: filtro que tirava cor do vídeo e véus azul-escuros grandes (tela toda, lateral, embaixo, e o degradê `#sombra` da página). A regra agora:

- nenhum filtro no vídeo (`K.cam`): nada de `saturate`, `grayscale`, `brightness`, `contrast`. O `lux-grade` fica com contraste e saturação em 1 (aí ele nem aplica filtro) e o 57 só deixa o erro em preto e branco com `"pb": true`;
- nada de véu na tela toda, na lateral ou embaixo, e nada de desfocar o vídeo inteiro. O escuro fica só atrás do texto: `MB.lux.fundo(K, x, y, w, h, de, ate, forca)` cobre a área do texto, esfuma para fora e para em 0,6. O `lux-veu` só vai no topo (ou base curta), até 0,62;
- quando o motion precisa de tela cheia (raio-X 63, cards do 58), o fundo é marinho sólido: cobre o vídeo, não muda a cor dele. O clipe dentro da janela do 58 fica com a cor original;
- o `#sombra` da página está desligado; o logo tem sombra própria. A conversão do iPhone no `montar.py` (`TM` e `COR`) fica como está.

O que aprendemos fazendo os 41 a 64 (vale para os próximos):

- **Texto sobre camisa branca ou parede clara some.** Todo texto fino precisa de um fundo, mas só atrás dele: `MB.lux.fundo` (escuro suave na área do texto), sombra `lx-sombra` ou cartão de vidro. O vidro `.lx-vidro` é marinho a 80%; cartão de dados usa marinho a 84% com marcas de corte nos cantos. Nunca véu na tela toda (veja a regra da cor acima).
- **Fonte de estudo vai no rodapé do cartão** (fio fino, "FONTE" em azul e a seta), nunca solta no vídeo.
- **Desenho em cima da pessoa:** azul #3b7cff e vermelho #ff5b5b com sombra (o azul claro some na camisa branca). As coordenadas das marcas se medem num quadro com grade desenhada por cima do snapshot, nunca no olho pela miniatura.
- **Desenho na tela pede vídeo congelado** (peça `congela` no spec) durante o motion 51 e 52.

## Como usar

1. Escreva um spec JSON (veja os exemplos em `exemplos/previa-NN.json` e a ajuda no topo de `motor/montar.py`).
2. Rode:

```bash
python3 motor/montar.py meu-reel.json --brutos PASTA_DOS_VIDEOS --saida PASTA_DE_SAIDA [--final]
```

Saída: `NOME.mp4` (completo), `NOME-leve.mp4` (~3,5 Mbps) e `NOME-capa.jpg`. Com `--verde`, sai só `NOME-verde.mp4` (veja "Fundo verde" abaixo).

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

## Fundo verde (chroma key)

Pedido do Paulo em 2026-11-04: cada motion também em fundo verde, para ele pôr por cima de qualquer vídeo no editor dele. Os 41 a 64 já estão prontos aqui no repositório, em `fundo-verde/` (`motion-NN-fundo-verde.mp4`, 1080 x 1920, 30 qps, com os efeitos sonoros, uns 14 MB no total), junto com o `COMO-USAR.md`, e também em `/mnt/project-files/reels/motions-mb/fundo-verde/`. Ao refazer um verde, troque o arquivo nos dois lugares. As prévias montadas (bem maiores) não entram no repositório: gere de novo com `montar.py`.

```bash
python3 motor/montar.py exemplos/previa-47.json --saida OUT --verde      # sai OUT/previa-47-verde.mp4
```

O que o `--verde` faz:

- a página sai sem o vídeo, sem o logo (o Paulo põe o dele no editor), sem véu, sem sombra de texto e sem desfoque de fundo (eles virariam manchas escuras no verde). O `MB.verde` fica `true` para o motion se ajustar (o 51 não aproxima a imagem, o 58 tira o fade do fundo);
- renderiza os quadros com transparência e o `motor/verde.py` monta o vídeo: o que é translúcido (vidro a 80%, rótulo a 74%, palavra apagada) é reforçado e completado com o marinho da MB, cada pixel sai em cor sólida ou verde puro (verde misturado o chroma key não tira), e tudo ganha um contorno marinho de 2 px, que deixa o recorte limpo e o texto fino legível sobre vídeo claro;
- o espelho do vídeo (a janela dos cards do 58) fica verde: o clipe do Paulo aparece ali por baixo;
- o áudio é só o dos efeitos sonoros; os extras (rosto, recorte) ficam de fora. No 64 o círculo do rosto fica verde: o vídeo do rosto entra por baixo, recortado em círculo no editor.

`MB_GUARDA_QUADROS=1` guarda os PNG em `WORK/NOME/_quadros`; aí dá para refazer só o `verde.py` (`python3 motor/verde.py _quadros saida.mp4`) sem renderizar de novo. Para conferir, simule o chroma key com o ffmpeg (`chromakey=0x00ff00:0.18:0.08`) por cima de um vídeo qualquer.

## Ferramentas de apoio

- `motor/recorte.py ENTRADA.mp4 SAIDA.webm`: recorta a pessoa com fundo transparente (MediaPipe). O montar.py chama sozinho quando o extra tem `"recorte": true` (motion 26).
- `motor/transcrever.py VIDEO --ss 2 --dur 6 --chaves dor,erro`: palavras com tempo para o motion 25. Com `--formato 56` sai a `frase` e os `tempos` prontos para a legenda que acompanha a voz (motion 56); `--prompt "texto do roteiro"` ajuda o whisper a acertar as palavras.
- `motor/sfx.py`: refaz os efeitos sonoros em `motor/assets/sfx` (`--pixel` só os 8 bits `px_*`, `--luxo` só os discretos `lux_*`).
- `motor/rosto.py ENTRADA.mp4 SAIDA.mp4`: corta um quadrado com o rosto centralizado (bolha do React). O montar.py usa sozinho no extra "rosto".
- `motor/gerar_catalogo.py`: refaz o CATALOGO.md depois de mudar um modelo.
- `motor/verde.py PASTA_DOS_PNG SAIDA.mp4`: monta o vídeo em fundo verde a partir dos quadros com transparência (o `montar.py --verde` chama sozinho).

## Ideias guardadas

`guardados/serie-viloes/`: série com vilões e barra de vida. O desenho em vetor foi reprovado. A versão em pixel art já existe como amostra (`px-luta`, a Gordurinha em pixel, na `amostra-pixel`).

## Como criar um motion novo

Cada motion é um `MB.def("NN", {parâmetros padrão}, function (P, K) {...})` num arquivo de `modelos/`, mais uma linha em `modelos/catalogo.json`. O `K` traz as ferramentas: `K.t(seg)` (tempo relativo ao `em`), `K.el`, `K.svg`, `K.vidro`, `K.ft`/`K.to`/`K.set` (GSAP), `K.sfx`, `K.conta`, `K.treme`, `K.desenha`, `K.passada`, `K.particulas`, `K.ticker`, `K.cam`, `K.logo`, `K.espelho(i)`, `K.extra(id)`, `K.usar(id, params)`, `K.depois(fn)` (roda depois que todos os motions do spec foram montados, para motions que dependem uns dos outros) e `K.rnd()` (sorteio com semente fixa). Nunca use `Math.random` nem relógio: o render precisa sair igual toda vez.

Cuidado com duas animações na mesma propriedade (por exemplo, a entrada e a saída de um texto): a que começa depois tem que terminar depois, senão a mais antiga continua rodando e o elemento volta para a tela. Calcule a saída a partir do fim da entrada, ou encurte a entrada. Elemento que entra com `K.ft` precisa começar escondido (`opacity:0` no estilo ou `gsap.set` na montagem).

Outras armadilhas que já custaram um render:

- Nunca escreva `scaleX(0)` junto com `rotate()` no `transform` do estilo: o GSAP lê isso como um skew de -90° e o elemento some. Ponha a posição inicial com `gsap.set` (ou `K.set`).
- Em elemento de SVG, use `transformOrigin: "50% 50%"`; valor em px conta a partir da caixa do próprio elemento, não do SVG.
- Fundo atrás do texto (`MB.lux.fundo`, cartão, z-index 0) precisa ser criado antes do texto, porque pinta na ordem em que foi criado.
- Motion com espelho (`"espelhos": 1` no `catalogo.json`) cria um `#mir1` com z-index 30; para ficar por cima dele, mova o elemento para o `#root` com z-index 45 ou mais.
- O comentário logo abaixo do título do motion (`// ---------- NN Título ----------`) vira a nota do motion no CATALOGO.md. Escreva ali o que quem for usar precisa saber (formato dos parâmetros, se precisa congelar o fundo, corte no spec).

Fontes: Montserrat (texto), JetBrains Mono (rótulos), Press Start 2P e Pixelify Sans (pixel; a Press Start 2P só sem acento, porque as maiúsculas acentuadas parecem minúsculas). Todas com licença OFL, ao lado dos arquivos em `motor/assets/`.

Anatomia (motions 17, 23 e 62): polígonos do react-body-highlighter, licença MIT em `modelos/anatomia-LICENSE.txt`.
