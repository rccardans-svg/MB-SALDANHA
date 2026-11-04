# Catálogo dos motions MB Saldanha

Gerado por `motor/gerar_catalogo.py`. Cada motion se pede pelo número. Os tempos são em segundos, contados a partir do `em`.
Texto: `*palavra*` vira faixa azul, `_palavra_` vira faixa vermelha (erro) e `|` quebra a linha.

## A. Academia e performance

### 01. Barra que carrega
Prévia: `previa-01.mp4`. Exemplo de spec: `exemplos/previa-01.json`.

- `em`: `0`
- `y`: `250`
- `titulo`: `"CARGA NA BARRA"`
- `kg_barra`: `20`
- `kg_anilha`: `20`
- `max_anilhas`: `4`
- `ate`: `null`
- `eventos`: `[[0.5, "carrega", 1], [1.4, "carrega", 1], [2.4, "cai", 1], [3.3, "carrega", 2]]`

### 02. Contador de repetições gigante
Prévia: `previa-02.mp4`. Exemplo de spec: `exemplos/previa-02.json`.

- `em`: `0`
- `reps`: `[0.4, 1.3, 2.2, 3.1, 4]`
- `frase`: `"*TÉCNICA*|ANTES DE CARGA"`
- `rotulo`: `"REPS"`
- `y`: `640`

### 03. Cronômetro de descanso
Prévia: `previa-03.mp4`. Exemplo de spec: `exemplos/previa-03.json`.

- `em`: `0`
- `dur`: `3`
- `segundos`: `60`
- `texto`: `"DESCANSO"`
- `sub`: `"RESPIRA E VOLTA"`
- `y`: `560`

### 04. Plano de treino na prancheta
Prévia: `previa-04.mp4`. Exemplo de spec: `exemplos/previa-04.json`.

- `em`: `0`
- `titulo`: `"TREINO DE HOJE"`
- `itens`: `["3X12 AGACHAMENTO", "3X10 REMADA CURVADA", "3X15 ELEVAÇÃO PÉLVICA"]`
- `escrever`: `[0.6, 1.3, 2]`
- `riscar`: `[2.9, 3.6, 4.3]`
- `x`: `40`
- `y`: `330`
- `sai`: `null`

### 05. Medidor de esforço (RPE)
Prévia: `previa-05.mp4`. Exemplo de spec: `exemplos/previa-05.json`.

- `em`: `0`
- `pontos`: `[[0.3, 2], [1.3, 5], [2.3, 7], [3.2, 9], [4.2, 10]]`
- `titulo`: `"ESFORÇO"`
- `x`: `880`
- `y`: `420`
- `altura`: `900`

### 06. Anilhas como tópicos
Prévia: `previa-06.mp4`. Exemplo de spec: `exemplos/previa-06.json`.

- `em`: `0`
- `dicas`: `[[0.3, "ABDÔMEN|TRAVADO"], [1.9, "BARRA|RENTE"], [3.5, "EMPURRE|O CHÃO"]]`
- `barra_y`: `250`
- `y`: `760`
- `segura`: `0.55`

### 07. Placar de evolução semana a semana
Prévia: `previa-07.mp4`. Exemplo de spec: `exemplos/previa-07.json`.

- `em`: `0`
- `titulo`: `"CARGA NO AGACHAMENTO"`
- `valores`: `[40, 55, 70, 90]`
- `rotulos`: `["SEM 1", "SEM 2", "SEM 3", "SEM 4"]`
- `unidade`: `"KG"`
- `frase`: `"*EVOLUÇÃO* É TREINO|COM MÉTODO"`
- `y`: `700`
- `passo`: `0.45`

### 08. Kit de equipamento da sala
Prévia: `previa-08.mp4`. Exemplo de spec: `exemplos/previa-08.json`.

- `em`: `0`
- `titulo`: `"NOSSA *SALA*"`
- `itens`: `["BARRA", "ANILHA", "MEDICINE BALL", "ESCADA", "MINI TRAMPOLIM", "FITA DE SUSPENSÃO"]`
- `revela`: `2.6`

### 09. Escada de agilidade desenhada no chão
Prévia: `previa-09.mp4`. Exemplo de spec: `exemplos/previa-09.json`.

