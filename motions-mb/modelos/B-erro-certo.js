/* Grupo B. Erro x certo (série "Em vez disso, faça assim"). Motions 11 a 16. */
(function () {
  const AZ = "#1f66e5", RED = "#e04646";
  const tinta = (seed) => `url("data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='600' height='300'><filter id='f'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' seed='${seed}'/><feComponentTransfer><feFuncA type='discrete' tableValues='1 1 1 1 1 0 1 1'/></feComponentTransfer></filter><rect width='600' height='300' filter='url(#f)'/></svg>`)}")`;

  // ---------- 11 Carimbo ERRADO / ASSIM ----------
  MB.def("11", {
    em: 0, carimbos: [[0.3, "ERRADO", "x", "COSTAS ARREDONDADAS"], [2.6, "ASSIM", "v", "COLUNA NEUTRA"]], y: 760, dura: 1.9, escurecer: 0.3
  }, function (P, K) {
    P.carimbos.forEach(([tc, txt, tipo, sub], i) => {
      const t = K.t(tc), cor = tipo === "x" ? RED : AZ, fim = t + P.dura;
      const ov = K.el("", `inset:0;background:rgba(8,20,47,${P.escurecer});opacity:0`);
      K.ft(ov, { opacity: 0 }, { opacity: 1, duration: 0.15 }, t - 0.05); K.to(ov, { opacity: 0, duration: 0.2 }, fim);
      const st = K.el(`<div style="border:14px solid ${cor};border-radius:26px;padding:10px;"><div style="border:5px solid ${cor};border-radius:14px;padding:6px 46px 16px;color:${cor};font-weight:900;font-style:italic;font-size:170px;line-height:1;letter-spacing:.02em;text-align:center">${txt}</div></div>`,
        `left:0;top:${P.y}px;width:1080px;display:flex;justify-content:center;opacity:0;-webkit-mask-image:${tinta(3 + i)};mask-image:${tinta(3 + i)};-webkit-mask-size:600px 300px;filter:drop-shadow(0 6px 18px rgba(0,0,0,.35))`);
      const rot = tipo === "x" ? -12 : -7;
      K.ft(st, { opacity: 0, scale: 3.2, rotation: rot - 10 }, { opacity: 1, scale: 1, rotation: rot, duration: 0.14, ease: "power4.in" }, t - 0.14);
      K.treme(K.cam, t, 0.32, 16);
      K.sfx(tipo === "x" ? "carimbo" : "selo", t - 0.03, 1);
      if (sub) {
        const sb = K.el(`<span class="hl ${tipo === "x" ? "x" : ""}" style="font-size:56px;padding:4px 22px 10px">${sub}</span>`, `left:0;top:${P.y + 300}px;width:1080px;text-align:center;opacity:0`);
        K.ft(sb, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.25, ease: "expo.out" }, t + 0.25);
        K.to(sb, { opacity: 0, duration: 0.15 }, fim);
      }
      K.to(st, { opacity: 0, scale: 1.08, duration: 0.18 }, fim);
    });
  });

  // ---------- 12 Rebobinar ----------
  MB.def("12", { em: 0, dur: 1.4, texto: "*VOLTA*|VAMOS DE NOVO", depois: "JEITO *CERTO*", y: 760 }, function (P, K) {
    const t0 = K.t(), t1 = t0 + P.dur;
    const scan = K.el("", `inset:0;opacity:0;background:repeating-linear-gradient(0deg,rgba(8,20,47,.28) 0 3px,rgba(8,20,47,0) 3px 7px)`);
    const tint = K.el("", `inset:0;opacity:0;background:rgba(31,102,229,.18);mix-blend-mode:multiply`);
    const faixa = K.el("", `left:0;top:0;width:1080px;height:120px;opacity:0;background:linear-gradient(180deg,rgba(10,27,63,0),rgba(159,188,255,.25),rgba(10,27,63,0))`);
    const rw = K.el(`<svg width="120" height="70" viewBox="0 0 120 70"><path d="M58 0 L0 35 L58 70 Z M120 0 L62 35 L120 70 Z" fill="#fff"/></svg><span style="font-weight:900;font-size:46px;letter-spacing:.06em">REBOBINANDO</span>`,
      "left:60px;top:250px;display:flex;align-items:center;gap:24px;opacity:0");
    const tc = K.el("00:00:04", "right:60px;top:262px;font-weight:700;font-size:40px;letter-spacing:.08em;opacity:0;font-variant-numeric:tabular-nums");
    const tx = K.el(K.rich(P.texto), `left:60px;top:${P.y}px;width:960px;text-align:center;font-weight:400;font-size:110px;line-height:1.08;opacity:0`); tx.classList.add("sombra-txt");
    K.set([scan, tint, faixa], { opacity: 1 }, t0); K.set([scan, tint, faixa], { opacity: 0 }, t1);
    K.ft(rw, { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.2 }, t0);
    K.ft(rw, { opacity: 1 }, { opacity: 0.35, duration: 0.18, yoyo: true, repeat: Math.max(1, Math.floor(P.dur / 0.18) - 2) }, t0 + 0.2);
    K.set(rw, { opacity: 0 }, t1);
    K.set(tc, { opacity: 1 }, t0); K.set(tc, { opacity: 0 }, t1);
    K.conta(tc, 4, 0, t0, P.dur, (v) => "00:00:" + String(Math.floor(v)).padStart(2, "0") + ":" + String(Math.floor((v % 1) * 30)).padStart(2, "0"), "none");
    K.ft(tx, { opacity: 0, scale: 1.4, filter: "blur(12px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.3, ease: "expo.out" }, t0 + 0.1);
    K.to(tx, { opacity: 0, duration: 0.15 }, t1 - 0.1);
    K.ticker((t) => {
      const k = Math.sin(t * 133) * Math.sin(t * 57);
      gsap.set(K.cam, { x: k * 10, skewX: Math.sin(t * 41) * 1.2 });
      gsap.set(faixa, { y: 1920 - ((t - t0) * 2600) % 2100 });
    }, t0, t1);
    K.set(K.cam, { x: 0, skewX: 0 }, t1 + 0.001);
    K.sfx("fita", t0, 0.9);
    const dp = K.el(`<span style="display:inline-flex;align-items:center;gap:16px"><svg width="44" height="50" viewBox="0 0 44 50"><path d="M0 0 L44 25 L0 50 Z" fill="#fff"/></svg>${K.rich(P.depois)}</span>`,
      "left:60px;top:250px;font-weight:400;font-size:62px;opacity:0");
    K.ft(dp, { opacity: 0, x: -80 }, { opacity: 1, x: 0, duration: 0.3, ease: "back.out(2)" }, t1);
    K.to(dp, { opacity: 0, duration: 0.25 }, t1 + 1.8);
    K.sfx("hit", t1, 0.7);
  });

  // ---------- 13 Placar ERRO x TÉCNICA ----------
  MB.def("13", {
    em: 0, esq: "ERRO", dir: "TÉCNICA", inicio_esq: 0, pontos: [[0.6, "BARRA RENTE"], [1.6, "COLUNA NEUTRA"], [2.6, "ABDÔMEN TRAVADO"], [3.6, "EMPURRE O CHÃO"]], y: 250
  }, function (P, K) {
    const t0 = K.t();
    const pl = K.el("", `left:90px;top:${P.y}px;width:900px;height:210px;opacity:0;display:flex;border-radius:26px;overflow:hidden;box-shadow:0 18px 50px rgba(0,0,0,.45);border:2px solid rgba(255,255,255,.25)`);
    const lado = (nm, bg) => K.el(`<div style="font-weight:800;font-size:34px;letter-spacing:.1em;opacity:.85">${nm}</div><div class="sc" style="font-weight:900;font-style:italic;font-size:120px;line-height:1">0</div>`,
      `position:relative;flex:1;height:210px;background:${bg};display:flex;flex-direction:column;align-items:center;justify-content:center`, pl);
    const L = lado(P.esq, "linear-gradient(180deg,#0f2552,#08142f)"), R = lado(P.dir, "linear-gradient(180deg,#2f74f2,#1546b8)");
    K.el("X", "left:420px;top:62px;width:60px;text-align:center;font-weight:900;font-style:italic;font-size:70px;z-index:3;text-shadow:0 4px 12px rgba(0,0,0,.5)", pl);
    L.querySelector(".sc").textContent = P.inicio_esq;
    const sc = R.querySelector(".sc");
    K.ft(pl, { opacity: 0, y: -260 }, { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.4)" }, t0);
    K.sfx("whoosh", t0, 0.5);
    let chipAnt = null;
    P.pontos.forEach(([tp, txt], i) => {
      const t = K.t(tp);
      K.ft(sc, { rotationX: 0 }, { rotationX: 90, duration: 0.1, ease: "power2.in" }, t);
      K.set(sc, { textContent: String(i + 1) }, t + 0.1);
      K.ft(sc, { rotationX: -90 }, { rotationX: 0, duration: 0.18, ease: "back.out(2)" }, t + 0.1);
      K.ft(R, { filter: "brightness(1.35)" }, { filter: "brightness(1)", duration: 0.5 }, t + 0.1);
      const um = K.el("+1", `left:770px;top:${P.y + 40}px;font-weight:900;font-style:italic;font-size:72px;opacity:0;text-shadow:0 4px 16px rgba(0,0,0,.5)`);
      K.ft(um, { opacity: 1, y: 0, scale: 0.6 }, { opacity: 0, y: -150, scale: 1.2, duration: 0.8, ease: "power2.out" }, t + 0.05);
      K.sfx("apito", t, 0.45); K.sfx("hit", t + 0.1, 0.4);
      if (txt) {
        if (chipAnt) K.to(chipAnt, { opacity: 0, x: -60, duration: 0.15 }, t - 0.05);
        const ch = K.el(`<span style="display:inline-flex;align-items:center;gap:14px"><i style="font-style:normal;width:54px;height:54px;border-radius:50%;background:${AZ};display:inline-flex;align-items:center;justify-content:center;font-weight:900;font-size:34px">✓</i><b style="background:rgba(5,14,36,.8);padding:6px 18px 8px;font-weight:800;font-size:40px">${txt}</b></span>`,
          `left:0;top:${P.y + 240}px;width:1080px;text-align:center;opacity:0`);
        K.ft(ch, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.25, ease: "back.out(2)" }, t + 0.1);
        chipAnt = ch;
      }
    });
    const tf = K.t(P.pontos[P.pontos.length - 1][0]) + 0.6;
    K.ft(pl, { scale: 1 }, { scale: 1.06, duration: 0.15, yoyo: true, repeat: 1 }, tf);
  });

  // ---------- 14 Lupa no detalhe ----------
  MB.def("14", {
    em: 0, x: 540, y: 1150, de: [880, 560], zoom: 2.2, raio: 230, etiqueta: "_JOELHO_|PARA DENTRO", tipo: "x", dur: 2.6, escurecer: 0.4, espelho: 1
  }, function (P, K) {
    const t0 = K.t(), t1 = t0 + P.dur, M = K.espelho(P.espelho), V = M.querySelector("video");
    const ov = K.el("", `inset:0;background:rgba(8,20,47,${P.escurecer});opacity:0;z-index:1`);
    K.ft(ov, { opacity: 0 }, { opacity: 1, duration: 0.25 }, t0); K.to(ov, { opacity: 0, duration: 0.2 }, t1);
    const lente = K.svg(`<defs><radialGradient id="lg${K.uid}" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="rgba(255,255,255,.22)"/><stop offset=".4" stop-color="rgba(255,255,255,0)"/></radialGradient></defs>
      <line x1="${P.raio * 0.72}" y1="${P.raio * 0.72}" x2="${P.raio * 1.45}" y2="${P.raio * 1.45}" stroke="#0a1b3f" stroke-width="58" stroke-linecap="round"/>
      <line x1="${P.raio * 0.74}" y1="${P.raio * 0.74}" x2="${P.raio * 1.42}" y2="${P.raio * 1.42}" stroke="${AZ}" stroke-width="40" stroke-linecap="round"/>
      <circle cx="0" cy="0" r="${P.raio}" fill="url(#lg${K.uid})" stroke="${AZ}" stroke-width="16"/>
      <circle cx="0" cy="0" r="${P.raio + 9}" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="3"/>`, 10, 10, "left:0;top:0;opacity:0;z-index:3");
    M.style.zIndex = 45;
    const pos = { x: P.de[0], y: P.de[1] };
    const aplica = () => {
      M.style.clipPath = `circle(${P.raio}px at ${pos.x}px ${pos.y}px)`;
      V.style.transformOrigin = `${pos.x}px ${pos.y}px`; V.style.transform = `scale(${P.zoom})`;
      lente.style.transform = `translate(${pos.x}px,${pos.y}px)`;
    };
    K.set([M, lente], { opacity: 1 }, t0 + 0.05);
    K.ticker((t) => {
      const k = Math.min(1, Math.max(0, (t - t0 - 0.05) / 0.7)), e = 1 - Math.pow(1 - k, 3);
      pos.x = P.de[0] + (P.x - P.de[0]) * e; pos.y = P.de[1] + (P.y - P.de[1]) * e; aplica();
    }, t0, t1);
    K.set([M, lente], { opacity: 0 }, t1);
    K.sfx("whoosh", t0, 0.5);
    const abaixo = P.y + P.raio + 260 < 1640;
    const tag = K.el(K.rich(P.etiqueta), `left:40px;width:1000px;top:${abaixo ? P.y + P.raio + 50 : P.y - P.raio - 230}px;text-align:center;font-size:66px;line-height:1.08;opacity:0;z-index:4`);
    tag.classList.add("sombra-txt");
    const esq = false;
    K.ft(tag, { opacity: 0, y: 30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(2)" }, t0 + 0.8);
    K.to(tag, { opacity: 0, duration: 0.15 }, t1 - 0.1);
    K.sfx(P.tipo === "x" ? "erro" : "pop", t0 + 0.8, 0.4);
  });

  // ---------- 15 Checklist que se preenche ----------
  MB.def("15", {
    em: 0, titulo: "CHECKLIST", itens: [[0.6, "BARRA RENTE"], [1.4, "COLUNA NEUTRA"], [2.2, "ABDÔMEN TRAVADO"], [3.0, "EMPURRE O CHÃO"]], x: 50, y: 420, sai: null
  }, function (P, K) {
    const t0 = K.t(), n = P.itens.length;
    const pn = K.vidro(`left:${P.x}px;top:${P.y}px;width:620px;height:${150 + n * 104}px;opacity:0`);
    K.el(`<span class="hl" style="font-size:46px;padding:2px 18px 6px">${P.titulo}</span>`, "left:34px;top:36px", pn);
    const cnt = K.el(`<span class="c">0</span>/${n}`, "right:34px;top:40px;font-weight:900;font-style:italic;font-size:46px", pn);
    K.ft(pn, { opacity: 0, x: -700 }, { opacity: 1, x: 0, duration: 0.5, ease: "expo.out" }, t0);
    K.ft(pn.querySelector(".brilho"), { x: -400 }, { x: 1500, duration: 1.1 }, t0 + 0.3);
    K.sfx("whoosh", t0, 0.5);
    P.itens.forEach(([tc, txt], i) => {
      const y = 130 + i * 104, t = K.t(tc);
      const box = K.el(`<svg width="62" height="62" viewBox="0 0 62 62" style="position:absolute;left:0;top:0"><path class="ck" d="M15 32 L27 44 L48 19" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        `left:34px;top:${y}px;width:62px;height:62px;border-radius:14px;border:4px solid rgba(255,255,255,.7)`, pn);
      const ck = box.querySelector(".ck");
      ck.style.strokeDasharray = 60; ck.style.strokeDashoffset = 60;
      const tx = K.el(txt, `left:122px;top:${y + 6}px;font-size:44px;font-weight:500;opacity:.6;white-space:nowrap`, pn);
      K.ft(box, { background: "rgba(31,102,229,0)", borderColor: "rgba(255,255,255,.7)", scale: 1 }, { background: AZ, borderColor: AZ, scale: 1.2, duration: 0.12 }, t);
      K.to(box, { scale: 1, duration: 0.2, ease: "back.out(3)" }, t + 0.12);
      K.ft(ck, { strokeDashoffset: 60 }, { strokeDashoffset: 0, duration: 0.25, ease: "power2.out" }, t + 0.05);
      K.ft(tx, { opacity: 0.6, fontWeight: 500, x: 0 }, { opacity: 1, fontWeight: 900, x: 8, duration: 0.25 }, t + 0.05);
      K.set(cnt.querySelector(".c"), { textContent: String(i + 1) }, t + 0.1);
      K.sfx("pop", t, 0.6);
    });
    const tf = K.t(P.itens[n - 1][0]) + 0.45;
    K.ft(pn, { boxShadow: "0 0 0 0 rgba(47,116,242,.9)" }, { boxShadow: "0 0 0 30px rgba(47,116,242,0)", duration: 0.7 }, tf);
    K.sfx("sucesso", tf, 0.5);
    if (P.sai != null) K.to(pn, { x: -700, opacity: 0, duration: 0.35, ease: "power3.in" }, K.t(P.sai));
  });

  // ---------- 16 Medidor "nota da técnica" ----------
  MB.def("16", {
    em: 0, errado: 0.4, certo: 2.6, nota_inicial: 6, nota_errada: 3, nota_certa: 10, texto: "TÉCNICA|DE *ATLETA*", alerta: "ALERTA", x: 540, y: 300, tam: 600
  }, function (P, K) {
    const t0 = K.t(), S = P.tam, R = S * 0.4, cx = S / 2, cy = S * 0.52;
    const ang = (v) => -120 + 240 * v / 10;
    const arco = (a0, a1, r) => { const p = (a) => [cx + r * Math.sin(a * Math.PI / 180), cy - r * Math.cos(a * Math.PI / 180)]; const [x0, y0] = p(a0), [x1, y1] = p(a1); return `M${x0} ${y0} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1}`; };
    let ticks = "";
    for (let v = 0; v <= 10; v++) {
      const a = ang(v) * Math.PI / 180, r1 = R - 34, r2 = R - 8;
      ticks += `<line x1="${cx + r1 * Math.sin(a)}" y1="${cy - r1 * Math.cos(a)}" x2="${cx + r2 * Math.sin(a)}" y2="${cy - r2 * Math.cos(a)}" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
        <text x="${cx + (R - 66) * Math.sin(a)}" y="${cy - (R - 66) * Math.cos(a) + 12}" text-anchor="middle" font-family="M" font-weight="800" font-size="30" fill="rgba(255,255,255,.85)">${v}</text>`;
    }
    const g = K.svg(`<defs><linearGradient id="ga${K.uid}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${RED}"/><stop offset=".45" stop-color="#7a5bd6"/><stop offset="1" stop-color="#2f74f2"/></linearGradient></defs>
      <circle cx="${cx}" cy="${cy}" r="${R + 46}" fill="rgba(10,27,63,.72)" stroke="rgba(255,255,255,.22)" stroke-width="3"/>
      <path d="${arco(-120, 120, R)}" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="26" stroke-linecap="round"/>
      <path class="ar" d="${arco(-120, 120, R)}" fill="none" stroke="url(#ga${K.uid})" stroke-width="26" stroke-linecap="round"/>
      ${ticks}
      <g class="ag" style="transform-origin:${cx}px ${cy}px"><path d="M${cx - 12} ${cy} L${cx} ${cy - R + 18} L${cx + 12} ${cy} Z" fill="#fff"/></g>
      <circle class="hub" cx="${cx}" cy="${cy}" r="26" fill="${AZ}" stroke="#fff" stroke-width="5"/>`, S, S, `left:${P.x - S / 2}px;top:${P.y}px;opacity:0`);
    const ag = g.querySelector(".ag"), hub = g.querySelector(".hub");
    gsap.set(ag, { svgOrigin: `${cx} ${cy}`, rotation: ang(0) });
    const val = K.el("0", `left:${P.x - 150}px;top:${P.y + cy + 50}px;width:300px;text-align:center;font-weight:900;font-style:italic;font-size:120px;line-height:1;opacity:0`);
    K.ft([g, val], { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }, t0);
    K.ft(ag, { rotation: ang(0) }, { rotation: ang(P.nota_inicial), duration: 0.5, ease: "power2.out" }, t0 + 0.1);
    K.conta(val, 0, P.nota_inicial, t0 + 0.1, 0.5);
    const te = K.t(P.errado), tc = K.t(P.certo);
    K.ft(ag, { rotation: ang(P.nota_inicial) }, { rotation: ang(P.nota_errada), duration: 0.6, ease: "elastic.out(1,0.45)" }, te);
    K.conta(val, P.nota_inicial, P.nota_errada, te, 0.35);
    K.to(hub, { attr: { fill: RED }, duration: 0.1 }, te);
    K.to(val, { color: RED, duration: 0.1 }, te);
    const al = K.el(`<span style="display:inline-flex;align-items:center;gap:14px;background:${RED};padding:8px 26px 12px;border-radius:14px"><svg width="54" height="48" viewBox="0 0 54 48"><path d="M27 2 L52 46 L2 46 Z" fill="none" stroke="#fff" stroke-width="5" stroke-linejoin="round"/><rect x="24.5" y="16" width="5" height="16" fill="#fff"/><rect x="24.5" y="36" width="5" height="5" fill="#fff"/></svg><b style="font-weight:900;font-size:50px">${P.alerta}</b></span>`,
      `left:0;top:${P.y + S + 40}px;width:1080px;text-align:center;opacity:0`);
    K.ft(al, { opacity: 0 }, { opacity: 1, duration: 0.12, yoyo: true, repeat: 7 }, te + 0.1);
    K.set(al, { opacity: 0 }, Math.min(tc - 0.05, te + 1.9));
    K.sfx("erro", te + 0.05, 0.5);
    K.ft(ag, { rotation: ang(P.nota_errada) }, { rotation: ang(P.nota_certa), duration: 0.9, ease: "back.out(1.6)" }, tc);
    K.conta(val, P.nota_errada, P.nota_certa, tc, 0.8);
    K.to(hub, { attr: { fill: AZ }, duration: 0.1 }, tc);
    K.to(val, { color: "#fff", duration: 0.1 }, tc);
    K.ft(g, { filter: "drop-shadow(0 0 0px rgba(47,116,242,0))" }, { filter: "drop-shadow(0 0 40px rgba(47,116,242,1))", duration: 0.4 }, tc + 0.6);
    const tx = K.el(K.rich(P.texto), `left:0;top:${P.y + S + 30}px;width:1080px;text-align:center;font-weight:400;font-size:90px;line-height:1.08;opacity:0`); tx.classList.add("sombra-txt");
    K.ft(tx, { opacity: 0, scale: 1.4, filter: "blur(12px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.35, ease: "expo.out" }, tc + 0.7);
    K.sfx("sobe", tc - 0.2, 0.4); K.sfx("sucesso", tc + 0.7, 0.6);
  });
})();
