#!/usr/bin/env python3
"""Monta um Reel (ou uma prévia) com os motions da biblioteca MB Saldanha.

Uso:  python3 montar.py SPEC.json [--saida PASTA] [--brutos PASTA] [--so-html] [--final]

O SPEC diz:
  nome        nome do arquivo final
  brutos      pasta dos vídeos brutos (ou --brutos / variável MB_BRUTOS)
  base        lista de peças do vídeo de fundo, em ordem:
                {"src": "IMG_1050.MOV", "ss": 2.0, "dur": 4}                 trecho normal (som original)
                  opções: "vel": 0.5 (câmera lenta/rápida), "foco": [0.5, 0.4] (onde cortar o 9:16),
                          "zoom": 1.1, "som": false, "espelhar": true
                {"tipo": "congela", "src": ..., "ss": 3.2, "dur": 2}         congela o quadro do segundo ss
                {"tipo": "reverso", "src": ..., "ss": 3, "dur": 2, "vel": 3} rebobina o trecho (3x mais rápido)
                {"tipo": "eco", "src": ..., "ss": 3, "dur": 1.5, "vel": 0.3, "copias": 3}  lento com rastro (cópias fantasmas atrás do movimento, sem clarear a imagem)
                {"tipo": "cor", "dur": 3}                                    fundo marinho liso
  extras      vídeos que ficam por cima (rosto do react, "depois" do antes/depois, recorte da pessoa):
                {"id": "rosto", "em": 1.0, "base": [peças...], "som": true}
                {"id": "pessoa", "em": 0, "recorte": true, "base": [peças...]}   (pessoa recortada, fundo transparente)
  motions     lista de motions: {"id": "01", "em": 0.4, ...parâmetros do modelo}
  logo        "sem" (padrão, sem DOMICILIAR) | "domiciliar" | "nenhum"
  espelhos    quantas cópias do fundo os motions podem usar (lupa, card 3D). Padrão: o que o catálogo pede
  musica      caminho de um áudio de música (opcional)   |  "batida": {"bpm": 120, "volume": 0.5}
  voz         volume do som original (padrão 1.0);  "limpar_voz": true aplica o tratamento de voz
  capa        segundo do quadro usado na capa (padrão 1.0)
Saída: NOME.mp4 (completo), NOME-leve.mp4 (~3,5 Mbps) e NOME-capa.jpg em --saida.
"""
import json, os, sys, shutil, subprocess, argparse, html as H

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.dirname(AQUI)
ASSETS = os.path.join(AQUI, "assets")
CAT = json.load(open(os.path.join(RAIZ, "modelos", "catalogo.json")))
TM = ("zscale=t=linear:npl=203,format=gbrpf32le,zscale=p=bt709,tonemap=hable:desat=0,"
      "zscale=t=bt709:m=bt709:r=tv,format=yuv420p")
COR = "eq=contrast=1.04:saturation=1.08"
VOZ = ("highpass=f=90,lowpass=f=12000,afftdn=nf=-28:tn=1,equalizer=f=250:t=q:w=1.2:g=-2,"
       "equalizer=f=3500:t=q:w=1.0:g=3,acompressor=threshold=-22dB:ratio=3:attack=8:release=120:makeup=4")
FPS = 30


def sh(cmd, **kw):
    r = subprocess.run(cmd, **kw)
    if r.returncode:
        raise SystemExit("falhou: " + " ".join(map(str, cmd))[:400])
    return r


def trc(path):
    return subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=color_transfer",
                           "-of", "csv=p=0", path], capture_output=True, text=True).stdout.strip()


def tem_audio(path):
    return bool(subprocess.run(["ffprobe", "-v", "error", "-select_streams", "a", "-show_entries", "stream=index",
                                "-of", "csv=p=0", path], capture_output=True, text=True).stdout.strip())


def enquadra(p, W=1080, Hh=1920):
    fx, fy = p.get("foco", [0.5, 0.5]); z = p.get("zoom", 1.0)
    w, h = int(W * z) // 2 * 2, int(Hh * z) // 2 * 2
    s = f"scale={w}:{h}:force_original_aspect_ratio=increase:flags=lanczos,crop={W}:{Hh}:(iw-{W})*{fx}:(ih-{Hh})*{fy},setsar=1"
    if p.get("espelhar"):
        s += ",hflip"
    return s


