// Qui 12/11 · Estalo: o que é de verdade (refeito a partir de referência)
// Referência de conteúdo: Kawchuk et al., "Real-time visualization of joint cavitation", PLoS ONE 2015
//   (ressonância em tempo real de dedos estalando; o estudo virou notícia no mundo todo).
// Referência sobre estalo x resultado: Bialosky et al., J Orthop Sports Phys Ther 2009 (o efeito da manipulação
//   vem de mecanismos neurofisiológicos; o barulho não é o que alivia).
// Referência visual: carrosséis editoriais @eulucasduty e @leobeckerdesign enviados pelo Paulo.
const L = 'MB Saldanha · Quiropraxia';
module.exports = {
  slug: '2026-11-12-estalo', label: L, logo: 'sem',
  slides: [
    { type: 'capa', img: 'p07', pos: 'center 35%', kick: 'Quiropraxia', size: 'lg',
      title: '<span class="f">Esse estalo</span><br><span class="hl">não é osso</span><br>voltando pro lugar',
      swipe: 'Entenda o que é →' },
    { type: 'item', img: 'p08', pos: 'center 40%', kick: 'O estudo', tag: 'PLoS ONE, 2015',
      title: 'Filmaram um estalo <span class="hl">por dentro</span>',
      body: 'Pesquisadores do Canadá colocaram dedos estalando dentro de uma <strong>ressonância em tempo real</strong> para ver o que acontece na articulação.' },
    { type: 'item', img: 'p16', pos: 'center 40%', kick: 'O que eles viram', tag: 'Cavitação',
      title: 'Uma <span class="hl">bolha de gás</span> se forma',
      body: 'Quando as superfícies da articulação se afastam, a pressão cai e <strong>surge uma cavidade de gás no líquido</strong>. O som vem daí. Osso nenhum sai do lugar.' },
    { type: 'dado', kick: 'Por isso', big: '20 min', bigSize: 200, topY: 330,
      title: 'até dar para <span class="hl">estalar de novo</span>',
      body: 'O gás leva um tempo para se dissolver. É por isso que o mesmo dedo não estala duas vezes seguidas.',
      card: { src: '<b>Fonte</b> Kawchuk et al., PLoS ONE, 2015; Unsworth et al., Ann Rheum Dis, 1971' } },
    { type: 'item', img: 'p02', pos: 'center 30%', kick: 'Atenção', tag: 'O barulho não mede',
      title: 'Alívio <span class="hl">sem estalo</span> existe',
      body: 'O efeito do ajuste vem do sistema nervoso, não do barulho. <strong>Quem diz se funcionou é a sua dor e o seu movimento.</strong>' },
    { type: 'item', img: 'p11', pos: 'center 42%', kick: 'Mito', kickK: 'no', tag: 'Mito', tagK: 'no',
      title: '"Estalar sozinho em casa <span class="hl">resolve</span>"',
      body: 'Torcer o pescoço até estalar alivia por minutos, mas <strong>a causa continua lá</strong>. E forçar sem saber pode irritar a região.' },
    { type: 'lista', kick: 'O que alivia de verdade', title: 'Os <span class="hl">3 passos</span>', topY: 220,
      rows: [
        { i: '01', t: 'Avaliação da coluna', d: 'Descobrir de onde vem a dor.' },
        { i: '02', t: 'Ajuste no lugar certo', d: 'Técnica, força e direção certas.' },
        { i: '03', t: 'Exercício para manter', d: 'Sem ele, o alívio dura pouco.' },
      ], src: '<b>Fonte</b> Bialosky et al., JOSPT, 2009' },
    { type: 'cta', img: 'p15', pos: 'center 30%', kick: 'CREFITO-3 381260/F', title: 'Quiropraxia feita por <span class="hl">fisioterapeuta</span>',
      size: 'md', body: 'Avaliação, técnica e segurança.', save: 'Envie para quem vive estalando o pescoço' },
  ],
};
