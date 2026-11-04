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

> palavras: [[inicio, fim, "palavra"], ...] em segundos a partir de "em" (use motor/transcrever.py para gerar).
>
> Palavra entre *asteriscos* = palavra-chave (sozinha, gigante, faixa azul).

- `em`: `0`
- `palavras`: `[]`
- `y`: `1180`
- `por_linha`: `3`
- `tam`: `86`
- `tam_chave`: `170`

### 26. Texto atrás da pessoa
Prévia: `previa-26.mp4`. Exemplo de spec: `exemplos/previa-26.json`.

> precisa de um extra com "recorte": true (pessoa sem fundo) com o mesmo trecho do vídeo de fundo.

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

> extra "rosto" = vídeo do Ullisses comentando; o fundo deve estar congelado no spec a partir de olha_em.

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

## G. Chamadas e identidade (linha premium)

### 41. Botão que é tocado (salvar, enviar, curtir, comentar, seguir ou "Agende sua avaliação")
Prévia: `previa-41.mp4`. Exemplo de spec: `exemplos/previa-41.json`.

- `em`: `0`
- `dur`: `3.8`
- `acao`: `"salvar"`
- `texto`: `null`
- `rotulo`: `null`
- `aviso`: `null`
- `y`: `1230`
- `toque_em`: `1.55`
- `botao`: `"AGENDE SUA AVALIAÇÃO"`
- `contatos`: `["A", "J", "M"]`

### 42. Comenta a palavra (ou marca o amigo)
Prévia: `previa-42.mp4`. Exemplo de spec: `exemplos/previa-42.json`.

- `em`: `0`
- `dur`: `4.4`
- `modo`: `"palavra"`
- `palavra`: `"CORE"`
- `titulo`: `null`
- `sub`: `"QUE EU TE MANDO O TREINO COMPLETO"`
- `perfis`: `["@parceiro.de.treino", "@ana.corre", "@joao_supino"]`
- `escolhe`: `0`
- `usuario`: `"@voce"`
- `y`: `1400`

### 43. Crachá com nome e registro
Prévia: `previa-43.mp4`. Exemplo de spec: `exemplos/previa-43.json`.

- `em`: `0`
- `dur`: `3.8`
- `cargo`: `"FISIOTERAPEUTA"`
- `nome`: `"MARIA BEATRIZ"`
- `registro`: `"CREFITO-3 381260/F"`
- `indice`: `"MB/01"`
- `x`: `60`
- `y`: `1150`
- `largura`: `800`

### 44. Resposta a comentário
Prévia: `previa-44.mp4`. Exemplo de spec: `exemplos/previa-44.json`.

- `em`: `0`
- `dur`: `4.2`
- `rotulo`: `"RESPONDENDO A"`
- `usuario`: `"@joana.treina"`
- `pergunta`: `"Joelho pode passar da ponta do pé?"`
- `y`: `170`
- `largura`: `860`
- `fica`: `true`
- `canto_em`: `2.6`

### 45. Enquete na tela
Prévia: `previa-45.mp4`. Exemplo de spec: `exemplos/previa-45.json`.

- `em`: `0`
- `dur`: `4.8`
- `rotulo`: `"ENQUETE"`
- `pergunta`: `"QUAL VOCÊ *CONSEGUE*?"`
- `opcoes`: `["FÁCIL", "DIFÍCIL"]`
- `porcentagens`: `[41, 59]`
- `escolha`: `1`
- `toque_em`: `1.6`
- `y`: `1040`

## H. Dados com fonte (linha premium)

### 46. Card do estudo com a fonte
Prévia: `previa-46.mp4`. Exemplo de spec: `exemplos/previa-46.json`.

- `em`: `0`
- `dur`: `5.8`
- `rotulo`: `"ESTUDO · JAMA NETWORK OPEN · 2019"`
- `pagina`: `null`
- `titulo`: `"QUEM FAZ MAIS DE|*40 FLEXÕES* TEM"`
- `numero`: `"96"`
- `prefixo`: `""`
- `sufixo`: `"%"`
- `legenda`: `"MENOS RISCO DE PROBLEMA|NO *CORAÇÃO*"`
- `nota`: `"EM COMPARAÇÃO COM QUEM FAZ MENOS DE 10"`
- `chips`: `[["ACOMPANHOU", "10 ANOS"], ["PESSOAS", "1.104"], ["QUEM", "BOMBEIROS"]]`
- `fonte`: `"YANG ET AL. · HARVARD · 2019"`
- `y`: `470`
- `veu`: `true`

