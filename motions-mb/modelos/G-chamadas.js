/* Grupo G. Chamadas e identidade. Motions 41 a 45.
   Saem dos roteiros: quase todo Reel termina pedindo para salvar, enviar, comentar uma palavra ou marcar um amigo,
   e a Maria se apresenta com nome e CREFITO. Visual: azul da MB com rótulos em letra de máquina (MONO). */
(function () {
  const AZ = "#1f66e5", CL = "#9fbcff";

  // ícones de traço (64 x 64). "d" = contorno; o mesmo desenho preenchido em azul entra no toque.
  const ICONES = {
    salvar: { d: "M19 6 H45 a5 5 0 0 1 5 5 V58 L32 45 L14 58 V11 a5 5 0 0 1 5 -5 Z" },
    enviar: { d: "M59 5 L5 26 L27 35 L36 59 Z", linha: "M59 5 L27 35" },
    curtir: { d: "M32 57 C11 42 4 30 4 20 C4 11 11 5 19.5 5 C25.5 5 30 8.5 32 13 C34 8.5 38.5 5 44.5 5 C53 5 60 11 60 20 C60 30 53 42 32 57 Z" },
    comentar: { d: "M32 6 C47.5 6 58.5 16.5 58.5 29.5 C58.5 42.5 47.5 52.5 32 52.5 C28.5 52.5 25 52 22 50.8 L8 57 L12.5 45.5 C8.2 41.3 5.5 35.8 5.5 29.5 C5.5 16.5 16.5 6 32 6 Z" },
    seguir: { d: "M24 8 a11 11 0 1 1 -0.01 0 Z M5 56 C5 43 13 35 24 35 C35 35 43 43 43 56 Z", linha: "M53 16 V36 M43 26 H63" },
    agenda: { d: "M10 13 H54 a5 5 0 0 1 5 5 V54 a5 5 0 0 1 -5 5 H10 a5 5 0 0 1 -5 -5 V18 a5 5 0 0 1 5 -5 Z", linha: "M5 26 H59 M20 6 V18 M44 6 V18" }
  };
  function icone(nome, tam, cor) {
    const I = ICONES[nome] || ICONES.salvar;
    return `<svg width="${tam}" height="${tam}" viewBox="0 0 64 64" style="overflow:visible;display:block">
      <path class="ench" d="${I.d}" fill="${cor || AZ}" style="opacity:0"/>
      <path class="cont" d="${I.d}" fill="none" stroke="#fff" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"/>
      ${I.linha ? `<path class="lin" d="${I.linha}" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round"/>` : ""}</svg>`;
  }
  const CHECK = (tam, cor) => `<svg width="${tam}" height="${tam}" viewBox="0 0 40 40" style="display:inline-block;vertical-align:middle"><circle cx="20" cy="20" r="19" fill="${cor || AZ}"/><path d="M11 20.5 L17.5 27 L29.5 14" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  // toque na tela: anel azul-claro que encosta e uma onda azul (nada de clarão branco)
  function toque(K, x, y, at) {
    const r = K.el("", `left:${x - 46}px;top:${y - 46}px;width:92px;height:92px;border-radius:50%;border:6px solid rgba(159,188,255,.95);background:rgba(31,102,229,.25);opacity:0;z-index:70`);
    K.ft(r, { opacity: 0, scale: 1.9 }, { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" }, at - 0.2);
    K.to(r, { scale: 0.74, duration: 0.07, ease: "power1.in" }, at);
    K.to(r, { opacity: 0, scale: 1.05, duration: 0.22, ease: "power1.out" }, at + 0.1);
    const o = K.el("", `left:${x - 60}px;top:${y - 60}px;width:120px;height:120px;border-radius:50%;border:5px solid ${AZ};opacity:0;z-index:69`);
    K.ft(o, { opacity: 0.95, scale: 0.6 }, { opacity: 0, scale: 2.8, duration: 0.6, ease: "power2.out" }, at);
    K.sfx("tecla", at, 0.9);
  }
  // texto que digita sozinho (determinístico: depende só do tempo)
  function digita(K, el, txt, at, vel, som) {
    const n = [...txt].length;
    K.ticker((t) => { const k = Math.max(0, Math.min(n, Math.floor((t - at) / vel + 0.0001))); el.textContent = [...txt].slice(0, k).join(""); }, at, at + n * vel + 0.01);
    if (som !== false) for (let i = 0; i < n; i++) if (txt[i] !== " ") K.sfx("tecla", at + i * vel, 0.3 + 0.2 * ((i * 7) % 3) / 2);
    return at + n * vel;
  }
  // letras embaralhadas que assentam (efeito de painel eletrônico), sempre igual em qualquer quadro
  function decodifica(K, el, txt, at, dur) {
    const S = "ABCDEFGHIJKLMNOPRSTUVXZ0123456789/#+", L = [...txt], n = L.length;
    const h = (a, b) => { let x = Math.imul(a + 1, 374761393) + Math.imul(b + 7, 668265263) | 0; x = Math.imul(x ^ (x >>> 13), 1274126177); return ((x ^ (x >>> 16)) >>> 0) / 4294967296; };
    K.ticker((t) => {
      const k = (t - at) / dur, f = Math.floor(t * 24); let s = "";
      for (let i = 0; i < n; i++) {
        const c = L[i];
        if (c === " ") { s += " "; continue; }
        if (k < (i / n) * 0.45) { s += " "; continue; }
        s += k >= 0.4 + (i / n) * 0.6 ? c : S[Math.floor(h(i, f) * S.length)];
      }
      el.textContent = s;
    }, at, at + dur);
  }
  function frase(K, txt, y, tam, at, peso) {
    const e = K.el(K.rich(txt), `left:50px;width:980px;top:${y}px;text-align:center;font-size:${tam}px;line-height:1.08;opacity:0`);
    e.classList.add("sombra-txt"); e.style.fontWeight = peso || 800;
    K.ft(e, { opacity: 0, y: 46, filter: "blur(10px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.4, ease: "expo.out" }, at);
    return e;
  }

  // ---------- 41 Botão que é tocado (salvar, enviar, curtir, seguir ou "Agende sua avaliação") ----------
  // acao: "salvar" | "enviar" | "curtir" | "comentar" | "seguir" | "botao". toque_em = quando o dedo encosta.
  MB.def("41", {
    em: 0, dur: 3.6, acao: "salvar", texto: null, aviso: null, y: 1230, toque_em: 0.75,
    botao: "AGENDE SUA AVALIAÇÃO", contatos: ["A", "J", "M"]
  }, function (P, K) {
    const t0 = K.t(), t1 = t0 + P.dur, tt = K.t(P.toque_em), y = P.y;
    const PADRAO = {
      salvar: ["SALVA PRO|*PRÓXIMO TREINO*", "SALVO"], enviar: ["MANDA PRA QUEM|*TREINA COM VOCÊ*", "ENVIADO"],
      curtir: ["CURTE SE|*FEZ SENTIDO*", "+1"], comentar: ["COMENTA AQUI|*SUA DÚVIDA*", "NOVO COMENTÁRIO"],
      seguir: ["SEGUE PRA|*MAIS TREINO*", "SEGUINDO"], botao: [null, "LINK NA BIO"]
    };
    const pd = PADRAO[P.acao] || PADRAO.salvar, texto = P.texto != null ? P.texto : pd[0], aviso = P.aviso != null ? P.aviso : pd[1];
    if (P.acao === "botao") {
      const Wb = 940, Hb = 150, x0 = 540 - Wb / 2, fz = Math.min(46, Math.round(680 / (0.66 * P.botao.length)));
      const bt = K.el(`<div class="enche" style="position:absolute;inset:0;border-radius:inherit;background:linear-gradient(90deg,#163e9c,${AZ} 60%,#2f74f2);transform-origin:left center;transform:scaleX(0)"></div>
        <div style="position:absolute;left:34px;top:43px">${icone("agenda", 64)}</div>
        <div style="position:absolute;left:122px;right:130px;top:0;bottom:0;display:flex;align-items:center;font-weight:900;font-style:italic;font-size:${fz}px;line-height:1;white-space:nowrap">${P.botao}</div>
        <div class="seta" style="position:absolute;right:22px;top:22px;width:106px;height:106px;border-radius:50%;background:${AZ};display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 4px rgba(159,188,255,.35)"><svg width="54" height="54" viewBox="0 0 54 54"><path d="M8 27 H44 M30 13 L44 27 L30 41" fill="none" stroke="#fff" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>`,
        `left:${x0}px;top:${y - Hb / 2}px;width:${Wb}px;height:${Hb}px;border-radius:999px;overflow:hidden;background:rgba(8,20,47,.82);border:3px solid rgba(159,188,255,.5);box-shadow:0 22px 50px rgba(0,0,0,.45);opacity:0`);
      K.ft(bt, { opacity: 0, y: 80, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.8)" }, t0);
      K.sfx("whoosh", t0, 0.4);
      K.ft(bt.querySelector(".seta"), { x: 0 }, { x: 10, duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut" }, t0 + 0.35);
      toque(K, 540 + Wb / 2 - 75, y, tt);
      K.to(bt, { scale: 0.95, y: 6, duration: 0.08, ease: "power1.in" }, tt);
      K.to(bt, { scale: 1, y: 0, duration: 0.35, ease: "back.out(3)" }, tt + 0.09);
      K.ft(bt.querySelector(".enche"), { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: "expo.out" }, tt + 0.05);
      K.ft(bt.querySelector(".seta"), { x: 0 }, { x: 16, duration: 0.25, ease: "back.out(3)" }, tt + 0.1);
      K.sfx("selo", tt + 0.05, 0.6);
      const av = K.el(`<span style="display:inline-flex;align-items:center;gap:14px;padding:12px 26px 12px 22px;border-radius:999px;background:rgba(8,20,47,.9);border:2px solid rgba(159,188,255,.45)"><span class="mono" style="font-weight:700;font-size:32px">${aviso}</span><svg width="34" height="34" viewBox="0 0 34 34"><path d="M8 26 L26 8 M12 8 H26 V22" fill="none" stroke="${CL}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`,
        `left:0;width:1080px;top:${y + Hb / 2 + 30}px;text-align:center;opacity:0`);
      K.ft(av, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2)" }, tt + 0.35);
      const fr = texto ? frase(K, texto, y - Hb / 2 - 250, 88, t0 + 0.15) : null;
      K.to([bt, av].concat(fr ? [fr] : []), { opacity: 0, y: 40, duration: 0.3, ease: "power2.in" }, t1 - 0.3);
      return;
    }
    // disco com o ícone
    const D = 290;
    const disco = K.vidro(`left:${540 - D / 2}px;top:${y - D / 2}px;width:${D}px;height:${D}px;border-radius:50%;opacity:0`);
    const ic = K.el(icone(P.acao, 150), `left:${(D - 150) / 2 - 2}px;top:${(D - 150) / 2 + (P.acao === "enviar" ? 4 : 2)}px;width:150px;height:150px`, disco);
    const cont = ic.querySelectorAll(".cont, .lin"), ench = ic.querySelector(".ench");
    K.ft(disco, { opacity: 0, scale: 0.3, rotation: -25 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.5, ease: "back.out(2)" }, t0);
    cont.forEach((c) => K.desenha(c, t0 + 0.12, 0.5, "power2.inOut"));
    K.sfx("pop", t0 + 0.05, 0.6);
    // o toque
    toque(K, 540, y, tt);
    K.to(ic, { scale: 0.8, duration: 0.08, ease: "power1.in" }, tt);
    K.to(ic, { scale: 1, duration: 0.45, ease: "elastic.out(1.1,0.4)" }, tt + 0.08);
    K.ft(ench, { opacity: 0, scale: 0.2, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2.6)" }, tt + 0.04);
    const aro = K.el("", `left:${540 - D / 2 - 14}px;top:${y - D / 2 - 14}px;width:${D + 28}px;height:${D + 28}px;border-radius:50%;border:8px solid ${AZ};box-shadow:0 0 30px rgba(47,116,242,.7);opacity:0`);
    K.ft(aro, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2.5)" }, tt + 0.05);
    K.to(disco, { borderColor: "rgba(159,188,255,.85)", duration: 0.3 }, tt + 0.05);
    K.particulas(540, y, 22, tt + 0.08, { forca: 520, gravidade: 250, tam: 16, dur: 0.8, cores: [AZ, "#2f74f2", CL] });
    K.sfx("pop", tt + 0.05, 0.8); K.sfx("sucesso", tt + 0.12, 0.35);
    let avisoX = 590, avisoY = y - D / 2 - 34;
    if (P.acao === "enviar") {
      // o avião sai voando com rastro tracejado e os contatos recebem
      const voo = K.el(icone("enviar", 110, AZ), `left:${540 - 55}px;top:${y - 55}px;width:110px;height:110px;opacity:0;z-index:62`);
      voo.querySelector(".ench").style.opacity = 1;
      const rastro = K.svg(`<path d="M540 ${y} C 640 ${y - 120}, 760 ${y - 260}, 930 ${y - 420}" fill="none" stroke="${CL}" stroke-width="6" stroke-dasharray="4 18" stroke-linecap="round"/>`, 1080, 1920, "left:0;top:0;opacity:0;z-index:61");
      const tv = tt + 0.42;
      K.set(voo, { opacity: 1 }, tv); K.set(ic, { opacity: 0 }, tv);
      K.ticker((t) => {
        const k = Math.min(1, (t - tv) / 0.55), e = k * k * (3 - 2 * k), u = 1 - e;
        const x = u * u * u * 540 + 3 * u * u * e * 640 + 3 * u * e * e * 760 + e * e * e * 930;
        const yy = u * u * u * y + 3 * u * u * e * (y - 120) + 3 * u * e * e * (y - 260) + e * e * e * (y - 420);
        gsap.set(voo, { x: x - 540, y: yy - y, scale: 1 - 0.55 * e, rotation: -8 * e, opacity: 1 - Math.max(0, (k - 0.8) / 0.2) });
      }, tv, tv + 0.56);
      K.ft(rastro, { opacity: 0, clipPath: "inset(0 100% 0 0)" }, { opacity: 0.9, clipPath: "inset(0 0% 0 0)", duration: 0.55, ease: "power2.out" }, tv);
      K.to(rastro, { opacity: 0, duration: 0.4 }, tv + 0.8);
      K.sfx("whoosh", tv, 0.7);
      // volta o ícone cheio no disco
      K.ft(ic, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2.5)" }, tv + 0.6);
      const av = P.contatos.slice(0, 4).map((c, i) => K.el(`<b style="font-size:44px;font-weight:900">${c}</b>`,
        `left:${540 + D / 2 + 30 + i * 70}px;top:${y - 52}px;width:100px;height:100px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:linear-gradient(150deg,#2f74f2,#163e9c);border:4px solid #0a1b3f;box-shadow:0 8px 20px rgba(0,0,0,.35);opacity:0;z-index:${63 - i}`));
      av.forEach((a, i) => { K.ft(a, { opacity: 0, scale: 0, x: -40 }, { opacity: 1, scale: 1, x: 0, duration: 0.3, ease: "back.out(2.5)" }, tv + 0.55 + i * 0.09); K.sfx("tique", tv + 0.55 + i * 0.09, 0.4); });
      avisoX = 540 + D / 2 + 30; avisoY = y + 64;
      K.to(av, { opacity: 0, scale: 0.6, duration: 0.25, ease: "power2.in", stagger: 0.03 }, t0 + P.dur - 0.3);
    }
    const chip = K.el(`${CHECK(40)}<span class="mono" style="font-weight:700;font-size:30px;margin-left:12px">${aviso}</span>`,
      `left:${avisoX}px;top:${avisoY}px;display:flex;align-items:center;padding:12px 22px 12px 14px;border-radius:999px;background:rgba(8,20,47,.9);border:2px solid rgba(159,188,255,.45);box-shadow:0 10px 26px rgba(0,0,0,.35);white-space:nowrap;opacity:0;z-index:64`);
    K.ft(chip, { opacity: 0, scale: 0.5, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "back.out(2.5)" }, tt + (P.acao === "enviar" ? 0.95 : 0.3));
    if (P.acao === "comentar") {
      const pts = K.el("<i></i><i></i><i></i>", `left:${540 - 50}px;top:${y - 14}px;width:100px;height:28px;display:flex;gap:12px;justify-content:center;opacity:0;z-index:63`);
      pts.querySelectorAll("i").forEach((d) => d.setAttribute("style", "display:block;width:20px;height:20px;border-radius:50%;background:#fff"));
      K.set(pts, { opacity: 1 }, tt + 0.3);
      K.ft(pts.querySelectorAll("i"), { y: 0 }, { y: -12, duration: 0.2, yoyo: true, repeat: 7, stagger: 0.1, ease: "sine.inOut" }, tt + 0.3);
    }
    const fr = texto ? frase(K, texto, y + D / 2 + 36, 80, tt + 0.25) : null;
    const todos = [disco, chip, aro].concat(fr ? [fr] : []);
    K.to(todos, { opacity: 0, scale: 0.85, duration: 0.3, ease: "power2.in" }, t1 - 0.3);
  });

  // ---------- 42 Comenta a palavra (ou marca o amigo) ----------
  // modo "palavra": digita a palavra-chave. modo "marca": digita @ e escolhe um perfil da lista.
  // y = topo da caixa de comentário; o título fica acima dela, abaixo do rosto de quem fala.
  MB.def("42", {
    em: 0, dur: 4.4, modo: "palavra", palavra: "CORE", titulo: null, sub: "QUE EU TE MANDO O TREINO COMPLETO",
    perfis: ["@parceiro.de.treino", "@ana.corre", "@joao_supino"], escolhe: 0, usuario: "@voce", y: 1400
  }, function (P, K) {
    const t0 = K.t(), t1 = t0 + P.dur, y = P.y, marca = P.modo === "marca";
    const titulo = P.titulo != null ? P.titulo : (marca ? "MARCA *AQUELE AMIGO*" : `COMENTA *${P.palavra}*`);
    const nc = titulo.replace(/[*_|]/g, "").length, fz = Math.min(104, Math.round(960 / (0.8 * nc))), Yt = y - 300 - fz * 0.3;
    const tit = frase(K, titulo, Yt, fz, t0, 900);
    const sub = P.sub ? K.el(`<span class="mono" style="display:inline-block;font-size:30px;font-weight:700;padding:10px 22px;border-radius:14px;background:rgba(8,20,47,.86);border:2px solid rgba(159,188,255,.3)">${P.sub}</span>`,
      `left:0;width:1080px;top:${Yt + fz * 1.12 + 16}px;text-align:center;opacity:0`) : null;
    if (sub) K.ft(sub, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, ease: "expo.out" }, t0 + 0.25);
    K.sfx("hit", t0 + 0.05, 0.5);
    // caixa de comentário
    const bar = K.el(`<div style="position:absolute;left:18px;top:17px;width:96px;height:96px;border-radius:50%;background:${AZ};overflow:hidden"><img src="assets/logo_white.png" style="position:absolute;left:5px;top:20px;width:208px;max-width:none"></div>
      <div class="ph mono" style="position:absolute;left:138px;top:0;bottom:0;display:flex;align-items:center;font-size:30px;font-weight:500;color:rgba(159,188,255,.75)">ADICIONE UM COMENTÁRIO...</div>
      <div class="lin" style="position:absolute;left:138px;right:190px;top:0;bottom:0;display:flex;align-items:center;font-weight:800;font-size:50px;white-space:nowrap"><span class="tx" style="position:relative;z-index:1"></span><span class="cur" style="display:inline-block;width:5px;height:56px;background:${CL};margin-left:4px;opacity:0"></span></div>
      <div class="pub mono" style="position:absolute;right:30px;top:0;bottom:0;display:flex;align-items:center;font-size:30px;font-weight:700;color:rgba(159,188,255,.45)">PUBLICAR</div>`,
      `left:40px;top:${y}px;width:1000px;height:130px;border-radius:65px;background:rgba(8,20,47,.88);border:3px solid rgba(159,188,255,.42);box-shadow:0 20px 50px rgba(0,0,0,.45);opacity:0`);
    K.ft(bar, { opacity: 0, y: 90 }, { opacity: 1, y: 0, duration: 0.45, ease: "expo.out" }, t0 + 0.2);
    const ph = bar.querySelector(".ph"), tx = bar.querySelector(".tx"), cur = bar.querySelector(".cur"), pub = bar.querySelector(".pub");
    const td = t0 + 0.75;
    K.set(ph, { opacity: 0 }, td);
    K.set(cur, { opacity: 1 }, td);
    let fim, texto;
    if (!marca) {
      texto = P.palavra;
      fim = digita(K, tx, texto, td + 0.1, 0.11);
    } else {
      fim = digita(K, tx, "@", td + 0.1, 0.1);
      const nP = P.perfis.length, topo = y - 30 - nP * 108 - 28;
      const lista = K.el(P.perfis.map((p, i) => `<div class="pf" style="display:flex;align-items:center;gap:22px;padding:16px 26px;border-radius:22px">
        <b style="width:76px;height:76px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:linear-gradient(150deg,${i % 2 ? "#2f74f2,#163e9c" : "#163e9c,#2f74f2"});font-size:36px;font-weight:900">${p.replace(/[^a-z]/gi, "")[0] || "?"}</b>
        <span class="mono" style="font-size:34px;font-weight:500;text-transform:none;letter-spacing:.02em">${p}</span></div>`).join(""),
        `left:60px;top:${topo}px;width:760px;padding:14px;border-radius:30px;background:rgba(8,20,47,.95);border:2px solid rgba(159,188,255,.35);box-shadow:0 20px 50px rgba(0,0,0,.5);opacity:0;transform-origin:20% 100%;z-index:3`);
      const tl0 = fim + 0.1;
      K.ft(lista, { opacity: 0, scale: 0.9, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(2)" }, tl0);
      const pf = lista.querySelectorAll(".pf")[P.escolhe] || lista.querySelector(".pf");
      const tq = tl0 + 0.7;
      K.to(pf, { background: "rgba(31,102,229,.45)", duration: 0.15 }, tq - 0.25);
      toque(K, 60 + 14 + 300, topo + 14 + P.escolhe * 108 + 54, tq);
      K.to(lista, { opacity: 0, scale: 0.92, duration: 0.2 }, tq + 0.15);
      texto = P.perfis[P.escolhe];
      K.set(tx, { textContent: texto, textTransform: "none" }, tq + 0.15);
      K.ft(tx, { color: "#ffffff" }, { color: CL, duration: 0.2 }, tq + 0.15);
      K.sfx("pop", tq + 0.15, 0.5);
      fim = tq + 0.2;
    }
    // publica
    K.to(pub, { color: "#ffffff", duration: 0.15 }, fim);
    const tp = fim + 0.45;
    toque(K, 40 + 1000 - 100, y + 65, tp);
    K.set(cur, { opacity: 0 }, tp);
    K.to(bar.querySelector(".lin"), { opacity: 0, y: -30, duration: 0.2 }, tp + 0.05);
    K.set(ph, { opacity: 1 }, tp + 0.3);
    // o comentário publicado sobe e ganha o coração
    const kw = marca ? `<span style="color:${CL};text-transform:none;font-size:44px">${texto}</span>` : `<span class="hl" style="padding:0 .2em .06em">${texto}</span>`;
    const card = K.el(`<div style="width:84px;height:84px;border-radius:50%;flex:none;background:linear-gradient(150deg,#2f74f2,#163e9c);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:38px">${P.usuario.replace(/[^a-z]/gi, "")[0] || "V"}</div>
      <div style="flex:1;min-width:0"><div class="mono" style="font-size:26px;font-weight:500;color:${CL};text-transform:none;letter-spacing:.02em">${P.usuario} · agora</div><div style="font-size:52px;font-weight:900;font-style:italic;margin-top:6px;white-space:nowrap;overflow:hidden">${kw}</div></div>
      <div class="cor" style="flex:none;width:64px">${icone("curtir", 58)}</div>`,
      `left:40px;top:${y - 160}px;width:1000px;display:flex;align-items:center;gap:26px;padding:22px 34px;border-radius:34px;background:rgba(8,20,47,.9);border:2px solid rgba(159,188,255,.4);box-shadow:0 20px 50px rgba(0,0,0,.45);opacity:0`);
    K.ft(card, { opacity: 0, y: 160, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "expo.out" }, tp + 0.08);
    if (sub) K.to(sub, { opacity: 0, duration: 0.2 }, tp + 0.05);
    K.sfx("whoosh", tp + 0.05, 0.4);
    const cor = card.querySelector(".cor"), en = cor.querySelector(".ench");
    K.ft(en, { opacity: 0, scale: 0.2, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(3)" }, tp + 0.75);
    K.ft(cor, { scale: 1 }, { scale: 1.3, duration: 0.12, yoyo: true, repeat: 1 }, tp + 0.75);
    K.sfx("pop", tp + 0.75, 0.7);
    K.to([tit, card, bar], { opacity: 0, y: 40, duration: 0.3, ease: "power2.in" }, t1 - 0.3);
  });

  // ---------- 43 Crachá com nome e registro ----------
  MB.def("43", {
    em: 0, dur: 3.8, cargo: "FISIOTERAPEUTA", nome: "MARIA BEATRIZ", registro: "CREFITO-3 381260/F", indice: "MB/01",
    x: 60, y: 1150, largura: 800
  }, function (P, K) {
    const t0 = K.t(), t1 = t0 + P.dur, Wq = P.largura, Hq = 300, x = P.x, y = P.y;
    const q = K.el("", `left:${x}px;top:${y}px;width:${Wq}px;height:${Hq}px;opacity:0`);
    q.classList.add("quadro", "grade");
    K.set(q, { opacity: 1 }, t0 + 0.12);
    K.ft(q, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.5, ease: "expo.inOut" }, t0 + 0.12);
    // cantoneiras
    const cantos = [[-14, -14, "border-left", "border-top"], [Wq - 30, -14, "border-right", "border-top"], [-14, Hq - 30, "border-left", "border-bottom"], [Wq - 30, Hq - 30, "border-right", "border-bottom"]]
      .map(([a, b, c, d]) => K.el("", `left:${x + a}px;top:${y + b}px;width:44px;height:44px;${c}:5px solid ${CL};${d}:5px solid ${CL};opacity:0`));
    K.ft(cantos, { opacity: 0, scale: 1.8 }, { opacity: 1, scale: 1, duration: 0.35, ease: "expo.out", stagger: 0.05 }, t0);
    const kick = K.el("", `left:${x + 40}px;top:${y + 34}px;font-size:30px;opacity:0`); kick.classList.add("rotulo");
    K.set(kick, { opacity: 1 }, t0 + 0.4); decodifica(K, kick, P.cargo, t0 + 0.4, 0.6);
    const idx = K.el(P.indice, `left:${x + Wq - 200}px;width:160px;top:${y + 36}px;text-align:right;font-size:24px;opacity:0;color:rgba(159,188,255,.6)`); idx.classList.add("mono");
    K.ft(idx, { opacity: 0 }, { opacity: 1, duration: 0.3 }, t0 + 0.6);
    const mask = K.el(`<div class="nm" style="font-weight:900;font-style:italic;font-size:${Math.min(88, Math.round((Wq - 90) / (0.76 * P.nome.length)))}px;line-height:1.1;white-space:nowrap">${P.nome}</div>`,
      `left:${x + 36}px;top:${y + 86}px;width:${Wq - 60}px;height:104px;overflow:hidden`);
    gsap.set(mask.querySelector(".nm"), { yPercent: 105 });
    K.ft(mask.querySelector(".nm"), { yPercent: 105 }, { yPercent: 0, duration: 0.5, ease: "expo.out" }, t0 + 0.5);
    const lin = K.el("", `left:${x + 40}px;top:${y + 196}px;width:${Wq - 80}px;height:6px;background:${AZ};box-shadow:0 0 16px rgba(47,116,242,.8);transform-origin:left center;transform:scaleX(0)`);
    K.ft(lin, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "expo.inOut" }, t0 + 0.65);
    const reg = K.el(`${CHECK(36)}<span class="r mono" style="margin-left:14px;font-size:30px;font-weight:700;color:#fff"></span>`,
      `left:${x + 40}px;top:${y + 222}px;display:flex;align-items:center;opacity:0`);
    K.ft(reg, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.3, ease: "expo.out" }, t0 + 0.9);
    decodifica(K, reg.querySelector(".r"), P.registro, t0 + 0.95, 0.7);
    K.sfx("whoosh", t0 + 0.1, 0.4); K.sfx("tecla", t0 + 0.45, 0.4); K.sfx("tecla", t0 + 1.0, 0.4); K.sfx("trava", t0 + 1.6, 0.35);
    K.to(q, { clipPath: "inset(0 0 0 100%)", duration: 0.4, ease: "expo.in" }, t1 - 0.4);
    K.to([kick, idx, mask, lin, reg].concat(cantos), { opacity: 0, x: 40, duration: 0.25, ease: "power2.in", stagger: 0.02 }, t1 - 0.4);
  });

  // ---------- 44 Resposta a comentário ----------
  MB.def("44", {
    em: 0, dur: 4.2, rotulo: "RESPONDENDO A", usuario: "@joana.treina", pergunta: "Joelho pode passar da ponta do pé?",
    y: 170, largura: 860, fica: true, canto_em: 2.4
  }, function (P, K) {
    const t0 = K.t(), t1 = t0 + P.dur, Wc = P.largura, x = 540 - Wc / 2, y = P.y;
    const ini = (P.usuario.replace(/[^a-z]/gi, "")[0] || "?").toUpperCase();
    const pal = P.pergunta.split(/\s+/).map((w) => `<span class="w" style="display:inline-block;opacity:0;margin-right:.24em">${w}</span>`).join("");
    const st = K.el(`<div style="display:flex;align-items:center;gap:20px">
        <b style="width:74px;height:74px;border-radius:50%;flex:none;display:flex;align-items:center;justify-content:center;background:linear-gradient(150deg,#2f74f2,#163e9c);font-size:36px;font-weight:900;border:3px solid rgba(159,188,255,.6)">${ini}</b>
        <div class="mono" style="font-size:27px;font-weight:500;color:${CL};line-height:1.3">${P.rotulo}<br><span style="color:#fff;font-weight:700;text-transform:none;letter-spacing:.02em">${P.usuario}</span></div></div>
      <div style="margin-top:22px;font-size:60px;font-weight:800;font-style:italic;line-height:1.12;text-transform:none">${pal}</div>
      <svg width="60" height="40" viewBox="0 0 60 40" style="position:absolute;left:70px;bottom:-36px"><path d="M0 0 L60 0 L8 38 Z" fill="rgba(13,33,80,.96)"/></svg>`,
      `left:${x}px;top:${y}px;width:${Wc}px;padding:30px 40px 40px;border-radius:38px;background:linear-gradient(160deg,rgba(31,102,229,.94),rgba(13,33,80,.97) 70%);border:3px solid rgba(159,188,255,.45);box-shadow:0 26px 60px rgba(0,0,0,.5);opacity:0;transform-origin:20% 100%`);
    K.ft(st, { opacity: 0, y: -260, rotation: -14, scale: 0.8 }, { opacity: 1, y: 0, rotation: -3, scale: 1, duration: 0.6, ease: "back.out(1.6)" }, t0);
    K.sfx("whoosh", t0, 0.4); K.sfx("pop", t0 + 0.35, 0.6);
    const ws = st.querySelectorAll(".w");
    ws.forEach((w, i) => { K.ft(w, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.22, ease: "back.out(2.5)" }, t0 + 0.45 + i * 0.07); });
    if (P.fica) {
      const tc = K.t(P.canto_em);
      K.to(st, { transformOrigin: "0% 0%", x: 40 - x, y: 150 - y, scale: 0.5, rotation: -2, duration: 0.5, ease: "power3.inOut" }, tc);
      K.sfx("whoosh", tc, 0.3);
    }
    K.to(st, { opacity: 0, duration: 0.3 }, t1 - 0.3);
  });

  // ---------- 45 Enquete na tela ----------
  MB.def("45", {
    em: 0, dur: 4.8, rotulo: "ENQUETE", pergunta: "QUAL VOCÊ *CONSEGUE*?", opcoes: ["FÁCIL", "DIFÍCIL"], porcentagens: [41, 59],
    escolha: 1, toque_em: 1.5, y: 1040
  }, function (P, K) {
    const t0 = K.t(), t1 = t0 + P.dur, n = P.opcoes.length, Wc = 920, x = 80, y = P.y, Ho = 124, gap = 26;
    const Hc = 150 + n * (Ho + gap) + 60;
    const card = K.el("", `left:${x}px;top:${y}px;width:${Wc}px;height:${Hc}px;border-radius:40px;opacity:0`);
    card.classList.add("quadro", "grade"); card.style.borderRadius = "40px";
    K.ft(card, { opacity: 0, y: 100, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "expo.out" }, t0);
    const rot = K.el(P.rotulo, `left:${x + 50}px;top:${y + 40}px;font-size:28px;opacity:0`); rot.classList.add("rotulo");
    K.ft(rot, { opacity: 0 }, { opacity: 1, duration: 0.3 }, t0 + 0.2);
    const fq = Math.min(64, Math.round((Wc - 100) / (0.8 * P.pergunta.replace(/[*_|]/g, "").length)));
    const q = K.el(K.rich(P.pergunta), `left:${x + 46}px;top:${y + 84 + (64 - fq) * 0.5}px;width:${Wc - 90}px;font-size:${fq}px;font-weight:900;font-style:italic;line-height:1.1;white-space:nowrap;opacity:0`);
    K.ft(q, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.35, ease: "expo.out" }, t0 + 0.2);
    K.sfx("whoosh", t0, 0.4);
    const tq = K.t(P.toque_em), linhas = [];
    P.opcoes.forEach((op, i) => {
      const oy = y + 180 + i * (Ho + gap), esc = i === P.escolha, pct = P.porcentagens[i] || 0;
      const ln = K.el(`<div class="bar" style="position:absolute;left:0;top:0;bottom:0;width:${pct}%;border-radius:inherit;background:${esc ? `linear-gradient(90deg,#163e9c,${AZ})` : "rgba(159,188,255,.2)"};transform-origin:left center;transform:scaleX(0)"></div>
        <div style="position:absolute;left:40px;top:0;bottom:0;display:flex;align-items:center;gap:18px;font-size:52px;font-weight:800">${op}<span class="ck" style="opacity:0">${CHECK(44)}</span></div>
        <div class="pc" style="position:absolute;right:40px;top:0;bottom:0;display:flex;align-items:center;font-size:52px;font-weight:900;font-style:italic;opacity:0"><span class="n">0</span>%</div>`,
        `left:${x + 46}px;top:${oy}px;width:${Wc - 92}px;height:${Ho}px;border-radius:${Ho / 2}px;overflow:hidden;border:3px solid rgba(159,188,255,.45);background:rgba(8,20,47,.6);opacity:0`);
      K.ft(ln, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.35, ease: "expo.out" }, t0 + 0.35 + i * 0.1);
      const tr = tq + 0.2 + i * 0.06;
      K.ft(ln.querySelector(".bar"), { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "expo.out" }, tr);
      K.ft(ln.querySelector(".pc"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, tr);
      K.conta(ln.querySelector(".n"), 0, pct, tr, 0.7, null, "expo.out");
      if (esc) {
        K.to(ln, { borderColor: CL, duration: 0.2 }, tq);
        K.ft(ln.querySelector(".ck"), { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(3)" }, tr + 0.25);
        toque(K, x + 46 + 330, oy + Ho / 2, tq);
      }
      linhas.push(ln);
    });
    K.sfx("sobe", tq + 0.2, 0.5); K.sfx("pop", tq + 0.5, 0.5);
    K.to([card, rot, q].concat(linhas), { opacity: 0, y: 50, duration: 0.3, ease: "power2.in" }, t1 - 0.3);
  });
})();
