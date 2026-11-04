// Qui 05/11 · Risco de queda (versão nova do "5 sinais", agora a partir de referência)
// Referência de conteúdo: CDC STEADI, folheto "Stay Independent" (12 perguntas, nota 4 ou mais = risco),
//   validado por Rubenstein et al., J Safety Res 2011. Formato "faça o teste" que gera salvamento e envio.
// Dado: OMS, Step Safely (2021) / Global report on falls prevention in older age: 28% a 35% dos idosos acima de 65 caem por ano.
// Post do DOMICILIAR: logo com "domiciliar".
// Referência visual: carrosséis editoriais @eulucasduty e @leobeckerdesign enviados pelo Paulo.
const L = 'MB Saldanha · Domiciliar';
module.exports = {
  slug: '2026-11-05-teste-quedas', label: L, logo: 'domiciliar',
  slides: [
    { type: 'capa', img: 'p03', pos: 'center 30%', kick: 'Teste de 2 minutos', size: 'lg',
      title: '<span class="f">Seus pais correm</span><br>risco de<br><span class="hl">cair?</span>',
      body: 'As 12 perguntas que o <strong>CDC, o órgão de saúde dos EUA</strong>, usa para descobrir.' },
    { type: 'dado', img: 'p13', pos: 'center 40%', kick: 'Por que testar', big: '1 em 3', bigSize: 200, topY: 400,
      title: 'idosos cai <span class="hl">todo ano</span>',
      body: 'E a maioria das quedas acontece <strong>dentro de casa</strong>.',
      card: { src: '<b>Fonte</b> OMS, relatório global de prevenção de quedas: 28% a 35% das pessoas acima de 65 anos' } },
    { type: 'lista', kick: 'Responda sim ou não · parte 1', title: 'Some os <span class="hl">pontos</span>', topY: 180, gap: 30,
      rows: [
        { i: '01', t: 'Caiu no último ano', p: '+2' },
        { i: '02', t: 'Usa ou já indicaram bengala ou andador', p: '+2' },
        { i: '03', t: 'Às vezes se sente instável ao andar', p: '+1' },
        { i: '04', t: 'Se apoia nos móveis para andar em casa', p: '+1' },
        { i: '05', t: 'Tem medo de cair', p: '+1' },
        { i: '06', t: 'Precisa das mãos para levantar da cadeira', p: '+1' },
      ] },
    { type: 'lista', kick: 'Responda sim ou não · parte 2', title: 'Continue <span class="hl">somando</span>', topY: 180, gap: 30,
      rows: [
        { i: '07', t: 'Tem dificuldade para subir na calçada', p: '+1' },
        { i: '08', t: 'Precisa correr para chegar ao banheiro', p: '+1' },
        { i: '09', t: 'Perdeu a sensibilidade nos pés', p: '+1' },
        { i: '10', t: 'Remédio que dá tontura ou cansaço', p: '+1' },
        { i: '11', t: 'Remédio para dormir ou para o humor', p: '+1' },
        { i: '12', t: 'Se sente triste ou deprimido com frequência', p: '+1' },
      ] },
    { type: 'dado', kick: 'Resultado', big: '4+', bigSize: 260, topY: 300,
      title: 'pontos: <span class="hl">atenção</span>',
      body: 'Com 4 pontos ou mais, a pessoa pode estar em risco de cair. <strong>Vale uma avaliação de equilíbrio e força.</strong>',
      card: { src: '<b>Fonte</b> CDC STEADI, "Stay Independent"; Rubenstein et al., J Safety Res, 2011' } },
    { type: 'item', img: 'p09', pos: 'center 20%', kick: 'O que mais pesa', tag: 'Dá para treinar',
      title: 'Força nas pernas e <span class="hl">equilíbrio</span>',
      body: 'Levantar sem as mãos, andar sem se segurar e subir a calçada são <strong>capacidades que voltam com treino</strong>, em qualquer idade.' },
    { type: 'item', img: 'p10', pos: 'center 30%', kick: 'Em casa', tag: 'Sem deslocamento',
      title: 'O treino acontece <span class="hl">onde ele cai</span>',
      body: 'Na fisioterapia domiciliar, o exercício é feito no corredor, no banheiro e na cadeira da própria casa. <strong>E a casa é revisada junto.</strong>' },
    { type: 'cta', img: 'p05', pos: 'center 25%', kick: 'Deu 4 ou mais?', title: 'Isso tem tratamento, e dá para fazer <span class="hl">em casa</span>',
      size: 'md', body: 'Avaliação feita pela fundadora. CREFITO-3 381260/F', cta: 'Chame no WhatsApp', save: 'Salve e faça o teste com seus pais' },
  ],
};
