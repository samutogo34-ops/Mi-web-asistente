"""Genera el HTML del kit gratis (portada, cuerpo y cierre) a partir de data_free.py.
Uso: python3 kit-src/build_free.py && node kit-src/render-kit.mjs"""
import html, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from data_free import SECTIONS, FAM
FAM_TIPS = {}

OUT = os.path.dirname(os.path.abspath(__file__))
SITE = os.environ.get("SITE_URL", "https://mindflowbot.netlify.app/")
WAVE = '<svg viewBox="0 0 64 64"><path d="M14 42c6-16 10-16 14 0s8 16 14 0 6-12 8-14" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/></svg>'

def ph(t):
    s = html.escape(t).replace("\n", "<br>")
    return re.sub(r"\[([^\[\]]*)\]", r"<code>[\1]</code>", s)

total = sum(len(s[2]) for s in SECTIONS)
assert total == 20, total

# numero global de cada plantilla, por titulo (para la tabla de atajos)
NUM, n = {}, 0
for _, _, items in SECTIONS:
    for it in items:
        n += 1
        NUM[it[0]] = n
for title in FAM:
    assert title in NUM, ('FAM', title)

BASE_CSS = """
:root { --ink:#1d2140; --muted:#5b6180; --dim:#8a8fae; --line:#e6e8f2; --soft:#f6f7fb;
  --violet:#6d4ae6; --indigo:#4f46e5; --teal:#0f9488; --teal-soft:#f0fdfa; --violet-soft:#f1edff;
  --grad: linear-gradient(120deg,#8b5cf6 0%,#6366f1 50%,#14b8a6 100%); }
* { box-sizing:border-box; margin:0; padding:0; }
html { -webkit-print-color-adjust:exact; print-color-adjust:exact; }
body { font-family:"Inter",Arial,sans-serif; color:var(--ink); font-size:9.6pt; line-height:1.48; }
.mark { width:34px; height:34px; border-radius:10px; background:var(--grad); display:grid; place-items:center; flex:none; }
.mark svg { width:24px; height:24px; }
.brand { display:flex; align-items:center; gap:10px; font-weight:800; font-size:15pt; letter-spacing:-0.03em; }
code { font-family:inherit; font-weight:700; color:var(--indigo); background:#eef0ff; padding:0 3px; border-radius:4px; }
.bg { position:absolute; inset:0; background: radial-gradient(60% 45% at 85% 15%, rgba(139,92,246,.75), transparent 70%), radial-gradient(55% 45% at 10% 85%, rgba(20,184,166,.55), transparent 70%), radial-gradient(40% 35% at 30% 30%, rgba(79,70,229,.5), transparent 70%); }
.dark { width:210mm; height:297mm; position:relative; overflow:hidden; background:#0b0d22; color:#fff; }
.grad-t { background:linear-gradient(120deg,#c4b5fd,#5eead4); -webkit-background-clip:text; background-clip:text; color:transparent; }
"""

def page(css, body):
    return f'<!doctype html><html lang="es"><head><meta charset="utf-8"><style>{BASE_CSS}{css}</style></head><body>{body}</body></html>'

