<template>
  <section class="page-head">
    <p class="page-eyebrow">Catálogo</p>
    <h1 class="page-title">Lista de libros</h1>
    <p class="page-lead">
      Filtrá por autor o categoría, sumá nuevos títulos y gestioná el catálogo en tiempo real.
    </p>
  </section>

  <section class="panel">
    <h2 class="panel-title">Añadir libro</h2>
    <BookForm @agregar="agregarLibro" />
  </section>

  <section class="filtros">
    <input
      v-model.trim="busqueda"
      type="search"
      class="filtro-input"
      placeholder="Buscar por autor o título..."
    />
    <select v-model="categoriaFiltro" class="filtro-select">
      <option value="">Todas las categorías</option>
      <option v-for="cat in categorias" :key="cat" :value="cat">{{ cat }}</option>
    </select>
  </section>

  <section class="resultado">
    <p class="resultado-conteo">
      {{ librosFiltrados.length }} de {{ state.libros.length }}
      {{ state.libros.length === 1 ? 'libro' : 'libros' }}
    </p>

    <div v-if="librosFiltrados.length" class="grid">
      <Libro
        v-for="libro in librosFiltrados"
        :key="libro.id"
        :libro="libro"
        @eliminar="eliminarLibro"
      />
    </div>

    <p v-else class="vacio">
      No hay libros disponibles{{ busqueda || categoriaFiltro ? ' con ese filtro' : '' }}.
      <button v-if="busqueda || categoriaFiltro" class="link-btn" @click="limpiarFiltros">
        Limpiar filtros
      </button>
    </p>
  </section>
</template>

<script>
import { useBooksStore } from '../store/books'
import Libro from '../components/Libro.vue'
import BookForm from '../components/BookForm.vue'

export default {
  name: 'ListaLibros',
  components: { Libro, BookForm },
  setup() {
    const { state, categorias, agregarLibro, eliminarLibro } = useBooksStore()
    return { state, categorias, agregarLibro, eliminarLibro }
  },
  data() {
    return {
      busqueda: '',
      categoriaFiltro: ''
    }
  },
  computed: {
    librosFiltrados() {
      const texto = this.busqueda.toLowerCase()
      return this.state.libros.filter((libro) => {
        const coincideTexto =
          !texto ||
          libro.titulo.toLowerCase().includes(texto) ||
          libro.autor.toLowerCase().includes(texto)
        const coincideCategoria = !this.categoriaFiltro || libro.categoria === this.categoriaFiltro
        return coincideTexto && coincideCategoria
      })
    }
  },
  methods: {
    limpiarFiltros() {
      this.busqueda = ''
      this.categoriaFiltro = ''
    }
  }
}
</script>

<style scoped>
.page-eyebrow {
  color: var(--gold);
  font-size: 0.85rem;
  margin: 0 0 0.5rem;
}

.page-title {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 2.1rem;
  margin: 0 0 0.6rem;
}

.page-lead {
  color: var(--paper-dim);
  margin: 0 0 2rem;
  max-width: 560px;
}

.panel {
  border: 1px solid var(--rule);
  background: var(--panel);
  padding: 1.75rem 2rem;
  margin-bottom: 2.5rem;
}

.panel-title {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 1.15rem;
  margin: 0 0 1.25rem;
}

.filtros {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.filtro-input,
.filtro-select {
  background: var(--panel-2);
  border: 1px solid var(--rule);
  color: var(--paper);
  padding: 0.6rem 0.8rem;
  font-family: var(--font-body);
  font-size: 0.9rem;
}

.filtro-input {
  flex: 1;
  min-width: 220px;
}

.resultado-conteo {
  font-size: 0.82rem;
  color: var(--paper-dim);
  margin: 0 0 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
}

.vacio {
  border: 1px dashed var(--rule);
  padding: 2rem;
  text-align: center;
  color: var(--paper-dim);
}

.link-btn {
  display: block;
  margin: 0.75rem auto 0;
  background: none;
  border: none;
  color: var(--gold);
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
  font-size: 0.85rem;
}
</style>
