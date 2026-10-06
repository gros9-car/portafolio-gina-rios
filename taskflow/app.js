/* =====================================================================
   TASKFLOW — app.js
   Aplicación de gestión de tareas.
   Cubre los 5 pasos de la consigna:
     1. Orientación a objetos      -> clases Tarea y GestorTareas
     2. ES6+                       -> let/const, arrow fn, template
                                       literals, destructuring, spread/rest
     3. Eventos y DOM               -> submit, click, mouseover, keyup
     4. Asincronía                  -> setTimeout, setInterval
     5. Consumo de API              -> fetch + localStorage + try/catch
   ===================================================================== */

/* ---------------------------------------------------------------------
   1. ORIENTACIÓN A OBJETOS
   --------------------------------------------------------------------- */

/**
 * Representa una tarea individual.
 * Estados posibles: 'pendiente' | 'en-progreso' | 'completada'
 */
class Tarea {
  constructor(descripcion, fechaLimite = null) {
    this.id = `t_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    this.descripcion = descripcion;
    this.estado = "pendiente";
    this.fechaCreacion = new Date().toISOString();
    this.fechaLimite = fechaLimite; // string ISO o null
  }

  /** Cambia el estado de la tarea, validando que sea uno permitido. */
  cambiarEstado(nuevoEstado) {
    const estadosValidos = ["pendiente", "en-progreso", "completada"];
    if (!estadosValidos.includes(nuevoEstado)) {
      throw new Error(`Estado inválido: ${nuevoEstado}`);
    }
    this.estado = nuevoEstado;
    return this;
  }

  /** Indica si la tarea venció y todavía no fue completada. */
  estaVencida() {
    if (!this.fechaLimite || this.estado === "completada") return false;
    return new Date(this.fechaLimite).getTime() < Date.now();
  }

  /** Serializa la tarea a un objeto plano (para localStorage / API). */
  toJSON() {
    const { id, descripcion, estado, fechaCreacion, fechaLimite } = this;
    return { id, descripcion, estado, fechaCreacion, fechaLimite };
  }

  /** Reconstruye una instancia de Tarea a partir de un objeto plano. */
  static fromJSON(obj) {
    const tarea = new Tarea(obj.descripcion, obj.fechaLimite ?? null);
    // Usamos spread/destructuring para "pisar" los campos generados
    Object.assign(tarea, { ...obj });
    return tarea;
  }
}

/**
 * Administra la colección completa de tareas: alta, baja, edición,
 * filtrado, persistencia en localStorage y sincronización con una API.
 */
class GestorTareas {
  #tareas = []; // propiedad privada: única fuente de verdad en memoria

  constructor(storageKey = "taskflow_tareas") {
    this.storageKey = storageKey;
  }

  agregarTarea(tarea) {
    this.#tareas.push(tarea);
    this.guardarEnLocalStorage();
    return tarea;
  }

  eliminarTarea(id) {
    this.#tareas = this.#tareas.filter((t) => t.id !== id);
    this.guardarEnLocalStorage();
  }

  editarDescripcion(id, nuevaDescripcion) {
    const tarea = this.obtenerPorId(id);
    if (tarea) {
      tarea.descripcion = nuevaDescripcion;
      this.guardarEnLocalStorage();
    }
    return tarea;
  }

  cambiarEstadoTarea(id, nuevoEstado) {
    const tarea = this.obtenerPorId(id);
    if (tarea) {
      tarea.cambiarEstado(nuevoEstado);
      this.guardarEnLocalStorage();
    }
    return tarea;
  }

  obtenerPorId(id) {
    return this.#tareas.find((t) => t.id === id);
  }

  /** Devuelve tareas filtradas por estado y/o texto de búsqueda. */
  obtenerTareas({ estado = "todas", texto = "" } = {}) {
    return this.#tareas
      .filter((t) => estado === "todas" || t.estado === estado)
      .filter((t) => t.descripcion.toLowerCase().includes(texto.toLowerCase()))
      .sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion));
  }

  get contadores() {
    const base = { pendiente: 0, "en-progreso": 0, completada: 0 };
    return this.#tareas.reduce((acc, t) => {
      acc[t.estado] += 1;
      return acc;
    }, base);
  }

  /* ---------------- persistencia local ---------------- */

  guardarEnLocalStorage() {
    const plano = this.#tareas.map((t) => t.toJSON());
    localStorage.setItem(this.storageKey, JSON.stringify(plano));
  }

  cargarDesdeLocalStorage() {
    try {
      const crudo = localStorage.getItem(this.storageKey);
      const lista = crudo ? JSON.parse(crudo) : [];
      this.#tareas = lista.map((obj) => Tarea.fromJSON(obj));
    } catch (error) {
      console.error("No se pudo leer localStorage:", error);
      this.#tareas = [];
    }
    return this.#tareas;
  }

  /* ---------------- consumo de API (paso 5) ---------------- */

  /**
   * Trae tareas de ejemplo desde una API pública (JSONPlaceholder)
   * y las incorpora al gestor. Maneja errores con try/catch.
   */
  async importarDesdeAPI(cantidad = 5) {
    const url = `https://jsonplaceholder.typicode.com/todos?_limit=${cantidad}`;
    try {
      const respuesta = await fetch(url);
      if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
      const datos = await respuesta.json();

      const nuevas = datos.map(({ title }) => {
        const tarea = new Tarea(title);
        if (Math.random() > 0.5) tarea.cambiarEstado("en-progreso");
        return tarea;
      });

      this.#tareas = [...this.#tareas, ...nuevas];
      this.guardarEnLocalStorage();
      return nuevas;
    } catch (error) {
      console.error("Error al importar tareas desde la API:", error);
      throw error;
    }
  }