def peca(p, brutos, dst, W=1080, Hh=1920):
    """Gera uma peça 1080x1920 30 fps com áudio 48 kHz estéreo (silêncio quando não tem som)."""
    tipo = p.get("tipo", "normal"); dur = float(p["dur"])
    venc = ["-c:v", "libx264", "-crf", "12", "-preset", "fast", "-pix_fmt", "yuv420p", "-r", str(FPS),
            "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709"]
    aenc = ["-c:a", "pcm_s16le", "-ar", "48000", "-ac", "2"]
    if tipo == "cor":
        cor = p.get("cor", "0x0a1b3f")
        sh(["ffmpeg", "-v", "error", "-y", "-f", "lavfi", "-i", f"color=c={cor}:s={W}x{Hh}:r={FPS}:d={dur}",
            "-f", "lavfi", "-i", "anullsrc=r=48000:cl=stereo", "-t", str(dur), *venc, *aenc, "-shortest", dst]); return
    src = p["src"] if os.path.isabs(p["src"]) else os.path.join(brutos, p["src"])
    if not os.path.exists(src):
        raise SystemExit("vídeo bruto não encontrado: " + src)
    # enquadra primeiro (bem mais rápido em vídeo 4K) e depois converte a cor do iPhone sem estourar a luz
    cor = enquadra(p, W, Hh) + "," + (TM + "," if trc(src) in ("arib-std-b67", "smpte2084") else "format=yuv420p,") + COR
    ss = float(p.get("ss", 0)); vel = float(p.get("vel", 1))
    silencio = ["-f", "lavfi", "-i", "anullsrc=r=48000:cl=stereo"]
    if tipo == "congela":
        vf = f"{cor},trim=end_frame=1,tpad=stop_mode=clone:stop_duration={dur},fps={FPS}"
        sh(["ffmpeg", "-v", "error", "-y", "-ss", str(ss), "-i", src, *silencio, "-map", "0:v", "-map", "1:a",
            "-vf", vf, "-t", str(dur), *venc, *aenc, dst]); return
    src_dur = dur * vel
    if tipo == "reverso":
        vf = f"{cor},reverse,setpts=PTS/{vel},fps={FPS}"
        sh(["ffmpeg", "-v", "error", "-y", "-ss", str(ss), "-t", str(src_dur), "-i", src, *silencio, "-map", "0:v", "-map", "1:a",
            "-vf", vf, "-t", str(dur), *venc, *aenc, dst]); return
    if tipo == "eco":
        n = int(p.get("copias", 3)); passo = int(p.get("passo", 4))
        fc = f"[0:v]{cor},setpts=PTS/{vel},fps={FPS},split={n+1}" + "".join(f"[g{i}]" for i in range(n + 1)) + ";"
        cur = "g0"
        for i in range(1, n + 1):
            op = 0.38 * (1 - (i - 1) / (n + 0.5))
            fc += (f"[g{i}]tpad=start={i*passo}:start_mode=clone,trim=end_frame={int(dur*FPS)+i*passo},"
                   f"colorbalance=bs=0.12:bm=0.06:rs=-0.04,eq=brightness=-0.03[t{i}];"
                   f"[{cur}][t{i}]blend=all_mode=normal:all_opacity={op:.2f}[m{i}];")
            cur = f"m{i}"
        fc += f"[{cur}]trim=duration={dur},setpts=PTS-STARTPTS[v]"
        sh(["ffmpeg", "-v", "error", "-y", "-ss", str(ss), "-t", str(src_dur + 1), "-i", src, *silencio,
            "-filter_complex", fc, "-map", "[v]", "-map", "1:a", "-t", str(dur), *venc, *aenc, dst]); return
    # normal (com câmera lenta/rápida opcional)
    vf = f"{cor},setpts=PTS/{vel},fps={FPS}" if vel != 1 else f"{cor},fps={FPS}"
    if p.get("som", True) and tem_audio(src) and 0.5 <= vel <= 2:
        af = f"atempo={vel}," if vel != 1 else ""
        sh(["ffmpeg", "-v", "error", "-y", "-ss", str(ss), "-t", str(src_dur), "-i", src, "-vf", vf,
            "-af", af + "aresample=48000,apad", "-t", str(dur), *venc, *aenc, dst])
    else:
        sh(["ffmpeg", "-v", "error", "-y", "-ss", str(ss), "-t", str(src_dur), "-i", src, *silencio, "-map", "0:v", "-map", "1:a",
            "-vf", vf, "-t", str(dur), *venc, *aenc, dst])


