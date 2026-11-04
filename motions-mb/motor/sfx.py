#!/usr/bin/env python3
"""Gera a biblioteca de efeitos sonoros dos motions (sintetizados, sem direitos autorais).
Uso: python3 sfx.py [pasta_saida]   (padrão: assets/sfx ao lado deste arquivo)
hit.wav e whoosh.wav vêm do kit antigo e não são recriados."""
import os, sys, wave
import numpy as np

SR = 48000
OUT = sys.argv[1] if len(sys.argv) > 1 and not sys.argv[1].startswith("--") else os.path.join(os.path.dirname(os.path.abspath(__file__)), "assets", "sfx")
rng = np.random.default_rng(7)


def t(d):
    return np.arange(int(SR * d)) / SR


def env(n, a=0.002, r=0.2, shape=6.0):
    x = np.arange(n) / SR
    e = np.minimum(1, x / max(a, 1e-4)) * np.exp(-x / max(r, 1e-4) * (shape / 6))
    return e


def lp(x, fc):
    a = np.exp(-2 * np.pi * fc / SR); y = np.zeros_like(x); s = 0.0
    for i, v in enumerate(x):
        s = (1 - a) * v + a * s; y[i] = s
    return y


def hp(x, fc):
    return x - lp(x, fc)


def noise(d):
    return rng.standard_normal(int(SR * d))


def mix(*xs):
    n = max(len(a) for a in xs); y = np.zeros(n)
    for a in xs:
        y[:len(a)] += a
    return y


def save(name, x, gain=0.9):
    x = np.asarray(x, dtype=np.float64)
    m = np.max(np.abs(x)) or 1
    x = x / m * gain
    st = np.stack([x, x], 1)
    with wave.open(os.path.join(OUT, name + ".wav"), "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((st * 32767).astype("<i2").tobytes())


def metal(d=0.9, f0=420, ring=0.35):
    x = t(d); y = np.zeros_like(x)
    for k, (m, a) in enumerate([(1, 1), (2.76, .7), (5.4, .5), (8.93, .35), (13.3, .2)]):
        y += a * np.sin(2 * np.pi * f0 * m * x + k) * np.exp(-x / (ring / (1 + k * .5)))
    y += 0.6 * hp(noise(d), 2000) * np.exp(-x / 0.02)
    return y


def thump(d=0.5, f0=70, r=0.12):
    x = t(d); f = f0 * (1 + 2.5 * np.exp(-x / 0.03))
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-x / r)