### 47. Barras que comparam
Prévia: `previa-47.mp4`. Exemplo de spec: `exemplos/previa-47.json`.

> itens: [rótulo, valor, texto mostrado (opcional), destaque (true/false)]

- `em`: `0`
- `dur`: `5.4`
- `rotulo`: `"ESTUDO COM 1.104 BOMBEIROS"`
- `pagina`: `null`
- `titulo`: `"RISCO DE PROBLEMA|NO *CORAÇÃO*"`
- `itens`: `[["MENOS DE 10 FLEXÕES", 100, "100", false], ["MAIS DE 40 FLEXÕES", 4, "4", true]]`
- `nota`: `"RISCO RELATIVO · MENOS DE 10 FLEXÕES = 100"`
- `fonte`: `"YANG ET AL. · JAMA NETWORK OPEN · 2019"`
- `y`: `600`
- `veu`: `true`

### 48. Anel de porcentagem
Prévia: `previa-48.mp4`. Exemplo de spec: `exemplos/previa-48.json`.

- `em`: `0`
- `dur`: `5.4`
- `rotulo`: `"OMS · 65 ANOS OU MAIS"`
- `prefixo`: `"ATÉ"`
- `valor`: `35`
- `sufixo`: `"%"`
- `legenda`: `"DOS IDOSOS CAEM|PELO MENOS *1 VEZ POR ANO*"`
- `fracao`: `[1, 3]`
- `fracao_texto`: `"QUASE 1 EM CADA 3"`
- `fonte`: `"OMS · RELATÓRIO GLOBAL SOBRE QUEDAS DE IDOSOS · 2007"`
- `y`: `400`
- `veu`: `true`

### 49. Gráfico de linhas
Prévia: `previa-49.mp4`. Exemplo de spec: `exemplos/previa-49.json`.

> series: [{nome, cor: "azul"|"erro", pontos: [valores de 0 a 100 no eixo y, um por rótulo do eixo x]}]

- `em`: `0`
- `dur`: `5.6`
- `rotulo`: `"DOR NAS COSTAS"`
- `pagina`: `null`
- `titulo`: `"PARAR *NÃO* É|TRATAMENTO"`
- `eixo_y`: `"DOR"`
- `eixo_x`: `["DIA 1", "SEMANA 1", "SEMANA 2", "SEMANA 3"]`
- `series`: `[{"nome": "REPOUSO", "cor": "erro", "pontos": [55, 62, 70, 76]}, {"nome": "MOVIMENTO", "cor": "azul", "pontos": [55, 40, 26, 15]}]`
- `nota`: `"ESQUEMA ILUSTRATIVO"`
- `fonte`: `null`
- `y`: `540`
- `veu`: `true`

### 50. Conta que se resolve
Prévia: `previa-50.mp4`. Exemplo de spec: `exemplos/previa-50.json`.

> a ÷ b = resultado%, compara com o limite e mostra o veredito num selo de linha fina.

- `em`: `0`
- `dur`: `6`
- `rotulo`: `"TESTE DE SALTO · UMA PERNA"`
- `pagina`: `null`
- `a`: `"1,62"`
- `b`: `"1,90"`
- `unidade`: `"M"`
- `op`: `"÷"`
- `resultado`: `85`
- `sufixo`: `"%"`
- `rotulos`: `["PERNA DA LESÃO", "PERNA BOA"]`
- `limite`: `90`
- `sim`: `"PRONTO PRA VOLTAR"`
- `nao`: `"AINDA NÃO"`
- `fonte`: `null`
- `y`: `540`
- `veu`: `true`

## I. Desenho na tela (linha premium)

### 51. Caneta na tela
Prévia: `previa-51.mp4`. Exemplo de spec: `exemplos/previa-51.json`.

> marcas: {tipo: "circulo"|"x"|"seta"|"curva"|"linha", cor: "branco"|"erro"|"azul", rotulo, rot: [x, y] (canto da etiqueta)}
>
> circulo: x, y, r | x: x, y, tam | seta: de, para, curva | curva: pontos [[x,y]...] | linha: de, para (ou pontos); tracejada: true
>
> O fundo precisa estar congelado no spec ({"tipo": "congela"}) durante o motion.

