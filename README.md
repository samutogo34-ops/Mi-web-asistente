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

Al ser estática se puede publicar gratis en **GitHub Pages** (Settings → Pages → rama `main`, carpeta `/`), **Netlify** o **Vercel** arrastrando la carpeta.

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

Variables disponibles en las plantillas: `nombre`, `primer_nombre`, `email`, `whatsapp`, `tipo`, `plan`, `codigo`, `fecha`.

> El envío funciona en la web publicada (GitHub Pages, Netlify, tu dominio). En la vista previa de claude.ai las conexiones externas están bloqueadas.

### 2. Otro destino para los registros (opcional)
En `assets/js/main.js`, al principio del archivo:

```js
const CONFIG = {
  formEndpoint: "https://formspree.io/f/TU_ID", // o tu webhook de Make/Zapier/Google Apps Script
};
```

Se envía un `POST` JSON con: `nombre`, `email`, `whatsapp`, `tipo`, `plan`, `fecha`, `origen`.
Mientras `formEndpoint` esté vacío, los registros se guardan solo en el navegador (`localStorage`, clave `mindflow_waitlist`) para pruebas.

### 3. Precios
Los precios (USD 19 / 39 / 89 mensual; 15 / 31 / 71 anual) son **propuestas editables**. Cámbialos en `index.html` (atributos `data-m` y `data-y` de `.plan__price .amt`). Si cambias el plan Profesional, actualiza también el `39` en la función `calc()` de `main.js` (calculadora ROI).

### 4. Datos del prototipo
Las respuestas del chat de demo (precios, horarios, enfoques de la "Psic. Laura Méndez", ficticia) están en el objeto `ANSWERS` de `main.js`.

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
video-src/
  promo.html     # fuente del vídeo
  render.mjs     # renderizador a MP4
```