- `em`: `0`
- `passos`: `[0.3, 0.6, 0.9, 1.2, 1.5, 1.8, 2.1, 2.4]`
- `degraus`: `8`
- `tempo_final`: `null`
- `x`: `540`
- `y`: `1520`
- `largura`: `380`
- `comprimento`: `1000`
- `angulo`: `64`
- `recorde`: `"NOVO|*RECORDE*"`

### 10. Batimento cardíaco
Prévia: `previa-10.mp4`. Exemplo de spec: `exemplos/previa-10.json`.

- `em`: `0`
- `dur`: `6`
- `bpm`: `[[0, 80], [1.5, 165], [4, 165], [5, 92]]`
- `y`: `1230`
- `janela`: `2.4`

## B. Erro x certo

### 11. Carimbo ERRADO / ASSIM
Prévia: `previa-11.mp4`. Exemplo de spec: `exemplos/previa-11.json`.

- `em`: `0`
- `carimbos`: `[[0.3, "ERRADO", "x", "COSTAS ARREDONDADAS"], [2.6, "ASSIM", "v", "COLUNA NEUTRA"]]`
- `y`: `760`
- `dura`: `1.9`
- `escurecer`: `0.3`

### 12. Rebobinar
Prévia: `previa-12.mp4`. Exemplo de spec: `exemplos/previa-12.json`.

- `em`: `0`
- `dur`: `1.4`
- `texto`: `"*VOLTA*|VAMOS DE NOVO"`
- `depois`: `"JEITO *CERTO*"`
- `y`: `760`

### 13. Placar ERRO x TÉCNICA
Prévia: `previa-13.mp4`. Exemplo de spec: `exemplos/previa-13.json`.

- `em`: `0`
- `esq`: `"ERRO"`
- `dir`: `"TÉCNICA"`
- `inicio_esq`: `0`
- `pontos`: `[[0.6, "BARRA RENTE"], [1.6, "COLUNA NEUTRA"], [2.6, "ABDÔMEN TRAVADO"], [3.6, "EMPURRE O CHÃO"]]`
- `y`: `250`

### 14. Lupa no detalhe
Prévia: `previa-14.mp4`. Exemplo de spec: `exemplos/previa-14.json`.

- `em`: `0`
- `x`: `540`
- `y`: `1150`
- `de`: `[880, 560]`
- `zoom`: `2.2`
- `raio`: `230`
- `etiqueta`: `"_JOELHO_|PARA DENTRO"`
- `tipo`: `"x"`
- `dur`: `2.6`
- `escurecer`: `0.4`
- `espelho`: `1`

### 15. Checklist que se preenche
Prévia: `previa-15.mp4`. Exemplo de spec: `exemplos/previa-15.json`.

- `em`: `0`
- `titulo`: `"CHECKLIST"`
- `itens`: `[[0.6, "BARRA RENTE"], [1.4, "COLUNA NEUTRA"], [2.2, "ABDÔMEN TRAVADO"], [3, "EMPURRE O CHÃO"]]`
- `x`: `50`
- `y`: `420`
- `sai`: `null`

### 16. Medidor "nota da técnica"
Prévia: `previa-16.mp4`. Exemplo de spec: `exemplos/previa-16.json`.

- `em`: `0`
- `errado`: `0.4`
- `certo`: `2.6`
- `nota_inicial`: `6`
- `nota_errada`: `3`
- `nota_certa`: `10`
- `texto`: `"TÉCNICA|DE *ATLETA*"`
- `alerta`: `"ALERTA"`
- `x`: `540`
- `y`: `300`
- `tam`: `600`

## C. Corpo e fisioterapia (Maria)

### 17. Mapa da dor com pontos pulsando
Prévia: `previa-17.mp4`. Exemplo de spec: `exemplos/previa-17.json`.

- `em`: `0`
- `regioes`: `[[0.5, "cervical", "CERVICAL"], [1.6, "ombro", "OMBRO"], [2.7, "lombar", "LOMBAR"], [3.8, "joelho", "JOELHO"]]`
- `lado`: `"esquerda"`
- `y`: `330`
- `escala`: `2.55`

### 18. Raio-X estilizado
Prévia: `previa-18.mp4`. Exemplo de spec: `exemplos/previa-18.json`.

- `em`: `0`
- `dur`: `3.2`
- `destaque`: `"L4-L5"`
- `rotulo`: `"DISCO|*L4-L5*"`
- `titulo`: `"COLUNA LOMBAR"`

### 19. Termômetro da dor 0 a 10
Prévia: `previa-19.mp4`. Exemplo de spec: `exemplos/previa-19.json`.

