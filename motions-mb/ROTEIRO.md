# Roteiro de uso dos motions (guia do Claude)

Leia isto antes de montar qualquer Reel com motion da MB Saldanha. Ele junta o passo a passo, a escolha do motion certo para cada fala e tudo o que o Paulo já corrigiu. Os parâmetros de cada motion estão em [CATALOGO.md](CATALOGO.md) e o motor em [README.md](README.md).

## 1. Antes de começar

- **Grafia:** o nome é **ULLISSES** (dois L, dois S). Confira em rótulos, legendas, fechamento e nome de arquivo.
- **De quem é o vídeo:**
  - Ullisses é personal: o tema é **performance**, nunca dor. Não fechar com "avaliação com a Maria".
  - Maria é fisioterapeuta: dor, avaliação, quiropraxia e domiciliar.
- **Estilo: premium em tudo** (decisão do Paulo em 2026-11-04). Use primeiro os motions premium: 41 a 64 e os `lux-*`. Os 01 a 40 são do estilo antigo, que ele achou amador; só entram quando nenhum premium faz o mesmo papel (a tabela da seção 3 mostra qual). Nada de quique, partícula, tremida ou som de pop. E ele pediu para ir melhorando sempre: a cada Reel, suba um pouco o acabamento.
- **Logo:** branco, sem "domiciliar". `"logo": "domiciliar"` só em post sobre atendimento domiciliar.
- **Cor:** não mexer na cor do vídeo (pedido do Paulo em 2026-11-04: "deixe nos parâmetros"). O `lux-grade` fica com contraste e saturação em 1, e o véu (`lux-veu`) só atrás do texto, no topo, com força até 0,62; véu grande na lateral ou embaixo deixa a imagem cinza e "pastel". Nada de flash ou tela branca, nada de lavar ou estourar a luz. O montar.py já converte o HLG do iPhone com a cor certa. Rastro de câmera lenta usa a peça `eco`, que não clareia.
- **Proibido:** tela dividida, linhas ou rastreio presos no corpo (o Paulo achou "péssimo"). Motion fica sobre o vídeo, solto do corpo. A caneta na tela (51) e o transferidor (52) desenham sobre o vídeo **congelado**, como um professor no quadro; não seguem o corpo em movimento.
- **Rosto em círculo:** sempre centralizado e inteiro (cabelo e queixo dentro). O extra `"id": "rosto"` já faz isso sozinho via `motor/rosto.py`; para outro nome de extra, use `"enquadrar_rosto": true`.
- **Corte:** tire o começo da gravação ("pronto?", erros, respiração) e qualquer take errado.
- **Número precisa de fonte:** motion de dado (46 a 50) só com estudo real, citado no rodapé do cartão (`fonte`). Se for só um desenho da ideia, sem estudo, escreva `"nota": "ESQUEMA ILUSTRATIVO"` e deixe `fonte` vazio. Nunca invente porcentagem.

## 2. Passo a passo

1. **Achar o bruto:** Drive (pasta dos brutos) ou anexo no chat. Anote os trechos bons em segundos.
2. **Transcrever:** se tiver fala, rode `motor/transcrever.py VIDEO --ss X --dur Y --prompt "texto do roteiro"`.
   - Para o 25 (palavra que bate com a voz), acrescente `--chaves palavra1,palavra2`.
   - Para o 56 (legenda que acompanha a voz), acrescente `--formato 56`: sai a `frase` e os `tempos` prontos.
3. **Escolher os motions:** um por ideia da fala, sem repetir o mesmo tipo seguido. A tabela da seção 3 ajuda.
4. **Escrever o spec:**
   - Parta de `exemplos/previa-NN.json` do motion principal.
   - Cada motion entra em `motions` com `em` no segundo do vídeo final.
   - Comece com `lux-grade` cobrindo o vídeo todo (acabamento de cinema) e use `lux-passagem` nos cortes.
   - Feche com `lux-salvar`, 41 (botão tocado) ou 40 (assinatura de performance).
5. **Conferir antes de renderizar:**
   - Rode `montar.py SPEC --so-html --work W` e depois `hyperframes snapshot W/NOME --at t1,t2,... --no-end -o DIR`.
   - Olhe as imagens: texto saindo da tela, rótulo batendo em outro, número fora do lugar, rosto cortado no círculo, logo coberto, texto fino sumindo em fundo claro.
   - Para 51, 52 e 54 (coordenadas em cima da pessoa): desenhe uma grade sobre um quadro do snapshot e meça os pontos nela. Medir no olho pela miniatura sempre erra.
6. **Renderizar:** `montar.py SPEC --saida OUT --final` gera o completo, o leve e a capa.
7. **Entregar:**
   - Completo + leve + capa vão anexados no chat do thread (o conector do Drive não sobe vídeo).
   - Documentos vão como Google Doc no Drive.
   - Limite de 24 anexos por thread: quando lotar, pedir um thread novo ao coordenador.
