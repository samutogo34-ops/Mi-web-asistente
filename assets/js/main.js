/* ==========================================================
   Mindflow — Landing interactions
   ========================================================== */

/**
 * CONFIGURACIÓN DEL FORMULARIO DE ACCESO ANTICIPADO
 * Pega aquí la URL de tu endpoint (Formspree, Make, Zapier, Google Apps Script, tu API…).
 * Ejemplo Formspree: "https://formspree.io/f/abcdwxyz"
 * Si se deja vacío, los registros se guardan en el navegador (localStorage) para pruebas.
 */
const CONFIG = {
  formEndpoint: "",
};

(() => {
  "use strict";

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Toast ---------------- */
  const toastEl = $(".toast");
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("is-show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-show"), 3200);
  }

  /* ---------------- Nav ---------------- */
  const nav = $(".nav");
  const burger = $(".nav__burger");
  const mobileMenu = $(".mobile-menu");
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("menu-open");
    burger.setAttribute("aria-expanded", open);
    mobileMenu.setAttribute("aria-hidden", !open);
    document.body.style.overflow = open ? "hidden" : "";
  });
  $$(".mobile-menu a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("menu-open");
      burger.setAttribute("aria-expanded", "false");
      mobileMenu.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    })
  );

  // Active nav link
  const navLinks = $$(".nav__links a");
  const sectionObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id));
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  navLinks.forEach((a) => {
    const t = $(a.getAttribute("href"));
    if (t) sectionObs.observe(t);
  });

  /* ---------------- Scroll-driven ---------------- */
  const progress = $(".scroll-progress span");
  const stepsLine = $(".steps__line");
  const stickyCta = $(".sticky-cta");
  const hero = $(".hero");
  const acceso = $("#acceso");
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;
    const h = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
    nav.classList.toggle("is-scrolled", y > 20);

    if (stepsLine) {
      const r = stepsLine.parentElement.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.75 - r.top) / (r.height + innerHeight * 0.2)));
      stepsLine.style.setProperty("--p", p.toFixed(3));
    }

    if (stickyCta) {
      const pastHero = y > hero.offsetHeight * 0.8;
      const aR = acceso.getBoundingClientRect();
      const nearForm = aR.top < innerHeight && aR.bottom > 0;
      stickyCta.classList.toggle("is-show", pastHero && !nearForm);
    }
    ticking = false;
  }
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  /* ---------------- Reveal ---------------- */
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          revealObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  $$(".reveal").forEach((el) => revealObs.observe(el));

  /* ---------------- Counters ---------------- */
  const counterObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        counterObs.unobserve(e.target);
        const el = e.target;
        const to = +el.dataset.to;
        if (reduceMotion) { el.textContent = to; return; }
        const dur = 1600;
        const t0 = performance.now();
        const tick = (t) => {
          const k = Math.min(1, (t - t0) / dur);
          el.textContent = Math.round(to * (1 - Math.pow(1 - k, 4)));
          if (k < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.6 }
  );
  $$(".counter").forEach((el) => counterObs.observe(el));

  /* ---------------- Typed words ---------------- */
  const typed = $(".typed");
  if (typed && !reduceMotion) {
    const words = JSON.parse(typed.dataset.words);
    let wi = 0;
    (async function loop() {
      while (true) {
        const w = words[wi];
        for (let i = w.length; i >= 0; i--) { typed.textContent = w.slice(0, i); await sleep(35); }
        wi = (wi + 1) % words.length;
        const n = words[wi];
        for (let i = 1; i <= n.length; i++) { typed.textContent = n.slice(0, i); await sleep(70); }
        await sleep(2200);
      }
    })();
  }

  /* ---------------- Pointer effects (desktop) ---------------- */
  if (finePointer && !reduceMotion) {
    const glow = $(".cursor-glow");
    let gx = innerWidth / 2, gy = innerHeight / 2, tx = gx, ty = gy;
    window.addEventListener("pointermove", (e) => { tx = e.clientX; ty = e.clientY; }, { passive: true });
    (function raf() {
      gx += (tx - gx) * 0.12; gy += (ty - gy) * 0.12;
      glow.style.transform = `translate(${gx - 260}px, ${gy - 260}px)`;
      requestAnimationFrame(raf);
    })();

    $$(".spotlight").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", e.clientX - r.left + "px");
        el.style.setProperty("--my", e.clientY - r.top + "px");
      });
    });

    $$("[data-tilt]").forEach((el) => {
      const max = el.classList.contains("phone") ? 10 : 6;
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(1000px) rotateY(${px * max}deg) rotateX(${-py * max}deg)`;
      });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });

    $$(".magnetic").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
      });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });
  }

  /* ---------------- Hero particles ---------------- */
  const canvas = $(".hero__particles");
  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext("2d");
    let w, h, dpr, parts = [], running = true, mouse = { x: -999, y: -999 };
    const count = () => (innerWidth < 700 ? 28 : 70);
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      parts = Array.from({ length: count() }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.6 + 0.4,
      }));
    }
    resize();
    let rT;
    window.addEventListener("resize", () => { clearTimeout(rT); rT = setTimeout(resize, 200); });
    hero.addEventListener("pointermove", (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    hero.addEventListener("pointerleave", () => { mouse.x = mouse.y = -999; });
    new IntersectionObserver(([e]) => {
      running = e.isIntersecting;
      if (running) requestAnimationFrame(draw);
    }).observe(hero);

    function draw() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      const linkDist = innerWidth < 700 ? 90 : 130;
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dxm = p.x - mouse.x, dym = p.y - mouse.y, dm = Math.hypot(dxm, dym);
        if (dm < 120) { p.x += (dxm / dm) * 0.8; p.y += (dym / dm) * 0.8; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(196,181,253,.7)";
        ctx.fill();
        for (let j = i + 1; j < parts.length; j++) {
          const q = parts[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < linkDist) {
            ctx.strokeStyle = `rgba(139,92,246,${0.18 * (1 - d / linkDist)})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  }

  /* ---------------- Hero chat loop ---------------- */
  const heroChat = $("#heroChat");
  const heroScript = [
    { t: "out", m: "Hola! Quería saber si tienen hueco esta semana 🙏", time: "23:47" },
    { t: "in", m: "¡Hola! Soy el asistente de la consulta de Laura. Sí: tengo jueves 14:00 o viernes 10:00. ¿Cuál prefieres?", time: "23:47" },
    { t: "out", m: "Jueves a las 14 perfecto. ¿Es online?", time: "23:48" },
    { t: "in", m: "Puede ser online o presencial, como prefieras 😊 Te reservo online y te envío el enlace de videollamada.", time: "23:48" },
    { t: "card", m: "✅ <b>Sesión confirmada</b><br>Jueves · 14:00 · Online<br><small>Te recordaré 24 h antes</small>", time: "23:48" },
  ];
  function addHeroMsg(item) {
    const div = document.createElement("div");
    div.className = "msg " + (item.t === "out" ? "msg--out" : item.t === "card" ? "msg--in msg--card" : "msg--in");
    div.innerHTML = item.m + `<time>${item.time}</time>`;
    heroChat.appendChild(div);
    while (heroChat.children.length > 6) heroChat.firstElementChild.remove();
  }
  async function heroLoop() {
    if (reduceMotion) { heroScript.forEach(addHeroMsg); return; }
    while (true) {
      heroChat.innerHTML = "";
      await sleep(600);
      for (const item of heroScript) {
        if (item.t !== "out") {
          const ty = document.createElement("div");
          ty.className = "typing";
          ty.innerHTML = "<span></span><span></span><span></span>";
          heroChat.appendChild(ty);
          await sleep(1300);
          ty.remove();
        } else {
          await sleep(900);
        }
        addHeroMsg(item);
        await sleep(900);
      }
      await sleep(4500);
    }
  }
  if (heroChat) heroLoop();

  /* ---------------- Video ---------------- */
  const video = $("#promoVideo");
  const vWrap = $(".video-wrap");
  const vPlay = $(".video-play");
  if (video) {
    vPlay.addEventListener("click", () => {
      video.controls = true;
      video.play();
    });
    video.addEventListener("play", () => vWrap.classList.add("is-playing"));
    video.addEventListener("pause", () => { if (!video.seeking) vWrap.classList.remove("is-playing"); });
    video.addEventListener("ended", () => vWrap.classList.remove("is-playing"));
  }

  /* ==========================================================
     INTERACTIVE PROTOTYPE
     ========================================================== */
  const tabs = $$(".demo__tab");
  const indicator = $(".demo__tab-indicator");
  const badge = $(".demo__badge");
  function moveIndicator(btn) {
    indicator.style.width = btn.offsetWidth + "px";
    indicator.style.transform = `translateX(${btn.offsetLeft - 6}px)`;
  }
  function switchTab(name) {
    tabs.forEach((t) => {
      const on = t.dataset.tab === name;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", on);
      if (on) moveIndicator(t);
    });
    $$(".demo__panel").forEach((p) => {
      const on = p.dataset.panel === name;
      p.hidden = !on;
      p.classList.toggle("is-active", on);
    });
    if (name === "pro") badge.hidden = true;
  }
  tabs.forEach((t) => t.addEventListener("click", () => switchTab(t.dataset.tab)));
  window.addEventListener("resize", () => moveIndicator($(".demo__tab.is-active")));
  requestAnimationFrame(() => moveIndicator(tabs[0]));
  document.fonts && document.fonts.ready.then(() => moveIndicator($(".demo__tab.is-active")));
  $$("[data-goto]").forEach((b) => b.addEventListener("click", () => switchTab(b.dataset.goto)));

  // ----- Calendar data -----
  const DAY_NAMES = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const DAY_LONG = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const MONTHS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  const days = [];
  {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    while (days.length < 5) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() !== 0 && d.getDay() !== 6) days.push(new Date(d));
    }
  }
  const HOURS = ["09:00", "10:00", "11:00", "12:00", "16:00", "17:00", "18:00", "19:00"];
  const seed = [
    [0, "09:00", "M. G.", "Seguimiento", ""], [0, "11:00", "A. R.", "Pareja", "pink"], [0, "17:00", "J. P.", "Online", "teal"],
    [1, "10:00", "L. S.", "Primera sesión", "teal"], [1, "12:00", "C. M.", "Seguimiento", ""], [1, "18:00", "R. T.", "Online", "teal"],
    [2, "09:00", "P. D.", "Seguimiento", ""], [2, "16:00", "N. F.", "Familiar", "pink"],
    [3, "11:00", "E. V.", "Seguimiento", ""], [3, "17:00", "S. L.", "Online", "teal"], [3, "19:00", "D. C.", "Seguimiento", ""],
    [4, "10:00", "V. H.", "Pareja", "pink"], [4, "12:00", "G. B.", "Online", "teal"],
  ];
  const appts = seed.map(([d, h, who, type, color]) => ({ d, h, who, type, color }));
  const isBusy = (d, h) => appts.some((a) => a.d === d && a.h === h);
  const fmtDay = (i) => `${DAY_LONG[days[i].getDay()]} ${days[i].getDate()} de ${MONTHS[days[i].getMonth()]}`;
  const fmtShort = (i) => `${DAY_NAMES[days[i].getDay()]} ${days[i].getDate()}`;

  const weekGrid = $("#weekGrid");
  const reminderList = $("#reminderList");
  function renderWeek() {
    weekGrid.innerHTML = "";
    days.forEach((day, i) => {
      const col = document.createElement("div");
      col.className = "week__day";
      const head = document.createElement("b");
      head.innerHTML = `${DAY_NAMES[day.getDay()]}<small>${day.getDate()}</small>`;
      col.appendChild(head);
      appts.filter((a) => a.d === i).sort((a, b) => a.h.localeCompare(b.h)).forEach((a) => {
        const el = document.createElement("div");
        el.className = "appt" + (a.color ? " appt--" + a.color : "") + (a.isNew ? " appt--new" : "");
        el.textContent = `${a.h} · ${a.who}`;
        const i2 = document.createElement("i");
        i2.textContent = a.type;
        el.appendChild(i2);
        col.appendChild(el);
      });
      weekGrid.appendChild(col);
    });
  }
  const reminders = [
    { who: "L. S.", when: `${fmtShort(1)} · 10:00`, ch: "WhatsApp", st: "ok" },
    { who: "J. P.", when: `${fmtShort(0)} · 17:00`, ch: "WhatsApp", st: "sent" },
    { who: "M. G.", when: `${fmtShort(0)} · 09:00`, ch: "Email", st: "ok" },
    { who: "C. M.", when: `${fmtShort(1)} · 12:00`, ch: "WhatsApp", st: "sched" },
  ];
  const ST = { sched: ["Programado", "status--sched"], sent: ["Enviado", "status--sent"], ok: ["Confirmado ✓", "status--ok"] };
  function renderReminders() {
    reminderList.innerHTML = "";
    reminders.forEach((r) => {
      const li = document.createElement("li");
      if (r.isNew) li.className = "is-new";
      const info = document.createElement("div");
      const b = document.createElement("b");
      b.textContent = `${r.who} · ${r.when}`;
      const s = document.createElement("span");
      s.textContent = `${r.ch} · 24 h y 2 h antes`;
      info.append(b, s);
      const st = document.createElement("span");
      st.className = "status " + ST[r.st][1];
      st.textContent = ST[r.st][0];
      li.append(info, st);
      reminderList.appendChild(li);
    });
  }
  renderWeek();
  renderReminders();

  // ----- Chat engine -----
  const chat = $("#demoChat");
  const quick = $("#demoQuick");
  const form = $("#demoForm");
  const input = $("#demoInput");
  let state = { step: "idle", day: null, hour: null, mode: null, name: null, booked: false };
  let busy = false;

  const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const nowTime = () => new Date().toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" });

  function scrollChat() { chat.scrollTop = chat.scrollHeight; }
  function userMsg(text) {
    const d = document.createElement("div");
    d.className = "msg msg--out";
    d.textContent = text;
    const t = document.createElement("time");
    t.textContent = nowTime();
    d.appendChild(t);
    chat.appendChild(d);
    scrollChat();
  }
  async function botMsg(html, delay = 750) {
    const ty = document.createElement("div");
    ty.className = "typing";
    ty.innerHTML = "<span></span><span></span><span></span>";
    chat.appendChild(ty);
    scrollChat();
    await sleep(reduceMotion ? 50 : delay);
    ty.remove();
    const d = document.createElement("div");
    d.className = "msg msg--in";
    d.innerHTML = html + `<time>${nowTime()}</time>`;
    chat.appendChild(d);
    scrollChat();
    return d;
  }
  function sysNote(text) {
    const d = document.createElement("div");
    d.className = "sys-note";
    d.textContent = text;
    chat.appendChild(d);
    scrollChat();
  }
  function setQuick(items) {
    quick.innerHTML = "";
    items.forEach(([label, fn, cls], i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip" + (cls ? " " + cls : "");
      b.style.animationDelay = i * 50 + "ms";
      b.textContent = label;
      b.addEventListener("click", () => { if (!busy) fn(label); });
      quick.appendChild(b);
    });
  }
  const DEFAULT_QUICK = () => [
    ["📅 Agendar una cita", (l) => handle(l), "chip--teal"],
    ["💬 ¿Cuánto cuesta?", (l) => handle(l)],
    ["💻 ¿Es online?", (l) => handle(l)],
    ["🌱 Primera sesión", (l) => handle("¿Qué pasa en la primera sesión?")],
    ["🔁 Cancelar o cambiar", (l) => handle("¿Cómo cancelo una cita?")],
  ];

  const ANSWERS = {
    price: "La sesión individual cuesta <b>$40</b> (50 min) y la de pareja <b>$55</b>. Hay un pack de 4 sesiones con 10% de descuento. Puedes pagar con tarjeta o transferencia 💳",
    online: "¡Sí! Laura atiende <b>presencial y online</b> por videollamada segura. Te envío el enlace automáticamente al confirmar la cita, sin instalar nada 💻",
    first: "La primera sesión es para conocerse 🌱: hablarás de lo que te trae a consulta, tus objetivos y resolverás tus dudas sobre el proceso. Dura 50 minutos y no necesitas preparar nada.",
    cancel: "Puedes cancelar o cambiar tu cita <b>gratis hasta 24 h antes</b>, respondiendo a cualquier recordatorio o escribiéndome aquí. Yo me encargo de buscarte otro horario 🔁",
    topics: "Sí, Laura trabaja con <b>ansiedad, estrés, depresión, autoestima, duelo y terapia de pareja</b>, desde un enfoque cognitivo-conductual e integrativo. En la primera sesión valoraréis juntos cómo abordarlo.",
    location: "La consulta presencial está en el centro de la ciudad, a 3 minutos del metro 📍 Al confirmar te envío la ubicación exacta en Google Maps.",
    hours: "Laura atiende de <b>lunes a viernes</b>, de 9:00 a 13:00 y de 16:00 a 20:00. Yo respondo 24/7 y puedo agendarte a cualquier hora 🕐",
    invoice: "Sí, recibes <b>factura automática</b> después de cada sesión, válida para reembolso de tu seguro médico si tu póliza lo cubre 🧾",
    greet: "¡Hola! 👋 ¿En qué puedo ayudarte? Puedo agendarte una cita o resolver cualquier duda sobre la consulta.",
    thanks: "¡Con gusto! 💜 Si necesitas algo más, aquí estoy a cualquier hora.",
    crisis: "Gracias por escribir. Lo que sientes importa. <b>Si estás en peligro o piensas en hacerte daño, llama ahora al número de emergencias de tu país</b> o acude a urgencias. Ya he avisado a Laura para que se ponga en contacto contigo lo antes posible. No estás solo/a 💜",
    fallback: "Buena pregunta 🙂 Para darte la respuesta exacta se la paso a Laura, que te responderá personalmente hoy. Mientras tanto, ¿quieres que te ayude a agendar una sesión?",
  };
  const INTENTS = [
    ["crisis", /suicid|matarme|quitarme la vida|morir|hacerme dano|autoles|no quiero vivir|emergencia|crisis/],
    ["book", /agend|cita|reserv|turno|disponib|hueco|empezar|sesion para|quiero una/],
    ["price", /cuant|precio|cost|tarifa|valor|pagar|pago|cobr/],
    ["online", /online|virtual|videollamada|video|zoom|meet|distancia|remot/],
    ["first", /primera|inicial|como es|que pasa|como funciona/],
    ["cancel", /cancel|reprogram|cambiar|mover|anular/],
    ["topics", /ansiedad|depresi|pareja|duelo|estres|autoestima|trauma|panico|insomnio|trabajan|tratan|especiali|enfoque/],
    ["location", /donde|direcci|ubicaci|consultorio|presencial|llegar/],
    ["hours", /horario|abren|cierran|sabado|domingo|que dias|a que hora/],
    ["invoice", /factura|seguro|reembolso|recibo|prepaga|obra social/],
    ["thanks", /gracias|genial|perfecto|ok|vale/],
    ["greet", /^(hola|buenas|buen dia|buenos|hey|que tal)/],
  ];

  async function handle(text, silent = false) {
    if (busy) return;
    text = text.trim();
    if (!text) return;
    if (!silent) userMsg(text);
    busy = true;
    try {
      if (state.step === "name") return await gotName(text);
      const n = norm(text);
      const intent = (INTENTS.find(([, re]) => re.test(n)) || ["fallback"])[0];
      if (intent === "book") return await startBooking();
      if (intent === "crisis") {
        await botMsg(ANSWERS.crisis, 900);
        toast("🚨 Protocolo de seguridad: aviso enviado a la psicóloga");
        setQuick(DEFAULT_QUICK());
        return;
      }
      await botMsg(ANSWERS[intent]);
      if (intent === "fallback" || intent === "price" || intent === "first" || intent === "topics") {
        setQuick([["📅 Sí, agendar una cita", (l) => handle(l), "chip--teal"], ...DEFAULT_QUICK().slice(1)]);
      } else {
        setQuick(DEFAULT_QUICK());
      }
    } finally {
      busy = false;
    }
  }

  async function startBooking() {
    if (state.booked) {
      await botMsg(`Ya tienes una sesión reservada el <b>${fmtDay(state.day)} a las ${state.hour}</b> ✅ ¿Quieres agendar otra?`);
      state = { ...state, booked: false };
    }
    state.step = "day";
    await botMsg("¡Genial! Estos son los próximos días con disponibilidad 📅 ¿Cuál te viene mejor?");
    setQuick(days.map((d, i) => [fmtShort(i), (l) => pickDay(i, l), "chip--teal"]));
  }
  async function pickDay(i, label) {
    busy = true;
    userMsg(label);
    state.day = i;
    state.step = "time";
    const free = HOURS.filter((h) => !isBusy(i, h));
    await botMsg(`Para el <b>${fmtDay(i)}</b> tengo estos horarios libres:`);
    setQuick([
      ...free.map((h) => [h, (l) => pickHour(h, l), "chip--teal"]),
      ["← Otro día", () => { busy = false; handle("Quiero agendar una cita", true); }],
    ]);
    busy = false;
  }
  async function pickHour(h, label) {
    busy = true;
    userMsg(label);
    state.hour = h;
    state.step = "mode";
    await botMsg("Perfecto. ¿Prefieres la sesión <b>online</b> o <b>presencial</b>?");
    setQuick([
      ["💻 Online", (l) => pickMode("Online", l), "chip--teal"],
      ["🏠 Presencial", (l) => pickMode("Presencial", l), "chip--teal"],
    ]);
    busy = false;
  }
  async function pickMode(m, label) {
    busy = true;
    userMsg(label);
    state.mode = m;
    state.step = "name";
    await botMsg("¡Anotado! Por último, ¿a nombre de quién hago la reserva? ✍️");
    setQuick([]);
    input.placeholder = "Escribe tu nombre…";
    input.focus({ preventScroll: true });
    busy = false;
  }
  async function gotName(text) {
    const name = text.replace(/[<>]/g, "").slice(0, 40);
    state.name = name;
    state.step = "idle";
    state.booked = true;
    input.placeholder = "Escribe tu pregunta… ej. ¿cuánto cuesta?";
    const first = name.split(" ")[0];
    await botMsg(`Gracias, ${escapeHtml(first)} 😊 Reservando tu sesión…`, 600);
    await sleep(500);

    const card = document.createElement("div");
    card.className = "booking-card";
    card.innerHTML = `
      <div class="booking-card__top"><svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg> Sesión confirmada</div>
      <dl>
        <dt>Paciente</dt><dd></dd>
        <dt>Fecha</dt><dd>${fmtDay(state.day)}</dd>
        <dt>Hora</dt><dd>${state.hour} · 50 min</dd>
        <dt>Modalidad</dt><dd>${state.mode}</dd>
        <dt>Con</dt><dd>Psic. Laura Méndez</dd>
      </dl>
      <div class="booking-card__foot">📲 ${state.mode === "Online" ? "Enlace de videollamada enviado." : "Ubicación enviada por WhatsApp."} Te recordaré 24 h y 2 h antes.</div>`;
    card.querySelector("dd").textContent = name;
    chat.appendChild(card);
    scrollChat();

    // Push to dashboard
    const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase() + ".").join(" ") || "N.";
    appts.forEach((a) => (a.isNew = false));
    appts.push({ d: state.day, h: state.hour, who: initials, type: state.mode === "Online" ? "Nuevo · Online" : "Nuevo · Primera", color: "", isNew: true });
    const rem = { who: initials, when: `${fmtShort(state.day)} · ${state.hour}`, ch: "WhatsApp", st: "sched", isNew: true };
    reminders.forEach((r) => (r.isNew = false));
    reminders.unshift(rem);
    if (reminders.length > 5) reminders.pop();
    renderWeek();
    renderReminders();
    bumpKpi("#kpiSessions", 1);
    bumpKpi("#kpiAnswers", 1);
    $("#dashHint").innerHTML = '✅ ¡Nueva cita recibida! Mindflow la agendó, la sincronizó con tu calendario y programó los recordatorios. <b>Tú no tocaste nada.</b>';
    badge.hidden = false;
    toast("📥 Nueva cita en el panel del psicólogo");

    await sleep(1400);
    sysNote("⏩ Simulación: avanzamos al día anterior a la sesión…");
    await sleep(1300);
    const notif = document.createElement("div");
    notif.className = "notif";
    notif.innerHTML = `<div class="notif__app"><svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z"/></svg></div>
      <div><small>WhatsApp · ahora</small><b>Consulta Psic. Laura M.</b><br>Hola ${escapeHtml(first)} 👋 Te recuerdo tu sesión mañana a las ${state.hour} (${state.mode.toLowerCase()}). ¿Confirmas tu asistencia?</div>`;
    chat.appendChild(notif);
    scrollChat();
    rem.st = "sent";
    renderReminders();
    setQuick([
      ["✅ Confirmo asistencia", (l) => confirmAttend(rem, l), "chip--teal"],
      ["🔁 Necesito cambiarla", (l) => { userMsg(l); state.booked = false; busy = false; startBookingWrapped(); }],
    ]);
  }
  async function startBookingWrapped() { busy = true; try { await botMsg("Sin problema, liberamos tu horario anterior para otro paciente 🔁"); appts.splice(appts.findIndex((a) => a.isNew), 1); renderWeek(); await startBooking(); } finally { busy = false; } }
  async function confirmAttend(rem, label) {
    busy = true;
    userMsg(label);
    rem.st = "ok";
    renderReminders();
    bumpKpi("#kpiConfirmed", 0, "95%");
    await botMsg(`¡Perfecto, ${escapeHtml(state.name.split(" ")[0])}! Te esperamos 💜 Si surge algo, escríbeme cuando quieras.`);
    sysNote("🎉 Así funciona Mindflow: cita agendada, sincronizada y confirmada sin que la psicóloga intervenga.");
    setQuick([["👀 Ver el panel del psicólogo", () => { switchTab("pro"); $("#prototipo").scrollIntoView({ behavior: "smooth" }); }, "chip--teal"], ...DEFAULT_QUICK().slice(1, 4)]);
    busy = false;
  }
  function bumpKpi(sel, inc, text) {
    const el = $(sel);
    el.textContent = text || String(parseInt(el.textContent, 10) + inc);
    el.classList.remove("flash");
    void el.offsetWidth;
    el.classList.add("flash");
  }
  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const v = input.value;
    input.value = "";
    handle(v);
  });
  $$("[data-ask]").forEach((li) => li.addEventListener("click", () => {
    if (state.step !== "idle") return toast("Termina la reserva en curso o reinicia la demo ↻");
    handle(li.dataset.ask);
  }));

  async function resetDemo() {
    chat.innerHTML = "";
    quick.innerHTML = "";
    state = { step: "idle", day: null, hour: null, mode: null, name: null, booked: false };
    busy = true;
    input.placeholder = "Escribe tu pregunta… ej. ¿cuánto cuesta?";
    await botMsg("¡Hola! 👋 Soy el asistente de la consulta de <b>Laura Méndez, psicóloga</b>. Respondo al instante, a cualquier hora.", 500);
    await botMsg("Puedo <b>agendarte una sesión</b>, contarte precios y modalidades o resolver cualquier duda. ¿En qué te ayudo?", 700);
    setQuick(DEFAULT_QUICK());
    busy = false;
  }
  $(".demo-chat__reset").addEventListener("click", () => { if (!busy) resetDemo(); });

  // Start demo when visible
  const demoObs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { demoObs.disconnect(); resetDemo(); }
  }, { threshold: 0.25 });
  demoObs.observe($("#prototipo"));

  /* ---------------- ROI calculator ---------------- */
  const r = { s: $("#rSessions"), p: $("#rPrice"), n: $("#rNoShow"), a: $("#rAdmin") };
  const money = (v) => "$" + Math.round(v).toLocaleString("es");
  let shown = 0;
  function fill(el) {
    const pct = ((el.value - el.min) / (el.max - el.min)) * 100;
    el.style.setProperty("--fill", pct + "%");
  }
  function calc() {
    const s = +r.s.value, p = +r.p.value, n = +r.n.value, a = +r.a.value;
    $("#oSessions").textContent = s;
    $("#oPrice").textContent = "$" + p;
    $("#oNoShow").textContent = n + "%";
    $("#oAdmin").textContent = a + " h";
    Object.values(r).forEach(fill);
    const savedSessions = s * 4.33 * (n / 100) * 0.5;
    const moneyVal = savedSessions * p;
    const hours = a * 4.33 * 0.7;
    $("#roiHours").textContent = Math.round(hours) + " h";
    $("#roiSessions").textContent = Math.round(savedSessions);
    const times = moneyVal / 39;
    $("#roiTimes").textContent = (times >= 10 ? Math.round(times) : times.toFixed(1).replace(".", ",")) + "×";
    $("#roiBar").style.width = Math.min(100, (moneyVal / 2000) * 100) + "%";
    animateMoney(moneyVal);
  }
  let moneyRaf;
  function animateMoney(target) {
    cancelAnimationFrame(moneyRaf);
    const from = shown, t0 = performance.now(), dur = 500;
    const step = (t) => {
      const k = Math.min(1, (t - t0) / dur);
      shown = from + (target - from) * (1 - Math.pow(1 - k, 3));
      $("#roiMoney").textContent = money(shown);
      if (k < 1) moneyRaf = requestAnimationFrame(step);
    };
    moneyRaf = requestAnimationFrame(step);
  }
  Object.values(r).forEach((el) => el.addEventListener("input", calc));
  const roiObs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { roiObs.disconnect(); calc(); } }, { threshold: 0.3 });
  roiObs.observe($("#calculadora"));
  Object.values(r).forEach(fill);

  /* ---------------- Billing toggle ---------------- */
  const billBtns = $$(".billing-toggle button");
  const billPill = $(".billing-toggle__pill");
  function moveBill(btn) {
    billPill.style.width = btn.offsetWidth + "px";
    billPill.style.transform = `translateX(${btn.offsetLeft - 5}px)`;
  }
  billBtns.forEach((b) => b.addEventListener("click", () => {
    billBtns.forEach((x) => x.classList.toggle("is-active", x === b));
    moveBill(b);
    const key = b.dataset.billing === "yearly" ? "y" : "m";
    $$(".plan__price .amt").forEach((el, i) => {
      setTimeout(() => {
        el.classList.remove("flip");
        void el.offsetWidth;
        el.classList.add("flip");
        setTimeout(() => (el.textContent = el.dataset[key]), 220);
      }, i * 80);
    });
    $$(".plan__price .per").forEach((el) => (el.textContent = key === "y" ? "/mes, anual" : "/mes"));
  }));
  requestAnimationFrame(() => moveBill(billBtns[0]));
  document.fonts && document.fonts.ready.then(() => moveBill($(".billing-toggle button.is-active")));
  window.addEventListener("resize", () => moveBill($(".billing-toggle button.is-active")));

  $$("[data-plan]").forEach((a) => a.addEventListener("click", () => { $("#fPlan").value = a.dataset.plan; }));

  /* ---------------- Signup form ---------------- */
  const signup = $("#signupForm");
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function validate() {
    let ok = true;
    const checks = [
      ["#fName", (v) => v.trim().length >= 2],
      ["#fEmail", (v) => emailRe.test(v.trim())],
      ["#fType", (v) => !!v],
    ];
    checks.forEach(([sel, fn]) => {
      const el = $(sel);
      const valid = fn(el.value);
      el.closest(".field").classList.toggle("is-invalid", !valid);
      if (!valid) ok = false;
    });
    const consent = $("#fConsent");
    consent.closest(".consent").classList.toggle("is-invalid", !consent.checked);
    if (!consent.checked) ok = false;
    return ok;
  }
  $$("#signupForm input, #signupForm select").forEach((el) =>
    el.addEventListener("input", () => {
      const f = el.closest(".field");
      if (f) f.classList.remove("is-invalid");
      if (el.type === "checkbox") el.closest(".consent").classList.remove("is-invalid");
    })
  );
  signup.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast("Revisa los campos marcados ✍️");
      return;
    }
    const btn = signup.querySelector("button[type=submit]");
    btn.classList.add("is-loading");
    btn.disabled = true;
    const data = {
      nombre: $("#fName").value.trim(),
      email: $("#fEmail").value.trim(),
      whatsapp: $("#fPhone").value.trim(),
      tipo: $("#fType").value,
      plan: $("#fPlan").value,
      fecha: new Date().toISOString(),
      origen: location.href,
    };
    try {
      if (CONFIG.formEndpoint) {
        const res = await fetch(CONFIG.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("HTTP " + res.status);
      } else {
        await sleep(900);
        try {
          const list = JSON.parse(localStorage.getItem("mindflow_waitlist") || "[]");
          list.push(data);
          localStorage.setItem("mindflow_waitlist", JSON.stringify(list));
        } catch (_) { /* storage unavailable */ }
      }
      const code = "MF-" + Math.random().toString(36).slice(2, 6).toUpperCase();
      $("#successName").textContent = data.nombre.split(" ")[0];
      $("#successEmail").textContent = data.email;
      $("#successCode").textContent = code;
      $('[data-state="form"]', signup).hidden = true;
      $('[data-state="success"]', signup).hidden = false;
      signup.scrollIntoView({ behavior: "smooth", block: "center" });
      confetti(signup);
    } catch (err) {
      toast("No pudimos enviar tu solicitud. Inténtalo de nuevo en un momento.");
    } finally {
      btn.classList.remove("is-loading");
      btn.disabled = false;
    }
  });

  function confetti(anchor) {
    if (reduceMotion) return;
    const colors = ["#8b5cf6", "#2dd4bf", "#f472b6", "#818cf8", "#fbbf24"];
    const r = anchor.getBoundingClientRect();
    for (let i = 0; i < 70; i++) {
      const p = document.createElement("i");
      const size = 6 + Math.random() * 6;
      Object.assign(p.style, {
        position: "fixed", zIndex: 400, pointerEvents: "none", width: size + "px", height: size * 0.5 + "px",
        background: colors[i % colors.length], left: r.left + r.width / 2 + "px", top: r.top + 80 + "px", borderRadius: "2px",
      });
      document.body.appendChild(p);
      const ang = Math.random() * Math.PI * 2, vel = 120 + Math.random() * 260;
      p.animate([
        { transform: "translate(0,0) rotate(0)", opacity: 1 },
        { transform: `translate(${Math.cos(ang) * vel}px, ${Math.sin(ang) * vel + 260}px) rotate(${Math.random() * 720}deg)`, opacity: 0 },
      ], { duration: 1400 + Math.random() * 800, easing: "cubic-bezier(.2,.8,.3,1)" }).onfinish = () => p.remove();
    }
  }
})();
