/* Grupo I. Desenho na tela (motions 51 a 55), na linha premium.
   Como o treinador corrige técnica: o vídeo congela e a caneta desenha por cima (seta, círculo, X, linha
   tracejada), o transferidor mede o ângulo, a palavra errada é riscada, a fita métrica compara as pernas
   e o mapa mostra o atendimento em casa. Nada segue o corpo: o desenho fica parado sobre o quadro congelado.
   Traço branco (ou vermelho no erro, azul claro no certo) com sombra marinho suave, etiquetas numeradas
   em letra de máquina sobre vidro marinho. Usa MB.lux (L-premium.js). */
(function () {
  const COR = { branco: "#ffffff", erro: "#ff5b5b", azul: "#3b7cff", certo: "#3b7cff" };
  const cor = (c) => COR[c] || c || "#fff";
  const RED = "#e04646", SOMBRA = "drop-shadow(0 4px 10px rgba(4,10,26,.55))";
  const fx = (v) => (+v).toFixed(1);

  // ---------- geometria ----------
  // curva suave que passa por todos os pontos (Catmull-Rom em Bézier)
  function spline(pts) {
    if (pts.length < 3) return `M${pts[0][0]} ${pts[0][1]} L${pts[pts.length - 1][0]} ${pts[pts.length - 1][1]}`;
    let d = `M${pts[0][0]} ${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      d += ` C${fx(p1[0] + (p2[0] - p0[0]) / 6)} ${fx(p1[1] + (p2[1] - p0[1]) / 6)} ${fx(p2[0] - (p3[0] - p1[0]) / 6)} ${fx(p2[1] - (p3[1] - p1[1]) / 6)} ${p2[0]} ${p2[1]}`;
    }
    return d;
  }
  // círculo feito à mão: passa um pouco do começo, leve oval e leve tremor (sorteio fixo)
  function circuloMao(cx, cy, r, rnd) {
    const n = 80, a0 = -Math.PI * 0.75 + rnd() * 0.5, volta = 2 * Math.PI * 1.1, ry = 0.88 + rnd() * 0.06, rot = (-12 + rnd() * 10) * Math.PI / 180, fase = rnd() * 6;
    let d = "";
    for (let i = 0; i <= n; i++) {
      const k = i / n, a = a0 + volta * k, rr = r * (1 + 0.03 * Math.sin(3 * a + fase) + 0.06 * k);
      const x = Math.cos(a) * rr, y = Math.sin(a) * rr * ry;
      d += `${i ? "L" : "M"}${fx(cx + x * Math.cos(rot) - y * Math.sin(rot))} ${fx(cy + x * Math.sin(rot) + y * Math.cos(rot))} `;
    }
    return d;
  }
  // seta curva: devolve [corpo, ponta]
  function setaD(de, para, curva) {
    const [x1, y1] = de, [x2, y2] = para, dx = x2 - x1, dy = y2 - y1, k = curva == null ? 0.18 : curva;
    const cx = (x1 + x2) / 2 - dy * k, cy = (y1 + y2) / 2 + dx * k;
    const tx = x2 - cx, ty = y2 - cy, tl = Math.hypot(tx, ty) || 1, ux = tx / tl, uy = ty / tl, h = 36, a = 0.52;
    const p = (s) => [x2 - h * (ux * Math.cos(a) - s * uy * Math.sin(a)), y2 - h * (uy * Math.cos(a) + s * ux * Math.sin(a))];
    const [a1, b1] = p(1), [a2, b2] = p(-1);
    return [`M${x1} ${y1} Q${fx(cx)} ${fx(cy)} ${x2} ${y2}`, `M${fx(a1)} ${fx(b1)} L${x2} ${y2} L${fx(a2)} ${fx(b2)}`];
  }

  // ---------- peças comuns ----------
  // véu leve (sem desfoque: o corpo precisa continuar visível). Criar antes do desenho.
  function veuLeve(K, f, at, ate) {
    const v = K.el("", `left:0;top:0;width:1080px;height:1920px;opacity:0;z-index:0;background:rgba(5,12,30,${f})`);
    K.ft(v, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" }, at);
    K.ft(v, { opacity: 1 }, { opacity: 0, duration: 0.5, ease: "power2.inOut" }, ate);
  }
  // quadro congelado: tira um pouco da cor e aproxima devagar (o desenho aproxima junto, não descola do corpo)
  function congelado(K, wrap, at, ate, fim, zoom, cinza) {
    if (cinza != null && cinza < 1) {
      K.ft(K.cam, { filter: "saturate(1)" }, { filter: `saturate(${cinza})`, duration: 0.6, ease: "power2.out" }, at);
      K.ft(K.cam, { filter: `saturate(${cinza})` }, { filter: "saturate(1)", duration: Math.max(0.2, fim - ate), ease: "power2.inOut" }, ate);
    }
    if (zoom && zoom !== 1) {
      const alvo = [K.cam, wrap];
      K.ft(alvo, { scale: 1 }, { scale: zoom, duration: ate - at, ease: "sine.inOut" }, at);
      K.ft(alvo, { scale: zoom }, { scale: 1, duration: Math.max(0.2, fim - ate), ease: "power2.inOut" }, ate);
    }
  }
  // selo de análise no canto: ícone de pausa e rótulo em letra de máquina
  function selo(K, txt, at, ate) {
    if (!txt) return;
    const { ESC, rotulo, apaga } = MB.lux;
    const e = K.el(`<span style="display:inline-block;width:6px;height:22px;background:#fff;margin-right:6px;vertical-align:-3px"></span><span style="display:inline-block;width:6px;height:22px;background:#fff;margin-right:20px;vertical-align:-3px"></span>${ESC(txt)}`,
      `left:72px;top:236px;opacity:0`);
    e.classList.add("lx-rot", "lx-sombra");
    rotulo(K, e, at, 0.9); apaga(K, [e], ate, 0.4);
    K.sfx("lux_clique", at, 0.5);
  }
  // etiqueta numerada (vidro marinho) com fio fino até o ponto do desenho
  function etiqueta(K, txt, idx, pos, ancora, c, wrap, at, ate, dEnt) {
    const { ESC, rotulo, apaga } = MB.lux;
    const n = String(txt).length + (idx ? String(idx).length + 2 : 0), w = Math.round(n * 24 * 0.76 + 40), h = 54;
    let [x, y] = pos || [ancora[0] - w / 2, ancora[1] - 170];
    x = Math.max(56, Math.min(1080 - 56 - w, x)); y = Math.max(300, Math.min(1480, y));
    const e = K.el(`${idx ? `<span style="color:#9fbcff;margin-right:.8em">${ESC(idx)}</span>` : ""}${ESC(txt)}`,
      `left:${x}px;top:${y}px;padding:13px 18px 13px 16px;font-size:24px;opacity:0;white-space:nowrap;border-left:3px solid ${c}`, wrap);
    e.classList.add("lx-vidro", "lx-rot");
    e.style.color = "#fff";
    // ponto de saída do fio: o meio do lado mais perto do desenho
    const lados = [[x, y + h / 2], [x + w, y + h / 2], [x + w / 2, y], [x + w / 2, y + h]];
    const s = lados.reduce((m, p) => (Math.hypot(p[0] - ancora[0], p[1] - ancora[1]) < Math.hypot(m[0] - ancora[0], m[1] - ancora[1]) ? p : m));
    const f = K.svg(`<path class="fio" d="M${fx(s[0])} ${fx(s[1])} L${fx(ancora[0])} ${fx(ancora[1])}" stroke="rgba(255,255,255,.75)" stroke-width="2" fill="none"/><circle cx="${fx(ancora[0])}" cy="${fx(ancora[1])}" r="6" fill="#fff" class="pt" opacity="0"/>`,
      1080, 1920, "left:0;top:0", wrap);
    K.desenha(f.querySelector(".fio"), at, 0.45, "power2.out");
    K.ft(f.querySelector(".pt"), { opacity: 0 }, { opacity: 1, duration: 0.25 }, at + 0.35);
    rotulo(K, e, at + 0.15, dEnt || 0.8, 0.14);
    K.sfx("lux_clique", at + 0.15, 0.4);
    apaga(K, [e, f], ate, 0.35);
  }
  // âncora padrão de cada desenho (onde o fio da etiqueta encosta)
  function ancoraDe(m, pos) {
    if (m.tipo === "circulo") {
      const r = m.r || 120, ref = pos || [m.x, m.y - 300], a = Math.atan2(ref[1] - m.y, ref[0] - m.x);
      return [m.x + Math.cos(a) * r * 1.02, m.y + Math.sin(a) * r * 0.92];
    }
    if (m.tipo === "x") return [m.x, m.y - (m.tam || 50) - 8];
    if (m.tipo === "seta") return m.de;
    const p = m.pontos || [m.de, m.para];
    return p[Math.floor((p.length - 1) / 2)];
  }

  // ---------- 51 Caneta na tela ----------
  // marcas: {tipo: "circulo"|"x"|"seta"|"curva"|"linha", cor: "branco"|"erro"|"azul", rotulo, rot: [x, y] (canto da etiqueta)}
  //   circulo: x, y, r | x: x, y, tam | seta: de, para, curva | curva: pontos [[x,y]...] | linha: de, para (ou pontos); tracejada: true
  // O fundo precisa estar congelado no spec ({"tipo": "congela"}) durante o motion.
  MB.def("51", {
    em: 0, dur: 6.6, selo: "ANÁLISE · TÉCNICA", veu: 0.18, zoom: 1.03, cinza: 0.72, numerar: true,
    marcas: [
      { tipo: "circulo", x: 690, y: 835, r: 135, cor: "erro", rotulo: "COSTAS ARREDONDADAS", rot: [90, 560] },
      { tipo: "x", x: 690, y: 1215, tam: 46, cor: "erro", rotulo: "PERNAS TRAVADAS", rot: [90, 1300] },
      { tipo: "linha", de: [470, 940], para: [905, 850], tracejada: true, cor: "azul", rotulo: "COSTAS RETAS", rot: [96, 1040] },
      { tipo: "seta", de: [790, 1000], para: [1035, 1010], curva: -0.32, cor: "azul", rotulo: "QUADRIL PARA TRÁS", rot: [560, 1110] }
    ]
  }, function (P, K) {
    const t0 = K.t(), t1 = t0 + P.dur, ts = t1 - 0.55, ms = P.marcas || [], n = Math.max(1, ms.length);
    const a0 = t0 + 0.45, slot = (ts - a0) / n;
    if (P.veu) veuLeve(K, P.veu, t0, ts);
    const wrap = K.el("", "left:0;top:0;width:1080px;height:1920px;transform-origin:50% 50%");
    congelado(K, wrap, t0, ts, t1, P.zoom, P.cinza);
    selo(K, P.selo, t0 + 0.05, ts);
    ms.forEach((m, i) => {
      const tm = a0 + i * slot, c = cor(m.cor), ult = i === n - 1, sw = m.espessura || 7;
      const g = K.svg("", 1080, 1920, `left:0;top:0;filter:${SOMBRA}`, wrap);
      const svg = g.firstChild;
      const caminho = (d, extra) => { svg.insertAdjacentHTML("beforeend", `<path d="${d}" fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" ${extra || ""}/>`); return svg.lastChild; };
      let fim = tm + 0.7;
      if (m.tipo === "circulo") {
        K.desenha(caminho(circuloMao(m.x, m.y, m.r || 120, K.rnd)), tm, 0.75, "power2.inOut");
        K.sfx("lux_traco", tm, 0.5);
      } else if (m.tipo === "x") {
        const t = m.tam || 50;
        K.desenha(caminho(`M${m.x - t} ${m.y - t} L${m.x + t} ${m.y + t}`), tm, 0.26, "power2.in");
        K.desenha(caminho(`M${m.x + t} ${m.y - t} L${m.x - t} ${m.y + t}`), tm + 0.3, 0.26, "power2.in");
        K.sfx("lux_traco", tm, 0.4); K.sfx("lux_traco", tm + 0.3, 0.4); fim = tm + 0.6;
      } else if (m.tipo === "seta") {
        const [corpo, ponta] = setaD(m.de, m.para, m.curva);
        K.desenha(caminho(corpo), tm, 0.6, "power2.inOut");
        K.desenha(caminho(ponta), tm + 0.52, 0.24, "power2.out");
        K.sfx("lux_traco", tm, 0.45);
      } else {
        const pts = m.pontos || [m.de, m.para], d = spline(pts);
        if (m.tracejada) {
          // tracejado que se desenha: uma máscara sólida revela o tracejado
          const id = `${K.uid}m${i}`;
          svg.insertAdjacentHTML("beforeend", `<mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="1080" height="1920"><path d="${d}" fill="none" stroke="#fff" stroke-width="${sw + 14}" stroke-linecap="round"/></mask>`);
          const mk = svg.lastChild.firstChild;
          caminho(d, `stroke-dasharray="2 ${sw * 2.6}" mask="url(#${id})"`);
          K.desenha(mk, tm, 0.8, "power2.inOut");
        } else K.desenha(caminho(d), tm, 0.85, "power2.inOut");
        K.sfx("lux_traco", tm, 0.45);
      }
      // os desenhos anteriores ficam mais claros quando o próximo entra (um foco por vez)
      if (!ult) K.ft(g, { opacity: 1 }, { opacity: 0.5, duration: 0.4, ease: "power2.out" }, tm + slot);
      K.ft(g, { opacity: ult ? 1 : 0.5 }, { opacity: 0, duration: 0.45, ease: "power2.in" }, ts);
      if (m.rotulo) {
        const idx = P.numerar ? String(i + 1).padStart(2, "0") : "";
        etiqueta(K, m.rotulo, idx, m.rot, m.ancora || ancoraDe(m, m.rot), c, wrap, fim - 0.25, ult ? ts : tm + slot + 0.4, 0.8);
      }
    });
  });

  // ---------- 52 Transferidor de ângulo ----------
  // vertice: onde o ângulo abre; ref: ponto da linha de referência (ex.: chão); ponto: ponto da linha medida.
  // O ângulo mostrado é calculado pelos pontos (o desenho bate com o número). "ideal" desenha a linha da meta.
  // Meça os pontos num quadro do vídeo com grade (snapshot) e deixe o fundo congelado no spec durante o motion.
  MB.def("52", {
    em: 0, dur: 5.2, vertice: [830, 1060], ref: [430, 1060], ponto: [450, 880], raio: 230, rotulo: "ÂNGULO DO TRONCO", valor: null,
    ideal: null, ideal_texto: "IDEAL", numero_em: null, selo: "ANÁLISE · ÂNGULO", veu: 0.2, zoom: 1.03, cinza: 0.72
  }, function (P, K) {
    const { ESC, rotulo, apaga } = MB.lux;
    const t0 = K.t(), t1 = t0 + P.dur, ts = t1 - 0.55, [vx, vy] = P.vertice, R = P.raio;
    const ar = Math.atan2(P.ref[1] - vy, P.ref[0] - vx), am = Math.atan2(P.ponto[1] - vy, P.ponto[0] - vx);
    let dA = am - ar; while (dA > Math.PI) dA -= 2 * Math.PI; while (dA < -Math.PI) dA += 2 * Math.PI;
    const s = dA >= 0 ? 1 : -1, th = Math.abs(dA), graus = Math.round(th * 180 / Math.PI), mostra = P.valor != null ? P.valor : graus;
    const pol = (a, r) => [vx + Math.cos(a) * r, vy + Math.sin(a) * r];
    const ang = (deg) => ar + s * deg * Math.PI / 180;
    if (P.veu) veuLeve(K, P.veu, t0, ts);
    const wrap = K.el("", "left:0;top:0;width:1080px;height:1920px;transform-origin:50% 50%");
    congelado(K, wrap, t0, ts, t1, P.zoom, P.cinza);
    selo(K, P.selo, t0 + 0.05, ts);
    // escala do transferidor: marcas de 5 em 5 graus e números de 15 em 15
    const fimEsc = Math.min(180, Math.max(graus, P.ideal || 0) + 20);
    let marcas = "", nums = "";
    for (let d = 0; d <= fimEsc; d += 5) {
      const a = ang(d), l = d % 15 ? 12 : 24, [x1, y1] = pol(a, R + 8), [x2, y2] = pol(a, R + 8 + l);
      marcas += `<path class="mk" d="M${fx(x1)} ${fx(y1)} L${fx(x2)} ${fx(y2)}" stroke="rgba(255,255,255,${d % 15 ? 0.5 : 0.85})" stroke-width="2" opacity="0"/>`;
      if (d && d % 15 === 0) { const [nx, ny] = pol(a, R + 58); nums += `<text class="nm" x="${fx(nx)}" y="${fx(ny + 7)}" text-anchor="middle" font-family="MONO" font-size="20" fill="rgba(255,255,255,.75)" opacity="0">${d}</text>`; }
    }
    const [rx, ry] = pol(ar, R + 130), RL = R + 92, [l0x, l0y] = pol(ar, RL), [l1x, l1y] = pol(ang(fimEsc), RL);
    const leque = `<path class="lq" d="M${vx} ${vy} L${fx(l0x)} ${fx(l0y)} A${RL} ${RL} 0 ${fimEsc > 180 ? 1 : 0} ${s > 0 ? 1 : 0} ${fx(l1x)} ${fx(l1y)} Z" fill="rgba(6,15,38,.62)" opacity="0"/>`;
    const g = K.svg(`${leque}<path class="ref" d="M${vx} ${vy} L${fx(rx)} ${fx(ry)}" stroke="rgba(255,255,255,.8)" stroke-width="3" stroke-dasharray="10 10" fill="none"/>
      <path class="setor" d="" fill="rgba(143,178,255,.16)"/>${marcas}${nums}
      <path class="arco" d="" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
      <path class="pont" d="M${vx} ${vy} L${fx(rx)} ${fx(ry)}" stroke="#fff" stroke-width="7" stroke-linecap="round" fill="none" opacity="0"/>
      <circle cx="${vx}" cy="${vy}" r="13" fill="rgba(6,15,38,.9)" stroke="#fff" stroke-width="3" class="vt" opacity="0"/>`, 1080, 1920, `left:0;top:0;filter:${SOMBRA}`, wrap);
    const q = (c) => g.querySelector(c);
    const tr = t0 + 0.35;
    K.ft(q(".vt"), { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.6, ease: "expo.out" }, tr);
    K.desenha(q(".ref"), tr + 0.1, 0.7, "expo.out");
    K.ft(q(".lq"), { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }, tr + 0.25);
    K.ft(g.querySelectorAll(".mk"), { opacity: 0 }, { opacity: 1, duration: 0.3, stagger: 0.025 }, tr + 0.4);
    K.ft(g.querySelectorAll(".nm"), { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.075 }, tr + 0.5);
    K.sfx("lux_clique", tr, 0.5); K.sfx("lux_ar", tr + 0.4, 0.4);
    // ponteiro gira da referência até a linha medida; arco, setor e número acompanham
    const tp = tr + 0.9, dp = 1.5;
    const num = K.el(`<span class="v">0</span><span style="color:#9fbcff;font-weight:300">°</span>`, "left:0;top:0;opacity:0;font-size:132px;white-space:nowrap", wrap);
    num.classList.add("lx-num", "lx-sombra");
    const lab = K.el(ESC(P.rotulo), "left:0;top:0;opacity:0;font-size:22px", wrap); lab.classList.add("lx-rot", "lx-sombra");
    // número e rótulo ficam fora do arco, na direção do meio do ângulo
    const [bx, by] = pol(ar - s * 0.62, R * 0.95);
    let nx = Math.max(60, Math.min(1080 - 60 - 280, bx - 130)), ny = Math.max(300, Math.min(1480, by - 66));
    if (P.numero_em) [nx, ny] = P.numero_em;
    gsap.set(num, { left: nx, top: ny }); gsap.set(lab, { left: nx + 6, top: ny + 146 });
    K.ft(q(".pont"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, tp);
    K.ticker((t) => {
      const k = Math.max(0, Math.min(1, (t - tp) / dp));
      const e = k === 0 ? 0 : k === 1 ? 1 : k < 0.5 ? Math.pow(2, 20 * k - 10) / 2 : (2 - Math.pow(2, -20 * k + 10)) / 2;
      const a = ar + s * th * e, [px, py] = pol(a, R + 130), [x0, y0] = pol(ar, R), [x1, y1] = pol(a, R);
      q(".pont").setAttribute("d", `M${vx} ${vy} L${fx(px)} ${fx(py)}`);
      const big = th * e > Math.PI ? 1 : 0, sw = s > 0 ? 1 : 0;
      q(".arco").setAttribute("d", e > 0.001 ? `M${fx(x0)} ${fx(y0)} A${R} ${R} 0 ${big} ${sw} ${fx(x1)} ${fx(y1)}` : "");
      q(".setor").setAttribute("d", e > 0.001 ? `M${vx} ${vy} L${fx(x0)} ${fx(y0)} A${R} ${R} 0 ${big} ${sw} ${fx(x1)} ${fx(y1)} Z` : "");
      num.querySelector(".v").textContent = Math.round(mostra * e);
    }, tp, tp + dp + 0.02);
    K.sfx("lux_rolo", tp, 0.55); K.sfx("lux_grave", tp + dp * 0.7, 0.5);
    K.ft(num, { opacity: 0, y: 16, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "expo.out" }, tp + 0.1);
    rotulo(K, lab, tp + 0.4, 0.9, 0.24);
    // linha do ideal (opcional), em azul claro tracejado, com a etiqueta na ponta
    let extra = [];
    if (P.ideal != null) {
      const ai = ang(P.ideal), [ix, iy] = pol(ai, R + 150);
      const li = K.svg(`<path d="M${vx} ${vy} L${fx(ix)} ${fx(iy)}" stroke="#8fb2ff" stroke-width="4" stroke-dasharray="3 14" stroke-linecap="round" fill="none"/>`, 1080, 1920, `left:0;top:0;opacity:0;filter:${SOMBRA}`, wrap);
      const ti = tp + dp + 0.25;
      K.ft(li, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" }, ti);
      const tg = K.el(`${ESC(P.ideal_texto)} ${P.ideal}°`, `left:${fx(Math.max(60, Math.min(860, ix - 70)))}px;top:${fx(Math.max(300, iy - 60))}px;opacity:0;font-size:22px;color:#8fb2ff`, wrap);
      tg.classList.add("lx-rot", "lx-sombra"); rotulo(K, tg, ti + 0.1, 0.8, 0.2);
      K.sfx("lux_toque", ti, 0.35);
      extra = [li, tg];
    }
    apaga(K, [g, num, lab].concat(extra), ts, 0.45);
  });

  // ---------- 53 Palavra riscada ----------
  // A frase errada (fina) é riscada em vermelho e fica apagada; a certa sobe na faixa azul da MB.
  MB.def("53", {
    em: 0, dur: 4.6, antes: "NÃO É", errada: "COISA DA IDADE", certa: "FORÇA + EQUILÍBRIO", nota: "E ISSO SE TRABALHA", y: 700, tam: 112
  }, function (P, K) {
    const { ESC, limpo, fenda, sobe, rotulo, apaga } = MB.lux;
    const t0 = K.t(), t1 = t0 + P.dur, ts = t1 - 0.55, y = P.y;
    const fz1 = Math.min(P.tam, Math.floor(940 / (0.66 * limpo(P.errada).length)));
    const fz2 = Math.min(Math.round(P.tam * 0.86), Math.floor(900 / (0.8 * limpo(P.certa).length)));
    const y1 = y + 56, y2 = y1 + Math.round(fz1 * 1.32), y3 = y2 + Math.round(fz2 * 1.36) + 26;
    // faixa escura atrás (criada antes do texto para ficar atrás)
    const mk = "linear-gradient(180deg, transparent 0%, #000 24%, #000 76%, transparent 100%)";
    const f = K.el("", `left:0;top:${y - 190}px;width:1080px;height:${y3 - y + 300}px;opacity:0;z-index:0;background:rgba(5,13,32,.62);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);mask-image:${mk};-webkit-mask-image:${mk}`);
    K.ft(f, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }, t0);
    K.ft(f, { opacity: 1 }, { opacity: 0, duration: 0.5, ease: "power2.inOut" }, ts + 0.05);
    const els = [];
    if (P.antes) {
      const a = K.el(ESC(P.antes), `left:0;width:1080px;top:${y}px;text-align:center;opacity:0`); a.classList.add("lx-rot", "lx-sombra");
      rotulo(K, a, t0 + 0.05, 0.9); els.push(a);
    }
    // frase errada, fina, com o risco dentro dela (o risco acompanha a largura real da palavra)
    const [m1, s1] = fenda(K, `${ESC(P.errada)}<i class="risco" style="position:absolute;left:-4%;width:108%;top:47%;height:${Math.max(6, Math.round(fz1 * 0.075))}px;border-radius:9px;background:${RED}"></i>`,
      `left:0;width:1080px;top:${y1}px;text-align:center;font-size:${fz1}px`);
    m1.classList.add("lx-tit", "lx-fino", "lx-sombra"); s1.style.position = "relative";
    // o giro do risco vai pelo GSAP (escala 0 junto com giro no CSS confunde a leitura do transform)
    const rq = s1.querySelector(".risco"); gsap.set(rq, { scaleX: 0, rotate: -2.5, transformOrigin: "0% 50%" });
    sobe(K, s1, t0 + 0.15, 1.0); K.sfx("lux_grave", t0 + 0.15, 0.45);
    const tr = t0 + 1.05;
    K.ft(rq, { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: "power3.inOut" }, tr);
    K.sfx("lux_traco", tr, 0.6);
    K.ft(m1, { opacity: 1 }, { opacity: 0.4, duration: 0.6, ease: "power2.out" }, tr + 0.5);
    // frase certa na faixa azul: a faixa abre da esquerda e o texto sobe de dentro dela
    const tc = tr + 0.75;
    const c = K.el(`<span class="fx" style="display:inline-block;background:#1f66e5;padding:.06em .32em .08em;clip-path:inset(0% 100% 0% 0%)"><span class="lx-mask" style="display:inline-block"><span>${MB.lux.rico(P.certa)}</span></span></span>`,
      `left:0;width:1080px;top:${y2}px;text-align:center;font-size:${fz2}px`);
    c.classList.add("lx-tit"); c.style.fontWeight = 800;
    const sc = c.querySelector(".lx-mask > span"); gsap.set(sc, { yPercent: 125 });
    K.ft(c.querySelector(".fx"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "expo.inOut" }, tc);
    sobe(K, sc, tc + 0.22, 0.9);
    K.sfx("lux_passagem", tc, 0.45); K.sfx("lux_grave", tc + 0.25, 0.5);
    els.push(m1, c);
    if (P.nota) {
      const n = K.el(ESC(P.nota), `left:0;width:1080px;top:${y3}px;text-align:center;opacity:0`); n.classList.add("lx-rot", "lx-sombra");
      rotulo(K, n, tc + 0.6, 0.9); els.push(n);
    }
    apaga(K, els, ts, 0.45);
  });

  // ---------- 54 Fita métrica ----------
  // medidas: [[rótulo, valor em metros], ...] (a primeira é a referência). A fita desenrola até a medida e compara.
  MB.def("54", {
    em: 0, dur: 5.8, rotulo: "SALTO EM UMA PERNA", medidas: [["PERNA BOA", 1.90], ["PERNA DA LESÃO", 1.62]], unidade: "M", escala: 2.0,
    diferenca: true, y: 1020
  }, function (P, K) {
    const { ESC, rotulo, apaga, linha, recolhe } = MB.lux;
    const t0 = K.t(), t1 = t0 + P.dur, ts = t1 - 0.6, X = 72, LW = 936, y = P.y, ms = P.medidas, n = ms.length, Hg = 200;
    const px = (v) => LW * v / P.escala, fmt = (v) => v.toFixed(2).replace(".", ",");
    const f = K.el("", `left:0;top:${y - 230}px;width:1080px;height:${n * Hg + 420}px;opacity:0;z-index:0;background:linear-gradient(180deg, rgba(5,13,32,0) 0%, rgba(5,13,32,.68) 20%, rgba(5,13,32,.68) 82%, rgba(5,13,32,0) 100%)`);
    K.ft(f, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }, t0);
    K.ft(f, { opacity: 1 }, { opacity: 0, duration: 0.5, ease: "power2.inOut" }, ts + 0.05);
    const els = [];
    const cab = K.el(ESC(P.rotulo), `left:${X}px;top:${y - 96}px;opacity:0`); cab.classList.add("lx-rot", "az");
    const lc = K.el("", `left:${X}px;top:${y - 48}px;width:${LW}px;transform:scaleX(0)`); lc.classList.add("lx-linha"); lc.style.background = "rgba(255,255,255,.22)";
    rotulo(K, cab, t0 + 0.1, 0.9); linha(K, lc, t0 + 0.15, 1.0); recolhe(K, lc, ts, 0.4); els.push(cab);
    // régua da fita: marcas de 5 cm, 10 cm e números a cada 50 cm
    let reg = "";
    for (let cm = 0; cm <= P.escala * 100 + 0.1; cm += 5) {
      const x = fx(LW * cm / (P.escala * 100)), l = cm % 50 === 0 ? 30 : cm % 10 === 0 ? 18 : 10;
      reg += `<path d="M${x} 0 L${x} ${l}" stroke="rgba(255,255,255,${cm % 50 === 0 ? 0.9 : 0.5})" stroke-width="2"/>`;
      if (cm % 50 === 0 && cm) reg += `<text x="${+x + 6}" y="50" font-family="MONO" font-size="18" fill="rgba(255,255,255,.75)">${(cm / 100).toFixed(1).replace(".", ",")}</text>`;
    }
    const fins = [];
    ms.forEach(([lab, v], i) => {
      const yt = y + i * Hg, ta = t0 + 0.55 + i * 0.55, da = 1.5, W = px(v), ref = i === 0;
      const l = K.el(ESC(lab), `left:${X}px;top:${yt}px;opacity:0;font-size:22px`); l.classList.add("lx-rot"); if (!ref) l.style.color = "#fff";
      rotulo(K, l, ta - 0.1, 0.8, 0.22); els.push(l);
      // fita: vidro marinho com a régua, revelada da esquerda até a medida
      const fita = K.el(`<svg width="${LW}" height="64" viewBox="0 0 ${LW} 64" style="position:absolute;left:0;top:0;overflow:visible">${reg}</svg>`,
        `left:${X}px;top:${yt + 44}px;width:${LW}px;height:64px;border-radius:4px;background:rgba(6,15,38,.82);box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.28);clip-path:inset(0% 100% 0% 0%)`);
      const pct = 100 - (100 * W / LW);
      K.ft(fita, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: `inset(0% ${pct.toFixed(2)}% 0% 0%)`, duration: da, ease: "expo.out" }, ta);
      // ponta da fita (a lingueta) e o número que conta junto
      const pt = K.el("", `left:${X - 3}px;top:${yt + 36}px;width:6px;height:80px;border-radius:3px;background:${ref ? "#fff" : "#8fb2ff"};opacity:0`);
      const nv = K.el(`<span class="v">0,00</span><span style="font-size:.42em;font-weight:300;margin-left:.15em">${ESC(P.unidade)}</span>`, `right:${1080 - X - LW}px;top:${yt - 26}px;opacity:0;font-size:62px;white-space:nowrap;text-align:right`);
      nv.classList.add("lx-num");
      K.ft(pt, { opacity: 0 }, { opacity: 1, duration: 0.2 }, ta);
      K.ticker((t) => {
        const k = Math.max(0, Math.min(1, (t - ta) / da)), e = k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
        gsap.set(pt, { x: W * e });
        nv.querySelector(".v").textContent = fmt(v * e);
      }, ta, ta + da + 0.02);
      K.ft(nv, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" }, ta + 0.05);
      K.sfx("lux_rolo", ta, 0.55); K.sfx("lux_traco", ta + 0.05, 0.35);
      els.push(fita, pt, nv); fins.push([X + W, yt + 44]);
    });
    // diferença: o pedaço que falta aparece tracejado em vermelho na fita mais curta, com a conta embaixo
    if (P.diferenca && n >= 2) {
      const [xa] = fins[0], [xb, yb] = fins[1], td = t0 + 0.55 + (n - 1) * 0.55 + 1.6;
      const dcm = Math.round((ms[0][1] - ms[1][1]) * 100), pc = Math.round(100 * ms[1][1] / ms[0][1]);
      const wf = Math.max(4, xa - xb);
      const br = K.svg(`<rect class="b" x="${fx(xb + 3)}" y="${yb + 2}" width="${fx(wf - 4)}" height="60" rx="4" fill="rgba(224,70,70,.12)" stroke="${RED}" stroke-width="3" stroke-dasharray="10 8"/>`, 1080, 1920, "left:0;top:0;opacity:0");
      K.ft(br, { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.7, ease: "expo.out" }, td);
      const tx = K.el(`<span style="color:${RED}">− ${dcm} CM</span>&nbsp;&nbsp;·&nbsp;&nbsp;${pc}% DA ${ESC(ms[0][0])}`, `right:${1080 - X - LW}px;top:${yb + 64 + 26}px;opacity:0;font-size:24px;text-align:right`);
      tx.classList.add("lx-rot");
      rotulo(K, tx, td + 0.25, 0.9, 0.16);
      K.sfx("lux_toque", td, 0.4);
      els.push(br, tx);
    }
    apaga(K, els, ts, 0.45);
  });

  // ---------- 55 Mapa com pino ----------
  // Mapa desenhado (ruas finas, avenidas e o ribeirão), o raio de atendimento abre a partir da MB,
  // o pino cai na casa do paciente e o caminho se desenha até lá.
  MB.def("55", {
    em: 0, dur: 6.4, rotulo: "RIBEIRÃO PRETO · SP", titulo: "A FISIOTERAPIA|*VAI ATÉ VOCÊ*", origem: "MB SALDANHA", pino: "SUA CASA",
    raio_texto: "ATENDIMENTO DOMICILIAR", y: 300
  }, function (P, K) {
    const { ESC, rico, limpo, fenda, sobe, fecha, pesa, rotulo, apaga } = MB.lux;
    const t0 = K.t(), t1 = t0 + P.dur, ts = t1 - 0.6, y = P.y, X = 60, W = 960, Hm = 820;
    // véu com desfoque (o mapa é o foco)
    const v = K.el("", `left:0;top:0;width:1080px;height:1920px;opacity:0;z-index:0;background:rgba(5,12,30,.45);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)`);
    K.ft(v, { opacity: 0 }, { opacity: 1, duration: 0.7, ease: "power2.out" }, t0);
    K.ft(v, { opacity: 1 }, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, ts + 0.05);
    // título em dois pesos
    const ls = String(P.titulo).split("|"), nc = Math.max(...ls.map((s) => limpo(s).length)), fz = Math.min(92, Math.floor(940 / (0.72 * nc))), lh = Math.round(fz * 1.04);
    const rt = K.el(ESC(P.rotulo), `left:${X}px;top:${y}px;opacity:0`); rt.classList.add("lx-rot", "az");
    rotulo(K, rt, t0 + 0.1, 0.9);
    ls.forEach((s, i) => {
      const [m, sp] = fenda(K, rico(s), `left:${X - 4}px;top:${y + 52 + i * lh}px;font-size:${fz}px`);
      m.classList.add("lx-tit", "lx-fino"); sobe(K, sp, t0 + 0.2 + i * 0.13, 1.0); pesa(K, m, t0 + 0.45 + i * 0.13); fecha(K, sp, ts + i * 0.04, 0.42);
    });
    K.sfx("lux_grave", t0 + 0.2, 0.45);
    // cartão do mapa
    const ym = y + 52 + ls.length * lh + 60;
    const card = K.el("", `left:${X}px;top:${ym}px;width:${W}px;height:${Hm}px;overflow:hidden;clip-path:inset(0% 0% 100% 0%);background:rgba(6,15,38,.84)`);
    card.classList.add("lx-vidro");
    K.ft(card, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.inOut" }, t0 + 0.35);
    K.ft(card, { clipPath: "inset(0% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.6, ease: "expo.inOut" }, ts + 0.1);
    K.sfx("lux_ar", t0 + 0.35, 0.5);
    // ruas: grade levemente girada com sorteio fixo, duas avenidas e o ribeirão
    const rnd = K.rnd, giro = -14 * Math.PI / 180, cx0 = W / 2, cy0 = Hm / 2;
    const roda = (x, y2) => [cx0 + (x - cx0) * Math.cos(giro) - (y2 - cy0) * Math.sin(giro), cy0 + (x - cx0) * Math.sin(giro) + (y2 - cy0) * Math.cos(giro)];
    let ruas = "";
    const linhaR = (a, b, cls, st) => { const [x1, y1] = roda(a[0], a[1]), [x2, y2] = roda(b[0], b[1]); ruas += `<path class="${cls}" d="M${fx(x1)} ${fx(y1)} L${fx(x2)} ${fx(y2)}" ${st}/>`; };
    for (let x = -260, i = 0; x < W + 260; x += 74 + Math.floor(rnd() * 40), i++) linhaR([x, -200], [x, Hm + 200], "rua", `stroke="rgba(255,255,255,${i % 4 ? 0.16 : 0.3})" stroke-width="${i % 4 ? 2 : 3}"`);
    for (let y2 = -200, i = 0; y2 < Hm + 200; y2 += 70 + Math.floor(rnd() * 36), i++) linhaR([-260, y2], [W + 260, y2], "rua", `stroke="rgba(255,255,255,${i % 3 ? 0.16 : 0.3})" stroke-width="${i % 3 ? 2 : 3}"`);
    ruas += `<path class="av" d="M-40 ${Hm * 0.92} C ${W * 0.3} ${Hm * 0.7}, ${W * 0.55} ${Hm * 0.62}, ${W + 40} ${Hm * 0.12}" stroke="rgba(255,255,255,.42)" stroke-width="6" fill="none"/>`;
    ruas += `<path class="rio" d="M${W * 0.08} -20 C ${W * 0.2} ${Hm * 0.25}, ${W * 0.02} ${Hm * 0.5}, ${W * 0.18} ${Hm * 0.75} S ${W * 0.4} ${Hm + 10}, ${W * 0.46} ${Hm + 30}" stroke="rgba(143,178,255,.55)" stroke-width="10" fill="none" stroke-linecap="round"/>`;
    const mapa = K.svg(ruas, W, Hm, "left:0;top:0", card);
    const rs = Array.from(mapa.querySelectorAll(".rua"));
    // as ruas se desenham do centro para fora
    rs.sort((a, b) => { const c = (p) => { const bb = p.getAttribute("d").match(/-?[\d.]+/g).map(Number); return Math.hypot((bb[0] + bb[2]) / 2 - cx0, (bb[1] + bb[3]) / 2 - cy0); }; return c(a) - c(b); });
    rs.forEach((r, i) => K.desenha(r, t0 + 0.6 + i * 0.022, 0.9, "power2.out"));
    K.desenha(mapa.querySelector(".av"), t0 + 0.9, 1.2, "power2.inOut");
    K.desenha(mapa.querySelector(".rio"), t0 + 0.8, 1.4, "power2.inOut");
    K.sfx("lux_traco", t0 + 0.7, 0.4);
    // origem (MB) e pino (casa)
    const ox = W * 0.34, oy = Hm * 0.62, hx = W * 0.7, hy = Hm * 0.34, dist = Math.hypot(hx - ox, hy - oy), R = dist + 90;
    const tr = t0 + 1.7;
    const raio = K.svg(`<circle cx="${fx(ox)}" cy="${fx(oy)}" r="${fx(R)}" fill="rgba(31,102,229,.16)" stroke="rgba(255,255,255,.55)" stroke-width="2" stroke-dasharray="3 9"/>`, W, Hm, "left:0;top:0;opacity:0", card);
    K.ft(raio, { opacity: 0, scale: 0.15, transformOrigin: `${fx(ox)}px ${fx(oy)}px` }, { opacity: 1, scale: 1, duration: 1.3, ease: "expo.out" }, tr);
    K.sfx("lux_ar", tr, 0.45);
    const [cc, pts] = MB.lux.coluna(K, "", 0.2, "#fff", card);
    const og = K.el("", `left:${fx(ox - 30)}px;top:${fx(oy - 30)}px;width:60px;height:60px;border-radius:50%;background:#1f66e5;box-shadow:0 0 0 6px rgba(31,102,229,.25);opacity:0`, card);
    og.appendChild(cc); cc.style.left = "23px"; cc.style.top = "10px";
    K.ft(og, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.7, ease: "expo.out" }, t0 + 1.35);
    MB.lux.colunaEntra(K, pts, t0 + 1.45, 0.05);
    const ol = K.el(ESC(P.origem), `left:${fx(ox - 112)}px;top:${fx(oy + 46)}px;opacity:0;font-size:22px;padding:11px 16px;white-space:nowrap`, card); ol.classList.add("lx-rot", "lx-vidro"); ol.style.color = "#fff";
    rotulo(K, ol, t0 + 1.6, 0.8, 0.16);
    // pino: cai de cima (sem quique), sombra no chão e um anel fino que abre
    const tp = t0 + 2.5;
    const sombra = K.el("", `left:${fx(hx - 22)}px;top:${fx(hy - 7)}px;width:44px;height:14px;border-radius:50%;background:rgba(0,0,0,.45);opacity:0`, card);
    const pino = K.svg(`<path d="M30 76 C30 76 4 46 4 28 A26 26 0 0 1 56 28 C56 46 30 76 30 76 Z" fill="#fff"/><circle cx="30" cy="28" r="10" fill="#0a1b3f"/>`, 60, 80, `left:${fx(hx - 30)}px;top:${fx(hy - 78)}px;opacity:0;filter:${SOMBRA}`, card);
    K.ft(pino, { opacity: 0, y: -240 }, { opacity: 1, y: 0, duration: 0.75, ease: "expo.in" }, tp);
    K.ft(sombra, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.75, ease: "expo.in" }, tp);
    K.sfx("lux_toque", tp + 0.72, 0.6);
    [0, 0.45].forEach((d) => {
      const an = K.el("", `left:${fx(hx - 60)}px;top:${fx(hy - 60)}px;width:120px;height:120px;border-radius:50%;border:2px solid rgba(255,255,255,.8);opacity:0`, card);
      K.ft(an, { opacity: 0.9, scale: 0.2 }, { opacity: 0, scale: 1.4, duration: 1.1, ease: "expo.out" }, tp + 0.75 + d);
    });
    const pl = K.el(`<span style="color:#9fbcff;margin-right:.6em">●</span>${ESC(P.pino)}`, `left:${fx(Math.min(W - 280, hx + 40))}px;top:${fx(hy - 64)}px;opacity:0;font-size:22px;padding:11px 16px;white-space:nowrap`, card);
    pl.classList.add("lx-rot", "lx-vidro"); pl.style.color = "#fff";
    rotulo(K, pl, tp + 0.85, 0.8, 0.16);
    // caminho tracejado da MB até a casa, com um ponto que percorre
    const tc = tp + 1.0, rtD = `M${fx(ox)} ${fx(oy)} L${fx(ox + (hx - ox) * 0.55)} ${fx(oy)} Q${fx(hx)} ${fx(oy)} ${fx(hx)} ${fx(oy - (oy - hy) * 0.45)} L${fx(hx)} ${fx(hy + 6)}`;
    const id = K.uid + "rt";
    const rota = K.svg(`<mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${Hm}"><path class="mk" d="${rtD}" fill="none" stroke="#fff" stroke-width="20" stroke-linecap="round"/></mask>
      <path d="${rtD}" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="2 12" stroke-linecap="round" mask="url(#${id})"/>`, W, Hm, "left:0;top:0", card);
    const mk = rota.querySelector(".mk");
    K.desenha(mk, tc, 1.2, "power2.inOut");
    const dot = K.el("", "left:-9px;top:-9px;width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:0 0 0 6px rgba(255,255,255,.18);opacity:0", card);
    const Lr = mk.getTotalLength ? mk.getTotalLength() : 0;
    K.ticker((t) => {
      const k = Math.max(0, Math.min(1, (t - tc) / 1.2)), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      if (!Lr) return; const p = mk.getPointAtLength(Lr * e);
      gsap.set(dot, { x: p.x, y: p.y, opacity: k > 0 && k < 1 ? 1 : 0 });
    }, tc, tc + 1.22);
    K.sfx("lux_traco", tc, 0.4);
    // rótulo do raio, embaixo do cartão
    const rl = K.el(`${ESC(P.raio_texto)}`, `left:${X}px;top:${ym + Hm + 26}px;width:${W}px;text-align:center;opacity:0;font-size:22px`);
    rl.classList.add("lx-rot"); rotulo(K, rl, tr + 0.5, 0.9, 0.3);
    apaga(K, [rt, rl], ts, 0.4);
  });
})();
