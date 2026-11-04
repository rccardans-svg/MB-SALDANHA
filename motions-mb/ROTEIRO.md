# Roteiro de uso dos motions (guia do Claude)

Leia isto antes de montar qualquer Reel com motion da MB Saldanha. Ele junta o passo a passo, a escolha do motion certo para cada fala e tudo o que o Paulo já corrigiu. Os parâmetros de cada motion estão em [CATALOGO.md](CATALOGO.md) e o motor em [README.md](README.md).

## 1. Antes de começar

- **Grafia:** o nome é **ULLISSES** (dois L, dois S). Confira em rótulos, legendas, fechamento e nome de arquivo.
- **De quem é o vídeo:**
  - Ullisses é personal: o tema é **performance**, nunca dor. Não fechar com "avaliação com a Maria".
  - Maria é fisioterapeuta: dor, avaliação, quiropraxia e domiciliar.
- **Logo:** branco, sem "domiciliar". `"logo": "domiciliar"` só em post sobre atendimento domiciliar.
- **Cor:** nada de flash ou tela branca, nada de lavar ou estourar a luz. O montar.py já converte o HLG do iPhone com a cor certa. Rastro de câmera lenta usa a peça `eco`, que não clareia.
- **Proibido:** tela dividida, linhas ou rastreio presos no corpo (o Paulo achou "péssimo"). Motion fica sobre o vídeo, solto do corpo.
- **Rosto em círculo:** sempre centralizado e inteiro (cabelo e queixo dentro). O extra `"id": "rosto"` já faz isso sozinho via `motor/rosto.py`; para outro nome de extra, use `"enquadrar_rosto": true`.
- **Corte:** tire o começo da gravação ("pronto?", erros, respiração) e qualquer take errado.

## 2. Passo a passo

1. **Achar o bruto:** Drive (pasta dos brutos) ou anexo no chat. Anote os trechos bons em segundos.
2. **Transcrever:** se tiver fala, rode `motor/transcrever.py VIDEO --ss X --dur Y --chaves palavra1,palavra2` para ter as palavras com tempo.
3. **Escolher os motions:** um por ideia da fala, sem repetir o mesmo tipo seguido. A tabela da seção 3 ajuda.
4. **Escrever o spec:**
   - Parta de `exemplos/previa-NN.json` do motion principal.
   - Cada motion entra em `motions` com `em` no segundo do vídeo final.
   - Use transições (31, 32, 35) entre os trechos.
   - Feche com o 40 (performance) ou com o fechamento da Maria.
5. **Conferir antes de renderizar:**
   - Rode `montar.py SPEC --so-html --work W` e depois `hyperframes snapshot W/NOME --at t1,t2,... --no-end -o DIR`.
   - Olhe as imagens: texto saindo da tela, rótulo batendo em outro, número fora do lugar, rosto cortado no círculo, logo coberto.
6. **Renderizar:** `montar.py SPEC --saida OUT --final` gera o completo, o leve e a capa.
7. **Entregar:**
   - Completo + leve + capa vão anexados no chat do thread (o conector do Drive não sobe vídeo).
   - Documentos vão como Google Doc no Drive.
   - Limite de 24 anexos por thread: quando lotar, pedir um thread novo ao coordenador.

## 3. Qual motion usar em cada fala

| Quando a fala diz... | Motion |
|---|---|
| carga, peso, "põe mais anilha", evolução de carga | 01 barra que carrega, 07 placar semana a semana |
| conta repetições, "faz 10" | 02 contador gigante, 38 tela do app |
| descanso, intervalo | 03 cronômetro |
| treino do dia, lista de exercícios | 04 prancheta, 15 checklist |
| esforço, intensidade, "tem que cansar" | 05 medidor RPE, 10 batimento |
| três dicas, passos | 06 anilhas como tópicos, 15 checklist |
| apresentar a sala ou os aparelhos | 08 kit da sala, 39 bastidores |
| agilidade, velocidade, recorde | 09 escada no chão |
| jeito errado x jeito certo | 11 carimbo, 12 rebobinar, 13 placar, 16 nota da técnica |
| detalhe do erro (joelho, coluna, pé) | 14 lupa |
| onde dói | 17 mapa da dor, 23 músculo que acende |
| disco, vértebra, "por dentro" | 18 raio-X |
| melhora da dor | 19 termômetro, 24 linha do tempo |
| resultado de paciente | 20 antes e depois |
| casa, idoso, queda (domiciliar) | 21 casa segura |
| estalo, quiropraxia | 22 crec, 30 mito ou verdade |
| frase de impacto falada | 25 palavra que bate com a voz, 26 texto atrás da pessoa |
| gancho dos 3 primeiros segundos | 27 máquina de escrever, 28 contagem "3 erros" |
| pergunta de seguidor | 29 balões |
| mito comum | 30 mito ou verdade |
| corte entre cenas | 31 passada azul |
| momento forte (pico do salto, travou a carga) | 32 zoom de impacto |
| mostrar o movimento devagar | 33 câmera lenta com rastro |
| dica rápida do personal no meio | 34 card que gira |
| montagem com música | 35 corte no ritmo |
| Ullisses comentando um vídeo | 36 React (rosto no círculo) |
| desafio e app X1 | 37 desafio da flexão, 38 tela do app |
| fechamento | 40 assinatura (performance) |