# ---------------- portada ----------------
cover_css = """
@page { size:A4; margin:0; }
.in { position:relative; height:100%; padding:22mm 20mm; display:flex; flex-direction:column; }
.tag { align-self:flex-start; margin-top:40mm; padding:6px 14px; border-radius:999px; background:rgba(255,255,255,.14); border:1px solid rgba(255,255,255,.3); font-size:9pt; font-weight:700; letter-spacing:.12em; text-transform:uppercase; }
h1 { font-size:46pt; line-height:1.02; letter-spacing:-0.045em; font-weight:800; margin-top:8mm; }
p.lead { font-size:13pt; color:#d9d6ff; margin-top:7mm; max-width:150mm; line-height:1.5; }
.chips { display:flex; flex-wrap:wrap; gap:3mm; margin-top:9mm; }
.chips span { padding:2.5mm 4mm; border-radius:999px; background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.22); font-size:10pt; font-weight:600; }
.list { margin-top:auto; display:grid; grid-template-columns:1fr 1fr; gap:3.5mm 8mm; font-size:10.5pt; }
.list div { display:flex; gap:8px; align-items:center; }
.list b { display:grid; place-items:center; width:22px; height:22px; border-radius:7px; background:rgba(255,255,255,.16); font-size:9pt; flex:none; }
.foot { margin-top:12mm; padding-top:6mm; border-top:1px solid rgba(255,255,255,.2); font-size:9pt; color:#b9b6e8; display:flex; justify-content:space-between; }
"""
sec_list = "".join(f"<div><b>{i+1}</b>{s[0]}</div>" for i, s in enumerate(SECTIONS))
cover = f"""<section class="dark"><div class="bg"></div><div class="in">
<div class="brand"><span class="mark">{WAVE}</span>Mindflow</div>
<span class="tag">Kit gratuito</span>
<h1>20 plantillas de mensajes<br><span class="grad-t">para psicólogos</span></h1>
<p class="lead">Mensajes listos para copiar y pegar en WhatsApp, Instagram o email. Organiza tu consulta, reduce las ausencias y comunícate con profesionalidad.</p>
<div class="chips"><span>20 plantillas</span><span>Versiones para padres y acudientes</span><span>5 consejos contra las ausencias</span></div>
<div class="list">{sec_list}</div>
<div class="foot"><span>Edición 2026</span><span>Gratis para tu consulta</span></div>
</div></section>"""

