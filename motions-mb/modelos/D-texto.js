/* Grupo D. Texto e tipografia em movimento. Motions 25 a 30. */
(function () {
  const AZ = "#1f66e5";

  // ---------- 25 Palavra que bate com a voz ----------
  // palavras: [[inicio, fim, "palavra"], ...] em segundos a partir de "em" (use motor/transcrever.py para gerar).
  // Palavra entre *asteriscos* = palavra-chave (sozinha, gigante, faixa azul).
  MB.def("25", { em: 0, palavras: [], y: 1180, por_linha: 3, tam: 86, tam_chave: 170 }, function (P, K) {
    const grupos = []; let g = [];
    P.palavras.forEach((w) => {
      const chave = /^\*.*\*$/.test(w[2]);
      if (chave) { if (g.length) grupos.push(g); grupos.push([w]); g = []; return; }
      g.push(w); if (g.length >= P.por_linha) { grupos.push(g); g = []; }
    });
    if (g.length) grupos.push(g);
    grupos.forEach((gr, i) => {
      const chave = gr.length === 1 && /^\*.*\*$/.test(gr[0][2]);
      const a = K.t(gr[0][0]), b = i + 1 < grupos.length ? K.t(grupos[i + 1][0][0]) - 0.02 : K.t(gr[gr.length - 1][1]) + 0.4;
      const linha = K.el(gr.map((w) => `<span class="w" style="display:inline-block;margin:0 .14em;opacity:0">${chave ? `<span class="hl" style="padding:0 .2em .06em">${w[2].replace(/\*/g, "")}</span>` : w[2]}</span>`).join(""),
        `left:40px;width:1000px;top:${P.y - (chave ? 40 : 0)}px;text-align:center;font-weight:${chave ? 900 : 800};font-style:${chave ? "italic" : "normal"};font-size:${chave ? P.tam_chave : P.tam}px;line-height:1.05`);
      linha.classList.add("sombra-txt");
      linha.querySelectorAll(".w").forEach((s, j) => {
        const t = K.t(gr[j][0]);
        K.ft(s, { opacity: 0, y: chave ? 0 : 26, scale: chave ? 1.6 : 0.85 }, { opacity: 1, y: 0, scale: 1, duration: chave ? 0.16 : 0.14, ease: chave ? "power4.in" : "back.out(2.5)" }, t - 0.03);
        if (chave) { K.treme(K.cam, t + 0.13, 0.22, 7); K.sfx("hit", t + 0.1, 0.55); }
      });
      K.set(linha, { opacity: 0 }, b);
    });
  });

  // ---------- 26 Texto atrás da pessoa ----------
  // precisa de um extra com "recorte": true (pessoa sem fundo) com o mesmo trecho do vídeo de fundo.
  MB.def("26", { em: 0, dur: 3.0, texto: "FORÇA", y: 560, tam: 260, extra: "pessoa", cor: "#ffffff", contorno: false }, function (P, K) {
    const t0 = K.t(), t1 = t0 + P.dur, X = K.extra(P.extra);
    if (X) { X.style.zIndex = 45; K.set(X, { opacity: 1 }, t0); K.set(X, { opacity: 0 }, t1); }
    const letras = [...P.texto];
    const tx = K.el(letras.map((c) => `<span style="display:inline-block">${c}</span>`).join(""),
      `left:0;width:1080px;top:${P.y}px;text-align:center;font-weight:900;font-style:italic;font-size:${P.tam}px;line-height:1;letter-spacing:-.02em;color:${P.contorno ? "transparent" : P.cor};-webkit-text-stroke:${P.contorno ? "8px " + P.cor : "0"};text-shadow:0 12px 40px rgba(10,27,63,.45);z-index:2`);
    tx.style.zIndex = 41; tx.parentNode.removeChild(tx); document.getElementById("root").appendChild(tx);
    const sp = tx.querySelectorAll("span");
    K.ft(sp, { opacity: 0, yPercent: 70, scaleY: 1.4 }, { opacity: 1, yPercent: 0, scaleY: 1, duration: 0.45, ease: "expo.out", stagger: 0.06 }, t0);
    const faixa = K.el("", `left:0;top:${P.y + P.tam * 0.38}px;width:1080px;height:${P.tam * 0.34}px;background:${AZ};transform-origin:left center;transform:scaleX(0);opacity:.9`);
    faixa.style.zIndex = 40; faixa.parentNode.removeChild(faixa); document.getElementById("root").appendChild(faixa);
    K.ft(faixa, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "expo.inOut" }, t0 - 0.1);
    K.to(sp, { opacity: 0, yPercent: -40, duration: 0.25, stagger: 0.03, ease: "power2.in" }, t1 - 0.35);
    K.to(faixa, { scaleX: 0, transformOrigin: "right center", duration: 0.3, ease: "power2.in" }, t1 - 0.3);
    K.sfx("grave", t0, 0.7); K.sfx("whoosh", t0 - 0.1, 0.5);
  });

  // ---------- 27 Máquina de escrever com cursor azul ----------
  MB.def("27", { em: 0, texto: "VOCÊ TREINA|HÁ ANOS *ERRADO*", vel: 0.065, y: 760, tam: 96, some: null }, function (P, K) {
    const t0 = K.t();
    // monta letra por letra, guardando onde fica a palavra-chave
    const partes = []; let chave = false;
    for (const c of P.texto) { if (c === "*") { chave = !chave; continue; } partes.push([c, chave]); }
    let html = "", idx = 0, abriu = false;
    partes.forEach(([c, k], i) => {
      if (k && !abriu) { html += `<span class="kw" style="position:relative;display:inline-block"><span class="kbg" style="position:absolute;left:-.12em;right:-.12em;top:.08em;bottom:.06em;background:${AZ};transform-origin:left center;transform:scaleX(0);z-index:-1"></span>`; abriu = true; }
      if (!k && abriu) { html += "</span>"; abriu = false; }
      if (c === "|") { html += "<br>"; return; }
      html += `<span class="ch" data-i="${idx}" style="opacity:0">${c === " " ? "&nbsp;" : c}</span><span class="cur" style="display:inline-block;width:0;height:1em;vertical-align:top;position:relative;opacity:0"><i style="position:absolute;left:.04em;top:.1em;width:.5em;height:.92em;background:${AZ};box-shadow:0 0 18px rgba(47,116,242,.9)"></i></span>`;
      idx++;
    });
    if (abriu) html += "</span>";
    const tx = K.el(html, `left:60px;width:960px;top:${P.y}px;font-weight:900;font-style:italic;font-size:${P.tam}px;line-height:1.15;isolation:isolate`);
    tx.classList.add("sombra-txt"); tx.style.fontWeight = 900;
    const chs = tx.querySelectorAll(".ch"), curs = tx.querySelectorAll(".cur");
    let t = t0;
    chs.forEach((c, i) => {
      K.set(c, { opacity: 1 }, t);
      K.set(curs[i], { opacity: 1 }, t);
      if (i + 1 < chs.length) K.set(curs[i], { opacity: 0 }, t + P.vel);
      if (c.textContent.trim()) K.sfx("tecla", t, 0.35 + K.rnd() * 0.25);
      t += P.vel * (c.textContent.trim() ? 1 : 1.6);
    });
    const tf = t, last = curs[curs.length - 1];
    K.ft(last, { opacity: 1 }, { opacity: 0, duration: 0.01, repeat: 7, repeatDelay: 0.25, yoyo: true }, tf + 0.25);
    const kb = tx.querySelector(".kbg");
    if (kb) { K.ft(kb, { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: "expo.out" }, tf + 0.1); K.sfx("pop", tf + 0.1, 0.6); K.ft(tx.querySelector(".kw"), { scale: 1 }, { scale: 1.08, duration: 0.12, yoyo: true, repeat: 1 }, tf + 0.1); }
    if (P.some != null) K.to(tx, { opacity: 0, duration: 0.2 }, K.t(P.some));
  });

  // ---------- 28 Contagem regressiva do gancho ----------
  MB.def("28", { em: 0, numero: 3, texto: "ERROS QUE|*TRAVAM* SEU|AGACHAMENTO", canto_em: 1.8, trocas: [2.8, 4.0], y: 330 }, function (P, K) {
    const t0 = K.t();
    const num = K.el(String(P.numero), `left:0;top:${P.y}px;width:1080px;text-align:center;font-weight:900;font-style:italic;font-size:620px;line-height:.9;text-shadow:18px 18px 0 ${AZ},0 20px 60px rgba(0,0,0,.4);transform-origin:50% 50%`);
    gsap.set(num, { opacity: 0 });
    const tx = K.el(K.rich(P.texto), `left:40px;width:1000px;top:${P.y + 600}px;text-align:center;font-size:92px;line-height:1.1;opacity:0`); tx.classList.add("sombra-txt");
    K.ft(num, { opacity: 0, scale: 3 }, { opacity: 1, scale: 1, duration: 0.2, ease: "power4.in" }, t0);
    K.treme(K.cam, t0 + 0.2, 0.35, 14); K.sfx("grave", t0 + 0.15, 0.9);
    K.ft(tx, { opacity: 0, y: 40, filter: "blur(10px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.35, ease: "expo.out" }, t0 + 0.35);
    const tc = K.t(P.canto_em);
    K.to(tx, { opacity: 0, y: -30, duration: 0.2 }, tc - 0.1);
    const canto = { scale: 0.22, x: -540 + 150, y: -(P.y + 280) + 300 };
    K.to(num, Object.assign({ duration: 0.4, ease: "power3.inOut" }, canto), tc);
    const ring = K.el("", `left:58px;top:208px;width:184px;height:184px;border-radius:50%;background:${AZ};box-shadow:0 10px 30px rgba(0,0,0,.4);opacity:0`);
    ring.style.zIndex = 1; num.style.zIndex = 2;
    K.ft(ring, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, tc + 0.25);
    K.to(num, { textShadow: "0px 0px 0 rgba(31,102,229,0)", duration: 0.2 }, tc + 0.2);
    K.sfx("whoosh", tc, 0.5);
    P.trocas.forEach((tt, i) => {
      const t = K.t(tt), n = P.numero - i - 1;
      K.to(num, { scale: 1, x: 0, y: 0, textShadow: `18px 18px 0 ${AZ}`, duration: 0.25, ease: "power3.out" }, t);
      K.set(num, { textContent: String(n) }, t + 0.12);
      K.ft(num, { rotationX: 90 }, { rotationX: 0, duration: 0.2, ease: "back.out(2)" }, t + 0.12);
      K.treme(K.cam, t + 0.2, 0.25, 10); K.sfx("hit", t + 0.15, 0.8);
      K.to(num, Object.assign({ textShadow: "0px 0px 0 rgba(31,102,229,0)", duration: 0.35, ease: "power3.inOut" }, canto), t + 0.75);
      K.ft(ring, { scale: 1 }, { scale: 1.2, duration: 0.15, yoyo: true, repeat: 1 }, t + 1.05);
    });
  });

  // ---------- 29 Pergunta e resposta em balões ----------
  MB.def("29", {
    em: 0, contato: "MARIA BEATRIZ", sub: "fisioterapeuta · online",
    mensagens: [[0.4, "p", "Doutora, é normal estalar quando eu mexo o pescoço?"], [2.2, "m", "Na maioria das vezes, sim! O estalo é gás saindo da articulação. Dor junto é que não é normal."]],
    digitando: 0.9, y: 420, hora: "19:42"
  }, function (P, K) {
    const t0 = K.t();
    const pn = K.el("", `left:50px;top:${P.y}px;width:980px;opacity:0;border-radius:36px;overflow:hidden;background:rgba(8,20,47,.82);box-shadow:0 20px 60px rgba(0,0,0,.45);border:2px solid rgba(255,255,255,.18);text-transform:none`);
    const head = K.el(`<div style="width:86px;height:86px;border-radius:50%;background:${AZ};display:flex;align-items:center;justify-content:center;overflow:hidden"><img src="assets/logo_white.png" style="width:240px;margin-left:150px;max-width:none"/></div>
      <div><div style="font-weight:800;font-size:38px;text-transform:uppercase">${P.contato}</div><div style="font-size:28px;opacity:.75">${P.sub}</div></div>`,
      "position:relative;display:flex;gap:22px;align-items:center;padding:24px 30px;background:linear-gradient(90deg,#163e9c,#1f66e5)", pn);
    head.classList.remove("ab");
    const corpo = K.el("", "position:relative;padding:30px 30px 20px;display:flex;flex-direction:column;gap:22px;min-height:200px", pn); corpo.classList.remove("ab");
    K.ft(pn, { opacity: 0, y: 80, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "expo.out" }, t0);
    P.mensagens.forEach(([tm, quem, txt], i) => {
      const t = K.t(tm), m = quem === "m";
      if (m && P.digitando) {
        const dg = K.el(`<i></i><i></i><i></i>`, `position:relative;align-self:flex-end;display:flex;gap:10px;padding:22px 28px;border-radius:30px 30px 6px 30px;background:${AZ};opacity:0;height:0;overflow:hidden`, corpo);
        dg.classList.remove("ab"); dg.querySelectorAll("i").forEach((d) => d.setAttribute("style", "display:block;width:16px;height:16px;border-radius:50%;background:#fff"));
        const td = t - P.digitando;
        K.set(dg, { opacity: 1, height: "auto" }, td);
        K.ft(dg.querySelectorAll("i"), { y: 0 }, { y: -10, duration: 0.18, yoyo: true, repeat: Math.max(1, Math.floor(P.digitando / 0.18) - 1), stagger: 0.09, ease: "sine.inOut" }, td);
        K.set(dg, { opacity: 0, height: 0, padding: 0 }, t);
      }
      const b = K.el(`${txt}<span style="display:block;text-align:right;font-size:22px;opacity:.7;margin-top:6px">${P.hora}${m ? " ✓✓" : ""}</span>`,
        `position:relative;max-width:760px;align-self:${m ? "flex-end" : "flex-start"};padding:20px 28px 14px;font-size:40px;line-height:1.25;font-weight:${m ? 600 : 500};border-radius:${m ? "30px 30px 6px 30px" : "30px 30px 30px 6px"};background:${m ? AZ : "#e9efff"};color:${m ? "#fff" : "#0a1b3f"};opacity:0;display:none`, corpo);
      b.classList.remove("ab");
      K.set(b, { display: "block" }, t);
      K.ft(b, { opacity: 0, y: 30, scale: 0.85, transformOrigin: m ? "100% 100%" : "0% 100%" }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(2)" }, t);
      K.sfx("pop", t, 0.6);
    });
  });

  // ---------- 30 Mito ou verdade com placa virando ----------
  MB.def("30", { em: 0, resultado: "MITO", giros: 3, dur: 1.6, explicacao: "O ESTALO|NÃO É *OSSO*", y: 560 }, function (P, K) {
    const t0 = K.t(), W = 700, Hh = 400, verdade = /VERD/i.test(P.resultado);
    const cena = K.el("", `left:${540 - W / 2}px;top:${P.y}px;width:${W}px;height:${Hh}px;perspective:1600px;opacity:0`);
    const face = (txt, bg, rot) => K.el(`<div class="tt" style="font-weight:900;font-style:italic;font-size:130px;line-height:1">${txt}</div>`,
      `left:0;top:0;width:${W}px;height:${Hh}px;border-radius:40px;display:flex;align-items:center;justify-content:center;background:${bg};backface-visibility:hidden;-webkit-backface-visibility:hidden;border:4px solid rgba(255,255,255,.35);box-shadow:0 30px 60px rgba(0,0,0,.45);transform:rotateY(${rot}deg)`, cena);
    const f1 = face("MITO?", "linear-gradient(160deg,#163e9c,#0a1b3f)", 0), f2 = face("VERDADE?", `linear-gradient(160deg,#2f74f2,#1546b8)`, 180);
    const giro = 180 * (2 * P.giros + (verdade ? 1 : 0));
    K.ft(cena, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, t0);
    const o = { a: 0 };
    K.ticker((t) => { const k = Math.min(1, (t - t0 - 0.2) / P.dur), e = 1 - Math.pow(1 - Math.max(0, k), 3); const a = giro * e; f1.style.transform = `rotateY(${a}deg)`; f2.style.transform = `rotateY(${a + 180}deg)`; }, t0, t0 + 0.2 + P.dur);
    const n = giro / 180;
    for (let i = 1; i <= n; i++) { const f = i / n, x = 1 - Math.cbrt(1 - f); K.sfx("virar", t0 + 0.2 + x * P.dur - 0.05, 0.5); }
    const tf = t0 + 0.2 + P.dur;
    const ft = verdade ? f2 : f1;
    K.set(ft.querySelector(".tt"), { textContent: verdade ? "VERDADE!" : "MITO!" }, tf);
    K.ft(cena, { scale: 1.15 }, { scale: 1, duration: 0.35, ease: "back.out(3)" }, tf);
    K.treme(K.cam, tf, 0.25, 10);
    K.sfx("selo", tf, 0.9);
    const ex = K.el(K.rich(P.explicacao), `left:40px;width:1000px;top:${P.y + Hh + 50}px;text-align:center;font-size:86px;line-height:1.1;opacity:0`); ex.classList.add("sombra-txt");
    K.ft(ex, { opacity: 0, y: 40, filter: "blur(10px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.35, ease: "expo.out" }, tf + 0.35);
  });
})();
