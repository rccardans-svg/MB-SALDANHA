#!/usr/bin/env python3
"""Gera a lista de palavras com tempo para o motion 25 (palavra que bate com a voz).
Uso: python3 transcrever.py VIDEO [--ss 2.3] [--dur 6] [--chaves dor,erros] [--modelo /opt/whisper.cpp/models/ggml-small.bin]
Saída (stdout): JSON [[inicio, fim, "PALAVRA"], ...] com tempos a partir do --ss. Palavras em --chaves saem como *PALAVRA*.
Cole o resultado em "palavras" do motion 25 (e ajuste o "em" para o ponto do vídeo final onde esse trecho começa)."""
import argparse, json, os, subprocess, tempfile, re

ap = argparse.ArgumentParser()
ap.add_argument("video"); ap.add_argument("--ss", type=float, default=0); ap.add_argument("--dur", type=float)
ap.add_argument("--chaves", default=""); ap.add_argument("--modelo", default="/opt/whisper.cpp/models/ggml-small.bin")
a = ap.parse_args()
tmp = tempfile.mkdtemp()
wav = os.path.join(tmp, "a.wav")
cmd = ["ffmpeg", "-v", "error", "-y", "-ss", str(a.ss)] + (["-t", str(a.dur)] if a.dur else []) + ["-i", a.video, "-ac", "1", "-ar", "16000", wav]
subprocess.run(cmd, check=True)
subprocess.run(["whisper-cli", "-m", a.modelo, "-l", "pt", "-ml", "1", "-sow", "-oj", "-of", os.path.join(tmp, "o"), "-f", wav],
               check=True, capture_output=True)
d = json.load(open(os.path.join(tmp, "o.json")))
chaves = {c.strip().upper() for c in a.chaves.split(",") if c.strip()}
out = []
for seg in d.get("transcription", []):
    w = seg["text"].strip()
    if not w or re.fullmatch(r"[\W_]+", w):
        continue
    t0, t1 = seg["offsets"]["from"] / 1000, seg["offsets"]["to"] / 1000
    W = re.sub(r"[.,!?;:…]+$", "", w).upper()
    if re.sub(r"\W", "", W) in {re.sub(r"\W", "", c) for c in chaves}:
        W = "*" + W + "*"
    out.append([round(t0, 2), round(t1, 2), W])
print(json.dumps(out, ensure_ascii=False))
