# Fonte serifada viral: como usar na MB Saldanha

A fonte das referências é uma serifada alta e estreita, de traço fino, em letra minúscula e com itálico em uma ou outra palavra. A mais parecida que é gratuita e liberada para uso comercial é a **Instrument Serif** (licença OFL). Ela já está no motor dos Reels com o nome `SERIF` e é usada pelo motion 66 (poema palavra por palavra).

## Regras para não virar "template"

- A serifada fala, e a Montserrat informa. A serifada é a voz (frase, poema, pergunta) e a Montserrat fica com os rótulos, os números e os botões.
- Use letra minúscula e frase curta. Ponha em itálico só a palavra que muda o sentido (ex.: _o passado_).
- Use uma cor de destaque só: o azul claro da MB (#9FBCFF) na palavra que troca. O resto fica em branco quente (#F6F1E7).
- Não misture serifada e Montserrat na mesma linha.
- Não coloque a serifada em cima de faixa azul forte: ela pede fundo de vídeo com só um véu leve atrás.

## 8 opções de uso

1. **Poema palavra por palavra (motion 66).** "A fisioterapia / não muda / _o passado_ / mas pode / te devolver / independência → força → confiança / então seja / constante." Serve para Reel curto (8 a 10 s) com música, sobre um atendimento.
2. **"Você pode achar que… mas o que eu vejo é…"** O gancho fica em serifada e a lista embaixo em Montserrat (motion 65). Exemplos: Maria na bola ("estou só empurrando a bola"), Ullisses no treino ("ele só está levantando peso").
3. **"Ela é fisioterapeuta… deve atender só reabilitação"** (formato de um dia na clínica). A frase fixa no topo vai em serifada e os horários entram em Montserrat fina: "8h: atleta querendo mobilidade · 10h: bruxismo · 14h: atendimento em casa · 17h: dor lombar de quem trabalha sentado." Mostra os 4 serviços da MB.
4. **"Hoje ninguém vai estragar meu dia" / "a fisioterapeuta:"** Humor curto, com a frase em serifada e entre aspas, sobre o vídeo da Maria corrigindo um exercício. Também funciona com o Ullisses ("o personal:").
5. **Capa do Reel.** Uma palavra grande em serifada (ex.: _constância_, _independência_, _técnica_) e uma linha fina em Montserrat embaixo. Fica com cara de editorial e se destaca no feed.
6. **Frase de fechamento.** No lugar do "Técnica é performance" em Montserrat, use "técnica / é / _performance_." em serifada empilhada, com o botão "Agende" em Montserrat logo abaixo.
7. **Pergunta do seguidor.** "Fisio, eu não gosto de fazer exercício. Tem outra alternativa?" em serifada (estilo diálogo), e a resposta em cortes rápidos com a palavra "Alternativa:" fixa.
8. **Carrossel.** A capa vai em serifada grande com a palavra-chave em itálico. As lâminas internas ficam em Montserrat (padrão azul). Só a capa e a última lâmina usam serifada.

## Onde está no código

- Fonte: `motions-mb/motor/assets/InstrumentSerif-*.ttf` (classe CSS `.lx-serif`).
- Motion 66: `motions-mb/modelos/L-premium.js`. Os parâmetros são `linhas` ([segundo, texto, tamanho]) e `troca` (a palavra que muda no mesmo lugar).
- Exemplo pronto: `motions-mb/reels/poema-fisio-constancia.json`.
