# Mindflow — Landing page

Página web de **Mindflow**, el asistente 24/7 para psicólogos que agenda sesiones, responde cualquier pregunta y envía recordatorios automáticos.

Sitio estático (HTML + CSS + JavaScript, sin dependencias ni proceso de compilación), optimizado para ordenador y móvil.

## Qué incluye

| Sección | Detalle |
|---|---|
| Hero | Titular animado, texto que se escribe solo, partículas interactivas, móvil con chat en bucle y tarjetas flotantes |
| Problema | Contadores animados con los puntos de dolor del psicólogo |
| Cómo funciona | 3 pasos con línea de progreso ligada al scroll |
| Funciones | Cuadrícula *bento* con efecto *spotlight* que sigue al ratón |
| Vídeo | Vídeo promocional de 40 s en 1080p (`assets/video/mindflow-demo.mp4`) |
| **Prototipo interactivo** | Vista paciente (chat que responde preguntas y agenda cita real: día → hora → modalidad → nombre → confirmación → recordatorio) y vista psicólogo (panel con agenda, KPIs y recordatorios que se actualizan en tiempo real) |
| Calculadora ROI | Controles deslizantes que estiman ingresos recuperados y horas ahorradas |
| Casos de uso, ética y privacidad, precios (mensual/anual), FAQ | — |
| Acceso anticipado | Formulario con validación, estado de éxito, código fundador y confeti |

Además: barra de progreso de lectura, menú móvil animado, botón fijo de CTA en móvil, botones magnéticos, efecto 3D *tilt*, y soporte de `prefers-reduced-motion`.

## Ver la web en local

Abre `index.html` en el navegador, o sirve la carpeta:

```bash
python3 -m http.server 8080
# http://localhost:8080
```

## Publicar

**Web en producción:** https://mindflowbotweb1.netlify.app (Netlify, subida manual del ZIP). Copia en GitHub Pages: https://samutogo34-ops.github.io/Mi-web-asistente/ (se actualiza sola con cada push).

## Configuración importante

### 1. Correo automático de bienvenida (EmailJS)
Cuando un psicólogo se registra, recibe al instante un correo de bienvenida con su código fundador (`emails/bienvenida.html`), y tú puedes recibir un aviso con sus datos (`emails/aviso-registro.html`).

1. Crea una cuenta gratis en [emailjs.com](https://www.emailjs.com) (200 correos/mes).
2. **Email Services → Add New Service → Gmail** y conecta tu correo. Copia el *Service ID*.
3. **Email Templates → Create New Template** (bienvenida):
   - *Subject*: `{{primer_nombre}}, tu plaza fundador en Mindflow está reservada ✅`
   - *To Email*: `{{to_email}}` · *From Name*: `Mindflow` · *Reply To*: tu correo
   - *Content*: botón de código `<>` y pega el contenido de `emails/bienvenida.html`. Copia el *Template ID*.
4. (Opcional) Segunda plantilla de aviso para ti: *To Email* = tu correo, *Reply To* = `{{reply_to}}`, contenido de `emails/aviso-registro.html`.
5. **Account → General**: copia tu *Public Key*.
6. Pega los datos en `CONFIG.emailjs` al principio de `assets/js/main.js`.

**Configuración actual:** servicio Gmail `service_vxbnihv` (hola.mindflow.bot@gmail.com) y plantilla `bienvenida`.

Variables disponibles en las plantillas: `nombre`, `primer_nombre`, `email`, `whatsapp`, `tipo`, `codigo`, `fecha`.

> El envío funciona en la web publicada (GitHub Pages, Netlify, tu dominio). En la vista previa de claude.ai las conexiones externas están bloqueadas.

### 2. Otro destino para los registros (opcional)
En `assets/js/main.js`, al principio del archivo:

```js
const CONFIG = {
  formEndpoint: "https://formspree.io/f/TU_ID", // o tu webhook de Make/Zapier/Google Apps Script
};
```

Se envía un `POST` JSON con: `nombre`, `email`, `whatsapp`, `tipo`, `codigo`, `fecha`, `origen`.
Mientras `formEndpoint` esté vacío, los registros se guardan solo en el navegador (`localStorage`, clave `mindflow_waitlist`) para pruebas.

### 3. Precio
Un solo plan, todo incluido: **gratis en la primera versión** y después **USD 29/mes** (precio fundador bloqueado). Para cambiarlo, edita el `29` de la sección `#precios` en `index.html` y el `29` de la función `calc()` en `main.js` (calculadora ROI).

### 4. Datos del prototipo
Las respuestas del chat de demo (precios, horarios, enfoques de la "Psic. Laura Méndez", ficticia) están en el objeto `ANSWERS` de `main.js`.

### 5. Kit gratis de plantillas (infoproducto / lead magnet)
La sección `#kit` ofrece el PDF `assets/kit/kit-plantillas-mindflow.pdf` (20 plantillas de mensajes para psicólogos) a cambio de nombre y email. Al enviar el formulario:
- la descarga aparece al instante en la web (aunque falle el correo), y
- EmailJS envía la plantilla `kit` (`emails/kit.html`) con el enlace al PDF y una invitación a Mindflow.

Crear la plantilla en EmailJS: *Template ID* `kit` · *Subject* `{{primer_nombre}}, aquí tienes tu kit de 20 plantillas` · *To Email* `{{email}}` · *From Name* `Mindflow` · *Reply To* `hola.mindflow.bot@gmail.com` · *Bcc* (opcional) `hola.mindflow.bot@gmail.com`.
Variables: `nombre`, `primer_nombre`, `email`, `link_kit`, `link_web`, `fecha`.

Regenerar el PDF tras editar `kit-src/kit.html`:

```bash
SITE_URL="https://tu-web/" node kit-src/render-kit.mjs           # -> assets/kit/kit-plantillas-mindflow.pdf
node kit-src/render-kit.mjs --png out/                            # además, PNG de cada página para revisar
```

## Regenerar el vídeo

El vídeo se genera a partir de `video-src/promo.html` (animación CSS con línea de tiempo controlable), capturado fotograma a fotograma:

```bash
node video-src/render.mjs                         # -> assets/video/mindflow-demo.mp4 + póster
node video-src/render.mjs --stills 2,10,20 out/   # capturas sueltas para revisar
```

Requiere Node, Playwright (Chromium) y `ffmpeg`. Abriendo `video-src/promo.html` en el navegador se reproduce la animación en tiempo real.

## Estructura

```
index.html
assets/
  css/styles.css
  js/main.js
  video/mindflow-demo.mp4
  img/video-poster.jpg, og-cover.jpg
  img/brand/     # logo en varias versiones
  kit/kit-plantillas-mindflow.pdf
emails/          # plantillas de EmailJS (bienvenida, kit, aviso)
kit-src/
  kit.html       # fuente del PDF del kit
  render-kit.mjs # generador del PDF
video-src/
  promo.html     # fuente del vídeo
  render.mjs     # renderizador a MP4
```
