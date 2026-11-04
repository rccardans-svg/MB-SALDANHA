// Ter 24/11 · O que acontece na sessão em casa (post do DOMICILIAR: logo com "domiciliar")
// Referência de formato: guias "What to expect at your first home physio visit" de clínicas domiciliares
//   (ex.: physiocareathome "Your first visit"), formato passo a passo que mais salva.
// Referência de conteúdo: o processo real descrito em mbfisioterapiahomecare.com (#processo e #jornada).
// Referência visual: carrosséis editoriais @eulucasduty e @leobeckerdesign enviados pelo Paulo.
const L = 'MB Saldanha · Domiciliar';
module.exports = {
  slug: '2026-11-24-sessao-em-casa', label: L, logo: 'domiciliar',
  slides: [
    { type: 'capa', img: 'p03', pos: 'center 35%', kick: 'Fisioterapia domiciliar',
      title: '<span class="f">O que acontece</span><br>quando a fisio<br><span class="hl">vai até você</span>',
      body: 'Do primeiro contato à alta, <strong>passo a passo</strong>.' },
    { type: 'item', img: 'p10', pos: 'center 30%', kick: 'Passo 01', tag: 'Contato',
      title: 'Você chama no <span class="hl">WhatsApp</span>',
      body: 'Conta o que está acontecendo e a gente marca a primeira visita no horário da família. <strong>Segunda a sábado, das 7h às 20h.</strong>' },
    { type: 'item', img: 'p04', pos: 'center 40%', kick: 'Passo 02', tag: 'Avaliação',
      title: 'A fundadora <span class="hl">avalia</span> em casa',
      body: 'A primeira avaliação é feita pessoalmente pela Maria: <strong>histórico, exames, força, equilíbrio</strong> e como a pessoa se movimenta dentro da própria casa.' },
    { type: 'item', img: 'p16', pos: 'center 40%', kick: 'Passo 03', tag: 'Plano',
      title: 'Um plano com <span class="hl">metas claras</span>',
      body: 'Cada paciente recebe um plano próprio, com <strong>metas, frequência de sessões</strong> e a família acompanhando cada etapa.' },
    { type: 'item', img: 'p08', pos: 'center 45%', kick: 'Passo 04', tag: 'Sessões',
      title: 'Terapia manual e <span class="hl">exercício</span>',
      body: 'As sessões usam terapia manual e exercícios terapêuticos, <strong>sem depender só de aparelhos</strong>. O que dá para fazer na sala, no quarto ou no corredor.' },
    { type: 'item', img: 'p02', pos: 'center 30%', kick: 'Passo 05', tag: 'Supervisão',
      title: 'A Maria <span class="hl">volta</span> todo mês',
      body: 'Todo mês tem visita de supervisão da fundadora, para <strong>conferir a evolução e ajustar o plano</strong>.' },
    { type: 'lista', kick: 'Por que em casa', title: 'O que muda <span class="hl">para a família</span>', topY: 200,
      rows: [
        { i: '01', t: 'Sem deslocamento', d: 'Nada de carro, cadeira de rodas e sala de espera.' },
        { i: '02', t: 'Treino no mundo real', d: 'O exercício acontece onde a pessoa vive: cama, banheiro, escada.' },
        { i: '03', t: 'Família junto', d: 'Quem cuida aprende o que fazer entre as sessões.' },
        { i: '04', t: 'Horário flexível', d: 'A agenda se adapta à rotina do paciente.' },
      ] },
    { type: 'cta', img: 'p06', pos: 'center 25%', kick: 'Ribeirão Preto e região', title: 'A clínica vai <span class="hl">até você</span>',
      body: 'Avaliação feita pela fundadora. CREFITO-3 381260/F', cta: 'Chame no WhatsApp', save: 'Salve e envie para quem cuida de alguém' },
  ],
};