# ---------------- cuerpo ----------------
body_css = """
@page { size:A4; margin:16mm 16mm 18mm; }

.welcome h2 { font-size:24pt; letter-spacing:-0.035em; line-height:1.1; font-weight:800; }
.letter { margin-top:6mm; padding:6mm 7mm; border-radius:5mm; background:var(--soft); border-left:4px solid #c9bfff; }
.letter p { color:#3a3f63; font-size:10.3pt; }
.letter p + p { margin-top:3mm; }
.letter .sign { margin-top:5mm; color:var(--muted); }
.wh { font-size:13pt; margin:8mm 0 3mm; }
.wins { display:grid; gap:3mm; }
.win { display:flex; gap:4.5mm; padding:4mm 5mm; border-radius:4mm; border:1px solid var(--line); }
.win b { width:26px; height:26px; flex:none; border-radius:8px; background:#e7faf6; color:var(--teal); display:grid; place-items:center; font-size:10pt; }
.win strong { display:block; font-size:10.5pt; margin-bottom:1mm; }
.win span { color:var(--muted); }
.gain { display:grid; grid-template-columns:repeat(3,1fr); gap:3mm; margin-top:6mm; }
.gain div { padding:4mm; border-radius:4mm; background:var(--violet-soft); text-align:center; }
.gain b { display:block; font-size:15pt; font-weight:800; background:var(--grad); -webkit-background-clip:text; background-clip:text; color:transparent; }
.gain span { font-size:9pt; color:var(--muted); }
.help { margin-top:6mm; font-size:9.5pt; color:var(--muted); text-align:center; }
.intro h2, .sec h2 { font-size:21pt; letter-spacing:-0.035em; line-height:1.1; font-weight:800; }
.eyebrow { font-size:8.5pt; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:var(--violet); margin-bottom:3mm; }
.lead { color:var(--muted); font-size:11pt; margin-top:3mm; }
.steps { display:grid; gap:3.5mm; margin-top:7mm; }
.step { display:flex; gap:5mm; padding:4.5mm 5mm; border-radius:4mm; background:var(--soft); }
.step b { width:26px; height:26px; flex:none; border-radius:8px; background:var(--violet-soft); color:var(--violet); display:grid; place-items:center; font-size:10pt; }
.step strong { display:block; font-size:10.5pt; margin-bottom:1mm; }
.step span { color:var(--muted); }
.box { margin-top:6mm; padding:5mm 6mm; border-radius:4mm; border:1.5px dashed #b8f0e6; background:var(--teal-soft); }
.box h3 { font-size:10.5pt; margin-bottom:2mm; color:var(--teal); }
.box ul { list-style:none; display:grid; grid-template-columns:1fr 1fr; gap:1.5mm 6mm; color:var(--muted); font-size:9pt; }
.toc { margin-top:6mm; display:grid; grid-template-columns:1fr 1fr; gap:2mm 8mm; }
.toc div { display:flex; justify-content:space-between; border-bottom:1px solid var(--line); padding:1.8mm 0; font-size:9.5pt; }
.toc span { color:var(--dim); }
.sec { break-before:page; }
.sec-head { display:flex; align-items:flex-end; justify-content:space-between; gap:6mm; margin-bottom:5mm; padding-bottom:3.5mm; border-bottom:2px solid var(--line); }
.sec-head p { color:var(--muted); font-size:9.5pt; margin-top:1.5mm; }
.num { font-size:34pt; font-weight:800; letter-spacing:-0.05em; line-height:.9; background:var(--grad); -webkit-background-clip:text; background-clip:text; color:transparent; }
.tpl { border:1px solid var(--line); border-radius:4mm; padding:4mm 4.5mm; margin-bottom:4mm; break-inside:avoid; }
.top { display:flex; align-items:center; gap:3mm; margin-bottom:1mm; }
.n { flex:none; min-width:26px; height:22px; padding:0 6px; border-radius:6px; background:var(--violet-soft); color:var(--violet); font-weight:800; font-size:9pt; display:grid; place-items:center; }
.tpl h3 { font-size:11pt; letter-spacing:-0.01em; }
.when { color:var(--dim); font-size:8.8pt; margin-bottom:2.5mm; }
.pair { display:grid; grid-template-columns:1fr 1fr; gap:3mm; }
.msg { background:var(--soft); border-radius:3mm; padding:3mm 3.8mm; font-size:9.2pt; border-left:3px solid #c9bfff; }
.msg.us { border-left-color:#7ee0d2; }
.lbl { display:block; font-size:7.5pt; font-weight:800; letter-spacing:.12em; text-transform:uppercase; color:var(--violet); margin-bottom:1.2mm; }
.us .lbl { color:var(--teal); }
.msg.one { grid-column:1 / -1; }
.fam { margin-top:2.5mm; background:#f2fbf9; border-radius:3mm; padding:3mm 3.8mm; font-size:9.2pt; border-left:3px solid #7ee0d2; }
.flbl { display:block; font-size:7.5pt; font-weight:800; letter-spacing:.1em; text-transform:uppercase; color:var(--teal); margin-bottom:1.2mm; }
.tip { margin-top:2.2mm; font-size:8.6pt; color:var(--teal); }
.tip::before { content:"💡 "; }
.wa { border:1px solid var(--line); border-radius:4mm; padding:4mm 5mm; margin-bottom:3.5mm; break-inside:avoid; display:flex; gap:4mm; }
.wa .n { background:#e7faf6; color:var(--teal); }
.wa h3 { font-size:11pt; margin-bottom:1mm; }
.wa p, .wa li { color:var(--muted); }
.wa ul { margin:1.5mm 0 0 4mm; }
table { width:100%; border-collapse:collapse; margin-top:2mm; font-size:9pt; }
td, th { text-align:left; padding:1.6mm 2mm; border-bottom:1px solid var(--line); }
th { font-size:8pt; letter-spacing:.08em; text-transform:uppercase; color:var(--dim); }
td:first-child { font-weight:800; color:var(--indigo); width:24mm; }
.tips { display:grid; gap:3.5mm; margin-top:6mm; }
.tc { display:flex; gap:5mm; padding:4.5mm 5mm; border-radius:4mm; background:var(--soft); break-inside:avoid; }
.tc b { font-size:19pt; font-weight:800; line-height:1; background:var(--grad); -webkit-background-clip:text; background-clip:text; color:transparent; min-width:11mm; }
.tc strong { display:block; font-size:10.5pt; margin-bottom:1mm; }
.tc span { color:var(--muted); }
.bonus { margin-top:7mm; padding:6mm; border-radius:5mm; background:var(--violet-soft); border:1.5px solid #d7ccff; break-inside:avoid; }
.bonus h3 { font-size:13pt; margin-bottom:2mm; }
.bonus p { color:var(--muted); }
.license { margin-top:6mm; font-size:8.5pt; color:var(--dim); }
"""
toc_rows = []
n = 0
for i, (title, _, items) in enumerate(SECTIONS):
    a, b = n + 1, n + len(items)
    n = b
    toc_rows.append(f"<div>{i+1} · {title} <span>{a}–{b}</span></div>")

