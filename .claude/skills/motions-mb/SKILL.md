---
name: "motions-mb"
description: "Use para colocar motion (animação, contadores, carimbos, lupa, anatomia, transições, fechamento) em Reels da MB Saldanha usando a biblioteca motions-mb, pedindo os motions pelo número (01 a 40)."
---

# Motions MB Saldanha

A biblioteca fica em `motions-mb/` neste repo. Leia primeiro `motions-mb/ROTEIRO.md` (passo a passo, qual motion usar em cada fala, receitas e conferência final), depois `motions-mb/CATALOGO.md` para os parâmetros. Responda sempre em português.

## Quando o Paulo pedir "motion NN neste vídeo"
1. Ache o vídeo bruto (Drive ou anexo) e confira duração e cor (iPhone HLG é convertido sozinho pelo montar.py).
2. Copie `motions-mb/exemplos/previa-NN.json` como ponto de partida e troque `brutos`, `base` (trechos certos, sem erros e início de gravação) e os textos.
3. Rode `python3 motions-mb/motor/montar.py SPEC.json --saida SAIDA --so-html` e confira quadros com `hyperframes snapshot PASTA --at t1,t2 --no-end`. Olhe as imagens: texto cortado, rótulo batendo, número fora do lugar.
4. Rode sem `--so-html` (use `--final` para a entrega) e entregue `NOME.mp4`, `NOME-leve.mp4` e `NOME-capa.jpg` no chat do thread (o conector do Drive não aceita vídeo grande).

## Regras do padrão (não negociáveis)
- Azul #1F66E5, marinho #0A1B3F, Montserrat em caixa alta, palavra-chave em faixa azul, logo branco no canto.
- Logo sem "domiciliar" por padrão; `"logo": "domiciliar"` só em post do atendimento domiciliar.
- Nunca flash ou tela branca, nunca lavar ou estourar a luz, nunca tela dividida, nunca linha ou rastreio preso no corpo.
- Vídeos do Ullisses (com dois L) = performance, não dor; não fechar com "Avaliação com a Maria".
- Rosto em círculo sempre centralizado e inteiro: o extra `rosto` usa `motor/rosto.py` sozinho.
- Motion tem que fazer sentido com a fala (pesos, anilhas, contadores, elementos de academia), variado entre vídeos.

## Criar motion novo
Siga a seção "Como criar um motion novo" do README, numere a partir de 41, registre em `modelos/catalogo.json`, rode `motor/gerar_catalogo.py`, faça uma prévia e confira com snapshot antes de entregar. Commit no repo; nunca pedir ao Paulo para subir skill ou arquivo à mão.