def build():
    os.makedirs(OUT, exist_ok=True)
    # anilha encaixando na barra
    save("metal", metal())
    # anilha quicando no chão (3 batidas)
    y = np.zeros(int(SR * 1.2))
    for i, (at, g) in enumerate([(0, 1), (.28, .55), (.47, .3), (.6, .15)]):
        s = mix(metal(.5, 300 + i * 15, .12) * g, thump(.3, 60, .06) * g)
        o = int(at * SR); y[o:o + len(s)] += s[:len(y) - o]
    save("quica", y)
    # carimbo
    save("carimbo", thump(.45, 55, .1) + .5 * lp(noise(.45), 1500) * np.exp(-t(.45) / .035))
    # selo (carimbo azul, mais seco + ding curto)
    x = t(.6)
    save("selo", thump(.6, 80, .07) + .25 * np.sin(2 * np.pi * 1320 * x) * np.exp(-x / .15))
    # apito de juiz
    x = t(.55); f = 2900 + 120 * np.sin(2 * np.pi * 38 * x)
    a = np.minimum(1, x / .02) * np.minimum(1, (0.55 - x) / .06)
    save("apito", (np.sin(2 * np.pi * np.cumsum(f) / SR) + .25 * hp(noise(.55), 3000)) * a, .6)
    # tique de cronômetro
    x = t(.06); save("tique", hp(noise(.06), 3000) * np.exp(-x / .004) + np.sin(2 * np.pi * 2400 * x) * np.exp(-x / .01), .7)
    # bip de monitor cardíaco
    x = t(.16); save("bip", np.sin(2 * np.pi * 1000 * x) * np.minimum(1, (0.16 - x) / .02) * np.minimum(1, x / .005), .5)
    # batimento (lub-dub)
    y = np.zeros(int(SR * .7)); a = thump(.25, 50, .05); b = thump(.25, 45, .045) * .7
    y[:len(a)] += a; o = int(.18 * SR); y[o:o + len(b)] += b
    save("coracao", lp(y, 400))
    # tecla de teclado
    x = t(.05); save("tecla", mix(hp(noise(.05), 1800) * np.exp(-x / .006), .4 * thump(.05, 180, .01)), .55)
    # fita rebobinando
    d = 1.0; x = t(d); f = 300 + 900 * x / d + 60 * np.sin(2 * np.pi * 7 * x)
    y = .5 * np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) + hp(noise(d), 1500)
    save("fita", lp(y, 5000) * np.minimum(1, x / .05) * np.minimum(1, (d - x) / .1), .55)
    # pop
    x = t(.12); f = 900 * np.exp(-x / .03) + 200
    save("pop", np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-x / .03), .7)
    # crec (estalo)
    y = np.zeros(int(SR * .35))
    for at in (0, .025, .06):
        s = hp(noise(.04), 1200) * np.exp(-t(.04) / .004); o = int(at * SR); y[o:o + len(s)] += s
    save("crec", mix(y, .3 * thump(.35, 90, .05)))
    # subida (riser)
    d = 1.2; x = t(d); f = 200 * (8 ** (x / d))
    y = .4 * np.sin(2 * np.pi * np.cumsum(f) / SR) + hp(noise(d), 2000) * (x / d) ** 2
    save("sobe", y * (x / d) ** 1.5 * np.minimum(1, (d - x) / .03), .6)
    # impacto grave
    save("grave", thump(1.0, 42, .35) + .3 * lp(noise(1.0), 300) * np.exp(-t(1.0) / .2))
    # confete / brilho
    y = np.zeros(int(SR * 1.2))
    for i in range(26):
        f0 = rng.uniform(2200, 6000); at = rng.uniform(0, .7); s = np.sin(2 * np.pi * f0 * t(.15)) * np.exp(-t(.15) / .03)
        o = int(at * SR); y[o:o + len(s)] += s * rng.uniform(.3, 1)
    save("confete", y + .3 * hp(noise(1.2), 4000) * np.exp(-t(1.2) / .25), .5)
    # sucesso (dois tons)
    y = np.zeros(int(SR * .7))
    for at, f0 in ((0, 880), (.11, 1320)):
        s = np.sin(2 * np.pi * f0 * t(.5)) * np.exp(-t(.5) / .14); o = int(at * SR); y[o:o + len(s)] += s
    save("sucesso", y, .55)
    # erro (buzz grave)
    x = t(.4); save("erro", np.sign(np.sin(2 * np.pi * 110 * x)) * .5 * np.minimum(1, (0.4 - x) / .05), .45)
    # caneta escrevendo
    d = .9; x = t(d); m = .5 + .5 * np.abs(np.sin(2 * np.pi * 5.5 * x))
    save("caneta", lp(hp(noise(d), 2500), 7000) * m * np.minimum(1, (d - x) / .05) * np.minimum(1, x / .03), .35)
    # virada de placa/card
    d = .35; x = t(d); save("virar", lp(noise(d), 1800) * np.sin(np.pi * x / d) ** 2, .6)
    # bumbo e chimbal para a batida das prévias
    save("bumbo", thump(.4, 50, .09)); x = t(.08); save("chimbal", hp(noise(.08), 7000) * np.exp(-x / .015), .35)
    # trava (encaixe seco)
    save("trava", mix(metal(.25, 900, .05), thump(.25, 120, .03)))


def quadrada(f, d, duty=0.5, vol=1.0):
    """onda quadrada de videogame (8 bits) com frequência que pode variar no tempo (f = número ou array)"""
    x = t(d); f = np.broadcast_to(np.asarray(f, dtype=float), x.shape)
    ph = np.cumsum(f) / SR
    return vol * np.where((ph % 1.0) < duty, 1.0, -1.0)


def notas(seq, dur, duty=0.5, dec=0.9):
    """sequência de notas quadradas: seq = [freq, ...], cada uma com 'dur' segundos"""
    y = []
    for f in seq:
        n = quadrada(f, dur, duty) * np.exp(-t(dur) / (dur * dec))
        y.append(n)
    return np.concatenate(y)


def crush(x, passo=6):
    """reduz a taxa de amostragem (som de console antigo)"""
    y = x.copy()
    for i in range(0, len(y), passo):
        y[i:i + passo] = y[i]
    return y


def pixel():
    """efeitos de 8 bits para os motions em pixel art (prefixo px_)"""
    os.makedirs(OUT, exist_ok=True)
    save("px_blip", quadrada(880, .035, .25) * np.exp(-t(.035) / .02), .35)
    d = .16; x = t(d); save("px_hit", crush(quadrada(420 * np.exp(-x / .05) + 90, d, .5) * .6 + noise(d) * .5, 8) * np.exp(-x / .07), .7)
    save("px_dano", crush(quadrada(np.linspace(300, 120, int(SR * .22)), .22, .5), 6) * np.exp(-t(.22) / .12), .6)
    save("px_moeda", np.concatenate([quadrada(988, .07, .5), quadrada(1319, .25, .5) * np.exp(-t(.25) / .1)]), .45)
    save("px_levelup", notas([523, 659, 784, 1047, 784, 1047, 1319], .075, .5, 1.6), .5)
    d = .9; x = t(d); save("px_ko", crush(noise(d), 24) * np.exp(-x / .3) * .9 + quadrada(np.linspace(220, 40, int(SR * d)), d, .5) * np.exp(-x / .25) * .5, .8)
    save("px_salvar", notas([660, 880, 1320], .09, .5, 1.2), .45)
    d = .3; x = t(d); save("px_corte", crush(quadrada(np.linspace(1600, 200, int(SR * d)), d, .5), 4) * np.minimum(1, (d - x) / .05), .35)
    save("px_passo", quadrada(np.linspace(600, 900, int(SR * .06)), .06, .5) * np.exp(-t(.06) / .03), .3)


