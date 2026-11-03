/* Grupo F. Formatos de série e app. Motions 36 a 40. */
(function () {
  const AZ = "#1f66e5";

  // ---------- 36 React do Ullisses com rosto no círculo ----------
  // extra "rosto" = vídeo do Ullisses comentando; o fundo deve estar congelado no spec a partir de olha_em.
  MB.def("36", {
    em: 0, extra: "rosto", nome: "ULLISSES REAGE", foco: "50% 50%", olha_em: 1.6, olha: "OLHA AQUI",
    lupa: { x: 560, y: 1000, de: [860, 1400], zoom: 2.1, raio: 210, etiqueta: "_COSTAS_|ARREDONDADAS", tipo: "x", dur: 2.4 }, x: 690, y: 240, tam: 330
  }, function (P, K) {
    const t0 = K.t(), X = K.extra(P.extra), S = P.tam;
    if (X) {
      Object.assign(X.style, { left: P.x + "px", top: P.y + "px", width: S + "px", height: S + "px", borderRadius: "50%", border: `10px solid ${AZ}`, boxShadow: "0 14px 40px rgba(0,0,0,.45)", zIndex: 50 });
      X.querySelector("video").style.objectPosition = P.foco;
      K.ft(X, { opacity: 1, scale: 0, rotation: -30 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.45, ease: "back.out(2)" }, t0);
    }
    const anel = K.el("", `left:${P.x - 24}px;top:${P.y - 24}px;width:${S + 48}px;height:${S + 48}px;border-radius:50%;border:5px solid ${AZ};opacity:0;z-index:5`);
    for (let t = t0 + 0.2; t < K.D - 0.3; t += 1.1) K.ft(anel, { opacity: 0.9, scale: 0.88 }, { opacity: 0, scale: 1.22, duration: 1.0, ease: "power1.out" }, t);
    const nm = K.el(`<span class="hl" style="font-size:34px;padding:4px 16px 8px">${P.nome}</span>`, `left:${P.x}px;top:${P.y + S + 6}px;width:${S}px;text-align:center;opacity:0;z-index:6`);
    K.ft(nm, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3 }, t0 + 0.3);
    K.sfx("pop", t0, 0.6);
    const to = K.t(P.olha_em);
    const ol = K.el(`<span style="display:inline-flex;align-items:center;gap:12px;background:#fff;color:#0a1b3f;font-weight:900;font-style:italic;font-size:46px;padding:8px 24px 12px;border-radius:999px">${P.olha} <svg width="40" height="40" viewBox="0 0 40 40"><path d="M6 34 L32 8 M14 8 H32 V26" stroke="#0a1b3f" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`,
      `left:${P.x - 330}px;top:${P.y + 40}px;opacity:0;z-index:6`);
    K.ft(ol, { opacity: 0, scale: 0.4, rotation: -8 }, { opacity: 1, scale: 1, rotation: -4, duration: 0.3, ease: "back.out(3)" }, to);
    K.to(ol, { opacity: 0, duration: 0.2 }, to + 1.2);
    K.sfx("hit", to, 0.6);
    if (P.lupa) K.usar("14", Object.assign({ em: to + 0.25 }, P.lupa));
  });

  // ---------- 37 Desafio da flexão com barra de progresso ----------
  MB.def("37", {
    em: 0, meta: 50, de: 0.4, ate: 4.6, reps: null, titulo: "DESAFIO|*50 FLEXÕES*", final: "BAIXE O|APP *X1*", cta: "LINK NA BIO", final_dur: 2.0, cores_app: false
  }, function (P, K) {
    const t0 = K.t(), N = P.meta;
    const reps = P.reps || Array.from({ length: N }, (_, i) => P.de + (P.ate - P.de) * (i + 1) / N);
    const tit = K.el(K.rich(P.titulo), "left:50px;top:240px;font-size:66px;line-height:1.05;opacity:0"); tit.classList.add("sombra-txt");
    const pb = K.vidro("left:50px;top:420px;width:980px;height:150px;opacity:0;border-radius:28px");
    const trilho = K.el("", "left:30px;top:84px;width:920px;height:36px;border-radius:18px;background:rgba(255,255,255,.18)", pb);
    const fill = K.el("", `left:0;top:0;width:920px;height:36px;border-radius:18px;background:linear-gradient(90deg,#163e9c,#2f74f2);box-shadow:0 0 22px rgba(47,116,242,.9);transform-origin:left center;transform:scaleX(0)`, trilho);
    const marcos = [];
    for (let m = 10; m <= N; m += 10) {
      const x = 920 * m / N;
      marcos.push([m, K.el(`<i style="display:block;width:6px;height:52px;margin:0 auto;background:rgba(255,255,255,.7);border-radius:3px"></i><b style="display:block;font-weight:800;font-size:24px;margin-top:4px">${m}</b>`, `left:${30 + x - 30}px;top:66px;width:60px;text-align:center;opacity:.75`, pb)]);
    }
    const cnt = K.el(`<span class="c">0</span><small style="font-size:32px;opacity:.8">/${N}</small>`, "left:30px;top:10px;font-weight:900;font-style:italic;font-size:62px;line-height:1", pb);
    K.el("FLEXÕES", "right:30px;top:24px;font-weight:800;font-size:32px;letter-spacing:.1em;opacity:.85", pb);
    K.ft(tit, { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.35, ease: "expo.out" }, t0);
    K.ft(pb, { opacity: 0, y: -60 }, { opacity: 1, y: 0, duration: 0.4, ease: "expo.out" }, t0 + 0.1);
    const c = cnt.querySelector(".c");
    reps.forEach((r, i) => {
      const t = K.t(r), n = i + 1;
      K.set(c, { textContent: String(n) }, t);
      K.to(fill, { scaleX: n / N, duration: 0.12, ease: "power2.out" }, t);
      const mk = marcos.find((m) => m[0] === n);
      if (mk) { K.ft(mk[1], { scale: 1, opacity: 0.75 }, { scale: 1.5, opacity: 1, duration: 0.15, yoyo: true, repeat: 1 }, t); K.sfx("hit", t, 0.5); K.ft(cnt, { scale: 1.25 }, { scale: 1, duration: 0.25, ease: "back.out(3)" }, t); }
      else if (N <= 20) K.sfx("tique", t, 0.5);
    });
    const tf = K.t(reps[reps.length - 1]) + 0.15;
    K.particulas(540, 260, 140, tf, { forca: 1000, tam: 30, gravidade: 1300, dur: 2.0, cores: ["#1f66e5", "#2f74f2", "#9fbcff", "#ffffff", "#163e9c"] });
    K.sfx("confete", tf, 0.7); K.sfx("sucesso", tf, 0.6);
    const tc = tf + 0.6;
    const app = P.cores_app;
    const bg = K.el(app ? "" : `<div class="tela-azul"></div>`, `inset:0;opacity:0;z-index:5;${app ? "background:#0d0d0d" : ""}`);
    K.set(bg, { opacity: 1 }, tc);
    K.ft(bg, { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(120% at 50% 50%)", duration: 0.45, ease: "power3.inOut" }, tc);
    const fi = K.el(K.rich(P.final), "left:60px;top:640px;width:960px;text-align:center;font-weight:400;font-size:130px;line-height:1.05;opacity:0;z-index:6");
    if (app) fi.querySelectorAll(".hl").forEach((h) => (h.style.background = "#ff5a1f"));
    const bt = K.el(P.cta, `left:240px;top:1080px;width:600px;text-align:center;font-weight:800;font-size:46px;padding:30px 0;border-radius:999px;background:#fff;color:${app ? "#0d0d0d" : "#1546b8"};opacity:0;z-index:6`);
    K.ft(fi, { opacity: 0, scale: 1.4, filter: "blur(14px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.4, ease: "expo.out" }, tc + 0.3);
    K.ft(bt, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" }, tc + 0.6);
    K.ft(bt, { scale: 1 }, { scale: 1.06, duration: 0.35, yoyo: true, repeat: 3, ease: "sine.inOut" }, tc + 1.0);
    K.set(K.logo, { opacity: 0 }, tc);
    K.sfx("whoosh", tc, 0.6); K.sfx("hit", tc + 0.3, 0.7);
  });

  // ---------- 38 Tela de celular do app ----------
  MB.def("38", { em: 0, reps: [0.9, 1.5, 2.1, 2.7, 3.3, 3.9], meta: 20, inicio: 0, x: 700, y: 170, escala: 0.8, nome_app: "X1", tema: "mb", sai: null }, function (P, K) {
    const t0 = K.t(), Wp = 400, Hp = 820, cor = P.tema === "app" ? "#ff5a1f" : "#2f74f2", fundo = P.tema === "app" ? "linear-gradient(180deg,#1a1a1a,#0d0d0d)" : "linear-gradient(180deg,#123473,#0a1b3f)";
    const R = 120, C = 2 * Math.PI * R;
    const fone = K.el(`<div style="position:absolute;inset:14px;border-radius:52px;overflow:hidden;background:${fundo}">
        <div style="position:absolute;left:50%;top:14px;width:120px;height:32px;margin-left:-60px;border-radius:16px;background:#000"></div>
        <div style="position:absolute;left:30px;top:70px;font-weight:900;font-style:italic;font-size:44px">${P.nome_app}</div>
        <div style="position:absolute;right:30px;top:82px;font-weight:700;font-size:22px;opacity:.75;letter-spacing:.1em">FLEXÕES</div>
        <svg style="position:absolute;left:66px;top:200px" width="240" height="240" viewBox="0 0 300 300"><circle cx="150" cy="150" r="${R}" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="26"/>
          <circle class="anel" cx="150" cy="150" r="${R}" fill="none" stroke="${cor}" stroke-width="26" stroke-linecap="round" transform="rotate(-90 150 150)" stroke-dasharray="${C}" stroke-dashoffset="${C}" style="filter:drop-shadow(0 0 10px ${cor})"/></svg>
        <div class="n" style="position:absolute;left:0;top:262px;width:372px;text-align:center;font-weight:900;font-style:italic;font-size:110px;line-height:1">0</div>
        <div style="position:absolute;left:0;top:470px;width:372px;text-align:center;font-weight:700;font-size:26px;opacity:.8">META ${P.meta} · SÉRIE 1</div>
        <div style="position:absolute;left:30px;top:540px;width:312px;display:flex;gap:10px">${[0, 1, 2, 3, 4].map((i) => `<i style="flex:1;height:10px;border-radius:5px;background:${i ? "rgba(255,255,255,.2)" : cor}"></i>`).join("")}</div>
        <div style="position:absolute;left:46px;top:640px;width:280px;text-align:center;font-weight:800;font-size:30px;padding:20px 0;border-radius:999px;background:${cor}">PAUSAR</div>
      </div><div style="position:absolute;inset:0;border-radius:64px;background:linear-gradient(115deg,rgba(255,255,255,.18),rgba(255,255,255,0) 35%);pointer-events:none"></div>`,
      `left:${P.x}px;top:${P.y}px;width:${Wp}px;height:${Hp}px;border-radius:64px;background:linear-gradient(145deg,#3a4253,#11151d);box-shadow:0 40px 80px rgba(0,0,0,.55),inset 0 0 0 3px rgba(255,255,255,.18);opacity:0`);
    const anel = fone.querySelector(".anel"), n = fone.querySelector(".n");
    gsap.set(fone, { transformOrigin: "0% 0%", scale: P.escala });
    K.ft(fone, { opacity: 0, x: 700, rotationY: -70, rotation: -18, transformPerspective: 1500, scale: P.escala }, { opacity: 1, x: 0, scale: P.escala, rotationY: -10, rotation: -4, duration: 0.7, ease: "back.out(1.2)" }, t0);
    K.sfx("whoosh", t0, 0.6);
    K.ticker((t) => { const k = t - t0 - 0.7; if (k > 0) gsap.set(fone, { y: Math.sin(k * 2.2) * 10, rotationY: -10 + Math.sin(k * 1.4) * 4 }); }, t0 + 0.7, P.sai != null ? K.t(P.sai) : K.D);
    P.reps.forEach((r, i) => {
      const t = K.t(r), v = P.inicio + i + 1;
      K.set(n, { textContent: String(v) }, t);
      K.ft(n, { scale: 1.3 }, { scale: 1, duration: 0.25, ease: "back.out(3)" }, t);
      K.to(anel, { strokeDashoffset: C * (1 - v / P.meta), duration: 0.2, ease: "power2.out" }, t);
      K.sfx("pop", t, 0.55);
    });
    if (P.sai != null) K.to(fone, { x: 700, rotationY: 60, opacity: 0, duration: 0.45, ease: "power3.in" }, K.t(P.sai));
  });

  // ---------- 39 Bastidores com etiquetas ----------
  MB.def("39", { em: 0, etiquetas: [[0.4, 300, 1150, "MINI TRAMPOLIM", "EXPLOSÃO E EQUILÍBRIO"], [1.9, 760, 760, "ESPALDAR", "MOBILIDADE E FORÇA"]], dur_cada: 2.2 }, function (P, K) {
    P.etiquetas.forEach(([te, x, y, nome, uso], i) => {
      const t = K.t(te), t1 = t + P.dur_cada, dir = x < 540 ? 1 : -1;
      const lx = x + dir * 120, ly = y - 230;
      const pin = K.el("", `left:${x - 18}px;top:${y - 18}px;width:36px;height:36px;border-radius:50%;background:${AZ};border:6px solid #fff;box-shadow:0 0 20px rgba(47,116,242,1);opacity:0;z-index:3`);
      const rs = [0, 1].map(() => K.el("", `left:${x - 40}px;top:${y - 40}px;width:80px;height:80px;border-radius:50%;border:4px solid #fff;opacity:0`));
      const sv = K.svg(`<path class="ln" d="M${lx} ${ly + 60} L${x + dir * 40} ${ly + 60} L${x + dir * 6} ${y - 24}" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
        <path class="cb" d="M${x + dir * 6} ${y - 24} l ${dir * -4} -24 M${x + dir * 6} ${y - 24} l ${dir * 22} -10" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity="0"/>`, 1080, 1920, "left:0;top:0;z-index:2");
      const card = K.vidro(`${dir > 0 ? "left:" + lx : "right:" + (1080 - lx)}px;top:${ly}px;padding:18px 28px 22px;opacity:0;border-radius:22px`);
      K.el(`<div style="font-weight:900;font-style:italic;font-size:46px;line-height:1">${nome}</div><div style="font-weight:500;font-size:30px;margin-top:8px;opacity:.9">${uso}</div>`, "position:relative", card).classList.remove("ab");
      card.style.whiteSpace = "nowrap";
      K.ft(pin, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(3)" }, t);
      rs.forEach((r, j) => { for (let k = t; k < t1 - 0.3; k += 0.9) K.ft(r, { opacity: 0.8, scale: 0.4 }, { opacity: 0, scale: 1.8, duration: 0.9 }, k + j * 0.3); });
      K.desenha(sv.querySelector(".ln"), t + 0.15, 0.35);
      K.ft(sv.querySelector(".cb"), { opacity: 0 }, { opacity: 1, duration: 0.05 }, t + 0.48);
      K.ft(card, { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(2)" }, t + 0.35);
      K.to([pin, sv, card], { opacity: 0, duration: 0.2 }, t1);
      K.sfx("pop", t, 0.5); K.sfx("pop", t + 0.35, 0.4);
    });
  });

  // ---------- 40 Fechamento padrão com assinatura ----------
  MB.def("40", {
    em: 0, dur: 3.2, frase: "TÉCNICA É|*PERFORMANCE*", botao: "AGENDE SEU TREINO", sub: "CENTRO DE ALTA PERFORMANCE · MB SALDANHA", domiciliar: false
  }, function (P, K) {
    const t0 = K.t();
    const root = document.getElementById("root");
    const bg = K.el(`<div class="tela-azul"></div>
      <svg width="1080" height="1920" style="position:absolute;inset:0;mix-blend-mode:overlay;opacity:.32"><filter id="tx${K.uid}"><feTurbulence type="fractalNoise" baseFrequency="0.9 0.025" numOctaves="2" seed="5" result="a"/><feTurbulence type="fractalNoise" baseFrequency="0.025 0.9" numOctaves="2" seed="8" result="b"/><feBlend in="a" in2="b" mode="multiply"/><feColorMatrix type="saturate" values="0"/></filter><rect width="1080" height="1920" filter="url(#tx${K.uid})"/></svg>`, "inset:0;opacity:0;z-index:80", root);
    K.set(bg, { opacity: 1 }, t0);
    K.ft(bg, { clipPath: "circle(0% at 50% 60%)" }, { clipPath: "circle(120% at 50% 60%)", duration: 0.5, ease: "power3.inOut" }, t0);
    K.passada(t0 + 0.05);
    K.set(K.logo, { opacity: 0 }, t0 + 0.2);
    const lg = P.domiciliar ? "logo_white_domiciliar.png" : "logo_white.png";
    const lw = 700, lh = Math.round(700 * 295 / 900);
    const outl = K.el(`<img src="assets/logo_outline.png" style="width:${lw}px"/>`, `left:${540 - lw / 2}px;top:360px;opacity:0;z-index:82;clip-path:inset(0 100% 0 0)`, root);
    const fill = K.el(`<img src="assets/${lg}" style="width:${lw}px"/>`, `left:${540 - lw / 2}px;top:360px;opacity:0;z-index:83`, root);
    const pena = K.el("", `left:${540 - lw / 2 - 12}px;top:${360 + lh / 2 - 12}px;width:24px;height:24px;border-radius:50%;background:#fff;box-shadow:0 0 24px 8px rgba(159,188,255,.9);opacity:0;z-index:84`, root);
    K.set(outl, { opacity: 1 }, t0 + 0.3);
    K.ft(outl, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "power1.inOut" }, t0 + 0.3);
    K.ft(pena, { opacity: 1, x: 0, y: 0 }, { x: lw, duration: 0.9, ease: "power1.inOut" }, t0 + 0.3);
    K.ticker((t) => { pena.style.translate = `0 ${Math.sin(t * 40) * lh * 0.32}px`; }, t0 + 0.3, t0 + 1.2);
    K.set(pena, { opacity: 0 }, t0 + 1.2);
    K.ft(fill, { opacity: 0 }, { opacity: 1, duration: 0.35 }, t0 + 1.05);
    K.to(outl, { opacity: 0, duration: 0.35 }, t0 + 1.15);
    K.sfx("caneta", t0 + 0.3, 0.5);
    const palavras = [];
    P.frase.split("|").forEach((linha, li) => {
      const ws = linha.trim().split(/\s+/);
      const limpo = linha.replace(/[*_]/g, "").trim(), base = li ? 120 : 76, fs = Math.min(base, Math.floor(880 / (limpo.length * 0.8)));
      const l = K.el(ws.map((w) => `<span class="w" style="display:inline-block;margin:0 .12em">${K.rich(w)}</span>`).join(""), `left:40px;width:1000px;top:${720 + li * 130}px;text-align:center;font-weight:400;font-size:${fs}px;line-height:1.05;z-index:83`, root);
      l.querySelectorAll(".w").forEach((w) => palavras.push(w));
    });
    gsap.set(palavras, { opacity: 0 });
    K.ft(palavras, { opacity: 0, y: 50, filter: "blur(10px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.32, ease: "expo.out", stagger: 0.16 }, t0 + 0.55);
    palavras.forEach((w, i) => K.sfx("pop", t0 + 0.55 + i * 0.16, 0.25));
    const tb = t0 + 0.6 + palavras.length * 0.16;
    const bt = K.el(P.botao, `left:180px;top:1080px;width:720px;text-align:center;font-weight:800;font-size:46px;padding:30px 0;border-radius:999px;background:#fff;color:#1546b8;opacity:0;z-index:83;box-shadow:0 14px 40px rgba(0,0,0,.35)`, root);
    const sb = K.el(P.sub, "left:0;top:1230px;width:1080px;text-align:center;font-weight:600;font-size:30px;letter-spacing:.06em;color:#dbe6ff;opacity:0;z-index:83", root);
    K.ft(bt, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" }, tb);
    K.ft(sb, { opacity: 0 }, { opacity: 1, duration: 0.3 }, tb + 0.2);
    const pulsos = Math.max(1, Math.floor((K.D - tb - 0.4) / 0.6));
    K.ft(bt, { scale: 1, boxShadow: "0 0 0 0 rgba(255,255,255,.6)" }, { scale: 1.06, boxShadow: "0 0 0 22px rgba(255,255,255,0)", duration: 0.6, repeat: pulsos, ease: "sine.inOut" }, tb + 0.4);
    K.sfx("hit", tb, 0.7);
  });
})();