- `em`: `0`
- `dur`: `6.6`
- `selo`: `"ANÁLISE · TÉCNICA"`
- `veu`: `0.18`
- `zoom`: `1.03`
- `cinza`: `0.72`
- `numerar`: `true`
- `marcas`: `[{"tipo": "circulo", "x": 690, "y": 835, "r": 135, "cor": "erro", "rotulo": "COSTAS ARREDONDADAS", "rot": [90, 560]}, {"tipo": "x", "x": 690, "y": 1215, "tam": 46, "cor": "erro", "rotulo": "PERNAS TRAVADAS", "rot": [90, 1300]}, {"tipo": "linha", "de": [470, 940], "para": [905, 850], "tracejada": true, "cor": "azul", "rotulo": "COSTAS RETAS", "rot": [96, 1040]}, {"tipo": "seta", "de": [790, 1000], "para": [1035, 1010], "curva": -0.32, "cor": "azul", "rotulo": "QUADRIL PARA TRÁS", "rot": [560, 1110]}]`

### 52. Transferidor de ângulo
Prévia: `previa-52.mp4`. Exemplo de spec: `exemplos/previa-52.json`.

> vertice: onde o ângulo abre; ref: ponto da linha de referência (ex.: chão); ponto: ponto da linha medida.
>
> O ângulo mostrado é calculado pelos pontos (o desenho bate com o número). "ideal" desenha a linha da meta.
>
> Meça os pontos num quadro do vídeo com grade (snapshot) e deixe o fundo congelado no spec durante o motion.

- `em`: `0`
- `dur`: `5.2`
- `vertice`: `[830, 1060]`
- `ref`: `[430, 1060]`
- `ponto`: `[450, 880]`
- `raio`: `230`
- `rotulo`: `"ÂNGULO DO TRONCO"`
- `valor`: `null`
- `ideal`: `null`
- `ideal_texto`: `"IDEAL"`
- `numero_em`: `null`
- `selo`: `"ANÁLISE · ÂNGULO"`
- `veu`: `0.2`
- `zoom`: `1.03`
- `cinza`: `0.72`

### 53. Palavra riscada
Prévia: `previa-53.mp4`. Exemplo de spec: `exemplos/previa-53.json`.

> A frase errada (fina) é riscada em vermelho e fica apagada; a certa sobe na faixa azul da MB.

- `em`: `0`
- `dur`: `4.6`
- `antes`: `"NÃO É"`
- `errada`: `"COISA DA IDADE"`
- `certa`: `"FORÇA + EQUILÍBRIO"`
- `nota`: `"E ISSO SE TRABALHA"`
- `y`: `700`
- `tam`: `112`

### 54. Fita métrica
Prévia: `previa-54.mp4`. Exemplo de spec: `exemplos/previa-54.json`.

> medidas: [[rótulo, valor em metros], ...] (a primeira é a referência). A fita desenrola até a medida e compara.

- `em`: `0`
- `dur`: `5.8`
- `rotulo`: `"SALTO EM UMA PERNA"`
- `medidas`: `[["PERNA BOA", 1.9], ["PERNA DA LESÃO", 1.62]]`
- `unidade`: `"M"`
- `escala`: `2`
- `diferenca`: `true`
- `y`: `1020`

### 55. Mapa com pino
Prévia: `previa-55.mp4`. Exemplo de spec: `exemplos/previa-55.json`.

> Mapa desenhado (ruas finas, avenidas e o ribeirão), o raio de atendimento abre a partir da MB,
>
> o pino cai na casa do paciente e o caminho se desenha até lá.

- `em`: `0`
- `dur`: `6.4`
- `rotulo`: `"RIBEIRÃO PRETO · SP"`
- `titulo`: `"A FISIOTERAPIA|*VAI ATÉ VOCÊ*"`
- `origem`: `"MB SALDANHA"`
- `pino`: `"SUA CASA"`
- `raio_texto`: `"ATENDIMENTO DOMICILIAR"`
- `y`: `300`

## J. Formatos que viralizam (linha premium)

### 56. Legenda que acompanha a voz
Prévia: `previa-56.mp4`. Exemplo de spec: `exemplos/previa-56.json`.

> A frase inteira fica na tela; a faixa azul anda de palavra em palavra junto com a fala.
>
> tempos: segundo (a partir do "em") em que cada palavra começa; gere com motor/transcrever.py --formato 56.
>
> Sem tempos, as palavras são distribuídas pelo tamanho. Frase longa: divida em dois motions 56 seguidos.

- `em`: `0`
- `dur`: `3.2`
- `frase`: `"BARRA RENTE AO CORPO"`
- `tempos`: `null`
- `y`: `1250`
- `tam`: `64`