parts = [f"""<section class="intro">
<div class="eyebrow">Antes de empezar</div>
<h2>Cómo sacarle partido a este kit</h2>
<p class="lead">Cada plantilla resuelve una situación concreta del día a día de tu consulta. Adáptalas a tu forma de comunicarte: cuanto más suenen a ti, mejor funcionan. Si atiendes a niños o adolescentes, la mayoría trae debajo una versión <b>👨‍👩‍👧 para padres o acudientes</b>.</p>
<div class="steps">
<div class="step"><b>1</b><div><strong>Elige la situación</strong><span>Busca en el índice el momento en el que estás: un paciente nuevo, una cancelación, un pago pendiente…</span></div></div>
<div class="step"><b>2</b><div><strong>Ajústala a tu voz</strong><span>Cambia palabras o el trato (tú o usted) para que cada mensaje suene a ti y a tu forma de trabajar.</span></div></div>
<div class="step"><b>3</b><div><strong>Personaliza y guárdala</strong><span>Cambia lo que va entre corchetes y guarda tus favoritas como respuestas rápidas de WhatsApp Business.</span></div></div>
</div>
<div class="box"><h3>Qué significa cada corchete</h3><ul>
<li><code>[Nombre]</code> nombre del paciente</li><li><code>[Tu nombre]</code> tu nombre profesional</li>
<li><code>[día]</code> <code>[hora]</code> fecha y hora</li><li><code>[enlace]</code> videollamada, pago o ubicación</li>
<li><code>[$000.000]</code> valor en pesos</li><li><code>[dirección]</code> dirección del consultorio</li>
</ul></div>
<div class="toc">{''.join(toc_rows)}</div>
</section>"""]

n = 0
for i, (title, sub, items) in enumerate(SECTIONS):
    cards = []
    for (t, when, us, tip) in items:
        n += 1
        pair = f'<div class="pair"><div class="msg one">{ph(us)}</div></div>'
        if t in FAM:
            pair += f'<div class="fam"><span class="flbl">👨‍👩‍👧 Para padres o acudientes</span>{ph(FAM[t])}</div>'
            if t in FAM_TIPS:
                pair += f'<div class="tip">{html.escape(FAM_TIPS[t])}</div>'
        tiph = f'<div class="tip">{html.escape(tip)}</div>' if tip else ""
        cards.append(f'<div class="tpl"><div class="top"><span class="n">{n}</span><h3>{html.escape(t)}</h3></div><div class="when">{html.escape(when)}</div>{pair}{tiph}</div>')
    parts.append(f'<section class="sec"><div class="sec-head"><div><h2>{html.escape(title)}</h2><p>{html.escape(sub)}</p></div><div class="num">{i+1:02d}</div></div>{"".join(cards)}</section>')

