#!/usr/bin/env python3
"""Gera a biblioteca de efeitos sonoros dos motions (sintetizados, sem direitos autorais).
Uso: python3 sfx.py [pasta_saida]   (padrão: assets/sfx ao lado deste arquivo)
hit.wav e whoosh.wav vêm do kit antigo e não são recriados."""
import os, sys, wave
import numpy as np

SR = 48000
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(os.path.abspath(__file__)), "assets", "sfx")
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


if __name__ == "__main__":
    build(); print("sfx em", OUT, sorted(os.listdir(OUT)))
