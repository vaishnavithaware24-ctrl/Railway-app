import re
import streamlit as st
import streamlit.components.v1 as components
from pathlib import Path

st.set_page_config(page_title="RRMS", layout="wide")

here = Path(__file__).parent
matches = list(here.rglob("index.html"))
if not matches:
    st.error("index.html not found in the repo.")
    st.stop()
base = matches[0].parent
html = (base / "index.html").read_text(encoding="utf-8")

missing = []

def inline_css(m):
    f = base / m.group(1).lstrip("/").lstrip("./")
    if f.exists():
        return f"<style>{f.read_text(encoding='utf-8')}</style>"
    missing.append(str(f.relative_to(here)) if here in f.parents else str(f))
    return m.group(0)

def inline_js(m):
    f = base / m.group(1).lstrip("/").lstrip("./")
    if f.exists():
        code = f.read_text(encoding="utf-8").replace("</script>", "<\\/script>")
        return f"<script>{code}</script>"
    missing.append(str(f.relative_to(here)) if here in f.parents else str(f))
    return m.group(0)

html = re.sub(r'<link[^>]*href=["\']([^"\']+\.css)["\'][^>]*>', inline_css, html)
html = re.sub(r'<script[^>]*src=["\']([^"\']+\.js)["\'][^>]*>\s*</script>', inline_js, html)

# make localStorage work inside Streamlit's embedded frame (data won't survive a reload)
shim = """<script>
try { localStorage.getItem('t'); } catch (e) {
  var _s = {};
  var _m = {getItem:function(k){return k in _s?_s[k]:null},setItem:function(k,v){_s[k]=String(v)},
            removeItem:function(k){delete _s[k]},clear:function(){_s={}}};
  try { Object.defineProperty(window,'localStorage',{value:_m}); } catch(e2){}
  try { Object.defineProperty(window,'sessionStorage',{value:_m}); } catch(e3){}
}
</script>"""
if re.search(r"<head[^>]*>", html):
    html = re.sub(r"(<head[^>]*>)", r"\1" + shim.replace("\\", "\\\\"), html, count=1)
else:
    html = shim + html

if missing:
    st.warning("These files were not found in your repo: " + ", ".join(missing))

components.html(html, height=900, scrolling=True)
