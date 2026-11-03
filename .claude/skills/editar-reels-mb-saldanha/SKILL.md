---
name: "editar-reels-mb-saldanha"
description: "Use para editar ou criar Reels/vídeos verticais do Instagram da MB Saldanha com FFmpeg, whisper.cpp, Remotion, HyperFrames e yt-dlp."
---

# Editar Reels da MB Saldanha

Formato padrão: 1080x1920, 30 fps, H.264 + AAC, até 90 s. Responda sempre em português.

## 1. Conferir ferramentas
- `ffmpeg -version`, `yt-dlp --version`, `hyperframes doctor`, `whisper-cli --help`.
- Se faltar algo, rode o script `/mnt/project-files/videos-teste/setup-ferramentas-video.sh`.
- Se um domínio for bloqueado pela rede (huggingface.co, cdn.jsdelivr.net, remotion.media, youtube.com), diga qual e siga com o resto.

## 2. Material bruto (FFmpeg)
- Cortar: `ffmpeg -ss INICIO -to FIM -i in.mp4 -c:v libx264 -c:a aac corte.mp4`
- Vertical a partir de horizontal: `-vf "crop=ih*9/16:ih,scale=1080:1920"`
- Juntar clipes de origens diferentes: use o filtro `concat` (não o demuxer), normalizando `fps=30,setsar=1` antes.
- Extrair áudio para legenda: `ffmpeg -i in.mp4 -ar 16000 -ac 1 audio.wav`

## 3. Legendas (whisper.cpp)
- `whisper-cli -m /opt/whisper.cpp/models/ggml-small.bin -l pt -osrt -f audio.wav`
- Queimar no vídeo: `ffmpeg -i in.mp4 -vf "subtitles=audio.wav.srt:force_style='FontSize=14,Alignment=2,MarginV=60'" out.mp4`
- Revise nomes próprios (Ullisses, Maria Beatriz, MB Saldanha) no .srt antes de queimar.

## 4. Motion graphics
- HyperFrames (HTML + GSAP): `hyperframes init NOME --resolution portrait --non-interactive --skip-skills`, edite `index.html`, `npx hyperframes render -o out.mp4`. Se o CDN do GSAP estiver bloqueado, instale `gsap` via npm e aponte o `<script>` para o arquivo local. Também aceita `--video` para legendar e animar sobre um vídeo existente.
- Remotion (React): projeto com `remotion` e `@remotion/cli`; render com `npx remotion render src/index.ts ID out.mp4`. Se o download do Chrome falhar, passe `--browser-executable=/opt/pw-browsers/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell`.
- Use HyperFrames para vinhetas, contadores de flexões e textos animados rápidos; Remotion para modelos reutilizáveis com dados (ex.: ranking semanal do app de flexão).

## 5. Referências (yt-dlp)
- `yt-dlp -f "bv*[height<=1080]+ba" -o "ref/%(title)s.%(ext)s" URL` só para estudo; não reposte conteúdo de terceiros.

## 6. Entrega
- Salve o final em `/mnt/project-files/reels/AAAA-MM-DD-tema.mp4`, confira com `ffprobe` (1080x1920, duração) e gere um frame de capa com `ffmpeg -ss 1 -frames:v 1 capa.jpg`.
- Anexe o vídeo na resposta.