## 4. Receitas prontas

- **Erro x certo do Ullisses (15 a 25 s):** 28 gancho, 11 carimbo ERRADO, 14 lupa no erro, 31 passada, 11 carimbo ASSIM, 06 dicas, 40 fechamento.
- **Carga e técnica:** 01 barra que carrega (cada acerto põe anilha, cada erro tira), 02 contador, 32 zoom no pico, 40.
- **Dica da Maria sobre dor:** 27 gancho, 17 mapa da dor, 18 raio-X ou 23 músculo, 19 termômetro, fechamento da Maria com logo.
- **React do Ullisses:** 36 com a lupa, 11 ou 13, e 34 para a dica.
- **Desafio X1:** 37 com a meta, 38 tela do app, 35 no ritmo, CTA "baixe o app".
- **Domiciliar:** 21 casa segura, 24 linha do tempo, 29 balões, logo `"domiciliar"`.

## 5. Série com história (motions 41 a 48)

Vilões desenhados que o exercício certo derrota. Os de performance são do Ullisses (Gordurinha, Preguiça, Platô, Desculpinha). Os de dor são da Maria (Dona Dor, Postura Torta). O plano dos 12 episódios está na aba "Série com história" do doc do Instagram (claude.ai/artifact/FF2X3CLQcahFiohRWWaT8n). Pôster do elenco: `/mnt/project-files/reels/serie-historia/os-viloes-do-treino.png`.

**Como montar um episódio** (exemplo pronto: `exemplos/ep1-gordurinha.json`):

1. **Marcar as repetições:** anote o segundo em que cada repetição chega no topo. É nesse instante que o golpe acerta o vilão.
2. **Montar a base:**
   - Um trecho por repetição, de 1,6 a 2 s, com o topo cerca de 1,1 s depois do começo do trecho.
   - Uma repetição errada no meio (é ela que cura o vilão).
3. **Escolher os motions:**
   - **41** no começo: o vilão cai e provoca (`falas`). Coloque num canto livre, longe da cabeça da pessoa em todos os trechos (`olhar` vira os olhos para ela).
   - **42** logo depois da primeira fala: a barra de vida. `episodio` escreve "EPISÓDIO N · ULLISSES" em cima da barra.
   - **44** nas repetições certas: `golpes` com os tempos do vídeo final e `em: 0`. Cada golpe é uma anilha caindo na cabeça do vilão.
   - **43** para a espada azul (bom para os episódios da Maria). Ela aparece mirando o vilão com o nome do exercício (`nome`) e corta no tempo `em`.
   - **45** na repetição errada: carimbo ERRADO e o vilão recupera vida rindo. Use `y` baixo (1250) para o carimbo não esconder o erro.
4. **Fechar a conta da vida:** some os golpes para zerar no último. Exemplo: vida 100 e dano 25 dão 5 golpes certos e 1 erro (+25). O golpe que zera derrota o vilão sozinho (a anilha estoura o vilão, a espada corta ao meio).
5. **Fechamento:**
   - **46**: placa de vitória.
   - **47**: mapa com o próximo vilão, só com os vilões do dono do vídeo.
   - **40**: assinatura.

**Regras da série:**

- O vilão nunca cobre o rosto da pessoa.
- O balão de fala vai sozinho para o lado do vilão quando a barra de vida ocupa o alto da tela.
- Nada preso no corpo: o 48 (dor grudada num ponto) só vai sobre quadro congelado.
- Episódio do Ullisses fala de performance; dor é com a Maria.

## 6. Conferência final (sempre)

- [ ] Nome ULLISSES certo em tudo.
- [ ] Rosto centralizado no círculo.
- [ ] Nenhum branco estourado, flash, tela dividida ou linha presa no corpo.
- [ ] Texto dentro da tela, sem colidir com rosto, logo ou outro texto.
- [ ] Motion conversa com a fala, no tempo certo.
- [ ] Começo sem "pronto?" ou erro de gravação.
- [ ] Logo certo (sem domiciliar, a não ser em post de domiciliar).
- [ ] Completo + leve + capa entregues no chat.
