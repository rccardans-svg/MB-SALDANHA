// Gerador de carrosséis MB Saldanha, linha EDITORIAL PREMIUM (2026-11-04).
// Uso: node gen3.js decks/arquivo.js [saida]
// Cada deck é um módulo que exporta { slug, logo: 'sem'|'domiciliar', slides: [...] }.
// Tipos de lâmina: capa, item, dado, lista, passos, cta. Veja SKILL carrosseis-mb-saldanha.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const DIR = __dirname;

const css = `
@font-face { font-family: M; src: url(img/Montserrat.ttf); font-weight: 100 900; font-style: normal; }
@font-face { font-family: M; src: url(img/MontserratItalic.ttf); font-weight: 100 900; font-style: italic; }
@font-face { font-family: J; src: url(img/JetBrainsMono-Regular.ttf); font-weight: 400; }
@font-face { font-family: J; src: url(img/JetBrainsMono-Bold.ttf); font-weight: 700; }
* { margin: 0; padding: 0; box-sizing: border-box; }
:root { --navy: #08142f; --navy2: #0a1b3f; --royal: #1f66e5; --sky: #9fc0ff; --ink: #e6eefc; --mute: #8fa6d4; --line: rgba(159,192,255,.22); }
body { width: 1080px; height: 1350px; overflow: hidden; font-family: M; color: #fff; background: var(--navy); }
.s { position: relative; width: 1080px; height: 1350px; overflow: hidden; background: var(--navy); }
.grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(159,192,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(159,192,255,.05) 1px, transparent 1px); background-size: 54px 54px; }
.ph { position: absolute; inset: 0; background-size: cover; background-position: center 30%; filter: saturate(.5) contrast(1.06) brightness(.95); }
.tint { position: absolute; inset: 0; background: #2d6ae0; mix-blend-mode: multiply; opacity: .45; }
.fade { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(8,20,47,.55) 0%, rgba(8,20,47,0) 22%, rgba(8,20,47,.15) 42%, rgba(8,20,47,.88) 66%, rgba(8,20,47,1) 100%); }
/* topo editorial */
.top { position: absolute; top: 64px; left: 80px; right: 80px; display: flex; align-items: center; justify-content: space-between; font-family: J; font-size: 22px; letter-spacing: .18em; text-transform: uppercase; color: var(--sky); }
.top .l { display: flex; align-items: center; gap: 20px; } .top .l i { width: 56px; height: 3px; background: var(--royal); display: block; }
.top .n b { color: #fff; font-weight: 700; }
/* moldura de foto (estilo revista) */
.frame { position: absolute; left: 80px; right: 80px; top: 130px; border: 1.5px solid var(--line); padding: 10px; }
.frame .in { position: relative; width: 100%; height: 100%; overflow: hidden; }
.frame .in .ph { filter: saturate(.45) contrast(1.05) brightness(.92); }
.frame .in .tint { opacity: .5; }
.frame .tag { position: absolute; left: -1.5px; bottom: -1.5px; transform: translateY(100%); }
.chip { display: inline-flex; align-items: center; gap: 12px; font-family: J; font-size: 21px; letter-spacing: .14em; text-transform: uppercase; color: var(--ink); border: 1.5px solid var(--line); padding: 12px 18px; background: rgba(8,20,47,.75); }
.chip i { width: 12px; height: 12px; background: var(--royal); display: block; }
.chip.ok i { background: #3b7cff; } .chip.no i { background: #ff5b5b; }
.pad { position: absolute; left: 80px; right: 80px; }
.kick { font-family: J; font-size: 24px; letter-spacing: .2em; text-transform: uppercase; color: var(--sky); }
.kick.no { color: #ff8a8a; }
.h { font-weight: 800; text-transform: uppercase; line-height: 1.02; letter-spacing: -.01em; font-size: 78px; }
.h.xl { font-size: 104px; } .h.lg { font-size: 88px; } .h.md { font-size: 64px; } .h.sm { font-size: 54px; }
.h .f { font-weight: 300; }
.hl { display: inline; background: var(--royal); padding: 0 14px; box-decoration-break: clone; -webkit-box-decoration-break: clone; font-style: italic; font-weight: 900; }
.b { font-weight: 400; font-size: 38px; line-height: 1.4; color: var(--ink); }
.b strong { font-weight: 700; color: #fff; }
.b.sm { font-size: 33px; }
.card { border: 1.5px solid var(--line); background: rgba(10,27,63,.82); padding: 34px 38px; backdrop-filter: blur(8px); }
.card .ct { font-family: J; font-size: 20px; letter-spacing: .18em; text-transform: uppercase; color: var(--mute); margin-bottom: 14px; }
.stats { display: flex; gap: 0; }
.stat { flex: 1; padding-right: 26px; } .stat + .stat { border-left: 1.5px solid var(--line); padding-left: 28px; }
.stat .v { font-weight: 800; font-size: 72px; line-height: 1; letter-spacing: -.02em; }
.stat .v small { font-size: .5em; font-weight: 500; }
.stat .k { font-family: J; font-size: 19px; letter-spacing: .1em; text-transform: uppercase; color: var(--mute); margin-top: 12px; line-height: 1.4; }
.src { font-family: J; font-size: 19px; letter-spacing: .06em; color: var(--mute); line-height: 1.5; }
.src b { color: var(--sky); font-weight: 700; }
.big { font-weight: 900; font-style: italic; font-size: 230px; line-height: .9; letter-spacing: -.03em; }
.big span { background: var(--royal); padding: 0 24px 0 10px; }
.rows { display: flex; flex-direction: column; }
.row { display: flex; gap: 30px; align-items: baseline; padding: 26px 0; border-top: 1.5px solid var(--line); }
.row:last-child { border-bottom: 1.5px solid var(--line); }
.row .i { font-family: J; font-size: 24px; color: var(--sky); letter-spacing: .1em; width: 64px; flex: none; }
.row .t { font-weight: 700; font-size: 40px; text-transform: uppercase; line-height: 1.15; }
.row .d { font-weight: 400; font-size: 29px; color: var(--ink); margin-top: 8px; line-height: 1.35; text-transform: none; }
.rows.roomy .row { padding: 40px 0; } .rows.roomy .row .t { font-size: 54px; } .rows.roomy .row .d { font-size: 36px; margin-top: 12px; } .rows.roomy .row .i { font-size: 30px; }
.row .p { margin-left: auto; font-family: J; font-weight: 700; font-size: 28px; color: var(--sky); flex: none; }
.foot { position: absolute; left: 80px; bottom: 66px; display: flex; gap: 12px; align-items: center; }
.logo { position: absolute; right: 74px; bottom: 54px; width: 210px; opacity: .96; }
.swipe { font-family: J; font-size: 22px; letter-spacing: .2em; text-transform: uppercase; color: var(--sky); }
.cta { display: inline-block; background: #fff; color: #0f3fae; font-weight: 800; font-size: 36px; padding: 24px 46px; text-transform: uppercase; letter-spacing: .03em; }
.fig { position: absolute; left: 80px; right: 80px; top: 130px; border: 1.5px solid var(--line); background: rgba(10,27,63,.6); }
`;

