// Qui 19/11 · Pronto para voltar? 4 testes
// Referência de conteúdo (viral): The Prehab Guys, "Are You Ready to Return to Sport?" (2021), com os mesmos 4 testes:
//   step down lateral, salto unipodal, salto triplo e salto lateral. https://theprehabguys.com/vimeo-video/are-you-ready-to-return-to-sport/
// Referência de critério: Davies, Myer & Read, Sports Med 2020;50:485-495 (LSI acima de 90% e qualidade do movimento).
// Referência visual: carrosséis editoriais @eulucasduty e @leobeckerdesign enviados pelo Paulo.
const L = 'MB Saldanha · Performance';
module.exports = {
  slug: '2026-11-19-testes-voltar', label: L, logo: 'sem',
  slides: [
    { type: 'capa', img: 'p18', pos: 'center 30%', kick: 'Voltar depois da lesão',
      title: '<span class="f">Sem dor não é</span><br><span class="hl">pronto</span> para<br>voltar',
      body: 'Faça estes <strong>4 testes</strong> antes de voltar a correr, saltar ou jogar.' },
    { type: 'dado', kick: 'A regra dos 90%', big: '90%', bigSize: 240, topY: 330,
      title: 'A perna lesionada precisa render <span class="hl">90%</span> da outra',
      body: 'Nos testes, compare os dois lados. <strong>Resultado da perna lesionada ÷ perna boa × 100.</strong> Abaixo de 90%, ainda não é hora.',
      card: { src: '<b>Fonte</b> Davies, Myer & Read, Sports Medicine, 2020' } },
    { type: 'item', img: 'p20', pos: 'center 55%', kick: 'Teste 01', tag: 'Controle',
      title: 'Step down <span class="hl">lateral</span>',
      body: 'Num degrau, desça devagar com uma perna até o calcanhar da outra encostar no chão. <strong>10 vezes de cada lado.</strong>',
      card: { t: 'Passa se', body: 'O joelho não cai para dentro, o quadril fica nivelado e o tronco não tomba.' } , frameH: 420 },
    { type: 'item', img: 'p17', pos: 'center 60%', kick: 'Teste 02', tag: 'Força e potência',
      title: 'Salto <span class="hl">unipodal</span>',
      body: 'Salte o mais longe que conseguir com uma perna e <strong>aterrisse na mesma perna</strong>, parado por 2 segundos. Meça a distância.',
      card: { t: 'Passa se', body: 'A distância chega a 90% da perna boa, com aterrissagem firme.' }, frameH: 420 },
    { type: 'item', img: 'p23', pos: 'center 55%', kick: 'Teste 03', tag: 'Potência repetida',
      title: 'Salto <span class="hl">triplo</span>',
      body: 'Três saltos seguidos na mesma perna, sem pausa. <strong>Some a distância total.</strong>',
      card: { t: 'Passa se', body: 'A distância chega a 90% da perna boa, sem perder o equilíbrio no fim.' }, frameH: 420 },
    { type: 'item', img: 'p19', pos: 'center 50%', kick: 'Teste 04', tag: 'Resistência',
      title: 'Salto <span class="hl">lateral</span>',
      body: 'Com uma perna, salte de um lado para o outro de duas linhas paralelas. <strong>Conte quantos saltos faz em 30 segundos.</strong>',
      card: { t: 'Passa se', body: 'O número chega a 90% do lado bom, sem pisar nas linhas.' }, frameH: 420 },
    { type: 'lista', kick: 'Antes de testar', title: 'O que os números <span class="hl">não mostram</span>', topY: 200,
      rows: [
        { i: '01', t: 'Distância não é tudo', d: 'Saltar longe com o joelho caindo para dentro não conta.' },
        { i: '02', t: 'Teste com dor não vale', d: 'Se doer durante o teste, pare.' },
        { i: '03', t: 'Compare com você mesmo', d: 'A referência é a sua perna boa, não a de outra pessoa.' },
        { i: '04', t: 'Faça com supervisão', d: 'O fisioterapeuta mede e corrige o movimento.' },
      ],
      src: '<b>Fonte</b> "A distância sozinha superestima a recuperação do joelho." Davies et al., 2020' },
    { type: 'cta', img: 'p21', pos: 'center 30%', kick: 'Centro de alta performance', title: 'Teste, treine e <span class="hl">volte</span> mais forte',
      body: 'Avaliação de retorno ao esporte na MB Saldanha.', save: 'Salve e envie para quem está voltando de lesão' },
  ],
};