### 57. Em vez disso / Faça assim
Prévia: `previa-57.mp4`. Exemplo de spec: `exemplos/previa-57.json`.

> O trecho do erro fica em preto e branco com o X; a passada azul cobre o corte; o certo volta em cores com o ✓.
>
> O spec precisa ter o corte do erro para o certo no segundo "troca_em" (contado a partir do "em").

- `em`: `0`
- `dur`: `7`
- `troca_em`: `3.4`
- `rotulo_erro`: `"EM VEZ DISSO"`
- `erro`: `"PUXAR COM|AS *COSTAS*"`
- `rotulo_certo`: `"FAÇA ASSIM"`
- `certo`: `"EMPURRE|O *CHÃO*"`
- `y`: `250`

### 58. Cards com o clipe dentro
Prévia: `previa-58.mp4`. Exemplo de spec: `exemplos/previa-58.json`.

> cards: [[rótulo, título, começa em (s, a partir do "em"), segundos do cronômetro (opcional)], ...]
>
> O vídeo encolhe para dentro de um cartão (o fundo vira o mesmo vídeo desfocado) e volta a tela cheia no fim.

- `em`: `0`
- `dur`: `8`
- `espelho`: `1`
- `y`: `250`
- `cards`: `[["SEMANA 1", "5 FLEXÕES|*POR DIA*", 0, 0], ["SEMANA 2", "10 FLEXÕES|*POR DIA*", 2.6, 0], ["SEMANA 3", "3 SÉRIES|*DE 8*", 5, 0]]`

### 59. Cadência da repetição
Prévia: `previa-59.mp4`. Exemplo de spec: `exemplos/previa-59.json`.

> fases: [[nome, segundos], ...]. O cursor anda em tempo real, conta os segundos e bipa a cada um.

- `em`: `0`
- `dur`: `6`
- `fases`: `[["DESCE", 3], ["SEGURA", 1], ["SOBE", 1]]`
- `reps`: `1`
- `rotulo`: `"CADÊNCIA 3 · 1 · 1"`
- `inicio`: `0.5`
- `y`: `1150`

### 60. Barra de capítulos
Prévia: `previa-60.mp4`. Exemplo de spec: `exemplos/previa-60.json`.

> capitulos: [[rótulo curto, título, começa em (s, a partir do "em")], ...]. A barra enche durante o vídeo.

- `em`: `0`
- `dur`: `9`
- `y`: `236`
- `titulo_y`: `330`
- `capitulos`: `[["ERRO 1", "QUADRIL|*CAINDO*", 0], ["ERRO 2", "COTOVELO|*ABERTO*", 3], ["ERRO 3", "MEIA|*DESCIDA*", 6]]`

## K. Refeitos na linha premium (mapa da dor, raio-X e React)

### 62. Mapa da dor (premium)
Prévia: `previa-62.mp4`. Exemplo de spec: `exemplos/previa-62.json`.

> Cartão com o corpo de frente e de costas em traço fino. Cada região acende em vermelho, com ponto que
>
> respira e o nome embaixo (dois pesos); a anterior fica marcada mais fraca, e no fim o mapa mostra tudo.
>
> regioes: [segundo, chave, nome, detalhe, lado]. chave: cervical, ombro, toracica, lombar, quadril, gluteo,
>
> joelho, tornozelo, punho, cotovelo, abdomen, posterior, panturrilha, quadriceps, peitoral, trapezio.
>
> lado (opcional): "direito" ou "esquerdo" (do paciente) para marcar um lado só. nome aceita *forte*.

- `em`: `0`
- `dur`: `6.6`
- `rotulo`: `"MAPA DA DOR"`
- `titulo`: `"ONDE *DÓI?*"`
- `y`: `370`
- `veu`: `0.42`
- `regioes`: `[[1.5, "cervical", "*CERVICAL*", "TENSÃO NO PESCOÇO"], [3, "lombar", "*LOMBAR*", "DOR AO FICAR SENTADO"], [4.5, "joelho", "*JOELHO* DIREITO", "DOR AO SUBIR ESCADA", "direito"]]`

### 63. Raio-X (premium)
Prévia: `previa-63.mp4`. Exemplo de spec: `exemplos/previa-63.json`.

