# Informe — TaskFlow

## Qué es
Aplicación web de gestión de tareas hecha con JavaScript moderno puro (sin frameworks), construida con HTML, CSS y JS separados: `index.html`, `style.css`, `app.js`.

## Cómo probarla
Abrí `index.html` en el navegador (doble clic, o `Live Server` en VS Code). No requiere build ni instalación.

## 1. Orientación a objetos
- **`Tarea`**: `id`, `descripcion`, `estado`, `fechaCreacion`, `fechaLimite`. Métodos: `cambiarEstado()`, `estaVencida()`, `toJSON()` y el estático `Tarea.fromJSON()` para reconstruir instancias desde datos planos (localStorage/API).
- **`GestorTareas`**: administra el arreglo de tareas con una propiedad privada `#tareas`. Expone `agregarTarea`, `eliminarTarea`, `editarDescripcion`, `cambiarEstadoTarea`, `obtenerTareas` (con filtro por estado/texto), `contadores` (getter), y los métodos de persistencia/API.

## 2. ES6+
`let`/`const` en todo el código, template literals para armar HTML y mensajes, arrow functions en callbacks y getters, destructuring en casi todos los métodos (`const { id, descripcion, estado } = tarea`), y spread/rest para combinar arreglos (`[...this.#tareas, ...nuevas]`) y clonar objetos (`{ ...obj }`).

## 3. Eventos y DOM
- `submit` en el formulario → crea la tarea.
- `click` delegado en la lista (`<ul>`) → completar / marcar en curso / eliminar, usando `data-action` y `event.target.closest`.
- `mouseover` / `mouseout` en cada tarea → resalta el borde.
- `keyup` en el input de descripción → contador de caracteres en vivo.
- `keyup` en el buscador → filtrado en vivo de la lista.

## 4. Asincronía
- `setTimeout` simula latencia de red al crear una tarea (600 ms) y dispara una notificación recordatoria a los 2 segundos.
- `setInterval` alimenta un contador regresivo por tarea con `fechaLimite`, actualizado cada segundo, que marca visualmente las tareas vencidas. Los timers se limpian con `clearInterval` al completar/eliminar la tarea.

## 5. Consumo de API
- `GestorTareas.importarDesdeAPI()` hace `fetch` a JSONPlaceholder (`/todos`) para traer tareas de ejemplo.
- `GestorTareas.guardarTareaEnAPI()` hace un `POST` de la última tarea creada.
- Ambos métodos usan `async/await` con `try/catch` para manejar errores de red, mostrados al usuario como *toasts*.
- Toda la colección de tareas se persiste en `localStorage` (`guardarEnLocalStorage` / `cargarDesdeLocalStorage`), así que la app recuerda el estado entre recargas.

## Qué validar
Crear, completar, poner en curso y eliminar tareas; escribir con fecha límite y ver el contador regresivo; filtrar por estado y por texto; importar tareas de la API; recargar la página y verificar que persisten.