8. **Fundo verde (quando o Paulo for editar no aparelho dele):** `montar.py SPEC --saida OUT --verde` gera `NOME-verde.mp4`, só o motion sobre verde puro, sem o vídeo e sem o logo. Os 41 a 64 já estão prontos em `/mnt/project-files/reels/motions-mb/fundo-verde/`, com o `COMO-USAR.md` (passo a passo do chroma key no CapCut).

## 3. Qual motion usar em cada fala

Premium primeiro. A coluna da direita é o estilo antigo, só para quando faltar um premium.

| Quando a fala diz... | Premium (use primeiro) | Estilo antigo |
|---|---|---|
| gancho dos 3 primeiros segundos | `lux-titulo`, 60 barra de capítulos ("3 erros que...") | 27, 28 |
| "3 erros", "3 dicas", passos numerados | 60 barra de capítulos | 06, 15, 28 |
| apresentar quem fala (Ullisses, Maria com o CREFITO) | 43 crachá com nome e registro, `lux-cracha` | |
| frase falada que precisa de legenda | 56 legenda que acompanha a voz | 25 |
| frase de impacto (pausa na fala) | `lux-frase` (vídeo congelado) | 26 |
| jeito errado x jeito certo | 57 em vez disso / faça assim | 11, 12, 13, 16 |
| detalhe do erro (joelho, coluna, pé, quadril) | 51 caneta na tela (fundo congelado) | 14 |
| ângulo (tronco, joelho, quadril) | 52 transferidor (fundo congelado) | |
| conta repetições | `lux-reps` (contador fino com dica a cada repetição) | 02, 38 |
| ritmo da repetição ("desce em 3, segura 1") | 59 cadência | |
| treino do dia, circuito, lista de exercícios, tempo de cada um | 58 cards com o clipe dentro | 03, 04, 15 |
| estudo, "a pesquisa mostra", número com fonte | 46 card do estudo, 47 barras que comparam, 48 anel de porcentagem | |
| evolução ao longo do tempo (carga, dor, força) | 49 gráfico de linhas | 01, 07, 19, 24 |
| teste de salto ou força, comparar as pernas | 54 fita métrica, 50 conta que se resolve | |
| mito, "não é verdade", frase errada x certa | 53 palavra riscada | 30 |
| atendimento em casa, bairro, cidade (domiciliar) | 55 mapa com pino (logo `"domiciliar"`) | 21 |
| pergunta de seguidor | 44 resposta a comentário | 29 |
| pergunta para o público votar | 45 enquete | |
| "comente X que eu te mando", "marque o amigo" | 42 comenta a palavra | |
| "salve", "mande para alguém", "siga", "agende sua avaliação" | 41 botão que é tocado, `lux-salvar` | |
| texto em cima de fundo claro | `lux-veu` (topo, base, esquerda ou tela toda) | |
| corte entre cenas | `lux-passagem` | 31, 35 |
| acabamento do vídeo todo (vinheta, contraste, aproximação lenta) | `lux-grade` | |
| momento forte (pico do salto, travou a carga) | `lux-grade` com `empurra` no trecho | 32, 33 |
| onde dói (pescoço, lombar, joelho...) | 62 mapa da dor | 17 |
| disco, vértebra, hérnia, "o que aparece no exame" | 63 raio-X da coluna (esquema ilustrativo) | 18 |
| músculo que trabalha no exercício | ainda sem premium (62 com a região do músculo serve) | 23 |
| estalo, quiropraxia | 53 para o mito; o estalo ainda sem premium | 22 |
| resultado de paciente | 49 ou 48 com o número dele | 20 |
| apresentar a sala ou os aparelhos | 58 cards | 08, 39 |
| agilidade, velocidade, recorde | ainda sem premium | 09 |
| Ullisses comentando um vídeo | 64 React (rosto no círculo + caneta no quadro congelado) | 36 |
| desafio e app X1 | 58 cards ou 59 cadência | 37, 38 |
| fechamento | `lux-salvar`, 41 | 40 |

Quando precisar de um motion que só existe no estilo antigo (escada, estalo, músculo que acende), avise o Paulo e proponha fazer a versão premium como próximo número (65 em diante).

### Cuidados por motion