- `em`: `0`
- `titulo`: `"NÍVEL DE *DOR*"`
- `inicio`: `8`
- `fim`: `2`
- `de`: `0.6`
- `ate`: `4`
- `final`: `"*ALÍVIO*"`
- `y`: `300`

### 20. Antes e depois em deslizar
Prévia: `previa-20.mp4`. Exemplo de spec: `exemplos/previa-20.json`.

- `em`: `0`
- `troca`: `1.6`
- `dur`: `0.9`
- `antes`: `"ANTES"`
- `depois`: `"DEPOIS"`
- `extra`: `"depois"`

### 21. Casa segura em planta baixa
Prévia: `previa-21.mp4`. Exemplo de spec: `exemplos/previa-21.json`.

- `em`: `0`
- `dur`: `6`
- `titulo`: `"CASA *SEGURA*"`
- `riscos`: `[[1, "sala", "TAPETE SOLTO", 2], [1.8, "corredor", "DEGRAU SEM|SINALIZAÇÃO", 2.8], [2.6, "banheiro", "BANHEIRO|SEM BARRA", 3.6], [3.4, "quarto", "POUCA LUZ|À NOITE", 4.4]]`
- `cor_ok`: `"#1f66e5"`
- `sub`: `"ATENDIMENTO *DOMICILIAR*"`

### 22. Estalo de quiropraxia
Prévia: `previa-22.mp4`. Exemplo de spec: `exemplos/previa-22.json`.

- `em`: `0`
- `x`: `540`
- `y`: `760`
- `texto`: `"CREC!"`
- `pergunta`: `"MITO OU|*VERDADE?*"`
- `pergunta_em`: `1`
- `some`: `3`

### 23. Músculo que acende
Prévia: `previa-23.mp4`. Exemplo de spec: `exemplos/previa-23.json`.

- `em`: `0`
- `acende`: `[[0.4, "gluteo", "GLÚTEO|*MÉDIO*"], [2.4, "core", "*CORE*|ATIVADO"]]`
- `lado`: `"esquerda"`
- `y`: `300`
- `escala`: `4.3`

### 24. Linha do tempo da recuperação
Prévia: `previa-24.mp4`. Exemplo de spec: `exemplos/previa-24.json`.

- `em`: `0`
- `marcos`: `[[0.5, "SEMANA 1", "AVALIAÇÃO"], [1.9, "SEMANA 4", "MENOS DOR"], [3.3, "SEMANA 8", "DE VOLTA|AO TREINO"]]`
- `y`: `1080`
- `titulo`: `"RECUPERAÇÃO"`

## D. Texto e legenda

### 25. Palavra que bate com a voz
Prévia: `previa-25.mp4`. Exemplo de spec: `exemplos/previa-25.json`.

- `em`: `0`
- `palavras`: `[]`
- `y`: `1180`
- `por_linha`: `3`
- `tam`: `86`
- `tam_chave`: `170`

### 26. Texto atrás da pessoa
Prévia: `previa-26.mp4`. Exemplo de spec: `exemplos/previa-26.json`.

- `em`: `0`
- `dur`: `3`
- `texto`: `"FORÇA"`
- `y`: `560`
- `tam`: `260`
- `extra`: `"pessoa"`
- `cor`: `"#ffffff"`
- `contorno`: `false`

### 27. Máquina de escrever com cursor azul
Prévia: `previa-27.mp4`. Exemplo de spec: `exemplos/previa-27.json`.

- `em`: `0`
- `texto`: `"VOCÊ TREINA|HÁ ANOS *ERRADO*"`
- `vel`: `0.065`
- `y`: `760`
- `tam`: `96`
- `some`: `null`

### 28. Contagem regressiva do gancho
Prévia: `previa-28.mp4`. Exemplo de spec: `exemplos/previa-28.json`.

- `em`: `0`
- `numero`: `3`
- `texto`: `"ERROS QUE|*TRAVAM* SEU|AGACHAMENTO"`
- `canto_em`: `1.8`
- `trocas`: `[2.8, 4]`
- `y`: `330`

### 29. Pergunta e resposta em balões
Prévia: `previa-29.mp4`. Exemplo de spec: `exemplos/previa-29.json`.

