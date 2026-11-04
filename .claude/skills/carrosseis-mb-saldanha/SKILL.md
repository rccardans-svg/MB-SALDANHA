---
name: carrosseis-mb-saldanha
description: Use para criar ou refazer carrosséis do Instagram da MB Saldanha (@mbsaldanha.fisio). Todo carrossel parte de referências reais (viral, estudo ou fonte oficial), nunca de ideia tirada da cabeça.
---

# Carrosséis MB Saldanha

Responda sempre em português. Antes, passe pelo maestro (`maestro-mb-saldanha`) e leia a memória do projeto.

## Regra número 1: sempre partir de referência
O Paulo pediu em 04/11/2026: "preciso que sempre use referências para fazer, não faça por conta, pois fica muito genérico". Então:

1. **Antes de escrever qualquer lâmina, junte as referências.** Cada carrossel precisa de pelo menos:
   - **Uma referência de conteúdo ou formato real**: um post ou vídeo viral de conta grande de fisio, saúde ou performance (The Prehab Guys, E3 Rehab, Squat University, @kneesovertoesguy, Peter Attia etc.), um material oficial (CDC, OMS) ou um infográfico muito compartilhado (ex.: O'Sullivan, BJSM 2020).
   - **Uma fonte para cada número ou afirmação forte** (estudo, órgão oficial ou o site da Maria). Sem fonte, não entra número.
   - **A referência visual** (abaixo).
2. **Não dá para raspar o Instagram** (bloqueado no ambiente). Use busca na web, páginas das próprias contas, PubMed/PMC, sites oficiais e os prints que o Paulo mandar (ficam em `referencia/virais/` no repo e em `/mnt/project-files/referencia/virais/`).
3. **Escreva as referências no topo do arquivo do deck** (comentário) e no `legendas-e-referencias.md` da entrega, e **mostre as referências ao Paulo** junto com o carrossel.
4. Se faltar dado real (ex.: lista de cursos da Maria), **pergunte ao Paulo**. Nunca invente.
5. Confira coerência entre carrosséis (ex.: o de 17/11 diz que "core fraco não causa dor"; o dos Big 3 fala em resistência do tronco, não em core fraco).

## Referência visual (aprovada como direção em 04/11/2026)
Os prints que o Paulo mandou: carrossel editorial do @eulucasduty ("O Claude escreve suas notas") e a LBK MAG do @leobeckerdesign. Adaptado ao azul do Insta da Maria = **linha editorial premium**, a mesma família dos motions premium:
- Fundo marinho #08142F com grade fina; foto real do consultório com tinta azul (multiply) e degradê.
- Topo: traço royal + etiqueta em JetBrains Mono caixa alta ("MB SALDANHA · DOMICILIAR") e contador "03 / 08".
- Foto em moldura fina de revista, com selo mono pendurado ("MITO", "CONTROLE").
- Título Montserrat 800 caixa alta, linha fina 300 no começo, palavra-chave em 900 itálico com faixa royal #1F66E5.
- Cartão de vidro marinho com dado grande, rótulo mono e **fonte no rodapé**.
- Selos mono no rodapé; logo branco no canto inferior direito.
- Logo SEM "domiciliar" por padrão (`logo: 'sem'`). Com "domiciliar" só em post sobre o atendimento domiciliar (`logo: 'domiciliar'`).
- Nunca verde e dourado; nunca laranja e preto (app X1). Nada de quique, partícula ou cara de template.

## Estrutura
- 7 a 9 lâminas, 1080x1350. Capa = gancho (pergunta, mito entre aspas, número ou "faça o teste"). Uma ideia por lâmina. Penúltima resume ("guarde estes 5"). Última pede para salvar e enviar, com CTA ("Agende sua avaliação" ou "Chame no WhatsApp" no domiciliar).
- Formatos que mais salvam: teste com pontos, checklist, mito x fato com estudo, passo a passo, "o estudo testou".
- Calendário: terça e quinta (plano no doc https://claude.ai/artifact/FF2X3CLQcahFiohRWWaT8n, aba Plano do Instagram).

## Como gerar
Gerador: `carrosseis/modelo-editorial/gen3.js` (repo) e cópia em `/mnt/project-files/carrosseis/modelo-editorial/`.
- As fotos ficam em `/mnt/project-files/carrosseis/modelo-azul/pool/` (p01 a p16 = Maria no consultório; p17 a p26 = treino no trampolim/sala; p21, p22, p27 a p32 = academia). No repo, crie o link: `ln -s /mnt/project-files/carrosseis/modelo-azul/pool carrosseis/modelo-editorial/pool`.
- Cada carrossel é um arquivo em `decks/AAAA-MM-DD-tema.js` com `{ slug, label, logo, slides }`. Tipos de lâmina: `capa`, `item` (foto em moldura ou `svg` de desenho), `dado` (número gigante + cartão com fonte), `lista` (linhas numeradas; `roomy: true` para 3 itens grandes; `p` para pontos), `cta`.
- `pos` ajusta o enquadramento da foto na moldura (ex.: 'center 40%'). Confira se o rosto não está cortado.
- Rodar: `node gen3.js decks/arquivo.js` e conferir com `python3 sheet.py out/slug previa.jpg` (olhe a prévia: título sem palavra sozinha na linha, nada encostando no logo, foto bem enquadrada).
- Exemplos prontos: os 8 decks de 04/11/2026 em `decks/`.

## Entrega
- Salve em `/mnt/project-files/carrosseis/AAAA-MM-DD-editorial/<slug>/01.png...`, um zip por carrossel, as prévias em `_previas/` e o `legendas-e-referencias.md` (legenda pronta + referências de cada um).
- No chat: anexe as prévias e os zips (cada thread aceita até 24 anexos) e liste as referências usadas.
- Atualize a coluna Situação no calendário do doc quando o Paulo aprovar.
