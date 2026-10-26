import streamlit as st
import streamlit.components.v1 as components
from pathlib import Path

st.set_page_config(page_title="RRMS", layout="wide")

base = Path(__file__).parent / "rrms_app"   # change if your files are in the repo root
html = (base / "index.html").read_text(encoding="utf-8")
css = (base / "css" / "style.css").read_text(encoding="utf-8")

# inline the CSS and all JS files into the single page
html = html.replace('<link rel="stylesheet" href="css/style.css">', f"<style>{css}</style>")
for js in (base / "js").glob("*.js"):
    code = js.read_text(encoding="utf-8")
    html = html.replace(f'<script src="js/{js.name}"></script>', f"<script>{code}</script>")

components.html(html, height=900, scrolling=True)