- `em`: `0`
- `contato`: `"MARIA BEATRIZ"`
- `sub`: `"fisioterapeuta · online"`
- `mensagens`: `[[0.4, "p", "Doutora, é normal estalar quando eu mexo o pescoço?"], [2.2, "m", "Na maioria das vezes, sim! O estalo é gás saindo da articulação. Dor junto é que não é normal."]]`
- `digitando`: `0.9`
- `y`: `420`
- `hora`: `"19:42"`

### 30. Mito ou verdade com placa virando
Prévia: `previa-30.mp4`. Exemplo de spec: `exemplos/previa-30.json`.

- `em`: `0`
- `resultado`: `"MITO"`
- `giros`: `3`
- `dur`: `1.6`
- `explicacao`: `"O ESTALO|NÃO É *OSSO*"`
- `y`: `560`

## E. Transições e câmera

### 31. Passada azul entre cortes
Prévia: `previa-31.mp4`. Exemplo de spec: `exemplos/previa-31.json`.

- `em`: `0`
- `cortes`: `[2]`
- `punch`: `1.12`

### 32. Zoom de impacto no ponto alto
Prévia: `previa-32.mp4`. Exemplo de spec: `exemplos/previa-32.json`.

- `em`: `0`
- `picos`: `[[1, 540, 760]]`
- `forca`: `1.12`
- `volta`: `0.55`

### 33. Câmera lenta com rastro (o rastro vem da peça "eco" no spec)
Prévia: `previa-33.mp4`. Exemplo de spec: `exemplos/previa-33.json`.

- `em`: `0`
- `ate`: `2.5`
- `texto`: `"CÂMERA LENTA"`
- `vel`: `"0.3X"`

### 34. Congelar e girar o card (o fundo precisa estar congelado no spec)
Prévia: `previa-34.mp4`. Exemplo de spec: `exemplos/previa-34.json`.

- `em`: `0`
- `dur`: `2.8`
- `titulo`: `"DICA DO PERSONAL"`
- `dica`: `"*ABDÔMEN*|TRAVADO"`
- `sub`: `"ANTES DE TIRAR|A BARRA DO CHÃO"`
- `espelho`: `1`

### 35. Corte no ritmo da música (os cortes vêm da peça "ritmo" no spec)
Prévia: `previa-35.mp4`. Exemplo de spec: `exemplos/previa-35.json`.

- `em`: `0`
- `bpm`: `120`
- `ate`: `null`
- `passada_cada`: `4`
- `pulso`: `1.035`
- `logo_final`: `1.4`

## F. Séries e app X1

### 36. React do Ullisses com rosto no círculo
Prévia: `previa-36.mp4`. Exemplo de spec: `exemplos/previa-36.json`.

- `em`: `0`
- `extra`: `"rosto"`
- `nome`: `"ULLISSES REAGE"`
- `foco`: `"50% 50%"`
- `olha_em`: `1.6`
- `olha`: `"OLHA AQUI"`
- `lupa`: `{"x": 560, "y": 1000, "de": [860, 1400], "zoom": 2.1, "raio": 210, "etiqueta": "_COSTAS_|ARREDONDADAS", "tipo": "x", "dur": 2.4}`
- `x`: `690`
- `y`: `240`
- `tam`: `330`

### 37. Desafio da flexão com barra de progresso
Prévia: `previa-37.mp4`. Exemplo de spec: `exemplos/previa-37.json`.

- `em`: `0`
- `meta`: `50`
- `de`: `0.4`
- `ate`: `4.6`
- `reps`: `null`
- `titulo`: `"DESAFIO|*50 FLEXÕES*"`
- `final`: `"BAIXE O|APP *X1*"`
- `cta`: `"LINK NA BIO"`
- `final_dur`: `2`
- `cores_app`: `false`

### 38. Tela de celular do app
Prévia: `previa-38.mp4`. Exemplo de spec: `exemplos/previa-38.json`.

- `em`: `0`
- `reps`: `[0.9, 1.5, 2.1, 2.7, 3.3, 3.9]`
- `meta`: `20`
- `inicio`: `0`
- `x`: `700`
- `y`: `170`
- `escala`: `0.8`
- `nome_app`: `"X1"`
- `tema`: `"mb"`
- `sai`: `null`

### 39. Bastidores com etiquetas
Prévia: `previa-39.mp4`. Exemplo de spec: `exemplos/previa-39.json`.

- `em`: `0`
- `etiquetas`: `[[0.4, 300, 1150, "MINI TRAMPOLIM", "EXPLOSÃO E EQUILÍBRIO"], [1.9, 760, 760, "ESPALDAR", "MOBILIDADE E FORÇA"]]`
- `dur_cada`: `2.2`

