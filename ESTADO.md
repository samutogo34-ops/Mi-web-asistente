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
  - Producción: https://mindflowbot.netlify.app (Netlify, se actualiza subiendo el ZIP de `index.html` + `assets/` en Deploys).
  - Copia: https://samutogo34-ops.github.io/Mi-web-asistente/ (GitHub Pages, se actualiza sola con cada push).
- Secciones: hero animado, problema, cómo funciona, funciones, vídeo (40 s), prototipo interactivo (chat paciente + panel psicólogo), calculadora ROI, **kit gratis**, casos, privacidad, precio, FAQ, formulario de lista de espera.
- **Precio**: un solo plan. Primera versión gratis; después USD 29/mes (precio fundador para siempre).
- **Textos honestos** de fase de validación ("en desarrollo", "lista de espera").
- **Correo de bienvenida automático** (EmailJS) — FUNCIONA ✅
  - Gmail del proyecto: hola.mindflow.bot@gmail.com
  - EmailJS: servicio `service_vxbnihv`, plantilla `bienvenida`, public key en `assets/js/main.js`.
- **Kit gratis** "20 plantillas de mensajes para psicólogos" (PDF en `assets/kit/`, fuente en `kit-src/`). Se descarga al instante en la web.
- **Logo** en `assets/img/brand/` (perfil, icono, horizontal claro/oscuro). Ya puesto como foto del Gmail del proyecto.
- Mensajes para invitar psicólogos (correo, Instagram, recordatorio, grupos) escritos en el chat; usar el link de Netlify.
- **Mercado: Colombia.** Textos en español de Colombia (video, celular), precios de la demo y calculadora en pesos (COP; tasa aprox. en `CONFIG.usdToCop`), y precios de Mindflow escritos como "USD 29".
- **Páginas legales**: `privacidad.html` (política de tratamiento de datos, Ley 1581 de 2012) y `reembolsos.html` (garantía de 14 días). Enlazadas en el pie y en los formularios.

## Pendiente (en orden)
1. subir el último ZIP a Netlify.
2. crear en EmailJS la plantilla con Template ID `kit` (contenido `emails/kit.html`; instrucciones en README §5).
3. poner `hola.mindflow.bot@gmail.com` en **Bcc** de las plantillas `bienvenida` y `kit` para enterarse de cada registro/descarga.
4. Completar en `privacidad.html` los datos del responsable legal (nombre, documento y ciudad) si se decide publicarlos.
5. **Kit Pro — USD 12** (decidido). Plataforma: **Gumroad** (botón de compra en la web, con checkout superpuesto). Incluir cada plantilla en versión **tú y usted**.
   - ⚠️ El Kit Pro NO va en este repositorio (es público). Guardarlo en un repositorio privado (p. ej. `mindflow-kit-pro`).
   - Lanzamiento a USD 9 para la lista del kit gratis (cupón de Gumroad), luego USD 12. Propuesta: 60 plantillas + respuestas para Instagram + guía de WhatsApp Business + bonus primer mes de Mindflow gratis. Cobro con Gumroad/Hotmart. No anunciarlo en la web hasta que se pueda comprar.
6. Empezar a contactar psicólogos (meta: 50 contactos → ≥5 registros = interés real).

## Ideas descartadas o aplazadas
- Planes múltiples (se eligió un solo precio).
- Pregunta "¿cuánto pagarías?" en el formulario.
- Correo con dominio propio: más adelante, cuando haya clientes.