> A tela vira um visor de imagem (marinho fosco, grade fina, cantos de visor). A linha de leitura desce e
>
> revela a coluna em vista lateral, em traço fino; o disco em destaque fica vermelho, com a hérnia saindo
>
> para trás, e a etiqueta do achado entra do lado. Sempre com "ESQUEMA ILUSTRATIVO" (não é exame de verdade).
>
> vertebras: nomes de cima para baixo; o último é o sacro. destaque: "L4-L5" (disco) ou "L4" (vértebra).

- `em`: `0`
- `dur`: `5.8`
- `rotulo`: `"IMAGEM · VISTA LATERAL"`
- `indice`: `"RX / 01"`
- `titulo`: `"COLUNA *LOMBAR*"`
- `vertebras`: `["T12", "L1", "L2", "L3", "L4", "L5", "S1"]`
- `destaque`: `"L4-L5"`
- `achado`: `"ACHADO 01"`
- `nome`: `"DISCO *L4–L5*"`
- `nota`: `"PONTO DE|ATENÇÃO"`
- `rodape`: `"ESQUEMA ILUSTRATIVO"`
- `hernia`: `true`

### 64. React do Ullisses (premium)
Prévia: `previa-64.mp4`. Exemplo de spec: `exemplos/previa-64.json`.

> O rosto dele entra num círculo no canto (sempre centralizado: o montar.py recorta o rosto no meio),
>
> com aro fino, um arco azul-claro que gira devagar e o crachá com o nome; as barrinhas mexem enquanto
>
> ele fala. Em "olha_em" o vídeo congela e a caneta (motion 51) desenha as marcas. O spec precisa do extra
>
> "rosto" (com som) e do fundo congelado ({"tipo": "congela"}) a partir de olha_em.
>
> Deixe as marcas fora do canto do rosto (x de 640 a 1040, y de 200 a 700).

- `em`: `0`
- `dur`: `null`
- `extra`: `"rosto"`
- `nome`: `"ULLISSES"`
- `cargo`: `"REACT · PERSONAL"`
- `x`: `678`
- `y`: `236`
- `tam`: `330`
- `fala`: `true`
- `olha_em`: `1.6`
- `selo`: `"PAUSA · ANÁLISE"`
- `veu`: `0.18`
- `zoom`: `1.03`
- `cinza`: `0.72`
- `marcas`: `[{"tipo": "circulo", "x": 720, "y": 845, "r": 140, "cor": "erro", "rotulo": "COSTAS ARREDONDADAS", "rot": [72, 600]}, {"tipo": "x", "x": 735, "y": 1190, "tam": 40, "cor": "erro", "rotulo": "PERNAS TRAVADAS", "rot": [72, 1300]}]`

## L. Linha premium (amostra de estilo: amostras-estilo/amostra-premium.mp4)

### lux-cracha. nome em placa de vidro marinho, com a coluna do logo como emblema
Aparece na amostra do grupo. Spec da amostra: `exemplos/amostra-premium.json`.

- `em`: `0`
- `dur`: `5`
- `nome`: `"ULLISSES"`
- `cargo`: `"PERSONAL TRAINER"`
- `marca`: `"MB SALDANHA · PERFORMANCE"`
- `x`: `56`
- `y`: `1250`
- `w`: `760`

### lux-frase. frase de efeito com o vídeo congelado: véu marinho, coluna do logo e dois pesos
Aparece na amostra do grupo. Spec da amostra: `exemplos/amostra-premium.json`.

- `em`: `0`
- `dur`: `3.4`
- `rotulo`: `"PRINCÍPIO 01"`
- `texto`: `"A FORÇA|VEM DO|*QUADRIL.*"`
- `y`: `760`
- `tam`: `140`
- `veu`: `0.52`
- `zoom`: `1.06`

### lux-grade. acabamento de cinema: vinheta, contraste leve e aproximação lenta da câmera
Aparece na amostra do grupo. Spec da amostra: `exemplos/amostra-premium.json`.

- `em`: `0`
- `dur`: `10`
- `vinheta`: `0.36`
- `contraste`: `1.04`
- `saturacao`: `0.96`
- `empurra`: `[]`
- `zoom`: `1.035`

### lux-passagem. troca de cena com aproximação e desfoque rápidos (o corte fica no meio)
Aparece na amostra do grupo. Spec da amostra: `exemplos/amostra-premium.json`.

- `em`: `0`
- `forca`: `1.1`
- `desfoque`: `10`

### lux-reps. contador de repetições em número fino (odômetro) + dica que troca a cada repetição
Aparece na amostra do grupo. Spec da amostra: `exemplos/amostra-premium.json`.

