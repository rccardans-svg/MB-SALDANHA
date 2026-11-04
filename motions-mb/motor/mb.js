/* Kit de motion MB Saldanha. Cada modelo chama MB.def(id, padroes, fn(P, K)).
   P = parâmetros (padrões + o que veio no spec). Tempos em P são relativos a P.em (segundos no vídeo final).
   K = ferramentas (elementos, tweens com tempo absoluto, sons, contadores, partículas com sorteio fixo). */
(function () {
  const W = 1080, H = 1920;
  const MB = { defs: {}, sfx: [], W, H, _depois: [] };
  window.MB = MB;
  // fundo verde (montar.py --verde): sem vídeo, sem véu e sem sombra, para usar com chroma key no editor
  MB.verde = !!window.MB_VERDE;
  window.__timelines = window.__timelines || {};

  MB.def = function (id, padroes, fn) { MB.defs[id] = { padroes, fn }; };

  function mulberry(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  // *palavra* = faixa azul, _palavra_ = faixa vermelha, | = quebra de linha
  MB.rich = function (s) {
    return esc(s).replace(/\*([^*]+)\*/g, '<span class="hl">$1</span>').replace(/_([^_]+)_/g, '<span class="hl x">$1</span>').replace(/\s*\|\s*/g, "<br>");
  };

  function kit(tl, P, n, D) {
    const fx = document.getElementById("fx");
    const K = { tl, P, D, W, H, fx, uid: "m" + n };
    K.rnd = mulberry(1000 + n * 7919);
    K.t = (x) => P.em + (x || 0);
    K.el = function (html, css, parent, tag) {
      const e = document.createElement(tag || "div");
      if (html != null) e.innerHTML = html;
      if (css) e.setAttribute("style", css);
      e.classList.add("ab");
      (parent || fx).appendChild(e);
      return e;
    };
    K.svg = function (inner, w, h, css, parent) {
      const e = K.el(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="overflow:visible">${inner}</svg>`, css, parent);
      return e;
    };
    K.rich = MB.rich;
    // painel de vidro azul (o brilho fica recortado, o conteúdo pode sair do painel)
    K.vidro = function (css, parent) {
      const e = K.el('<div class="bw"><div class="brilho"></div></div>', css, parent);
      e.classList.add("vidro"); return e;
    };
    // tweens em tempo ABSOLUTO do vídeo
    K.ft = (tg, a, b, at) => tl.fromTo(tg, a, Object.assign({ immediateRender: false }, b), at);
    K.to = (tg, b, at) => tl.to(tg, b, at);
    K.set = (tg, b, at) => tl.set(tg, b, at);
    K.mostra = (tg, at, d) => tl.fromTo(tg, { opacity: 0 }, { opacity: 1, duration: d == null ? 0.2 : d, immediateRender: false }, at);
    K.some = (tg, at, d) => tl.to(tg, { opacity: 0, duration: d == null ? 0.2 : d }, at);
    K.sfx = (nome, at, vol) => { if (at >= -0.01) MB.sfx.push([nome, Math.max(0, at), vol == null ? 1 : vol]); };
    // função chamada a cada quadro entre a e b com o tempo atual (determinística no render)
    K.ticker = function (fn, a, b) {
      const o = { v: a };
      tl.fromTo(o, { v: a }, { v: b, duration: Math.max(0.001, b - a), ease: "none", immediateRender: false, onUpdate: () => fn(o.v) }, a);
    };
    K.conta = function (el, de, ate, at, dur, fmt, ease) {
      const o = { v: de }; const f = fmt || ((v) => Math.round(v));
      tl.fromTo(o, { v: de }, { v: ate, duration: dur, ease: ease || "power2.out", immediateRender: false, onUpdate: () => { el.textContent = f(o.v); } }, at);
    };
    K.treme = function (tg, at, dur, amp) {
      const a = amp || 14, seed = K.rnd() * 100;
      K.ticker((t) => {
        const k = (t - at) / dur, dec = Math.max(0, 1 - k);
        gsap.set(tg, { x: Math.sin((t + seed) * 91) * a * dec, y: Math.cos((t + seed) * 73) * a * dec * 0.8 });
      }, at, at + dur);
      tl.set(tg, { x: 0, y: 0 }, at + dur + 0.001);
    };
    K.desenha = function (path, at, dur, ease) {
      const L = path.getTotalLength ? path.getTotalLength() : 1000;
      path.style.strokeDasharray = L; path.style.strokeDashoffset = L;
      tl.fromTo(path, { strokeDashoffset: L }, { strokeDashoffset: 0, duration: dur, ease: ease || "power2.inOut", immediateRender: false }, at);
    };
    K.passada = function (at, cor) {
      const p = K.el("", "", document.getElementById("root"));
      p.className = "passada"; if (cor) p.style.background = cor;
      tl.fromTo(p, { x: -1800 }, { x: 1800, duration: 0.46, ease: "power2.inOut", immediateRender: false }, at - 0.23);
      K.sfx("whoosh", at - 0.18, 0.6);
      return p;
    };
    // explosão de partículas azuis (quadradinhos e bolinhas), sorteio fixo
    K.particulas = function (x, y, n, at, o) {
      o = o || {}; const cores = o.cores || ["#1f66e5", "#2f74f2", "#9fbcff", "#163e9c", "#ffffff"];
      for (let i = 0; i < n; i++) {
        const s = 10 + K.rnd() * (o.tam || 26), ang = K.rnd() * Math.PI * 2, v = (o.forca || 520) * (0.4 + K.rnd() * 0.8);
        const c = cores[Math.floor(K.rnd() * cores.length)];
        const p = K.el("", `left:${x - s / 2}px;top:${y - s / 2}px;width:${s}px;height:${s * (K.rnd() < .5 ? 1 : .45)}px;background:${c};border-radius:${K.rnd() < .5 ? 50 : 3}%;opacity:0;z-index:60`);
        const dx = Math.cos(ang) * v, dy = Math.sin(ang) * v, g = o.gravidade == null ? 900 : o.gravidade, d = (o.dur || 1.3) * (0.7 + K.rnd() * 0.5);
        const r0 = K.rnd() * 720 - 360;
        tl.set(p, { opacity: 1 }, at);
        K.ticker((t) => { const k = t - at; gsap.set(p, { x: dx * k * (1 - k / (2.2 * d)), y: dy * k + 0.5 * g * k * k, rotation: r0 * k, opacity: Math.max(0, 1 - Math.pow(k / d, 2)) }); }, at, at + d);
        tl.set(p, { opacity: 0 }, at + d + 0.01);
      }
    };
    K.logo = document.getElementById("logo");
    K.cam = document.getElementById("cam");
    K.espelho = (i) => document.getElementById("mir" + (i || 1));
    K.extra = (id) => document.getElementById("x-" + id);
    K.usar = function (id, params) { return MB.rodar(tl, Object.assign({ id }, params), n * 100 + 1, D); };
    // roda fn depois que todos os motions do spec foram montados (para motions que dependem uns dos outros)
    K.depois = function (fn) { MB._depois.push(fn); };
    return K;
  }

  MB.rodar = function (tl, item, n, D) {
    const d = MB.defs[item.id];
    if (!d) { console.error("motion não existe:", item.id); return; }
    const P = JSON.parse(JSON.stringify(d.padroes));
    Object.assign(P, item);
    if (P.em == null) P.em = 0;
    return d.fn(P, kit(tl, P, n, D));
  };

  MB.iniciar = function (spec) {
    const tl = gsap.timeline({ paused: true });
    (spec.motions || []).forEach((m, i) => MB.rodar(tl, m, i + 1, spec.dur));
    for (let i = 0; i < MB._depois.length; i++) MB._depois[i]();
    tl.set({}, {}, spec.dur); // garante a duração total
    window.__timelines["main"] = tl;
    window.__MB_SFX = MB.sfx;
    tl.seek(0);
    return tl;
  };
})();
