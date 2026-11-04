/* Grupo E. Transições e câmera. Motions 31 a 35. Nada de flash branco: sempre azul. */
(function () {
  const AZ = "#1f66e5";

  // ---------- 31 Passada azul entre cortes ----------
  MB.def("31", { em: 0, cortes: [2.0], punch: 1.12 }, function (P, K) {
    const root = document.getElementById("root");
    P.cortes.forEach((tc) => {
      const t = K.t(tc);
      const a = K.el("", "", root); a.className = "passada";
      const b = K.el("", "", root); b.className = "passada"; b.style.background = "linear-gradient(90deg,rgba(10,27,63,0),#0a1b3f 35%,#163e9c 60%,rgba(22,62,156,0))";
      const linhas = K.el([0, 1, 2, 3, 4].map((i) => `<i style="position:absolute;left:0;top:${180 + i * 360}px;width:${400 + (i % 3) * 200}px;height:${10 + (i % 2) * 8}px;border-radius:9px;background:#9fbcff;opacity:.8"></i>`).join(""), "left:0;top:0;width:1080px;height:1920px;z-index:96;pointer-events:none;opacity:0", root);
      K.ft(b, { x: -1800 }, { x: 1800, duration: 0.5, ease: "power2.inOut" }, t - 0.27);
      K.ft(a, { x: -1800 }, { x: 1800, duration: 0.46, ease: "power2.inOut" }, t - 0.21);
      K.ft(linhas, { x: -1200, opacity: 1 }, { x: 1400, opacity: 1, duration: 0.42, ease: "power2.inOut" }, t - 0.2);
      K.set(linhas, { opacity: 0 }, t + 0.25);
      if (P.punch) K.ft(K.cam, { scale: P.punch }, { scale: 1, duration: 0.6, ease: "expo.out" }, t);
      K.sfx("whoosh", t - 0.2, 0.75);
    });
  });

  // ---------- 32 Zoom de impacto no ponto alto ----------
  MB.def("32", { em: 0, picos: [[1.0, 540, 760]], forca: 1.12, volta: 0.55 }, function (P, K) {
    P.picos.forEach(([tp, x, y]) => {
      const t = K.t(tp);
      const vin = K.el("", "inset:0;opacity:0;background:radial-gradient(70% 60% at 50% 45%,rgba(10,27,63,0) 40%,rgba(10,27,63,.75) 100%)");
      K.ft(K.cam, { scale: 1, transformOrigin: `${x}px ${y}px` }, { scale: P.forca, duration: 0.07, ease: "power4.out" }, t - 0.03);
      K.to(K.cam, { scale: 1, duration: P.volta, ease: "power2.inOut" }, t + 0.12);
      K.treme(K.cam, t, 0.28, 12);
      K.ft(vin, { opacity: 1 }, { opacity: 0, duration: 0.6, ease: "power2.out" }, t);
      for (let i = 0; i < 2; i++) {
        const r = K.el("", `left:${x - 160}px;top:${y - 160}px;width:320px;height:320px;border-radius:50%;border:${8 - i * 3}px solid #2f74f2;opacity:0`);
        K.ft(r, { opacity: 0.9, scale: 0.3 }, { opacity: 0, scale: 3, duration: 0.55, ease: "power2.out" }, t + i * 0.07);
      }
      K.sfx("grave", t - 0.02, 1);
    });
  });

  // ---------- 33 Câmera lenta com rastro (o rastro vem da peça "eco" no spec) ----------
  MB.def("33", { em: 0, ate: 2.5, texto: "CÂMERA LENTA", vel: "0.3X" }, function (P, K) {
    const t0 = K.t(), t1 = K.t(P.ate);
    const tint = K.el("", "inset:0;opacity:0;background:radial-gradient(90% 70% at 50% 50%,rgba(31,102,229,0) 45%,rgba(10,27,63,.55) 100%)");
    const bd = K.el(`<span style="display:inline-flex;align-items:center;gap:14px;background:rgba(5,14,36,.75);padding:10px 22px 12px;border-radius:16px">
      <svg width="46" height="46" viewBox="0 0 46 46"><circle cx="23" cy="23" r="20" fill="none" stroke="#fff" stroke-width="4"/><path d="M23 11 V23 L31 29" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/></svg>
      <b style="font-weight:800;font-size:36px;letter-spacing:.06em">${P.texto}</b><i style="font-style:italic;font-weight:900;font-size:40px;background:${AZ};padding:0 12px 4px;border-radius:10px">${P.vel}</i></span>`, "left:50px;top:250px;opacity:0");
    K.ft(tint, { opacity: 0 }, { opacity: 1, duration: 0.3 }, t0); K.to(tint, { opacity: 0, duration: 0.25 }, t1 - 0.1);
    K.ft(bd, { opacity: 0, x: -80 }, { opacity: 1, x: 0, duration: 0.35, ease: "back.out(2)" }, t0 + 0.05);
    K.to(bd, { opacity: 0, x: -60, duration: 0.2 }, t1 - 0.1);
    const ag = bd.querySelector("path");
    K.ft(ag, { rotation: 0, transformOrigin: "23px 23px" }, { rotation: 360, duration: Math.max(0.5, t1 - t0), ease: "none" }, t0);
    K.sfx("sobe", t0 - 0.4, 0.3); K.sfx("whoosh", t1 - 0.15, 0.6);
    K.ft(K.cam, { scale: 1.06 }, { scale: 1, duration: 0.5, ease: "expo.out" }, t1);
  });

  // ---------- 34 Congelar e girar o card (o fundo precisa estar congelado no spec) ----------
  MB.def("34", { em: 0, dur: 2.8, titulo: "DICA DO PERSONAL", dica: "*ABDÔMEN*|TRAVADO", sub: "ANTES DE TIRAR|A BARRA DO CHÃO", espelho: 1 }, function (P, K) {
    const t0 = K.t(), t1 = t0 + P.dur, M = K.espelho(P.espelho);
    const ov = K.el("", "inset:0;opacity:0;background:rgba(8,20,47,.72)");
    M.style.zIndex = 45; M.style.backfaceVisibility = "hidden"; M.style.webkitBackfaceVisibility = "hidden";
    const back = K.el(`<div style="font-weight:800;font-size:40px;letter-spacing:.12em;opacity:.85">${P.titulo}</div><div style="font-weight:400;font-size:120px;line-height:1.05;margin-top:30px">${K.rich(P.dica)}</div><div style="font-weight:600;font-size:46px;line-height:1.2;margin-top:40px;opacity:.9">${K.rich(P.sub)}</div>`,
      "left:0;top:0;width:1080px;height:1920px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 90px;background:linear-gradient(160deg,#2f74f2,#163e9c 55%,#0a1b3f);border-radius:70px;border:6px solid rgba(255,255,255,.35);backface-visibility:hidden;-webkit-backface-visibility:hidden;opacity:0");
    back.style.zIndex = 46; back.parentNode.removeChild(back); document.getElementById("root").appendChild(back);
    const pose = (o, rot) => Object.assign({ scale: 0.62, rotationY: rot, rotationX: 4, borderRadius: 70, transformPerspective: 2200 }, o || {});
    K.set(ov, { opacity: 1 }, t0);
    K.set(M, { opacity: 1, scale: 1, rotationY: 0, rotationX: 0, borderRadius: 0, transformPerspective: 2200 }, t0);
    K.to(M, Object.assign(pose({}, -14), { duration: 0.45, ease: "power3.out" }), t0);
    K.set(back, Object.assign(pose({}, 166), { opacity: 1 }), t0 + 0.45);
    K.to(M, { rotationY: 180 - 14, duration: 0.6, ease: "power3.inOut" }, t0 + 0.6);
    K.to(back, { rotationY: 360 - 14, duration: 0.6, ease: "power3.inOut" }, t0 + 0.6);
    K.sfx("virar", t0 + 0.65, 0.8); K.sfx("whoosh", t0, 0.4);
    K.to(M, { rotationY: 360, duration: 0.55, ease: "power3.inOut" }, t1 - 0.95);
    K.to(back, { rotationY: 540, duration: 0.55, ease: "power3.inOut" }, t1 - 0.95);
    K.sfx("virar", t1 - 0.9, 0.8);
    K.to(M, { scale: 1, rotationX: 0, borderRadius: 0, duration: 0.4, ease: "power3.inOut" }, t1 - 0.4);
    K.set(back, { opacity: 0 }, t1 - 0.4);
    K.to(ov, { opacity: 0, duration: 0.3 }, t1 - 0.35);
    K.set(M, { opacity: 0, rotationY: 0 }, t1);
  });

  // ---------- 35 Corte no ritmo da música (os cortes vêm da peça "ritmo" no spec) ----------
  MB.def("35", { em: 0, bpm: 120, ate: null, passada_cada: 4, pulso: 1.035, logo_final: 1.4 }, function (P, K) {
    const beat = 60 / P.bpm, t0 = K.t(), fim = P.ate != null ? K.t(P.ate) : K.D - P.logo_final;
    let i = 0;
    for (let t = t0; t < fim - 0.05; t += beat, i++) {
      if (i && i % P.passada_cada === 0) K.passada(t);
      else K.ft(K.cam, { scale: P.pulso }, { scale: 1, duration: beat * 0.7, ease: "power2.out" }, t);
    }
    // contador de batidas no canto
    const bar = K.el([0, 1, 2, 3].map(() => `<i style="display:block;width:46px;height:12px;border-radius:6px;background:rgba(255,255,255,.35)"></i>`).join(""), "left:50px;top:260px;display:flex;gap:10px;opacity:0");
    K.ft(bar, { opacity: 0 }, { opacity: 1, duration: 0.2 }, t0);
    const is = bar.querySelectorAll("i"); i = 0;
    for (let t = t0; t < fim; t += beat, i++) { const k = i % 4; K.set(is, { background: "rgba(255,255,255,.35)" }, t); K.set(is[k], { background: "#2f74f2" }, t); }
    K.set(bar, { opacity: 0 }, fim);
    if (P.logo_final) {
      const bg = K.el(`<div class="tela-azul"></div>`, "inset:0;opacity:0;z-index:5");
      const lg = K.el(`<img src="assets/logo_white.png" style="width:760px"/>`, "left:160px;top:760px;opacity:0;z-index:6");
      K.set(bg, { opacity: 1 }, fim);
      K.ft(bg, { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(120% at 50% 50%)", duration: 0.4, ease: "power3.inOut" }, fim);
      K.ft(lg, { opacity: 0, scale: 1.3, filter: "blur(12px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.45, ease: "expo.out" }, fim + 0.25);
      K.set(K.logo, { opacity: 0 }, fim);
      K.sfx("grave", fim + 0.25, 0.8);
    }
  });
})();