def lp_var(x, fcs):
    """passa-baixa de um polo com corte que muda no tempo (fcs = array do mesmo tamanho)"""
    y = np.zeros_like(x); s = 0.0
    a = np.exp(-2 * np.pi * np.asarray(fcs) / SR)
    for i, v in enumerate(x):
        s = (1 - a[i]) * v + a[i] * s; y[i] = s
    return y


def sino(f0, d, partes=((1, 1, 1.0), (2.0, .32, .55), (3.0, .12, .35), (4.2, .05, .25))):
    """sino suave: parciais com decaimento próprio (mult, amplitude, decaimento em s)"""
    x = t(d); y = np.zeros_like(x)
    for m, a, r in partes:
        y += a * np.sin(2 * np.pi * f0 * m * x) * np.exp(-x / r)
    return y * np.minimum(1, x / .004)


def luxo():
    """sons discretos da linha premium (prefixo lux_): ar, grave, clique, sino. Nada de pop ou carimbo."""
    os.makedirs(OUT, exist_ok=True)
    # ar: sopro filtrado que cresce e some (entrada de título)
    d = .8; x = t(d); e = np.sin(np.pi * np.clip(x / d, 0, 1)) ** 2
    save("lux_ar", hp(lp(noise(d), 2200), 300) * e, .38)
    # grave: batida funda e curta, com um harmônico para aparecer no celular
    d = 1.3; x = t(d); f = 64 * (1 + .45 * np.exp(-x / .05))
    ph = 2 * np.pi * np.cumsum(f) / SR
    g = (np.sin(ph) + .28 * np.sin(2 * ph)) * np.exp(-x / .42) * np.minimum(1, x / .004)
    save("lux_grave", g + .12 * lp(noise(d), 700) * np.exp(-x / .012), .8)
    # clique: tique fino de relógio (contador)
    d = .07; x = t(d)
    save("lux_clique", np.sin(2 * np.pi * 2900 * x) * np.exp(-x / .009) + .35 * hp(noise(d), 4000) * np.exp(-x / .003), .32)
    # rolo: três cliques rápidos que diminuem (número trocando)
    y = np.zeros(int(SR * .2))
    for i, (at, g2) in enumerate([(0, 1), (.055, .6), (.105, .35)]):
        c = np.sin(2 * np.pi * (2600 - i * 200) * t(.05)) * np.exp(-t(.05) / .008) * g2
        o = int(at * SR); y[o:o + len(c)] += c
    save("lux_rolo", y, .3)
    # traço: risco leve de linha sendo desenhada
    d = .9; x = t(d); e = np.minimum(1, x / .25) * np.clip((d - x) / .45, 0, 1)
    save("lux_traco", hp(noise(d), 3500) * e * (.6 + .4 * np.sin(2 * np.pi * 9 * x)), .14)
    # passagem: sopro que desce de agudo para grave (troca de cena)
    d = .55; x = t(d); fc = 7000 * np.exp(-x / .18) + 400
    e = np.minimum(1, x / .22) * np.clip((d - x) / .33, 0, 1)
    save("lux_passagem", lp_var(noise(d), fc) * e, .45)
    # sino: duas notas suaves (assinatura sonora do salvar)
    s1 = sino(1046.5, 1.9); s2 = sino(1318.5, 1.8) * .7
    y = np.zeros(int(SR * 2.0)); y[:len(s1)] += s1; o = int(.12 * SR); y[o:o + len(s2)] += s2[:len(y) - o]
    save("lux_sino", y, .42)
    # toque: batida macia de botão (encaixe)
    d = .22; x = t(d)
    save("lux_toque", thump(d, 150, .045) + .25 * np.sin(2 * np.pi * 1800 * x) * np.exp(-x / .01), .5)


if __name__ == "__main__":
    if "--pixel" in sys.argv:
        pixel()
    elif "--luxo" in sys.argv:
        luxo()
    else:
        build(); pixel(); luxo()
    print("sfx em", OUT, sorted(os.listdir(OUT)))
