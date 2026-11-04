/* Grupo G. Chamadas e identidade (motions 41 a 45), na linha premium escolhida pelo Paulo em 2026-11-04.
   Saem dos roteiros: quase todo Reel termina pedindo para salvar, enviar, comentar uma palavra ou marcar um amigo,
   e a Maria se apresenta com nome e CREFITO. Usa as ferramentas da linha premium (MB.lux, de L-premium.js):
   vidro marinho, texto que sobe da fenda, palavra forte que ganha peso, rótulo em letra de máquina, linhas finas
   e a coluna de pontos do logo. Nada de quique, partícula, tremida ou pop. */
(function () {
  const NV = "#0a1b3f";
  // ícones de traço fino (64 x 64). "d" = contorno; o mesmo desenho preenchido de branco entra no toque.
  const ICONES = {
    salvar: { d: "M19 6 H45 a5 5 0 0 1 5 5 V58 L32 45 L14 58 V11 a5 5 0 0 1 5 -5 Z" },
    enviar: { d: "M59 5 L5 26 L27 35 L36 59 Z", linha: "M59 5 L27 35", dentro: true },
    curtir: { d: "M32 57 C11 42 4 30 4 20 C4 11 11 5 19.5 5 C25.5 5 30 8.5 32 13 C34 8.5 38.5 5 44.5 5 C53 5 60 11 60 20 C60 30 53 42 32 57 Z" },
    comentar: { d: "M32 6 C47.5 6 58.5 16.5 58.5 29.5 C58.5 42.5 47.5 52.5 32 52.5 C28.5 52.5 25 52 22 50.8 L8 57 L12.5 45.5 C8.2 41.3 5.5 35.8 5.5 29.5 C5.5 16.5 16.5 6 32 6 Z" },
    seguir: { d: "M24 8 a11 11 0 1 1 -0.01 0 Z M5 56 C5 43 13 35 24 35 C35 35 43 43 43 56 Z", linha: "M53 16 V36 M43 26 H63" },
    agenda: { d: "M10 13 H54 a5 5 0 0 1 5 5 V54 a5 5 0 0 1 -5 5 H10 a5 5 0 0 1 -5 -5 V18 a5 5 0 0 1 5 -5 Z", linha: "M5 26 H59 M20 6 V18 M44 6 V18", dentro: true }
  };
  function icone(nome, tam, cor) {
    const I = ICONES[nome] || ICONES.salvar, c = cor || "#fff";
    return `<svg width="${tam}" height="${tam}" viewBox="0 0 64 64" style="overflow:visible;display:block">
      <path class="ench" d="${I.d}" fill="${c}" style="opacity:0"/>
      <path class="cont" d="${I.d}" fill="none" stroke="${c}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
      ${I.linha ? `<path class="lin" d="${I.linha}" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round"/>` : ""}</svg>`;
  }
  // desenha o ícone em traço fino
  function iconeDesenha(K, ic, at) {
    K.desenha(ic.querySelector(".cont"), at, 0.9, "power2.inOut");
    const l = ic.querySelector(".lin"); if (l) K.desenha(l, at + 0.35, 0.6, "power2.inOut");
    K.sfx("lux_traco", at, 0.45);
  }
  // no toque o ícone se preenche de branco (as linhas de dentro viram marinho) e respira uma vez
  function iconeEnche(K, ic, nome, at) {
    K.ft(ic.querySelector(".ench"), { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.out" }, at);
    const l = ic.querySelector(".lin");
    if (l && (ICONES[nome] || {}).dentro) K.set(l, { attr: { stroke: NV } }, at + 0.05);
    K.ft(ic, { scale: 1 }, { scale: 1.06, duration: 0.22, ease: "power2.out" }, at);
    K.ft(ic, { scale: 1.06 }, { scale: 1, duration: 0.55, ease: "power2.inOut" }, at + 0.22);
  }
  // toque: um anel fino que fecha sobre o alvo e um disco leve. Sem clarão.
  function toque(K, x, y, at, r) {
    const R = r || 70;
    const a = K.el("", `left:${x - R}px;top:${y - R}px;width:${2 * R}px;height:${2 * R}px;border-radius:50%;border:2px solid rgba(255,255,255,.9);opacity:0;z-index:70`);
    K.ft(a, { opacity: 0, scale: 1.7 }, { opacity: 1, scale: 1, duration: 0.28, ease: "power3.out" }, at - 0.28);
    K.ft(a, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.85, duration: 0.3, ease: "power2.in" }, at + 0.02);
    const d = K.el("", `left:${x - R * 0.45}px;top:${y - R * 0.45}px;width:${R * 0.9}px;height:${R * 0.9}px;border-radius:50%;background:rgba(255,255,255,.28);opacity:0;z-index:69`);
    K.ft(d, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.12, ease: "power2.out" }, at);
    K.ft(d, { opacity: 1 }, { opacity: 0, duration: 0.35, ease: "power2.out" }, at + 0.14);
    K.sfx("lux_toque", at, 0.6);
  }
  // placa de vidro que abre do centro (ou da esquerda) e fecha do mesmo jeito
  function placa(K, x, y, w, h, at, ate, deLado) {
    const ini = deLado ? "inset(0% 100% 0% 0%)" : "inset(0% 50% 0% 50%)", fim = deLado ? "inset(0% 0% 0% 100%)" : "inset(0% 50% 0% 50%)";
    const p = K.el("", `left:${x}px;top:${y}px;width:${w}px;height:${h}px;clip-path:${ini}`);
    p.classList.add("lx-vidro");
    K.ft(p, { clipPath: ini }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.85, ease: "expo.inOut" }, at);
    if (ate != null) K.ft(p, { clipPath: "inset(0% 0% 0% 0%)" }, { clipPath: fim, duration: 0.6, ease: "expo.inOut" }, ate);
    K.sfx("lux_ar", at, 0.55);
    return p;
  }
  // fundo escuro suave só atrás do texto que fica direto sobre o vídeo (y0 a y1 = onde está o texto). A cor do
  // vídeo não muda em volta (pedido do Paulo em 2026-11-04); a caixa e o botão já são vidro marinho.
  function faixa(K, y0, y1, at, ate) {
    return MB.lux.fundo(K, 60, y0, 960, y1 - y0, at, ate, 0.5, 80);
  }
  // linhas de texto em dois pesos dentro de fendas (a palavra forte ganha peso ao chegar)
  function linhasTexto(K, txt, x, y, larg, tamMax, centro) {
    const { rico, limpo, fenda } = MB.lux;
    const ls = String(txt).split("|"), nc = Math.max(...ls.map((s) => limpo(s).length));
    const fz = Math.min(tamMax, Math.floor(larg / (0.72 * nc))), lh = Math.round(fz * 1.04);
    const fs = ls.map((s, i) => {
      const r = fenda(K, rico(s), `left:${x}px;top:${y + i * lh}px;font-size:${fz}px;${centro ? `width:${larg}px;text-align:center` : ""}`);
      r[0].classList.add("lx-tit", "lx-fino"); return r;
    });
    return { fs, fz, alt: ls.length * lh };
  }
  function entraLinhas(K, fs, at) {
    const { sobe, pesa } = MB.lux;
    fs.forEach(([m, s], i) => { sobe(K, s, at + i * 0.13, 1.1); pesa(K, m, at + 0.25 + i * 0.13); });
  }
  // texto que digita sozinho (depende só do tempo) com clique discreto
  function digita(K, el, txt, at, vel) {
    const L = [...txt], n = L.length;
    K.ticker((t) => { const k = Math.max(0, Math.min(n, Math.floor((t - at) / vel + 0.0001))); el.textContent = L.slice(0, k).join(""); }, at, at + n * vel + 0.01);
    for (let i = 0; i < n; i++) if (L[i] !== " ") K.sfx("lux_clique", at + i * vel, 0.5);
    return at + n * vel;
  }

  // ---------- 41 Botão que é tocado (salvar, enviar, curtir, comentar, seguir ou "Agende sua avaliação") ----------
  MB.def("41", {
    em: 0, dur: 3.8, acao: "salvar", texto: null, rotulo: null, aviso: null, y: 1230, toque_em: 1.55,
    botao: "AGENDE SUA AVALIAÇÃO", contatos: ["A", "J", "M"]
  }, function (P, K) {
    const { ESC, fenda, sobe, fecha, rotulo, linha, recolhe, apaga, respira } = MB.lux;
    const t0 = K.t(), t1 = t0 + P.dur, tt = Math.max(K.t(P.toque_em), t0 + 1.35), Y = P.y;
    const PADRAO = {
      salvar: ["SALVA PRO|*PRÓXIMO TREINO*", "GUARDE ESTE TREINO", "SALVO"],
      enviar: ["MANDA PRA QUEM|*TREINA COM VOCÊ*", "ENVIE PARA ALGUÉM", "ENVIADO"],
      curtir: ["CURTE SE|*FEZ SENTIDO*", "DEU PRA ENTENDER?", "CURTIDO"],
      comentar: ["COMENTA AQUI|*SUA DÚVIDA*", "EU RESPONDO", "COMENTÁRIO ENVIADO"],
      seguir: ["SEGUE PRA|*MAIS TREINO*", "TODA SEMANA TEM MAIS", "SEGUINDO"],
      botao: [null, null, "LINK NA BIO"]
    };
    const pd = PADRAO[P.acao] || PADRAO.salvar;
    const texto = P.texto != null ? P.texto : pd[0], rot0 = P.rotulo != null ? P.rotulo : pd[1], aviso = P.aviso != null ? P.aviso : pd[2];
    const ts = Math.max(t1 - 0.6, tt + 1.0);

    if (P.acao === "botao") {
      // frase opcional em cima e o botão retangular, que se enche de branco no toque
      const Wb = 840, Hb = 128, X = 540 - Wb / 2;
      const nl0 = texto ? String(texto).split("|").length : 0;
      if (nl0) faixa(K, Y - 74 - nl0 * 80, Y - 40, t0, ts + 0.1);
      MB.lux.fundo(K, 540 - 300, Y + Hb + 26, 600, 36, tt + 0.3, ts, 0.5, 50);   // atrás do aviso embaixo do botão
      let fsTexto = [];
      if (texto) {
        const nl = String(texto).split("|").length, fzEst = 76;
        const r = linhasTexto(K, texto, 40, Y - 64 - nl * Math.round(fzEst * 1.04), 1000, fzEst, true);
        r.fs.forEach((f) => f[0].classList.add("lx-sombra")); fsTexto = r.fs;
        entraLinhas(K, r.fs, t0 + 0.1);
        K.sfx("lux_grave", t0 + 0.1, 0.5);
      }
      const fzB = Math.min(34, Math.floor((Wb - 230) / (0.8 * P.botao.length)));
      const conteudo = (cor) => `<div style="position:absolute;left:52px;top:0;height:${Hb}px;display:flex;align-items:center;gap:24px;font-size:${fzB}px;font-weight:600;letter-spacing:.16em;color:${cor};white-space:nowrap">
          <div style="width:44px;height:44px">${icone("agenda", 44, cor)}</div><span>${ESC(P.botao)}</span></div>
        <svg style="position:absolute;right:48px;top:${Hb / 2 - 14}px" width="56" height="28" viewBox="0 0 56 28"><path d="M2 14 H52 M40 3 L52 14 L40 25" fill="none" stroke="${cor}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      const bt = K.el(`<div style="position:absolute;inset:0">${conteudo("#fff")}</div>
        <div class="cheio" style="position:absolute;inset:0;background:#fff;clip-path:inset(0% 100% 0% 0%)">${conteudo(NV)}</div>`,
        `left:${X}px;top:${Y}px;width:${Wb}px;height:${Hb}px;overflow:hidden;clip-path:inset(0% 50% 0% 50%)`);
      bt.classList.add("lx-vidro"); bt.style.border = "2px solid rgba(255,255,255,.78)";
      const cheio = bt.querySelector(".cheio");
      K.ft(bt, { clipPath: "inset(0% 50% 0% 50%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.85, ease: "expo.inOut" }, t0 + 0.35);
      K.sfx("lux_ar", t0 + 0.35, 0.55);
      toque(K, X + Wb - 76, Y + Hb / 2, tt, 64);
      K.ft(cheio, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "expo.inOut" }, tt + 0.02);
      K.sfx("lux_sino", tt + 0.1, 0.5);
      const av = K.el(ESC(aviso), `left:0;width:1080px;top:${Y + Hb + 34}px;text-align:center;opacity:0`); av.classList.add("lx-rot", "lx-sombra");
      rotulo(K, av, tt + 0.35, 0.9); respira(K, av, tt + 1.3, ts);
      // saída
      fsTexto.forEach(([, s], i) => fecha(K, s, ts + i * 0.05, 0.45));
      apaga(K, [av], ts, 0.4);
      K.ft(bt, { clipPath: "inset(0% 0% 0% 0%)" }, { clipPath: "inset(0% 50% 0% 50%)", duration: 0.6, ease: "expo.inOut" }, ts + 0.05);
      return;
    }

    // placa com ícone de traço, rótulo, frase em dois pesos e linha que enche no toque
    const Wd = 880, Hd = 280, X = 100, IS = 96, ix = X + 64, iy = Y + Math.round((Hd - IS) / 2);
    placa(K, X, Y, Wd, Hd, t0, ts + 0.05);
    const ic = K.el(icone(P.acao, IS), `left:${ix}px;top:${iy}px;width:${IS}px;height:${IS}px`);
    const tx = ix + IS + 56, av = X + Wd - 56 - tx;
    const [, r1] = fenda(K, `<span class="lx-rot az">${ESC(rot0)}</span>`, `left:${tx}px;top:${Y + 46}px;font-size:26px`);
    const [, r2] = fenda(K, `<span class="lx-rot az">${ESC(aviso)}</span>`, `left:${tx}px;top:${Y + 46}px;font-size:26px`);
    const tl = linhasTexto(K, texto, tx - 3, Y + 96, av, 64, false);
    const yb = Y + Hd - 44;
    const trilho = K.el("", `left:${tx}px;top:${yb}px;width:${av}px;transform:scaleX(0)`); trilho.classList.add("lx-linha"); trilho.style.background = "rgba(255,255,255,.22)";
    const barra = K.el("", `left:${tx}px;top:${yb - 1}px;width:${av}px;height:4px;background:#fff;transform:scaleX(0);transform-origin:left center`);
    iconeDesenha(K, ic, t0 + 0.25);
    sobe(K, r1, t0 + 0.3, 1.0);
    entraLinhas(K, tl.fs, t0 + 0.4);
    K.sfx("lux_grave", t0 + 0.4, 0.45);
    linha(K, trilho, t0 + 0.6, 0.9);
    // o toque
    toque(K, ix + IS / 2, iy + IS / 2, tt, 74);
    iconeEnche(K, ic, P.acao, tt);
    K.ft(barra, { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "expo.out" }, tt + 0.02);
    fecha(K, r1, tt + 0.02, 0.32); sobe(K, r2, tt + 0.3, 0.8);
    if (P.acao === "salvar" || P.acao === "enviar") K.sfx("lux_sino", tt + 0.08, 0.5);
    // enviar: os contatos aparecem ao lado do aviso
    let cts = [];
    if (P.acao === "enviar" && P.contatos && P.contatos.length) {
      const w0 = tx + Math.round(26 * 0.9 * (aviso.length + 1) + 24);
      cts = P.contatos.slice(0, 4).map((c, i) => {
        const e = K.el(ESC(c), `left:${w0 + i * 50}px;top:${Y + 38}px;width:42px;height:42px;border-radius:50%;border:2px solid rgba(255,255,255,.8);font-size:18px;font-weight:600;display:flex;align-items:center;justify-content:center;opacity:0`);
        e.classList.add("lx");
        K.ft(e, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }, tt + 0.45 + i * 0.08);
        return e;
      });
    }
    // saída
    apaga(K, [ic, ...cts], ts, 0.4); fecha(K, r2, ts, 0.4);
    tl.fs.forEach(([, s], i) => fecha(K, s, ts + i * 0.04, 0.42));
    recolhe(K, trilho, ts, 0.4); recolhe(K, barra, ts, 0.4);
  });

  // ---------- 42 Comenta a palavra (ou marca o amigo) ----------
  MB.def("42", {
    em: 0, dur: 4.4, modo: "palavra", palavra: "CORE", titulo: null, sub: "QUE EU TE MANDO O TREINO COMPLETO",
    perfis: ["@parceiro.de.treino", "@ana.corre", "@joao_supino"], escolhe: 0, usuario: "@voce", y: 1400
  }, function (P, K) {
    const { ESC, limpo, fenda, sobe, fecha, rotulo, apaga, pesa, respira } = MB.lux;
    const t0 = K.t(), t1 = t0 + P.dur, Y = P.y, marca = P.modo === "marca";
    const alvo = marca ? (P.perfis[P.escolhe] || P.perfis[0]) : P.palavra;
    const vel = marca ? 0.06 : 0.11, td = t0 + 1.0, fimD = td + [...alvo].length * vel, te = fimD + 0.35;
    const ts = Math.max(t1 - 0.6, te + 0.9);
    const nlTit = (marca || P.titulo != null) ? String(P.titulo != null ? P.titulo : "MARQUE|*AQUELE AMIGO*").split("|").length : 0;
    faixa(K, nlTit ? Y - 160 - nlTit * Math.round(96 * 1.04) : Y - 440, Y - 56, t0, ts + 0.1);
    // título: "COMENTE" fino e a palavra forte dentro de uma moldura fina (ou "MARQUE / AQUELE AMIGO")
    const extras = [];
    let fsT = [];
    if (marca || P.titulo != null) {
      const tit = P.titulo != null ? P.titulo : "MARQUE|*AQUELE AMIGO*";
      const nl = tit.split("|").length, fzE = 96;
      const r = linhasTexto(K, tit, 40, Y - 150 - nl * Math.round(fzE * 1.04), 1000, fzE, true);
      r.fs.forEach((f) => f[0].classList.add("lx-sombra")); fsT = r.fs;
      entraLinhas(K, r.fs, t0 + 0.1);
    } else {
      const [m1, s1] = fenda(K, "COMENTE", `left:0;width:1080px;top:${Y - 430}px;text-align:center;font-size:60px;letter-spacing:.14em`);
      m1.classList.add("lx-tit", "lx-fino", "lx-sombra");
      const pw = limpo(P.palavra), fzP = Math.min(150, Math.floor(800 / (0.8 * pw.length)));
      const [m2, s2] = fenda(K, `<b class="lx-b">${ESC(pw)}</b>`, `left:0;width:1080px;top:${Y - 344}px;text-align:center;font-size:${fzP}px;letter-spacing:.04em`);
      m2.classList.add("lx-tit", "lx-sombra");
      fsT = [[m1, s1], [m2, s2]];
      sobe(K, s1, t0 + 0.1, 1.0); sobe(K, s2, t0 + 0.25, 1.1); pesa(K, m2, t0 + 0.45);
      // moldura fina em volta da palavra: quatro linhas que se desenham uma atrás da outra
      const wq = Math.round(0.8 * pw.length * fzP + 110), hq = Math.round(fzP * 1.3), xq = Math.round(540 - wq / 2), yq = Y - 344 - Math.round(fzP * 0.12);
      [[xq, yq, wq, 2, "left center"], [xq + wq - 2, yq, 2, hq, "center top"], [xq, yq + hq - 2, wq, 2, "right center"], [xq, yq, 2, hq, "center bottom"]].forEach(([x, y, w, h, o], i) => {
        const hor = w > h;
        const e = K.el("", `left:${x}px;top:${y}px;width:${w}px;height:${h}px;background:rgba(255,255,255,.85);transform:${hor ? "scaleX(0)" : "scaleY(0)"};transform-origin:${o}`);
        K.ft(e, hor ? { scaleX: 0 } : { scaleY: 0 }, Object.assign(hor ? { scaleX: 1 } : { scaleY: 1 }, { duration: 0.42, ease: "power2.inOut" }), t0 + 0.55 + i * 0.12);
        extras.push(e);
      });
      K.sfx("lux_traco", t0 + 0.55, 0.45);
    }
    K.sfx("lux_grave", t0 + 0.2, 0.5);
    // linha de apoio em letra de máquina
    const sub = K.el(ESC(P.sub || ""), `left:0;width:1080px;top:${Y - 96}px;text-align:center;opacity:0`); sub.classList.add("lx-rot", "lx-sombra");
    if (P.sub) { rotulo(K, sub, t0 + 0.5, 1.0); respira(K, sub, t0 + 1.55, ts); }
    // a caixa de comentário
    const Wc = 900, Hc = 120, X = 90;
    MB.lux.fundo(K, 540 - 300, Y + Hc + 18, 600, 40, te + 0.15, ts, 0.5, 50);   // atrás do "comentário enviado"
    const pl = placa(K, X, Y, Wc, Hc, t0 + 0.35, ts + 0.05);
    const ini = (P.usuario.replace(/[^a-z]/gi, "")[0] || "?").toUpperCase();
    const avt = K.el(ESC(ini), `left:${X + 30}px;top:${Y + 30}px;width:60px;height:60px;border-radius:50%;border:2px solid rgba(255,255,255,.75);display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:600;opacity:0`);
    avt.classList.add("lx");
    const fzC = marca ? 40 : 46;
    const campo = K.el("", `left:${X + 116}px;top:${Y + 34}px;height:52px;font-size:${fzC}px;font-weight:600;line-height:52px;white-space:nowrap;text-transform:none;letter-spacing:${marca ? ".01em" : ".04em"}`);
    campo.classList.add("lx");
    const env = K.el(icone("enviar", 52), `left:${X + Wc - 92}px;top:${Y + 34}px;width:52px;height:52px;opacity:0`);
    K.ft([avt, env], { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }, t0 + 0.75);
    // digitação: o cursor vai dentro do texto (fica sempre logo depois da última letra) e pisca quando para
    const L = [...alvo];
    K.ticker((t) => {
      const k = Math.max(0, Math.min(L.length, Math.floor((t - td) / vel + 0.0001)));
      const o = t < t0 + 0.9 ? 0 : (t < fimD + 0.1 ? 1 : (Math.floor((t - fimD) / 0.3) % 2 ? 0 : 1));
      campo.innerHTML = ESC(L.slice(0, k).join("")) + `<i style="display:inline-block;width:3px;height:.9em;margin-left:5px;vertical-align:-.1em;background:#fff;opacity:${o}"></i>`;
    }, t0 + 0.8, ts);
    for (let i = 0; i < L.length; i++) if (L[i] !== " ") K.sfx("lux_clique", td + i * vel, 0.5);
    // enviar
    toque(K, X + Wc - 66, Y + Hc / 2, te, 48);
    iconeEnche(K, env, "enviar", te);
    const ok = K.el(marca ? "MARCADO" : "COMENTÁRIO ENVIADO", `left:${X}px;width:${Wc}px;top:${Y + Hc + 26}px;text-align:center;opacity:0`); ok.classList.add("lx-rot", "az", "lx-sombra");
    rotulo(K, ok, te + 0.2, 0.8);
    // saída
    fsT.forEach(([, s], i) => fecha(K, s, ts + i * 0.05, 0.45));
    if (extras.length) K.ft(extras, { opacity: 1 }, { opacity: 0, duration: 0.35, ease: "power2.in" }, ts);
    apaga(K, [sub, ok, avt, campo, env], ts, 0.4);
  });

  // ---------- 43 Crachá com nome e registro ----------
  MB.def("43", {
    em: 0, dur: 3.8, cargo: "FISIOTERAPEUTA", nome: "MARIA BEATRIZ", registro: "CREFITO-3 381260/F", indice: "MB/01",
    x: 60, y: 1150, largura: 800
  }, function (P, K) {
    const { ESC, rico, limpo, fenda, sobe, fecha, rotulo, linha, recolhe, apaga, coluna, colunaEntra, respira } = MB.lux;
    const t0 = K.t(), t1 = t0 + P.dur, X = P.x, Y = P.y, Hd = 300;
    const ts = Math.max(t1 - 0.75, t0 + 1.9);
    // largura: cabe o cargo (com o respiro) e o índice; se passar da tela, o espaçamento do cargo diminui
    const larg = (txt, ls) => [...String(txt || "")].length * 26 * (0.6 + ls);
    const precisa = (ls) => 157 + larg(P.cargo, ls + 0.06) + (P.indice ? 30 + larg(P.indice, 0.3) : 0) + 46;
    let lsC = 0.3, Wd = Math.max(P.largura, precisa(0.3));
    if (Wd > 1080 - 2 * X) { lsC = 0.16; Wd = Math.min(1080 - 2 * X, Math.max(P.largura, precisa(0.16))); }
    placa(K, X, Y, Wd, Hd, t0, ts + 0.12, true);
    const [col, pts] = coluna(K, `left:${X + 42}px;top:${Y + 46}px`, 1.04, "#fff");
    const cx = X + 42 + 75 + 40, av = X + Wd - 48 - cx;
    const cg = K.el(ESC(P.cargo), `left:${cx}px;top:${Y + 48}px;opacity:0`); cg.classList.add("lx-rot", "az");
    const ix = K.el(ESC(P.indice || ""), `right:${1080 - (X + Wd - 46)}px;top:${Y + 48}px;opacity:0;color:rgba(255,255,255,.42)`); ix.classList.add("lx-rot");
    const fzN = Math.min(92, Math.floor(av / (0.74 * limpo(P.nome).length)));
    const [, ns] = fenda(K, rico(P.nome), `left:${cx - 4}px;top:${Y + 94}px;font-size:${fzN}px`); ns.parentNode.classList.add("lx-tit");
    const yl = Y + 94 + fzN + 26;
    const ln = K.el("", `left:${cx}px;top:${yl}px;width:${av}px;transform:scaleX(0)`); ln.classList.add("lx-linha");
    const rg = K.el(ESC(P.registro || ""), `left:${cx}px;top:${yl + 24}px;letter-spacing:.2em;color:rgba(255,255,255,.84);opacity:0`); rg.classList.add("lx-rot");
    colunaEntra(K, pts, t0 + 0.35, 0.055);
    rotulo(K, cg, t0 + 0.45, 1.0, lsC); rotulo(K, ix, t0 + 0.6, 1.0); respira(K, cg, t0 + 1.5, ts, lsC + "em", (lsC + 0.06).toFixed(2) + "em");
    sobe(K, ns, t0 + 0.55, 1.1); K.sfx("lux_toque", t0 + 0.6, 0.45);
    linha(K, ln, t0 + 0.8, 1.0); K.sfx("lux_traco", t0 + 0.8, 0.4);
    K.ft(rg, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, t0 + 1.0);
    apaga(K, [cg, ix, rg, col], ts, 0.35); fecha(K, ns, ts, 0.4); recolhe(K, ln, ts, 0.4);
  });

  // ---------- 44 Resposta a comentário ----------
  MB.def("44", {
    em: 0, dur: 4.2, rotulo: "RESPONDENDO A", usuario: "@joana.treina", pergunta: "Joelho pode passar da ponta do pé?",
    y: 170, largura: 860, fica: true, canto_em: 2.6
  }, function (P, K) {
    const { ESC, rotulo, apaga } = MB.lux;
    const t0 = K.t(), t1 = t0 + P.dur, Wc = P.largura, X = 540 - Wc / 2, Y = P.y;
    const fz = 46, porLinha = Math.floor((Wc - 96) / (0.56 * fz)), pal = String(P.pergunta).split(/\s+/);
    let nl = 1, w = 0; pal.forEach((p) => { const c = p.length + 1; if (w + c > porLinha) { nl++; w = c; } else w += c; });
    const Hc = 44 + 64 + 30 + nl * Math.round(fz * 1.22) + 44;
    const box = K.el("", `left:${X}px;top:${Y}px;width:${Wc}px;height:${Hc}px;transform-origin:0% 0%`);
    const pl = K.el("", `left:0;top:0;width:${Wc}px;height:${Hc}px;clip-path:inset(0% 100% 0% 0%)`, box); pl.classList.add("lx-vidro");
    K.ft(pl, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.85, ease: "expo.inOut" }, t0);
    K.sfx("lux_ar", t0, 0.55);
    const ini = (P.usuario.replace(/[^a-z]/gi, "")[0] || "?").toUpperCase();
    const avt = K.el(ESC(ini), `left:48px;top:44px;width:64px;height:64px;border-radius:50%;border:2px solid rgba(255,255,255,.78);display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:600;opacity:0`, box);
    avt.classList.add("lx");
    const rt = K.el(`${ESC(P.rotulo)}&nbsp;&nbsp;<span style="color:#fff;text-transform:none;letter-spacing:.06em">${ESC(P.usuario)}</span>`, `left:136px;top:62px;opacity:0`, box);
    rt.classList.add("lx-rot", "az");
    const q = K.el(pal.map((p) => `<span class="w" style="display:inline-block;opacity:0;margin-right:.26em">${ESC(p)}</span>`).join(""),
      `left:48px;top:${44 + 64 + 30}px;width:${Wc - 96}px;font-size:${fz}px;font-weight:500;line-height:1.22;text-transform:none;text-wrap:balance`, box);
    q.classList.add("lx");
    const ws = Array.from(q.querySelectorAll(".w"));
    K.ft(avt, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.7, ease: "expo.out" }, t0 + 0.35);
    rotulo(K, rt, t0 + 0.4, 1.0);
    K.ft(ws, { opacity: 0, y: 14, filter: "blur(6px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out", stagger: 0.07 }, t0 + 0.6);
    K.sfx("lux_toque", t0 + 0.6, 0.35);
    // vai para o canto e fica (ou sai)
    const tc = Math.max(K.t(P.canto_em), t0 + 0.6 + ws.length * 0.07 + 0.7);
    if (P.fica) {
      K.ft(box, { x: 0, y: 0, scale: 1 }, { x: 40 - X, y: 150 - Y, scale: 0.5, duration: 0.8, ease: "expo.inOut" }, tc);
      K.sfx("lux_passagem", tc - 0.1, 0.35);
    } else {
      const ts = Math.max(t1 - 0.6, tc);
      apaga(K, [avt, rt, q], ts, 0.35);
      K.ft(pl, { clipPath: "inset(0% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 100%)", duration: 0.6, ease: "expo.inOut" }, ts + 0.1);
    }
  });

  // ---------- 45 Enquete na tela ----------
  MB.def("45", {
    em: 0, dur: 4.8, rotulo: "ENQUETE", pergunta: "QUAL VOCÊ *CONSEGUE*?", opcoes: ["FÁCIL", "DIFÍCIL"], porcentagens: [41, 59],
    escolha: 1, toque_em: 1.6, y: 1040
  }, function (P, K) {
    const { ESC, rico, limpo, fenda, sobe, fecha, rotulo, linha, recolhe, apaga, pesa } = MB.lux;
    const t0 = K.t(), t1 = t0 + P.dur, n = P.opcoes.length, Wc = 920, X = 80, Y = P.y, Ho = 116;
    const fzQ = Math.min(64, Math.floor((Wc - 112) / (0.72 * limpo(P.pergunta).length)));
    const yq = Y + 96, y0 = yq + fzQ + 54, Hc = y0 - Y + n * Ho + 36;
    const tt = Math.max(K.t(P.toque_em), t0 + 1.4), ts = Math.max(t1 - 0.6, tt + 1.4);
    placa(K, X, Y, Wc, Hc, t0, ts + 0.05);
    const rt = K.el(ESC(P.rotulo), `left:${X + 56}px;top:${Y + 44}px;opacity:0`); rt.classList.add("lx-rot", "az");
    const [mq, sq] = fenda(K, rico(P.pergunta), `left:${X + 54}px;top:${yq}px;font-size:${fzQ}px`); mq.classList.add("lx-tit", "lx-fino");
    rotulo(K, rt, t0 + 0.3, 1.0);
    sobe(K, sq, t0 + 0.4, 1.1); pesa(K, mq, t0 + 0.65); K.sfx("lux_grave", t0 + 0.4, 0.45);
    const lin = P.opcoes.map((o, i) => {
      const yo = y0 + i * Ho, esc = i === P.escolha;
      const tx = K.el(ESC(o), `left:${X + 56}px;top:${yo + 18}px;font-size:42px;font-weight:600;opacity:0`); tx.classList.add("lx");
      const pc = K.el("0%", `right:${1080 - (X + Wc - 56)}px;top:${yo + 4}px;font-size:60px;opacity:0`); pc.classList.add("lx-num");
      const tr = K.el("", `left:${X + 56}px;top:${yo + 86}px;width:${Wc - 112}px;transform:scaleX(0)`); tr.classList.add("lx-linha"); tr.style.background = "rgba(255,255,255,.2)";
      const br = K.el("", `left:${X + 56}px;top:${yo + 85}px;width:${Wc - 112}px;height:4px;background:${esc ? "#fff" : "rgba(255,255,255,.45)"};transform:scaleX(0);transform-origin:left center`);
      K.ft(tx, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, t0 + 0.6 + i * 0.1);
      linha(K, tr, t0 + 0.65 + i * 0.1, 0.9);
      // depois do toque: as barras andam até a porcentagem e o número conta
      const v = P.porcentagens[i] || 0;
      K.ft(br, { scaleX: 0 }, { scaleX: v / 100, duration: 1.0, ease: "expo.out" }, tt + 0.15 + i * 0.06);
      K.ft(pc, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" }, tt + 0.15);
      K.conta(pc, 0, v, tt + 0.15, 1.0, (x) => Math.round(x) + "%", "expo.out");
      if (!esc) K.ft(tx, { opacity: 1 }, { opacity: 0.55, duration: 0.5, ease: "power2.out" }, tt + 0.2);
      return { tx, pc, tr, br, yo };
    });
    const e = lin[P.escolha] || lin[0];
    toque(K, X + 56 + 90, e.yo + 44, tt, 60);
    K.sfx("lux_rolo", tt + 0.2, 0.6);
    // saída
    fecha(K, sq, ts, 0.45); apaga(K, [rt, ...lin.map((l) => l.tx), ...lin.map((l) => l.pc)], ts, 0.4);
    lin.forEach((l) => { recolhe(K, l.tr, ts, 0.4); recolhe(K, l.br, ts, 0.4); });
  });
})();
