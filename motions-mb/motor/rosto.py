#!/usr/bin/env python3
"""Enquadra o rosto no centro de um quadrado (para o círculo do React, motion 36, e bolhas de rosto).
Uso: python3 rosto.py ENTRADA.mp4 SAIDA.mp4 [--lado 600] [--folga 2.5] [--som]
Acha olhos, nariz e boca com o MediaPipe Pose em vários quadros, usa a mediana (câmera parada, sem tremer),
corta um quadrado com o rosto no meio (com --endireitar, também gira para nivelar os olhos).
--folga: quantas vezes a largura do rosto cabe no quadrado (2.5 = rosto grande e inteiro, com um pouco de ombro)."""
import argparse, math, os, subprocess, urllib.request
import numpy as np
import cv2
import mediapipe as mp
from mediapipe.tasks import python as mpp
from mediapipe.tasks.python import vision

URL = "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_heavy/float16/latest/pose_landmarker_heavy.task"
CACHE = os.path.expanduser("~/.cache/mb-motions"); MOD = os.path.join(CACHE, "pose_landmarker_heavy.task")


def medir(src, amostras=12):
    os.makedirs(CACHE, exist_ok=True)
    if not os.path.exists(MOD):
        urllib.request.urlretrieve(URL, MOD)
    det = vision.PoseLandmarker.create_from_options(vision.PoseLandmarkerOptions(
        base_options=mpp.BaseOptions(model_asset_path=MOD), running_mode=vision.RunningMode.IMAGE, num_poses=1))
    cap = cv2.VideoCapture(src); n = int(cap.get(cv2.CAP_PROP_FRAME_COUNT)) or 1
    W, H = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)), int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    cx, cy, lw, ang = [], [], [], []
    for k in range(amostras):
        cap.set(cv2.CAP_PROP_POS_FRAMES, int((k + 0.5) * n / amostras))
        ok, bgr = cap.read()
        if not ok:
            continue
        r = det.detect(mp.Image(image_format=mp.ImageFormat.SRGB, data=cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)))
        if not r.pose_landmarks:
            continue
        L = r.pose_landmarks[0]; p = lambda i: (L[i].x * W, L[i].y * H)
        oe, od, nz, b1, b2, o1, o2 = p(2), p(5), p(0), p(9), p(10), p(7), p(8)
        olhos = ((oe[0] + od[0]) / 2, (oe[1] + od[1]) / 2); boca = ((b1[0] + b2[0]) / 2, (b1[1] + b2[1]) / 2)
        cx.append((olhos[0] + boca[0]) / 2); cy.append((olhos[1] + boca[1]) / 2 - 0.4 * abs(boca[1] - olhos[1]))  # sobe um pouco para caber o cabelo
        lw.append(max(math.dist(o1, o2), 2.2 * math.dist(oe, od)))
        ang.append(math.degrees(math.atan2(od[1] - oe[1], od[0] - oe[0])))
    if not cx:
        raise SystemExit("rosto não encontrado em " + src)
    a = float(np.median(ang)); a = a - 180 if a > 90 else (a + 180 if a < -90 else a)
    return W, H, float(np.median(cx)), float(np.median(cy)), float(np.median(lw)), a


def main():
    ap = argparse.ArgumentParser(); ap.add_argument("src"); ap.add_argument("dst")
    ap.add_argument("--lado", type=int, default=600); ap.add_argument("--folga", type=float, default=2.3)
    ap.add_argument("--som", action="store_true")
    ap.add_argument("--endireitar", action="store_true", help="gira o quadro para deixar os olhos nivelados"); a = ap.parse_args()
    W, H, cx, cy, lw, ang = medir(a.src)
    lado = min(lw * a.folga, W, H)
    gira = ang if (a.endireitar and abs(ang) > 2.0) else 0.0  # só gira se pedir (--endireitar)
    big = min(lado * 1.42, W, H)  # quadro maior em volta do rosto, para girar sem cantos pretos
    x = min(max(cx - big / 2, 0), W - big); y = min(max(cy - big / 2, 0), H - big)
    # o rosto pode não ficar no meio do quadro maior quando ele encosta na borda: compensa no corte final
    fx, fy = cx - x - big / 2, cy - y - big / 2
    th = math.radians(gira)
    rx, ry = fx * math.cos(th) + fy * math.sin(th), -fx * math.sin(th) + fy * math.cos(th)
    vf = [f"crop={big:.0f}:{big:.0f}:{x:.0f}:{y:.0f}"]
    if gira:
        vf.append(f"rotate={gira:.3f}*PI/180:c=black")
    ox = min(max(big / 2 + rx - lado / 2, 0), big - lado); oy = min(max(big / 2 + ry - lado / 2, 0), big - lado)
    vf += [f"crop={lado:.0f}:{lado:.0f}:{ox:.0f}:{oy:.0f}", f"scale={a.lado}:{a.lado}:flags=lanczos", "format=yuv420p"]
    cmd = ["ffmpeg", "-v", "error", "-y", "-i", a.src, "-vf", ",".join(vf), "-c:v", "libx264", "-crf", "14", "-preset", "medium"]
    cmd += (["-c:a", "aac", "-b:a", "160k"] if a.som else ["-an"]) + [a.dst]
    subprocess.run(cmd, check=True)
    print(f"rosto ok {a.dst} centro=({cx:.0f},{cy:.0f}) lado={lado:.0f} inclinação={ang:.1f}° corrigida={gira:.1f}°")


if __name__ == "__main__":
    main()