  /**
   * Envía una tarea a la API (simulación de guardado remoto).
   * JSONPlaceholder no persiste datos reales, pero sí valida el flujo
   * de fetch + POST + manejo de errores.
   */
  async guardarTareaEnAPI(tarea) {
    try {
      const respuesta = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: tarea.descripcion,
          completed: tarea.estado === "completada",
        }),
      });
      if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
      return await respuesta.json();
    } catch (error) {
      console.error("Error al guardar la tarea en la API:", error);
      throw error;
    }
  }
}

/* ---------------------------------------------------------------------
   2 y 3. INICIALIZACIÓN, ES6+ Y EVENTOS DEL DOM
   --------------------------------------------------------------------- */

const gestor = new GestorTareas();

// Referencias del DOM (destructuring implícito por brevedad)
const form = document.getElementById("taskForm");
const inputDescripcion = document.getElementById("descripcion");
const inputFechaLimite = document.getElementById("fechaLimite");
const charCount = document.getElementById("charCount");
const submitBtn = document.getElementById("submitBtn");
const lista = document.getElementById("listaTareas");
const emptyState = document.getElementById("emptyState");
const buscador = document.getElementById("buscador");
const filtros = document.getElementById("filtros");
const btnSync = document.getElementById("btnSync");
const btnPersist = document.getElementById("btnPersist");
const toastContainer = document.getElementById("toastContainer");

let filtroEstado = "todas";
let textoBusqueda = "";
let ultimaTareaCreada = null;
const timersCountdown = new Map(); // id de tarea -> intervalId

