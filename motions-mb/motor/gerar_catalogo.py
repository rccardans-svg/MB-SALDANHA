#!/usr/bin/env python3
"""Gera CATALOGO.md com o nome e os parâmetros padrão de cada motion (lê os modelos com node)."""
import json, os, subprocess
AQUI = os.path.dirname(os.path.abspath(__file__)); RAIZ = os.path.dirname(AQUI)
d = json.loads(subprocess.run(["node", os.path.join(AQUI, "params.js"), os.path.join(RAIZ, "modelos")],
                              capture_output=True, text=True, check=True).stdout)
GRUPOS = {"A": "Academia e performance", "B": "Erro x certo", "C": "Corpo e fisioterapia (Maria)",
          "D": "Texto e legenda", "E": "Transições e câmera", "F": "Séries e app X1",
          "G": "Chamadas e identidade (primeira versão; serão refeitas no estilo que o Paulo escolher)",
          "H": "Dados com fonte (estilo editorial)", "I": "Desenho na tela", "J": "Formatos que viralizam",
          "L": "Linha premium (amostra de estilo: amostras-estilo/amostra-premium.mp4)",
          "P": "Pixel art (amostra de estilo: amostras-estilo/amostra-pixel.mp4)"}
# só entra no catálogo o que o montar.py consegue usar (o que está em modelos/catalogo.json)
CAT = json.load(open(os.path.join(RAIZ, "modelos", "catalogo.json")))
d = {k: v for k, v in d.items() if k in CAT}
linhas = ["# Catálogo dos motions MB Saldanha", "",
          "Gerado por `motor/gerar_catalogo.py`. Cada motion se pede pelo número. Os tempos são em segundos, contados a partir do `em`.",
          "Texto: `*palavra*` vira faixa azul, `_palavra_` vira faixa vermelha (erro) e `|` quebra a linha.", ""]
grupo = None
for k in sorted(d):
    m = d[k]; g = m["__arquivo"][0]
    if g != grupo:
        grupo = g; linhas += [f"## {g}. {GRUPOS[g]}", ""]
    linhas.append(f"### {k}. {m['__titulo']}")
    if k[:1].isdigit():
        linhas.append(f"Prévia: `previa-{k}.mp4`. Exemplo de spec: `exemplos/previa-{k}.json`.")
    else:
        linhas.append(f"Aparece na amostra do grupo. Spec da amostra: `exemplos/amostra-{'premium' if k.startswith('lux') else 'pixel'}.json`.")
    linhas.append("")
    for p, v in m.items():
        if p.startswith("__"): continue
        linhas.append(f"- `{p}`: `{json.dumps(v, ensure_ascii=False)}`")
    linhas.append("")
open(os.path.join(RAIZ, "CATALOGO.md"), "w").write("\n".join(linhas))
print("CATALOGO.md com", len(d), "motions")
