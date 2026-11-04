/* Grupo J. Formatos que viralizam (motions 56 a 60), na linha premium.
   Legenda que acompanha a voz, "em vez disso / faça assim", cards com o clipe dentro, cadência 3-1-1
   e barra de capítulos. Mesma linha dos outros: um foco por vez, dois pesos, rótulos em letra de máquina,
   linhas finas, vidro marinho e a faixa azul da MB só na palavra que importa. Usa MB.lux (L-premium.js).
   A cor do vídeo não muda (Paulo, 2026-11-04): nada de filtro no vídeo nem véu grande; o escuro fica só atrás
   do texto (MB.lux.fundo). */
(function () {
  const AZ = "#1f66e5", CL = "#9fbcff", RED = "#e04646";
  const fx = (v) => (+v).toFixed(1);
  // título em dois pesos que sobe da fenda (devolve as fendas para fechar depois)
  function titulo(K, txt, x, y, fzMax, larg, at, alinhar) {
    const { rico, limpo, fenda, sobe, pesa } = MB.lux;
    const ls = String(txt).split("|"), nc = Math.max(...ls.map((s) => limpo(s).length));
    const fz = Math.min(fzMax, Math.floor(larg / (0.72 * nc))), lh = Math.round(fz * 1.04);
    const r = ls.map((s, i) => {
      const css = alinhar === "centro" ? `left:0;width:1080px;text-align:center;top:${y + i * lh}px;font-size:${fz}px` : `left:${x - 4}px;top:${y + i * lh}px;font-size:${fz}px`;
      const [m, sp] = fenda(K, rico(s), css);
      m.classList.add("lx-tit", "lx-fino", "lx-sombra"); sobe(K, sp, at + i * 0.12, 1.0); pesa(K, m, at + 0.25 + i * 0.12);
      return sp;
    });
    return { sp: r, h: ls.length * lh, fz };
  }
  const fechaTudo = (K, sps, at) => sps.forEach((sp, i) => MB.lux.fecha(K, sp, at + i * 0.04, 0.4));
  // leva um elemento para cima dos espelhos de vídeo (que ficam acima da camada de motions)
  function paraCima(el, z) { el.parentNode.removeChild(el); document.getElementById("root").appendChild(el); el.style.zIndex = z || 46; return el; }

  // ---------- 56 Legenda que acompanha a voz ----------
  // A frase inteira fica na tela; a faixa azul anda de palavra em palavra junto com a fala.
  // tempos: segundo (a partir do "em") em que cada palavra começa; gere com motor/transcrever.py --formato 56.
  // Sem tempos, as palavras são distribuídas pelo tamanho. Frase longa: divida em dois motions 56 seguidos.
  MB.def("56", { em: 0, dur: 3.2, frase: "BARRA RENTE AO CORPO", tempos: null, y: 1250, tam: 64 }, function (P, K) {
    const { ESC } = MB.lux;
    const t0 = K.t(), t1 = t0 + P.dur, ws = String(P.frase).trim().split(/\s+/), n = ws.length;
    let tp = P.tempos;
    if (!tp || tp.length !== n) {
      const pesos = ws.map((w) => 1 + w.replace(/[^\p{L}\d]/gu, "").length * 0.18), tot = pesos.reduce((a, b) => a + b, 0), ini = 0.15, fim = P.dur - 0.45;
      let acc = 0; tp = pesos.map((p) => { const v = ini + (fim - ini) * acc / tot; acc += p; return v; });
    }
    const T = tp.map((v) => t0 + v);
    const larg = ws.join(" ").length * P.tam * 0.66, nl = Math.ceil(larg / 900), h = nl * Math.round(P.tam * 1.3);
    const lf = nl > 1 ? 960 : Math.min(960, Math.round(larg) + 70);
    MB.lux.fundo(K, 540 - lf / 2, P.y - 6, lf, h + 12, t0, t1 - 0.45, 0.55, 70);
    const c = K.el(`<div class="bd" style="position:absolute;left:0;top:0;width:0;height:0;background:${AZ};border-radius:6px;opacity:0;z-index:0"></div>` +
      ws.map((w, i) => `<span class="w" style="display:inline-block;position:relative;z-index:1;padding:.04em .14em .06em;opacity:.42">${ESC(w)}</span>`).join(" "),
      `left:60px;width:960px;top:${P.y}px;text-align:center;font-size:${P.tam}px;line-height:1.3;text-wrap:balance;z-index:0;opacity:0`);
    c.classList.add("lx", "lx-sombra"); c.style.fontWeight = 700;
    const sp = Array.from(c.querySelectorAll(".w")), bd = c.querySelector(".bd");
    K.ft(c, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, t0);
    const rect = (e) => [e.offsetLeft, e.offsetTop, e.offsetWidth, e.offsetHeight];
    K.ticker((t) => {
      let i = -1; for (let k = 0; k < n; k++) if (t >= T[k]) i = k;
      sp.forEach((e, k) => { e.style.opacity = k <= i ? 1 : 0.42; });
      if (i < 0) { bd.style.opacity = 0; return; }
      const r1 = rect(sp[i]), r0 = i > 0 ? rect(sp[i - 1]) : r1, k = Math.min(1, (t - T[i]) / 0.2), e = 1 - Math.pow(1 - k, 3);
      const mix = (a, b) => a + (b - a) * e, mesmaLinha = Math.abs(r0[1] - r1[1]) < 4;
      const r = mesmaLinha ? r0.map((v, j) => mix(v, r1[j])) : r1;
      Object.assign(bd.style, { left: r[0] + "px", top: r[1] + "px", width: r[2] + "px", height: r[3] + "px", opacity: mesmaLinha || i === 0 ? 1 : e });
    }, t0, t1);
    MB.lux.apaga(K, [c], t1 - 0.3, 0.3);
  });

  // ---------- 57 Em vez disso / Faça assim ----------
  // O trecho do erro ganha o X vermelho; a passada azul cobre o corte; o certo entra com o ✓ azul.
  // O spec precisa ter o corte do erro para o certo no segundo "troca_em" (contado a partir do "em").
  // pb: true deixa o erro em preto e branco. Fica desligado: o Paulo pediu em 2026-11-04 para não mexer na cor do vídeo.
  MB.def("57", {
    em: 0, dur: 7, troca_em: 3.4, rotulo_erro: "EM VEZ DISSO", erro: "PUXAR COM|AS *COSTAS*", rotulo_certo: "FAÇA ASSIM", certo: "EMPURRE|O *CHÃO*", y: 250, pb: false
  }, function (P, K) {
    const { ESC, rotulo, apaga } = MB.lux;
    const t0 = K.t(), t1 = t0 + P.dur, tc = t0 + P.troca_em, X = 72, y = P.y;
    // fundo escuro só atrás do cabeçalho (rótulo, título e ícone)
    const nl = Math.max(String(P.erro).split("|").length, String(P.certo).split("|").length);
    MB.lux.fundo(K, X - 16, y - 8, 1080 - 2 * (X - 16), 60 + nl * 117 + 24, t0, t1 - 0.5, 0.55, 80);
    if (P.pb) {
      K.ft(K.cam, { filter: "grayscale(0)" }, { filter: "grayscale(1)", duration: 0.45, ease: "power2.out" }, t0);
      K.set(K.cam, { filter: "none" }, tc);
    }
    // bloco de cabeçalho: quadradinho de cor, rótulo, título e o ícone desenhado à direita
    const bloco = (rot, tit, cor, icone, at, ate) => {
      const r = K.el(`<span style="display:inline-block;width:16px;height:16px;background:${cor};margin-right:16px;vertical-align:-1px"></span>${ESC(rot)}`, `left:${X}px;top:${y}px;opacity:0`);
      r.classList.add("lx-rot", "lx-sombra"); r.style.color = "#fff";
      rotulo(K, r, at, 0.9, 0.3); K.sfx("lux_clique", at, 0.5);
      const tt = titulo(K, tit, X, y + 60, 112, 760, at + 0.1);
      K.sfx("lux_grave", at + 0.1, 0.5);
      const s = 104, ix = 1080 - X - s, iy = y + 64;
      const ic = K.svg(`<circle class="c" cx="${s / 2}" cy="${s / 2}" r="${s / 2 - 3}" fill="rgba(6,15,38,.55)" stroke="${cor}" stroke-width="3"/>` +
        (icone === "x" ? `<path class="a" d="M${s * 0.34} ${s * 0.34} L${s * 0.66} ${s * 0.66}" stroke="#fff" stroke-width="6" stroke-linecap="round"/><path class="b" d="M${s * 0.66} ${s * 0.34} L${s * 0.34} ${s * 0.66}" stroke="#fff" stroke-width="6" stroke-linecap="round"/>`
          : `<path class="a" d="M${s * 0.29} ${s * 0.52} L${s * 0.44} ${s * 0.66} L${s * 0.72} ${s * 0.36}" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`),
        s, s, `left:${ix}px;top:${iy}px;filter:drop-shadow(0 4px 10px rgba(4,10,26,.5))`);
      K.desenha(ic.querySelector(".c"), at + 0.25, 0.7, "power2.inOut");
      K.desenha(ic.querySelector(".a"), at + 0.7, 0.3, "power2.out");
      if (ic.querySelector(".b")) K.desenha(ic.querySelector(".b"), at + 0.95, 0.3, "power2.out");
      K.sfx("lux_traco", at + 0.7, 0.4);
      apaga(K, [r, ic], ate, 0.35); fechaTudo(K, tt.sp, ate);
    };
    bloco(P.rotulo_erro, P.erro, RED, "x", t0 + 0.15, tc - 0.45);
    // passada azul: um painel limpo atravessa a tela e esconde o corte
    const pd = 0.8, pa = K.el(`<div style="position:absolute;right:0;top:0;width:3px;height:100%;background:rgba(255,255,255,.85)"></div>`, `left:0;top:0;width:1180px;height:1920px;background:${AZ};transform:translateX(-1200px)`);
    paraCima(pa, 60);
    K.ft(pa, { x: -1200 }, { x: 1200, duration: pd, ease: "expo.inOut" }, tc - pd / 2);
    K.sfx("lux_passagem", tc - 0.3, 0.6);
    bloco(P.rotulo_certo, P.certo, AZ, "v", tc + 0.2, t1 - 0.5);
  });

  // ---------- 58 Cards com o clipe dentro ----------
  // cards: [[rótulo, título, começa em (s, a partir do "em"), segundos do cronômetro (opcional)], ...]
  // O vídeo encolhe para dentro de um cartão sobre um fundo marinho e volta a tela cheia no fim. O clipe fica com a
  // cor original dentro da janela (nada de desfoque, escurecer ou saturar o vídeo: pedido do Paulo em 2026-11-04).
  MB.def("58", {
    em: 0, dur: 8, espelho: 1, y: 250,
    cards: [["SEMANA 1", "5 FLEXÕES|*POR DIA*", 0, 0], ["SEMANA 2", "10 FLEXÕES|*POR DIA*", 2.6, 0], ["SEMANA 3", "3 SÉRIES|*DE 8*", 5.0, 0]]
  }, function (P, K) {
    const { ESC, rotulo, apaga, recolhe, linha } = MB.lux;
    const t0 = K.t(), t1 = t0 + P.dur, M = K.espelho(P.espelho), cs = P.cards, n = cs.length, y = P.y;
    const S = 0.62, Wv = 1080 * S, cy = 1060, ins = 9;          // janela: 9% cortado em cima e embaixo
    const Hv = 1920 * (1 - 2 * ins / 100) * S, wx = 540 - Wv / 2, wy = cy - Hv / 2, ty = cy - 960;
    // fundo: marinho sólido com um leve degradê (cobre o vídeo, não muda a cor dele)
    const v = K.el("", `left:0;top:0;width:1080px;height:1920px;opacity:0;z-index:0;background:${MB.verde ? "rgba(5,12,30,.5)" : "radial-gradient(120% 70% at 50% 42%, #0d2050 0%, #08173a 55%, #050e26 100%)"}`);
    if (MB.verde) { K.set(v, { opacity: 1 }, t0); K.set(v, { opacity: 0 }, t1); }   // no verde, sem fade (a janela cobre a troca)
    else {
      K.ft(v, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.out" }, t0);
      K.ft(v, { opacity: 1 }, { opacity: 0, duration: 0.7, ease: "power2.inOut" }, t1 - 0.75);
    }
    // o vídeo encolhe para o cartão e volta no fim
    M.style.zIndex = 45;
    K.set(M, { opacity: 1, scale: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 0px)" }, t0);
    K.ft(M, { scale: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 0px)" }, { scale: S, y: ty, clipPath: `inset(${ins}% 0% ${ins}% 0% round 30px)`, duration: 1.0, ease: "expo.inOut" }, t0);
    K.ft(M, { scale: S, y: ty, clipPath: `inset(${ins}% 0% ${ins}% 0% round 30px)` }, { scale: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 0.8, ease: "expo.inOut" }, t1 - 0.8);
    K.set(M, { opacity: 0 }, t1);
    K.sfx("lux_ar", t0, 0.6); K.sfx("lux_ar", t1 - 0.8, 0.5);
    // moldura fina por cima da janela
    const mo = paraCima(K.el("", `left:${fx(wx)}px;top:${fx(wy)}px;width:${fx(Wv)}px;height:${fx(Hv)}px;border-radius:20px;box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.35);opacity:0`), 46);
    K.ft(mo, { opacity: 0 }, { opacity: 1, duration: 0.4 }, t0 + 0.85);
    K.ft(mo, { opacity: 1 }, { opacity: 0, duration: 0.2 }, t1 - 0.8);
    // barra de progresso fina embaixo da janela (anda durante cada card)
    const pb = paraCima(K.el("", `left:${fx(wx)}px;top:${fx(wy + Hv + 22)}px;width:${fx(Wv)}px;height:3px;background:rgba(255,255,255,.18);opacity:0`), 46);
    K.ft(pb, { opacity: 0 }, { opacity: 1, duration: 0.4 }, t0 + 0.9); apaga(K, [pb], t1 - 0.85, 0.3);
    // índice 01 / 03 à direita do rótulo
    const fimCard = (i) => (i + 1 < n ? t0 + cs[i + 1][2] : t1 - 0.85);
    cs.forEach(([rot, tit, ini, seg], i) => {
      const a = t0 + ini + (i === 0 ? 0.55 : 0.1), b = fimCard(i), sai = i + 1 < n ? b - 0.05 : b;
      const r = K.el(`<span style="color:${CL}">${String(i + 1).padStart(2, "0")}</span>&nbsp;&nbsp;/&nbsp;&nbsp;${String(n).padStart(2, "0")}&nbsp;&nbsp;·&nbsp;&nbsp;${ESC(rot)}`, `left:72px;top:${y}px;opacity:0`);
      r.classList.add("lx-rot", "lx-sombra"); r.style.color = "#fff";
      rotulo(K, r, a, 0.8, 0.3); apaga(K, [r], sai - 0.3, 0.3);
      const tt = titulo(K, tit, 72, y + 56, 96, 936, a + 0.05);
      fechaTudo(K, tt.sp, sai - 0.35);
      K.sfx("lux_grave", a + 0.05, 0.45);
      // troca de card (o corte do vídeo acontece por baixo, sem escurecer a janela)
      if (i > 0) K.sfx("lux_passagem", t0 + ini - 0.1, 0.35);
      // progresso do card
      const pf = paraCima(K.el("", `left:${fx(wx)}px;top:${fx(wy + Hv + 22)}px;width:${fx(Wv)}px;height:3px;background:#fff;transform:scaleX(0);transform-origin:left center`), 47);
      K.ft(pf, { scaleX: 0 }, { scaleX: 1, duration: Math.max(0.3, b - (t0 + ini)), ease: "none" }, t0 + ini + (i === 0 ? 0.6 : 0));
      K.ft(pf, { opacity: 1 }, { opacity: 0, duration: 0.2 }, b - 0.02);
      // cronômetro opcional (segundos do exercício) num chip no canto da janela
      if (seg) {
        // tempo do exercício (fixo: o vídeo mostra um trecho, o cronômetro não corre de mentira)
        const relogio = `<svg width="22" height="22" viewBox="0 0 24 24" style="vertical-align:-4px;margin-right:10px"><circle cx="12" cy="13" r="8.5" fill="none" stroke="#9fbcff" stroke-width="2"/><path d="M12 13 V8.5 M9.5 2.5 H14.5" stroke="#9fbcff" stroke-width="2" stroke-linecap="round"/></svg>`;
        const ch = paraCima(K.el(`${relogio}${seg} S`, `left:${fx(wx + Wv - 176)}px;top:${fx(wy + 22)}px;width:154px;text-align:center;padding:11px 0;font-size:24px;opacity:0`), 47);
        ch.classList.add("lx-vidro", "lx-rot"); ch.style.color = "#fff";
        K.ft(ch, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, a + 0.2);
        apaga(K, [ch], sai - 0.25, 0.25);
      }
    });
  });

  // ---------- 59 Cadência da repetição ----------
  // fases: [[nome, segundos], ...]. O cursor anda em tempo real, conta os segundos e bipa a cada um.
  MB.def("59", { em: 0, dur: 6.0, fases: [["DESCE", 3], ["SEGURA", 1], ["SOBE", 1]], reps: 1, rotulo: "CADÊNCIA 3 · 1 · 1", inicio: 0.5, y: 1150 }, function (P, K) {
    const { ESC, fenda, sobe, fecha, rotulo, apaga, linha, recolhe } = MB.lux;
    const t0 = K.t(), t1 = t0 + P.dur, X = 72, LW = 936, y = P.y, fs = P.fases, ciclo = fs.reduce((a, f) => a + f[1], 0);
    const ts = t1 - 0.5, gap = 10, Wseg = fs.map((f) => (LW - gap * (fs.length - 1)) * f[1] / ciclo);
    const xs = Wseg.map((_, i) => X + Wseg.slice(0, i).reduce((a, b) => a + b, 0) + gap * i);
    MB.lux.fundo(K, X - 20, y - 10, LW + 40, 280, t0, ts, 0.55, 70);
    const r = K.el(ESC(P.rotulo), `left:${X}px;top:${y}px;opacity:0`); r.classList.add("lx-rot", "az", "lx-sombra");
    rotulo(K, r, t0 + 0.05, 0.9); apaga(K, [r], ts, 0.4);
    // trilhos e preenchimentos de cada fase
    const yr = y + 190;
    const trilhos = fs.map((f, i) => {
      const tr = K.el("", `left:${fx(xs[i])}px;top:${yr}px;width:${fx(Wseg[i])}px;height:6px;border-radius:3px;background:rgba(255,255,255,.2);transform:scaleX(0);transform-origin:left center`);
      linha(K, tr, t0 + 0.1 + i * 0.08, 0.9); recolhe(K, tr, ts, 0.35);
      const lb = K.el(`${ESC(f[0])} <span style="color:${CL}">${f[1]} S</span>`, `left:${fx(xs[i])}px;top:${yr + 26}px;opacity:0;font-size:20px`); lb.classList.add("lx-rot", "lx-sombra");
      rotulo(K, lb, t0 + 0.25 + i * 0.08, 0.8, 0.2); apaga(K, [lb], ts, 0.35);
      // marquinhas de segundo
      for (let s = 1; s < f[1]; s++) { const mk = K.el("", `left:${fx(xs[i] + Wseg[i] * s / f[1] - 1)}px;top:${yr - 6}px;width:2px;height:18px;background:rgba(255,255,255,.4);opacity:0`); K.ft(mk, { opacity: 0 }, { opacity: 1, duration: 0.3 }, t0 + 0.6); apaga(K, [mk], ts, 0.3); }
      return tr;
    });
    const fills = fs.map((f, i) => { const e = K.el("", `left:${fx(xs[i])}px;top:${yr}px;width:${fx(Wseg[i])}px;height:6px;border-radius:3px;background:#fff;transform:scaleX(0);transform-origin:left center`); return e; });
    // cursor: linha fina com ponto
    const cur = K.el(`<div style="position:absolute;left:-1px;top:0;width:2px;height:54px;background:#fff"></div><div style="position:absolute;left:-8px;top:-8px;width:16px;height:16px;border-radius:50%;background:#fff;box-shadow:0 0 0 6px rgba(255,255,255,.16)"></div>`, `left:${X}px;top:${yr - 24}px;width:2px;height:54px;opacity:0`);
    // palavra da fase (dois pesos) e o número grande que conta
    const yw = y + 52, a0 = t0 + P.inicio;
    K.ft(cur, { opacity: 0 }, { opacity: 1, duration: 0.3 }, a0 - 0.15);
    const pos = (u) => { let acc = 0; for (let i = 0; i < fs.length; i++) { if (u <= acc + fs[i][1] || i === fs.length - 1) return xs[i] + Wseg[i] * Math.min(1, (u - acc) / fs[i][1]); acc += fs[i][1]; } return X + LW; };
    K.ticker((t) => { const u = Math.max(0, t - a0) % ciclo, fim = t - a0 >= ciclo * P.reps; gsap.set(cur, { x: (fim ? X + LW : pos(u)) - X }); }, a0, Math.min(ts, a0 + ciclo * P.reps + 0.05));
    for (let rp = 0; rp < P.reps; rp++) {
      let acc = 0;
      fs.forEach(([nome, seg], i) => {
        const fa = a0 + rp * ciclo + acc, fb = fa + seg; acc += seg;
        K.ft(fills[i], { scaleX: 0 }, { scaleX: 1, duration: seg, ease: "none" }, fa);
        if (rp + 1 < P.reps) K.ft(fills[i], { scaleX: 1 }, { scaleX: 0, duration: 0.2, ease: "power2.in" }, a0 + (rp + 1) * ciclo - 0.2);
        // nome da fase
        const [m, sp] = fenda(K, `<b class="lx-b">${ESC(nome)}</b> <span style="font-weight:200">EM ${seg}</span>`, `left:${X - 4}px;top:${yw}px;font-size:96px`);
        m.classList.add("lx-tit", "lx-sombra");
        sobe(K, sp, fa, 0.45); fecha(K, sp, Math.min(fb - 0.12, ts), 0.25);
        // segundos: 1, 2, 3...
        for (let s = 0; s < seg; s++) {
          const ta = fa + s, [mn, sn] = fenda(K, String(s + 1), `right:${X}px;top:${yw - 26}px;font-size:150px`);
          mn.classList.add("lx-num");
          sobe(K, sn, ta, 0.35); fecha(K, sn, Math.min(ta + 0.88, ts), 0.2);
          K.sfx(s === 0 ? "lux_toque" : "lux_clique", ta, s === 0 ? 0.55 : 0.5);
        }
      });
    }
    K.sfx("lux_sino", a0 + ciclo * P.reps, 0.5);
    apaga(K, fills.concat([cur]), ts, 0.4);
  });

  // ---------- 60 Barra de capítulos ----------
  // capitulos: [[rótulo curto, título, começa em (s, a partir do "em")], ...]. A barra enche durante o vídeo.
  MB.def("60", {
    em: 0, dur: 9, y: 236, titulo_y: 330,
    capitulos: [["ERRO 1", "QUADRIL|*CAINDO*", 0], ["ERRO 2", "COTOVELO|*ABERTO*", 3], ["ERRO 3", "MEIA|*DESCIDA*", 6]]
  }, function (P, K) {
    const { ESC, rotulo, apaga } = MB.lux;
    const t0 = K.t(), t1 = t0 + P.dur, cs = P.capitulos, n = cs.length, X = 72, LW = 936, gap = 12, y = P.y;
    const Ws = (LW - gap * (n - 1)) / n, fimCap = (i) => (i + 1 < n ? t0 + cs[i + 1][2] : t1 - 0.35);
    // fundo escuro só atrás da barra e de cada título, enquanto ele está na tela (título fino sobre camiseta branca
    // não lê). Criados antes do texto para ficar atrás.
    MB.lux.fundo(K, X - 16, y - 12, LW + 32, 66, t0, t1 - 0.5, 0.5, 60);
    cs.forEach(([, tit, ini], i) => {
      const ls = String(tit).split("|"), nc = Math.max(...ls.map((s) => MB.lux.limpo(s).length));
      const fz = Math.min(104, Math.floor(760 / (0.72 * nc))), a = t0 + ini, b = fimCap(i);
      MB.lux.fundo(K, X - 14, P.titulo_y - 8, Math.min(980, Math.round(0.72 * nc * fz) + 40), ls.length * Math.round(fz * 1.04) + 16,
        a + 0.05, Math.min(a + 2.2, b - 0.45), 0.55, 80);
    });
    cs.forEach(([rot, tit, ini], i) => {
      const x = X + i * (Ws + gap), a = t0 + ini, b = fimCap(i);
      const tr = K.el("", `left:${fx(x)}px;top:${y}px;width:${fx(Ws)}px;height:5px;border-radius:3px;background:rgba(255,255,255,.26);transform:scaleX(0);transform-origin:left center`);
      K.ft(tr, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "expo.inOut" }, t0 + i * 0.08);
      const fl = K.el("", `left:${fx(x)}px;top:${y}px;width:${fx(Ws)}px;height:5px;border-radius:3px;background:#fff;transform:scaleX(0);transform-origin:left center`);
      K.ft(fl, { scaleX: 0 }, { scaleX: 1, duration: Math.max(0.2, b - a), ease: "none" }, a);
      const lb = K.el(`<span style="color:${CL}">${String(i + 1).padStart(2, "0")}</span>&nbsp;&nbsp;${ESC(rot)}`, `left:${fx(x)}px;top:${y + 22}px;opacity:0;font-size:20px`);
      lb.classList.add("lx-rot", "lx-sombra");
      rotulo(K, lb, t0 + 0.2 + i * 0.08, 0.8, 0.2);
      // o capítulo ativo fica branco; os outros, apagados
      K.ft(lb, { color: "rgba(255,255,255,.55)" }, { color: "#ffffff", duration: 0.3 }, a);
      if (i + 1 < n) K.ft(lb, { color: "#ffffff" }, { color: "rgba(255,255,255,.55)", duration: 0.3 }, b);
      gsap.set(lb, { color: "rgba(255,255,255,.55)" });
      apaga(K, [tr, fl, lb], t1 - 0.35, 0.3);
      // título do capítulo: aparece no começo dele e sai antes do próximo
      const tt = titulo(K, tit, X, P.titulo_y, 104, 760, a + 0.1);
      K.sfx("lux_grave", a + 0.1, 0.45); K.sfx("lux_clique", a, 0.4);
      fechaTudo(K, tt.sp, Math.min(a + 2.2, b - 0.45));
    });
  });
})();
