// Qui 03/12 · Mito da semana: "o joelho não pode passar da ponta do pé"
// Referência viral: o mito que o @kneesovertoesguy (Ben Patrick) transformou em movimento, e o estudo que todo
//   mundo cita: Fry, Smith & Schilling, J Strength Cond Res 2003;17(4):629-633.
// Resumo usado: physio-network.com, "Knees shouldn't pass toes during the squat: myth or truth?"
// Referência visual: carrosséis editoriais @eulucasduty e @leobeckerdesign enviados pelo Paulo.
const L = 'MB Saldanha · Mito da semana';
module.exports = {
  slug: '2026-12-03-joelho-ponta-pe', label: L, logo: 'sem',
  slides: [
    { type: 'capa', img: 'p21', pos: 'center 40%', kick: 'Mito da semana',
      title: '"O joelho não pode passar da <span class="hl">ponta do pé</span>"',
      size: 'lg', body: 'Você já ouviu isso na academia. <strong>Um estudo testou.</strong>' },
    { type: 'item', img: 'p22', pos: 'center 35%', kick: 'O estudo', tag: 'J Strength Cond Res, 2003',
      title: 'Agachamento <span class="hl">livre</span> x travado',
      body: 'Pesquisadores compararam o agachamento normal com o agachamento em que <strong>o joelho era impedido de passar da ponta do pé</strong>. E mediram a carga no joelho e no quadril.' },
    { type: 'dado', kick: 'Joelho travado atrás do pé', big: '−22%', bigSize: 210, topY: 300,
      title: 'de carga no <span class="hl">joelho</span>…', size: 'md', body: 'Parece bom. Até você ver para onde a carga foi.',
      card: { t: 'Mas a carga no quadril e na lombar', stats: [{ v: '28', k: 'N·m livre' }, { v: '302', k: 'N·m travado' }, { v: '~10x', k: 'mais carga' }], src: '<b>Fonte</b> Fry, Smith & Schilling, JSCR 2003' } },
    { type: 'item', img: 'p21', pos: 'center 62%', kick: 'Por quê', tag: 'Física simples',
      title: 'Joelho travado, <span class="hl">tronco</span> tomba',
      body: 'Para não cair para trás, o corpo inclina o tronco para a frente. <strong>A carga sai do joelho e vai para a lombar.</strong>' },
    { type: 'lista', kick: 'O que vale de verdade', title: 'Agache <span class="hl">assim</span>', topY: 200,
      rows: [
        { i: '01', t: 'Joelho na linha do pé', d: 'O erro é o joelho cair para dentro, não ir para a frente.' },
        { i: '02', t: 'Calcanhar no chão', d: 'O pé inteiro apoiado do começo ao fim.' },
        { i: '03', t: 'Tronco firme', d: 'Peito aberto e abdome ativo.' },
        { i: '04', t: 'Profundidade sem dor', d: 'Desça até onde controla.' },
      ] },
    { type: 'item', img: 'p03', pos: 'center 48%', kick: 'Exceção', tag: 'Com orientação',
      title: 'Dor na frente do <span class="hl">joelho</span>?',
      body: 'Aí vale adaptar por um tempo. <strong>A amplitude e a carga voltam aos poucos</strong>, com avaliação, até o joelho aguentar de novo.' },
    { type: 'cta', img: 'p30', pos: 'center 30%', kick: 'Veredito', title: '<span class="hl">Mito.</span> O joelho pode passar',
      body: 'O que importa é controle, alinhamento e carga certa.', save: 'Envie para quem ainda fala isso na academia' },
  ],
};
