#!/usr/bin/env python3
"""Recorta a pessoa do vídeo (fundo transparente) para o motion 26 (texto atrás da pessoa).
Uso: python3 recorte.py ENTRADA.mp4 SAIDA.webm
Usa a máscara de segmentação do MediaPipe Pose (corpo inteiro). É recorte de fundo, nada é desenhado no corpo.
Modelo: baixa sozinho para ~/.cache/mb-motions (storage.googleapis.com)."""
import os, sys, subprocess, urllib.request
import numpy as np
import cv2
import mediapipe as mp
from mediapipe.tasks import python as mpp
from mediapipe.tasks.python import vision

URL = "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_heavy/float16/latest/pose_landmarker_heavy.task"
CACHE = os.path.expanduser("~/.cache/mb-motions"); MOD = os.path.join(CACHE, "pose_landmarker_heavy.task")


def main(src, dst):
    os.makedirs(CACHE, exist_ok=True)
    if not os.path.exists(MOD):
        urllib.request.urlretrieve(URL, MOD)
    det = vision.PoseLandmarker.create_from_options(vision.PoseLandmarkerOptions(
        base_options=mpp.BaseOptions(model_asset_path=MOD), running_mode=vision.RunningMode.VIDEO,
        output_segmentation_masks=True, num_poses=2, min_pose_detection_confidence=0.4, min_tracking_confidence=0.4))
    cap = cv2.VideoCapture(src); fps = cap.get(cv2.CAP_PROP_FPS) or 30
    W, H = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)), int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    ff = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgba", "-s", f"{W}x{H}", "-r", str(fps), "-i", "-",
                           "-c:v", "libvpx-vp9", "-pix_fmt", "yuva420p", "-b:v", "6M", "-auto-alt-ref", "0", "-deadline", "good", "-cpu-used", "4", dst], stdin=subprocess.PIPE)
    ant = None; i = 0
    while True:
        ok, bgr = cap.read()
        if not ok:
            break
        rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)
        r = det.detect_for_video(mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb), int(i * 1000 / fps))
        m = np.zeros((H, W), np.float32)
        for s in (r.segmentation_masks or []):
            m = np.maximum(m, s.numpy_view().astype(np.float32).reshape(H, W))
        m = cv2.GaussianBlur(m, (0, 0), 1.6)
        m = np.clip((m - 0.35) / 0.3, 0, 1)  # borda firme, sem halo
        if ant is not None:
            m = 0.65 * m + 0.35 * ant  # suaviza tremida entre quadros
        ant = m
        a = (m * 255).astype(np.uint8)
        ff.stdin.write(np.dstack([rgb, a]).tobytes()); i += 1
    ff.stdin.close(); ff.wait()
    print("recorte ok", dst, i, "quadros")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
