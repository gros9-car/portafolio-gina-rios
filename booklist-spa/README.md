# BookList SPA — Editorial Nova

Proyecto de evaluación del **Módulo 6: Desarrollo de interfaces interactivas con framework Vue**.

## Cómo correrlo

```bash
npm install
npm run dev
```

Abre la URL que muestra Vite (por defecto `http://localhost:5173`).

## Estructura

```
src/
  main.js               # bootstrap de la app y del router
  App.vue                # layout raíz + navegación (rail lateral)
  style.css              # tokens de diseño globales
  store/
    books.js             # estado reactivo centralizado (composable)
  router/
    index.js             # rutas: /, /libros, /libros/:id
  components/
    Libro.vue             # tarjeta de un libro (v-bind, v-if/v-show)
    BookForm.vue          # formulario (v-model, eventos, modificadores)
  views/
    InicioView.vue        # Lección 1: datos reactivos, contador, MVVM
    ListaLibros.vue        # Lección 2 y 4: v-for, filtros, eventos
    DetalleLibro.vue       # Lección 5: rutas dinámicas y props
```

## Decisiones tomadas

- **Estado compartido sin Vuex**: como el módulo 6 no exige Vuex, el estado del
  catálogo vive en `src/store/books.js` usando `reactive()` de Vue 3, expuesto
  como un composable (`useBooksStore`). Esto mantiene el sistema modular y
  reutilizable sin agregar una dependencia que la consigna no pide.
- **Rutas dinámicas con props**: `/libros/:id` usa `props: true` en el router
  para que `DetalleLibro.vue` reciba `id` directamente como prop, evitando leer
  `this.$route` dentro del componente (mejor testeable y desacoplado).
- **Formulario**: combina `input` (título, autor), `select` (categoría) y
  `textarea` (notas), todos con `v-model`. Incluye una vista previa en tiempo
  real y permite enviar con `Enter` (`@keyup.enter`) además del botón, usando
  `@submit.prevent` para evitar el recargo de página.
- **Eventos y modificadores**: `@click` para agregar/eliminar libros,
  `.prevent` en el submit del formulario y `.once` en el tip de ayuda del
  formulario (se oculta la primera vez que se hace click y no vuelve a
  reaccionar a clicks posteriores).
- **Diseño**: identidad editorial (tipografía Fraunces + IBM Plex Sans, paleta
  tinta/oro/burdeos) en vez de un dashboard genérico, acorde a que el cliente
  es una editorial y el contenido son libros.

## Validaciones cubiertas

- Estructura de componentes Vue (`template`/`script`/`style` en cada archivo).
- Binding reactivo con `v-model` en el formulario.
- Directivas `v-if`, `v-show` y `v-for` en `Libro.vue` y `ListaLibros.vue`.
- Eventos `@click`, `@keyup.enter` y modificadores `.prevent` / `.once`.
- Vue Router con 3 vistas y una ruta dinámica (`/libros/:id`) que pasa `id`
  como prop.
