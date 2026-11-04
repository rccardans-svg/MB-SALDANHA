// Ter 10/11 · Checklist da casa segura (refeito a partir de referência)
// Referência de conteúdo: CDC, folheto "Check for Safety: A Home Fall Prevention Checklist for Older Adults"
//   (programa STEADI), organizado cômodo por cômodo. Formato checklist = salvamento.
// Dado: OMS, relatório global de prevenção de quedas (a maioria das quedas de idosos acontece em casa).
// Post do DOMICILIAR: logo com "domiciliar".
// Referência visual: carrosséis editoriais @eulucasduty e @leobeckerdesign enviados pelo Paulo.
const L = 'MB Saldanha · Domiciliar';
module.exports = {
  slug: '2026-11-10-casa-segura', label: L, logo: 'domiciliar',
  slides: [
    { type: 'capa', img: 'p12', pos: 'center 25%', kick: 'Checklist cômodo por cômodo', size: 'lg',
      title: '<span class="f">A sua casa</span><br>passa neste<br><span class="hl">checklist?</span>',
      body: 'O roteiro que o <strong>CDC</strong> criou para prevenir quedas em casa.' },
    { type: 'lista', kick: 'Cômodo 01', title: '<span class="hl">Chão</span> e corredores', topY: 280, roomy: true,
      rows: [
        { i: '01', t: 'Tapete solto', d: 'Tire, ou prenda com fita antiderrapante.' },
        { i: '02', t: 'Coisas no caminho', d: 'Sapatos, sacolas, caixas e fios fora da passagem.' },
        { i: '03', t: 'Móvel atrapalhando', d: 'O caminho até a porta precisa estar livre.' },
      ], chips: ['Fonte: CDC, Check for Safety'] },
    { type: 'lista', kick: 'Cômodo 02', title: '<span class="hl">Escada</span>', topY: 280, roomy: true,
      rows: [
        { i: '01', t: 'Corrimão dos dois lados', d: 'Firme, do primeiro ao último degrau.' },
        { i: '02', t: 'Luz em cima e embaixo', d: 'Interruptor nas duas pontas da escada.' },
        { i: '03', t: 'Degrau livre', d: 'Nada guardado nos degraus.' },
      ], chips: ['Fonte: CDC, Check for Safety'] },
    { type: 'lista', kick: 'Cômodo 03', title: '<span class="hl">Banheiro</span>', topY: 280, roomy: true,
      rows: [
        { i: '01', t: 'Barra de apoio', d: 'No box e ao lado do vaso.' },
        { i: '02', t: 'Antiderrapante', d: 'Tapete de borracha no box e no chão molhado.' },
        { i: '03', t: 'Luz noturna', d: 'Para a ida ao banheiro de madrugada.' },
      ], chips: ['Fonte: CDC, Check for Safety'] },
    { type: 'lista', kick: 'Cômodo 04', title: '<span class="hl">Cozinha</span> e quarto', topY: 280, roomy: true,
      rows: [
        { i: '01', t: 'Tudo na altura da mão', d: 'O que usa sempre, na prateleira do meio.' },
        { i: '02', t: 'Nada de banquinho', d: 'Subir em banco ou cadeira é queda certa.' },
        { i: '03', t: 'Abajur ao lado da cama', d: 'Acender a luz antes de levantar.' },
      ], chips: ['Fonte: CDC, Check for Safety'] },
    { type: 'item', img: 'p24', pos: 'center 75%', kick: 'O que o CDC também pede', tag: 'Calçado',
      title: 'Chinelo solto <span class="hl">derruba</span>',
      body: 'Use calçado fechado atrás e com sola de borracha, <strong>também dentro de casa</strong>. Meia no piso liso, nunca.' },
    { type: 'dado', img: 'p15', pos: 'center 30%', kick: 'Por que começar pela casa', big: '1 em 3', bigSize: 200, topY: 400,
      title: 'idosos cai <span class="hl">todo ano</span>',
      body: 'E a maior parte dessas quedas acontece <strong>dentro de casa</strong>.',
      card: { src: '<b>Fonte</b> OMS, relatório global de prevenção de quedas em idosos' } },
    { type: 'cta', img: 'p01', pos: 'center 20%', kick: 'Na primeira visita', title: 'Eu reviso a casa <span class="hl">inteira</span> com você',
      size: 'md', body: 'Avaliação domiciliar feita pela fundadora. CREFITO-3 381260/F', cta: 'Chame no WhatsApp', save: 'Salve este checklist e envie para quem cuida de alguém' },
  ],
};