def expande(pecas):
    """Peça "ritmo": {"tipo": "ritmo", "bpm": 120, "batidas": 2, "clipes": [["IMG_0744.MOV", 3.0], ...]} vira cortes no tempo da música."""
    out = []
    for p in pecas:
        if p.get("tipo") == "ritmo":
            d = 60.0 / p["bpm"] * p.get("batidas", 2)
            for c in p["clipes"]:
                q = {"src": c[0], "ss": c[1], "dur": round(d * (c[2] if len(c) > 2 else 1), 4), "som": False}
                q.update(p.get("extra", {})); out.append(q)
        else:
            out.append(p)
    return out


def junta(pecas, brutos, work, nome):
    import hashlib
    pecas = expande(pecas)
    arqs = []
    ECO_V = "eco3"  # mude quando alterar o filtro do eco, para refazer o cache
    cache = os.path.join(os.path.dirname(work), "_cache"); os.makedirs(cache, exist_ok=True)
    for i, p in enumerate(pecas):
        chave = hashlib.md5((json.dumps(p, sort_keys=True) + brutos + COR + TM + (ECO_V if p.get("tipo") == "eco" else "")).encode()).hexdigest()
        d = os.path.join(cache, chave + ".mkv")
        if not os.path.exists(d):
            peca(p, brutos, d + ".tmp.mkv"); os.replace(d + ".tmp.mkv", d)
        arqs.append(d)
    lst = os.path.join(work, f"{nome}_lista.txt")
    open(lst, "w").write("".join(f"file '{a}'\n" for a in arqs))
    mp4, wav = os.path.join(work, nome + ".mp4"), os.path.join(work, nome + ".wav")
    sh(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", lst, "-map", "0:v", "-c:v", "libx264", "-crf", "12",
        "-preset", "fast", "-pix_fmt", "yuv420p", "-r", str(FPS), "-g", "15", "-movflags", "+faststart", mp4])
    sh(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", lst, "-map", "0:a", "-ar", "48000", "-ac", "2", wav])
    return mp4, wav, sum(float(p["dur"]) for p in pecas)


def html_pagina(spec, dur, extras, espelhos, js_arquivos):
    logo = spec.get("logo", "sem")
    b = [f'<div id="cam" class="cam clip" data-start="0" data-duration="{dur:.3f}" data-track-index="0"><video src="assets/base.mp4" '
         f'data-start="0" data-duration="{dur:.3f}" data-track-index="1" class="clip" muted playsinline></video></div>',
         f'<div id="sombra" class="clip" data-start="0" data-duration="{dur:.3f}" data-track-index="2"></div>']
    for i in range(espelhos):
        b.append(f'<div id="mir{i+1}" class="mir clip" data-start="0" data-duration="{dur:.3f}" data-track-index="{3+i}"><video src="assets/base.mp4" '
                 f'data-start="0" data-duration="{dur:.3f}" data-track-index="{6+i}" class="clip" muted playsinline></video></div>')
    for j, (xid, em, xd, arq) in enumerate(extras):
        b.append(f'<div id="x-{xid}" class="xv clip" data-start="0" data-duration="{dur:.3f}" data-track-index="{10+j}"><video src="assets/{arq}" '
                 f'data-start="{em:.3f}" data-duration="{xd:.3f}" data-track-index="{20+j}" class="clip" muted playsinline></video></div>')
    b.append(f'<div id="fx" class="clip" data-start="0" data-duration="{dur:.3f}" data-track-index="40"></div>')
    if logo != "nenhum":
        b.append(f'<img id="logo" class="clip" src="assets/{"logo_white_domiciliar.png" if logo == "domiciliar" else "logo_white.png"}" '
                 f'data-start="0" data-duration="{dur:.3f}" data-track-index="41" />')
    else:
        b.append('<img id="logo" style="display:none" src="assets/logo_white.png" />')
    js_spec = json.dumps({"dur": dur, "motions": spec.get("motions", []), "logo": logo}, ensure_ascii=False)
    scripts = "\n".join(f'<script src="motions/{os.path.basename(f)}"></script>' for f in js_arquivos)
    return f'''<!doctype html><html lang="pt-BR" data-resolution="portrait"><head><meta charset="UTF-8" />
<meta name="viewport" content="width=1080, height=1920" /><title>{H.escape(spec.get("nome", "motion"))}</title>
<script src="assets/gsap.min.js"></script><link rel="stylesheet" href="assets/mb.css" /></head><body>
<div id="root" data-composition-id="main" data-start="0" data-duration="{dur:.3f}" data-width="1080" data-height="1920" data-fps="{FPS}">
{chr(10).join(b)}
</div>
<script src="assets/mb.js"></script>
{scripts}
<script>MB.iniciar({js_spec});</script>
</body></html>'''


def coleta_sfx(proj):
    js = r"""
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  const erros = []; p.on('pageerror', e => erros.push(String(e))); p.on('console', m => { if (m.type() === 'error') erros.push(m.text()); });
  await p.goto('file://' + process.argv[2] + '/index.html'); await p.waitForTimeout(400);
  const s = await p.evaluate(() => window.__MB_SFX || []);
  console.log(JSON.stringify({ sfx: s, erros })); await b.close();
})();"""
    f = os.path.join(proj, "_sfx.cjs"); open(f, "w").write(js)
    r = subprocess.run(["node", f, proj], capture_output=True, text=True, cwd=proj, env=dict(os.environ, NODE_PATH=subprocess.run(["npm", "root", "-g"], capture_output=True, text=True).stdout.strip()))
    os.remove(f)
    try:
        d = json.loads(r.stdout.strip().splitlines()[-1])
    except Exception:
        raise SystemExit("erro lendo a página: " + r.stderr[-800:])
    if d["erros"]:
        print("AVISO erros na página:", d["erros"][:5])
    return d["sfx"]


def batida(bpm, dur, dst, vol):
    """Batida simples (bumbo + chimbal) para prévias. No Reel de verdade, use a música do Instagram."""
    beat = 60.0 / bpm; n = int(dur / beat) + 1
    ins, fl = [], []
    k = 0
    for i in range(n):
        for nome, at, v in (("bumbo", i * beat, 1.0), ("chimbal", i * beat + beat / 2, 0.5)):
            if at < dur:
                ins += ["-i", os.path.join(ASSETS, "sfx", nome + ".wav")]
                ms = int(at * 1000); fl.append(f"[{k}:a]volume={v*vol},adelay={ms}|{ms}[b{k}]"); k += 1
    fl.append("".join(f"[b{i}]" for i in range(k)) + f"amix=inputs={k}:normalize=0,atrim=0:{dur}[o]")
    sh(["ffmpeg", "-v", "error", "-y", *ins, "-filter_complex", ";".join(fl), "-map", "[o]", "-ar", "48000", dst])


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("spec"); ap.add_argument("--saida", default="."); ap.add_argument("--brutos")
    ap.add_argument("--work", default=os.environ.get("MB_WORK", "/tmp/mb-motions-work"))
    ap.add_argument("--so-html", action="store_true"); ap.add_argument("--final", action="store_true")
    a = ap.parse_args()
    spec = json.load(open(a.spec))
    nome = spec["nome"]
    brutos = a.brutos or spec.get("brutos") or os.environ.get("MB_BRUTOS", ".")
    a.work = os.path.abspath(a.work); proj = os.path.join(a.work, nome); shutil.rmtree(proj, ignore_errors=True)
    os.makedirs(os.path.join(proj, "assets")); os.makedirs(os.path.join(proj, "motions"))
    for f in ("gsap.min.js", "Montserrat.ttf", "MontserratItalic.ttf", "logo_white.png", "logo_white_domiciliar.png", "logo_outline.png"):
        shutil.copy(os.path.join(ASSETS, f), os.path.join(proj, "assets", f))
    for f in ("mb.css", "mb.js"):
        shutil.copy(os.path.join(AQUI, f), os.path.join(proj, "assets", f))
    json.dump({"$schema": "https://hyperframes.heygen.com/schema/hyperframes.json", "paths": {"assets": "assets"}, "media": {"autoProxy": True}},
              open(os.path.join(proj, "hyperframes.json"), "w"))
    json.dump({"id": nome, "name": nome}, open(os.path.join(proj, "meta.json"), "w"))
    # motions usados (e os que eles chamam por dentro)
    ids = set(m["id"] for m in spec.get("motions", []))
    for i in list(ids):
        ids |= set(CAT[i].get("usa", []))
    arquivos = sorted(set(os.path.join(RAIZ, "modelos", CAT[i]["arquivo"]) for i in ids))
    extras_js = sorted(set(f for i in ids for f in CAT[i].get("usa_arquivos", [])))
    arquivos = [os.path.join(RAIZ, "modelos", f) for f in extras_js] + arquivos
    for f in arquivos:
        shutil.copy(f, os.path.join(proj, "motions", os.path.basename(f)))
    espelhos = spec.get("espelhos", max([CAT[i].get("espelhos", 0) for i in ids] + [0]))
    # vídeo de fundo
    base_mp4, base_wav, dur = junta(spec["base"], brutos, proj, "_base")
    shutil.move(base_mp4, os.path.join(proj, "assets", "base.mp4"))
    extras, audios = [], []
    for x in spec.get("extras", []):
        mp4, wav, xd = junta(x["base"], brutos, proj, "_x_" + x["id"])
        arq = "x-" + x["id"] + ".mp4"
        if x.get("recorte"):
            arq = "x-" + x["id"] + ".webm"
            sh([sys.executable, os.path.join(AQUI, "recorte.py"), mp4, os.path.join(proj, "assets", arq)])
        else:
            shutil.move(mp4, os.path.join(proj, "assets", arq))
        extras.append((x["id"], float(x.get("em", 0)), xd, arq))
        if x.get("som"):
            audios.append((wav, float(x.get("em", 0)), float(x.get("volume", 1))))
    open(os.path.join(proj, "index.html"), "w").write(html_pagina(spec, dur, extras, espelhos, arquivos))
    sfx = coleta_sfx(proj)
    print(f"projeto {proj}  duração {dur:.2f}s  sfx {len(sfx)}")
    if a.so_html:
        return
    vid = os.path.join(proj, "_video.mp4")
    q = ["--crf", "10", "--video-frame-format", "png"] if a.final or spec.get("final") else ["--crf", "14"]
    sh(["hyperframes", "render", proj, "-o", vid, "--sdr", "--quiet", *q])
    # áudio: som original + extras + efeitos + música
    ins, fl, k = [], [], 0
    vz = float(spec.get("voz", 1.0)); limpar = VOZ + "," if spec.get("limpar_voz") else ""
    ins += ["-i", base_wav]; fl.append(f"[0:a]{limpar}volume={vz}[a0]"); k = 1
    for wav, em, vol in audios:
        ms = int(em * 1000); ins += ["-i", wav]; fl.append(f"[{k}:a]{limpar}volume={vol},adelay={ms}|{ms}[a{k}]"); k += 1
    if spec.get("batida"):
        bt = os.path.join(proj, "_batida.wav"); batida(spec["batida"]["bpm"], dur, bt, spec["batida"].get("volume", 0.5))
        ins += ["-i", bt]; fl.append(f"[{k}:a]anull[a{k}]"); k += 1
    if spec.get("musica"):
        ins += ["-i", spec["musica"]]; fl.append(f"[{k}:a]volume={spec.get('volume_musica', 0.35)},atrim=0:{dur}[a{k}]"); k += 1
    for nome_s, at, vol in sfx:
        f = os.path.join(ASSETS, "sfx", nome_s + ".wav")
        if not os.path.exists(f):
            print("AVISO som não existe:", nome_s); continue
        ms = int(at * 1000); ins += ["-i", f]; fl.append(f"[{k}:a]volume={vol},adelay={ms}|{ms}[a{k}]"); k += 1
    fl.append("".join(f"[a{i}]" for i in range(k)) + f"amix=inputs={k}:normalize=0,apad,atrim=0:{dur},loudnorm=I=-14:TP=-1.5:LRA=11[o]")
    aud = os.path.join(proj, "_audio.wav")
    sh(["ffmpeg", "-v", "error", "-y", *ins, "-filter_complex", ";".join(fl), "-map", "[o]", "-ar", "48000", aud])
    os.makedirs(a.saida, exist_ok=True)
    full = os.path.join(a.saida, nome + ".mp4")
    sh(["ffmpeg", "-v", "error", "-y", "-i", vid, "-i", aud, "-map", "0:v", "-map", "1:a", "-c:v", "libx264", "-crf", "16" if not a.final else "14",
        "-preset", "slow", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart", full])
    sh(["ffmpeg", "-v", "error", "-y", "-i", full, "-c:v", "libx264", "-b:v", "3.5M", "-maxrate", "4M", "-bufsize", "8M", "-preset", "medium",
        "-c:a", "copy", "-movflags", "+faststart", os.path.join(a.saida, nome + "-leve.mp4")])
    sh(["ffmpeg", "-v", "error", "-y", "-ss", str(spec.get("capa", 1.0)), "-i", full, "-frames:v", "1", "-q:v", "2", os.path.join(a.saida, nome + "-capa.jpg")])
    print("OK", full)


if __name__ == "__main__":
    main()