const photo = (img, pos = 'center 30%') => `<div class="ph" style="background-image:url(pool/${img}.jpg);background-position:${pos}"></div><div class="tint"></div>`;
const top = (label, i, n) => `<div class="top"><div class="l"><i></i>${label}</div><div class="n"><b>${String(i + 1).padStart(2, '0')}</b> / ${String(n).padStart(2, '0')}</div></div>`;
const chips = (arr = []) => arr.length ? `<div class="foot">${arr.map(c => typeof c === 'string' ? `<span class="chip"><i></i>${c}</span>` : `<span class="chip ${c.k || ''}"><i></i>${c.t}</span>`).join('')}</div>` : '';
const statsCard = (card) => card ? `<div class="card" style="margin-top:34px">${card.t ? `<div class="ct">${card.t}</div>` : ''}${card.stats ? `<div class="stats">${card.stats.map(s => `<div class="stat"><div class="v">${s.v}</div><div class="k">${s.k}</div></div>`).join('')}</div>` : ''}${card.body ? `<p class="b sm">${card.body}</p>` : ''}${card.src ? `<p class="src" style="margin-top:18px">${card.src}</p>` : ''}</div>` : '';

const render = {
  capa: (s, i, n, d) => `<div class="s">${photo(s.img, s.pos)}<div class="fade"></div>${top(d.label, i, n)}
    <div class="pad" style="bottom:${s.bottom || 190}px">
      ${s.kick ? `<div class="kick" style="margin-bottom:26px">${s.kick}</div>` : ''}
      <div class="h ${s.size || 'xl'}">${s.title}</div>
      ${s.body ? `<p class="b" style="margin-top:30px">${s.body}</p>` : ''}
      <div class="swipe" style="margin-top:36px">${s.swipe || 'Arraste para o lado →'}</div></div></div>`,
  item: (s, i, n, d) => {
    const fh = s.frameH || 560;
    const vis = s.svg ? `<div class="fig" style="height:${fh}px">${s.svg}</div>` : `<div class="frame" style="height:${fh}px"><div class="in">${photo(s.img, s.pos)}</div>${s.tag ? `<div class="tag"><span class="chip ${s.tagK || ''}"><i></i>${s.tag}</span></div>` : ''}</div>`;
    return `<div class="s"><div class="grid"></div>${top(d.label, i, n)}${vis}
    <div class="pad" style="top:${130 + fh + (s.tag ? 110 : 60)}px">
      ${s.kick ? `<div class="kick ${s.kickK || ''}" style="margin-bottom:20px">${s.kick}</div>` : ''}
      <div class="h ${s.size || 'md'}">${s.title}</div>
      ${s.body ? `<p class="b ${s.bsm ? 'sm' : ''}" style="margin-top:24px">${s.body}</p>` : ''}
      ${statsCard(s.card)}
    </div>${chips(s.chips)}</div>`;
  },
  dado: (s, i, n, d) => `<div class="s">${s.img ? photo(s.img, s.pos) + '<div class="fade" style="background:linear-gradient(180deg,rgba(8,20,47,.75),rgba(8,20,47,.92) 45%,#08142f)"></div>' : '<div class="grid"></div>'}${top(d.label, i, n)}
    <div class="pad" style="top:${s.topY || 250}px">
      ${s.kick ? `<div class="kick" style="margin-bottom:30px">${s.kick}</div>` : ''}
      <div class="big" style="font-size:${s.bigSize || 230}px"><span>${s.big}</span></div>
      <div class="h ${s.size || 'md'}" style="margin-top:40px">${s.title}</div>
      ${s.body ? `<p class="b" style="margin-top:26px">${s.body}</p>` : ''}
      ${statsCard(s.card)}
    </div>${chips(s.chips)}</div>`,
  lista: (s, i, n, d) => `<div class="s"><div class="grid"></div>${top(d.label, i, n)}
    <div class="pad" style="top:${s.topY || 190}px">
      ${s.kick ? `<div class="kick" style="margin-bottom:22px">${s.kick}</div>` : ''}
      <div class="h ${s.size || 'md'}">${s.title}</div>
      <div class="rows ${s.roomy ? 'roomy' : ''}" style="margin-top:${s.gap || 44}px">${s.rows.map(r => `<div class="row"><div class="i">${r.i}</div><div><div class="t">${r.t}</div>${r.d ? `<div class="d">${r.d}</div>` : ''}</div>${r.p ? `<div class="p">${r.p}</div>` : ''}</div>`).join('')}</div>
      ${s.body ? `<p class="b sm" style="margin-top:30px">${s.body}</p>` : ''}
      ${s.src ? `<p class="src" style="margin-top:22px">${s.src}</p>` : ''}
    </div>${chips(s.chips)}</div>`,
  cta: (s, i, n, d) => `<div class="s">${photo(s.img, s.pos)}<div class="fade"></div>${top(d.label, i, n)}
    <div class="pad" style="bottom:${s.bottom || 230}px">
      ${s.kick ? `<div class="kick" style="margin-bottom:26px">${s.kick}</div>` : ''}
      <div class="h ${s.size || 'lg'}">${s.title}</div>
      ${s.body ? `<p class="b" style="margin-top:28px">${s.body}</p>` : ''}
      <div class="cta" style="margin-top:44px">${s.cta || 'Agende sua avaliação'}</div>
      ${s.save ? `<p class="swipe" style="margin-top:34px">${s.save}</p>` : ''}
    </div></div>`,
};

(async () => {
  const deckFile = path.resolve(process.argv[2]);
  const deck = require(deckFile);
  const outDir = path.resolve(process.argv[3] || path.join(DIR, 'out', deck.slug));
  fs.mkdirSync(outDir, { recursive: true });
  const logo = deck.logo === 'domiciliar' ? 'img/logo_white.png' : 'img/logo_white_sem_domiciliar.png';
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  const n = deck.slides.length;
  for (let i = 0; i < n; i++) {
    const s = deck.slides[i];
    const html = render[s.type](s, i, n, deck).replace(/<\/div>$/, `<img class="logo" src="${logo}"></div>`);
    const f = path.join(DIR, '_tmp.html');
    fs.writeFileSync(f, `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${html}</body></html>`);
    await p.goto('file://' + f); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(150);
    await p.screenshot({ path: path.join(outDir, `${String(i + 1).padStart(2, '0')}.png`) });
  }
  await b.close();
  console.log('ok', deck.slug, n, outDir);
})();
