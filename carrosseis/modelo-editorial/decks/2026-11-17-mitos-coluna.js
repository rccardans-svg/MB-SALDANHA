// Ter 17/11 · Mito ou verdade da coluna
// Referência de conteúdo: O'Sullivan et al., "Back to basics: 10 facts every person should know about back pain",
// Br J Sports Med 2020;54:698-699 (infográfico mito x fato mais compartilhado da fisioterapia).
// Referência de dado: Brinjikji et al., AJNR 2015 (achados de imagem em pessoas SEM dor).
// Referência visual: carrosséis editoriais @eulucasduty e @leobeckerdesign (LBK MAG) enviados pelo Paulo.
const L = 'MB Saldanha · Mito ou fato';
module.exports = {
  slug: '2026-11-17-mitos-coluna', label: L, logo: 'sem',
  slides: [
    { type: 'capa', img: 'p05', pos: 'center 25%', kick: 'Coluna · 5 mitos',
      title: '<span class="f">5 coisas que te</span><br>contaram sobre<br>a sua <span class="hl">coluna</span>',
      body: 'Um grupo de pesquisadores revisou as crenças mais comuns sobre dor nas costas. <strong>Nenhuma destas se sustenta.</strong>' },
    { type: 'item', img: 'p09', pos: 'center 16%', kick: 'Mito 01', kickK: 'no', tag: 'Mito', tagK: 'no',
      title: '"Dor nas costas é sinal de <span class="hl">algo grave</span>"',
      body: 'A dor pode assustar, mas <strong>raramente é perigosa</strong>. A maioria dos casos melhora, e envelhecer não é sentença de dor.',
      chips: [{ t: 'Fato: raramente é grave', k: 'ok' }] },
    { type: 'item', img: 'p13', pos: 'center 62%', kick: 'Mito 02', kickK: 'no', tag: 'Mito', tagK: 'no', frameH: 360,
      title: '"O exame vai mostrar <span class="hl">a&nbsp;causa</span>"',
      body: 'Hérnia e desgaste aparecem em muita gente <strong>que não sente nada</strong>.',
      card: { t: 'Pessoas SEM dor com abaulamento de disco', stats: [{ v: '30<small>%</small>', k: 'aos 20 anos' }, { v: '60<small>%</small>', k: 'aos 50 anos' }, { v: '84<small>%</small>', k: 'aos 80 anos' }], src: '<b>Fonte</b> Brinjikji et al., AJNR 2015, 3.110 exames' } },
    { type: 'item', img: 'p11', pos: 'center 42%', kick: 'Mito 03', kickK: 'no', tag: 'Mito', tagK: 'no',
      title: '"Você sente dor por causa da <span class="hl">postura</span>"',
      body: 'Não existe uma postura "certa" que protege a coluna. <strong>Ficar muito tempo parado em qualquer posição</strong> é o que incomoda. Mude de posição.',
      chips: [{ t: 'Fato: postura não causa dor', k: 'ok' }] },
    { type: 'item', img: 'p22', pos: 'center 30%', kick: 'Mito 04', kickK: 'no', tag: 'Mito', tagK: 'no',
      title: '"Curvar e pegar peso <span class="hl">gasta</span> a coluna"',
      body: 'A coluna é forte e foi feita para dobrar e carregar. <strong>Treinar com carga, aos poucos, deixa ela mais resistente.</strong>',
      chips: [{ t: 'Fato: a coluna não desgasta com o uso', k: 'ok' }] },
    { type: 'item', img: 'p19', pos: 'center 35%', kick: 'Mito 05', kickK: 'no', tag: 'Mito', tagK: 'no',
      title: '"Doeu? Então é <span class="hl">repouso</span>"',
      body: 'Crise de dor não quer dizer que você está se machucando. <strong>Ficar parado costuma piorar.</strong> Mexer-se dentro do tolerável ajuda a melhorar.',
      chips: [{ t: 'Fato: movimento trata', k: 'ok' }] },
    { type: 'lista', kick: 'O que a ciência diz', title: 'Guarde <span class="hl">estes 5</span>', topY: 200,
      rows: [
        { i: '01', t: 'Raramente é grave', d: 'A maioria das dores nas costas melhora.' },
        { i: '02', t: 'Exame não é tudo', d: 'Achado de imagem é comum em quem não tem dor.' },
        { i: '03', t: 'Não há postura perfeita', d: 'Varie de posição ao longo do dia.' },
        { i: '04', t: 'A coluna aguenta carga', d: 'Força treinada protege.' },
        { i: '05', t: 'Movimento é tratamento', d: 'Repouso total atrasa a melhora.' },
      ],
      src: '<b>Fonte</b> O\'Sullivan et al., Br J Sports Med, 2020' },
    { type: 'cta', img: 'p01', pos: 'center 20%', kick: 'Dor que não passa?', title: 'A avaliação mostra <span class="hl">o que</span> trava você',
      body: 'Fisioterapia com terapia manual e exercício. CREFITO-3 381260/F', save: 'Salve e envie para quem vive com dor nas costas' },
  ],
};
