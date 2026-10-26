import re
import streamlit as st
import streamlit.components.v1 as components
from pathlib import Path

st.set_page_config(page_title="RRMS", layout="wide")

here = Path(__file__).parent

# find index.html in the repo (root or any sub-folder)
matches = list(here.rglob("index.html"))
if not matches:
    st.error("index.html not found in the repo. Files here: " + ", ".join(p.name for p in here.iterdir()))
    st.stop()
base = matches[0].parent

html = (base / "index.html").read_text(encoding="utf-8")

# inline CSS
def inline_css(m):
    f = base / m.group(1)
    return f"<style>{f.read_text(encoding='utf-8')}</style>" if f.exists() else m.group(0)
html = re.sub(r'<link[^>]*href=["\']([^"\']+\.css)["\'][^>]*>', inline_css, html)

# inline JS
def inline_js(m):
    f = base / m.group(1)
    return f"<script>{f.read_text(encoding='utf-8')}</script>" if f.exists() else m.group(0)
html = re.sub(r'<script[^>]*src=["\']([^"\']+\.js)["\'][^>]*>\s*</script>', inline_js, html)

components.html(html, height=900, scrolling=True)