- **51 e 52:** o fundo precisa estar congelado (`{"tipo": "congela", ...}` no `base`) durante o motion. Marque no máximo 4 coisas por quadro. Azul #3b7cff para o certo e vermelho para o erro; o azul claro some na camisa branca.
- **54:** a primeira medida é a referência (a perna boa). A diferença aparece em vermelho tracejado na fita menor.
- **56:** frase de até umas 10 palavras por motion. Fala longa: dois 56 seguidos, cada um com o seu `em`. Os tempos do whisper erram uns 0,1 s; confira no snapshot o começo de cada palavra.
- **57:** o spec precisa ter o corte do trecho errado para o certo exatamente em `em + troca_em`. O erro fica em preto e branco e a passada azul cobre o corte.
- **58:** cada card troca no segundo que você der; ponha um corte no `base` no mesmo ponto para o clipe de dentro mudar junto. O cronômetro do card é só o tempo do exercício (fixo), não conta de verdade.
- **59:** as fases precisam bater com o movimento do vídeo. Use `inicio` para alinhar o começo da descida.
- **60:** o título do capítulo fica numa faixa escura para aparecer até em camisa branca. Use `titulo_y` para tirar o título de cima do rosto.
- **41, 42, 44, 45:** perfis e porcentagens dos exemplos são inventados para a prévia. No Reel de verdade, use nomes genéricos (`@voce`) ou comentários reais com autorização.
- **43:** o registro da Maria é o CREFITO que aparece no site oficial. Confira antes de publicar.
- **62:** até 3 ou 4 regiões; cada uma acende no segundo que você der e fica marcada no mapa até o fim. `lado: "direito"` ou `"esquerdo"` é o lado do paciente. É tema da Maria (dor), nunca do Ullisses.
- **63:** é desenho, não exame: o rodapé "ESQUEMA ILUSTRATIVO" fica sempre. `destaque` aceita um disco (`"L4-L5"`) ou uma vértebra (`"L4"`). Tela cheia por uns 5 s: ponha no trecho em que a Maria explica, não em cima de demonstração.
- **64:** o spec precisa do extra `"rosto"` com `"som": true` e do fundo congelado a partir de `olha_em` (o 64 chama o 51 sozinho). Meça as marcas num quadro com grade e deixe-as fora do canto do rosto (x de 640 a 1040, y de 200 a 700).

## 4. Receitas prontas

- **Erro x certo do Ullisses (15 a 25 s):** `lux-grade` no vídeo todo, `lux-titulo` como gancho, 57 em vez disso / faça assim, 51 caneta no erro (fundo congelado), `lux-passagem`, `lux-reps` no jeito certo, `lux-salvar`.
- **3 erros que travam seu treino:** 60 barra de capítulos no vídeo todo, 51 ou 52 em cada erro, 56 na fala final, 41 salvar.
- **Treino do dia ou circuito:** 43 crachá do Ullisses, 58 cards com o clipe dentro, 59 cadência no exercício principal, 42 comenta a palavra.
- **Ciência da performance:** 56 legenda na fala, 46 card do estudo ou 47 barras, 48 anel, 41 salvar. Sempre com fonte real.
- **Volta ao esporte (Maria):** 43 crachá da Maria, 54 fita métrica, 50 conta que se resolve, 49 linhas da evolução, 41 "Agende sua avaliação".
- **Mito da Maria:** 53 palavra riscada, 48 ou 46 com o dado, 44 resposta a comentário, 41.
- **Domiciliar:** 55 mapa com pino, 48 anel (quedas de idosos, OMS), 43 crachá da Maria, logo `"domiciliar"`.
- **React do Ullisses:** 64 (rosto no círculo e caneta no quadro congelado), 57 para o certo.
- **Dor da Maria:** 43 crachá da Maria, 62 mapa da dor, 63 raio-X (esquema ilustrativo), 49 linhas da melhora, 41 "Agende sua avaliação".

## 5. Ideias recusadas ou guardadas (não repetir sem o Paulo pedir)

- **Estilo antigo** (quique, partículas, tremida, pop, texto pesado em tudo): o Paulo achou amador em 2026-11-04. Todo motion novo é premium.
- **Vilões desenhados em vetor** (Gordurinha, Dona Dor e companhia, com barra de vida): o Paulo achou feios em 2026-11-04. A ideia ficou guardada para depois, com pegada pixel art de jogo retrô. O código da luta está em `guardados/serie-viloes/` e a amostra em pixel é o `px-luta`.
- **Motions do Astra:** descartados.
- **Tela dividida** e **linhas ou rastreio presos no corpo.**
- **Flash, tela branca ou imagem lavada.**
- **Cronômetro que corre rápido de mentira:** no 58 o tempo fica fixo no card.

## 6. Conferência final (sempre)

- [ ] Nome ULLISSES certo em tudo.
- [ ] Motions premium (41 a 64 e `lux-*`); estilo antigo só onde não há premium.
- [ ] Rosto centralizado no círculo.
- [ ] Nenhum branco estourado, flash, tela dividida ou linha presa no corpo.
- [ ] Texto dentro da tela, legível (com véu ou faixa em fundo claro), sem colidir com rosto, logo ou outro texto.
- [ ] Número com fonte real, ou marcado como esquema ilustrativo.
- [ ] Motion conversa com a fala, no tempo certo.
- [ ] Começo sem "pronto?" ou erro de gravação.
- [ ] Logo certo (sem domiciliar, a não ser em post de domiciliar).
- [ ] Completo + leve + capa entregues no chat.
