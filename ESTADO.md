# Estado del proyecto Mindflow

Resumen para retomar el trabajo en un chat nuevo. Detalles técnicos en `README.md`.

## Qué es
Mindflow: micro SaaS para psicólogos (asistente 24/7 que agenda, responde preguntas y envía recordatorios).
**Fase actual: validación.** La app todavía no existe; la web sirve para medir interés (lista de espera) y generar los primeros ingresos con infoproductos.

## Cómo trabajar
- En español, paso a paso y de forma sencilla.
- Sin llamadas ni reuniones en la oferta (todo por web, chat y email).

## Hecho
- **Web** (HTML/CSS/JS estático, rama `claude/mindflow-professional-website-bn1ady`):
  - Producción: https://mindflowbotweb.netlify.app (Netlify, se actualiza subiendo el ZIP de `index.html` + `assets/` en Deploys).
  - Copia: https://samutogo34-ops.github.io/Mi-web-asistente/ (GitHub Pages, se actualiza sola con cada push).
- Secciones: hero animado, problema, cómo funciona, funciones, vídeo (40 s), prototipo interactivo (chat paciente + panel psicólogo), calculadora ROI, **kit gratis**, casos, privacidad, precio, FAQ, formulario de lista de espera.
- **Precio**: un solo plan. Primera versión gratis; después USD 29/mes (precio fundador para siempre).
- **Textos honestos** de fase de validación ("en desarrollo", "lista de espera").
- **Correo de bienvenida automático** (EmailJS) — FUNCIONA ✅
  - Gmail del proyecto: hola.mindflow.bot@gmail.com
  - EmailJS: servicio `service_vxbnihv`, plantilla `bienvenida`, public key en `assets/js/main.js`.
- **Kit gratis** "20 plantillas de mensajes para psicólogos" (PDF en `assets/kit/`, fuente en `kit-src/`). Se descarga al instante en la web.
- **Logo** en `assets/img/brand/` (perfil, icono, horizontal claro/oscuro).
- Mensajes para invitar psicólogos (correo, Instagram, recordatorio, grupos) escritos en el chat; usar el link de Netlify.

## Pendiente (en orden)
1. subir el último ZIP a Netlify.
2. crear en EmailJS la plantilla con Template ID `kit` (contenido `emails/kit.html`; instrucciones en README §5).
3. poner `hola.mindflow.bot@gmail.com` en **Bcc** de las plantillas `bienvenida` y `kit` para enterarse de cada registro/descarga.
4. poner `assets/img/brand/mindflow-perfil.png` como foto del Gmail del proyecto (ayuda contra spam) y "calentar" la cuenta.
5. **Kit Pro — USD 12** (decidido). Propuesta: 60 plantillas + respuestas para Instagram + guía de WhatsApp Business + bonus primer mes de Mindflow gratis. Cobro con Gumroad/Hotmart. No anunciarlo en la web hasta que se pueda comprar.
6. Empezar a contactar psicólogos (meta: 50 contactos → ≥5 registros = interés real).

## Ideas descartadas o aplazadas
- Planes múltiples (se eligió un solo precio).
- Pregunta "¿cuánto pagarías?" en el formulario.
- Correo con dominio propio: más adelante, cuando haya clientes.