/* ---------- toasts (feedback visual) ---------- */
function mostrarToast(mensaje, tipo = "info") {
  const toast = document.createElement("div");
  toast.className = `toast${tipo === "error" ? " error" : ""}`;
  toast.textContent = mensaje;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

/* ---------- render ---------- */
function render() {
  const tareas = gestor.obtenerTareas({ estado: filtroEstado, texto: textoBusqueda });

  lista.innerHTML = "";
  emptyState.hidden = tareas.length > 0;

  tareas.forEach((tarea) => {
    lista.appendChild(crearElementoTarea(tarea));
  });

  actualizarContadores();
}

function crearElementoTarea(tarea) {
  const { id, descripcion, estado, fechaLimite } = tarea;

  const li = document.createElement("li");
  li.className = "task-item";
  li.dataset.id = id;
  li.dataset.estado = estado;
  if (tarea.estaVencida()) li.classList.add("overdue");

  li.innerHTML = `
    <div class="task-top">
      <span class="task-desc">${escapeHTML(descripcion)}</span>
      <div class="task-actions">
        ${estado !== "en-progreso" ? '<button class="icon-btn progress" data-action="progreso" title="Marcar en curso">▶</button>' : ""}
        ${estado !== "completada" ? '<button class="icon-btn done" data-action="completar" title="Completar">✓</button>' : ""}
        <button class="icon-btn del" data-action="eliminar" title="Eliminar">✕</button>
      </div>
    </div>
    <div class="task-meta">
      <span class="badge ${estado}">${etiquetaEstado(estado)}</span>
      ${fechaLimite ? `<span class="countdown" data-countdown="${id}"></span>` : ""}
    </div>
  `;

  return li;
}

const etiquetaEstado = (estado) =>
  ({ pendiente: "Pendiente", "en-progreso": "En curso", completada: "Completada" }[estado] ?? estado);

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function actualizarContadores() {
  const { pendiente, "en-progreso": enProgreso, completada } = gestor.contadores;
  document.getElementById("statPend").textContent = pendiente;
  document.getElementById("statProg").textContent = enProgreso;
  document.getElementById("statDone").textContent = completada;
}

/* ---------------------------------------------------------------------
   3. EVENTOS: submit, click, mouseover, keyup
   --------------------------------------------------------------------- */

// SUBMIT: crear tarea (con delay asincrónico simulado -> paso 4)
form.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const descripcion = inputDescripcion.value.trim();
  const fechaLimite = inputFechaLimite.value || null;
  if (!descripcion) return;

  alternarCargaBoton(true);

  try {
    const nuevaTarea = await crearTareaConRetardo(descripcion, fechaLimite);
    gestor.agregarTarea(nuevaTarea);
    ultimaTareaCreada = nuevaTarea;

    form.reset();
    charCount.textContent = "0 / 120";
    render();
    iniciarCountdownSiCorresponde(nuevaTarea);

    // Notificación asincrónica tras 2 segundos (paso 4)
    setTimeout(() => {
      mostrarToast(`"${nuevaTarea.descripcion}" sigue esperando tu atención ⏳`);
    }, 2000);
  } finally {
    alternarCargaBoton(false);
  }
});

function alternarCargaBoton(cargando) {
  submitBtn.disabled = cargando;
  submitBtn.querySelector(".btn-text").hidden = cargando;
  submitBtn.querySelector(".btn-spinner").hidden = !cargando;
}

/** Simula latencia de red al crear una tarea (paso 4: asincronía). */
function crearTareaConRetardo(descripcion, fechaLimite) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(new Tarea(descripcion, fechaLimite));
    }, 600);
  });
}

// CLICK delegado sobre la lista: completar / marcar en curso / eliminar
lista.addEventListener("click", (evento) => {
  const boton = evento.target.closest("button[data-action]");
  if (!boton) return;

  const li = evento.target.closest(".task-item");
  const { id } = li.dataset;
  const { action } = boton.dataset;

  if (action === "completar") {
    gestor.cambiarEstadoTarea(id, "completada");
    detenerCountdown(id);
    mostrarToast("Tarea completada ✓");
  } else if (action === "progreso") {
    gestor.cambiarEstadoTarea(id, "en-progreso");
  } else if (action === "eliminar") {
    gestor.eliminarTarea(id);
    detenerCountdown(id);
    mostrarToast("Tarea eliminada", "error");
  }

  render();
});

// MOUSEOVER: resaltar la tarea sobre la que pasa el mouse
lista.addEventListener("mouseover", (evento) => {
  const li = evento.target.closest(".task-item");
  if (li) li.style.borderColor = "var(--teal)";
});
lista.addEventListener("mouseout", (evento) => {
  const li = evento.target.closest(".task-item");
  if (li) li.style.borderColor = "";
});

