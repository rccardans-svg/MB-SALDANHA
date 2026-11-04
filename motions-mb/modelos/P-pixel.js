/* Grupo P. Amostras em pixel art (pedido do Paulo em 04/11/2026: "faça no estilo pixel alguns para eu ver").
   Linguagem de videogame retrô: tudo no grid de 8 px, movimento em degraus (steps), fonte de fliperama e sons de 8 bits.
   Motions: px-fase (PRONTO? VAI!), px-luta (vilão com barra de vida), px-xp (barra de XP e LEVEL UP),
   px-corte (transição em blocos), px-dialogo (caixa de diálogo de RPG) e px-salvar (disquete: JOGO SALVO). */
(function () {
  const AZ = "#1f66e5", CL = "#9fbcff", NV = "#0a1b3f", RED = "#e04646";
  const PAL = { o: NV, y: "#ffcf4a", Y: "#e69830", h: "#fff1ba", w: "#ffffff", p: NV, r: "#c4303a", t: "#ffffff", k: "#ff968c", b: NV,
    B: "#1f66e5", D: "#163e9c", L: CL, s: "#cddaf0", g: "#78a0d8", n: NV };
  const GORD = ["........oooooo........", "......oohhhhhYoo......", ".....ohhyyyyyyyYo.....", "....ohyyyyyyyyyyYo....", "...ohyyyyyyyyyyyyYo...",
    "..ohyyyyyyyyyyyyyyYo..", "..ohybbbyyyyyybbbyYo..", ".ohyyyybbyyyybbyyyyYo.", ".ohyywwwwyyyywwwwyyYo.", ".ohyywwppyyyyppwwyyYo.",
    "ohyyywwppyyyyppwwyyyYo", "ohykyywwyyyyyywwyykyYo", "oyyyyYoYyyyyyyYoyyyyYo", "oyyyyyYorrttrroyyyyyYo", "oyyyyyyYooooooyyyyyyYo",
    "oyyYYYYYYyyyyyyyyyyyYo", "oYyyyyyyyyyyYYYYYYyyYo", ".oYYYYYYYYYYYYYYYYYYo.", "..oooooooooooooooooo.."];
  const GORD_DOR = GORD.map((r, y) => {
    const a = r.split("");
    if (y >= 8 && y <= 11) for (let x = 4; x < 18; x++) if ("wp".includes(a[x])) a[x] = "y";
    [[5, 8], [8, 8], [6, 9], [7, 9], [6, 10], [7, 10], [5, 11], [8, 11]].forEach(([x, yy]) => { if (yy === y) { a[x] = "o"; a[21 - x] = "o"; } });
    if (y === 13) for (let x = 8; x < 14; x++) a[x] = "r";
    return a.join("");
  });
  const DISQ = ["oooooooooooooo..", "oDDDsssssssDDDo.", "oDDDsssggssDDDDo", "oDDDsssggssDDDDo", "oDDDsssggssDDDDo", "oDDDsssssssDDDDo", "oDDDDDDDDDDDDDDo", "oDDDDDDDDDDDDDDo",
    "oDDttttttttttDDo", "oDDttttttttttDDo", "oDDtLLLLLLLLtDDo", "oDDttttttttttDDo", "oDDtLLLLLLLLtDDo", "oDDttttttttttDDo", "oDDttttttttttDDo", "oooooooooooooooo"];
  const BRILHO = ["...w...", "...L...", "..LwL..", "wLwwwLw", "..LwL..", "...L...", "...w..."];
  const GEMA = ["..ooo..", ".oLLBo.", "oLLBBBo", "oBBBBDo", ".oBBDo.", "..oDo..", "...o..."];
  const HALTER = [".oo........oo.", "oLLo......oLLo", "oLLooooooooLLo", "oLLLLLLLLLLLLo", "oLLooooooooLLo", "oLLo......oLLo", ".oo........oo."];
  const CHECK = ["........oo", ".......oLo", "......oLLo", "oo...oLLo.", "oLo.oLLo..", "oLLoLLo...", ".oLLLo....", "..oLo.....", "...o......"];

  // desenha um mapa de pixels em SVG (cada letra é uma cor da paleta, "." é transparente)
  function sprite(mapa, u, pal) {
    pal = pal || PAL; const h = mapa.length, w = mapa[0].length; let r = "";
    for (let y = 0; y < h; y++) {
      const row = mapa[y]; let x = 0;
      while (x < w) {
        const c = row[x]; if (!pal[c]) { x++; continue; }
        let x2 = x; while (x2 + 1 < w && row[x2 + 1] === c) x2++;
        r += `<rect x="${x * u}" y="${y * u}" width="${(x2 - x + 1) * u}" height="${u}" fill="${pal[c]}"/>`; x = x2 + 1;
      }
    }
    return `<svg class="pxsprite" width="${w * u}" height="${h * u}" viewBox="0 0 ${w * u} ${h * u}" shape-rendering="crispEdges" style="display:block;overflow:visible">${r}</svg>`;
  }
  const passo = (v, p) => Math.round(v / p) * p;  // arredonda no grid
  // caixa de pixel que abre e fecha em degraus (como janela de jogo)
  function caixa(K, css, at, fim) {
    const e = K.el("", css + ";opacity:0;transform-origin:50% 50%"); e.classList.add("pxcaixa");
    K.set(e, { opacity: 1 }, at);
    K.ft(e, { scaleY: 0.08, scaleX: 0.6 }, { scaleY: 1, scaleX: 1, duration: 0.2, ease: "steps(4)" }, at);
    if (fim != null) { K.to(e, { scaleY: 0.08, scaleX: 0.6, duration: 0.16, ease: "steps(3)" }, fim - 0.16); K.set(e, { opacity: 0 }, fim); }
    return e;
  }
  // texto que pisca em degraus
  function pisca(K, el, at, vezes, dt) { for (let i = 0; i < vezes; i++) { K.set(el, { opacity: 0 }, at + i * 2 * dt); K.set(el, { opacity: 1 }, at + (i * 2 + 1) * dt); } }
  // explosão de pixels quadrados (posições no grid de 8 px)
  function estoura(K, cx, cy, at, n, cores) {
    for (let i = 0; i < n; i++) {
      const s = [16, 16, 24, 32][Math.floor(K.rnd() * 4)], a = K.rnd() * Math.PI * 2, v = 300 + K.rnd() * 700, c = cores[Math.floor(K.rnd() * cores.length)];
      const p = K.el("", `left:${cx - s / 2}px;top:${cy - s / 2}px;width:${s}px;height:${s}px;background:${c};opacity:0;z-index:62`);
      const d = 0.6 + K.rnd() * 0.4;
      K.set(p, { opacity: 1 }, at);
      K.ticker((t) => { const k = t - at; gsap.set(p, { x: passo(Math.cos(a) * v * k, 8), y: passo(Math.sin(a) * v * k + 700 * k * k, 8) }); }, at, at + d);
      K.set(p, { opacity: 0 }, at + d);
    }
  }

  // ---------- px-fase  FASE 1 · PRONTO? VAI! ----------
  MB.def("px-fase", { em: 0, fase: "FASE 1", nome: "LEVANTAMENTO TERRA", pronto: "PRONTO?", vai: "VAI!", y: 700 }, function (P, K) {
    const t0 = K.t();
    const f = K.el(P.fase, `left:0;width:1080px;top:${P.y}px;text-align:center;font-size:48px;color:${CL};opacity:0`); f.classList.add("px");
    const n = K.el(P.nome, `left:0;width:1080px;top:${P.y + 80}px;text-align:center;font-size:72px;font-weight:700;opacity:0`); n.classList.add("pxs");
    K.set([f, n], { opacity: 1 }, t0); pisca(K, f, t0, 2, 0.08);
    K.ft(n, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.4, ease: "steps(10)" }, t0 + 0.1);
    K.sfx("px_passo", t0, 0.6);
    K.set([f, n], { opacity: 0 }, t0 + 0.9);
    const pr = K.el(P.pronto, `left:0;width:1080px;top:${P.y + 20}px;text-align:center;font-size:88px;opacity:0`); pr.classList.add("px");
    K.set(pr, { opacity: 1 }, t0 + 0.95); pisca(K, pr, t0 + 1.25, 2, 0.07); K.set(pr, { opacity: 0 }, t0 + 1.55);
    K.sfx("px_blip", t0 + 0.95, 0.8);
    const vai = K.el(P.vai, `left:0;width:1080px;top:${P.y - 20}px;text-align:center;font-size:176px;color:#fff;opacity:0;text-shadow:8px 8px 0 ${AZ},16px 16px 0 ${NV}`); vai.classList.add("px");
    K.set(vai, { opacity: 1 }, t0 + 1.6);
    K.ft(vai, { scale: 2 }, { scale: 1, duration: 0.15, ease: "steps(3)" }, t0 + 1.6);
    K.set(vai, { opacity: 0 }, t0 + 2.1);
    K.sfx("px_levelup", t0 + 1.6, 0.45);
  });

  // ---------- px-luta  vilão em pixel com barra de vida ----------
  // golpes: segundos (a partir de "em") de cada repetição certa. Cada golpe tira "dano" da vida.
  MB.def("px-luta", { em: 0, dur: 9, golpes: [1, 2, 3, 4], dano: 25, vida: 100, nome: "GORDURINHA", nivel: 3, x: 812, y: 128, u: 10 }, function (P, K) {
    const t0 = K.t(), t1 = t0 + P.dur, u = P.u, Ws = 22 * u, Hs = 19 * u;
    // HUD do vilão
    const hud = caixa(K, `left:56px;top:150px;width:600px;height:150px`, t0 + 0.2, t1);
    const nm = K.el(P.nome, "left:28px;top:26px;font-size:32px", hud); nm.classList.add("px");
    const lv = K.el("LV" + P.nivel, "right:28px;top:26px;font-size:24px;color:" + CL, hud); lv.classList.add("px");
    const hp = K.el("HP", "left:28px;top:90px;font-size:24px;color:#ffcf4a", hud); hp.classList.add("px");
    const trilho = K.el("", "left:100px;top:84px;width:468px;height:36px;background:#3a0f16;box-shadow:0 0 0 4px #fff", hud);
    const fantasma = K.el("", "left:0;top:0;width:100%;height:100%;background:#ffcf4a;transform-origin:left center", trilho);
    const barra = K.el("", `left:0;top:0;width:100%;height:100%;background:${RED};box-shadow:inset 0 8px 0 rgba(255,255,255,.28);transform-origin:left center`, trilho);
    K.el(Array.from({ length: 9 }, (_, i) => `<i style="position:absolute;left:${(i + 1) * 10}%;top:0;width:4px;height:100%;background:rgba(10,27,63,.55)"></i>`).join(""), "inset:0", trilho);
    // o vilão (dois quadros: normal e levando golpe)
    const vil = K.el(`<div class="n">${sprite(GORD, u)}</div><div class="d" style="position:absolute;left:0;top:0;opacity:0">${sprite(GORD_DOR, u)}</div>`,
      `left:${P.x}px;top:${P.y}px;width:${Ws}px;height:${Hs}px;opacity:0;z-index:5;filter:drop-shadow(0 16px 0 rgba(0,0,0,.35))`);
    const fn = vil.querySelector(".n"), fd = vil.querySelector(".d");
    K.set(vil, { opacity: 1 }, t0);
    K.ft(vil, { y: -P.y - Hs }, { y: 0, duration: 0.4, ease: "steps(8)" }, t0);
    K.sfx("px_dano", t0 + 0.4, 0.5);
    // respiração de 2 quadros (sobe e desce 1 pixel do sprite)
    K.ticker((t) => { gsap.set(fn, { y: (Math.floor((t - t0) / 0.32) % 2) * u }); gsap.set(fd, { y: (Math.floor((t - t0) / 0.32) % 2) * u }); }, t0 + 0.4, t1);
    let vida = P.vida;
    P.golpes.forEach((g, i) => {
      const tg = K.t(g); vida = Math.max(0, vida - P.dano); const k = vida / P.vida;
      K.set(fd, { opacity: 1 }, tg); K.set(fn, { opacity: 0 }, tg);
      K.set(fd, { opacity: 0 }, tg + 0.3); K.set(fn, { opacity: 1 }, tg + 0.3);
      K.ticker((t) => { const q = [2, -2, 1, -1, 0][Math.min(4, Math.floor((t - tg) / 0.05))]; gsap.set(vil, { x: q * u }); }, tg, tg + 0.26);
      K.set(barra, { scaleX: k }, tg);
      K.to(fantasma, { scaleX: k, duration: 0.3, ease: "steps(5)" }, tg + 0.3);
      const dn = K.el("-" + P.dano, `left:${P.x - 150}px;top:${P.y + 40}px;width:200px;text-align:center;font-size:56px;color:#fff;opacity:0;z-index:8;text-shadow:4px 0 0 ${RED},-4px 0 0 ${RED},0 4px 0 ${RED},0 -4px 0 ${RED},8px 8px 0 ${NV}`);
      dn.classList.add("px");
      K.set(dn, { opacity: 1 }, tg);
      K.ft(dn, { y: 0 }, { y: -80, duration: 0.32, ease: "steps(4)" }, tg);
      pisca(K, dn, tg + 0.5, 2, 0.06); K.set(dn, { opacity: 0 }, tg + 0.75);
      K.sfx("px_hit", tg, 0.8); K.sfx("px_dano", tg + 0.04, 0.35);
      if (i >= 1) {
        const cb = K.el(`COMBO x${i + 1}`, `left:56px;top:340px;font-size:36px;color:#fff;padding:12px 18px;background:${AZ};opacity:0;z-index:8;box-shadow:0 0 0 4px #fff, 8px 8px 0 4px ${NV}`);
        cb.classList.add("px");
        K.set(cb, { opacity: 1 }, tg + 0.05); K.ft(cb, { x: -40 }, { x: 0, duration: 0.12, ease: "steps(3)" }, tg + 0.05);
        K.set(cb, { opacity: 0 }, (i + 1 < P.golpes.length ? K.t(P.golpes[i + 1]) : tg + 1.0));
      }
    });
    // nocaute
    if (vida <= 0) {
      const tk = K.t(P.golpes[P.golpes.length - 1]) + 0.35;
      for (let i = 0; i < 5; i++) { K.set(vil, { opacity: 0 }, tk + i * 0.12); K.set(vil, { opacity: 1 }, tk + i * 0.12 + 0.06); }
      K.set(vil, { opacity: 0 }, tk + 0.62);
      estoura(K, P.x + Ws / 2, P.y + Hs / 2, tk + 0.62, 36, ["#ffcf4a", "#e69830", "#fff1ba", NV, "#ffcf4a"]);
      K.sfx("px_ko", tk + 0.6, 0.8);
      const ko = K.el("K.O.!", `left:0;width:1080px;top:680px;text-align:center;font-size:150px;letter-spacing:-12px;color:#fff;opacity:0;z-index:9;text-shadow:8px 8px 0 ${AZ},16px 16px 0 ${NV}`);
      ko.classList.add("px");
      K.set(ko, { opacity: 1 }, tk + 0.7);
      K.ft(ko, { scale: 1.4 }, { scale: 1, duration: 0.2, ease: "steps(4)" }, tk + 0.7);
      pisca(K, ko, tk + 1.3, 2, 0.08);
      K.set(ko, { opacity: 0 }, tk + 1.75);
      pisca(K, nm, tk + 0.7, 4, 0.1);
    }
  });

  // ---------- px-xp  barra de XP do aluno e LEVEL UP ----------
  MB.def("px-xp", { em: 0, dur: 10, reps: [1, 2, 3, 4], xp: 25, xp_max: 100, nome: "ULLISSES", nivel: 7, sobe_em: null, y: 1470 }, function (P, K) {
    const t0 = K.t(), t1 = t0 + P.dur, y = P.y;
    const box = caixa(K, `left:56px;top:${y}px;width:968px;height:150px`, t0 + 0.3, t1);
    const nm = K.el(P.nome, "left:28px;top:26px;font-size:32px", box); nm.classList.add("px");
    const lv = K.el("LV" + P.nivel, "right:28px;top:26px;font-size:32px;color:#ffcf4a", box); lv.classList.add("px");
    const xl = K.el("XP", "left:28px;top:90px;font-size:24px;color:" + CL, box); xl.classList.add("px");
    const seg = 10, segs = [];
    const tr = K.el("", "left:100px;top:84px;width:836px;height:36px;background:#06102a;box-shadow:0 0 0 4px #fff", box);
    for (let i = 0; i < seg; i++) segs.push(K.el("", `left:${i * 83.6 + 4}px;top:4px;width:75px;height:28px;background:#2f74f2;box-shadow:inset 0 6px 0 rgba(255,255,255,.35);opacity:0`, tr));
    let xp = 0, cheio = 0;
    P.reps.forEach((r) => {
      const t = K.t(r); xp = Math.min(P.xp_max, xp + P.xp); const alvo = Math.round(seg * xp / P.xp_max);
      for (let i = cheio; i < alvo; i++) { K.set(segs[i], { opacity: 1 }, t + (i - cheio) * 0.04); }
      cheio = alvo;
      const g = K.el(`${sprite(GEMA, 6)}<span class="px" style="font-size:28px;color:${CL};margin-left:12px">+${P.xp} XP</span>`, `left:${100 + 83.6 * Math.max(0, alvo - 1)}px;top:${y - 60}px;display:flex;align-items:center;opacity:0;z-index:8`);
      K.set(g, { opacity: 1 }, t + 0.05);
      K.ft(g, { y: 0 }, { y: -64, duration: 0.4, ease: "steps(4)" }, t + 0.05);
      K.set(g, { opacity: 0 }, t + 0.8);
      K.sfx("px_moeda", t + 0.05, 0.45);
    });
    const ts = P.sobe_em != null ? K.t(P.sobe_em) : null;
    if (ts != null) {
      pisca(K, segs, ts, 3, 0.07);
      const ban = K.el("LEVEL UP!", `left:0;width:1080px;top:700px;text-align:center;font-size:104px;color:#ffcf4a;opacity:0;z-index:9;text-shadow:8px 8px 0 ${AZ},16px 16px 0 ${NV}`);
      ban.classList.add("px");
      const sub = K.el(`LV${P.nivel} &gt; LV${P.nivel + 1}`, `left:0;width:1080px;top:850px;text-align:center;font-size:48px;opacity:0;z-index:9`); sub.classList.add("px");
      K.set(ban, { opacity: 1 }, ts + 0.1); K.ft(ban, { y: 120 }, { y: 0, duration: 0.25, ease: "steps(5)" }, ts + 0.1);
      K.set(sub, { opacity: 1 }, ts + 0.4); pisca(K, sub, ts + 0.6, 3, 0.08);
      K.set(lv, { textContent: "LV" + (P.nivel + 1) }, ts + 0.4); pisca(K, lv, ts + 0.4, 3, 0.08);
      K.set(segs, { opacity: 0 }, ts + 0.5);
      for (let i = 0; i < 10; i++) {
        const a = (i / 10) * Math.PI * 2, s = K.el(sprite(BRILHO, 10), `left:${540 - 35}px;top:${780 - 35}px;opacity:0;z-index:8`);
        K.set(s, { opacity: 1 }, ts + 0.1);
        K.ticker((t) => { const k = t - ts - 0.1; gsap.set(s, { x: passo(Math.cos(a) * 520 * k, 10), y: passo(Math.sin(a) * 520 * k, 10) }); }, ts + 0.1, ts + 0.9);
        K.set(s, { opacity: 0 }, ts + 0.9);
      }
      K.sfx("px_levelup", ts + 0.1, 0.6);
      K.set([ban, sub], { opacity: 0 }, ts + 1.9);
    }
  });

  // ---------- px-corte  transição em blocos de pixel ----------
  MB.def("px-corte", { em: 0, tam: 90, dur: 0.36, cor: NV }, function (P, K) {
    const t0 = K.t(), cols = Math.ceil(1080 / P.tam), rows = Math.ceil(1920 / P.tam), meia = P.dur / 2;
    const raiz = document.getElementById("root"), cel = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const e = K.el("", `left:${c * P.tam}px;top:${r * P.tam}px;width:${P.tam}px;height:${P.tam}px;background:${P.cor};opacity:0;z-index:96`);
      e.parentNode.removeChild(e); raiz.appendChild(e); cel.push([e, K.rnd(), K.rnd()]);
    }
    cel.forEach(([e, a, b]) => { K.set(e, { opacity: 1 }, t0 - meia + a * meia * 0.9); K.set(e, { opacity: 0 }, t0 + b * meia * 0.9); });
    K.sfx("px_corte", t0 - meia, 0.6);
  });

  // ---------- px-dialogo  caixa de diálogo de RPG ----------
  MB.def("px-dialogo", { em: 0, dur: 5, nome: "ULLISSES", texto: "COLUNA RETA E *FORÇA NO QUADRIL*.", vel: 0.035, y: 1290, altura: 340 }, function (P, K) {
    const t0 = K.t(), t1 = t0 + P.dur, y = P.y;
    const box = caixa(K, `left:56px;top:${y}px;width:968px;height:${P.altura}px`, t0, t1);
    const tab = K.el(`${sprite(HALTER, 5)}<span class="px" style="font-size:28px;margin-left:14px">${P.nome}</span>`,
      `left:56px;top:${y - 84}px;display:flex;align-items:center;padding:14px 20px;background:${AZ};opacity:0;box-shadow:0 -6px 0 0 #fff,0 6px 0 0 #fff,-6px 0 0 0 #fff,6px 0 0 0 #fff`);
    K.set(tab, { opacity: 1 }, t0 + 0.2); K.set(tab, { opacity: 0 }, t1 - 0.16);
    // letra por letra (palavra entre *asteriscos* sai em amarelo)
    let html = "", dest = false, n = 0;
    for (const c of P.texto) {
      if (c === "*") { dest = !dest; continue; }
      if (c === "|") { html += "<br>"; continue; }
      html += `<span class="c" style="opacity:0;${dest ? "color:#ffcf4a" : ""}">${c === " " ? " " : c}</span>`; n++;
    }
    const tx = K.el(html, `left:44px;top:40px;width:880px;font-size:52px;line-height:1.3;font-weight:500`, box); tx.classList.add("pxs");
    const cs = tx.querySelectorAll(".c"); let t = t0 + 0.35;
    cs.forEach((c, i) => { K.set(c, { opacity: 1 }, t); if (i % 2 === 0 && c.textContent.trim()) K.sfx("px_blip", t, 0.35); t += P.vel * (/[.,:!?]/.test(c.textContent) ? 5 : 1); });
    const seta = K.el("▼", `right:36px;bottom:24px;font-size:32px;color:#ffcf4a;opacity:0`, box); seta.classList.add("px");
    K.set(seta, { opacity: 1 }, t + 0.1);
    for (let k = t + 0.1; k < t1 - 0.3; k += 0.4) { K.set(seta, { y: 8 }, k); K.set(seta, { y: 0 }, k + 0.2); }
  });

  // ---------- px-salvar  disquete: JOGO SALVO ----------
  MB.def("px-salvar", { em: 0, dur: 4, texto: "SALVA PRO|PRÓXIMO TREINO", y: 1260, salvando: "SALVANDO", salvo: "JOGO SALVO!" }, function (P, K) {
    const t0 = K.t(), t1 = t0 + P.dur, y = P.y;
    const tit = K.el(P.texto.split("|").map((l) => `<div>${l}</div>`).join(""), `left:0;width:1080px;top:${y - 230}px;text-align:center;font-size:76px;font-weight:700;line-height:1.1;opacity:0`);
    tit.classList.add("pxs");
    K.set(tit, { opacity: 1 }, t0);
    K.ft(tit, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.3, ease: "steps(6)" }, t0);
    K.sfx("px_passo", t0, 0.5);
    const box = caixa(K, `left:140px;top:${y}px;width:800px;height:260px`, t0 + 0.25, t1);
    const dq = K.el(sprite(DISQ, 12), "left:36px;top:34px", box);
    K.ft(dq, { y: -48 }, { y: 0, duration: 0.3, ease: "steps(3)" }, t0 + 0.45);
    const lb = K.el(P.salvando, "left:270px;top:48px;font-size:32px", box); lb.classList.add("px");
    const pts = K.el("", "left:526px;top:48px;font-size:32px", box); pts.classList.add("px");
    const ts = t0 + 0.7;
    for (let i = 0; i < 8; i++) K.set(pts, { textContent: ".".repeat(i % 4) }, ts + i * 0.15);
    const tr = K.el("", "left:270px;top:120px;width:480px;height:44px;background:#06102a;box-shadow:0 0 0 4px #fff", box);
    for (let i = 0; i < 8; i++) {
      const s = K.el("", `left:${6 + i * 59}px;top:6px;width:52px;height:32px;background:#2f74f2;box-shadow:inset 0 6px 0 rgba(255,255,255,.35);opacity:0`, tr);
      K.set(s, { opacity: 1 }, ts + i * 0.14); K.sfx("px_blip", ts + i * 0.14, 0.3);
    }
    const tf = ts + 8 * 0.14 + 0.1;
    K.set([lb, pts, tr], { opacity: 0 }, tf);
    const ok = K.el(`${sprite(CHECK, 6)}<span class="px" style="font-size:36px;color:#ffcf4a;margin-left:18px">${P.salvo}</span>`, "left:270px;top:92px;display:flex;align-items:center;opacity:0", box);
    K.set(ok, { opacity: 1 }, tf); pisca(K, ok, tf + 0.1, 3, 0.08);
    K.sfx("px_salvar", tf, 0.6);
    K.set(tit, { opacity: 0 }, t1);
  });
})();
