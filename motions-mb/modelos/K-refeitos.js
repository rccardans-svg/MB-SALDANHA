/* Grupo K. Refeitos na linha premium (motions 62 a 64): o mapa da dor (antigo 17), o raio-X (antigo 18) e o
   React do Ullisses (antigo 36), que o Paulo pediu para refazer no padrão novo em 2026-11-04.
   Mesma linha dos 41 a 60: um foco por vez, dois pesos, rótulos em letra de máquina, linhas finas, vidro marinho,
   entradas suaves sem quique, partícula ou brilho. Vermelho só no ponto que dói (o resto é branco e azul da MB).
   Usa MB.lux (L-premium.js); o 62 usa a anatomia (anatomia.js) e o 64 chama o 51 (caneta na tela).
   (O 61, rosto premium, fica em L-premium.js.) */
(function () {
  const AZ = "#1f66e5", CL = "#9fbcff", ERRO = "#ff5b5b", ERRO2 = "#ff8a8a", FUNDO = "rgba(6,15,38,.84)";
  const fx = (v) => (+v).toFixed(1);
  const dd = (n) => String(n).padStart(2, "0");

  // ---------- peças comuns (as mesmas do grupo H) ----------
  // véu: escurece e desfoca o vídeo atrás do cartão. Criar ANTES do cartão. Some no fundo verde (lx-veu).
  function veu(K, at, ate, forca, desf) {
    const f = forca == null ? 0.42 : forca, d = desf == null ? 10 : desf;
    const v = K.el("", `left:0;top:0;width:1080px;height:1920px;opacity:0;z-index:0;background:rgba(5,12,30,${f});backdrop-filter:blur(${d}px);-webkit-backdrop-filter:blur(${d}px)`); v.classList.add("lx-veu");
    K.ft(v, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.out" }, at);
    K.ft(v, { opacity: 1 }, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, ate);
    return v;
  }
  // cartão de vidro que abre de cima para baixo, com marcas de corte nos quatro cantos
  function placa(K, x, y, w, h, at, ate) {
    const p = K.el("", `left:${x}px;top:${y}px;width:${w}px;height:${h}px;clip-path:inset(0% 0% 100% 0%);background:${FUNDO}`);
    p.classList.add("lx-vidro");
    K.ft(p, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.inOut" }, at);
    K.ft(p, { clipPath: "inset(0% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.6, ease: "expo.inOut" }, ate);
    const cantos = marcasCanto(K, x, y, w, h, 16, 30, "rgba(255,255,255,.55)");
    K.ft(cantos, { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.9, ease: "expo.out", stagger: 0.05 }, at + 0.35);
    MB.lux.apaga(K, cantos, ate - 0.05, 0.4);
    K.sfx("lux_ar", at, 0.55);
    return p;
  }
  // quatro cantos em L (moldura de visor), a g px para fora do retângulo
  function marcasCanto(K, x, y, w, h, g, L, cor, parent) {
    return [[x - g, y - g, `M1 ${L} V1 H${L}`], [x + w + g - L, y - g, `M0 1 H${L - 1} V${L}`], [x - g, y + h + g - L, `M1 0 V${L - 1} H${L}`], [x + w + g - L, y + h + g - L, `M0 ${L - 1} H${L - 1} V0`]]
      .map(([cx, cy, d]) => K.svg(`<path d="${d}" fill="none" stroke="${cor}" stroke-width="2"/>`, L, L, `left:${cx}px;top:${cy}px;opacity:0;line-height:0`, parent));
  }
  // texto em letra de máquina dentro de uma fenda (entra subindo, sai subindo)
  function monoFenda(K, txt, css, cor) {
    const [m, s] = MB.lux.fenda(K, `<span class="lx-rot" style="font-size:inherit;${cor ? "color:" + cor : ""}">${txt}</span>`, css);
    return [m, s];
  }

  // ======================================================================================================
  // ---------- 62 Mapa da dor (premium) ----------
  // Cartão com o corpo de frente e de costas em traço fino. Cada região acende em vermelho, com ponto que
  // respira e o nome embaixo (dois pesos); a anterior fica marcada mais fraca, e no fim o mapa mostra tudo.
  // regioes: [segundo, chave, nome, detalhe, lado]. chave: cervical, ombro, toracica, lombar, quadril, gluteo,
  //   joelho, tornozelo, punho, cotovelo, abdomen, posterior, panturrilha, quadriceps, peitoral, trapezio.
  //   lado (opcional): "direito" ou "esquerdo" (do paciente) para marcar um lado só. nome aceita *forte*.
  const REG = {
    cervical: [["costas", ["trapezius"]], ["frente", ["neck"]]], pescoco: [["frente", ["neck"]], ["costas", ["trapezius"]]],
    ombro: [["frente", ["front_deltoids"]], ["costas", ["back_deltoids"]]], toracica: [["costas", ["upper_back"]]],
    lombar: [["costas", ["lower_back"]]], quadril: [["costas", ["gluteal"]], ["frente", ["abductors"]]], gluteo: [["costas", ["gluteal"]]],
    joelho: [["frente", ["knees"]], ["costas", ["knees"]]], tornozelo: [["frente", ["calves"]], ["costas", ["left_soleus", "right_soleus"]]],
    punho: [["frente", ["forearm"]], ["costas", ["forearm"]]], cotovelo: [["frente", ["forearm", "biceps"]]], abdomen: [["frente", ["abs"]]],
    core: [["frente", ["abs", "obliques"]]], posterior: [["costas", ["hamstring"]]], panturrilha: [["costas", ["calves"]]],
    quadriceps: [["frente", ["quadriceps"]]], peitoral: [["frente", ["chest"]]], trapezio: [["costas", ["trapezius"]]]
  };
  const pontosDe = (s) => { const v = String(s).trim().split(/\s+/).map(Number), r = []; for (let i = 0; i + 1 < v.length; i += 2) r.push([v[i], v[i + 1]]); return r; };
  const centro = (pts) => [pts.reduce((a, p) => a + p[0], 0) / pts.length, pts.reduce((a, p) => a + p[1], 0) / pts.length];
  const F_BASE = "rgba(159,188,255,0.06)", S_BASE = "rgba(255,255,255,0.5)";

  MB.def("62", {
    em: 0, dur: 6.6, rotulo: "MAPA DA DOR", titulo: "ONDE *DÓI?*", y: 370, veu: 0.42,
    regioes: [[1.5, "cervical", "*CERVICAL*", "TENSÃO NO PESCOÇO"], [3.0, "lombar", "*LOMBAR*", "DOR AO FICAR SENTADO"], [4.5, "joelho", "*JOELHO* DIREITO", "DOR AO SUBIR ESCADA", "direito"]]
  }, function (P, K) {
    const { ESC, rico, limpo, fenda, sobe, fecha, pesa, rotulo, linha, recolhe, apaga, respira } = MB.lux;
    const t0 = K.t(), t1 = t0 + P.dur, ts = t1 - 0.6, X = 90, W = 900, Y = P.y, H = 1130, IX = X + 48, IW = W - 96;
    const regs = (P.regioes || []).filter((r) => REG[r[1]]), N = regs.length;
    if (P.veu) veu(K, t0, ts, P.veu, 10);
    placa(K, X, Y, W, H, t0, ts);
    // cabeçalho: rótulo, página (01 / 03) e linha fina
    const rot = K.el(ESC(P.rotulo), `left:${IX}px;top:${Y + 44}px;opacity:0`); rot.classList.add("lx-rot", "az");
    const lh1 = K.el("", `left:${IX}px;top:${Y + 96}px;width:${IW}px;transform:scaleX(0)`); lh1.classList.add("lx-linha"); lh1.style.background = "rgba(255,255,255,.22)";
    const pags = regs.map((r, i) => monoFenda(K, `${dd(i + 1)} / ${dd(N)}`, `right:${1080 - (X + W - 48)}px;top:${Y + 40}px;font-size:26px`, "rgba(255,255,255,.5)"));
    rotulo(K, rot, t0 + 0.25, 1.0); linha(K, lh1, t0 + 0.35, 1.1); respira(K, rot, t0 + 1.3, ts);
    // título em dois pesos
    const fzT = Math.min(84, Math.floor(IW / (0.72 * limpo(P.titulo).length)));
    const [tm, tsp] = fenda(K, rico(P.titulo), `left:${IX - 4}px;top:${Y + 128}px;font-size:${fzT}px`); tm.classList.add("lx-tit", "lx-fino");
    sobe(K, tsp, t0 + 0.42, 1.1); pesa(K, tm, t0 + 0.7); K.sfx("lux_grave", t0 + 0.45, 0.5);
    // corpo de frente e de costas (polígonos da anatomia em traço fino)
    const s = 2.8, FW = 100 * s, FH = 200 * s, gap = 120, fy = Y + 262, fxs = { frente: 540 - gap / 2 - FW, costas: 540 + gap / 2 };
    const area = K.el("", `left:${fxs.frente - 20}px;top:${fy - 10}px;width:${2 * FW + gap + 40}px;height:${FH + 20}px;clip-path:inset(0% 0% 100% 0%)`);
    const figs = {};
    ["frente", "costas"].forEach((v) => {
      let h = "";
      Object.entries(MB.ANAT[v]).forEach(([g, ps]) => ps.forEach((p) => {
        h += `<polygon data-g="${g}" points="${p}" style="fill:${F_BASE};stroke:${S_BASE}" stroke-width="${fx(1.25 / s)}" stroke-linejoin="round"/>`;
      }));
      figs[v] = K.svg(`<g transform="scale(${s})">${h}</g>`, FW, FH, `left:${fxs[v] - (fxs.frente - 20)}px;top:10px;line-height:0`, area);
    });
    // leitura: a linha fina desce pelo corpo e revela o desenho
    const scan = K.el("", `left:${fxs.frente - 40}px;top:${fy}px;width:${2 * FW + gap + 80}px;height:2px;background:rgba(255,255,255,.7);opacity:0`);
    K.ft(area, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.15, ease: "power2.inOut" }, t0 + 0.6);
    K.ft(scan, { opacity: 0, y: 0 }, { opacity: 1, duration: 0.2 }, t0 + 0.6);
    K.ft(scan, { y: 0 }, { y: FH, duration: 1.15, ease: "power2.inOut" }, t0 + 0.6);
    K.ft(scan, { opacity: 1 }, { opacity: 0, duration: 0.3 }, t0 + 1.6);
    K.sfx("lux_traco", t0 + 0.6, 0.5);
    const legs = ["frente", "costas"].map((v) => {
      const e = K.el(v === "frente" ? "FRENTE" : "COSTAS", `left:${fxs[v]}px;width:${FW}px;top:${fy + FH + 22}px;text-align:center;font-size:22px;opacity:0`);
      e.classList.add("lx-rot"); e.style.color = "rgba(255,255,255,.55)"; return e;
    });
    legs.forEach((e, i) => rotulo(K, e, t0 + 1.25 + i * 0.1, 0.9));
    // leitura da região (embaixo): número, nome em dois pesos e o detalhe
    const lh2 = K.el("", `left:${IX}px;top:${Y + 904}px;width:${IW}px;transform:scaleX(0)`); lh2.classList.add("lx-linha"); lh2.style.background = "rgba(255,255,255,.22)";
    linha(K, lh2, t0 + 0.9, 1.0);
    // cada região: polígonos em vermelho, ponto que respira, número ao lado e o nome embaixo
    const marcados = [];
    regs.forEach(([tr, chave, nome, det, lado], i) => {
      const ta = K.t(tr), tb = i + 1 < N ? K.t(regs[i + 1][0]) : ts, ult = i === N - 1;
      const polys = [], pontos = [];
      REG[chave].forEach(([v, grupos]) => {
        const lados = { e: [], d: [] };
        grupos.forEach((g) => figs[v].querySelectorAll(`polygon[data-g="${g}"]`).forEach((pl) => {
          const c = centro(pontosDe(pl.getAttribute("points")));
          // lado do paciente: de frente, o lado direito dele fica à esquerda da tela; de costas, à direita
          const dir = v === "frente" ? c[0] < 50 : c[0] > 50;
          if (lado === "direito" && !dir) return;
          if (lado === "esquerdo" && dir) return;
          polys.push(pl); lados[c[0] < 50 ? "e" : "d"].push(c);
        }));
        const ce = lados.e.length ? centro(lados.e) : null, cd = lados.d.length ? centro(lados.d) : null;
        const tela = (c) => [fxs[v] + c[0] * s, fy + c[1] * s];
        if (ce && cd && Math.abs(ce[0] - cd[0]) < 24) pontos.push(tela(centro([ce, cd])));
        else [ce, cd].forEach((c) => c && pontos.push(tela(c)));
      });
      if (!polys.length) return;
      // polígonos: acendem, e quando a próxima região entra ficam marcados mais fracos
      K.ft(polys, { fill: F_BASE, stroke: S_BASE }, { fill: "rgba(255,91,91,0.5)", stroke: ERRO2, duration: 0.6, ease: "power2.out" }, ta);
      if (!ult) K.ft(polys, { fill: "rgba(255,91,91,0.5)", stroke: ERRO2 }, { fill: "rgba(255,91,91,0.2)", stroke: "rgba(255,138,138,0.55)", duration: 0.5, ease: "power2.inOut" }, tb);
      // pontos: miolo branco, anel vermelho e um anel que respira enquanto a região está ativa
      pontos.forEach(([x, y], j) => {
        const nucleo = K.el("", `left:${x - 7}px;top:${y - 7}px;width:14px;height:14px;border-radius:50%;background:#fff;opacity:0`);
        const anel = K.el("", `left:${x - 19}px;top:${y - 19}px;width:38px;height:38px;border-radius:50%;border:2px solid ${ERRO};opacity:0`);
        K.ft([nucleo, anel], { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.7, ease: "expo.out" }, ta + 0.1 + j * 0.08);
        for (let k = ta + 0.35 + j * 0.08; k < tb - 0.3; k += 1.4) {
          const r = K.el("", `left:${x - 19}px;top:${y - 19}px;width:38px;height:38px;border-radius:50%;border:1.5px solid ${ERRO};opacity:0`);
          K.ft(r, { opacity: 0.7, scale: 1 }, { opacity: 0, scale: 2.3, duration: 1.4, ease: "sine.out" }, k);
        }
        if (!ult) K.ft([nucleo, anel], { scale: 1, opacity: 1 }, { scale: 0.6, opacity: 0.75, duration: 0.5, ease: "power2.inOut" }, tb);
        marcados.push(nucleo, anel);
        if (j === 0) {
          const tag = K.el(dd(i + 1), `left:${x + 22}px;top:${y - 40}px;font-size:20px;opacity:0`); tag.classList.add("lx-rot"); tag.style.color = CL;
          rotulo(K, tag, ta + 0.2, 0.8, 0.12); marcados.push(tag);
        }
      });
      K.sfx("lux_clique", ta + 0.1, 0.5);
      // nome e detalhe da região
      const fzN = Math.min(64, Math.floor(IW / (0.72 * limpo(nome).length)));
      const [, rr] = monoFenda(K, `REGIÃO ${dd(i + 1)}`, `left:${IX}px;top:${Y + 930}px;font-size:22px`, CL);
      const [nm, ns] = fenda(K, rico(nome), `left:${IX - 3}px;top:${Y + 968}px;font-size:${fzN}px`); nm.classList.add("lx-tit", "lx-fino");
      const [, ds] = fenda(K, ESC(det || ""), `left:${IX}px;top:${Y + 1046}px;font-size:28px;font-weight:300;letter-spacing:.08em;color:rgba(255,255,255,.78)`);
      ds.parentNode.classList.add("lx");
      // a leitura troca limpa: a anterior sai inteira antes da próxima entrar
      sobe(K, rr, ta + 0.06, 0.9); sobe(K, ns, ta + 0.1, 1.0); pesa(K, nm, ta + 0.3); sobe(K, ds, ta + 0.2, 1.0);
      sobe(K, pags[i][1], ta + 0.04, 0.8);
      const tf = ult ? ts - 0.1 : tb - 0.4;
      fecha(K, rr, tf, 0.35); fecha(K, ns, tf, 0.4); fecha(K, ds, tf + 0.03, 0.35); fecha(K, pags[i][1], tf, 0.35);
    });
    // saída: tudo apaga e o cartão fecha
    apaga(K, [...marcados, ...legs, rot], ts - 0.1, 0.4);
    apaga(K, [area], ts - 0.05, 0.45);
    fecha(K, tsp, ts - 0.1, 0.45);
    recolhe(K, lh1, ts - 0.1, 0.4); recolhe(K, lh2, ts - 0.1, 0.4);
  });

  // ======================================================================================================
  // ---------- 63 Raio-X (premium) ----------
  // A tela vira um visor de imagem (marinho fosco, grade fina, cantos de visor). A linha de leitura desce e
  // revela a coluna em vista lateral, em traço fino; o disco em destaque fica vermelho, com a hérnia saindo
  // para trás, e a etiqueta do achado entra do lado. Sempre com "ESQUEMA ILUSTRATIVO" (não é exame de verdade).
  // vertebras: nomes de cima para baixo; o último é o sacro. destaque: "L4-L5" (disco) ou "L4" (vértebra).
  MB.def("63", {
    em: 0, dur: 5.8, rotulo: "IMAGEM · VISTA LATERAL", indice: "RX / 01", titulo: "COLUNA *LOMBAR*",
    vertebras: ["T12", "L1", "L2", "L3", "L4", "L5", "S1"], destaque: "L4-L5", achado: "ACHADO 01", nome: "DISCO *L4–L5*",
    nota: "PONTO DE|ATENÇÃO", rodape: "ESQUEMA ILUSTRATIVO", hernia: true
  }, function (P, K) {
    const { ESC, rico, limpo, fenda, sobe, fecha, pesa, rotulo, linha, recolhe, apaga } = MB.lux;
    const t0 = K.t(), t1 = t0 + P.dur, ts = t1 - 0.6;
    // fundo do visor: marinho fosco por cima do vídeo (no fundo verde vira marinho sólido: é uma tela cheia)
    const tela = K.el("", `left:0;top:0;width:1080px;height:1920px;background:rgba(5,12,30,.92);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);clip-path:inset(50% 0% 50% 0%)`);
    const grade = K.el("", `left:96px;top:440px;width:888px;height:1140px;opacity:0`); grade.classList.add("grade");
    K.ft(tela, { clipPath: "inset(50% 0% 50% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "expo.inOut" }, t0);
    K.ft(tela, { clipPath: "inset(0% 0% 0% 0%)" }, { clipPath: "inset(50% 0% 50% 0%)", duration: 0.6, ease: "expo.inOut" }, ts);
    K.ft(grade, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.out" }, t0 + 0.4);
    K.sfx("lux_ar", t0, 0.6);
    const cantos = marcasCanto(K, 96, 440, 888, 1140, 0, 44, "rgba(255,255,255,.6)");
    K.ft(cantos, { opacity: 0, scale: 1.25 }, { opacity: 1, scale: 1, duration: 0.9, ease: "expo.out", stagger: 0.05 }, t0 + 0.35);
    // cabeçalho e título
    const rot = K.el(ESC(P.rotulo), `left:72px;top:236px;opacity:0`); rot.classList.add("lx-rot", "az");
    const idx = K.el(ESC(P.indice), `right:72px;top:236px;opacity:0`); idx.classList.add("lx-rot"); idx.style.color = "rgba(255,255,255,.5)";
    rotulo(K, rot, t0 + 0.3, 1.0); rotulo(K, idx, t0 + 0.4, 1.0);
    const fzT = Math.min(84, Math.floor(936 / (0.72 * limpo(P.titulo).length)));
    const [tm, tsp] = fenda(K, rico(P.titulo), `left:68px;top:290px;font-size:${fzT}px`); tm.classList.add("lx-tit", "lx-fino");
    sobe(K, tsp, t0 + 0.45, 1.1); pesa(K, tm, t0 + 0.7); K.sfx("lux_grave", t0 + 0.48, 0.5);
    const orient = [["ANT", "left:124px"], ["POST", "right:124px"]].map(([t, c]) => {
      const e = K.el(t, `${c};top:470px;font-size:18px;opacity:0`); e.classList.add("lx-rot"); e.style.color = "rgba(255,255,255,.42)"; return e;
    });
    orient.forEach((e) => rotulo(K, e, t0 + 0.6, 0.9, 0.2));
    // ---- coluna em vista lateral (frente à esquerda) ----
    const nomes = P.vertebras.slice(), nb = nomes.length - 1;          // o último é o sacro
    const BW = 188, BH = 90, PASSO = 120;
    const ANG = [10, 6, 1, -5, -12, -20, -20, -20];                      // inclinação de cada corpo (graus), dá a lordose
    const rad = (g) => g * Math.PI / 180;
    const rot2 = (x, y, g) => [x * Math.cos(rad(g)) - y * Math.sin(rad(g)), x * Math.sin(rad(g)) + y * Math.cos(rad(g))];
    const corpos = []; let c = [575, 600];
    for (let i = 0; i < nb; i++) {
      const g = ANG[Math.min(i, ANG.length - 1)];
      if (i > 0) { const m = (ANG[Math.min(i - 1, ANG.length - 1)] + g) / 2, d = rot2(0, PASSO, m); c = [c[0] + d[0], c[1] + d[1]]; }
      corpos.push({ c: c.slice(), g });
    }
    const pt = (b, x, y) => { const r = rot2(x, y, b.g); return [b.c[0] + r[0], b.c[1] + r[1]]; };
    const P2 = (p) => `${fx(p[0])} ${fx(p[1])}`;
    const w2 = BW / 2, h2 = BH / 2, rr = 16, kk = 7;
    const corpoD = `M${-w2 + rr} ${-h2} H${w2 - rr} Q${w2} ${-h2} ${w2} ${-h2 + rr} Q${w2 - kk} 0 ${w2} ${h2 - rr} Q${w2} ${h2} ${w2 - rr} ${h2} H${-w2 + rr} Q${-w2} ${h2} ${-w2} ${h2 - rr} Q${-w2 + kk} 0 ${-w2} ${-h2 + rr} Q${-w2} ${-h2} ${-w2 + rr} ${-h2} Z`;
    // arco posterior: pedículo + lâmina + processo espinhoso (aponta para trás e um pouco para baixo)
    const arcoD = `M${w2 - 2} ${-h2 + 14} H${w2 + 30} C${w2 + 64} ${-h2 + 2} ${w2 + 104} ${-h2 + 16} ${w2 + 138} ${-h2 + 44} Q${w2 + 150} ${-h2 + 56} ${w2 + 136} ${-h2 + 66} C${w2 + 100} ${-h2 + 74} ${w2 + 66} ${h2 - 6} ${w2 + 30} ${h2 - 14} H${w2 - 2} Z`;
    const LINHA = "rgba(255,255,255,0.62)", OSSO = "rgba(159,188,255,0.1)", DISCO = "rgba(159,188,255,0.2)", DISCO_S = "rgba(159,188,255,0.55)";
    let sv = "";
    corpos.forEach((b) => {
      const tr = `translate(${fx(b.c[0])} ${fx(b.c[1])}) rotate(${b.g})`;
      sv += `<path d="${arcoD}" transform="${tr}" fill="${OSSO}" stroke="${LINHA}" stroke-width="1.6" stroke-linejoin="round" opacity=".8"/>`;
      sv += `<path d="${corpoD}" transform="${tr}" fill="${OSSO}" stroke="${LINHA}" stroke-width="1.8"/>`;
    });
    // sacro: placa de S1 inclinada (frente mais baixa) e o osso descendo para trás
    const L5 = corpos[nb - 1], baseL5 = pt(L5, 0, h2), gS = L5.g - 12;
    const nS = rot2(0, 32, (L5.g + gS) / 2), cS = [baseL5[0] + nS[0], baseL5[1] + nS[1]];
    const sp = (x, y) => { const r = rot2(x, y, gS); return [cS[0] + r[0], cS[1] + r[1]]; };
    const sacroD = `M${P2(sp(-88, 0))} L${P2(sp(88, 0))} C${P2(sp(104, 50))} ${P2(sp(100, 140))} ${P2(sp(58, 214))} Q${P2(sp(42, 240))} ${P2(sp(22, 228))} C${P2(sp(10, 170))} ${P2(sp(-28, 96))} ${P2(sp(-88, 0))} Z`;
    sv += `<path d="${sacroD}" fill="${OSSO}" stroke="${LINHA}" stroke-width="1.8" stroke-linejoin="round"/>`;
    // discos: entre a base de um corpo e o topo do seguinte (o último fica entre L5 e o sacro)
    const discos = [];
    for (let i = 0; i < nb; i++) {
      const a = corpos[i], ult = i === nb - 1;
      const q1 = pt(a, -w2 + 8, h2 + 3), q2 = pt(a, w2 - 8, h2 + 3);
      const q3 = ult ? sp(80, -3) : pt(corpos[i + 1], w2 - 8, -h2 - 3), q4 = ult ? sp(-80, -3) : pt(corpos[i + 1], -w2 + 8, -h2 - 3);
      const m1 = [(q1[0] + q4[0]) / 2 - 7, (q1[1] + q4[1]) / 2], m2 = [(q2[0] + q3[0]) / 2 + 5, (q2[1] + q3[1]) / 2];
      const d = `M${P2(q1)} L${P2(q2)} Q${P2(m2)} ${P2(q3)} L${P2(q4)} Q${P2(m1)} ${P2(q1)} Z`;
      const nome = nomes[i] + "-" + nomes[i + 1];
      discos.push({ nome, d, tras: m2, frente: m1, ang: (a.g + (ult ? gS : corpos[i + 1].g)) / 2 });
      sv += `<path class="dsc" data-n="${nome}" d="${d}" style="fill:${DISCO};stroke:${DISCO_S}" stroke-width="1.6"/>`;
    }
    // canal: linha tracejada atrás dos corpos
    const canal = corpos.map((b) => pt(b, w2 + 15, 0)).concat([sp(96, 70)]);
    let cd = `M${P2(canal[0])}`; for (let i = 1; i < canal.length; i++) { const a = canal[i - 1], b = canal[i]; cd += ` Q${P2([a[0] + (b[0] - a[0]) * 0.5 + 3, a[1] + (b[1] - a[1]) * 0.5])} ${P2(b)}`; }
    sv += `<path d="${cd}" fill="none" stroke="rgba(159,188,255,.45)" stroke-width="1.6" stroke-dasharray="3 9" stroke-linecap="round"/>`;
    const esp = K.svg(sv, 1080, 1920, "left:0;top:0;line-height:0;clip-path:inset(0% 0% 100% 0%)");
    const svgEl = esp.firstChild;
    // nomes das vértebras (letra de máquina, atrás da coluna)
    const xNome = Math.max(...corpos.map((b) => pt(b, w2 + 150, -h2 + 60)[0])) + 40;
    const nomesEl = nomes.map((nm, i) => {
      const p = i < nb ? [xNome, corpos[i].c[1]] : [xNome, sp(30, 70)[1]];
      const e = K.el(ESC(nm), `left:${fx(p[0])}px;top:${fx(p[1] - 14)}px;font-size:22px;opacity:0`); e.classList.add("lx-rot");
      e.style.color = "rgba(255,255,255,.5)"; e.style.letterSpacing = ".14em"; return [e, p[1]];
    });
    // leitura: a linha desce e revela a coluna; cada nome acende quando a linha passa
    const Y0 = 480, Y1 = 1560, tl0 = t0 + 0.7, dl = 1.5;
    const scan = K.el("", `left:96px;top:${Y0}px;width:888px;height:2px;background:rgba(159,188,255,.85);opacity:0`);
    const rastro = K.el("", `left:96px;top:${Y0 - 120}px;width:888px;height:120px;background:linear-gradient(180deg, rgba(159,188,255,0), rgba(159,188,255,.07));opacity:0`);
    K.ft([scan, rastro], { opacity: 0 }, { opacity: 1, duration: 0.25 }, tl0);
    K.ft([scan, rastro], { y: 0 }, { y: Y1 - Y0, duration: dl, ease: "power1.inOut" }, tl0);
    K.ft([scan, rastro], { opacity: 1 }, { opacity: 0, duration: 0.3 }, tl0 + dl - 0.15);
    K.ft(esp, { clipPath: `inset(0px 0px ${1920 - Y0}px 0px)` }, { clipPath: `inset(0px 0px ${1920 - Y1}px 0px)`, duration: dl, ease: "power1.inOut" }, tl0);
    K.set(esp, { clipPath: "none" }, tl0 + dl + 0.01);
    K.sfx("lux_traco", tl0, 0.5); K.sfx("lux_traco", tl0 + 0.7, 0.35);
    // (a linha anda em power1.inOut: acha o instante em que ela passa por y)
    const quando = (y) => { const k = Math.max(0, Math.min(1, (y - Y0) / (Y1 - Y0))); let lo = 0, hi = 1; for (let n = 0; n < 30; n++) { const m = (lo + hi) / 2; (gsap.parseEase("power1.inOut")(m) < k ? (lo = m) : (hi = m)); } return tl0 + dl * lo; };
    nomesEl.forEach(([e, y]) => rotulo(K, e, quando(y), 0.7, 0.14));
    // destaque: disco (ex.: L4-L5) ou vértebra (ex.: L4)
    const td = tl0 + dl + 0.15, alvo = discos.find((d) => d.nome === P.destaque);
    const etqEls = [];
    let ancora = null;
    if (alvo) {
      const el = svgEl.querySelector(`.dsc[data-n="${P.destaque}"]`);
      K.ft(el, { fill: DISCO, stroke: DISCO_S }, { fill: "rgba(255,91,91,0.5)", stroke: ERRO2, duration: 0.5, ease: "power2.out" }, td);
      // hérnia: o disco escapa para trás, na direção do canal
      if (P.hernia) {
        const [hx, hy] = alvo.tras, g = alvo.ang;
        svgEl.insertAdjacentHTML("beforeend", `<g transform="translate(${fx(hx)} ${fx(hy)}) rotate(${fx(g)})"><path class="hrn" d="M-4 -13 C14 -13 26 -6 26 0 C26 6 14 13 -4 13 Z" fill="rgba(255,91,91,0.75)" stroke="${ERRO2}" stroke-width="1.6"/></g>`);
        const hr = svgEl.querySelector(".hrn");
        K.ft(hr, { scale: 0, transformOrigin: "0% 50%" }, { scale: 1, duration: 0.9, ease: "expo.out" }, td + 0.25);
      }
      ancora = alvo.frente;
      nomesEl.forEach(([e], i) => { if (P.destaque.split("-").includes(nomes[i])) K.to(e, { color: "#ffffff", duration: 0.4 }, td); });
    } else {
      const i = nomes.indexOf(P.destaque);
      if (i >= 0 && i < nb) {
        const el = svgEl.querySelectorAll("path[transform]")[i * 2 + 1];
        K.ft(el, { fill: OSSO }, { fill: "rgba(255,91,91,0.4)", duration: 0.5, ease: "power2.out" }, td);
        ancora = pt(corpos[i], -w2 - 4, 0);
        K.to(nomesEl[i][0], { color: "#ffffff", duration: 0.4 }, td);
      }
    }
    K.sfx("lux_clique", td, 0.55);
    if (ancora) {
      // anel que respira no ponto + fio até a etiqueta do achado (do lado da frente, à esquerda)
      const [ax, ay] = ancora;
      const anel = K.el("", `left:${fx(ax - 16)}px;top:${fx(ay - 16)}px;width:32px;height:32px;border-radius:50%;border:2px solid ${ERRO};opacity:0`);
      const nuc = K.el("", `left:${fx(ax - 6)}px;top:${fx(ay - 6)}px;width:12px;height:12px;border-radius:50%;background:#fff;opacity:0`);
      K.ft([nuc, anel], { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.7, ease: "expo.out" }, td + 0.15);
      for (let k = td + 0.5; k < ts - 0.4; k += 1.4) {
        const r = K.el("", `left:${fx(ax - 16)}px;top:${fx(ay - 16)}px;width:32px;height:32px;border-radius:50%;border:1.5px solid ${ERRO};opacity:0`);
        K.ft(r, { opacity: 0.7, scale: 1 }, { opacity: 0, scale: 2.4, duration: 1.4, ease: "sine.out" }, k);
      }
      const LX = 72, ex = Math.min(ax - 40, 420), ly = ay - 128;
      const fio = K.svg(`<path d="M${fx(ax - 18)} ${fx(ay)} H${fx(ex)} L${fx(ex - 22)} ${fx(ly + 104)} H${LX}" fill="none" stroke="rgba(255,255,255,.7)" stroke-width="2"/>`, 1080, 1920, "left:0;top:0;line-height:0");
      K.desenha(fio.querySelector("path"), td + 0.35, 0.6, "power2.inOut"); K.sfx("lux_traco", td + 0.35, 0.4);
      const [, a1] = monoFenda(K, ESC(P.achado), `left:${LX}px;top:${fx(ly)}px;font-size:22px`, ERRO2);
      const fzN = Math.min(52, Math.floor((ex - 30 - LX) / (0.7 * limpo(P.nome).length)));
      const [nm, a2] = fenda(K, rico(P.nome), `left:${LX - 3}px;top:${fx(ly + 34)}px;font-size:${fzN}px`); nm.classList.add("lx-tit", "lx-fino");
      const notas = String(P.nota || "").split("|").filter(Boolean).map((t, i) => monoFenda(K, ESC(t), `left:${LX}px;top:${fx(ly + 120 + i * 32)}px;font-size:20px`, "rgba(255,255,255,.62)"));
      sobe(K, a1, td + 0.55, 0.9); sobe(K, a2, td + 0.62, 1.0); pesa(K, nm, td + 0.8);
      notas.forEach(([, s], i) => sobe(K, s, td + 0.75 + i * 0.08, 0.9));
      K.sfx("lux_grave", td + 0.6, 0.4);
      fecha(K, a1, ts - 0.1, 0.35); fecha(K, a2, ts - 0.1, 0.4); notas.forEach(([, s]) => fecha(K, s, ts - 0.1, 0.35));
      etqEls.push(anel, nuc, fio);
    }
    // aproximação lenta (nada fica parado) e rodapé
    K.ft(esp, { scale: 1, transformOrigin: "50% 55%" }, { scale: 1.035, duration: ts - td, ease: "sine.inOut" }, td);
    const rod = K.el(ESC(P.rodape), `left:124px;top:1530px;font-size:18px;opacity:0`); rod.classList.add("lx-rot"); rod.style.color = "rgba(255,255,255,.5)";
    rotulo(K, rod, t0 + 1.2, 0.9, 0.2);
    // saída
    apaga(K, [rot, idx, rod, ...orient, ...cantos, ...etqEls, ...nomesEl.map((n) => n[0]), grade], ts - 0.1, 0.4);
    apaga(K, [esp], ts - 0.05, 0.4);
    fecha(K, tsp, ts - 0.1, 0.45);
  });

  // ======================================================================================================
  // ---------- 64 React do Ullisses (premium) ----------
  // O rosto dele entra num círculo no canto (sempre centralizado: o montar.py recorta o rosto no meio),
  // com aro fino, um arco azul-claro que gira devagar e o crachá com o nome; as barrinhas mexem enquanto
  // ele fala. Em "olha_em" o vídeo congela e a caneta (motion 51) desenha as marcas. O spec precisa do extra
  // "rosto" (com som) e do fundo congelado ({"tipo": "congela"}) a partir de olha_em.
  // Deixe as marcas fora do canto do rosto (x de 640 a 1040, y de 200 a 700).
  MB.def("64", {
    em: 0, dur: null, extra: "rosto", nome: "ULLISSES", cargo: "REACT · PERSONAL", x: 678, y: 236, tam: 330, fala: true,
    olha_em: 1.6, selo: "PAUSA · ANÁLISE", veu: 0.18, zoom: 1.03, cinza: 0.72,
    marcas: [
      { tipo: "circulo", x: 720, y: 845, r: 140, cor: "erro", rotulo: "COSTAS ARREDONDADAS", rot: [72, 600] },
      { tipo: "x", x: 735, y: 1190, tam: 40, cor: "erro", rotulo: "PERNAS TRAVADAS", rot: [72, 1300] }
    ]
  }, function (P, K) {
    const { ESC, rico, fenda, sobe, fecha, rotulo, apaga, linha, recolhe } = MB.lux;
    const t0 = K.t(), t1 = P.dur != null ? t0 + P.dur : K.D, ts = t1 - 0.55, S = P.tam, R = S / 2, X0 = P.x, Y0 = P.y, cx = X0 + R, cy = Y0 + R;
    const root = document.getElementById("root");
    const noTopo = (el, z) => { el.parentNode.removeChild(el); root.appendChild(el); el.style.zIndex = z; return el; };
    // o rosto: abre como uma íris e a imagem assenta (sem giro, sem quique)
    const X = K.extra(P.extra);
    if (X) {
      Object.assign(X.style, { left: X0 + "px", top: Y0 + "px", width: S + "px", height: S + "px", borderRadius: "50%", zIndex: 50, clipPath: "circle(0% at 50% 50%)" });
      K.set(X, { opacity: 1 }, t0);
      K.ft(X, { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(50% at 50% 50%)", duration: 1.0, ease: "expo.out" }, t0);
      const v = X.querySelector("video");
      if (v) K.ft(v, { scale: 1.16 }, { scale: 1, duration: 1.6, ease: "expo.out" }, t0);
      K.ft(X, { clipPath: "circle(50% at 50% 50%)" }, { clipPath: "circle(0% at 50% 50%)", duration: 0.5, ease: "power3.in" }, ts);
      K.set(X, { opacity: 0 }, ts + 0.52);
    }
    K.sfx("lux_ar", t0, 0.6);
    // aro fino branco e arco azul-claro que gira devagar (por cima do rosto)
    const M = 26, D = S + 2 * M, c0 = D / 2, ra = R + 14;
    const a0 = -100 * Math.PI / 180, a1 = a0 + 300 * Math.PI / 180;
    const arco = `M${fx(c0 + ra * Math.cos(a0))} ${fx(c0 + ra * Math.sin(a0))} A${ra} ${ra} 0 1 1 ${fx(c0 + ra * Math.cos(a1))} ${fx(c0 + ra * Math.sin(a1))}`;
    const aro = noTopo(K.svg(`<circle class="aro" cx="${c0}" cy="${c0}" r="${R - 1}" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="2" transform="rotate(-90 ${c0} ${c0})"/>`, D, D, `left:${X0 - M}px;top:${Y0 - M}px;width:${D}px;height:${D}px;line-height:0`), 51);
    const orb = noTopo(K.svg(`<path class="arc" d="${arco}" fill="none" stroke="${CL}" stroke-width="2" stroke-linecap="round"/><circle cx="${fx(c0 + ra * Math.cos(a1))}" cy="${fx(c0 + ra * Math.sin(a1))}" r="4" fill="${CL}" class="pta" opacity="0"/>`, D, D, `left:${X0 - M}px;top:${Y0 - M}px;width:${D}px;height:${D}px;line-height:0`), 51);
    K.desenha(aro.querySelector(".aro"), t0 + 0.15, 1.0, "power2.inOut");
    K.desenha(orb.querySelector(".arc"), t0 + 0.3, 1.2, "power2.inOut");
    K.ft(orb.querySelector(".pta"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, t0 + 1.3);
    K.ft(orb, { rotation: 0, transformOrigin: "50% 50%" }, { rotation: 0.5 * 360 * (t1 - t0) / 12, duration: t1 - t0, ease: "none" }, t0);
    K.sfx("lux_traco", t0 + 0.3, 0.4);
    // crachá embaixo do rosto: cargo em letra de máquina, nome forte e barrinhas da fala
    const CW = 300, CH = 92, chx = Math.round(cx - CW / 2), chy = Y0 + S + 30;
    const cr = noTopo(K.el("", `left:${chx}px;top:${chy}px;width:${CW}px;height:${CH}px;clip-path:inset(0% 50% 0% 50%);background:rgba(6,15,38,.84)`), 51);
    cr.classList.add("lx-vidro");
    const cg = noTopo(K.el(ESC(P.cargo), `left:${chx + 24}px;top:${chy + 18}px;font-size:16px;opacity:0`), 52); cg.classList.add("lx-rot", "az");
    const [nm, ns] = fenda(K, rico(P.nome), `left:${chx + 21}px;top:${chy + 40}px;font-size:36px`); noTopo(nm, 52); nm.classList.add("lx-tit"); ns.style.fontWeight = 800;
    const NB = 4, barras = Array.from({ length: NB }, (_, i) => noTopo(K.el("", `left:${chx + CW - 24 - (NB - i) * 9}px;top:${chy + 44}px;width:5px;height:30px;background:${CL};transform-origin:50% 100%;transform:scaleY(.15);opacity:0`), 52));
    K.ft(cr, { clipPath: "inset(0% 50% 0% 50%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "expo.inOut" }, t0 + 0.35);
    rotulo(K, cg, t0 + 0.55, 0.9, 0.3); sobe(K, ns, t0 + 0.6, 1.0);
    K.ft(barras, { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.05 }, t0 + 0.8);
    if (P.fala) K.ticker((t) => barras.forEach((b, i) => {
      const h = 0.18 + 0.82 * Math.abs(Math.sin(t * (6.3 + i * 1.9) + i * 1.7)) * (0.55 + 0.45 * Math.sin(t * 2.1 + i * 2.4));
      b.style.transform = `scaleY(${Math.max(0.15, h).toFixed(3)})`;
    }), t0 + 0.8, ts);
    // saída do crachá
    apaga(K, [cg, ...barras], ts - 0.1, 0.35); fecha(K, ns, ts - 0.1, 0.4);
    K.ft(cr, { clipPath: "inset(0% 0% 0% 0%)" }, { clipPath: "inset(0% 50% 0% 50%)", duration: 0.5, ease: "expo.inOut" }, ts + 0.05);
    apaga(K, [aro, orb], ts, 0.45);
    // análise: o vídeo congela e a caneta desenha (motion 51)
    const ta = K.t(P.olha_em);
    if (P.marcas && P.marcas.length && ta < ts - 1.2) {
      K.usar("51", { em: ta, dur: Math.max(1.5, ts - ta + 0.1), marcas: P.marcas, selo: P.selo, veu: P.veu, zoom: P.zoom, cinza: P.cinza });
      K.sfx("lux_passagem", ta - 0.1, 0.5);
    }
  });
})();
