/* Grupo C. Corpo e saúde (Maria). Motions 17 a 24. Ilustrações sempre ao lado, nunca presas no corpo real. */
(function () {
  const AZ = "#1f66e5", RED = "#e04646";

  // Boneco em traço branco (300 x 760). Formas grossas: contorno branco por baixo, preenchimento marinho por cima.
  const PARTES = [
    ["e", 150, 62, 44, 54], ["l", 150, 108, 150, 140, 40],
    ["l", 98, 168, 202, 168, 64], ["r", 92, 150, 116, 250, 52], ["r", 98, 360, 104, 100, 44],
    ["l", 78, 172, 58, 320, 40], ["l", 58, 320, 48, 450, 34], ["e", 46, 478, 18, 26],
    ["l", 222, 172, 242, 320, 40], ["l", 242, 320, 252, 450, 34], ["e", 254, 478, 18, 26],
    ["l", 124, 440, 116, 600, 56], ["l", 116, 600, 112, 730, 44], ["e", 104, 748, 30, 14],
    ["l", 176, 440, 184, 600, 56], ["l", 184, 600, 188, 730, 44], ["e", 196, 748, 30, 14]
  ];
  function forma(p, cor, extra) {
    if (p[0] === "e") return `<ellipse cx="${p[1]}" cy="${p[2]}" rx="${p[3] + extra}" ry="${p[4] + extra}" fill="${cor}"/>`;
    if (p[0] === "r") return `<rect x="${p[1] - extra}" y="${p[2] - extra}" width="${p[3] + 2 * extra}" height="${p[4] + 2 * extra}" rx="${p[5] + extra}" fill="${cor}"/>`;
    return `<line x1="${p[1]}" y1="${p[2]}" x2="${p[3]}" y2="${p[4]}" stroke="${cor}" stroke-width="${p[5] + 2 * extra}" stroke-linecap="round"/>`;
  }
  MB.corpo = function (fill) {
    return PARTES.map((p) => forma(p, "#fff", 5)).join("") + PARTES.map((p) => forma(p, fill || "#123473", 0)).join("");
  };
  MB.PONTOS = {
    cervical: [150, 122], ombro: [212, 172], "ombro esq": [88, 172], toracica: [150, 220], lombar: [150, 330], quadril: [150, 410],
    joelho: [184, 600], "joelho esq": [116, 600], tornozelo: [188, 728], punho: [252, 456], cotovelo: [242, 318], cabeca: [150, 62], quadris: [150, 410]
  };

  // Figura anatômica (polígonos de músculos, frente e costas). Cada região/músculo aponta para vista + grupos.
  MB.REGIOES = {
    cervical: [["costas", ["trapezius"]], ["frente", ["neck"]]], pescoco: [["frente", ["neck"]], ["costas", ["trapezius"]]],
    ombro: [["frente", ["front_deltoids"]], ["costas", ["back_deltoids"]]], toracica: [["costas", ["upper_back"]]], costas: [["costas", ["upper_back", "lower_back"]]],
    lombar: [["costas", ["lower_back"]]], quadril: [["costas", ["gluteal"]], ["frente", ["abductors"]]], joelho: [["frente", ["knees"]], ["costas", ["knees"]]],
    tornozelo: [["frente", ["calves"]], ["costas", ["left_soleus", "right_soleus"]]], punho: [["frente", ["forearm"]], ["costas", ["forearm"]]],
    cotovelo: [["frente", ["forearm", "biceps"]]], gluteo: [["costas", ["gluteal"]]], core: [["frente", ["abs", "obliques"]]], abdomen: [["frente", ["abs"]]],
    manguito: [["costas", ["back_deltoids", "upper_back"]]], quadriceps: [["frente", ["quadriceps"]]], posterior: [["costas", ["hamstring"]]],
    panturrilha: [["costas", ["calves"]]], peitoral: [["frente", ["chest"]]], trapezio: [["costas", ["trapezius"]]], biceps: [["frente", ["biceps"]]],
    triceps: [["costas", ["triceps"]]], obliquos: [["frente", ["obliques"]]], adutores: [["frente", ["abductors"]]]
  };
  const BASE_F = "rgba(159,188,255,.22)", ACESO = "#2f74f2";
  MB.figura = function (K, parent, vista, s, x, y) {
    let h = "";
    Object.entries(MB.ANAT[vista]).forEach(([k, ps]) => ps.forEach((p) => { h += `<polygon class="g-${k}" points="${p}" fill="${BASE_F}" stroke="rgba(255,255,255,.85)" stroke-width=".4" stroke-linejoin="round"/>`; }));
    return K.svg(`<g transform="scale(${s})">${h}</g>`, 100 * s, 200 * s, `left:${x}px;top:${y}px`, parent);
  };
  MB.centro = function (fig, grupos, s) {
    let sx = 0, sy = 0, n = 0;
    grupos.forEach((g) => fig.querySelectorAll(".g-" + g).forEach((pl) => pl.getAttribute("points").trim().split(/\s+/).forEach((v, i, arr) => { if (i % 2 === 0) { sx += +v; sy += +arr[i + 1]; n++; } })));
    return n ? [sx / n * s, sy / n * s] : [50 * s, 100 * s];
  };

  // ---------- 17 Mapa da dor com pontos pulsando ----------
  MB.def("17", {
    em: 0, regioes: [[0.5, "cervical", "CERVICAL"], [1.6, "ombro", "OMBRO"], [2.7, "lombar", "LOMBAR"], [3.8, "joelho", "JOELHO"]], lado: "esquerda", y: 330, escala: 2.55
  }, function (P, K) {
    const t0 = K.t(), s = P.escala, fw = 100 * s, pw = fw * 2 + 70, ph = 200 * s + 100;
    const px = P.lado === "esquerda" ? 30 : 1080 - 30 - pw;
    const pn = K.vidro(`left:${px}px;top:${P.y}px;width:${pw}px;height:${ph}px;opacity:0`);
    K.el("FRENTE", `left:25px;top:${ph - 52}px;width:${fw}px;text-align:center;font-weight:800;font-size:22px;letter-spacing:.14em;opacity:.7`, pn);
    K.el("COSTAS", `left:${45 + fw}px;top:${ph - 52}px;width:${fw}px;text-align:center;font-weight:800;font-size:22px;letter-spacing:.14em;opacity:.7`, pn);
    const figs = { frente: MB.figura(K, pn, "frente", s, 25, 30), costas: MB.figura(K, pn, "costas", s, 45 + fw, 30) };
    const fx0 = { frente: 25, costas: 45 + fw };
    K.ft(pn, { opacity: 0, x: P.lado === "esquerda" ? -500 : 500 }, { opacity: 1, x: 0, duration: 0.5, ease: "expo.out" }, t0);
    K.ft([figs.frente, figs.costas], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: "power3.out" }, t0 + 0.15);
    K.sfx("whoosh", t0, 0.5);
    P.regioes.forEach(([tr, chave, nome], i) => {
      const t = K.t(tr), fimR = i + 1 < P.regioes.length ? K.t(P.regioes[i + 1][0]) : K.D;
      const alvos = MB.REGIOES[chave] || MB.REGIOES.lombar;
      let ly = null;
      alvos.forEach(([vista, grupos], j) => {
        const fig = figs[vista], pols = grupos.flatMap((g) => [...fig.querySelectorAll(".g-" + g)]);
        K.ft(pols, { attr: { fill: BASE_F } }, { attr: { fill: ACESO }, duration: 0.2 }, t);
        K.ft(pols, { opacity: 1 }, { opacity: 0.55, duration: 0.3, yoyo: true, repeat: Math.max(1, Math.floor((fimR - t - 0.3) / 0.3)), ease: "sine.inOut" }, t + 0.25);
        K.to(pols, { attr: { fill: "rgba(47,116,242,.45)" }, opacity: 1, duration: 0.2 }, fimR - 0.05);
        const [cx, cy] = MB.centro(fig, grupos, s), x = fx0[vista] + cx, y = 30 + cy;
        const dot = K.el("", `left:${x - 14}px;top:${y - 14}px;width:28px;height:28px;border-radius:50%;background:#fff;box-shadow:0 0 18px 6px rgba(47,116,242,1);opacity:0;z-index:3`, pn);
        K.ft(dot, { opacity: 0, scale: 3 }, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(3)" }, t);
        K.to(dot, { opacity: 0, duration: 0.2 }, fimR - 0.05);
        for (let k = t; k < fimR - 0.3; k += 0.8) {
          const r = K.el("", `left:${x - 40}px;top:${y - 40}px;width:80px;height:80px;border-radius:50%;border:5px solid #9fbcff;opacity:0;z-index:2`, pn);
          K.ft(r, { opacity: 0.9, scale: 0.3 }, { opacity: 0, scale: 2.2, duration: 0.8, ease: "power1.out" }, k);
        }
        if (ly == null) ly = P.y + y;
      });
      const lb = K.el(`<span class="hl" style="font-size:64px;padding:4px 24px 10px">${nome}</span>`, `${P.lado === "esquerda" ? "left:" + (px + pw + 24) : "right:" + (1080 - px + 24)}px;top:${ly - 50}px;opacity:0;white-space:nowrap`);
      K.ft(lb, { opacity: 0, x: P.lado === "esquerda" ? -40 : 40 }, { opacity: 1, x: 0, duration: 0.3, ease: "back.out(2)" }, t + 0.12);
      K.to(lb, { opacity: 0, duration: 0.15 }, fimR - 0.05);
      K.sfx("bip", t, 0.4); K.sfx("pop", t + 0.12, 0.5);
    });
  });

  // ---------- 18 Raio-X estilizado ----------
  MB.def("18", { em: 0, dur: 3.2, destaque: "L4-L5", rotulo: "DISCO|*L4-L5*", titulo: "COLUNA LOMBAR" }, function (P, K) {
    const t0 = K.t(), t1 = t0 + P.dur;
    const bg = K.el("", `inset:0;background:radial-gradient(70% 55% at 50% 50%,#12357f 0%,#0a1b3f 55%,#050d22 100%);opacity:0;z-index:5`);
    const grain = K.svg(`<filter id="g${K.uid}"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="9"/><feColorMatrix type="saturate" values="0"/></filter><rect width="1080" height="1920" filter="url(#g${K.uid})"/>`, 1080, 1920, "left:0;top:0;opacity:0;mix-blend-mode:overlay;z-index:6");
    const nomes = ["T11", "T12", "L1", "L2", "L3", "L4", "L5"];
    let sv = "", alvo = null;
    const y0 = 470, passo = 150;
    nomes.forEach((nm, i) => {
      const y = y0 + i * passo, x = 540 + 26 * Math.sin((i - 1) / 6 * Math.PI) - 10, w = 170 + i * 8;
      const hl = nm === P.destaque;
      sv += `<g class="v${i}"><rect x="${x - w / 2}" y="${y}" width="${w}" height="96" rx="26" fill="url(#vb${K.uid})" stroke="#9fd0ff" stroke-width="3" ${hl ? 'class="alvo"' : ""}/>
        <rect x="${x - w / 2 - 70}" y="${y + 30}" width="76" height="26" rx="13" fill="rgba(159,208,255,.35)"/><rect x="${x + w / 2 - 6}" y="${y + 30}" width="76" height="26" rx="13" fill="rgba(159,208,255,.35)"/>
        <text x="${x + w / 2 + 96}" y="${y + 60}" font-family="M" font-weight="800" font-size="30" fill="rgba(159,208,255,.75)">${nm}</text></g>`;
      if (i < nomes.length - 1) {
        const dn = nm + "-" + nomes[i + 1], hd = dn === P.destaque;
        sv += `<ellipse ${hd ? 'class="alvo"' : ""} cx="${x + 3}" cy="${y + 96 + 27}" rx="${w / 2 - 6}" ry="18" fill="rgba(80,170,255,.55)" stroke="#bfe0ff" stroke-width="2"/>`;
        if (hd) alvo = [x + 3, y + 123];
      }
      if (hl) alvo = [x, y + 48];
    });
    sv += `<path d="M ${520} 1520 Q 540 1600 600 1640 Q 640 1600 640 1520 Z" fill="url(#vb${K.uid})" opacity=".8"/>`;
    const esp = K.svg(`<defs><linearGradient id="vb${K.uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe6ff" stop-opacity=".95"/><stop offset="1" stop-color="#4f8fe8" stop-opacity=".75"/></linearGradient>
      <filter id="gl${K.uid}"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><g filter="url(#gl${K.uid})">${sv}</g>`, 1080, 1920, "left:0;top:0;opacity:0;z-index:7");
    const scan = K.el("", "left:0;top:0;width:1080px;height:90px;opacity:0;z-index:8;background:linear-gradient(180deg,rgba(47,116,242,0),rgba(159,208,255,.55),rgba(47,116,242,0))");
    const tit = K.el(P.titulo, "left:0;top:300px;width:1080px;text-align:center;font-weight:800;font-size:44px;letter-spacing:.14em;opacity:0;z-index:9;color:#9fd0ff");
    const iris = (el) => K.ft(el, { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(120% at 50% 50%)", duration: 0.45, ease: "power3.inOut" }, t0);
    [bg, grain, esp].forEach((e) => { K.set(e, { opacity: e === grain ? 0.18 : 1 }, t0); iris(e); });
    K.ft(tit, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.3 }, t0 + 0.4);
    K.ft(scan, { opacity: 1, y: 380 }, { y: 1700, duration: 1.0, ease: "power1.inOut" }, t0 + 0.4);
    K.set(scan, { opacity: 0 }, t0 + 1.4);
    K.sfx("sobe", t0, 0.4); K.sfx("bip", t0 + 1.45, 0.5);
    if (alvo) {
      const a = esp.querySelector(".alvo");
      K.ft(a, { attr: { fill: "rgba(80,170,255,.55)" } }, { attr: { fill: "#e04646" }, duration: 0.2, yoyo: true, repeat: 5 }, t0 + 1.4);
      const ring = K.el("", `left:${alvo[0] - 130}px;top:${alvo[1] - 60}px;width:260px;height:120px;border-radius:50%;border:6px solid #fff;opacity:0;z-index:9;box-shadow:0 0 30px rgba(159,208,255,.9)`);
      K.ft(ring, { opacity: 0, scale: 2 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, t0 + 1.4);
      const lb = K.el(K.rich(P.rotulo), `left:60px;top:${alvo[1] - 200}px;font-weight:400;font-size:70px;line-height:1.05;opacity:0;z-index:9`);
      K.ft(lb, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.3, ease: "expo.out" }, t0 + 1.6);
      K.to([ring, lb], { opacity: 0, duration: 0.15 }, t1 - 0.3);
    }
    K.to([bg, grain, esp, tit], { opacity: 0, duration: 0.01 }, t1);
    K.passada(t1);
  });

  // ---------- 19 Termômetro da dor 0 a 10 ----------
  function cara(v) {
    const c = 1 - v / 5; // 1 sorri, -1 triste
    const boca = `M-20 ${18 - 6 * c} Q0 ${18 + 16 * c} 20 ${18 - 6 * c}`;
    const so = v >= 8 ? `<path d="M-24 -20 L-8 -14 M24 -20 L8 -14" stroke="#fff" stroke-width="5" stroke-linecap="round"/>` : "";
    return `<circle r="40" fill="rgba(10,27,63,.4)" stroke="#fff" stroke-width="5"/><circle cx="-14" cy="-6" r="5" fill="#fff"/><circle cx="14" cy="-6" r="5" fill="#fff"/>${so}<path d="${boca}" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/>`;
  }
  MB.def("19", { em: 0, titulo: "NÍVEL DE *DOR*", inicio: 8, fim: 2, de: 0.6, ate: 4.0, final: "*ALÍVIO*", y: 300 }, function (P, K) {
    const t0 = K.t(), X0 = 120, Wb = 840;
    const pn = K.vidro(`left:40px;top:${P.y}px;width:1000px;height:470px;opacity:0`);
    K.el(K.rich(P.titulo), "left:40px;top:34px;font-weight:400;font-size:52px", pn);
    const faces = [0, 2, 4, 6, 8, 10].map((v) => K.svg(`<g transform="translate(45 45)">${cara(v)}</g>`, 90, 90, `left:${X0 - 40 + Wb * v / 10 - 45}px;top:130px;opacity:.55`, pn));
    K.el("", `left:${X0 - 40}px;top:262px;width:${Wb}px;height:30px;border-radius:15px;background:linear-gradient(90deg,#2f74f2,#5b6fe0 45%,#a24fb0 75%,${RED})`, pn);
    for (let v = 0; v <= 10; v++) K.el(String(v), `left:${X0 - 40 + Wb * v / 10 - 30}px;top:306px;width:60px;text-align:center;font-weight:700;font-size:28px;opacity:.8`, pn);
    const mk = K.el(`<div style="width:0;height:0;border-left:22px solid transparent;border-right:22px solid transparent;border-top:28px solid #fff;margin:0 auto"></div>`, `left:${X0 - 40 - 22}px;top:226px;width:44px`, pn);
    const num = K.el("0", `left:780px;top:20px;width:180px;text-align:right;font-weight:900;font-style:italic;font-size:110px;line-height:1`, pn);
    const xv = (v) => Wb * v / 10;
    K.ft(pn, { opacity: 0, y: -100 }, { opacity: 1, y: 0, duration: 0.45, ease: "expo.out" }, t0);
    const ta = K.t(P.de), tb = K.t(P.ate);
    K.ft(mk, { x: xv(0) }, { x: xv(P.inicio), duration: 0.5, ease: "power2.out" }, t0 + 0.1);
    K.conta(num, 0, P.inicio, t0 + 0.1, 0.5);
    K.ft(mk, { x: xv(P.inicio) }, { x: xv(P.fim), duration: tb - ta, ease: "power1.inOut" }, ta);
    K.conta(num, P.inicio, P.fim, ta, tb - ta, (v) => Math.round(v), "power1.inOut");
    const at = { v: P.inicio };
    K.ticker((t) => {
      const v = t < ta ? P.inicio * Math.min(1, (t - t0) / 0.6) : t > tb ? P.fim : P.inicio + (P.fim - P.inicio) * (0.5 - Math.cos(Math.PI * (t - ta) / (tb - ta)) / 2);
      faces.forEach((f, i) => { const d = Math.abs(i * 2 - v); const k = Math.max(0, 1 - d / 2); f.style.opacity = 0.45 + 0.55 * k; f.style.transform = `scale(${1 + 0.35 * k})`; });
      num.style.color = v >= 7 ? RED : "#fff";
    }, t0, Math.min(K.D, tb + 1));
    for (let k = 0; k < P.inicio - P.fim; k++) K.sfx("tique", ta + (tb - ta) * (k + 0.5) / (P.inicio - P.fim), 0.5);
    const fn = K.el(K.rich(P.final), `left:0;top:${P.y + 510}px;width:1080px;text-align:center;font-size:120px;opacity:0`);
    K.ft(fn, { opacity: 0, scale: 1.6, filter: "blur(14px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.35, ease: "expo.out" }, tb + 0.1);
    K.sfx("sucesso", tb + 0.1, 0.6);
  });

  // ---------- 20 Antes e depois em deslizar ----------
  MB.def("20", { em: 0, troca: 1.6, dur: 0.9, antes: "ANTES", depois: "DEPOIS", extra: "depois" }, function (P, K) {
    const t0 = K.t(), tt = K.t(P.troca), X = K.extra(P.extra);
    const a = K.el(`<span class="pilula" style="font-size:44px;background:rgba(5,14,36,.8)">${P.antes}</span>`, "left:50px;top:250px;opacity:0");
    const d = K.el(`<span class="pilula" style="font-size:44px">${P.depois}</span>`, "right:50px;top:250px;opacity:0");
    K.ft(a, { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.3, ease: "back.out(2)" }, t0 + 0.1);
    X.style.zIndex = 35;
    const pos = { p: 0 };
    const cort = K.el("", `left:-90px;top:0;width:180px;height:1920px;z-index:2;opacity:0;background:linear-gradient(90deg,rgba(31,102,229,0),#1f66e5 40%,#2f74f2 50%,#1f66e5 60%,rgba(31,102,229,0));box-shadow:0 0 60px rgba(47,116,242,.9)`);
    K.set(X, { opacity: 1, clipPath: "inset(0 100% 0 0)" }, tt);
    K.set(cort, { opacity: 1 }, tt);
    K.ticker((t) => {
      const k = Math.min(1, Math.max(0, (t - tt) / P.dur)), e = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      X.style.clipPath = `inset(0 ${100 - e * 100}% 0 0)`; cort.style.transform = `translateX(${e * 1080}px)`;
      a.style.transform = `translateX(${-Math.max(0, e * 1080 - 50) * 0}px)`;
    }, tt, tt + P.dur);
    K.set(cort, { opacity: 0 }, tt + P.dur);
    K.to(a, { opacity: 0, duration: 0.2 }, tt + P.dur * 0.4);
    K.ft(d, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.3, ease: "back.out(2)" }, tt + P.dur * 0.6);
    K.sfx("whoosh", tt, 0.8);
  });

  // ---------- 21 Casa segura em planta baixa ----------
  MB.def("21", {
    em: 0, dur: 6, titulo: "CASA *SEGURA*",
    riscos: [[1.0, "sala", "TAPETE SOLTO", 2.0], [1.8, "corredor", "DEGRAU SEM|SINALIZAÇÃO", 2.8], [2.6, "banheiro", "BANHEIRO|SEM BARRA", 3.6], [3.4, "quarto", "POUCA LUZ|À NOITE", 4.4]],
    cor_ok: "#1f66e5", sub: "ATENDIMENTO *DOMICILIAR*"
  }, function (P, K) {
    const t0 = K.t(), t1 = t0 + P.dur;
    const bg = K.el(`<div class="tela-azul"></div>`, "inset:0;opacity:0;z-index:1");
    const grade = K.el("", "inset:0;opacity:0;z-index:2;background-image:linear-gradient(rgba(255,255,255,.06) 2px,transparent 2px),linear-gradient(90deg,rgba(255,255,255,.06) 2px,transparent 2px);background-size:60px 60px");
    K.set([bg, grade], { opacity: 1 }, t0);
    K.ft([bg, grade], { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(120% at 50% 50%)", duration: 0.45, ease: "power3.inOut" }, t0);
    const tit = K.el(K.rich(P.titulo), "left:0;top:250px;width:1080px;text-align:center;font-weight:400;font-size:90px;opacity:0;z-index:4");
    K.ft(tit, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.35, ease: "expo.out" }, t0 + 0.3);
    // planta: caixa 880 x 900 a partir de (100, 470)
    const ox = 100, oy = 470;
    const linhas = [
      "M0 0 H880 V900 H0 Z", "M0 420 H330", "M430 420 H520", "M520 0 V300", "M520 380 V560", "M520 640 V900", "M520 560 H880", "M700 560 V900", "M330 420 V900",
    ];
    const portas = [[330, 420, 100, 0], [520, 300, 80, 90], [520, 560, 80, 90]];
    let sv = linhas.map((d) => `<path class="pl" d="${d}" fill="none" stroke="#fff" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/>`).join("");
    sv += portas.map(([x, y, r, a]) => `<path class="pl" d="M${x} ${y} A${r} ${r} 0 0 ${a ? 0 : 1} ${x + (a ? r : r)} ${y + (a ? r : -r)}" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="4" stroke-dasharray="10 8"/>`).join("");
    const salas = { sala: [180, 210, "SALA"], quarto: [700, 150, "QUARTO"], corredor: [430, 700, "CORREDOR"], banheiro: [790, 730, "BANHEIRO"], cozinha: [170, 660, "COZINHA"], area: [610, 730, "ÁREA"] };
    sv += Object.entries(salas).map(([k, [x, y, n]]) => `<text class="sl s-${k}" x="${x}" y="${y + 120}" text-anchor="middle" font-family="M" font-weight="700" font-size="28" letter-spacing="3" fill="rgba(255,255,255,.55)">${n}</text>`).join("");
    const pl = K.svg(sv, 880, 900, `left:${ox}px;top:${oy}px;z-index:4`);
    pl.querySelectorAll(".pl").forEach((p, i) => K.desenha(p, t0 + 0.3 + i * 0.05, 0.6));
    K.ft(pl.querySelectorAll(".sl"), { opacity: 0 }, { opacity: 1, duration: 0.3, stagger: 0.05 }, t0 + 0.8);
    K.sfx("caneta", t0 + 0.3, 0.5);
    P.riscos.forEach(([tr, sala, txt, tok], i) => {
      const t = K.t(tr), [sx, sy] = salas[sala] || [440, 450], x = ox + sx, y = oy + sy;
      const ic = K.el(`<span class="s" style="font-weight:900;font-size:60px;line-height:1">!</span>`, `left:${x - 50}px;top:${y - 50}px;width:100px;height:100px;border-radius:50%;background:${RED};display:flex;align-items:center;justify-content:center;border:5px solid #fff;opacity:0;z-index:6;box-shadow:0 0 30px rgba(224,70,70,.8)`);
      K.to(pl.querySelectorAll(".s-" + sala), { opacity: 0, duration: 0.15 }, t);
      const lb = K.el(K.rich(txt), `left:${Math.min(Math.max(x - 200, ox - 20), ox + 880 - 380)}px;top:${y + 62}px;width:400px;text-align:center;font-weight:800;font-size:32px;line-height:1.1;opacity:0;z-index:6;background:rgba(5,14,36,.7);padding:8px 10px;border-radius:12px`);
      K.ft(ic, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(3)" }, t);
      K.ft(ic, { scale: 1 }, { scale: 1.15, duration: 0.2, yoyo: true, repeat: 3 }, t + 0.3);
      K.ft(lb, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.25 }, t + 0.1);
      K.sfx("erro", t, 0.3);
      if (tok != null) {
        const to = K.t(tok);
        K.to(ic, { background: P.cor_ok, boxShadow: "0 0 30px rgba(47,116,242,.9)", duration: 0.2 }, to);
        K.set(ic.querySelector(".s"), { textContent: "✓" }, to + 0.05);
        K.ft(ic, { scale: 1.4 }, { scale: 1, duration: 0.3, ease: "back.out(3)" }, to);
        K.to(lb, { opacity: 0.6, duration: 0.2 }, to);
        K.sfx("sucesso", to, 0.45);
      }
    });
    if (P.sub) { const sb = K.el(K.rich(P.sub), "left:0;top:1440px;width:1080px;text-align:center;font-weight:400;font-size:52px;opacity:0;z-index:6"); K.ft(sb, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.35 }, t1 - 1.4); }
    K.set(K.fx.querySelectorAll("*"), {}, t1);
  });

  // ---------- 22 Estalo de quiropraxia ----------
  MB.def("22", { em: 0, x: 540, y: 760, texto: "CREC!", pergunta: "MITO OU|*VERDADE?*", pergunta_em: 1.0, some: 3.0 }, function (P, K) {
    const t0 = K.t();
    K.ft(K.cam, { scale: 1.09, transformOrigin: `${P.x}px ${P.y}px` }, { scale: 1, duration: 0.6, ease: "expo.out" }, t0);
    K.treme(K.cam, t0, 0.4, 16);
    for (let i = 0; i < 3; i++) {
      const r = K.el("", `left:${P.x - 100}px;top:${P.y - 100}px;width:200px;height:200px;border-radius:50%;border:${12 - i * 3}px solid ${i ? "#9fbcff" : "#2f74f2"};opacity:0;box-shadow:0 0 30px rgba(47,116,242,.8)`);
      K.ft(r, { opacity: 1, scale: 0.2 }, { opacity: 0, scale: 4.5, duration: 0.8, ease: "power2.out" }, t0 + i * 0.09);
    }
    for (let i = 0; i < 14; i++) {
      const a = i / 14 * 360;
      const l = K.el("", `left:${P.x}px;top:${P.y - 5}px;width:120px;height:10px;border-radius:5px;background:#fff;transform-origin:0 50%;opacity:0`);
      gsap.set(l, { rotation: a });
      K.ft(l, { opacity: 1, x: Math.cos(a * Math.PI / 180) * 60, y: Math.sin(a * Math.PI / 180) * 60, scaleX: 0.3 }, { opacity: 0, x: Math.cos(a * Math.PI / 180) * 330, y: Math.sin(a * Math.PI / 180) * 330, scaleX: 1, duration: 0.45, ease: "power2.out" }, t0);
    }
    const letras = [...P.texto];
    const tx = K.el(letras.map((c) => `<span style="display:inline-block">${c}</span>`).join(""), `left:0;top:${P.y - 360}px;width:1080px;text-align:center;font-weight:900;font-style:italic;font-size:250px;line-height:1;text-shadow:12px 12px 0 #1f66e5,0 10px 40px rgba(0,0,0,.4)`);
    const sp = tx.querySelectorAll("span");
    sp.forEach((s, i) => { gsap.set(s, { opacity: 0 }); K.ft(s, { opacity: 0, scale: 3, rotation: (K.rnd() - 0.5) * 60 }, { opacity: 1, scale: 1, rotation: (K.rnd() - 0.5) * 14, duration: 0.18, ease: "back.out(2)" }, t0 + i * 0.04); });
    K.ticker((t) => { sp.forEach((s, i) => { s.style.translate = `${Math.sin(t * 90 + i * 7) * 7}px ${Math.cos(t * 77 + i * 3) * 7}px`; }); }, t0 + 0.2, t0 + 1.0);
    K.to(sp, { opacity: 0, y: -60, duration: 0.25, stagger: 0.03 }, t0 + 1.0);
    K.sfx("crec", t0, 1); K.sfx("grave", t0 + 0.02, 0.7);
    const tq = K.t(P.pergunta_em);
    const pq = K.vidro(`left:140px;top:${P.y - 280}px;width:800px;height:300px;opacity:0;display:flex;align-items:center;gap:30px;padding:0 40px`);
    const q = K.el("?", `position:relative;width:170px;height:170px;flex:none;border-radius:50%;background:${AZ};display:flex;align-items:center;justify-content:center;font-weight:900;font-size:130px;box-shadow:0 0 0 10px rgba(47,116,242,.3)`, pq);
    q.classList.remove("ab");
    const pt = K.el(K.rich(P.pergunta), "position:relative;font-weight:400;font-size:74px;line-height:1.08", pq); pt.classList.remove("ab");
    K.ft(pq, { opacity: 0, scale: 0.6, y: 60 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.8)" }, tq);
    K.ft(q, { rotation: -200, scale: 0 }, { rotation: 0, scale: 1, duration: 0.5, ease: "back.out(2)" }, tq + 0.1);
    K.ft(q, { rotation: 0 }, { rotation: 12, duration: 0.18, yoyo: true, repeat: 5, ease: "sine.inOut" }, tq + 0.7);
    K.sfx("pop", tq, 0.6);
    if (P.some != null) K.to(pq, { opacity: 0, y: -40, duration: 0.25 }, K.t(P.some));
  });

  // ---------- 23 Músculo que acende ----------
  MB.def("23", { em: 0, acende: [[0.4, "gluteo", "GLÚTEO|*MÉDIO*"], [2.4, "core", "*CORE*|ATIVADO"]], lado: "esquerda", y: 300, escala: 4.3 }, function (P, K) {
    const t0 = K.t(), s = P.escala, fw = 100 * s, pw = fw + 50, ph = 200 * s + 50, px = P.lado === "esquerda" ? 30 : 1080 - 30 - pw;
    const pn = K.vidro(`left:${px}px;top:${P.y}px;width:${pw}px;height:${ph}px;opacity:0`);
    const cena = K.el("", `left:25px;top:25px;width:${fw}px;height:${200 * s}px;perspective:1600px`, pn);
    const figs = {}; ["frente", "costas"].forEach((v) => { figs[v] = MB.figura(K, cena, v, s, 0, 0); figs[v].style.backfaceVisibility = "hidden"; });
    const v0 = (MB.REGIOES[P.acende[0][1]] || [["costas"]])[0][0];
    gsap.set(figs.frente, { rotationY: v0 === "frente" ? 0 : 180 }); gsap.set(figs.costas, { rotationY: v0 === "costas" ? 0 : -180 });
    K.ft(pn, { opacity: 0, x: P.lado === "esquerda" ? -500 : 500 }, { opacity: 1, x: 0, duration: 0.5, ease: "expo.out" }, t0);
    K.sfx("whoosh", t0, 0.5);
    let vAt = v0;
    P.acende.forEach(([ta, nm, rot], i) => {
      const t = K.t(ta), fimA = i + 1 < P.acende.length ? K.t(P.acende[i + 1][0]) : K.D;
      const [vista, grupos] = (MB.REGIOES[nm] || MB.REGIOES.gluteo)[0];
      if (vista !== vAt) {
        const ida = vista === "frente";
        K.to(figs.frente, { rotationY: ida ? 0 : 180, duration: 0.5, ease: "power3.inOut" }, t - 0.5);
        K.to(figs.costas, { rotationY: ida ? -180 : 0, duration: 0.5, ease: "power3.inOut" }, t - 0.5);
        K.sfx("virar", t - 0.45, 0.6); vAt = vista;
      }
      const fig = figs[vista], pols = grupos.flatMap((g) => [...fig.querySelectorAll(".g-" + g)]);
      K.ft(pols, { attr: { fill: BASE_F }, filter: "drop-shadow(0 0 0px rgba(47,116,242,0))" }, { attr: { fill: ACESO }, filter: "drop-shadow(0 0 3px rgba(47,116,242,1))", duration: 0.3 }, t);
      K.ft(pols, { opacity: 1 }, { opacity: 0.6, duration: 0.35, yoyo: true, repeat: Math.max(1, Math.floor((fimA - t - 0.4) / 0.35)), ease: "sine.inOut" }, t + 0.35);
      K.to(pols, { attr: { fill: BASE_F }, opacity: 1, filter: "none", duration: 0.2 }, fimA - 0.05);
      const [cx, cy] = MB.centro(fig, grupos, s);
      const ex = px + 25 + cx, ey = P.y + 25 + cy;
      const ax = P.lado === "esquerda" ? px + pw + 30 : px - 30, dir = P.lado === "esquerda" ? 1 : -1;
      const seta = K.svg(`<path class="sp" d="M${ax} ${ey - 70} C ${ax - dir * 60} ${ey - 70}, ${ex + dir * 90} ${ey - 50}, ${ex + dir * 20} ${ey - 6}" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/><circle class="cab" cx="${ex}" cy="${ey}" r="14" fill="#fff" opacity="0"/>`, 1080, 1920, "left:0;top:0");
      K.desenha(seta.querySelector(".sp"), t + 0.15, 0.35);
      K.ft(seta.querySelector(".cab"), { opacity: 0 }, { opacity: 1, duration: 0.1 }, t + 0.45);
      const lb = K.el(K.rich(rot), `${dir > 0 ? "left:" + (ax + 10) : "right:" + (1080 - ax + 10)}px;top:${ey - 170}px;font-size:64px;line-height:1.06;opacity:0;text-align:${dir > 0 ? "left" : "right"}`); lb.classList.add("sombra-txt");
      K.ft(lb, { opacity: 0, x: -30 * dir }, { opacity: 1, x: 0, duration: 0.3, ease: "back.out(2)" }, t + 0.3);
      K.to([lb, seta], { opacity: 0, duration: 0.15 }, fimA - 0.1);
      K.sfx("sobe", t - 0.3, 0.3); K.sfx("pop", t + 0.3, 0.5);
    });
  });

  // ---------- 24 Linha do tempo da recuperação ----------
  MB.def("24", { em: 0, marcos: [[0.5, "SEMANA 1", "AVALIAÇÃO"], [1.9, "SEMANA 4", "MENOS DOR"], [3.3, "SEMANA 8", "DE VOLTA|AO TREINO"]], y: 1080, titulo: "RECUPERAÇÃO" }, function (P, K) {
    const t0 = K.t(), n = P.marcos.length, X0 = 200, X1 = 880, Y = 230;
    const pn = K.vidro(`left:40px;top:${P.y}px;width:1000px;height:420px;opacity:0`);
    K.el(P.titulo, "left:40px;top:30px;font-weight:800;font-size:34px;letter-spacing:.12em;opacity:.85", pn);
    const base = K.el("", `left:${X0 - 40}px;top:${Y - 4}px;width:${X1 - X0}px;height:8px;border-radius:4px;background:rgba(255,255,255,.25);transform-origin:left center`, pn);
    const prog = K.el("", `left:${X0 - 40}px;top:${Y - 4}px;width:${X1 - X0}px;height:8px;border-radius:4px;background:#2f74f2;box-shadow:0 0 16px rgba(47,116,242,.9);transform-origin:left center;transform:scaleX(0)`, pn);
    const xs = P.marcos.map((_, i) => X0 - 40 + (X1 - X0) * (n === 1 ? 0.5 : i / (n - 1)));
    const nos = xs.map((x) => K.el("", `left:${x - 18}px;top:${Y - 18}px;width:36px;height:36px;border-radius:50%;background:#0a1b3f;border:5px solid rgba(255,255,255,.6)`, pn));
    const bola = K.el("", `left:${xs[0] - 28}px;top:${Y - 28}px;width:56px;height:56px;border-radius:50%;background:#fff;border:10px solid ${AZ};box-shadow:0 0 30px rgba(47,116,242,1);opacity:0;z-index:3`, pn);
    K.ft(pn, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 0.45, ease: "expo.out" }, t0);
    K.ft(base, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "power2.out" }, t0 + 0.2);
    let xAnt = xs[0];
    P.marcos.forEach(([tm, sem, desc], i) => {
      const t = K.t(tm), x = xs[i];
      if (i === 0) K.ft(bola, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(3)" }, t - 0.3);
      else { K.ft(bola, { x: xAnt - xs[0] }, { x: x - xs[0], duration: 0.6, ease: "power2.inOut" }, t - 0.6); K.ft(prog, { scaleX: (xAnt - xs[0]) / (X1 - X0) }, { scaleX: (x - xs[0]) / (X1 - X0), duration: 0.6, ease: "power2.inOut" }, t - 0.6); }
      K.to(nos[i], { background: AZ, borderColor: "#fff", duration: 0.15 }, t);
      const s = K.el(`<span class="hl" style="font-size:38px;padding:2px 14px 6px">${sem}</span>`, `left:${x - 150}px;top:${Y - 110}px;width:300px;text-align:center;opacity:0`, pn);
      const d = K.el(K.rich(desc), `left:${x - 160}px;top:${Y + 44}px;width:320px;text-align:center;font-weight:600;font-size:34px;line-height:1.1;opacity:0`, pn);
      K.ft([s, d], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2)", stagger: 0.08 }, t);
      K.sfx("pop", t, 0.5); if (i) K.sfx("whoosh", t - 0.6, 0.3);
      xAnt = x;
    });
    K.sfx("sucesso", K.t(P.marcos[n - 1][0]) + 0.2, 0.5);
  });
})();
