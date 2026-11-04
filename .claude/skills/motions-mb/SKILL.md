---
name: "motions-mb"
description: "Use para colocar motion (animação, contadores, carimbos, lupa, anatomia, transições, fechamento) em Reels da MB Saldanha usando a biblioteca motions-mb, pedindo os motions pelo número (01 a 64) ou pelo nome (lux-* da linha premium, px-* do pixel art), inclusive em fundo verde (chroma key)."
---

# Motions MB Saldanha

A biblioteca fica em `motions-mb/` neste repo. Leia primeiro `motions-mb/ROTEIRO.md` (passo a passo, qual motion usar em cada fala, receitas e conferência final), depois `motions-mb/CATALOGO.md` para os parâmetros. Responda sempre em português.

## Quando o Paulo pedir "motion NN neste vídeo"
1. Ache o vídeo bruto (Drive ou anexo) e confira duração e cor (iPhone HLG é convertido sozinho pelo montar.py).
2. Copie `motions-mb/exemplos/previa-NN.json` como ponto de partida e troque `brutos`, `base` (trechos certos, sem erros e início de gravação) e os textos. Fala com legenda (56) ou palavra na voz (25): tire os tempos com `motions-mb/motor/transcrever.py` (`--formato 56` para o 56).
3. Rode `python3 motions-mb/motor/montar.py SPEC.json --saida SAIDA --so-html` e confira quadros com `hyperframes snapshot PASTA --at t1,t2 --no-end`. Olhe as imagens: texto cortado, rótulo batendo, número fora do lugar.
4. Rode sem `--so-html` (use `--final` para a entrega) e entregue `NOME.mp4`, `NOME-leve.mp4` e `NOME-capa.jpg` no chat do thread (o conector do Drive não aceita vídeo grande).
5. Se o Paulo quiser o motion para pôr no editor dele: `--verde` gera `NOME-verde.mp4` (só o motion sobre verde puro). Os 41 a 64 já estão em `/mnt/project-files/reels/motions-mb/fundo-verde/` com o `COMO-USAR.md`; veja a seção "Fundo verde" do README.

## Regras do padrão (não negociáveis)
- Azul #1F66E5, marinho #0A1B3F, Montserrat em caixa alta, palavra-chave em faixa azul, logo branco no canto.
- Logo sem "domiciliar" por padrão; `"logo": "domiciliar"` só em post do atendimento domiciliar.
- Nunca flash ou tela branca, nunca lavar ou estourar a luz, nunca tela dividida, nunca linha ou rastreio preso no corpo.
- Vídeos do Ullisses (com dois L) = performance, não dor; não fechar com "Avaliação com a Maria".
- Rosto em círculo sempre centralizado e inteiro: o extra `rosto` usa `motor/rosto.py` sozinho.
- Motion tem que fazer sentido com a fala (pesos, anilhas, contadores, elementos de academia), variado entre vídeos.
- Nada de personagem cartoon em vetor (os vilões foram reprovados em 2026-11-04). A série de vilões só volta em pixel art, quando o Paulo pedir; o código vetorial guardado está em `motions-mb/guardados/serie-viloes/` e a versão em pixel é o `px-luta`.
- Em 2026-11-04 o Paulo achou o estilo dos 01 a 40 amador e escolheu **premium em tudo**. Os 41 a 60 são premium (aprovados pelo Paulo) e os 62 a 64 refazem em premium o mapa da dor, o raio-X e o React; ao montar um Reel, use primeiro os premium (41 a 64 e `lux-*`) e só recorra aos 01 a 40 quando nenhum premium fizer o mesmo papel (tabela da seção 3 do ROTEIRO). Não entregue motion novo no estilo antigo (quique, partícula, tremida, pop). Ele pediu para ir melhorando sempre: suba o acabamento a cada leva.
- Número na tela só com fonte real (rodapé do cartão nos 46 a 50); sem estudo, marque "ESQUEMA ILUSTRATIVO".
- 51 e 52 desenham sobre o vídeo congelado (peça `congela` no spec); meça as coordenadas num quadro com grade. O 57 precisa do corte do erro para o certo em `em + troca_em`.

## Criar motion novo
Siga a seção "Como criar um motion novo" do README (inclusive o cuidado com duas animações na mesma propriedade e as outras armadilhas listadas ali), use as peças de `MB.lux` (`modelos/L-premium.js`), numere a partir de 65, registre em `modelos/catalogo.json`, rode `motor/gerar_catalogo.py`, faça uma prévia e confira com snapshot antes de entregar. Commit no repo; nunca pedir ao Paulo para subir skill ou arquivo à mão.