- `em`: `0`
- `dur`: `10`
- `entra`: `0`
- `reps`: `[1, 2, 3, 4]`
- `total`: `null`
- `rotulo`: `"REPETIÇÕES"`
- `dicas`: `["COLUNA NEUTRA", "BARRA COLADA NA PERNA", "EMPURRE O CHÃO", "CONTRAIA O GLÚTEO NO TOPO"]`
- `rotulo_dica`: `"DICA"`
- `x`: `72`
- `y`: `236`
- `largura`: `470`
- `tam`: `200`

### lux-salvar. chamada para salvar: marcador desenhado em traço fino que se preenche
Aparece na amostra do grupo. Spec da amostra: `exemplos/amostra-premium.json`.

- `em`: `0`
- `dur`: `4`
- `rotulo`: `"GUARDE ESTE TREINO"`
- `feito`: `"SALVO"`
- `verbo`: `"SALVE"`
- `resto`: `"PARA O PRÓXIMO TREINO"`
- `y`: `1230`
- `w`: `880`
- `sai`: `false`

### lux-titulo. abertura editorial: índice, linha fina e título em dois pesos
Aparece na amostra do grupo. Spec da amostra: `exemplos/amostra-premium.json`.

- `em`: `0`
- `dur`: `3`
- `indice`: `"01"`
- `rotulo`: `"MB SALDANHA · PERFORMANCE"`
- `titulo`: `"LEVANTAMENTO|*TERRA*"`
- `sub`: `""`
- `x`: `72`
- `y`: `236`
- `largura`: `936`
- `tam`: `120`

### lux-veu. escurecimento suave atrás do texto (topo, base, esquerda ou tela toda)
Aparece na amostra do grupo. Spec da amostra: `exemplos/amostra-premium.json`.

- `em`: `0`
- `dur`: `4`
- `lado`: `"topo"`
- `forca`: `0.66`
- `tamanho`: `760`

## P. Pixel art (amostra de estilo: amostras-estilo/amostra-pixel.mp4)

### px-corte. transição em blocos de pixel
Aparece na amostra do grupo. Spec da amostra: `exemplos/amostra-pixel.json`.

- `em`: `0`
- `tam`: `90`
- `dur`: `0.36`
- `cor`: `"#0a1b3f"`

### px-dialogo. caixa de diálogo de RPG
Aparece na amostra do grupo. Spec da amostra: `exemplos/amostra-pixel.json`.

- `em`: `0`
- `dur`: `5`
- `nome`: `"ULLISSES"`
- `texto`: `"COLUNA RETA E *FORÇA NO QUADRIL*."`
- `vel`: `0.035`
- `y`: `1290`
- `altura`: `340`

### px-fase. FASE 1 · PRONTO? VAI!
Aparece na amostra do grupo. Spec da amostra: `exemplos/amostra-pixel.json`.

- `em`: `0`
- `fase`: `"FASE 1"`
- `nome`: `"LEVANTAMENTO TERRA"`
- `pronto`: `"PRONTO?"`
- `vai`: `"VAI!"`
- `y`: `700`

### px-luta. vilão em pixel com barra de vida
Aparece na amostra do grupo. Spec da amostra: `exemplos/amostra-pixel.json`.

> golpes: segundos (a partir de "em") de cada repetição certa. Cada golpe tira "dano" da vida.

- `em`: `0`
- `dur`: `9`
- `golpes`: `[1, 2, 3, 4]`
- `dano`: `25`
- `vida`: `100`
- `nome`: `"GORDURINHA"`
- `nivel`: `3`
- `x`: `812`
- `y`: `128`
- `u`: `10`

### px-salvar. disquete: JOGO SALVO
Aparece na amostra do grupo. Spec da amostra: `exemplos/amostra-pixel.json`.

- `em`: `0`
- `dur`: `4`
- `texto`: `"SALVA PRO|PRÓXIMO TREINO"`
- `y`: `1260`
- `salvando`: `"SALVANDO"`
- `salvo`: `"JOGO SALVO!"`

### px-xp. barra de XP do aluno e LEVEL UP
Aparece na amostra do grupo. Spec da amostra: `exemplos/amostra-pixel.json`.

- `em`: `0`
- `dur`: `10`
- `reps`: `[1, 2, 3, 4]`
- `xp`: `25`
- `xp_max`: `100`
- `nome`: `"ULLISSES"`
- `nivel`: `7`
- `sobe_em`: `null`
- `y`: `1470`
