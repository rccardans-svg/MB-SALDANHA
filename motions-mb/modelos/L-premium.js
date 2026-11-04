/* Linha premium (assinatura MB). Amostra de estilo pedida pelo Paulo em 2026-11-04 ("algo luxury, que remeta a profissional").
   Regras da linha:
   - um foco por vez, poucos elementos, muito respiro;
   - Montserrat com contraste de peso (200 fino x 800 forte); rótulos em letra de máquina com espaçamento largo;
   - linhas finas, vidro marinho fosco, sem brilho;
   - texto entra subindo de dentro de uma fenda (máscara) com easing expo; nada de quique, partícula, tremida ou "pop";
   - a coluna de pontos do logo (as vértebras) é a assinatura que aparece no crachá, na frase e no salvar;
   - sons discretos (lux_*): ar, grave, clique, traço, sino. */
(function () {
  const AZ = "#1f66e5", CL = "#9fbcff";
  const ESC = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  // *palavra* = peso 800 | _palavra_ = azul claro
  const rico = (s) => ESC(s).replace(/\*([^*]+)\*/g, '<b class="lx-b">$1</b>').replace(/_([^_]+)_/g, `<span style="color:${CL}">$1</span>`);
  const limpo = (s) => String(s).replace(/[*_]/g, "");

  // texto dentro de uma fenda: devolve [caixa, texto]. O texto começa escondido embaixo.
  function fenda(K, html, css, parent) {
    const m = K.el(`<span>${html}</span>`, css, parent); m.classList.add("lx-mask");
    const s = m.firstChild; gsap.set(s, { yPercent: 125 });
    return [m, s];
  }
  const sobe = (K, s, at, d) => K.ft(s, { yPercent: 125 }, { yPercent: 0, duration: d || 1.0, ease: "expo.out" }, at);
  const fecha = (K, s, at, d) => K.ft(s, { yPercent: 0 }, { yPercent: -125, duration: d || 0.5, ease: "power3.in" }, at);
  // rótulo: entra apertando o espaçamento e tirando o desfoque
  const rotulo = (K, el, at, d, ls) => K.ft(el, { opacity: 0, letterSpacing: ((ls || 0.3) + 0.32).toFixed(2) + "em", filter: "blur(8px)" },
    { opacity: 1, letterSpacing: (ls || 0.3) + "em", filter: "blur(0px)", duration: d || 1.1, ease: "power3.out" }, at);
  const linha = (K, el, at, d) => K.ft(el, { scaleX: 0 }, { scaleX: 1, duration: d || 1.1, ease: "expo.inOut" }, at);
  const recolhe = (K, el, at, d) => K.ft(el, { scaleX: 1, transformOrigin: "100% 50%" }, { scaleX: 0, duration: d || 0.45, ease: "power3.in" }, at);
  const apaga = (K, els, at, d) => K.to(els, { opacity: 0, y: -12, filter: "blur(6px)", duration: d || 0.45, ease: "power2.in" }, at);

  // coluna de pontos do logo (medida no logo: 7 vértebras numa curva suave). escala 1 = 72 x 200 px
  const VERT = [[8.5, 7.7, 7.6], [33, 28.8, 9.5], [50.2, 59.5, 11.8], [56.4, 97.4, 13.2], [54.5, 133.3, 11.9], [50.7, 164.5, 9.7], [53.5, 192, 7.4]];
  function coluna(K, css, esc, cor, parent) {
    const e = esc || 1;
    const c = K.svg(VERT.map(([x, y, r]) => `<circle cx="${(x * e).toFixed(1)}" cy="${(y * e).toFixed(1)}" r="${(r * e).toFixed(1)}" fill="${cor || "#fff"}"/>`).join(""), 72 * e, 200 * e, css, parent);
    const pts = Array.from(c.querySelectorAll("circle"));
    gsap.set(pts, { scale: 0, transformOrigin: "50% 50%" });
    return [c, pts];
  }
  const colunaEntra = (K, pts, at, gap) => K.ft(pts, { scale: 0 }, { scale: 1, duration: 0.8, ease: "expo.out", stagger: gap || 0.06 }, at);
  // palavra forte que "ganha peso" ao chegar (a Montserrat é variável: 300 vira 800). Chame logo depois de criar a fenda.
  function pesa(K, caixa, at, de, ate) {
    const bs = Array.from(caixa.querySelectorAll("b.lx-b")); if (!bs.length) return;
    gsap.set(bs, { fontWeight: de || 300 });
    K.ft(bs, { fontWeight: de || 300 }, { fontWeight: ate || 800, duration: 0.9, ease: "power2.out" }, at);
  }
  // respiro: o espaçamento do rótulo abre devagar enquanto ele está parado na tela (nada fica 100% estático)
  const respira = (K, el, a, b, de, ate) => { if (b - a > 0.3) K.ft(el, { letterSpacing: de || "0.3em" }, { letterSpacing: ate || "0.36em", duration: b - a, ease: "none" }, a); };
  // ferramentas da linha premium para os outros arquivos de modelos (G, H, I, J usam com "usa_arquivos": ["L-premium.js"])
  MB.lux = { AZ, CL, ESC, rico, limpo, fenda, sobe, fecha, rotulo, linha, recolhe, apaga, coluna, colunaEntra, pesa, respira };

  // ---------- lux-grade  acabamento de cinema: vinheta, contraste leve e aproximação lenta da câmera ----------
  MB.def("lux-grade", { em: 0, dur: 10, vinheta: 0.36, contraste: 1.04, saturacao: 0.96, empurra: [], zoom: 1.035 }, function (P, K) {
    const t0 = K.t(), t1 = t0 + P.dur;
    const v = K.el("", `inset:0;z-index:0;opacity:0;background:radial-gradient(ellipse 82% 64% at 50% 46%, rgba(4,10,26,0) 50%, rgba(4,10,26,${P.vinheta}) 100%)`);
    K.set(v, { opacity: 1 }, t0); K.set(v, { opacity: 0 }, t1);
    K.set(K.cam, { filter: `contrast(${P.contraste}) saturate(${P.saturacao})` }, t0);
    K.set(K.cam, { filter: "none" }, t1);
    (P.empurra || []).forEach(([a, b]) => {
      K.ft(K.cam, { scale: 1 }, { scale: P.zoom, duration: b - a, ease: "none" }, K.t(a));
      K.set(K.cam, { scale: 1 }, K.t(b));
    });
  });

  // ---------- lux-veu  escurecimento suave atrás do texto (topo, base, esquerda ou tela toda) ----------
  MB.def("lux-veu", { em: 0, dur: 4, lado: "topo", forca: 0.66, tamanho: 760 }, function (P, K) {
    const t0 = K.t(), t1 = t0 + P.dur, f = P.forca, c = (a) => `rgba(5,13,32,${(a * f).toFixed(3)})`;
    let css;
    if (P.lado === "tudo") css = `inset:0;background:${c(1)}`;
    else if (P.lado === "esquerda") css = `left:0;top:0;width:1080px;height:1920px;background:linear-gradient(90deg, ${c(1)} 0%, ${c(0.68)} 34%, ${c(0)} 58%)`;
    else if (P.lado === "base") css = `left:0;bottom:0;width:1080px;height:${P.tamanho}px;background:linear-gradient(0deg, ${c(1)} 0%, ${c(0.5)} 45%, ${c(0)} 100%)`;
    else css = `left:0;top:0;width:1080px;height:${P.tamanho}px;background:linear-gradient(180deg, ${c(1)} 0%, ${c(0.5)} 45%, ${c(0)} 100%)`;
    const v = K.el("", css + ";opacity:0;z-index:0");
    K.ft(v, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }, t0);
    K.to(v, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, t1 - 0.6);
  });

  // ---------- lux-titulo  abertura editorial: índice, linha fina e título em dois pesos ----------
  MB.def("lux-titulo", { em: 0, dur: 3, indice: "01", rotulo: "MB SALDANHA · PERFORMANCE", titulo: "LEVANTAMENTO|*TERRA*", sub: "", x: 72, y: 236, largura: 936, tam: 120 }, function (P, K) {
    const t0 = K.t(), t1 = t0 + P.dur, X = P.x, Y = P.y, L = P.largura;
    const rot = K.el(`<span style="color:${CL}">${ESC(P.indice)}</span>&nbsp;&nbsp;/&nbsp;&nbsp;${ESC(P.rotulo)}`, `left:${X}px;top:${Y}px;opacity:0`);
    rot.classList.add("lx-rot", "lx-sombra");
    const ln = K.el("", `left:${X}px;top:${Y + 54}px;width:${L}px;transform:scaleX(0)`); ln.classList.add("lx-linha");
    const ac = K.el("", `left:${X}px;top:${Y + 53}px;width:96px;height:4px;background:${AZ};transform:scaleX(0);transform-origin:left center`);
    const linhas = P.titulo.split("|");
    const nc = Math.max(...linhas.map((s) => limpo(s).length));
    const fz = Math.min(P.tam, Math.floor(L / (0.72 * nc)));
    const cx = linhas.map((s, i) => {
      const r = fenda(K, rico(s), `left:${X - 5}px;top:${Y + 92 + i * Math.round(fz * 1.02)}px;font-size:${fz}px`);
      r[0].classList.add("lx-tit", "lx-fino", "lx-sombra"); return r;
    });
    let sub = null;
    if (P.sub) {
      sub = K.el(ESC(P.sub), `left:${X}px;top:${Y + 92 + linhas.length * Math.round(fz * 1.02) + 34}px;opacity:0`); sub.classList.add("lx-rot", "lx-sombra");
    }
    rotulo(K, rot, t0, 1.0); K.sfx("lux_ar", t0, 0.7);
    linha(K, ln, t0 + 0.1, 1.2); linha(K, ac, t0 + 0.4, 0.9); K.sfx("lux_traco", t0 + 0.1, 0.6);
    cx.forEach(([m, s], i) => { sobe(K, s, t0 + 0.3 + i * 0.13, 1.15); pesa(K, m, t0 + 0.55 + i * 0.13); });
    K.sfx("lux_grave", t0 + 0.32, 0.55);
    if (sub) rotulo(K, sub, t0 + 0.8, 1.0);
    // saída: o título volta para dentro da fenda, as linhas recolhem
    const ts = Math.max(t1 - 0.55, t0 + 1.7);
    cx.forEach(([, s], i) => fecha(K, s, ts + i * 0.05, 0.5));
    apaga(K, sub ? [rot, sub] : [rot], ts, 0.4);
    recolhe(K, ln, ts, 0.5); recolhe(K, ac, ts, 0.4);
  });

  // ---------- lux-reps  contador de repetições em número fino (odômetro) + dica que troca a cada repetição ----------
  MB.def("lux-reps", { em: 0, dur: 10, entra: 0, reps: [1, 2, 3, 4], total: null, rotulo: "REPETIÇÕES",
    dicas: ["COLUNA NEUTRA", "BARRA COLADA NA PERNA", "EMPURRE O CHÃO", "CONTRAIA O GLÚTEO NO TOPO"], rotulo_dica: "DICA", x: 72, y: 236, largura: 470, tam: 200 }, function (P, K) {
    const t0 = K.t(P.entra), t1 = K.t(P.dur), X = P.x, Y = P.y, N = P.total || P.reps.length, LW = P.largura, FZ = P.tam;
    const dd = (n) => String(n).padStart(2, "0");
    const rot = K.el(ESC(P.rotulo), `left:${X}px;top:${Y}px;opacity:0`); rot.classList.add("lx-rot", "lx-sombra");
    // número: uma fita 00..N que corre dentro de uma janela do tamanho de um algarismo
    const fila = K.el("", `left:${X - 8}px;top:${Y + 40}px;display:flex;align-items:flex-end;gap:16px`);
    const jan = K.el(`<div class="fita">${Array.from({ length: N + 1 }, (_, i) => `<div style="height:${FZ}px;line-height:${FZ}px">${dd(i)}</div>`).join("")}</div>`,
      `position:relative;height:${FZ}px;overflow:hidden;font-size:${FZ}px`, fila);
    jan.classList.add("lx-num", "lx-sombra");
    const fita = jan.querySelector(".fita"); gsap.set(fita, { y: FZ });
    const fzT = Math.round(FZ * 0.24);
    const tot = K.el(`/${dd(N)}`, `position:relative;margin-bottom:${Math.round(FZ * 0.1415 - fzT * 0.251)}px;font-size:${fzT}px;font-weight:300;color:rgba(255,255,255,.55);opacity:0`, fila);
    tot.classList.add("lx", "lx-sombra");
    // linha de progresso
    const yb = Y + 40 + FZ + 22;
    const trilho = K.el("", `left:${X}px;top:${yb}px;width:${LW}px;transform:scaleX(0)`); trilho.classList.add("lx-linha"); trilho.style.background = "rgba(255,255,255,.24)";
    const barra = K.el("", `left:${X}px;top:${yb - 1}px;width:${LW}px;height:4px;background:#fff;transform:scaleX(0);transform-origin:left center`);
    // dicas (uma por repetição, cada uma com o seu número)
    const yd = yb + 50;
    const dicas = P.dicas.slice(0, N).map((d, i) => {
      const r = fenda(K, `<span class="lx-rot az">${ESC(P.rotulo_dica)} ${dd(i + 1)}</span><br><span style="display:inline-block;margin-top:14px">${rico(d)}</span>`,
        `left:${X}px;top:${yd}px;width:${LW}px;font-size:50px;font-weight:600;line-height:1.08;white-space:normal`);
      r[0].classList.add("lx", "lx-sombra"); return r;
    });
    // tempos: a saída começa em ts; nenhuma animação de entrada ou de repetição passa de ts (senão uma briga com a outra)
    const ts = t1 - 0.5, reps = P.reps.slice(0, N).map((r) => K.t(r));
    const r0 = reps.length ? reps[0] : ts;
    // entrada
    rotulo(K, rot, t0, 1.0); K.sfx("lux_ar", t0, 0.5);
    K.ft(fita, { y: FZ }, { y: 0, duration: Math.max(0.3, Math.min(1.0, r0 - t0 - 0.12)), ease: "expo.out" }, t0 + 0.1);
    K.ft(tot, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, t0 + 0.3);
    linha(K, trilho, t0 + 0.15, 1.0);
    // dicas em janelas iguais entre a entrada e a saída
    const a0 = t0 + 0.35, slot = (ts - a0) / Math.max(1, dicas.length);
    dicas.forEach(([, s], i) => {
      const a = a0 + i * slot;
      sobe(K, s, a, Math.min(0.9, slot - 0.45));
      fecha(K, s, i + 1 < dicas.length ? a + slot - 0.36 : ts, i + 1 < dicas.length ? 0.36 : 0.45);
    });
    // cada repetição: o número corre e a barra avança
    reps.forEach((tr, i) => {
      const d = Math.max(0.15, Math.min(0.85, ts - tr - 0.02));
      K.ft(fita, { y: -i * FZ }, { y: -(i + 1) * FZ, duration: d, ease: "expo.out" }, tr);
      K.ft(barra, { scaleX: i / N }, { scaleX: (i + 1) / N, duration: d, ease: "expo.out" }, tr);
      K.sfx("lux_rolo", tr, 0.7);
    });
    // saída
    K.ft(fita, { y: -reps.length * FZ }, { y: -(reps.length + 1) * FZ, duration: 0.5, ease: "power3.in" }, ts);
    apaga(K, [rot, tot], ts, 0.4);
    recolhe(K, trilho, ts, 0.45); recolhe(K, barra, ts, 0.45);
  });

  // ---------- lux-frase  frase de efeito com o vídeo congelado: véu marinho, coluna do logo e dois pesos ----------
  MB.def("lux-frase", { em: 0, dur: 3.4, rotulo: "PRINCÍPIO 01", texto: "A FORÇA|VEM DO|*QUADRIL.*", y: 760, tam: 140, veu: 0.52, zoom: 1.06 }, function (P, K) {
    const t0 = K.t(), t1 = t0 + P.dur;
    const veu = K.el("", `inset:0;z-index:0;background:rgba(5,13,32,${P.veu});opacity:0`);
    K.ft(veu, { opacity: 0 }, { opacity: 1, duration: 0.7, ease: "power2.out" }, t0);
    K.ft(veu, { opacity: 1 }, { opacity: 0, duration: 0.3, ease: "power2.in" }, t1 - 0.3);
    if (P.zoom) { K.ft(K.cam, { scale: 1 }, { scale: P.zoom, duration: P.dur, ease: "power1.inOut" }, t0); K.set(K.cam, { scale: 1 }, t1); }
    const [col, pts] = coluna(K, `left:${540 - 18}px;top:${P.y - 250}px`, 0.5, "#fff");
    const rot = K.el(ESC(P.rotulo), `left:0;width:1080px;top:${P.y - 104}px;text-align:center;opacity:0`); rot.classList.add("lx-rot", "az");
    const linhas = P.texto.split("|");
    const nc = Math.max(...linhas.map((s) => limpo(s).length));
    const fz = Math.min(P.tam, Math.floor(940 / (0.72 * nc))), lh = Math.round(fz * 1.04);
    const cx = linhas.map((s, i) => {
      const r = fenda(K, rico(s), `left:0;width:1080px;top:${P.y + i * lh}px;text-align:center;font-size:${fz}px`);
      r[0].classList.add("lx-tit", "lx-fino"); return r;
    });
    const ul = K.el("", `left:${540 - 110}px;top:${P.y + linhas.length * lh + 34}px;width:220px;height:4px;background:${AZ};transform:scaleX(0)`);
    K.sfx("lux_ar", t0, 0.6);
    colunaEntra(K, pts, t0 + 0.1, 0.05);
    rotulo(K, rot, t0 + 0.25, 1.0);
    cx.forEach(([m, s], i) => { sobe(K, s, t0 + 0.4 + i * 0.16, 1.15); pesa(K, m, t0 + 0.7 + i * 0.16); });
    K.sfx("lux_grave", t0 + 0.4 + (linhas.length - 1) * 0.16, 0.75);
    respira(K, rot, t0 + 1.3, t1 - 0.55);
    linha(K, ul, t0 + 1.0, 1.0);
    const ts = t1 - 0.55;
    apaga(K, [col, rot, ul, ...cx.map((c) => c[0])], ts, 0.42);
  });

  // ---------- lux-passagem  troca de cena com aproximação e desfoque rápidos (o corte fica no meio) ----------
  MB.def("lux-passagem", { em: 0, forca: 1.1, desfoque: 10 }, function (P, K) {
    const tc = K.t(), v = K.cam.querySelector("video"), b = `blur(${P.desfoque}px)`;
    K.ft(v, { scale: 1, filter: "blur(0px)" }, { scale: P.forca, filter: b, duration: 0.22, ease: "power2.in" }, tc - 0.22);
    K.ft(v, { scale: P.forca, filter: b }, { scale: 1, filter: "blur(0px)", duration: 0.5, ease: "expo.out" }, tc);
    K.sfx("lux_passagem", tc - 0.32, 0.8);
  });

  // ---------- lux-cracha  nome em placa de vidro marinho, com a coluna do logo como emblema ----------
  MB.def("lux-cracha", { em: 0, dur: 5, nome: "ULLISSES", cargo: "PERSONAL TRAINER", marca: "MB SALDANHA · PERFORMANCE", x: 56, y: 1250, w: 760 }, function (P, K) {
    const t0 = K.t(), t1 = t0 + P.dur, X = P.x, Y = P.y, Wd = P.w, Hd = 264;
    const placa = K.el("", `left:${X}px;top:${Y}px;width:${Wd}px;height:${Hd}px;clip-path:inset(0% 100% 0% 0%)`); placa.classList.add("lx-vidro");
    const [col, pts] = coluna(K, `left:${X + 40}px;top:${Y + 32}px`, 1, "#fff");
    const cx = X + 40 + 72 + 36, av = X + Wd - 44 - cx;
    const fzN = Math.min(96, Math.floor(av / (0.74 * limpo(P.nome).length)));
    const cg = K.el(ESC(P.cargo), `left:${cx}px;top:${Y + 40}px;opacity:0`); cg.classList.add("lx-rot", "az");
    const [, ns] = fenda(K, rico(P.nome), `left:${cx - 4}px;top:${Y + 80}px;font-size:${fzN}px`);
    ns.parentNode.classList.add("lx-tit");
    const ln = K.el("", `left:${cx}px;top:${Y + 80 + fzN + 22}px;width:${av}px;transform:scaleX(0)`); ln.classList.add("lx-linha");
    const mc = K.el(ESC(P.marca), `left:${cx}px;top:${Y + 80 + fzN + 44}px;font-size:21px;font-weight:500;letter-spacing:.34em;color:rgba(255,255,255,.74);white-space:nowrap;opacity:0`);
    mc.classList.add("lx");
    K.ft(placa, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.inOut" }, t0);
    K.sfx("lux_ar", t0, 0.6);
    colunaEntra(K, pts, t0 + 0.35, 0.055);
    rotulo(K, cg, t0 + 0.45, 1.0);
    sobe(K, ns, t0 + 0.55, 1.1); K.sfx("lux_toque", t0 + 0.6, 0.45);
    linha(K, ln, t0 + 0.75, 1.0); K.sfx("lux_traco", t0 + 0.75, 0.4);
    K.ft(mc, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, t0 + 0.95);
    // saída
    const ts = t1 - 0.75;
    apaga(K, [cg, mc, col], ts, 0.35); fecha(K, ns, ts, 0.4); recolhe(K, ln, ts, 0.4);
    K.ft(placa, { clipPath: "inset(0% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 100%)", duration: 0.65, ease: "expo.inOut" }, ts + 0.12);
  });

  // ---------- lux-salvar  chamada para salvar: marcador desenhado em traço fino que se preenche ----------
  MB.def("lux-salvar", { em: 0, dur: 4, rotulo: "GUARDE ESTE TREINO", feito: "SALVO", verbo: "SALVE", resto: "PARA O PRÓXIMO TREINO", y: 1230, w: 880, sai: false }, function (P, K) {
    const t0 = K.t(), t1 = t0 + P.dur, Wd = P.w, X = Math.round((1080 - Wd) / 2), Y = P.y, Hd = 300;
    const placa = K.el("", `left:${X}px;top:${Y}px;width:${Wd}px;height:${Hd}px;clip-path:inset(0% 50% 0% 50%)`); placa.classList.add("lx-vidro");
    const IW = 92, IH = 120, ix = X + 64, iy = Y + Math.round((Hd - IH) / 2);
    const forma = "M8 6 H84 V114 L46 87 L8 114 Z";
    const ic = K.svg(`<path class="ench" d="${forma}" fill="#fff" opacity="0"/><path class="cont" d="${forma}" fill="none" stroke="#fff" stroke-width="5" stroke-linejoin="round"/>`, IW, IH, `left:${ix}px;top:${iy}px`);
    const aro = K.el("", `left:${ix + IW / 2 - 90}px;top:${iy + IH / 2 - 90}px;width:180px;height:180px;border-radius:50%;border:2px solid rgba(255,255,255,.7);opacity:0`);
    const tx = ix + IW + 52, av = X + Wd - 60 - tx;
    const [, r1] = fenda(K, `<span class="lx-rot az">${ESC(P.rotulo)}</span>`, `left:${tx}px;top:${Y + 54}px;font-size:26px`);
    const [, r2] = fenda(K, `<span class="lx-rot az">${ESC(P.feito)}</span>`, `left:${tx}px;top:${Y + 54}px;font-size:26px`);
    const [, vb] = fenda(K, rico(P.verbo), `left:${tx - 4}px;top:${Y + 96}px;font-size:96px`); vb.parentNode.classList.add("lx-tit"); vb.style.fontWeight = 800;
    const fzR = Math.min(38, Math.floor(av / (0.74 * limpo(P.resto).length)));
    const [, rs] = fenda(K, rico(P.resto), `left:${tx}px;top:${Y + 204}px;font-size:${fzR}px;font-weight:300;letter-spacing:.06em;white-space:nowrap`); rs.parentNode.classList.add("lx");
    const trilho = K.el("", `left:${tx}px;top:${Y + 260}px;width:${av}px;transform:scaleX(0)`); trilho.classList.add("lx-linha"); trilho.style.background = "rgba(255,255,255,.22)";
    const barra = K.el("", `left:${tx}px;top:${Y + 259}px;width:${av}px;height:4px;background:#fff;transform:scaleX(0);transform-origin:left center`);
    // entrada
    K.ft(placa, { clipPath: "inset(0% 50% 0% 50%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.inOut" }, t0);
    K.sfx("lux_ar", t0, 0.6);
    K.desenha(ic.querySelector(".cont"), t0 + 0.3, 1.0, "power2.inOut"); K.sfx("lux_traco", t0 + 0.3, 0.5);
    sobe(K, r1, t0 + 0.4, 1.0);
    sobe(K, vb, t0 + 0.5, 1.1); sobe(K, rs, t0 + 0.64, 1.1); K.sfx("lux_grave", t0 + 0.5, 0.45);
    linha(K, trilho, t0 + 0.7, 0.9);
    // salvando: a barra enche, o marcador se preenche, o rótulo troca
    const tf = t0 + 2.1;
    K.ft(barra, { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "power2.inOut" }, t0 + 1.0);
    K.ft(ic.querySelector(".ench"), { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" }, tf);
    K.ft(ic, { scale: 1 }, { scale: 1.07, duration: 0.25, ease: "power2.out" }, tf);
    K.ft(ic, { scale: 1.07 }, { scale: 1, duration: 0.6, ease: "power2.inOut" }, tf + 0.25);
    K.ft(aro, { opacity: 0.8, scale: 0.6 }, { opacity: 0, scale: 1.5, duration: 1.0, ease: "power2.out" }, tf);
    fecha(K, r1, tf - 0.05, 0.35); sobe(K, r2, tf + 0.25, 0.9);
    K.sfx("lux_sino", tf, 0.7);
    if (P.sai) {
      const ts = t1 - 0.6;
      apaga(K, [ic, vb.parentNode, rs.parentNode, r2.parentNode], ts, 0.35); recolhe(K, trilho, ts, 0.4); recolhe(K, barra, ts, 0.4);
      K.ft(placa, { clipPath: "inset(0% 0% 0% 0%)" }, { clipPath: "inset(0% 50% 0% 50%)", duration: 0.55, ease: "expo.inOut" }, ts + 0.1);
    }
  });
})();
