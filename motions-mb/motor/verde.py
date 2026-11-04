#!/usr/bin/env python3
"""Passa os quadros RGBA de um motion para fundo verde (chroma key). O montar.py --verde chama sozinho.
Uso: python3 verde.py PASTA_DOS_PNG SAIDA.mp4 [--fps 30] [--forca 2.5] [--limiar 0.15] [--contorno 2] [--verde 00ff00] [--marinho 09142c]

Por que não é só pôr o verde atrás: o que é translúcido de propósito (vidro marinho a 80%, rótulo a 74%, linha fina,
palavra apagada) se misturaria com o verde e, depois do chroma key, ficaria esverdeado ou sumiria. Então a
transparência é reforçada (alfa x forca, até 1) e o que falta é completado com o marinho da MB, como se o motion
estivesse sobre um vídeo escuro. Cada pixel sai inteiro (cor sólida) ou verde puro, nunca uma mistura: verde
misturado (verde-escuro de um véu ou de uma entrada em fade) o chroma key não tira direito. Abaixo do limiar de
alfa o pixel vira verde; acima, cor sólida. As entradas em fade viram "acender a partir do marinho".
Contorno: tudo ganha uma borda marinho de 2 px (--contorno). Sem ela, a compressão do vídeo (cor em meia resolução)
mistura o verde na beirada das letras e o texto fino e o rótulo pequeno saem esverdeados depois do chroma key; com
ela a beirada que encosta no verde é escura, o recorte fica limpo e a letra fina continua legível sobre vídeo claro.
Véus e sombras não chegam aqui: o modo verde do motor já tira (eles virariam manchas escuras)."""
import argparse, glob, os, subprocess
import numpy as np
from PIL import Image


def cor(h):
    h = h.lstrip("#")
    return np.array([int(h[i:i + 2], 16) for i in (0, 2, 4)], dtype=np.float32) / 255


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("quadros"); ap.add_argument("saida")
    ap.add_argument("--fps", default="30"); ap.add_argument("--forca", type=float, default=2.5)
    ap.add_argument("--limiar", type=float, default=0.15)
    ap.add_argument("--verde", default="00ff00"); ap.add_argument("--marinho", default="09142c")
    ap.add_argument("--contorno", type=int, default=2)
    a = ap.parse_args()
    fs = sorted(glob.glob(os.path.join(a.quadros, "**", "*.png"), recursive=True))
    if not fs:
        raise SystemExit("nenhum quadro PNG em " + a.quadros)
    W, H = Image.open(fs[0]).size
    G, N = cor(a.verde), cor(a.marinho)
    enc = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", a.fps, "-i", "-",
                            "-vf", "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p", "-c:v", "libx264", "-crf", "14",
                            "-preset", "slow", "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709",
                            "-movflags", "+faststart", a.saida], stdin=subprocess.PIPE)
    for f in fs:
        q = np.asarray(Image.open(f).convert("RGBA"), dtype=np.float32) / 255
        al, F = q[..., 3:4], q[..., :3]
        a2 = np.maximum(np.minimum(1.0, al * a.forca), 1e-6)
        solido = (al * F + (a2 - al) * N) / a2
        # verde que já vem da página (a janela do espelho no 58) vira verde puro. O que se misturou com ele (beirada
        # da janela, vidro ou letra translúcida por cima dela) perde o verde; se ficar escuro, vira o marinho.
        # Nenhuma cor da MB puxa para o verde, então isso só mexe nessas misturas.
        gv = F[..., 1] - np.maximum(F[..., 0], F[..., 2])
        dentro = al[..., 0] >= a.limiar
        m = dentro & (gv <= 0.45)
        mist = m & (gv > 0.04)
        if mist.any():
            d = solido.copy()
            d[..., 1] = np.minimum(d[..., 1], np.maximum(d[..., 0], d[..., 2]))
            escuro = (0.2126 * d[..., 0] + 0.7152 * d[..., 1] + 0.0722 * d[..., 2]) < 0.22
            solido = np.where(mist[..., None], np.where(escuro[..., None], N, d), solido)
        borda = m.copy()
        for _ in range(a.contorno):  # cresce a máscara 1 px por volta, nas 8 direções
            b = borda.copy()
            b[1:] |= borda[:-1]; b[:-1] |= borda[1:]; b[:, 1:] |= borda[:, :-1]; b[:, :-1] |= borda[:, 1:]
            b[1:, 1:] |= borda[:-1, :-1]; b[:-1, :-1] |= borda[1:, 1:]; b[1:, :-1] |= borda[:-1, 1:]; b[:-1, 1:] |= borda[1:, :-1]
            borda = b
        out = np.where(m[..., None], solido, np.where(borda[..., None], N, G))
        enc.stdin.write((np.clip(out, 0, 1) * 255 + 0.5).astype(np.uint8).tobytes())
    enc.stdin.close()
    if enc.wait():
        raise SystemExit("ffmpeg falhou")
    print("verde ok", a.saida, len(fs), "quadros")


if __name__ == "__main__":
    main()
