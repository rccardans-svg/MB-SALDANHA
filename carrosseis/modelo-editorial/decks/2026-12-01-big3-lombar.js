// Ter 01/12 · 3 exercícios para lombar
// Referência viral: os "McGill Big 3" do Prof. Stuart McGill (Univ. Waterloo), viralizados por Squat University
//   ("The McGill Big 3 for core stability") e pelo podcast do Peter Attia com o McGill.
// Execução conferida em: MUSC Health, "The big three" (2022) e Acibadem, "The McGill Big 3".
// Cuidado de coerência: NÃO vender como "core fraco causa dor" (O'Sullivan 2020, usado no carrossel de 17/11).
//   O enquadramento é resistência do tronco para a coluna aguentar o dia.
// Referência visual: carrosséis editoriais @eulucasduty e @leobeckerdesign enviados pelo Paulo.
const L = 'MB Saldanha · Lombar';
const W = '#ffffff', R = '#3b7cff', G = 'rgba(159,192,255,.35)';
const seg = (pts, c = W, w = 16) => `<polyline points="${pts}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const head = (x, y, r = 28) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${W}"/>`;
const floor = `<line x1="60" y1="470" x2="860" y2="470" stroke="${G}" stroke-width="2"/>`;
const lab = (x, y, t, a = 'start') => `<text x="${x}" y="${y}" fill="#9fc0ff" font-family="J" font-size="20" letter-spacing="3" text-anchor="${a}">${t}</text>`;
const arrow = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${R}" stroke-width="3" stroke-dasharray="8 8"/><circle cx="${x2}" cy="${y2}" r="7" fill="${R}"/>`;
const svg = (inner) => `<svg viewBox="50 230 820 290" width="100%" height="100%">${floor}${inner}</svg>`;

const curl = svg(`
  ${seg('300,440 520,455', R, 22)}
  ${seg('300,440 520,455')}
  ${seg('520,455 620,370 700,458')}
  ${seg('520,455 820,458')}
  ${seg('300,440 370,462 470,462', W, 12)}
  ${head(262, 418)}
  ${arrow(262, 380, 262, 320)}
  ${lab(290, 330, 'SÓ CABEÇA E OMBROS SOBEM')}
  ${lab(470, 505, 'MÃOS SOB A LOMBAR', 'middle')}`);
const side = svg(`
  ${seg('260,360 520,410', R, 22)}
  ${seg('260,360 520,410 790,458')}
  ${seg('260,360 255,458 350,458', W, 12)}
  ${seg('260,360 360,330 470,395', W, 12)}
  ${head(225, 335)}
  ${arrow(520, 470, 520, 425)}
  ${lab(840, 505, 'QUADRIL ALTO, CORPO RETO', 'end')}
  ${lab(250, 300, 'COTOVELO SOB O OMBRO', 'middle')}`);
const bird = svg(`
  ${seg('320,320 570,325', R, 22)}
  ${seg('320,320 570,325')}
  ${seg('320,320 320,458', W, 14)}
  ${seg('570,325 570,458 690,458', W, 14)}
  ${seg('320,320 120,290', W, 14)}
  ${seg('570,325 830,300', W, 14)}
  ${head(270, 300)}
  ${lab(120, 255, 'BRAÇO À FRENTE')}
  ${lab(830, 265, 'PERNA OPOSTA ATRÁS', 'end')}
  ${lab(445, 505, 'COSTAS PARADAS', 'middle')}`);

module.exports = {
  slug: '2026-12-01-big3-lombar', label: L, logo: 'sem',
  slides: [
    { type: 'capa', img: 'p14', pos: 'center 30%', kick: 'Lombar · Big 3', size: 'lg',
      title: '<span class="f">Os 3 exercícios</span><br>de lombar mais<br><span class="hl">famosos</span> do mundo',
      body: 'Criados por um dos maiores pesquisadores de coluna, <strong>o Prof. Stuart McGill</strong>.' },
    { type: 'item', img: 'p07', pos: 'center 40%', kick: 'Quem criou', tag: 'Universidade de Waterloo',
      title: 'Mais de 30 anos estudando <span class="hl">coluna</span>',
      body: 'O McGill montou os "Big 3" para treinar o tronco a <strong>segurar a coluna estável enquanto braços e pernas se mexem</strong>. Sem aparelho, no chão de casa.' },
    { type: 'item', svg: curl, frameH: 520, kick: 'Exercício 01', title: 'Abdominal <span class="hl">modificado</span>',
      body: 'Uma perna dobrada, a outra esticada, mãos sob a lombar. <strong>Suba só a cabeça e os ombros</strong>, sem dobrar o pescoço.',
      chips: ['Segure 8 a 10 s', 'Troque a perna'] },
    { type: 'item', svg: side, frameH: 520, kick: 'Exercício 02', title: 'Prancha <span class="hl">lateral</span>',
      body: 'Cotovelo embaixo do ombro, quadril alto, corpo em linha. <strong>Comece com os joelhos dobrados</strong> e evolua para as pernas esticadas.',
      chips: ['Segure 8 a 10 s', 'Os dois lados'] },
    { type: 'item', svg: bird, frameH: 520, kick: 'Exercício 03', title: 'Perdigueiro <span class="hl">(bird dog)</span>',
      body: 'De quatro apoios, estique um braço e a perna oposta. <strong>As costas não podem girar nem afundar.</strong>',
      chips: ['Segure 8 a 10 s', 'Alterne os lados'] },
    { type: 'lista', kick: 'Como fazer', title: 'O jeito <span class="hl">McGill</span>', topY: 200,
      rows: [
        { i: '01', t: 'Pouco tempo, várias vezes', d: 'Segure até 10 segundos e descanse. Qualidade antes de tempo.' },
        { i: '02', t: 'Pirâmide para baixo', d: 'Exemplo: 5 repetições, depois 3, depois 1.' },
        { i: '03', t: 'Todo dia', d: 'Leva menos de 10 minutos.' },
        { i: '04', t: 'Sem dor', d: 'Se doer, pare e procure avaliação.' },
      ],
      src: '<b>Fonte</b> McGill, Back Mechanic; MUSC Health, "The big three", 2022' },
    { type: 'cta', img: 'p05', pos: 'center 25%', kick: 'Lombar travando?', title: 'Exercício certo, na <span class="hl">dose certa</span>',
      body: 'A avaliação mostra por onde começar.', save: 'Salve para fazer amanhã cedo' },
  ],
};