parts.append("""<section class="sec"><div class="eyebrow">Bonus</div><h2>5 hábitos que reducen las ausencias</h2>
<div class="tips">
<div class="tc"><b>1</b><div><strong>Responde rápido</strong><span>Quien busca psicólogo suele escribir a varios. Responder en la primera hora aumenta mucho la probabilidad de que agende contigo.</span></div></div>
<div class="tc"><b>2</b><div><strong>Recordatorio doble: 24 h y 2 h</strong><span>El primero permite reorganizar si hay un cambio; el segundo evita olvidos de última hora.</span></div></div>
<div class="tc"><b>3</b><div><strong>Pide confirmación activa</strong><span>"¿Me confirmas respondiendo Sí?" compromete más que un aviso sin respuesta.</span></div></div>
<div class="tc"><b>4</b><div><strong>Política de cancelación por escrito</strong><span>Compártela al agendar la primera cita. Si hay que aplicarla, ya era conocida y acordada.</span></div></div>
<div class="tc"><b>5</b><div><strong>Llena los huecos con la lista de espera</strong><span>Si alguien cancela, ofrece el cupo a quien quería un horario antes.</span></div></div>
</div>
<div class="bonus"><h3>✨ ¿Quieres el kit completo?</h3><p>Estamos preparando el <b>Kit Pro</b>: 60 plantillas para cada situación de tu consulta (festivos y vacaciones, límites y situaciones delicadas, pagos con Nequi y cuenta de cobro), respuestas para Instagram y una guía de WhatsApp Business. Como descargaste este kit, serás de los primeros en saberlo.</p></div>
<p class="license">Plantillas de uso libre para tu consulta: úsalas y adáptalas todas las veces que quieras. Adapta los mensajes a tu estilo y a la normativa profesional y de protección de datos aplicable. Mindflow es una herramienta administrativa y no sustituye la atención clínica profesional.</p>
</section>""")

body = page(body_css, "".join(parts))

# ---------------- cierre ----------------
cta_css = """
@page { size:A4; margin:0; }
.in { position:relative; height:100%; display:flex; flex-direction:column; justify-content:center; padding:0 22mm; }
h2 { font-size:34pt; line-height:1.05; letter-spacing:-0.04em; font-weight:800; margin-top:6mm; }
p { color:#d9d6ff; font-size:12.5pt; margin-top:6mm; max-width:150mm; }
ul { list-style:none; margin-top:9mm; display:grid; gap:3.5mm; font-size:12pt; }
li::before { content:"✓"; color:#5eead4; font-weight:800; margin-right:10px; }
.btn { display:inline-block; align-self:flex-start; margin-top:11mm; padding:5mm 9mm; border-radius:999px; background:var(--grad); color:#fff; font-weight:800; font-size:13pt; text-decoration:none; }
.url { margin-top:4mm; color:#b9b6e8; font-size:10pt; }
.legal { position:absolute; left:22mm; right:22mm; bottom:14mm; font-size:8pt; color:#8f8cc0; }
"""
cta = page(cta_css, f"""<section class="dark"><div class="bg"></div><div class="in">
<div class="brand"><span class="mark">{WAVE}</span>Mindflow</div>
<h2>¿Y si estos mensajes<br><span class="grad-t">se enviaran solos?</span></h2>
<p>Ya tienes los mensajes. Mindflow es el asistente 24/7 que estamos creando para enviarlos por ti, en el momento justo y a cualquier hora.</p>
<ul><li>Responde a tus pacientes al instante, incluso de noche</li><li>Agenda en tu calendario sin dobles reservas</li><li>Envía los recordatorios de 24 h y 2 h y pide confirmación</li><li>Ofrece los cupos libres a tu lista de espera</li></ul>
<a class="btn" href="{SITE}#acceso">Reservar mi plaza fundador →</a>
<div class="url">{SITE.replace('https://','').rstrip('/')}</div>
<div class="legal">Gracias por apoyar a Mindflow. ¿Dudas o sugerencias? Escríbenos a hola.mindflow.bot@gmail.com</div>
</div></section>""")

for name, doc in [("cover.html", page(cover_css, cover)), ("body.html", body), ("cta.html", cta)]:
    open(os.path.join(OUT, name), "w", encoding="utf-8").write(doc)
print("ok", total, "plantillas")