// KEYUP: contador de caracteres en vivo
inputDescripcion.addEventListener("keyup", () => {
  charCount.textContent = `${inputDescripcion.value.length} / 120`;
});

// KEYUP: filtrado en vivo por texto de búsqueda
buscador.addEventListener("keyup", (evento) => {
  textoBusqueda = evento.target.value;
  render();
});

// CLICK: chips de filtro por estado
filtros.addEventListener("click", (evento) => {
  const chip = evento.target.closest(".chip");
  if (!chip) return;
  filtroEstado = chip.dataset.filter;
  [...filtros.children].forEach((c) => c.classList.toggle("active", c === chip));
  render();
});

/* ---------------------------------------------------------------------
   4. ASINCRONÍA: contador regresivo con setInterval
   --------------------------------------------------------------------- */

function iniciarCountdownSiCorresponde(tarea) {
  if (!tarea.fechaLimite) return;
  actualizarCountdown(tarea);

  const intervalId = setInterval(() => {
    const vigente = gestor.obtenerPorId(tarea.id);
    if (!vigente) {
      clearInterval(intervalId);
      return;
    }
    actualizarCountdown(vigente);
  }, 1000);

  timersCountdown.set(tarea.id, intervalId);
}

function detenerCountdown(id) {
  if (timersCountdown.has(id)) {
    clearInterval(timersCountdown.get(id));
    timersCountdown.delete(id);
  }
}

function actualizarCountdown(tarea) {
  const span = document.querySelector(`[data-countdown="${tarea.id}"]`);
  if (!span) return;

  const restanteMs = new Date(tarea.fechaLimite).getTime() - Date.now();

  if (tarea.estado === "completada") {
    span.textContent = "";
    return;
  }

  if (restanteMs <= 0) {
    span.textContent = "¡Vencida!";
    span.classList.add("overdue");
    span.closest(".task-item")?.classList.add("overdue");
    return;
  }

  const segundos = Math.floor(restanteMs / 1000);
  const dias = Math.floor(segundos / 86400);
  const horas = Math.floor((segundos % 86400) / 3600);
  const minutos = Math.floor((segundos % 3600) / 60);
  const segs = segundos % 60;

  span.textContent = dias > 0
    ? `vence en ${dias}d ${horas}h`
    : `vence en ${String(horas).padStart(2, "0")}:${String(minutos).padStart(2, "0")}:${String(segs).padStart(2, "0")}`;
}

// Al cargar, reanudar countdowns de tareas con fecha límite pendiente
function reanudarCountdowns() {
  gestor.obtenerTareas().forEach((tarea) => {
    if (tarea.fechaLimite && tarea.estado !== "completada") {
      iniciarCountdownSiCorresponde(tarea);
    }
  });
}

/* ---------------------------------------------------------------------
   5. CONSUMO DE API
   --------------------------------------------------------------------- */

btnSync.addEventListener("click", async () => {
  btnSync.disabled = true;
  btnSync.textContent = "Importando…";
  try {
    const nuevas = await gestor.importarDesdeAPI(5);
    render();
    mostrarToast(`Se importaron ${nuevas.length} tareas de ejemplo`);
  } catch {
    mostrarToast("No se pudo conectar con la API", "error");
  } finally {
    btnSync.disabled = false;
    btnSync.textContent = "↻ Importar tareas de ejemplo (API)";
  }
});

btnPersist.addEventListener("click", async () => {
  if (!ultimaTareaCreada) {
    mostrarToast("Primero agregá una tarea para poder guardarla", "error");
    return;
  }
  btnPersist.disabled = true;
  try {
    await gestor.guardarTareaEnAPI(ultimaTareaCreada);
    mostrarToast("Última tarea guardada en la API ☁");
  } catch {
    mostrarToast("Error al guardar en la API", "error");
  } finally {
    btnPersist.disabled = false;
  }
});

/* ---------------------------------------------------------------------
   ARRANQUE
   --------------------------------------------------------------------- */
gestor.cargarDesdeLocalStorage();
render();
reanudarCountdowns();
