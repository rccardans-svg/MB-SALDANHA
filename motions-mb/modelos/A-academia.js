/* Grupo A. Academia e carga (pesos, contadores, equipamento). Motions 01 a 10. */
(function () {
  const AZ = "#1f66e5", MA = "#0a1b3f";

  // ---------- 01 Barra que carrega ----------
  MB.def("01", {
    em: 0, y: 250, titulo: "CARGA NA BARRA", kg_barra: 20, kg_anilha: 20, max_anilhas: 4, ate: null,
    eventos: [[0.5, "carrega", 1], [1.4, "carrega", 1], [2.4, "cai", 1], [3.3, "carrega", 2]]
  }, function (P, K) {
    const t0 = K.t(), fim = P.ate != null ? K.t(P.ate) : null;
    const pn = K.vidro(`left:60px;top:${P.y}px;width:960px;height:360px;opacity:0`);
    K.ft(pn, { opacity: 0, x: -900 }, { opacity: 1, x: 0, duration: 0.5, ease: "expo.out" }, t0);
    K.ft(pn.querySelector(".brilho"), { x: -400 }, { x: 1600, duration: 1.3, ease: "power2.inOut" }, t0 + 0.3);
    K.sfx("whoosh", t0, 0.5);
    // barra
    const bar = K.el("", "left:40px;top:118px;width:880px;height:18px;border-radius:9px;background:linear-gradient(180deg,#f3f6fb,#9aa6b8 55%,#5d6778);box-shadow:0 4px 10px rgba(0,0,0,.45)", pn);
    K.el("", "left:270px;top:92px;width:20px;height:70px;border-radius:5px;background:linear-gradient(90deg,#cfd6e2,#7a8597)", pn);
    K.el("", "left:670px;top:92px;width:20px;height:70px;border-radius:5px;background:linear-gradient(90deg,#cfd6e2,#7a8597)", pn);
    K.el(`<span class="fina" style="font-size:30px;letter-spacing:.08em">${P.titulo}</span>`, "left:40px;top:262px;opacity:.9", pn);
    const kgw = K.el('<span class="kgn">0</span><small style="font-size:40px;font-weight:800;margin-left:12px">KG</small>', "right:40px;top:226px;font-weight:900;font-style:italic;font-size:100px;line-height:1", pn);
    const kgn = kgw.querySelector(".kgn"); kgn.textContent = P.kg_barra;
    const N = P.max_anilhas, PW = 34, L = [], R = [];
    for (let i = 0; i < N; i++) {
      const mk = (x) => K.el('<div style="position:absolute;inset:0;border-radius:10px;background:#e04646;opacity:0" class="r"></div><div style="position:absolute;left:11px;top:14px;width:7px;height:182px;border-radius:4px;background:rgba(255,255,255,.22)"></div>',
        `left:${x}px;top:22px;width:${PW - 4}px;height:210px;border-radius:10px;opacity:0;background:linear-gradient(90deg,#0f2f7a,#2f74f2 40%,#1f66e5 60%,#0c2766);box-shadow:0 6px 14px rgba(0,0,0,.45),inset 0 0 0 2px rgba(255,255,255,.18)`, pn);
      L.push(mk(270 - PW * (i + 1))); R.push(mk(690 + PW * i));
    }
    let k = 0, kg = P.kg_barra;
    P.eventos.forEach(([te, tipo, n]) => {
      const t = K.t(te);
      if (tipo === "carrega") {
        for (let j = 0; j < n && k < N; j++, k++) {
          const tt = t + j * 0.14;
          K.ft(L[k], { opacity: 1, x: -520 }, { opacity: 1, x: 0, duration: 0.32, ease: "power3.out" }, tt);
          K.ft(R[k], { opacity: 1, x: 520 }, { opacity: 1, x: 0, duration: 0.32, ease: "power3.out" }, tt);
          K.set([L[k].querySelector(".r"), R[k].querySelector(".r")], { opacity: 0 }, tt);
          K.sfx("metal", tt + 0.28, 0.5);
        }
        K.ft(bar, { y: 0 }, { y: 7, duration: 0.07, yoyo: true, repeat: 3, ease: "none" }, t + 0.3);
      } else {
        for (let j = 0; j < n && k > 0; j++) {
          k--; const tt = t + j * 0.14;
          [[L[k], -1], [R[k], 1]].forEach(([p, s]) => {
            K.ft(p.querySelector(".r"), { opacity: 0 }, { opacity: 1, duration: 0.1 }, tt);
            K.ft(p, { opacity: 1, x: 0, y: 0, rotation: 0 }, {
              keyframes: [{ y: 300, x: s * 40, rotation: s * 10, duration: 0.3, ease: "power2.in" }, { y: 220, rotation: s * 4, duration: 0.13, ease: "power2.out" },
              { y: 300, rotation: s * 12, duration: 0.13, ease: "power2.in" }, { y: 272, duration: 0.07, ease: "power2.out" }, { y: 300, duration: 0.07, ease: "power2.in" },
              { opacity: 0, duration: 0.25 }]
            }, tt + 0.1);
          });
          K.sfx("quica", tt + 0.4, 0.55);
        }
      }
      const novo = P.kg_barra + 2 * P.kg_anilha * k, d = novo - kg;
      if (d) {
        K.conta(kgn, kg, novo, t + 0.1, 0.45);
        const b = K.el(`${d > 0 ? "+" : "−"}${Math.abs(d)} KG`, `right:80px;top:${P.y + 380}px;font-weight:900;font-style:italic;font-size:56px;padding:4px 22px 8px;border-radius:14px;background:${d > 0 ? AZ : "#e04646"};opacity:0;box-shadow:0 8px 24px rgba(0,0,0,.35)`);
        K.ft(b, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.22, ease: "back.out(3)" }, t + 0.1);
        K.to(b, { y: -40, opacity: 0, duration: 0.4, ease: "power1.in" }, t + 0.75);
        kg = novo;
      }
    });
    if (fim) { K.to(pn, { x: -1000, opacity: 0, duration: 0.35, ease: "power3.in" }, fim); }
  });

  // ---------- 02 Contador de repetições gigante ----------
  MB.def("02", {
    em: 0, reps: [0.4, 1.3, 2.2, 3.1, 4.0], frase: "*TÉCNICA*|ANTES DE CARGA", rotulo: "REPS", y: 640
  }, function (P, K) {
    const n = P.reps.length;
    const badge = K.el(`<i style="font-style:italic;font-size:70px;background:${AZ};border-radius:16px;padding:0 16px 4px" class="bn">00</i><span style="font-size:34px;background:rgba(5,14,36,.72);padding:6px 14px 8px;border-radius:10px">${P.rotulo}</span>`,
      "right:46px;top:250px;display:flex;align-items:center;gap:12px;font-weight:900;opacity:0");
    const bn = badge.querySelector(".bn");
    P.reps.forEach((r, i) => {
      const t = K.t(r), ult = i === n - 1;
      const num = K.el(String(i + 1).padStart(2, "0"), `left:0;top:${P.y}px;width:1080px;text-align:center;font-weight:900;font-style:italic;font-size:560px;line-height:1;letter-spacing:-.04em;opacity:0;text-shadow:16px 16px 0 ${AZ},0 20px 60px rgba(0,0,0,.45)`);
      K.ft(num, { opacity: 0, scale: 2.3 }, { opacity: 1, scale: 1, duration: 0.16, ease: "power4.in" }, t - 0.16);
      K.treme(K.cam, t, 0.28, 9);
      K.sfx("hit", t - 0.02, 0.8);
      if (!ult) {
        K.to(num, { scale: 0.13, x: 400, y: -(P.y + 280 - 300), opacity: 0, duration: 0.32, ease: "power3.in" }, t + 0.32);
        K.set(badge, { opacity: 1 }, t + 0.6);
        K.set(bn, { textContent: String(i + 1).padStart(2, "0") }, t + 0.62);
        K.ft(badge, { scale: 1.25 }, { scale: 1, duration: 0.2, ease: "back.out(3)" }, t + 0.62);
      } else {
        K.to(num, { scale: 1.3, opacity: 0, duration: 0.18, ease: "power2.out" }, t + 0.38);
        K.particulas(540, P.y + 290, 110, t + 0.4, { forca: 1100, tam: 46, gravidade: 600, dur: 1.6 });
        K.sfx("grave", t + 0.38, 0.9); K.sfx("confete", t + 0.4, 0.5);
        K.set(bn, { textContent: String(n).padStart(2, "0") }, t + 0.4);
        const fr = K.el(K.rich(P.frase), `left:40px;top:${P.y + 140}px;width:1000px;text-align:center;font-size:104px;line-height:1.12;opacity:0`);
        fr.classList.add("sombra-txt");
        K.ft(fr, { opacity: 0, scale: 1.5, filter: "blur(16px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.35, ease: "expo.out" }, t + 0.55);
      }
    });
  });

  // ---------- 03 Cronômetro de descanso ----------
  MB.def("03", { em: 0, dur: 3.0, segundos: 60, texto: "DESCANSO", sub: "RESPIRA E VOLTA", y: 560 }, function (P, K) {
    const t0 = K.t(), t1 = t0 + P.dur;
    const ov = K.el("", `inset:0;background:rgba(8,20,47,.5);opacity:0`);
    K.ft(ov, { opacity: 0 }, { opacity: 1, duration: 0.2 }, t0); K.to(ov, { opacity: 0, duration: 0.2 }, t1);
    const R = 250, C = 2 * Math.PI * R;
    const box = K.svg(`<circle cx="300" cy="300" r="${R}" fill="rgba(10,27,63,.55)" stroke="rgba(255,255,255,.16)" stroke-width="30"/>
      <circle class="pr" cx="300" cy="300" r="${R}" fill="none" stroke="${AZ}" stroke-width="30" stroke-linecap="round" transform="rotate(-90 300 300)" stroke-dasharray="${C}" stroke-dashoffset="0" style="filter:drop-shadow(0 0 16px rgba(47,116,242,.9))"/>
      ${Array.from({ length: 60 }, (_, i) => { const a = i / 60 * Math.PI * 2, r1 = i % 5 ? 196 : 186; return `<line x1="${300 + Math.sin(a) * r1}" y1="${300 - Math.cos(a) * r1}" x2="${300 + Math.sin(a) * 210}" y2="${300 - Math.cos(a) * 210}" stroke="rgba(255,255,255,${i % 5 ? .25 : .6})" stroke-width="${i % 5 ? 3 : 5}"/>`; }).join("")}`,
      600, 600, `left:240px;top:${P.y}px;width:600px;height:600px;opacity:0`);
    const pr = box.querySelector(".pr");
    const num = K.el("60", `left:240px;top:${P.y + 180}px;width:600px;text-align:center;font-weight:900;font-style:italic;font-size:220px;line-height:1;opacity:0`);
    const tx = K.el(`<span class="hl" style="font-size:76px;padding:4px 26px 10px">${P.texto}</span>`, `left:0;top:${P.y + 640}px;width:1080px;text-align:center;opacity:0`);
    const sb = K.el(P.sub, `left:0;top:${P.y + 760}px;width:1080px;text-align:center;font-weight:400;font-size:40px;letter-spacing:.1em;opacity:0`);
    K.ft(box, { opacity: 0, scale: 0.6, rotation: -40 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.4, ease: "back.out(1.6)" }, t0 + 0.05);
    K.ft(num, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, t0 + 0.15);
    K.ft(tx, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3, ease: "expo.out" }, t0 + 0.3);
    K.ft(sb, { opacity: 0 }, { opacity: .9, duration: 0.3 }, t0 + 0.5);
    const a = t0 + 0.35, b = t1 - 0.25;
    K.ft(pr, { strokeDashoffset: 0 }, { strokeDashoffset: C, duration: b - a, ease: "none" }, a);
    K.conta(num, P.segundos, 0, a, b - a, (v) => String(Math.ceil(v)).padStart(2, "0"), "none");
    for (let t = a; t < b; t += 0.25) K.sfx("tique", t, 0.45);
    K.ft(num, { scale: 1 }, { scale: 1.25, duration: 0.12, yoyo: true, repeat: 1 }, b);
    K.to([box, num, tx, sb], { opacity: 0, scale: 1.3, duration: 0.22, ease: "power2.in" }, t1 - 0.05);
    K.ft(K.cam, { scale: 1.08 }, { scale: 1, duration: 0.45, ease: "expo.out" }, t1);
    K.treme(K.cam, t1, 0.35, 22);
    K.sfx("grave", t1, 0.9); K.sfx("apito", b, 0.4);
  });

  // ---------- 04 Plano de treino na prancheta ----------
  MB.def("04", {
    em: 0, titulo: "TREINO DE HOJE", itens: ["3X12 AGACHAMENTO", "3X10 REMADA CURVADA", "3X15 ELEVAÇÃO PÉLVICA"],
    escrever: [0.6, 1.3, 2.0], riscar: [2.9, 3.6, 4.3], x: 40, y: 330, sai: null
  }, function (P, K) {
    const n = P.itens.length, h = 210 + n * 120, t0 = K.t();
    const pr = K.vidro(`left:${P.x}px;top:${P.y}px;width:700px;height:${h}px;opacity:0`);
    const clip = K.el("", `left:${P.x + 250}px;top:${P.y - 34}px;width:200px;height:70px;border-radius:14px;opacity:0;background:linear-gradient(180deg,#e9eef7,#8e9ab0);box-shadow:0 6px 16px rgba(0,0,0,.4)`);
    K.el("", "left:70px;top:18px;width:60px;height:18px;border-radius:9px;background:#5d6778", clip);
    K.el(`<span class="hl" style="font-size:50px;padding:2px 18px 6px">${P.titulo}</span>`, "left:40px;top:60px", pr);
    K.ft([pr, clip], { opacity: 0, x: -760, rotation: -8 }, { opacity: 1, x: 0, rotation: 0, duration: 0.55, ease: "back.out(1.3)" }, t0);
    K.ft(pr.querySelector(".brilho"), { x: -400 }, { x: 1500, duration: 1.2 }, t0 + 0.4);
    K.sfx("whoosh", t0, 0.5);
    const pen = K.svg(`<g transform="rotate(35 20 120)"><rect x="8" y="0" width="26" height="150" rx="9" fill="${AZ}" stroke="#fff" stroke-width="3"/><rect x="8" y="0" width="26" height="30" rx="9" fill="#0a1b3f"/><path d="M8 150 L21 186 L34 150 Z" fill="#e9eef7"/><path d="M17 175 L21 186 L25 175 Z" fill="${AZ}"/></g>`,
      60, 200, `left:0;top:0;opacity:0;z-index:5`, pr);
    P.itens.forEach((it, i) => {
      const y = 170 + i * 120;
      K.el("", `left:40px;top:${y + 78}px;width:620px;height:2px;background:rgba(255,255,255,.16)`, pr);
      const tx = K.el(it, `left:44px;top:${y}px;font-weight:700;font-size:46px;white-space:nowrap;clip-path:inset(0 100% 0 0)`, pr);
      const w = Math.min(620, it.length * 46 * 0.72);
      const te = K.t(P.escrever[i]), dur = Math.max(0.45, it.length * 0.035);
      K.ft(tx, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: dur, ease: "none" }, te);
      K.ft(pen, { opacity: 1, x: 30, y: y - 150 }, { x: 30 + w, y: y - 150, duration: dur, ease: "none" }, te);
      K.sfx("caneta", te, 0.6);
      if (P.riscar && P.riscar[i] != null) {
        const tr = K.t(P.riscar[i]);
        const ln = K.el("", `left:36px;top:${y + 30}px;width:${w + 16}px;height:10px;border-radius:5px;background:${AZ};transform-origin:left center;transform:scaleX(0);box-shadow:0 0 12px rgba(47,116,242,.8)`, pr);
        K.ft(ln, { scaleX: 0 }, { scaleX: 1, duration: 0.28, ease: "power2.out" }, tr);
        K.to(tx, { opacity: 0.55, duration: 0.2 }, tr + 0.1);
        const ck = K.el("✓", `left:${Math.min(600, w + 70)}px;top:${y - 6}px;width:62px;height:62px;border-radius:50%;background:${AZ};font-weight:900;font-size:40px;display:flex;align-items:center;justify-content:center;opacity:0`, pr);
        K.ft(ck, { opacity: 0, scale: 2 }, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(3)" }, tr + 0.15);
        K.sfx("pop", tr + 0.15, 0.6);
      }
    });
    const ultimo = Math.max(...P.escrever.map((x, i) => x + P.itens[i].length * 0.035));
    K.to(pen, { opacity: 0, duration: 0.2 }, K.t(ultimo + 0.1));
    if (P.sai != null) K.to([pr, clip], { x: -800, opacity: 0, duration: 0.35, ease: "power3.in" }, K.t(P.sai));
  });

  // ---------- 05 Medidor de esforço (RPE) ----------
  MB.def("05", { em: 0, pontos: [[0.3, 2], [1.3, 5], [2.3, 7], [3.2, 9], [4.2, 10]], titulo: "ESFORÇO", x: 880, y: 420, altura: 900 }, function (P, K) {
    const t0 = K.t(), Hh = P.altura, X = P.x, Y = P.y;
    const tubo = K.vidro(`left:${X}px;top:${Y}px;width:110px;height:${Hh}px;border-radius:55px;opacity:0`);
    const fill = K.el("", `left:14px;bottom:14px;width:82px;height:0px;border-radius:41px;background:linear-gradient(0deg,#163e9c,#1f66e5 55%,#2f74f2);box-shadow:0 0 30px rgba(47,116,242,.8)`, tubo);
    const lim = K.el("", `left:14px;top:14px;width:82px;height:${(Hh - 28) * 0.2}px;border-radius:41px 41px 8px 8px;background:#e04646;opacity:0`, tubo);
    for (let i = 1; i < 10; i++) K.el("", `left:20px;top:${14 + (Hh - 28) * (1 - i / 10)}px;width:70px;height:3px;background:rgba(255,255,255,.35)`, tubo);
    const tit = K.el(`<span class="hl" style="font-size:44px">${P.titulo}</span>`, `left:${X - 90}px;top:${Y - 92}px;opacity:0`);
    const zonas = [["FÁCIL", 0, 4], ["PUXADO", 4, 7.5], ["NO LIMITE", 7.5, 10]];
    const hz = (v) => (Hh - 28) * v / 10;
    const zl = zonas.map(([z, a, b]) => K.el(`<span style="display:inline-block;transform:rotate(-90deg);white-space:nowrap;font-weight:900;font-size:26px;letter-spacing:.12em">${z}</span>`,
      `left:0;top:${14 + (Hh - 28) - hz(b)}px;width:110px;height:${hz(b - a)}px;display:flex;align-items:center;justify-content:center;opacity:.35;z-index:2`, tubo));
    const ptr = K.el('<div style="display:flex;align-items:baseline"><span class="pv" style="font-size:92px;font-weight:900;font-style:italic;line-height:1">0</span><span style="font-size:30px;font-weight:800;margin-left:8px">RPE</span></div><div class="pz" style="font-size:28px;font-weight:800;letter-spacing:.06em;margin-top:2px">FÁCIL</div>',
      `right:${1080 - X + 24}px;top:0;padding:8px 22px 12px;border-radius:18px;background:${AZ};box-shadow:0 10px 30px rgba(0,0,0,.4);opacity:0;text-align:right`);
    const pv = ptr.querySelector(".pv"), pz = ptr.querySelector(".pz");
    const yv = (v) => Y + 14 + (Hh - 28) * (1 - v / 10) - 70;
    K.ft([tubo, tit], { opacity: 0, x: 200 }, { opacity: 1, x: 0, duration: 0.45, ease: "expo.out" }, t0);
    let v0 = 0;
    P.pontos.forEach(([tp, v], i) => {
      const t = K.t(tp);
      K.ft(fill, { height: (Hh - 28) * v0 / 10 }, { height: (Hh - 28) * v / 10, duration: 0.5, ease: "power2.out" }, t);
      if (i === 0) K.ft(ptr, { opacity: 0, y: yv(0), x: 60 }, { opacity: 1, y: yv(v), x: 0, duration: 0.5, ease: "power2.out" }, t);
      else K.ft(ptr, { y: yv(v0) }, { y: yv(v), duration: 0.5, ease: "power2.out" }, t);
      K.conta(pv, v0, v, t, 0.5);
      const zi = v < 5 ? 0 : v < 8 ? 1 : 2;
      zl.forEach((z, j) => K.to(z, { opacity: j === zi ? 1 : 0.35, duration: 0.2 }, t + 0.2));
      K.set(pz, { textContent: zonas[zi][0] }, t + 0.2);
      K.sfx(v >= 9 ? "erro" : "pop", t + 0.15, v >= 9 ? 0.35 : 0.5);
      if (v >= 9) {
        K.ft(lim, { opacity: 0 }, { opacity: 0.8, duration: 0.15, yoyo: true, repeat: 5 }, t + 0.3);
        K.to(ptr, { background: "#e04646", duration: 0.15 }, t + 0.3);
        const fimT = i + 1 < P.pontos.length ? K.t(P.pontos[i + 1][0]) : K.D;
        K.ticker((tt) => { gsap.set(ptr, { x: Math.sin(tt * 97) * 6, rotation: Math.sin(tt * 61) * 2.2 }); }, t + 0.5, Math.min(fimT, K.D));
        K.ticker((tt) => { gsap.set(tubo, { x: Math.sin(tt * 83) * 4 }); }, t + 0.5, Math.min(fimT, K.D));
      }
      v0 = v;
    });
  });

  // ---------- 06 Anilhas como tópicos ----------
  MB.def("06", { em: 0, dicas: [[0.3, "ABDÔMEN|TRAVADO"], [1.9, "BARRA|RENTE"], [3.5, "EMPURRE|O CHÃO"]], barra_y: 250, y: 760, segura: 0.55 }, function (P, K) {
    const t0 = K.t();
    const bar = K.svg(`<rect x="0" y="22" width="1000" height="18" rx="9" fill="url(#gb)"/><defs><linearGradient id="gb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3f6fb"/><stop offset=".55" stop-color="#9aa6b8"/><stop offset="1" stop-color="#5d6778"/></linearGradient></defs>
      <rect x="180" y="4" width="20" height="54" rx="5" fill="#b8c1d0"/><rect x="800" y="4" width="20" height="54" rx="5" fill="#b8c1d0"/>`, 1000, 62, `left:40px;top:${P.barra_y}px;opacity:0`);
    K.ft(bar, { opacity: 0, scaleX: 0.2 }, { opacity: 1, scaleX: 1, duration: 0.4, ease: "expo.out" }, t0);
    const D = 470;
    P.dicas.forEach(([td, txt], i) => {
      const t = K.t(td);
      const disco = K.svg(`<defs><radialGradient id="dg${i}${K.uid}" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#2f74f2"/><stop offset=".6" stop-color="#1f66e5"/><stop offset="1" stop-color="#0c2766"/></radialGradient></defs>
        <circle cx="${D / 2}" cy="${D / 2}" r="${D / 2 - 4}" fill="url(#dg${i}${K.uid})" stroke="rgba(255,255,255,.35)" stroke-width="4"/>
        <circle cx="${D / 2}" cy="${D / 2}" r="${D / 2 - 34}" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="10"/>
        <circle cx="${D / 2}" cy="${D / 2}" r="${D / 2 - 70}" fill="none" stroke="rgba(10,27,63,.35)" stroke-width="3"/>
        <circle cx="${D / 2}" cy="${D / 2}" r="30" fill="#0a1b3f" stroke="#cfd6e2" stroke-width="8"/>
        <text x="${D / 2}" y="${D / 2 - 120}" text-anchor="middle" font-family="M" font-weight="800" font-size="30" fill="rgba(255,255,255,.75)" letter-spacing="4">MB · ${String(i + 1).padStart(2, "0")}</text>`,
        D, D, `left:${540 - D / 2}px;top:${P.y}px;width:${D}px;height:${D}px;opacity:0;filter:drop-shadow(0 20px 30px rgba(0,0,0,.45))`);
      const tx = K.el(K.rich(txt), `left:0;top:${D / 2 + 50}px;width:${D}px;text-align:center;font-weight:900;font-style:italic;font-size:58px;line-height:1.02;transform:translateY(-50%)`, disco);
      K.ft(disco, { opacity: 1, x: 900, rotation: -540 }, { x: 0, rotation: 0, duration: 0.75, ease: "power3.out" }, t);
      K.sfx("whoosh", t, 0.5); K.sfx("metal", t + 0.65, 0.25);
      const tf = t + 0.75 + P.segura;
      const slot = i % 4;
      const lado = [[860 + slot * 40, 1], [180 - slot * 40, -1]];
      K.to(disco, { scale: 0.12, x: lado[0][0] - 540 + 10, y: P.barra_y + 31 - P.y - D / 2, rotation: 360, opacity: 0, duration: 0.38, ease: "power3.in" }, tf);
      lado.forEach(([x]) => {
        const pl = K.el("", `left:${x}px;top:${P.barra_y - 52}px;width:34px;height:166px;border-radius:9px;opacity:0;background:linear-gradient(90deg,#0f2f7a,#2f74f2 40%,#1f66e5 60%,#0c2766);box-shadow:0 6px 14px rgba(0,0,0,.45),inset 0 0 0 2px rgba(255,255,255,.18)`);
        K.ft(pl, { opacity: 0, scaleY: 0.3 }, { opacity: 1, scaleY: 1, duration: 0.18, ease: "back.out(3)" }, tf + 0.38);
      });
      K.ft(bar, { y: 0 }, { y: 6, duration: 0.06, yoyo: true, repeat: 3 }, tf + 0.42);
      K.sfx("trava", tf + 0.4, 0.8);
    });
  });

  // ---------- 07 Placar de evolução semana a semana ----------
  MB.def("07", {
    em: 0, titulo: "CARGA NO AGACHAMENTO", valores: [40, 55, 70, 90], rotulos: ["SEM 1", "SEM 2", "SEM 3", "SEM 4"], unidade: "KG",
    frase: "*EVOLUÇÃO* É TREINO|COM MÉTODO", y: 700, passo: 0.45
  }, function (P, K) {
    const t0 = K.t(), n = P.valores.length, Wp = 960, Hp = 660, maxv = Math.max(...P.valores);
    const pn = K.vidro(`left:60px;top:${P.y}px;width:${Wp}px;height:${Hp}px;opacity:0`);
    K.el(P.titulo, "left:44px;top:36px;font-weight:800;font-size:38px;letter-spacing:.04em", pn);
    K.el("", `left:44px;top:${Hp - 100}px;width:${Wp - 88}px;height:4px;background:rgba(255,255,255,.5)`, pn);
    for (let g = 1; g <= 3; g++) K.el("", `left:44px;top:${Hp - 100 - g * 110}px;width:${Wp - 88}px;height:2px;background:rgba(255,255,255,.1)`, pn);
    K.ft(pn, { opacity: 0, y: 120 }, { opacity: 1, y: 0, duration: 0.45, ease: "expo.out" }, t0);
    K.sfx("sobe", t0, 0.35);
    const bw = 130, gap = (Wp - 88 - n * bw) / (n - 1), topos = [];
    P.valores.forEach((v, i) => {
      const x = 44 + i * (bw + gap), h = 360 * v / maxv, t = t0 + 0.4 + i * P.passo;
      const b = K.el("", `left:${x}px;top:${Hp - 100 - h}px;width:${bw}px;height:${h}px;border-radius:14px 14px 4px 4px;transform-origin:bottom center;transform:scaleY(0);background:linear-gradient(180deg,${i === n - 1 ? "#2f74f2" : "#1f66e5"},#163e9c);box-shadow:${i === n - 1 ? "0 0 34px rgba(47,116,242,.9)" : "0 8px 20px rgba(0,0,0,.3)"}`, pn);
      const lb = K.el('<span class="v">0</span><small style="font-size:26px;margin-left:4px">' + P.unidade + "</small>", `left:${x - 20}px;top:${Hp - 160 - h}px;width:${bw + 40}px;text-align:center;font-weight:900;font-style:italic;font-size:52px;opacity:0`, pn);
      K.el(P.rotulos[i] || "", `left:${x - 20}px;top:${Hp - 84}px;width:${bw + 40}px;text-align:center;font-weight:700;font-size:30px;opacity:.85`, pn);
      K.ft(b, { scaleY: 0 }, { scaleY: 1, duration: 0.5, ease: "back.out(1.4)" }, t);
      K.ft(lb, { opacity: 0, y: h * 0.6 }, { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.4)" }, t);
      K.conta(lb.querySelector(".v"), 0, v, t, 0.5);
      K.sfx("pop", t, 0.5);
      topos.push([x + bw / 2, Hp - 100 - h - 70]);
    });
    const tl2 = t0 + 0.4 + n * P.passo;
    const d = "M" + topos.map((p) => p.join(" ")).join(" L");
    const [ax, ay] = topos[n - 1], [px, py] = topos[n - 2];
    const ang = Math.atan2(ay - py, ax - px) * 180 / Math.PI;
    const sv = K.svg(`<path class="ln" d="${d}" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="14 14" opacity=".9"/>
      <g class="sp" opacity="0" transform="translate(${ax} ${ay}) rotate(${ang})"><path d="M-6 -22 L26 0 L-6 22 Z" fill="#fff"/></g>`, Wp, Hp, "left:0;top:0", pn);
    const ln = sv.querySelector(".ln"); ln.style.strokeDasharray = "2000"; ln.style.strokeDashoffset = "2000";
    K.ft(ln, { strokeDashoffset: 2000 }, { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut" }, tl2);
    K.set(ln, { strokeDasharray: "14 14", strokeDashoffset: 0 }, tl2 + 0.71);
    K.ft(sv.querySelector(".sp"), { opacity: 0 }, { opacity: 1, duration: 0.1 }, tl2 + 0.65);
    const fr = K.el(K.rich(P.frase), `left:40px;top:${P.y + Hp + 40}px;width:1000px;text-align:center;font-weight:400;font-size:64px;line-height:1.15;opacity:0`); fr.classList.add("sombra-txt");
    K.ft(fr, { opacity: 0, y: 40, filter: "blur(10px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.4, ease: "expo.out" }, tl2 + 0.8);
    K.sfx("hit", tl2 + 0.8, 0.7);
  });

  // ---------- 08 Kit de equipamento da sala ----------
  const ICONES = {
    "BARRA": `<line x1="8" y1="100" x2="192" y2="100"/><rect x="34" y="58" width="18" height="84" rx="5"/><rect x="56" y="70" width="12" height="60" rx="4"/><rect x="148" y="58" width="18" height="84" rx="5"/><rect x="132" y="70" width="12" height="60" rx="4"/>`,
    "ANILHA": `<circle cx="100" cy="100" r="80"/><circle cx="100" cy="100" r="58"/><circle cx="100" cy="100" r="14"/><path d="M100 30 v14 M100 156 v14 M30 100 h14 M156 100 h14"/>`,
    "MEDICINE BALL": `<circle cx="100" cy="100" r="76"/><path d="M30 72 C70 92 130 92 170 72"/><path d="M30 128 C70 108 130 108 170 128"/><path d="M100 24 C82 70 82 130 100 176"/>`,
    "ESCADA": `<path d="M58 190 L82 14 M142 190 L118 14"/><path d="M61 166 h78 M65 136 h70 M69 106 h62 M73 76 h54 M77 46 h46"/>`,
    "MINI TRAMPOLIM": `<ellipse cx="100" cy="92" rx="84" ry="28"/><ellipse cx="100" cy="92" rx="58" ry="17"/><path d="M28 104 L20 160 M172 104 L180 160 M64 118 L60 170 M136 118 L140 170"/>`,
    "FITA DE SUSPENSÃO": `<circle cx="100" cy="22" r="12"/><path d="M100 34 L64 140 M100 34 L136 140"/><rect x="44" y="140" width="40" height="16" rx="8"/><rect x="116" y="140" width="40" height="16" rx="8"/><path d="M92 60 h16"/>`,
    "BANCO": `<rect x="20" y="86" width="160" height="26" rx="10"/><path d="M44 112 v56 M156 112 v56 M30 168 h28 M142 168 h28"/>`,
    "KETTLEBELL": `<path d="M64 80 C60 30 140 30 136 80"/><path d="M58 84 C20 120 40 180 100 180 C160 180 180 120 142 84 Z"/>`
  };
  MB.ICONES = ICONES;
  MB.def("08", { em: 0, titulo: "NOSSA *SALA*", itens: ["BARRA", "ANILHA", "MEDICINE BALL", "ESCADA", "MINI TRAMPOLIM", "FITA DE SUSPENSÃO"], revela: 2.6 }, function (P, K) {
    const t0 = K.t(), tr = K.t(P.revela), N = 8;
    const tiras = [];
    for (let i = 0; i < N; i++) {
      const w = 1080 / N;
      tiras.push(K.el("", `left:${i * w}px;top:0;width:${w + 1}px;height:1920px;background:radial-gradient(120% 80% at 50% 25%,#2a5fd0 0%,#163e9c 45%,#0a1b3f 100%);background-size:1080px 1920px;background-position:${-i * w}px 0;opacity:0`));
    }
    const tex = K.svg(`<filter id="nz${K.uid}"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="4"/><feColorMatrix type="saturate" values="0"/></filter><rect width="1080" height="1920" filter="url(#nz${K.uid})"/>`, 1080, 1920, "left:0;top:0;opacity:0;mix-blend-mode:overlay");
    K.set(tiras, { opacity: 1 }, t0); K.set(tex, { opacity: 0.12 }, t0);
    const tit = K.el(K.rich(P.titulo), "left:0;top:250px;width:1080px;text-align:center;font-weight:400;font-size:84px;opacity:0");
    K.ft(tit, { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: 0.4, ease: "expo.out" }, t0 + 0.1);
    const icons = [];
    P.itens.forEach((nm, i) => {
      const col = i % 2, row = Math.floor(i / 2), cx = 300 + col * 480, cy = 590 + row * 400;
      const ic = K.svg(`<g transform="scale(1.4)" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">${ICONES[nm] || ICONES["ANILHA"]}</g>`, 280, 280, `left:${cx - 140}px;top:${cy - 180}px;opacity:0`);
      const lb = K.el(nm, `left:${cx - 230}px;top:${cy + 115}px;width:460px;text-align:center;font-weight:800;font-size:38px;letter-spacing:.04em;opacity:0`);
      const ti = t0 + 0.25 + i * 0.13;
      K.ft(ic, { opacity: 1, y: -900, rotation: (i % 2 ? 1 : -1) * 40 }, { y: 0, rotation: 0, duration: 0.6, ease: "bounce.out" }, ti);
      K.ft(lb, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.25 }, ti + 0.45);
      K.sfx("metal", ti + 0.35, 0.22);
      icons.push(ic, lb);
    });
    K.to(icons.concat([tit]), { opacity: 0, scale: 0.7, duration: 0.25, stagger: 0.03, ease: "power2.in" }, tr - 0.35);
    K.to(tex, { opacity: 0, duration: 0.3 }, tr);
    tiras.forEach((s, i) => K.to(s, { yPercent: i % 2 ? 100 : -100, duration: 0.5, ease: "power3.inOut" }, tr + Math.abs(i - (N - 1) / 2) * 0.05));
    K.sfx("whoosh", tr, 0.8);
    K.ft(K.cam, { scale: 1.12 }, { scale: 1, duration: 0.8, ease: "expo.out" }, tr + 0.1);
  });

  // ---------- 09 Escada de agilidade desenhada no chão ----------
  MB.def("09", {
    em: 0, passos: [0.3, 0.6, 0.9, 1.2, 1.5, 1.8, 2.1, 2.4], degraus: 8, tempo_final: null, x: 540, y: 1520, largura: 380, comprimento: 1000, angulo: 64, recorde: "NOVO|*RECORDE*"
  }, function (P, K) {
    const t0 = K.t(), n = P.degraus;
    const cont = K.el("", `left:${P.x - P.largura / 2}px;top:${P.y - P.comprimento}px;width:${P.largura}px;height:${P.comprimento}px;transform-origin:50% 100%;transform:perspective(1100px) rotateX(${P.angulo}deg);opacity:0`);
    const rail = (x) => K.el("", `left:${x}px;top:0;width:12px;height:100%;border-radius:6px;background:#1f66e5;box-shadow:0 0 18px rgba(47,116,242,.9)`, cont);
    rail(0); rail(P.largura - 12);
    const rungs = [];
    for (let i = 0; i < n; i++) {
      const y = P.comprimento - (i + 0.5) * P.comprimento / n;
      const r = K.el("", `left:12px;top:${y - 6}px;width:${P.largura - 24}px;height:12px;border-radius:6px;background:rgba(159,188,255,.55)`, cont);
      const cel = K.el("", `left:12px;top:${y + 6}px;width:${P.largura - 24}px;height:${P.comprimento / n - 12}px;background:rgba(47,116,242,.0)`, cont);
      rungs.push([r, cel]);
    }
    K.ft(cont, { opacity: 0, clipPath: "inset(100% 0 0 0)" }, { opacity: 0.92, clipPath: "inset(0% 0 0 0)", duration: 0.5, ease: "power2.out" }, t0);
    K.sfx("sobe", t0, 0.3);
    const tm = K.el('<span class="tv">00.00</span><small style="font-size:30px;margin-left:8px">S</small>', `left:340px;top:250px;width:400px;text-align:center;font-weight:900;font-style:italic;font-size:96px;padding:8px 0 14px;border-radius:24px;opacity:0`);
    tm.classList.add("vidro");
    const tv = tm.querySelector(".tv");
    K.ft(tm, { opacity: 0, y: -60 }, { opacity: 1, y: 0, duration: 0.35, ease: "expo.out" }, t0);
    const last = P.passos[P.passos.length - 1];
    const tf = P.tempo_final != null ? parseFloat(P.tempo_final) : last;
    K.conta(tv, 0, tf, K.t(P.passos[0]), last - P.passos[0], (v) => v.toFixed(2).padStart(5, "0"), "none");
    P.passos.forEach((tp, i) => {
      const t = K.t(tp), [r, cel] = rungs[i % n];
      K.ft(r, { background: "rgba(159,188,255,.55)" }, { background: "#ffffff", duration: 0.06 }, t);
      K.ft(cel, { background: "rgba(47,116,242,0.75)" }, { background: "rgba(47,116,242,0.12)", duration: 0.5, ease: "power2.out" }, t);
      K.sfx("tique", t, 0.6);
    });
    const tr = K.t(last) + 0.15;
    K.to(tm, { background: "#1f66e5", scale: 1.12, duration: 0.15, yoyo: true, repeat: 1 }, tr);
    const rc = K.el(K.rich(P.recorde), "left:0;top:420px;width:1080px;text-align:center;font-weight:400;font-size:100px;line-height:1.05;opacity:0");
    rc.classList.add("sombra-txt");
    K.ft(rc, { opacity: 0, scale: 2.2, rotation: -6 }, { opacity: 1, scale: 1, rotation: -4, duration: 0.25, ease: "power4.in" }, tr + 0.05);
    K.treme(K.cam, tr + 0.3, 0.3, 10);
    K.particulas(540, 520, 60, tr + 0.3, { forca: 800, gravidade: 900 });
    K.sfx("carimbo", tr + 0.28, 0.8); K.sfx("confete", tr + 0.3, 0.5);
  });

  // ---------- 10 Batimento cardíaco ----------
  MB.def("10", { em: 0, dur: 6, bpm: [[0, 80], [1.5, 165], [4.0, 165], [5.0, 92]], y: 1230, janela: 2.4 }, function (P, K) {
    const t0 = K.t(), t1 = t0 + P.dur;
    const pn = K.vidro(`left:40px;top:${P.y}px;width:1000px;height:300px;opacity:0`);
    const cv = K.el("", "left:0;top:0;width:720px;height:300px", pn, "canvas"); cv.width = 720; cv.height = 300;
    const lab = K.el(`<div style="display:flex;align-items:center;gap:14px"><svg class="cor" width="64" height="58" viewBox="0 0 64 58"><path d="M32 56 C10 40 0 28 0 16 C0 6 8 0 16 0 C24 0 30 6 32 10 C34 6 40 0 48 0 C56 0 64 6 64 16 C64 28 54 40 32 56 Z" fill="#e04646"/></svg><span style="font-size:34px;font-weight:800">BPM</span></div><div class="bpm" style="font-size:118px;font-weight:900;font-style:italic;line-height:1">80</div>`,
      "left:740px;top:40px;width:240px", pn);
    const cor = lab.querySelector(".cor"), bpmEl = lab.querySelector(".bpm");
    K.ft(pn, { opacity: 0, y: 120 }, { opacity: 1, y: 0, duration: 0.45, ease: "expo.out" }, t0);
    K.to(pn, { opacity: 0, y: 120, duration: 0.35, ease: "power2.in" }, t1 - 0.35);
    // fase acumulada (batidas) a partir da curva de BPM
    const dt = 1 / 240, curva = P.bpm, bpmEm = (x) => {
      if (x <= curva[0][0]) return curva[0][1];
      for (let i = 1; i < curva.length; i++) if (x <= curva[i][0]) { const [a, va] = curva[i - 1], [b, vb] = curva[i]; const k = (x - a) / (b - a); return va + (vb - va) * (0.5 - Math.cos(Math.PI * k) / 2); }
      return curva[curva.length - 1][1];
    };
    const tab = [0]; for (let x = dt; x <= P.dur + P.janela + 1; x += dt) tab.push(tab[tab.length - 1] + bpmEm(x - P.janela) / 60 * dt);
    const fase = (x) => { const i = Math.max(0, Math.min(tab.length - 1, Math.round((x + P.janela) / dt))); return tab[i]; };
    const ecg = (ph) => { const f = ph - Math.floor(ph); const g = (c, w, a) => a * Math.exp(-Math.pow((f - c) / w, 2)); return g(0.18, 0.035, 0.12) - g(0.30, 0.012, 0.18) + g(0.33, 0.014, 1.0) - g(0.36, 0.014, 0.32) + g(0.58, 0.05, 0.22); };
    const ctx = cv.getContext("2d");
    for (let b = Math.ceil(fase(0)); b < fase(P.dur); b++) {
      let lo = 0, hi = P.dur; for (let it = 0; it < 30; it++) { const m = (lo + hi) / 2; if (fase(m) < b + 0.33) lo = m; else hi = m; }
      K.sfx("bip", t0 + lo, 0.22);
    }
    K.ticker((tt) => {
      const x = tt - t0; ctx.clearRect(0, 0, 720, 300);
      ctx.strokeStyle = "rgba(255,255,255,.08)"; ctx.lineWidth = 2;
      for (let gx = 0; gx < 720; gx += 40) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, 300); ctx.stroke(); }
      for (let gy = 30; gy < 300; gy += 40) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(720, gy); ctx.stroke(); }
      ctx.lineWidth = 6; ctx.strokeStyle = "#2f74f2"; ctx.shadowColor = "rgba(47,116,242,.95)"; ctx.shadowBlur = 18; ctx.lineJoin = "round";
      ctx.beginPath();
      const N = 360;
      for (let i = 0; i <= N; i++) { const tx = x - P.janela + P.janela * i / N; const y = 190 - ecg(fase(tx)) * 150; const px = 30 + 640 * i / N; if (i) ctx.lineTo(px, y); else ctx.moveTo(px, y); }
      ctx.stroke(); ctx.shadowBlur = 0;
      const yl = 190 - ecg(fase(x)) * 150; ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(670, yl, 9, 0, Math.PI * 2); ctx.fill();
      bpmEl.textContent = Math.round(bpmEm(x));
      const f = fase(x) - Math.floor(fase(x)); const s = 1 + 0.22 * Math.exp(-Math.pow((f - 0.34) / 0.06, 2));
      cor.style.transform = `scale(${s})`;
    }, t0, t1);
  });
})();