### 40. Fechamento padrão com assinatura
Prévia: `previa-40.mp4`. Exemplo de spec: `exemplos/previa-40.json`.

- `em`: `0`
- `dur`: `3.2`
- `frase`: `"TÉCNICA É|*PERFORMANCE*"`
- `botao`: `"AGENDE SEU TREINO"`
- `sub`: `"CENTRO DE ALTA PERFORMANCE · MB SALDANHA"`
- `domiciliar`: `false`

## G. Série com história (vilões)

### 41. Vilão entra em cena
Exemplo: episódio completo em `exemplos/ep1-gordurinha.json` (prévia `2026-11-04-ep1-gordurinha-ullisses.mp4`).

- `em`: `0`
- `vilao`: `"gordurinha"`
- `alvo`: `"v"`
- `x`: `800`
- `y`: `1560`
- `tam`: `340`
- `entrada`: `"cai"`
- `lado`: `"esq"`
- `olhar`: `"esq"`
- `falas`: `[[0.7, "HOJE VOCÊ|NÃO TREINA!", 1.8]]`
- `vida`: `100`
- `ate`: `null`
- `kg`: `20`

### 42. Barra de vida do vilão
Exemplo: episódio completo em `exemplos/ep1-gordurinha.json` (prévia `2026-11-04-ep1-gordurinha-ullisses.mp4`).

- `em`: `0`
- `alvo`: `"v"`
- `nome`: `null`
- `y`: `200`
- `episodio`: `""`

### 43. Golpe da espada azul
Exemplo: episódio completo em `exemplos/ep1-gordurinha.json` (prévia `2026-11-04-ep1-gordurinha-ullisses.mp4`).

- `em`: `0`
- `alvo`: `"v"`
- `angulo`: `-24`
- `dano`: `"tudo"`
- `nome`: `"EXERCÍCIO *CERTO*"`
- `mostra`: `0.9`

### 44. Martelo de anilha (uma anilha cai no vilão a cada repetição)
Exemplo: episódio completo em `exemplos/ep1-gordurinha.json` (prévia `2026-11-04-ep1-gordurinha-ullisses.mp4`).

- `em`: `0`
- `alvo`: `"v"`
- `golpes`: `[0, 1.2, 2.4, 3.6, 4.8]`
- `dano`: `20`

### 45. Vilão recupera vida (quando a pessoa erra)
Exemplo: episódio completo em `exemplos/ep1-gordurinha.json` (prévia `2026-11-04-ep1-gordurinha-ullisses.mp4`).

- `em`: `0`
- `alvo`: `"v"`
- `cura`: `20`
- `carimbo`: `true`
- `legenda`: `""`
- `y`: `760`

### 46. Placa VILÃO DERROTADO
Exemplo: episódio completo em `exemplos/ep1-gordurinha.json` (prévia `2026-11-04-ep1-gordurinha-ullisses.mp4`).

- `em`: `0`
- `dur`: `3`
- `titulo`: `"VILÃO|*DERROTADO*"`
- `estrelas`: `3`
- `xp`: `150`
- `licao`: `"CADA REPETIÇÃO|*CERTA* É UM GOLPE"`
- `y`: `520`

### 47. Mapa da jornada (vilões vencidos e o próximo)
Exemplo: episódio completo em `exemplos/ep1-gordurinha.json` (prévia `2026-11-04-ep1-gordurinha-ullisses.mp4`).

- `em`: `0`
- `dur`: `3.4`
- `titulo`: `"A *JORNADA*"`
- `viloes`: `["gordurinha", "preguica", "plato", "dor", "torta", "desculpinha"]`
- `vencidos`: `1`
- `legenda`: `"PRÓXIMO VILÃO"`

### 48. Dor grudada num ponto do vídeo congelado (sem rastreio)
Exemplo: episódio completo em `exemplos/ep1-gordurinha.json` (prévia `2026-11-04-ep1-gordurinha-ullisses.mp4`).

- `em`: `0`
- `x`: `600`
- `y`: `1150`
- `tam`: `210`
- `regiao`: `"LOMBAR"`
- `alvo`: `"dor"`
- `lado`: `"esq"`
- `falas`: `[[0.7, "ESSA LOMBAR|É MINHA!", 1.8]]`
- `ate`: `null`
