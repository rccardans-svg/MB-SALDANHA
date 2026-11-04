/* Grupo H. Dados com fonte (motions 46 a 50), na linha premium.
   Um dado forte por vídeo, com a fonte na tela: estudo dos bombeiros (U3), quedas de idosos (D3),
   repouso x movimento (F1) e o teste de salto (P2).
   Visual: o vídeo escurece e desfoca atrás (um foco por vez), cartão de vidro marinho com marcas de corte
   nos cantos, número fino grande, rótulos em letra de máquina, linhas finas, ficha técnica em colunas
   e a fonte no rodapé do cartão (nunca solta em cima do vídeo). Usa MB.lux (L-premium.js). */
(function () {
  const RED = "#e04646", FUNDO = "rgba(6,15,38,.84)";
  const fmtBR = (v, casas) => v.toFixed(casas || 0).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const casasDe = (s) => { const m = String(s).match(/[.,](\d+)/); return m ? m[1].length : 0; };
  const num = (s) => parseFloat(String(s).replace(/\./g, "").replace(",", "."));

  // mede o título (mesma conta do titulo()) para montar o cartão antes de criar os elementos
  function medeTitulo(txt, larg, tamMax) {
    const ls = String(txt).split("|"), nc = Math.max(...ls.map((s) => MB.lux.limpo(s).length));
    const fz = Math.min(tamMax, Math.floor(larg / (0.72 * nc))), lh = Math.round(fz * 1.04);
    return { ls, fz, lh, h: ls.length * lh };
  }
  // letra de máquina (JetBrains Mono avança 0,6 em por letra): fecha o espaçamento e depois o tamanho até caber
  function cabeMono(n, larg, fz, ls) {
    while (n * fz * (0.6 + ls) > larg && ls > 0.06) ls = +(ls - 0.02).toFixed(2);
    while (n * fz * (0.6 + ls) > larg && fz > 16) fz -= 1;
    return [fz, ls];
  }
  // véu: escurece e desfoca o vídeo inteiro atrás do dado. Criar ANTES do cartão (fica atrás pela ordem).
  function veu(K, at, ate, forca, desf) {
    const f = forca == null ? 0.42 : forca, d = desf == null ? 10 : desf;
    const v = K.el("", `left:0;top:0;width:1080px;height:1920px;opacity:0;z-index:0;background:rgba(5,12,30,${f});backdrop-filter:blur(${d}px);-webkit-backdrop-filter:blur(${d}px)`);
    K.ft(v, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.out" }, at);
    K.ft(v, { opacity: 1 }, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, ate);
    return v;
  }
  // cartão de vidro que abre de cima para baixo, com marcas de corte nos quatro cantos (cara de ficha técnica)
  function placa(K, x, y, w, h, at, ate) {
    const p = K.el("", `left:${x}px;top:${y}px;width:${w}px;height:${h}px;clip-path:inset(0% 0% 100% 0%);background:${FUNDO}`);
    p.classList.add("lx-vidro");
    K.ft(p, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.inOut" }, at);
    K.ft(p, { clipPath: "inset(0% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.6, ease: "expo.inOut" }, ate);
    const g = 16, L = 30;
    const cantos = [[x - g, y - g, "M1 30 V1 H30"], [x + w + g - L, y - g, "M0 1 H29 V30"], [x - g, y + h + g - L, "M1 0 V29 H30"], [x + w + g - L, y + h + g - L, "M0 29 H29 V0"]]
      .map(([cx, cy, d]) => K.svg(`<path d="${d}" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="2"/>`, L, L, `left:${cx}px;top:${cy}px;opacity:0`));
    K.ft(cantos, { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.9, ease: "expo.out", stagger: 0.05 }, at + 0.35);
    MB.lux.apaga(K, cantos, ate - 0.05, 0.4);
    K.sfx("lux_ar", at, 0.55);
    return p;
  }
  // cabeçalho do cartão: rótulo à esquerda, página à direita e linha fina embaixo
  function cabeca(K, x, y, w, rot, pag, at, ate) {
    const { ESC, rotulo, linha, recolhe, apaga, respira } = MB.lux;
    const r = K.el(ESC(rot), `left:${x + 48}px;top:${y + 44}px;opacity:0`); r.classList.add("lx-rot", "az");
    const els = [r];
    if (pag) { const p = K.el(ESC(pag), `right:${1080 - (x + w - 48)}px;top:${y + 44}px;opacity:0;color:rgba(255,255,255,.45)`); p.classList.add("lx-rot"); rotulo(K, p, at + 0.15, 1.0); els.push(p); }
    const l = K.el("", `left:${x + 48}px;top:${y + 96}px;width:${w - 96}px;transform:scaleX(0)`); l.classList.add("lx-linha"); l.style.background = "rgba(255,255,255,.22)";
    rotulo(K, r, at, 1.0); linha(K, l, at + 0.1, 1.1); respira(K, r, at + 1.05, ate);
    apaga(K, els, ate, 0.4); recolhe(K, l, ate, 0.4);
    return y + 96;
  }
  // título em dois pesos (fendas), alinhado à esquerda; devolve a altura usada
  function titulo(K, txt, x, y, larg, tamMax, at, ate) {
    const { rico, fenda, sobe, fecha, pesa } = MB.lux;
    const mt = medeTitulo(txt, larg, tamMax);
    mt.ls.forEach((s, i) => {
      const [m, sp] = fenda(K, rico(s), `left:${x - 3}px;top:${y + i * mt.lh}px;font-size:${mt.fz}px`);
      m.classList.add("lx-tit", "lx-fino");
      sobe(K, sp, at + i * 0.13, 1.1); pesa(K, m, at + 0.25 + i * 0.13);
      fecha(K, sp, ate + i * 0.04, 0.42);
    });
    K.sfx("lux_grave", at, 0.45);
    return mt.h;
  }
  // número fino que conta, com sufixo menor
  function numero(K, txt, pre, suf, css, at, dur, ate) {
    const casas = casasDe(txt), alvo = num(txt);
    const e = K.el(`${pre ? `<span class="pre" style="font-family:MONO;font-weight:500;font-size:.13em;letter-spacing:.3em;vertical-align:.9em;margin-right:.3em;color:#9fbcff">${MB.lux.ESC(pre)}</span>` : ""}<span class="n">0</span><span style="font-size:.42em;font-weight:300;margin-left:.04em">${MB.lux.ESC(suf || "")}</span>`,
      css + ";opacity:0;white-space:nowrap");
    e.classList.add("lx-num");
    K.ft(e, { opacity: 0, y: 24, filter: "blur(10px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "expo.out" }, at);
    K.conta(e.querySelector(".n"), 0, alvo, at, dur, (v) => fmtBR(v, casas), "expo.out");
    K.sfx("lux_rolo", at, 0.6); K.sfx("lux_rolo", at + dur * 0.35, 0.4); K.sfx("lux_grave", at + dur * 0.6, 0.5);
    MB.lux.apaga(K, [e], ate, 0.4);
    return e;
  }
  // texto curto que entra subindo e sai apagando
  function texto(K, html, css, at, ate, cls) {
    const e = K.el(html, css + ";opacity:0"); (cls || ["lx"]).forEach((c) => e.classList.add(c));
    K.ft(e, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, at);
    MB.lux.apaga(K, [e], ate, 0.4);
    return e;
  }
  // ficha técnica: colunas com rótulo em letra de máquina e valor em peso leve, separadas por linhas finas
  function ficha(K, itens, x, y, w, at, ate) {
    const { ESC, apaga } = MB.lux;
    const n = itens.length, cw = w / n;
    itens.forEach(([a, b], i) => {
      const cx = x + i * cw + (i ? 28 : 0);
      texto(K, ESC(a), `left:${cx}px;top:${y}px;font-size:22px;letter-spacing:.22em`, at + i * 0.1, ate, ["lx-rot", "az"]);
      texto(K, ESC(b), `left:${cx}px;top:${y + 38}px;font-size:40px;font-weight:300;white-space:nowrap`, at + 0.06 + i * 0.1, ate);
      if (i) {
        const v = K.el("", `left:${x + i * cw}px;top:${y - 4}px;width:2px;height:96px;background:rgba(255,255,255,.2);transform:scaleY(0);transform-origin:center top`);
        K.ft(v, { scaleY: 0 }, { scaleY: 1, duration: 0.8, ease: "expo.inOut" }, at + i * 0.1);
        apaga(K, [v], ate, 0.4);
      }
    });
    K.sfx("lux_clique", at, 0.5); K.sfx("lux_clique", at + 0.1, 0.4); K.sfx("lux_clique", at + 0.2, 0.3);
  }
  // rodapé do cartão com a fonte: linha fina, "FONTE" em azul claro, a referência e a setinha de link
  function rodape(K, txt, x, y, w, at, ate) {
    const { ESC, rotulo, apaga } = MB.lux;
    fio(K, x, y, w, at, ate, "rgba(255,255,255,.16)");
    const [fz, ls] = cabeMono(("FONTE   " + txt).length, w - 48, 21, 0.16);
    const e = K.el(`<span style="color:#9fbcff">FONTE</span>&nbsp;&nbsp;&nbsp;${ESC(txt)}`, `left:${x}px;top:${y + 24}px;font-size:${fz}px;opacity:0;color:rgba(255,255,255,.72)`);
    e.classList.add("lx-rot");
    const s = K.svg(`<path d="M8 26 L26 8 M12 8 H26 V22" fill="none" stroke="rgba(255,255,255,.72)" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>`, 34, 34, `left:${x + w - 30}px;top:${y + 20}px;width:26px;height:26px;opacity:0`);
    s.firstChild.setAttribute("width", 26); s.firstChild.setAttribute("height", 26);
    rotulo(K, e, at + 0.1, 1.0, ls);
    K.ft(s, { opacity: 0, x: -8, y: 8 }, { opacity: 1, x: 0, y: 0, duration: 0.8, ease: "expo.out" }, at + 0.45);
    apaga(K, [e, s], ate, 0.4);
  }
  // linha fina horizontal (entra desenhando, sai recolhendo)
  function fio(K, x, y, w, at, ate, cor) {
    const l = K.el("", `left:${x}px;top:${y}px;width:${w}px;transform:scaleX(0)`); l.classList.add("lx-linha"); if (cor) l.style.background = cor;
    MB.lux.linha(K, l, at, 1.0); MB.lux.recolhe(K, l, ate, 0.4);
    return l;
  }

  // ---------- 46 Card do estudo com a fonte ----------
  MB.def("46", {
    em: 0, dur: 5.8, rotulo: "ESTUDO · JAMA NETWORK OPEN · 2019", pagina: null,
    titulo: "QUEM FAZ MAIS DE|*40 FLEXÕES* TEM", numero: "96", prefixo: "", sufixo: "%", legenda: "MENOS RISCO DE PROBLEMA|NO *CORAÇÃO*",
    nota: "EM COMPARAÇÃO COM QUEM FAZ MENOS DE 10",
    chips: [["ACOMPANHOU", "10 ANOS"], ["PESSOAS", "1.104"], ["QUEM", "BOMBEIROS"]],
    fonte: "YANG ET AL. · HARVARD · 2019", y: 470, veu: true
  }, function (P, K) {
    const t0 = K.t(), t1 = t0 + P.dur, x = 60, w = 960, y = P.y, ts = Math.max(t1 - 0.65, t0 + 3.2);
    const { rico, ESC } = MB.lux;
    // posições de cima para baixo (o cartão cresce com o conteúdo)
    const mt = medeTitulo(P.titulo, w - 96, 64), nLeg = String(P.legenda).split("|").length, temFicha = P.chips && P.chips.length;
    const yt = y + 136, yn = yt + mt.h + 20, yl = yn + 250, yNota = yl + nLeg * 46 + 18;
    const yFio = yNota + (P.nota ? 50 : 0) + 4, yFicha = yFio + 30, yFim = temFicha ? yFicha + 96 : yFio;
    const yRod = yFim + 28, H = (P.fonte ? yRod + 66 : yFim + 44) - y;
    if (P.veu !== false) veu(K, t0, ts + 0.05);
    placa(K, x, y, w, H, t0, ts + 0.1);
    cabeca(K, x, y, w, P.rotulo, P.pagina, t0 + 0.3, ts);
    titulo(K, P.titulo, x + 48, yt, w - 96, 64, t0 + 0.45, ts);
    numero(K, P.numero, P.prefixo, P.sufixo, `left:${x + 36}px;top:${yn}px;font-size:230px`, t0 + 1.0, 1.7, ts);
    const lg = texto(K, rico(P.legenda).replace(/\|/g, "<br>"), `left:${x + 48}px;top:${yl}px;width:${w - 96}px;font-size:40px;font-weight:500;line-height:1.12`, t0 + 1.5, ts);
    lg.querySelectorAll("b.lx-b").forEach((b) => { b.style.fontWeight = 800; });
    if (P.nota) texto(K, ESC(P.nota), `left:${x + 48}px;top:${yNota}px;font-size:22px;letter-spacing:.2em`, t0 + 1.8, ts, ["lx-rot"]);
    fio(K, x + 48, yFio, w - 96, t0 + 1.9, ts, "rgba(255,255,255,.22)");
    if (temFicha) ficha(K, P.chips, x + 48, yFicha, w - 96, t0 + 2.1, ts);
    if (P.fonte) rodape(K, P.fonte, x + 48, yRod, w - 96, t0 + 2.4, ts);
  });

  // ---------- 47 Barras que comparam ----------
  // itens: [rótulo, valor, texto mostrado (opcional), destaque (true/false)]
  MB.def("47", {
    em: 0, dur: 5.4, rotulo: "ESTUDO COM 1.104 BOMBEIROS", pagina: null, titulo: "RISCO DE PROBLEMA|NO *CORAÇÃO*",
    itens: [["MENOS DE 10 FLEXÕES", 100, "100", false], ["MAIS DE 40 FLEXÕES", 4, "4", true]],
    nota: "RISCO RELATIVO · MENOS DE 10 FLEXÕES = 100", fonte: "YANG ET AL. · JAMA NETWORK OPEN · 2019", y: 600, veu: true
  }, function (P, K) {
    const t0 = K.t(), t1 = t0 + P.dur, n = P.itens.length, x = 60, w = 960, y = P.y, Hr = 150, ts = Math.max(t1 - 0.65, t0 + 2.6 + n * 0.3);
    const { ESC } = MB.lux;
    const mt = medeTitulo(P.titulo, w - 96, 64), yt = y + 136, yr0 = yt + mt.h + 50;
    const yNota = yr0 + n * Hr - 10, yRod = yNota + (P.nota ? 60 : 0) + 10, H = (P.fonte ? yRod + 66 : yRod + 24) - y;
    if (P.veu !== false) veu(K, t0, ts + 0.05);
    placa(K, x, y, w, H, t0, ts + 0.1);
    cabeca(K, x, y, w, P.rotulo, P.pagina, t0 + 0.3, ts);
    titulo(K, P.titulo, x + 48, yt, w - 96, 64, t0 + 0.45, ts);
    const max = Math.max.apply(null, P.itens.map((i) => i[1])) || 1, Wb = w - 96;
    P.itens.forEach(([lab, val, txt, dest], i) => {
      const ry = yr0 + i * Hr, tb = t0 + 1.1 + i * 0.3, cor = dest ? "#fff" : "rgba(255,255,255,.72)";
      texto(K, ESC(lab), `left:${x + 48}px;top:${ry}px;font-size:32px;font-weight:${dest ? 700 : 500};color:${cor}`, tb - 0.15, ts);
      numero(K, String(txt != null ? txt : val), "", "", `right:${1080 - (x + w - 48)}px;top:${ry - 22}px;font-size:84px;color:${cor}`, tb, 1.1, ts);
      const yb = ry + 70;
      fio(K, x + 48, yb + 4, Wb, tb - 0.1, ts, "rgba(255,255,255,.16)");
      const br = K.el("", `left:${x + 48}px;top:${yb}px;width:${Math.max(6, Wb * val / max)}px;height:10px;background:${dest ? "#fff" : "rgba(255,255,255,.42)"};transform:scaleX(0);transform-origin:left center`);
      K.ft(br, { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "expo.out" }, tb);
      MB.lux.recolhe(K, br, ts, 0.4);
    });
    if (P.nota) texto(K, ESC(P.nota), `left:${x + 48}px;top:${yNota}px;font-size:22px;letter-spacing:.2em`, t0 + 1.8, ts, ["lx-rot"]);
    if (P.fonte) rodape(K, P.fonte, x + 48, yRod, w - 96, t0 + 2.0, ts);
  });

  // ---------- 48 Anel de porcentagem ----------
  MB.def("48", {
    em: 0, dur: 5.4, rotulo: "OMS · 65 ANOS OU MAIS", prefixo: "ATÉ", valor: 35, sufixo: "%", legenda: "DOS IDOSOS CAEM|PELO MENOS *1 VEZ POR ANO*",
    fracao: [1, 3], fracao_texto: "QUASE 1 EM CADA 3", fonte: "OMS · RELATÓRIO GLOBAL SOBRE QUEDAS DE IDOSOS · 2007", y: 400, veu: true
  }, function (P, K) {
    const { ESC, rico, rotulo, apaga, respira } = MB.lux;
    const t0 = K.t(), t1 = t0 + P.dur, R = 220, cx = 540, cy = P.y + 140 + R, C = 2 * Math.PI * R, ts = Math.max(t1 - 0.65, t0 + 3.4);
    // o anel fica direto sobre o vídeo: véu mais forte e mais desfoque
    if (P.veu !== false) veu(K, t0, ts + 0.05, 0.56, 14);
    const rt = K.el(ESC(P.rotulo), `left:0;width:1080px;top:${P.y}px;text-align:center;opacity:0`); rt.classList.add("lx-rot", "az");
    rotulo(K, rt, t0 + 0.2, 1.0); respira(K, rt, t0 + 1.25, ts); apaga(K, [rt], ts, 0.4);
    // anel fino: trilho, marcas de 5 em 5 e o arco que anda até o valor
    let marcas = "";
    for (let k = 0; k < 20; k++) { const a = -Math.PI / 2 + k * Math.PI / 10, r1 = R + 26, r2 = R + (k % 5 ? 36 : 48); marcas += `<path d="M${cx + Math.cos(a) * r1} ${cy + Math.sin(a) * r1} L${cx + Math.cos(a) * r2} ${cy + Math.sin(a) * r2}" stroke="rgba(255,255,255,${k % 5 ? 0.4 : 0.7})" stroke-width="2"/>`; }
    const sv = K.svg(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="rgba(255,255,255,.2)" stroke-width="2"/>${marcas}
      <circle class="pg" cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" transform="rotate(-90 ${cx} ${cy})" stroke-dasharray="${C}" stroke-dashoffset="${C}"/>`,
      1080, 1920, "left:0;top:0;opacity:0");
    K.ft(sv, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.out" }, t0 + 0.2);
    const tp = t0 + 0.7, dp = 1.8;
    K.ft(sv.querySelector(".pg"), { strokeDashoffset: C }, { strokeDashoffset: C * (1 - P.valor / 100), duration: dp, ease: "expo.inOut" }, tp);
    K.sfx("lux_traco", tp, 0.5);
    // ponto na ponta do arco (mesma curva expo.inOut do arco)
    const pt = K.el("", `left:${cx - 11}px;top:${cy - R - 11}px;width:22px;height:22px;border-radius:50%;background:#fff;box-shadow:0 0 0 8px rgba(255,255,255,.14);opacity:0`);
    K.ticker((t) => {
      const k = Math.max(0, Math.min(1, (t - tp) / dp));
      const e = k === 0 ? 0 : k === 1 ? 1 : k < 0.5 ? Math.pow(2, 20 * k - 10) / 2 : (2 - Math.pow(2, -20 * k + 10)) / 2;
      const a = 2 * Math.PI * (P.valor / 100) * e;
      gsap.set(pt, { x: Math.sin(a) * R, y: R - Math.cos(a) * R, opacity: t >= tp ? 1 : 0 });
    }, tp, tp + dp + 0.01);
    apaga(K, [sv, pt], ts, 0.45);
    // número no centro
    numero(K, String(P.valor), P.prefixo, P.sufixo, `left:0;width:1080px;top:${cy - 118}px;text-align:center;font-size:210px`, tp, dp, ts);
    // legenda e fração
    const lg = texto(K, rico(P.legenda).replace(/\|/g, "<br>"), `left:0;width:1080px;top:${cy + R + 70}px;text-align:center;font-size:42px;font-weight:500;line-height:1.14`, tp + 0.6, ts);
    lg.querySelectorAll("b.lx-b").forEach((b) => { b.style.fontWeight = 800; });
    if (P.fracao) {
      const [a, b] = P.fracao, tam = 74, gap = 34, wt = b * tam + (b - 1) * gap, yf = cy + R + 214;
      const pessoa = (on) => `<svg width="${tam}" height="${tam}" viewBox="0 0 60 60"><circle cx="30" cy="15" r="10" fill="${on ? "#fff" : "none"}" stroke="#fff" stroke-width="2.5"/><path d="M12 58 C12 38 19 29 30 29 C41 29 48 38 48 58" fill="${on ? "#fff" : "none"}" stroke="#fff" stroke-width="2.5"/></svg>`;
      const pic = K.el(Array.from({ length: b }, (_, i) => `<span class="pp" style="display:inline-block;opacity:0">${pessoa(i < a)}</span>`).join(""),
        `left:${540 - wt / 2}px;top:${yf}px;width:${wt + 10}px;display:flex;gap:${gap}px`);
      K.ft(pic.querySelectorAll(".pp"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out", stagger: 0.12 }, tp + dp + 0.05);
      K.sfx("lux_toque", tp + dp + 0.05, 0.4);
      apaga(K, [pic], ts, 0.4);
      texto(K, ESC(P.fracao_texto || `${a} EM CADA ${b}`), `left:0;width:1080px;top:${yf + tam + 22}px;text-align:center;font-size:24px;letter-spacing:.3em`, tp + dp + 0.35, ts, ["lx-rot"]);
    }
    if (P.fonte) {
      const [fz, ls] = cabeMono(("FONTE   " + P.fonte).length, 960, 21, 0.16);
      const fo = K.el(`<span style="color:#9fbcff">FONTE</span>&nbsp;&nbsp;&nbsp;${ESC(P.fonte)}`, `left:0;width:1080px;top:${cy + R + 404}px;text-align:center;font-size:${fz}px;opacity:0;color:rgba(255,255,255,.72)`);
      fo.classList.add("lx-rot"); rotulo(K, fo, tp + dp + 0.5, 1.0, ls); apaga(K, [fo], ts, 0.4);
    }
  });

  // ---------- 49 Gráfico de linhas ----------
  // series: [{nome, cor: "azul"|"erro", pontos: [valores de 0 a 100 no eixo y, um por rótulo do eixo x]}]
  MB.def("49", {
    em: 0, dur: 5.6, rotulo: "DOR NAS COSTAS", pagina: null, titulo: "PARAR *NÃO* É|TRATAMENTO", eixo_y: "DOR", eixo_x: ["DIA 1", "SEMANA 1", "SEMANA 2", "SEMANA 3"],
    series: [{ nome: "REPOUSO", cor: "erro", pontos: [55, 62, 70, 76] }, { nome: "MOVIMENTO", cor: "azul", pontos: [55, 40, 26, 15] }],
    nota: "ESQUEMA ILUSTRATIVO", fonte: null, y: 540, veu: true
  }, function (P, K) {
    const { ESC, apaga } = MB.lux;
    const t0 = K.t(), t1 = t0 + P.dur, x = 60, w = 960, y = P.y, ts = Math.max(t1 - 0.65, t0 + 3.6), gh = 400;
    const mt = medeTitulo(P.titulo, w - 96, 64), yt = y + 136, gy = yt + mt.h + 90;
    const yNota = gy + gh + 74, yRod = yNota + (P.nota ? 50 : 0) + 10, H = (P.fonte ? yRod + 66 : yRod + 24) - y;
    if (P.veu !== false) veu(K, t0, ts + 0.05);
    placa(K, x, y, w, H, t0, ts + 0.1);
    cabeca(K, x, y, w, P.rotulo, P.pagina, t0 + 0.3, ts);
    titulo(K, P.titulo, x + 48, yt, w - 96, 64, t0 + 0.45, ts);
    const gx = x + 120, gw = w - 120 - 290, nX = P.eixo_x.length, gid = K.uid + "area";
    const px = (i) => gx + gw * i / (nX - 1), py = (v) => gy + gh - gh * v / 100;
    let ax = `<defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".2"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>`;
    ax += `<path class="ax" d="M${gx} ${gy - 10} V${gy + gh} H${gx + gw + 24}" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="2"/>`;
    for (let k = 1; k <= 3; k++) ax += `<path d="M${gx} ${gy + gh - gh * k / 4} H${gx + gw}" stroke="rgba(255,255,255,.12)" stroke-width="2" stroke-dasharray="4 10"/>`;
    // área suave embaixo da linha boa (aparece depois que a linha termina)
    const linhaD = (s) => s.pontos.map((v, j) => `${j ? "L" : "M"}${px(j)} ${py(v)}`).join(" ");
    ax += P.series.map((s) => s.cor === "erro" ? "" : `<path class="ar" d="${linhaD(s)} L${px(nX - 1)} ${gy + gh} L${px(0)} ${gy + gh} Z" fill="url(#${gid})" opacity="0"/>`).join("");
    const sv = K.svg(ax + P.series.map((s) => {
      const ruim = s.cor === "erro";
      return `<path class="ln" d="${linhaD(s)}" fill="none" stroke="${ruim ? "rgba(255,255,255,.55)" : "#fff"}" stroke-width="${ruim ? 4.5 : 7}" stroke-linecap="round" stroke-linejoin="round"/>`;
    }).join(""), 1080, 1920, "left:0;top:0;opacity:0");
    K.ft(sv, { opacity: 0 }, { opacity: 1, duration: 0.3 }, t0 + 0.7);
    K.desenha(sv.querySelector(".ax"), t0 + 0.7, 0.8, "expo.inOut");
    apaga(K, [sv], ts, 0.45);
    texto(K, `${ESC(P.eixo_y)} ↑`, `left:${gx - 104}px;top:${gy - 18}px;font-size:22px;letter-spacing:.2em`, t0 + 0.9, ts, ["lx-rot", "az"]);
    P.eixo_x.forEach((l, j) => texto(K, ESC(l), `left:${px(j) - 90}px;top:${gy + gh + 22}px;width:180px;text-align:center;font-size:21px;letter-spacing:.12em`, t0 + 0.95 + j * 0.06, ts, ["lx-rot"]));
    const lns = sv.querySelectorAll(".ln"), ars = sv.querySelectorAll(".ar");
    let ia = 0;
    P.series.forEach((s, i) => {
      const tl = t0 + 1.25 + i * 0.55, dl = 1.5, ult = s.pontos[s.pontos.length - 1], ruim = s.cor === "erro";
      K.desenha(lns[i], tl, dl, "power2.inOut"); K.sfx("lux_traco", tl, 0.45);
      if (!ruim && ars[ia]) { K.ft(ars[ia], { opacity: 0 }, { opacity: 1, duration: 0.9, ease: "power2.out" }, tl + dl - 0.3); ia++; }
      const dot = K.el("", `left:${px(nX - 1) - 12}px;top:${py(ult) - 12}px;width:24px;height:24px;border-radius:50%;${ruim ? "border:3px solid rgba(255,255,255,.7);background:rgba(7,18,44,1)" : "background:#fff"};opacity:0`);
      K.ft(dot, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.6, ease: "expo.out" }, tl + dl - 0.05);
      const tag = K.el(`${ESC(s.nome)} ${ult > s.pontos[0] ? "↑" : "↓"}`, `left:${px(nX - 1) + 30}px;top:${py(ult) - 17}px;font-size:24px;letter-spacing:.14em;white-space:nowrap;opacity:0;color:${ruim ? RED : "#fff"}`);
      tag.classList.add("lx-rot");
      K.ft(tag, { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 0.8, ease: "expo.out" }, tl + dl);
      K.sfx("lux_toque", tl + dl, 0.35);
      apaga(K, [dot, tag], ts, 0.4);
    });
    if (P.nota) texto(K, ESC(P.nota), `left:${x + 48}px;top:${yNota}px;font-size:20px;letter-spacing:.24em`, t0 + 1.4, ts, ["lx-rot"]);
    if (P.fonte) rodape(K, P.fonte, x + 48, yRod, w - 96, t0 + 1.6, ts);
  });

  // ---------- 50 Conta que se resolve ----------
  // a ÷ b = resultado%, compara com o limite e mostra o veredito num selo de linha fina.
  MB.def("50", {
    em: 0, dur: 6.0, rotulo: "TESTE DE SALTO · UMA PERNA", pagina: null, a: "1,62", b: "1,90", unidade: "M", op: "÷", resultado: 85, sufixo: "%",
    rotulos: ["PERNA DA LESÃO", "PERNA BOA"], limite: 90, sim: "PRONTO PRA VOLTAR", nao: "AINDA NÃO", fonte: null, y: 540, veu: true
  }, function (P, K) {
    const { ESC, apaga } = MB.lux;
    const t0 = K.t(), t1 = t0 + P.dur, x = 60, w = 960, y = P.y, ts = Math.max(t1 - 0.65, t0 + 4.2), H = 860 + (P.fonte ? 70 : 0);
    if (P.veu !== false) veu(K, t0, ts + 0.05);
    placa(K, x, y, w, H, t0, ts + 0.1);
    const yc = cabeca(K, x, y, w, P.rotulo, P.pagina, t0 + 0.3, ts);
    // números que rolam como placar, com desfoque leve enquanto giram
    const fz = 128, lh = Math.round(fz * 1.0);
    const rolo = (s, at) => {
      const ch = [...String(s)];
      const e = K.el(ch.map((c) => /\d/.test(c)
        ? `<span style="display:inline-block;height:${lh}px;overflow:hidden;vertical-align:top"><span class="fita" style="display:block">${Array.from({ length: 20 }, (_, k) => `<span style="display:block;height:${lh}px;line-height:${lh}px">${k % 10}</span>`).join("")}</span></span>`
        : `<span style="display:inline-block;height:${lh}px;line-height:${lh}px;vertical-align:top">${ESC(c)}</span>`).join(""),
        `position:relative;font-size:${fz}px;white-space:nowrap`);
      e.classList.remove("ab"); e.classList.add("lx-num");
      const ds = ch.filter((c) => /\d/.test(c));
      e.querySelectorAll(".fita").forEach((f, i) => {
        const d = +ds[i], dd = 1.0 + i * 0.14;
        K.ft(f, { y: 0 }, { y: -(10 + d) * lh, duration: dd, ease: "expo.out" }, at);
        K.ft(f, { filter: "blur(3px)" }, { filter: "blur(0px)", duration: dd * 0.7, ease: "power2.in" }, at);
      });
      K.sfx("lux_rolo", at, 0.6); K.sfx("lux_rolo", at + 0.3, 0.4);
      return e;
    };
    const linha1 = K.el("", `left:${x}px;top:${yc + 70}px;width:${w}px;display:flex;justify-content:center;align-items:flex-start;gap:30px`);
    const bloco = (s, lab, at) => {
      const b = K.el("", "position:relative;display:flex;flex-direction:column;align-items:center", linha1); b.classList.remove("ab");
      b.appendChild(rolo(s, at));
      const u = K.el(ESC(lab), "position:relative;margin-top:14px;font-size:22px;letter-spacing:.18em", b); u.classList.remove("ab"); u.classList.add("lx-rot", "az");
      gsap.set(b, { opacity: 0 });
      K.ft(b, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" }, at - 0.1);
      return b;
    };
    const sinal = (s, at) => {
      const e = K.el(ESC(s), `position:relative;font-weight:200;font-size:${fz * 0.62}px;line-height:${lh}px;color:#9fbcff`, linha1); e.classList.remove("ab"); e.classList.add("lx");
      gsap.set(e, { opacity: 0 }); K.ft(e, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }, at); return e;
    };
    const ta = t0 + 0.6;
    bloco(P.a, `${P.rotulos[0]} · ${P.unidade}`, ta);
    sinal(P.op, ta + 0.6);
    bloco(P.b, `${P.rotulos[1]} · ${P.unidade}`, ta + 0.8);
    apaga(K, [linha1], ts, 0.4);
    // resultado
    const tr = ta + 1.9;
    fio(K, x + 48, yc + 300, w - 96, tr - 0.4, ts, "rgba(255,255,255,.22)");
    numero(K, String(P.resultado), "", P.sufixo, `left:0;width:1080px;top:${yc + 330}px;text-align:center;font-size:200px`, tr, 1.2, ts);
    // régua com a marca da meta
    const ok = P.resultado >= P.limite, Wr = 760, rx = 540 - Wr / 2, ry = yc + 600;
    fio(K, rx, ry, Wr, tr, ts, "rgba(255,255,255,.2)");
    const f = K.el("", `left:${rx}px;top:${ry - 3}px;width:${Wr * P.resultado / 100}px;height:8px;background:${ok ? "#fff" : RED};transform:scaleX(0);transform-origin:left center`);
    K.ft(f, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "expo.out" }, tr); MB.lux.recolhe(K, f, ts, 0.4);
    const mk = K.el(`<div style="position:absolute;left:-1px;top:0;width:2px;height:44px;background:#fff"></div><div class="lx-rot" style="position:absolute;left:0;top:-42px;transform:translateX(-50%);font-size:22px;letter-spacing:.18em">META ${ESC(P.limite + P.sufixo)}</div>`,
      `left:${rx + Wr * P.limite / 100}px;top:${ry - 20}px;width:2px;height:44px;opacity:0`);
    K.ft(mk, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }, tr + 0.2); apaga(K, [mk], ts, 0.4);
    // veredito: selo de linha fina (sem carimbo)
    const tv = tr + 1.3, cor = ok ? "#fff" : RED;
    const vd = K.el(`<span style="display:inline-block;padding:16px 40px 18px;border:2px solid ${cor};border-radius:6px;font-size:40px;font-weight:600;letter-spacing:.2em;color:${cor}">${ESC(ok ? P.sim : P.nao)}</span>`,
      `left:0;width:1080px;top:${ry + 60}px;text-align:center;opacity:0`);
    vd.classList.add("lx");
    K.ft(vd, { opacity: 0, y: 16, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "expo.out" }, tv);
    K.sfx(ok ? "lux_sino" : "lux_grave", tv, 0.6);
    apaga(K, [vd], ts, 0.4);
    if (P.fonte) rodape(K, P.fonte, x + 48, y + 860 - 10, w - 96, tv, ts);
  });
})();
