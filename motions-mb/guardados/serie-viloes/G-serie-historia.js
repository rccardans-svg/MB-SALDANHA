/* Grupo G. Série com história: o exercício certo vence os vilões. Motions 41 a 48.
   Os vilões são desenhos em vetor, soltos na tela (nada preso ou rastreando o corpo).
   41 cria o vilão. 42 (barra de vida), 43 (espada), 44 (anilha) e 45 (vilão se cura) se ligam a ele pelo "alvo" (padrão "v"; use outro nome, como "dor", para ter dois vilões no mesmo vídeo).
   A luta é montada no fim (K.depois), em ordem de tempo: cada golpe tira vida, a cura devolve, e o golpe que zera a
   vida derrota o vilão (anilha = esmaga e estoura em confete; espada = corta ao meio). */
(function () {
  const AZ = "#1f66e5", AZ2 = "#2f74f2", NAV = "#0a1b3f", RED = "#e04646", OURO = "#ffd34d";
  const LUTA = MB.LUTA = { v: {}, ev: {}, barras: {}, agendada: false };
  const NOMES = { gordurinha: "GORDURINHA", dor: "DONA DOR", preguica: "PREGUIÇA", plato: "PLATÔ", torta: "POSTURA TORTA", desculpinha: "DESCULPINHA" };
  const CORES = {
    gordurinha: ["#ffd75e", "#ffb81f", "#f29a00", "#1f66e5", "#9fbcff"],
    dor: ["#ff8a7a", RED, "#a3202a", OURO, "#9fbcff"],
    preguica: ["#c9d2e6", "#9aa8c4", "#6f7fa3", "#1f66e5", "#9fbcff"],
    plato: ["#8e9bb8", "#6d7a99", "#c0563f", "#1f66e5", "#9fbcff"],
    torta: ["#f3e7cf", "#d9c7a3", "#1f66e5", "#9fbcff", "#163e9c"],
    desculpinha: ["#ffb35c", "#ff8f2e", "#1f66e5", "#9fbcff", "#163e9c"]
  };
  const ONOMATO = ["TUM!", "PÁ!", "BUM!", "TÓIM!", "CRÁS!"];

  // ---------- rosto padrão (expressões trocáveis) ----------
  function rosto(u, o) {
    const cx = o.cx || 200, ey = o.ey || 205, dx = o.dx || 42, rx = o.rx || 31, ry = o.ry || 35, my = o.my || 286, mw = o.mw || 42;
    const e1 = cx - dx, e2 = cx + dx, pele = o.pele, ps = o.olhar || -8;
    let olhos = "";
    if (o.olho === "bravo") {
      olhos = `<path d="M${e1 - rx} ${ey - 8} L${e1 + rx} ${ey + 10} Q${e1 + rx - 4} ${ey + ry} ${e1} ${ey + ry} Q${e1 - rx} ${ey + ry} ${e1 - rx} ${ey + 6} Z" fill="#fff" stroke="${NAV}" stroke-width="7" stroke-linejoin="round"/>
        <path d="M${e2 + rx} ${ey - 8} L${e2 - rx} ${ey + 10} Q${e2 - rx + 4} ${ey + ry} ${e2} ${ey + ry} Q${e2 + rx} ${ey + ry} ${e2 + rx} ${ey + 6} Z" fill="#fff" stroke="${NAV}" stroke-width="7" stroke-linejoin="round"/>
        <g class="pupilas"><circle cx="${e1 + 6}" cy="${ey + 18}" r="11" fill="${NAV}"/><circle cx="${e2 - 6}" cy="${ey + 18}" r="11" fill="${NAV}"/></g>`;
    } else {
      const lid = o.olho === "meio" ? 0.42 : o.olho === "sono" ? 0.78 : o.olho === "tedio" ? 0.55 : 0;
      olhos = `<ellipse cx="${e1}" cy="${ey}" rx="${rx}" ry="${ry}" fill="#fff"/><ellipse cx="${e2}" cy="${ey}" rx="${rx}" ry="${ry}" fill="#fff"/>
        <g class="pupilas"><circle cx="${e1 + ps}" cy="${ey + 8}" r="${rx * 0.46}" fill="${NAV}"/><circle cx="${e1 + ps - 5}" cy="${ey + 2}" r="4.5" fill="#fff"/>
        <circle cx="${e2 + ps}" cy="${ey + 8}" r="${rx * 0.46}" fill="${NAV}"/><circle cx="${e2 + ps - 5}" cy="${ey + 2}" r="4.5" fill="#fff"/></g>`;
      if (lid) {
        const ly = ey - ry + 2 * ry * lid;
        olhos += `<clipPath id="${u}c1"><ellipse cx="${e1}" cy="${ey}" rx="${rx}" ry="${ry}"/></clipPath><clipPath id="${u}c2"><ellipse cx="${e2}" cy="${ey}" rx="${rx}" ry="${ry}"/></clipPath>
          <rect x="${e1 - rx - 2}" y="${ey - ry - 2}" width="${2 * rx + 4}" height="${ly - ey + ry + 2}" fill="${pele}" clip-path="url(#${u}c1)"/>
          <rect x="${e2 - rx - 2}" y="${ey - ry - 2}" width="${2 * rx + 4}" height="${ly - ey + ry - 3}" fill="${pele}" clip-path="url(#${u}c2)"/>
          <path d="M${e1 - rx + 3} ${ly + 2} Q${e1} ${ly - 7} ${e1 + rx - 3} ${ly + 2}" stroke="${NAV}" stroke-width="7" fill="none" stroke-linecap="round"/>
          <path d="M${e2 - rx + 3} ${ly - 3} Q${e2} ${ly - 12} ${e2 + rx - 3} ${ly - 3}" stroke="${NAV}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
      }
      olhos += `<ellipse cx="${e1}" cy="${ey}" rx="${rx}" ry="${ry}" fill="none" stroke="${NAV}" stroke-width="7"/><ellipse cx="${e2}" cy="${ey}" rx="${rx}" ry="${ry}" fill="none" stroke="${NAV}" stroke-width="7"/>`;
    }
    const sb = {
      deboche: `<path d="M${e1 - 34} ${ey - ry - 12} Q${e1 - 4} ${ey - ry - 32} ${e1 + 30} ${ey - ry - 18}"/><path d="M${e2 - 30} ${ey - ry - 8} Q${e2 + 2} ${ey - ry - 18} ${e2 + 34} ${ey - ry - 6}"/>`,
      bravo: `<path d="M${e1 - rx - 6} ${ey - 26} L${e1 + rx + 4} ${ey - 2}"/><path d="M${e2 + rx + 6} ${ey - 26} L${e2 - rx - 4} ${ey - 2}"/>`,
      tedio: `<path d="M${e1 - 30} ${ey - ry - 10} L${e1 + 30} ${ey - ry - 10}"/><path d="M${e2 - 30} ${ey - ry - 10} L${e2 + 30} ${ey - ry - 10}"/>`,
      triste: `<path d="M${e1 - 30} ${ey - ry - 4} Q${e1} ${ey - ry - 14} ${e1 + 28} ${ey - ry - 26}"/><path d="M${e2 + 30} ${ey - ry - 4} Q${e2} ${ey - ry - 14} ${e2 - 28} ${ey - ry - 26}"/>`
    }[o.sobr || "deboche"];
    const bocas = {
      deboche: `<path d="M${cx - mw} ${my} Q${cx + 4} ${my + 18} ${cx + mw} ${my - 10}" fill="none" stroke="${NAV}" stroke-width="9" stroke-linecap="round"/><path d="M${cx + mw - 4} ${my - 16} Q${cx + mw + 8} ${my - 12} ${cx + mw + 6} ${my - 2}" fill="none" stroke="${NAV}" stroke-width="6" stroke-linecap="round"/>`,
      dentes: `<path d="M${cx - mw - 18} ${my - 16} Q${cx} ${my + 40} ${cx + mw + 18} ${my - 16} Z" fill="${NAV}" stroke="${NAV}" stroke-width="6" stroke-linejoin="round"/>
        <path d="M${cx - mw - 10} ${my - 12} L${cx - mw + 2} ${my + 2} L${cx - mw + 14} ${my - 9} L${cx - mw + 26} ${my + 5} L${cx - 2} ${my - 7} L${cx + 10} ${my + 6} L${cx + 22} ${my - 7} L${cx + 34} ${my + 4} L${cx + mw + 4} ${my - 9} L${cx + mw + 10} ${my - 12} Z" fill="#fff"/>`,
      bocejo: `<ellipse cx="${cx}" cy="${my + 4}" rx="${mw * 0.42}" ry="${mw * 0.32}" fill="${NAV}"/>`,
      reta: `<path d="M${cx - mw} ${my} L${cx + mw} ${my}" stroke="${NAV}" stroke-width="9" stroke-linecap="round"/>`,
      sem_graca: `<path d="M${cx - mw} ${my} Q${cx - mw / 2} ${my - 10} ${cx} ${my} Q${cx + mw / 2} ${my + 10} ${cx + mw} ${my}" fill="none" stroke="${NAV}" stroke-width="8" stroke-linecap="round"/>`
    };
    const w = mw;
    return `<g class="olhos">${olhos}</g>
      <g class="sobrancelhas" stroke="${NAV}" stroke-width="11" stroke-linecap="round" fill="none">${sb}</g>
      <g class="olhosDor" opacity="0" stroke="${NAV}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M${e1 - 22} ${ey - 16} L${e1 + 20} ${ey} L${e1 - 22} ${ey + 16}"/><path d="M${e2 + 22} ${ey - 16} L${e2 - 20} ${ey} L${e2 + 22} ${ey + 16}"/></g>
      <g class="olhosX" opacity="0" stroke="${NAV}" stroke-width="11" stroke-linecap="round"><path d="M${e1 - 18} ${ey - 18} L${e1 + 18} ${ey + 18} M${e1 + 18} ${ey - 18} L${e1 - 18} ${ey + 18}"/><path d="M${e2 - 18} ${ey - 18} L${e2 + 18} ${ey + 18} M${e2 + 18} ${ey - 18} L${e2 - 18} ${ey + 18}"/></g>
      <g class="boca-normal">${bocas[o.boca || "deboche"]}</g>
      <g class="boca-dor" opacity="0"><path d="M${cx - w} ${my + 4} Q${cx - w / 2} ${my - 14} ${cx} ${my + 4} Q${cx + w / 2} ${my + 22} ${cx + w} ${my + 4}" fill="none" stroke="${NAV}" stroke-width="9" stroke-linecap="round"/></g>
      <g class="boca-riso" opacity="0"><path d="M${cx - w - 10} ${my - 12} Q${cx} ${my + 52} ${cx + w + 10} ${my - 12} Z" fill="${NAV}" stroke="${NAV}" stroke-width="6" stroke-linejoin="round"/><path d="M${cx - 22} ${my + 18} Q${cx} ${my + 34} ${cx + 22} ${my + 18} Q${cx} ${my + 8} ${cx - 22} ${my + 18} Z" fill="#ff6f8e"/></g>
      <g class="boca-susto" opacity="0"><ellipse cx="${cx}" cy="${my + 6}" rx="${w * 0.45}" ry="${w * 0.6}" fill="${NAV}"/></g>`;
  }

  // ---------- os vilões (viewBox 0 0 400 400, pés em y≈392) ----------
  function gordurinha(u) {
    const pele = `url(#${u}g)`;
    return `<defs><radialGradient id="${u}g" cx="38%" cy="30%" r="78%"><stop offset="0" stop-color="#ffe896"/><stop offset=".45" stop-color="#ffcb3d"/><stop offset=".85" stop-color="#f2a400"/><stop offset="1" stop-color="#d98c00"/></radialGradient></defs>
      <g class="pes"><ellipse cx="150" cy="384" rx="42" ry="17" fill="#e39500" stroke="${NAV}" stroke-width="8"/><ellipse cx="252" cy="384" rx="42" ry="17" fill="#e39500" stroke="${NAV}" stroke-width="8"/></g>
      <g class="bracoE"><ellipse cx="50" cy="262" rx="36" ry="23" transform="rotate(28 50 262)" fill="${pele}" stroke="${NAV}" stroke-width="8"/></g>
      <g class="bracoD"><ellipse cx="350" cy="256" rx="36" ry="23" transform="rotate(-38 350 256)" fill="${pele}" stroke="${NAV}" stroke-width="8"/>
        <g transform="translate(374 210)"><path d="M0 -36 A36 36 0 1 1 -0.01 -36 Z M0 -12 A12 12 0 1 0 0.01 -12 Z" fill="#d68a4c" fill-rule="evenodd" stroke="${NAV}" stroke-width="6"/>
          <path d="M0 -29 C15 -31 28 -19 28 -4 C31 9 22 23 8 27 C-6 31 -25 23 -28 6 C-32 -10 -16 -28 0 -29 Z M0 -15 A15 15 0 1 0 0.01 -15 Z" fill="#ff7fae" fill-rule="evenodd"/>
          <g stroke-width="5" stroke-linecap="round"><path d="M-15 -17 l7 4" stroke="${AZ}"/><path d="M13 -21 l2 8" stroke="#fff"/><path d="M19 8 l7 -3" stroke="${OURO}"/><path d="M-19 10 l5 6" stroke="#fff"/><path d="M2 19 l8 1" stroke="${AZ}"/></g></g></g>
      <path d="M200 70 C270 70 318 122 336 188 C356 258 372 332 328 368 C296 393 250 394 200 394 C150 394 104 393 72 368 C28 332 44 258 64 188 C82 122 130 70 200 70 Z" fill="${pele}" stroke="${NAV}" stroke-width="9"/>
      <path d="M86 340 Q200 392 314 340" fill="none" stroke="#c98200" stroke-width="10" stroke-linecap="round" opacity=".45"/>
      <path d="M188 332 Q200 344 212 332" fill="none" stroke="#b97700" stroke-width="6" stroke-linecap="round"/>
      <ellipse cx="128" cy="150" rx="32" ry="18" transform="rotate(-38 128 150)" fill="#fff" opacity=".5"/><circle cx="157" cy="117" r="7" fill="#fff" opacity=".55"/>
      <ellipse cx="120" cy="266" rx="26" ry="14" fill="#ff8a5c" opacity=".42"/><ellipse cx="284" cy="266" rx="26" ry="14" fill="#ff8a5c" opacity=".42"/>
      ${rosto(u, { pele: "#ffc634", olho: "meio", sobr: "deboche", boca: "deboche", ey: 205, my: 286 })}`;
  }
  function dor(u) {
    let d = ""; const n = 12, cx = 200, cy = 220;
    for (let i = 0; i < n * 2; i++) {
      const r = i % 2 ? 124 : 158 + ((i * 7) % 3) * 9, a = -Math.PI / 2 + i * Math.PI / n;
      d += (i ? "L" : "M") + (cx + Math.cos(a) * r).toFixed(1) + " " + (cy + Math.sin(a) * r).toFixed(1) + " ";
    }
    const zap = (x, y, s, r) => `<path class="zap" d="M0 0 L20 -36 L9 -34 L26 -68 L-6 -28 L8 -30 Z" transform="translate(${x} ${y}) rotate(${r}) scale(${s})" fill="${OURO}" stroke="${NAV}" stroke-width="5" stroke-linejoin="round"/>`;
    return `<defs><radialGradient id="${u}g" cx="40%" cy="34%" r="75%"><stop offset="0" stop-color="#ffa394"/><stop offset=".45" stop-color="#f25555"/><stop offset=".78" stop-color="#d63a3a"/><stop offset="1" stop-color="#9e1f2b"/></radialGradient></defs>
      ${zap(40, 120, 1.1, -20)}${zap(370, 110, 1.0, 25)}${zap(372, 330, 0.9, 150)}${zap(30, 330, 0.85, -150)}
      <path d="${d}Z" fill="url(#${u}g)" stroke="${NAV}" stroke-width="9" stroke-linejoin="round"/>
      <ellipse cx="140" cy="140" rx="30" ry="16" transform="rotate(-35 140 140)" fill="#fff" opacity=".42"/>
      ${rosto(u, { pele: "#f04a4a", olho: "bravo", sobr: "bravo", boca: "dentes", ey: 196, my: 278, dx: 44, rx: 33, ry: 30, mw: 40 })}`;
  }
  function preguica(u) {
    return `<defs><radialGradient id="${u}g" cx="40%" cy="30%" r="80%"><stop offset="0" stop-color="#eef2fa"/><stop offset=".55" stop-color="#c3cde3"/><stop offset="1" stop-color="#8f9cbc"/></radialGradient></defs>
      <rect x="26" y="300" width="348" height="70" rx="26" fill="${AZ}" stroke="${NAV}" stroke-width="8"/><rect x="10" y="262" width="56" height="112" rx="22" fill="#163e9c" stroke="${NAV}" stroke-width="8"/><rect x="334" y="262" width="56" height="112" rx="22" fill="#163e9c" stroke="${NAV}" stroke-width="8"/>
      <path d="M60 372 l-6 20 M340 372 l6 20" stroke="${NAV}" stroke-width="9" stroke-linecap="round"/>
      <path d="M86 318 C40 318 36 250 84 240 C78 186 140 160 172 196 C188 140 270 140 284 196 C330 176 372 222 342 262 C384 280 364 330 318 326 Z" fill="url(#${u}g)" stroke="${NAV}" stroke-width="9" stroke-linejoin="round"/>
      <ellipse cx="150" cy="196" rx="26" ry="12" transform="rotate(-30 150 196)" fill="#fff" opacity=".55"/>
      <g class="zzz" font-family="M" font-weight="900" font-style="italic" fill="${NAV}"><text x="300" y="150" font-size="44">Z</text><text x="336" y="104" font-size="34">Z</text><text x="362" y="66" font-size="26">Z</text></g>
      ${rosto(u, { pele: "#cfd7ea", olho: "sono", sobr: "tedio", boca: "bocejo", ey: 254, my: 300, dx: 40, rx: 27, ry: 24, mw: 34, cx: 214 })}`;
  }
  function plato(u) {
    let tij = "";
    for (let r = 0; r < 7; r++) for (let c = -1; c < 5; c++) {
      const x = 40 + c * 84 + (r % 2 ? 42 : 0), y = 72 + r * 40;
      if (x > 360 || x + 80 < 40) continue;
      const x0 = Math.max(40, x), x1 = Math.min(360, x + 80);
      tij += `<rect x="${x0 + 3}" y="${y + 3}" width="${x1 - x0 - 6}" height="34" rx="6" fill="${(r * 5 + c * 3) % 4 ? "#a7b2c9" : "#97a3bc"}"/>`;
    }
    const braco = (d) => `<path d="${d}" stroke="${NAV}" stroke-width="56" stroke-linecap="round" fill="none"/><path d="${d}" stroke="#b9c3d8" stroke-width="40" stroke-linecap="round" fill="none"/>`;
    return `<g class="pes"><rect x="88" y="350" width="84" height="40" rx="18" fill="#5b6785" stroke="${NAV}" stroke-width="8"/><rect x="228" y="350" width="84" height="40" rx="18" fill="#5b6785" stroke="${NAV}" stroke-width="8"/></g>
      <rect x="34" y="66" width="332" height="296" rx="16" fill="#46526f" stroke="${NAV}" stroke-width="9"/>${tij}
      <rect x="34" y="66" width="332" height="296" rx="16" fill="none" stroke="${NAV}" stroke-width="9"/>
      <text x="292" y="146" text-anchor="middle" font-family="M" font-weight="900" font-style="italic" font-size="44" fill="${RED}" transform="rotate(-10 292 146)" opacity=".9">KG</text>
      ${rosto(u, { pele: "#a7b2c9", olho: "tedio", sobr: "bravo", boca: "reta", ey: 184, my: 252, dx: 54, rx: 33, ry: 31, mw: 40 })}
      <g class="bracoE">${braco("M60 318 L262 300")}</g><g class="bracoD">${braco("M340 318 L138 300")}</g>`;
  }
  function torta(u) {
    const vs = [[200, 356], [216, 316], [236, 278], [244, 240], [234, 202], [214, 170]];
    const vert = vs.map(([x, y], i) => `<rect x="${x - 42}" y="${y - 18}" width="84" height="36" rx="14" transform="rotate(${[-6, -14, -10, 4, 16, 20][i]} ${x} ${y})" fill="#f3e7cf" stroke="${NAV}" stroke-width="8"/>`).join("");
    return `<path d="M200 392 L200 372" stroke="${NAV}" stroke-width="14" stroke-linecap="round"/><ellipse cx="200" cy="390" rx="66" ry="11" fill="#d9c7a3" stroke="${NAV}" stroke-width="7"/>
      ${vert}
      <g transform="rotate(-14 150 104)"><circle cx="150" cy="98" r="86" fill="#f6ecd8" stroke="${NAV}" stroke-width="9"/>
      <ellipse cx="112" cy="58" rx="22" ry="11" transform="rotate(-30 112 58)" fill="#fff" opacity=".6"/>
      ${rosto(u, { pele: "#f6ecd8", olho: "meio", sobr: "deboche", boca: "deboche", cx: 150, ey: 92, my: 144, dx: 33, rx: 24, ry: 27, mw: 30 })}</g>`;
  }
  function desculpinha(u) {
    return `<defs><radialGradient id="${u}g" cx="40%" cy="30%" r="80%"><stop offset="0" stop-color="#ffd7a1"/><stop offset=".5" stop-color="#ffab4a"/><stop offset="1" stop-color="#e2801f"/></radialGradient></defs>
      <path d="M52 220 C52 120 120 66 200 66 C280 66 348 120 348 210 C348 300 280 342 200 342 C176 342 156 338 138 332 L80 378 L96 318 C66 296 52 262 52 220 Z" fill="url(#${u}g)" stroke="${NAV}" stroke-width="9" stroke-linejoin="round"/>
      <ellipse cx="128" cy="130" rx="30" ry="15" transform="rotate(-35 128 130)" fill="#fff" opacity=".5"/>
      <g fill="${NAV}"><circle cx="160" cy="300" r="9"/><circle cx="200" cy="304" r="9"/><circle cx="240" cy="300" r="9"/></g>
      <path class="bracoE" d="M56 236 Q18 220 22 186" stroke="${NAV}" stroke-width="10" fill="none" stroke-linecap="round"/><path class="bracoD" d="M344 236 Q382 220 378 186" stroke="${NAV}" stroke-width="10" fill="none" stroke-linecap="round"/>
      ${rosto(u, { pele: "#ffab4a", olho: "meio", sobr: "triste", boca: "sem_graca", ey: 190, my: 252, dx: 46, rx: 30, ry: 32, mw: 34, olhar: 9 })}`;
  }
  const DESENHO = { gordurinha, dor, preguica, plato, torta, desculpinha };
  MB.vilaoSVG = (tipo, u) => (DESENHO[tipo] || gordurinha)(u);

  function svgVilao(K, tipo, tam, css, parent, u) {
    return K.el(`<svg xmlns="http://www.w3.org/2000/svg" width="${tam}" height="${tam}" viewBox="0 0 400 400" style="overflow:visible;display:block">${MB.vilaoSVG(tipo, u)}</svg>`, css, parent);
  }

  // ---------- expressões ----------
  function expr(K, V, t, olhos, boca, dur) {
    const g = V.g;
    const so = (nome) => ({ normal: g.olhos, dor: g.olhosDor, x: g.olhosX })[nome];
    const sb = (nome) => ({ normal: g.bocaN, dor: g.bocaD, riso: g.bocaR, susto: g.bocaS })[nome];
    const todosO = [g.olhos, g.olhosDor, g.olhosX], todasB = [g.bocaN, g.bocaD, g.bocaR, g.bocaS];
    if (olhos) { K.set(todosO, { opacity: 0 }, t); K.set(so(olhos), { opacity: 1 }, t); }
    if (boca) { K.set(todasB, { opacity: 0 }, t); K.set(sb(boca), { opacity: 1 }, t); }
    if (dur && t + dur < V.fimPrev) {
      if (olhos) { K.set(todosO, { opacity: 0 }, t + dur); K.set(g.olhos, { opacity: 1 }, t + dur); }
      if (boca) { K.set(todasB, { opacity: 0 }, t + dur); K.set(g.bocaN, { opacity: 1 }, t + dur); }
    }
  }

  // ---------- balão de fala ----------
  function fala(K, V, t, txt, dur, lateral) {
    // balão em cima da cabeça; "lateral" = ao lado do vilão (quando a barra de vida ocupa o alto da tela)
    const dir = V.lado === "dir";
    let pos, cauda, origem;
    if (lateral) {
      const cy = V.y - V.tam * 0.72;
      pos = (dir ? `left:${(V.x + V.tam * 0.42).toFixed(0)}px;` : `right:${(1080 - (V.x - V.tam * 0.42)).toFixed(0)}px;`) + `top:${(cy - 78).toFixed(0)}px;`;
      cauda = dir ? "left:-27px;top:50px;transform:rotate(135deg) skew(12deg,12deg)" : "right:-27px;top:50px;transform:rotate(-45deg) skew(12deg,12deg)";
      origem = dir ? "-6% 50%" : "106% 50%";
    } else {
      const topo = V.y - V.tam * 0.93;
      pos = (dir ? `left:${(V.x - V.tam * 0.06).toFixed(0)}px;` : `right:${(1080 - (V.x + V.tam * 0.06)).toFixed(0)}px;`) + `bottom:${(1920 - topo).toFixed(0)}px;`;
      cauda = `bottom:-25px;${dir ? "left:54px" : "right:54px"};transform:rotate(45deg) skew(12deg,12deg)`;
      origem = `${dir ? "12%" : "88%"} 120%`;
    }
    const b = K.el(`<div style="position:relative;background:#fff;color:${NAV};border:7px solid ${NAV};border-radius:38px;padding:18px 30px 22px;font-weight:900;font-style:italic;font-size:46px;line-height:1.04;white-space:nowrap;box-shadow:0 14px 34px rgba(5,14,36,.4)">${K.rich(txt)}
      <div style="position:absolute;${cauda};width:40px;height:40px;background:#fff;border-right:7px solid ${NAV};border-bottom:7px solid ${NAV}"></div></div>`,
      `${pos}opacity:0;z-index:62;transform-origin:${origem}`);
    K.ft(b, { opacity: 1, scale: 0, rotation: dir ? -8 : 8 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.32, ease: "back.out(2.4)" }, t);
    K.to(b, { opacity: 0, scale: 0.85, duration: 0.18, ease: "power2.in" }, t + dur);
    K.sfx("pop", t, 0.7);
    // fala: boca abre e fecha
    const fim = Math.min(t + dur * 0.7, V.fimPrev - 0.05);
    for (let k = t; k < fim; k += 0.24) { expr(K, V, k, null, "riso"); expr(K, V, Math.min(k + 0.12, fim), null, "normal"); }
  }

  // ---------- número de dano e onomatopeia ----------
  function dano(K, x, y, txt, cor, t) {
    x = Math.max(170, Math.min(910, x)); y = Math.max(400, y);
    const n = K.svg(`<text x="160" y="96" text-anchor="middle" font-family="M" font-weight="900" font-style="italic" font-size="104" fill="${cor}" stroke="${NAV}" stroke-width="16" paint-order="stroke" stroke-linejoin="round">${txt}</text>`, 320, 130, `left:${x - 160}px;top:${y - 70}px;opacity:0;z-index:70`);
    K.ft(n, { opacity: 1, scale: 1.7, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 0.2, ease: "back.out(3)" }, t);
    K.to(n, { y: -110, opacity: 0, duration: 0.7, ease: "power1.in" }, t + 0.35);
  }
  function onomato(K, x, y, txt, t, cor) {
    x = Math.max(160, Math.min(920, x)); y = Math.max(400, y);
    let pts = ""; for (let i = 0; i < 28; i++) { const r = i % 2 ? 78 : 118 + (i % 4 === 0 ? 14 : 0), a = i * Math.PI / 14; pts += `${(150 + Math.cos(a) * r).toFixed(1)},${(120 + Math.sin(a) * r * 0.72).toFixed(1)} `; }
    const o = K.svg(`<polygon points="${pts}" fill="${cor || OURO}" stroke="${NAV}" stroke-width="8" stroke-linejoin="round"/>
      <text x="150" y="142" text-anchor="middle" font-family="M" font-weight="900" font-style="italic" font-size="64" fill="${NAV}">${txt}</text>`, 300, 240, `left:${x - 150}px;top:${y - 120}px;opacity:0;z-index:69`);
    K.ft(o, { opacity: 1, scale: 0.2, rotation: -18 }, { opacity: 1, scale: 1, rotation: -6, duration: 0.18, ease: "back.out(3)" }, t);
    K.to(o, { opacity: 0, scale: 1.25, duration: 0.25, ease: "power2.in" }, t + 0.45);
  }

  // ---------- golpes ----------
  function anilhaVisual(K, V, h, i) {
    const s = V.tam / 340, R = 120 * s, cx = V.x + (i % 2 ? 40 : -40) * s, cy = V.y - V.tam * 0.9 - R * 0.62;
    const p = K.svg(`<defs><radialGradient id="${K.uid}pg${i}" cx="38%" cy="32%" r="75%"><stop offset="0" stop-color="#4a88f5"/><stop offset=".7" stop-color="${AZ}"/><stop offset="1" stop-color="#103a92"/></radialGradient></defs>
      <circle cx="120" cy="120" r="112" fill="url(#${K.uid}pg${i})" stroke="${NAV}" stroke-width="8"/><circle cx="120" cy="120" r="84" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="6"/>
      <circle cx="120" cy="120" r="40" fill="#cfd6e2" stroke="${NAV}" stroke-width="6"/><circle cx="120" cy="120" r="16" fill="${NAV}"/>
      <text x="120" y="70" text-anchor="middle" font-family="M" font-weight="900" font-style="italic" font-size="30" fill="#fff">${V.kg || 20} KG</text>
      <ellipse cx="84" cy="70" rx="28" ry="12" transform="rotate(-35 84 70)" fill="#fff" opacity=".22"/>`, 240, 240, `left:${cx - 120}px;top:${cy - 120}px;width:240px;height:240px;opacity:0;z-index:58;transform:scale(${s})`);
    const t = h.t, lado = i % 2 ? 1 : -1;
    K.ft(p, { opacity: 1, y: -1300, x: lado * -120, rotation: lado * -160, scale: s }, { opacity: 1, y: 0, x: 0, rotation: 0, scale: s, duration: 0.42, ease: "power2.in" }, t - 0.42);
    K.to(p, { y: -170, x: lado * 260, rotation: lado * 220, duration: 0.55, ease: "power2.out" }, t);
    K.to(p, { opacity: 0, duration: 0.25 }, t + 0.35);
    K.treme(K.cam, t, 0.25, 9);
    K.sfx("whoosh", t - 0.32, 0.35); K.sfx("metal", t, 0.9);
  }
  function espadaVisual(K, V, h) {
    const t = h.t, cx = V.x, cy = V.y - V.tam * 0.5, prep = h.mostra == null ? 0.9 : h.mostra;
    // ponto de espera da espada: atrás do corte, dentro da tela (se não couber, corta no sentido contrário)
    let a = h.angulo == null ? -24 : h.angulo, R0 = 0;
    // a espada inteira (do cabo à ponta, 300 px para cada lado do centro, mais o recuo antes do golpe) precisa caber na tela
    const dentro = (x, y) => x > 20 && x < 1060 && y > 380 && y < 1720;
    const cabe = (ang, r) => { const c = Math.cos(ang * Math.PI / 180), sn = Math.sin(ang * Math.PI / 180); return dentro(cx - c * (r + 345), cy - sn * (r + 345)) && dentro(cx - c * (r - 300), cy - sn * (r - 300)); };
    for (const ang of [a, a + 180]) { for (let r = 480; r >= 260; r -= 20) if (cabe(ang, r)) { R0 = r; break; } if (R0) { a = ang; break; } }
    if (!R0) R0 = 260;
    const rad = a * Math.PI / 180, dx = Math.cos(rad), dy = Math.sin(rad), hx = -dx * R0, hy = -dy * R0;
    const sw = K.svg(`<defs><linearGradient id="${K.uid}lb${h.n}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1f6ff"/><stop offset=".5" stop-color="#aac8ff"/><stop offset="1" stop-color="#5a8be8"/></linearGradient></defs>
      <path d="M150 31 L566 31 L612 45 L566 59 L150 59 Z" fill="url(#${K.uid}lb${h.n})" stroke="${NAV}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M162 45 L548 45" stroke="rgba(255,255,255,.75)" stroke-width="4" stroke-linecap="round"/>
      <rect x="40" y="32" width="96" height="26" rx="9" fill="${NAV}"/><path d="M58 32 l-8 26 M78 32 l-8 26 M98 32 l-8 26 M118 32 l-8 26" stroke="${AZ}" stroke-width="5"/>
      <rect x="128" y="6" width="26" height="78" rx="11" fill="${AZ}" stroke="${NAV}" stroke-width="5"/><circle cx="141" cy="45" r="8" fill="${OURO}" stroke="${NAV}" stroke-width="3"/>
      <circle cx="30" cy="45" r="17" fill="${AZ}" stroke="${NAV}" stroke-width="5"/>`, 620, 90,
      `left:${cx - 310}px;top:${cy - 45}px;opacity:0;z-index:66;filter:drop-shadow(0 0 16px rgba(47,116,242,.95))`);
    // brilho que pulsa atrás da espada enquanto ela espera
    const aura = K.el("", `left:${cx + hx - 230}px;top:${cy + hy - 230}px;width:460px;height:460px;border-radius:50%;opacity:0;z-index:65;background:radial-gradient(50% 50% at 50% 50%,rgba(47,116,242,.55),rgba(47,116,242,.18) 45%,rgba(47,116,242,0) 70%)`);
    if (prep > 0.3) {
      const t0 = t - prep;
      K.ft(sw, { opacity: 0, x: hx, y: hy + 60, rotation: a - 200, scale: 0.2 }, { opacity: 1, x: hx, y: hy, rotation: a, scale: 1, duration: 0.42, ease: "back.out(1.7)" }, t0);
      K.ft(aura, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }, t0 + 0.1);
      for (let k = t0 + 0.4; k < t - 0.25; k += 0.36) K.ft(aura, { scale: 1 }, { scale: 1.18, duration: 0.18, yoyo: true, repeat: 1, ease: "sine.inOut" }, k);
      K.to(sw, { x: hx - dx * 40, y: hy - dy * 40, duration: 0.2, ease: "power2.out" }, t - 0.3);   // puxa para trás antes do golpe
      K.to(aura, { opacity: 0, duration: 0.15 }, t - 0.1);
      if (h.nome) {
        const ly = Math.min(1700, cy + hy + 110);
        const lb = K.el(`<span style="display:inline-block;background:${AZ};color:#fff;font-weight:900;font-style:italic;font-size:42px;padding:6px 22px 10px;border-radius:14px;border:4px solid #fff;box-shadow:0 10px 26px rgba(5,14,36,.45);white-space:nowrap">${K.rich(h.nome)}</span>`,
          `left:${Math.max(40, Math.min(1040 - 520, cx + hx - 260))}px;top:${ly}px;width:520px;text-align:center;opacity:0;z-index:67`);
        K.ft(lb, { opacity: 0, y: 30, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(2)" }, t0 + 0.25);
        K.to(lb, { opacity: 0, y: -20, duration: 0.15 }, t - 0.12);
      }
      K.sfx("whoosh", t0, 0.5); K.sfx("selo", t0 + 0.3, 0.5);
    } else K.set(sw, { opacity: 1, x: hx, y: hy, rotation: a }, t - 0.2);
    // corte: atravessa o vilão em linha reta e bem rápido (passa pelo centro no tempo t)
    const D = 0.16, F = 1300, ini = t - D * (R0 + 40) / (R0 + 40 + F);
    K.ft(sw, { x: hx - dx * 40, y: hy - dy * 40, rotation: a }, { x: dx * F, y: dy * F, rotation: a, duration: D, ease: "none" }, ini);
    K.set(sw, { opacity: 0 }, ini + D);
    const eixo = K.el("", `left:${cx - 800}px;top:${cy - 10}px;width:1600px;height:20px;z-index:65;transform:rotate(${a}deg);transform-origin:50% 50%`);
    const risco = K.el("", `left:0;top:0;width:1600px;height:20px;border-radius:10px;opacity:0;background:linear-gradient(90deg,rgba(47,116,242,0),#9fbcff 30%,#d9e6ff 50%,#9fbcff 70%,rgba(47,116,242,0));box-shadow:0 0 30px 8px rgba(47,116,242,.8);transform-origin:${(800 - R0) / 16}% 50%`, eixo);
    K.ft(risco, { opacity: 1, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: D, ease: "none" }, ini);
    K.to(risco, { opacity: 0, scaleY: 0.2, duration: 0.4, ease: "power2.in" }, ini + D);
    K.ft(K.cam, { scale: 1.08 }, { scale: 1, duration: 0.5, ease: "expo.out" }, t);
    K.sfx("whoosh", t - 0.12, 0.9); K.sfx("crec", t, 0.6);
  }

  // ---------- reações ----------
  function reacao(K, V, h, i) {
    const t = h.t, sq = V.sq;
    K.ft(sq, { scaleY: 1, scaleX: 1 }, { scaleY: 0.6, scaleX: 1.3, duration: 0.07, ease: "power2.out" }, t);
    K.to(sq, { scaleY: 1, scaleX: 1, duration: 0.6, ease: "elastic.out(1, 0.32)" }, t + 0.07);
    expr(K, V, t, "dor", "dor", 0.5);
    K.treme(V.el, t, 0.3, 10 * V.tam / 340);
    const d = h.antes - h.depois;
    dano(K, V.x + (i % 2 ? -1 : 1) * V.tam * 0.42, V.y - V.tam * 0.98, "-" + d, "#ff5a5a", t + 0.03);
    if (h.arma === "anilha") onomato(K, V.x + (i % 2 ? 1 : -1) * V.tam * 0.5, V.y - V.tam * 0.62, ONOMATO[i % ONOMATO.length], t);
    K.particulas(V.x, V.y - V.tam * 0.85, 10, t, { cores: CORES[V.tipo], forca: 520, dur: 0.8, tam: 18 });
    K.sfx("hit", t, 0.7);
  }
  function risada(K, V, h) {
    const t = h.t;
    expr(K, V, t, "normal", "riso", 1.0);
    K.ft(V.sq, { scaleY: 1, scaleX: 1 }, { scaleY: 1.08, scaleX: 0.95, duration: 0.12, yoyo: true, repeat: 5, ease: "sine.inOut" }, t);
    ["HA", "HA", "HA!"].forEach((w, k) => {
      const e = K.svg(`<text x="70" y="60" text-anchor="middle" font-family="M" font-weight="900" font-style="italic" font-size="60" fill="${RED}" stroke="${NAV}" stroke-width="10" paint-order="stroke">${w}</text>`, 140, 80,
        `left:${V.x + (k - 1) * V.tam * 0.45 - 70}px;top:${V.y - V.tam * (1.05 + (k % 2) * 0.12) - 40}px;opacity:0;z-index:70`);
      K.ft(e, { opacity: 1, scale: 0, rotation: (k - 1) * 12 }, { opacity: 1, scale: 1, rotation: (k - 1) * 8, duration: 0.2, ease: "back.out(3)" }, t + 0.1 + k * 0.16);
      K.to(e, { opacity: 0, y: -40, duration: 0.3 }, t + 0.9 + k * 0.05);
    });
    dano(K, V.x + V.tam * 0.45, V.y - V.tam * 0.7, "+" + (h.depois - h.antes), "#ff8a8a", t + 0.2);
    K.sfx("erro", t, 0.6);
  }
  function derrota(K, V, h) {
    const t = h.t, el = V.el, cor = CORES[V.tipo];
    K.to(V.sombra, { opacity: 0, duration: 0.3 }, t + 0.2);
    if (h.arma === "espada") {
      const a = (h.angulo == null ? -24 : h.angulo) * Math.PI / 180, T = V.tam, c = T / 2;
      const dx = Math.cos(a), dy = Math.sin(a), nx = -dy, ny = dx, F = 3000;
      const p1 = [c - dx * F, c - dy * F], p2 = [c + dx * F, c + dy * F];
      const poly = (sg) => `polygon(${p1[0]}px ${p1[1]}px, ${p2[0]}px ${p2[1]}px, ${p2[0] + sg * nx * F}px ${p2[1] + sg * ny * F}px, ${p1[0] + sg * nx * F}px ${p1[1] + sg * ny * F}px)`;
      [1, -1].forEach((sg, k) => {
        const m = K.el("", `left:${V.x - T / 2}px;top:${V.y - T}px;width:${T}px;height:${T}px;opacity:0;z-index:46;clip-path:${poly(sg)}`);
        const sv = V.svg.cloneNode(true); m.appendChild(sv);
        sv.querySelectorAll(".olhos,.olhosDor,.boca-normal,.boca-dor,.boca-riso").forEach((e) => e.setAttribute("opacity", "0"));
        sv.querySelectorAll(".olhosX,.boca-susto").forEach((e) => e.setAttribute("opacity", "1"));
        K.set(m, { opacity: 1 }, t + 0.02);
        K.to(m, { x: sg * nx * 70, y: sg * ny * 70, rotation: sg * 10, duration: 0.25, ease: "power2.out" }, t + 0.02);
        K.to(m, { x: sg * nx * 140 + sg * 40, y: 520, rotation: sg * 38, opacity: 0, duration: 0.9, ease: "power2.in" }, t + 0.32);
      });
      K.set(el, { opacity: 0 }, t + 0.02);
      K.particulas(V.x, V.y - V.tam * 0.5, 30, t + 0.05, { cores: cor, forca: 700, dur: 1.1, tam: 22 });
      onomato(K, V.x, V.y - V.tam * 1.05, "K.O.!", t + 0.35, OURO);
      K.sfx("grave", t + 0.05, 0.9); K.sfx("confete", t + 0.3, 0.6);
    } else {
      reacao(K, V, h, 0);
      K.to(V.sq, { scaleY: 0.3, scaleX: 1.6, duration: 0.08, ease: "power2.out", overwrite: false }, t + 0.08);
      expr(K, V, t + 0.08, "x", "susto");
      K.to(V.sq, { scaleY: 1.25, scaleX: 1.25, duration: 0.16, ease: "back.in(2)" }, t + 0.3);
      K.set(el, { opacity: 0 }, t + 0.46);
      for (let k = 0; k < 2; k++) {
        const r = K.el("", `left:${V.x - 160}px;top:${V.y - V.tam * 0.5 - 160}px;width:320px;height:320px;border-radius:50%;border:${12 - k * 4}px solid ${k ? AZ2 : cor[1]};opacity:0;z-index:64`);
        K.ft(r, { opacity: 0.95, scale: 0.3 }, { opacity: 0, scale: 2.4, duration: 0.6, ease: "power2.out" }, t + 0.46 + k * 0.06);
      }
      K.particulas(V.x, V.y - V.tam * 0.5, 44, t + 0.46, { cores: cor, forca: 820, dur: 1.3, tam: 26 });
      onomato(K, V.x, V.y - V.tam * 0.75, "POF!", t + 0.48, OURO);
      K.sfx("grave", t + 0.46, 1); K.sfx("confete", t + 0.5, 0.8);
    }
  }

  // ---------- barra de vida ----------
  function barraLinha(K, B, V, hist) {
    const W0 = 760;
    hist.forEach((h) => {
      const f = h.depois / V.vida;
      if (h.tipo === "golpe") {
        K.to(B.fill, { scaleX: f, duration: 0.22, ease: "power3.out" }, h.t);
        K.to(B.lag, { scaleX: f, duration: 0.45, ease: "power2.inOut" }, h.t + 0.38);
        K.ft(B.fill, { filter: "brightness(1.7)" }, { filter: "brightness(1)", duration: 0.35 }, h.t);
        K.treme(B.el, h.t, 0.28, 9);
      } else {
        K.to(B.lag, { scaleX: f, duration: 0.01 }, h.t + 0.2);
        K.to(B.fill, { scaleX: f, duration: 0.5, ease: "power2.out" }, h.t + 0.2);
        K.ft(B.fill, { filter: "brightness(1.6)" }, { filter: "brightness(1)", duration: 0.6 }, h.t + 0.2);
      }
      K.conta(B.num, h.antes, h.depois, h.t, 0.4);
      if (h.depois <= 0) {
        K.ft(B.ko, { opacity: 0, scale: 2.2, rotation: -20 }, { opacity: 1, scale: 1, rotation: -8, duration: 0.25, ease: "back.out(2)" }, h.t + 0.3);
        K.sfx("carimbo", h.t + 0.32, 0.8);
        K.to(B.el, { y: -340, opacity: 0, duration: 0.45, ease: "power2.in" }, h.t + 1.6);
      }
    });
  }

  // ---------- montagem da luta (depois de todos os motions) ----------
  function agenda(K) {
    if (LUTA.agendada) return; LUTA.agendada = true;
    // dois "depois" seguidos: roda no fim da fila, quando as barras (42) e os outros motions já existem
    K.depois(() => K.depois(() => {
      for (const id in LUTA.v) {
        const V = LUTA.v[id], K2 = V.K;
        const ev = (LUTA.ev[id] || []).slice().sort((a, b) => a.t - b.t);
        let hp = V.vida; const hist = [];
        for (const e of ev) {
          if (e.t < V.pronto) continue;
          const antes = hp;
          hp = e.tipo === "golpe" ? Math.max(0, hp - (e.dano === "tudo" ? hp : e.dano)) : Math.min(V.vida, hp + e.valor);
          hist.push(Object.assign({}, e, { antes, depois: hp }));
          if (hp <= 0) break;
        }
        const morte = hist.length && hist[hist.length - 1].depois <= 0 ? hist[hist.length - 1] : null;
        V.fim = morte ? morte.t + (morte.arma === "espada" ? 0.05 : 0.46) : V.ate;
        V.fimPrev = morte ? morte.t : V.ate;
        const B = LUTA.barras[id];
        V.falas.forEach(([t, txt, dur]) => {
          if (t >= V.fimPrev - 0.2) return;
          const lateral = (B && t > B.t0 - 0.4 && V.y - V.tam * 0.93 - 175 < B.y + 160) || V.y - V.tam * 0.93 < 330;
          fala(K2, V, t, txt, Math.min(dur, V.fimPrev - t - 0.05), lateral);
        });
        let ia = 0;
        hist.forEach((h, i) => {
          if (h.tipo === "golpe") {
            if (h.arma === "anilha") anilhaVisual(K2, V, h, ia++);
            if (h.arma === "espada") espadaVisual(K2, V, h);
            if (h.depois > 0) reacao(K2, V, h, i); else derrota(K2, V, h);
          } else risada(K2, V, h);
        });
        if (!morte && V.ate < K2.D) { // sai de cena sem ser derrotado
          K2.to(V.el, { x: 1300 - V.x + V.tam, duration: 0.5, ease: "power2.in" }, V.ate);
          K2.to(V.sombra, { opacity: 0, duration: 0.3 }, V.ate);
          K2.sfx("whoosh", V.ate, 0.5);
        }
        if (B) barraLinha(B.K, B, V, hist);
        if (V.fimPrev < K2.D) V.aoFim.forEach((f) => f(V.fimPrev));
      }
    }));
  }

  // ---------- 41 Vilão entra em cena ----------
  MB.def("41", {
    em: 0, vilao: "gordurinha", alvo: "v", x: 800, y: 1560, tam: 340, entrada: "cai", lado: "esq", olhar: "esq",
    falas: [[0.7, "HOJE VOCÊ|NÃO TREINA!", 1.8]], vida: 100, ate: null, kg: 20
  }, function (P, K) {
    const t0 = K.t(), T = P.tam, u = K.uid + "v";
    const V = { K, alvo: P.alvo, tipo: P.vilao, x: P.x, y: P.y, tam: T, lado: P.lado, vida: P.vida, kg: P.kg, ate: P.ate != null ? K.t(P.ate) : K.D + 1, falas: (P.falas || []).map(([t, s, d]) => [K.t(t), s, d || 1.6]) };
    V.fim = V.ate; V.fimPrev = V.ate; V.aoFim = [];
    V.sombra = K.el("", `left:${P.x - T * 0.36}px;top:${P.y - T * 0.06}px;width:${T * 0.72}px;height:${T * 0.12}px;border-radius:50%;background:radial-gradient(50% 50% at 50% 50%,rgba(5,14,36,.55),rgba(5,14,36,0));opacity:0;z-index:44`);
    V.el = K.el("", `left:${P.x - T / 2}px;top:${P.y - T}px;width:${T}px;height:${T}px;opacity:0;z-index:45`);
    V.sq = K.el("", `left:0;top:0;width:${T}px;height:${T}px;transform-origin:50% 97%`, V.el);
    V.idl = K.el("", `left:0;top:0;width:${T}px;height:${T}px;transform-origin:50% 97%`, V.sq);
    V.svg = svgVilao(K, P.vilao, T, "left:0;top:0", V.idl, u).querySelector("svg");
    const q = (s) => V.svg.querySelector(s), qa = (s) => V.svg.querySelectorAll(s);
    V.g = { olhos: q(".olhos"), olhosDor: q(".olhosDor"), olhosX: q(".olhosX"), bocaN: q(".boca-normal"), bocaD: q(".boca-dor"), bocaR: q(".boca-riso"), bocaS: q(".boca-susto"), pup: qa(".pupilas"), zaps: qa(".zap"), zzz: q(".zzz"), bE: q(".bracoE"), bD: q(".bracoD") };
    if (P.olhar === "dir") V.g.pup.forEach((p) => gsap.set(p, { x: 14 }));
    LUTA.v[P.alvo] = V; LUTA.ev[P.alvo] = LUTA.ev[P.alvo] || [];
    let pronto = t0;
    if (P.entrada === "cai") {
      pronto = t0 + 0.55;
      K.set(V.el, { opacity: 1 }, t0);
      K.ft(V.el, { y: -(P.y + 300) }, { y: 0, duration: 0.55, ease: "power2.in" }, t0);
      K.ft(V.sombra, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.55, ease: "power2.in" }, t0);
      K.ft(V.sq, { scaleY: 1.25, scaleX: 0.85 }, { scaleY: 0.62, scaleX: 1.3, duration: 0.07, ease: "power2.out" }, pronto - 0.07);
      K.to(V.sq, { scaleY: 1, scaleX: 1, duration: 0.7, ease: "elastic.out(1, 0.35)" }, pronto);
      K.particulas(P.x, P.y - 10, 16, pronto, { cores: ["#dfe7f7", "#9fbcff", "#163e9c"], forca: 420, dur: 0.7, tam: 16, gravidade: 300 });
      K.treme(K.cam, pronto, 0.3, 12);
      K.sfx("whoosh", t0 + 0.1, 0.5); K.sfx("quica", pronto, 1); K.sfx("grave", pronto, 0.6);
    } else if (P.entrada === "brota") {
      pronto = t0 + 0.45;
      K.set(V.el, { opacity: 1 }, t0);
      K.ft(V.sq, { scale: 0, rotation: -25 }, { scale: 1, rotation: 0, duration: 0.45, ease: "back.out(2.2)" }, t0);
      K.ft(V.sombra, { opacity: 0 }, { opacity: 1, duration: 0.3 }, t0);
      for (let k = 0; k < 3; k++) {
        const r = K.el("", `left:${P.x - T * 0.5}px;top:${P.y - T}px;width:${T}px;height:${T}px;border-radius:50%;border:8px solid ${CORES[P.vilao] ? CORES[P.vilao][1] : RED};opacity:0;z-index:44`);
        K.ft(r, { opacity: 0.9, scale: 0.3 }, { opacity: 0, scale: 1.8, duration: 0.8, ease: "power2.out" }, t0 + k * 0.25);
      }
      K.sfx("pop", t0, 0.8); K.sfx("coracao", t0 + 0.1, 0.7);
    } else {
      pronto = t0 + 0.5;
      const dir = P.x > 540 ? 1 : -1;
      K.ft(V.el, { opacity: 1, x: dir * 900 }, { opacity: 1, x: 0, duration: 0.5, ease: "back.out(1.4)" }, t0);
      K.ft(V.sombra, { opacity: 0 }, { opacity: 1, duration: 0.3 }, t0 + 0.2);
      K.sfx("whoosh", t0, 0.6);
    }
    V.pronto = pronto;
    // vida parada: respiração, piscada, raios e Z (tudo calculado pelo tempo, igual em todo render)
    const fase = K.rnd() * 3;
    K.ticker((t) => {
      if (t >= V.fim) return;
      const k = t - pronto, w = 2 * Math.PI / 1.3;
      if (V.tipo === "dor") gsap.set(V.idl, { y: -12 * Math.sin(k * 2 * Math.PI / 1.6), rotation: 3 * Math.sin(k * 2.1), scaleX: 1, scaleY: 1 });
      else gsap.set(V.idl, { scaleY: 1 + 0.035 * Math.sin(k * w), scaleX: 1 - 0.025 * Math.sin(k * w), rotation: V.tipo === "torta" ? 2 * Math.sin(k * 1.7) : 0 });
      const b = (k + fase) % 2.7; gsap.set(V.g.olhos, { scaleY: b < 0.13 ? 0.12 : 1, transformOrigin: "50% 50%" });
      if (V.g.zaps.length) V.g.zaps.forEach((z, i) => z.setAttribute("opacity", ((Math.floor(t * 9) + i * 3) % 5) < 3 ? "1" : "0.15"));
      if (V.g.zzz) gsap.set(V.g.zzz, { y: -10 * ((k * 0.7) % 1), opacity: 0.4 + 0.6 * Math.abs(Math.sin(k * 1.6)) });
      if (V.g.bE && V.tipo === "gordurinha") gsap.set(V.g.bD, { rotation: 6 * Math.sin(k * 2.4), svgOrigin: "330 250" });
    }, pronto, K.D);
    agenda(K);
  });

  // ---------- 42 Barra de vida do vilão ----------
  MB.def("42", { em: 0, alvo: "v", nome: null, y: 200, episodio: "" }, function (P, K) {
    const t0 = K.t(), u = K.uid + "b";
    const el = K.vidro(`left:40px;top:${P.y}px;width:1000px;height:150px;opacity:0;z-index:80`);
    const B = { K, el, t0, y: P.y };
    agenda(K);
    K.depois(() => {
      const V = LUTA.v[P.alvo]; if (!V) return;
      const nome = P.nome || NOMES[V.tipo] || "VILÃO";
      const ret = K.el("", "left:22px;top:15px;width:120px;height:120px;border-radius:50%;overflow:hidden;background:radial-gradient(circle at 50% 40%,#2a5fd0,#0a1b3f);border:5px solid " + RED, el);
      svgVilao(K, V.tipo, 120, "left:0;top:6px", ret, u);
      K.el(`<span style="font-weight:900;font-style:italic;font-size:46px">${nome}</span><span style="margin-left:14px;font-weight:800;font-size:22px;letter-spacing:.12em;background:${RED};padding:4px 12px 6px;border-radius:999px;vertical-align:middle">VILÃO</span>`, "left:166px;top:12px;white-space:nowrap", el);
      const trilho = K.el("", "left:166px;top:84px;width:760px;height:38px;border-radius:19px;background:rgba(5,14,36,.7);box-shadow:inset 0 0 0 3px rgba(255,255,255,.18);overflow:hidden", el);
      B.lag = K.el("", `left:0;top:0;width:760px;height:38px;background:${OURO};transform-origin:0% 50%`, trilho);
      B.fill = K.el("", `left:0;top:0;width:760px;height:38px;background:linear-gradient(180deg,#ff8a8a,${RED} 55%,#b52a33);transform-origin:0% 50%`, trilho);
      K.el([1, 2, 3, 4].map((i) => `<i style="position:absolute;left:${i * 152}px;top:0;width:4px;height:38px;background:rgba(5,14,36,.55)"></i>`).join(""), "left:0;top:0;width:760px;height:38px", trilho);
      K.el("", "left:0;top:0;width:760px;height:14px;background:linear-gradient(180deg,rgba(255,255,255,.35),rgba(255,255,255,0))", trilho);
      B.num = K.el(String(V.vida), "right:30px;top:18px;font-weight:900;font-style:italic;font-size:44px", el);
      K.el("HP", "right:110px;top:30px;font-weight:800;font-size:24px;letter-spacing:.1em;opacity:.8", el);
      B.ko = K.el(`<span style="display:inline-block;font-weight:900;font-style:italic;font-size:70px;color:#fff;background:${RED};padding:0 26px 6px;border:6px solid #fff;border-radius:16px">K.O.</span>`, "left:540px;top:30px;opacity:0;z-index:5", el);
      if (P.episodio) K.el(`<span style="display:inline-block;background:${AZ};font-weight:800;font-size:24px;letter-spacing:.1em;padding:6px 18px 8px;border-radius:12px 12px 0 0">${K.rich(P.episodio)}</span>`, "left:26px;top:-42px;white-space:nowrap", el);
      LUTA.barras[P.alvo] = B;
    });
    K.ft(el, { opacity: 1, y: -260 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, t0);
    K.sfx("whoosh", t0, 0.5);
  });

  // ---------- 43 Golpe da espada azul ----------
  MB.def("43", { em: 0, alvo: "v", angulo: -24, dano: "tudo", nome: "EXERCÍCIO *CERTO*", mostra: 0.9 }, function (P, K) {
    // "em" é o instante do corte; a espada aparece "mostra" segundos antes, mirando o vilão, com o nome do exercício
    const ev = (LUTA.ev[P.alvo] = LUTA.ev[P.alvo] || []);
    ev.push({ t: K.t(), tipo: "golpe", dano: P.dano, arma: "espada", angulo: P.angulo, nome: P.nome, mostra: P.mostra, n: ev.length });
    agenda(K);
  });

  // ---------- 44 Martelo de anilha (uma anilha cai no vilão a cada repetição) ----------
  MB.def("44", { em: 0, alvo: "v", golpes: [0, 1.2, 2.4, 3.6, 4.8], dano: 20 }, function (P, K) {
    const ev = (LUTA.ev[P.alvo] = LUTA.ev[P.alvo] || []);
    P.golpes.forEach((g) => { const [t, d] = Array.isArray(g) ? g : [g, P.dano]; ev.push({ t: K.t(t), tipo: "golpe", dano: d, arma: "anilha" }); });
    agenda(K);
  });

  // ---------- 45 Vilão recupera vida (quando a pessoa erra) ----------
  MB.def("45", { em: 0, alvo: "v", cura: 20, carimbo: true, legenda: "", y: 760 }, function (P, K) {
    (LUTA.ev[P.alvo] = LUTA.ev[P.alvo] || []).push({ t: K.t(), tipo: "cura", valor: P.cura });
    agenda(K);
    if (P.carimbo) K.usar("11", { em: P.em + 0.05, carimbos: [[0, "ERRADO", "x", P.legenda]], dura: 1.4, escurecer: 0, y: P.y });
  });

  // ---------- 46 Placa VILÃO DERROTADO ----------
  MB.def("46", { em: 0, dur: 3.0, titulo: "VILÃO|*DERROTADO*", estrelas: 3, xp: 150, licao: "CADA REPETIÇÃO|*CERTA* É UM GOLPE", y: 520 }, function (P, K) {
    const t0 = K.t(), t1 = t0 + P.dur;
    const esc = K.el("", "inset:0;opacity:0;background:radial-gradient(80% 60% at 50% 45%,rgba(10,27,63,.35),rgba(10,27,63,.82))");
    const pn = K.vidro(`left:80px;top:${P.y}px;width:920px;height:820px;opacity:0;z-index:70`);
    K.el("VITÓRIA", `left:0;top:46px;width:920px;text-align:center;font-weight:800;font-size:34px;letter-spacing:.3em;color:${OURO}`, pn);
    K.el(K.rich(P.titulo), "left:0;top:104px;width:920px;text-align:center;font-weight:400;font-size:100px;line-height:1.02", pn);
    const st = [];
    for (let i = 0; i < 3; i++) {
      const on = i < P.estrelas;
      st.push(K.svg(`<path d="M60 4 L75 42 L116 44 L84 70 L95 110 L60 87 L25 110 L36 70 L4 44 L45 42 Z" fill="${on ? OURO : "rgba(255,255,255,.18)"}" stroke="${NAV}" stroke-width="7" stroke-linejoin="round"/>`, 120, 116,
        `left:${400 + (i - 1) * 150}px;top:${i === 1 ? 330 : 356}px;opacity:0`, pn));
    }
    const xp = K.el(`<span style="font-weight:900;font-style:italic;font-size:64px;color:${OURO}">+<span class="n">0</span> XP</span>`, "left:0;top:500px;width:920px;text-align:center", pn);
    K.el(K.rich(P.licao), "left:40px;top:610px;width:840px;text-align:center;font-weight:500;font-size:54px;line-height:1.1", pn);
    K.ft(esc, { opacity: 0 }, { opacity: 1, duration: 0.3 }, t0);
    K.ft(pn, { opacity: 0, scale: 0.6, y: 80 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.6)" }, t0);
    st.forEach((s, i) => { K.ft(s, { opacity: 0, scale: 0, rotation: -90 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.35, ease: "back.out(3)" }, t0 + 0.45 + i * 0.22); if (i < P.estrelas) K.sfx("selo", t0 + 0.45 + i * 0.22, 0.7); });
    K.conta(xp.querySelector(".n"), 0, P.xp, t0 + 1.1, 0.8);
    K.sfx("sucesso", t0 + 1.1, 0.8);
    K.particulas(540, P.y - 40, 40, t0 + 0.3, { cores: ["#1f66e5", "#2f74f2", "#9fbcff", OURO, "#163e9c"], forca: 760, dur: 1.6, tam: 24 });
    K.sfx("confete", t0 + 0.3, 0.6);
    K.to([pn, esc], { opacity: 0, duration: 0.3 }, t1 - 0.3);
  });

  // ---------- 47 Mapa da jornada (vilões vencidos e o próximo) ----------
  MB.def("47", { em: 0, dur: 3.4, titulo: "A *JORNADA*", viloes: ["gordurinha", "preguica", "plato", "dor", "torta", "desculpinha"], vencidos: 1, legenda: "PRÓXIMO VILÃO" }, function (P, K) {
    const t0 = K.t(), t1 = t0 + P.dur, n = P.viloes.length;
    const fundo = K.el(`<div class="tela-azul"></div>`, "inset:0;opacity:0;z-index:70");
    const tit = K.el(K.rich(P.titulo), "left:0;top:220px;width:1080px;text-align:center;font-weight:400;font-size:90px;z-index:72;opacity:0");
    const pts = []; for (let i = 0; i < n; i++) { const f = i / (n - 1); pts.push([540 + (i % 2 ? 230 : -230) * (i === 0 || i === n - 1 ? 0.6 : 1), 1640 - f * 1180]); }
    let d = `M${pts[0][0]} ${pts[0][1]}`; for (let i = 1; i < n; i++) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i]; d += ` C${x0} ${y0 - 140} ${x1} ${y1 + 140} ${x1} ${y1}`; }
    const mapa = K.svg(`<path d="${d}" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="12" stroke-linecap="round" stroke-dasharray="2 30"/><path class="feito" d="${d}" fill="none" stroke="${OURO}" stroke-width="12" stroke-linecap="round"/>`, 1080, 1920, "left:0;top:0;z-index:71;opacity:0");
    const feito = mapa.querySelector(".feito"), Ltot = feito.getTotalLength();
    const segL = []; { const tmp = document.createElementNS("http://www.w3.org/2000/svg", "path"); mapa.querySelector("svg").appendChild(tmp); let dd = `M${pts[0][0]} ${pts[0][1]}`; segL.push(0); for (let i = 1; i < n; i++) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i]; dd += ` C${x0} ${y0 - 140} ${x1} ${y1 + 140} ${x1} ${y1}`; tmp.setAttribute("d", dd); segL.push(tmp.getTotalLength()); } tmp.remove(); }
    feito.style.strokeDasharray = Ltot; feito.style.strokeDashoffset = Ltot;
    const ate = Math.min(P.vencidos, n - 1), itens = [];
    K.ft(fundo, { opacity: 0 }, { opacity: 1, duration: 0.35 }, t0);
    K.ft([tit, mapa], { opacity: 0 }, { opacity: 1, duration: 0.35 }, t0 + 0.1);
    K.ft(feito, { strokeDashoffset: Ltot }, { strokeDashoffset: Ltot - segL[Math.max(0, ate - 1)], duration: 0.5, ease: "power2.out" }, t0 + 0.3);
    K.to(feito, { strokeDashoffset: Ltot - segL[ate], duration: 0.9, ease: "power2.inOut" }, t0 + 1.2);
    pts.forEach(([x, y], i) => {
      const venc = i < P.vencidos, prox = i === P.vencidos;
      const st = K.el("", `left:${x - 80}px;top:${y - 80}px;width:160px;height:160px;border-radius:50%;overflow:hidden;background:radial-gradient(circle at 50% 40%,#2a5fd0,#0a1b3f);border:7px solid ${venc ? AZ2 : prox ? OURO : "rgba(255,255,255,.4)"};z-index:73;opacity:0`);
      svgVilao(K, P.viloes[i], 150, `left:5px;top:12px;${venc ? "filter:grayscale(1) brightness(.75)" : ""}`, st, K.uid + "m" + i);
      K.ft(st, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, t0 + 0.2 + i * 0.08); itens.push(st);
      if (venc) {
        const ok = K.el(`<svg width="64" height="64" viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="${AZ}" stroke="#fff" stroke-width="5"/><path d="M18 33 L28 43 L46 23" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`, `left:${x + 34}px;top:${y - 92}px;z-index:74;opacity:0`);
        K.ft(ok, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(3)" }, t0 + 0.6 + i * 0.1); itens.push(ok);
        K.sfx("selo", t0 + 0.6 + i * 0.1, 0.5);
      }
      if (prox) {
        const nm = K.el(`<span style="font-weight:800;font-size:28px;letter-spacing:.12em;opacity:.9">${P.legenda}</span><br><span class="hl" style="font-size:52px">${NOMES[P.viloes[i]] || ""}</span>`, `${x > 540 ? `right:${1080 - x + 104}px;text-align:right` : `left:${x + 104}px`};top:${y - 60}px;z-index:74;opacity:0;white-space:nowrap`);
        K.ft(nm, { opacity: 0, x: x > 540 ? 40 : -40 }, { opacity: 1, x: 0, duration: 0.35, ease: "expo.out" }, t0 + 2.1); itens.push(nm);
        const an = K.el("", `left:${x - 96}px;top:${y - 96}px;width:192px;height:192px;border-radius:50%;border:6px solid ${OURO};z-index:72;opacity:0`);
        for (let k = t0 + 2.1; k < t1 - 0.4; k += 0.8) K.ft(an, { opacity: 0.9, scale: 0.85 }, { opacity: 0, scale: 1.35, duration: 0.75, ease: "power1.out" }, k);
        K.sfx("hit", t0 + 2.1, 0.6);
      }
    });
    const pin = K.svg(`<path d="M30 76 C30 76 4 44 4 28 A26 26 0 1 1 56 28 C56 44 30 76 30 76 Z" fill="${OURO}" stroke="${NAV}" stroke-width="6"/><circle cx="30" cy="28" r="10" fill="${NAV}"/>`, 60, 80, "left:0;top:0;z-index:75;opacity:0");
    const pos = (L) => { const p = feito.getPointAtLength(L); gsap.set(pin, { x: p.x - 30, y: p.y - 150 }); };
    K.set(pin, { opacity: 1 }, t0 + 0.6);
    K.ticker((t) => { const k = Math.min(1, Math.max(0, (t - (t0 + 1.2)) / 0.9)); const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; pos(segL[Math.max(0, ate - 1)] + (segL[ate] - segL[Math.max(0, ate - 1)]) * e); }, t0 + 0.6, t1);
    K.sfx("whoosh", t0 + 1.2, 0.4);
    K.to([fundo, tit, mapa, pin], { opacity: 0, duration: 0.3 }, t1 - 0.3);
    K.to(itens, { opacity: 0, duration: 0.3 }, t1 - 0.3);
  });

  // ---------- 48 Dor grudada num ponto do vídeo congelado (sem rastreio) ----------
  MB.def("48", { em: 0, x: 600, y: 1150, tam: 210, regiao: "LOMBAR", alvo: "dor", lado: "esq", falas: [[0.7, "ESSA LOMBAR|É MINHA!", 1.8]], ate: null }, function (P, K) {
    K.usar("41", { em: P.em, vilao: "dor", alvo: P.alvo, x: P.x, y: P.y, tam: P.tam, entrada: "brota", lado: P.lado, falas: P.falas, ate: P.ate });
    const t0 = K.t(), esq = P.lado !== "dir";
    const tag = K.el(`<span style="display:inline-flex;align-items:center;gap:10px;background:${RED};font-weight:900;font-style:italic;font-size:40px;padding:6px 20px 10px;border-radius:14px;box-shadow:0 8px 24px rgba(0,0,0,.35)"><svg width="26" height="26" viewBox="0 0 26 26"><circle cx="13" cy="13" r="9" fill="#fff"/></svg>${P.regiao}</span>`,
      `${esq ? `left:${P.x + P.tam * 0.45}px` : `right:${1080 - P.x + P.tam * 0.45}px`};top:${P.y - P.tam * 0.55}px;opacity:0;z-index:61`);
    K.ft(tag, { opacity: 0, x: esq ? -30 : 30 }, { opacity: 1, x: 0, duration: 0.3, ease: "expo.out" }, t0 + 0.4);
    const V = LUTA.v[P.alvo];
    if (V) V.aoFim.push((tf) => K.to(tag, { opacity: 0, x: esq ? -30 : 30, duration: 0.2, ease: "power2.in" }, tf));
  });
})();
