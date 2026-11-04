#!/usr/bin/env python3
"""Palavras com tempo, tiradas da fala do vídeo (whisper.cpp), para os motions que batem com a voz.
Uso: python3 transcrever.py VIDEO [--ss 2.3] [--dur 6] [--chaves dor,erros] [--formato 25|56] [--prompt "texto do roteiro"]
     [--modelo /opt/whisper.cpp/models/ggml-small.bin]

--formato 25 (padrão): JSON [[inicio, fim, "PALAVRA"], ...] com tempos a partir do --ss. Palavras em --chaves saem como *PALAVRA*.
    Cole em "palavras" do motion 25 (e ajuste o "em" para o ponto do vídeo final onde esse trecho começa).
--formato 56: JSON {"frase": "...", "tempos": [...]} para a legenda que acompanha a voz (motion 56). Os tempos são o início
    de cada palavra, a partir do --ss; use o mesmo --ss do trecho e coloque o "em" do motion onde esse trecho entra no vídeo final.
--prompt: o texto do roteiro (ou palavras difíceis, como nomes de exercício). Ajuda o whisper a acertar a grafia.

Os tempos do whisper são aproximados (erram uns 0,1 s). Confira com snapshot no começo de cada palavra e ajuste à mão
se a faixa azul chegar antes ou depois da voz."""
import argparse, json, os, subprocess, tempfile, re

ap = argparse.ArgumentParser()
ap.add_argument("video"); ap.add_argument("--ss", type=float, default=0); ap.add_argument("--dur", type=float)
ap.add_argument("--chaves", default=""); ap.add_argument("--modelo", default="/opt/whisper.cpp/models/ggml-small.bin")
ap.add_argument("--formato", choices=["25", "56"], default="25"); ap.add_argument("--prompt", default="")
a = ap.parse_args()
tmp = tempfile.mkdtemp()
wav = os.path.join(tmp, "a.wav")
cmd = ["ffmpeg", "-v", "error", "-y", "-ss", str(a.ss)] + (["-t", str(a.dur)] if a.dur else []) + ["-i", a.video, "-ac", "1", "-ar", "16000", wav]
subprocess.run(cmd, check=True)
w_cmd = ["whisper-cli", "-m", a.modelo, "-l", "pt", "-ml", "1", "-sow", "-oj", "-of", os.path.join(tmp, "o"), "-f", wav]
if a.prompt:
    w_cmd += ["--prompt", a.prompt]
subprocess.run(w_cmd, check=True, capture_output=True)
d = json.load(open(os.path.join(tmp, "o.json")))
chaves = {re.sub(r"\W", "", c.strip().upper()) for c in a.chaves.split(",") if c.strip()}
out = []
for seg in d.get("transcription", []):
    w = seg["text"].strip()
    if not w or re.fullmatch(r"[\W_]+", w):
        continue
    t0, t1 = seg["offsets"]["from"] / 1000, seg["offsets"]["to"] / 1000
    W = w.upper() if a.formato == "56" else re.sub(r"[.,!?;:…]+$", "", w).upper()
    if a.formato == "25" and re.sub(r"\W", "", W) in chaves:
        W = "*" + W + "*"
    out.append([round(t0, 2), round(t1, 2), W])
if a.formato == "56":
    print(json.dumps({"frase": " ".join(w for _, _, w in out), "tempos": [t for t, _, _ in out]}, ensure_ascii=False))
else:
    print(json.dumps(out, ensure_ascii=False))
