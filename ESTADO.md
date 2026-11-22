# Estado del proyecto Mindflow

Resumen para retomar el trabajo en un chat nuevo. Detalles técnicos en `README.md`.

## Qué es
Mindflow: micro SaaS para psicólogos (asistente 24/7 que agenda, responde preguntas y envía recordatorios).
**Fase actual: validación.** La app todavía no existe; la web sirve para medir interés (lista de espera) y generar los primeros ingresos con infoproductos. Mercado: **Colombia**.

## Cómo trabajar
- En español, paso a paso y de forma sencilla. Responder siempre en español.
- Sin llamadas ni reuniones en la oferta (todo por web, chat y email).
- Todo va firmado por **"El equipo de Mindflow"**. Este repositorio es **público**: no publicar aquí datos personales del fundador ni de contactos.
- No usar el WhatsApp personal del fundador para el proyecto. Canales del proyecto: hola.mindflow.bot@gmail.com e Instagram de Mindflow.
- Pagos, cuentas y temas legales: a cargo de un adulto responsable.

## ⚠️ Dónde publicar cambios de la web
Netlify publica **solo** la rama `claude/mindflow-professional-website-bn1ady`. Cada cambio de la web debe acabar en esa rama (push directo, con permiso del fundador) para que aparezca en https://mindflowbot.netlify.app en 1-2 minutos. `main` es una copia que se actualiza con pull requests.

## Hecho
- **Web** (HTML/CSS/JS estático):
  - Producción: https://mindflowbot.netlify.app (Netlify conectado a GitHub, se publica solo; ya no se suben ZIPs).
  - Copia: https://samutogo34-ops.github.io/Mi-web-asistente/ (GitHub Pages, misma rama).
- Secciones: hero animado, problema, cómo funciona, funciones, video (40 s), prototipo interactivo (chat paciente + panel psicólogo), calculadora en pesos, **kit gratis**, **Kit Pro (oculto)**, casos, privacidad, precio, FAQ, lista de espera, franja para compartir, pie con páginas legales.
- **Precio Mindflow**: un solo plan. Primera versión gratis; después USD 29/mes (precio fundador para siempre).
- **Textos honestos** de fase de validación ("en desarrollo", "lista de espera").
- **Correos automáticos (EmailJS)** — FUNCIONAN ✅
  - Gmail del proyecto: hola.mindflow.bot@gmail.com (con el logo como foto).
  - Servicio `service_vxbnihv`; plantillas `bienvenida` (lista de espera) y `kit` (kit gratis). Ambas con **Bcc** a hola.mindflow.bot para enterarse de cada registro/descarga. Fuente de las plantillas en `emails/`.
- **Kit gratis** "20 plantillas de mensajes para psicólogos" (13 páginas): tono cálido, máx. 3 emojis, 18 versiones para padres o acudientes y avance del Kit Pro. Textos en `kit-src/data_free.py`; se regenera con `python3 kit-src/build_free.py && node kit-src/render-kit.mjs`.
- **Botones para compartir** Mindflow (WhatsApp, LinkedIn, copiar enlace; menú nativo en celular).
- **Páginas legales**: `privacidad.html` (Ley 1581 de 2012) y `reembolsos.html` (garantía de 14 días).
- **Logo** en `assets/img/brand/`.
- **Instagram de Mindflow** creado. Material en `marketing/instagram/`: 4 publicaciones (1080×1350), un Reel de 14 s sin audio (música y "texto a voz" se añaden en Instagram) y `textos.md` con los textos, hashtags y biografía.
  - Calendario: día 1 presentación ✅ · día 2 el problema ✅ · día 3 "3 mensajes que reducen las ausencias" · día 4 kit gratis + Reel.
- **Hoja de seguimiento** de contactos (Excel, 50 filas, estados y recordatorio a +5 días). La guarda el fundador en su computador o Drive privado, **nunca en GitHub**.

## Pendiente (en orden)
1. **Instagram**: publicar la 3 y la 4 (+ Reel), una por día. Responder comentarios el mismo día.
2. **Contactar psicólogos** (meta: 10 esta semana, 50 en total → si ≥5 se apuntan, hay interés real).
   - Canales: correo desde hola.mindflow.bot (correo publicado en su web o Google Maps) o mensaje directo desde el Instagram de Mindflow. Si un formulario exige celular, **no** usar el número personal: buscar el correo o escribir por Instagram.
   - Enfoque "regalo primero": ofrecer el kit gratis (https://mindflowbot.netlify.app/#kit) y mencionar Mindflow después. Tratar de usted, máx. 10 correos/día, un mensaje + un recordatorio a los 5 días, y respetar si dicen que no.
   - Contacto nº 1: un centro de psicología en Bogotá (niños, parejas y familias; 4,9 ★ con 145 reseñas). Su formulario exige celular → escribirle por Instagram cuando el perfil tenga las 4 publicaciones.
3. **Kit Pro — USD 12: CONTENIDO TERMINADO ✅** (32 páginas). Falta venderlo.
   - Incluye: bienvenida con "tus primeros 15 minutos", 60 plantillas (tono cálido, máx. 3 emojis, en usted), 48 versiones para padres o acudientes, 10 respuestas de Instagram, guía de WhatsApp Business, 5 hábitos y bonus de un mes gratis de Mindflow.
   - ⚠️ El PDF y su fuente NO van en este repositorio. Están en el repositorio **privado** `samutogo34-ops/mindflowkitpro` (PDF en `pdf/`, fuente en `fuente/`).
   - Venta: Gumroad (cuenta a nombre de un adulto), con el correo del comprador estampado en el PDF. Lanzamiento a USD 9 con cupón para quienes descargaron el kit gratis, luego USD 12. La sección `#kit-pro` de la web ya está hecha y oculta: se activa sola al poner el enlace de Gumroad en `CONFIG.kitProUrl` (`assets/js/main.js`).
4. Completar en `privacidad.html` los datos del responsable legal (nombre, documento y ciudad), si se decide publicarlos.

## Ideas para más adelante
- Plan para clínicas o centros ("Plan Centro") si varios centros muestran interés (el formulario ya pregunta "Centro o equipo").
- WhatsApp Business con un número propio de Mindflow (con permiso de los padres).
- Correo con dominio propio, cuando haya clientes.

## Ideas descartadas
- Planes múltiples (se eligió un solo precio).
- Pregunta "¿cuánto pagarías?" en el formulario.
