<template>
  <router-link to="/libros" class="volver">← Volver al catálogo</router-link>

  <section v-if="libro" class="detalle">
    <p class="detalle-eyebrow">{{ libro.categoria }}</p>
    <h1 class="detalle-titulo">{{ libro.titulo }}</h1>
    <p class="detalle-autor">{{ libro.autor }}</p>

    <p v-if="libro.notas" class="detalle-notas">{{ libro.notas }}</p>
    <p v-else class="detalle-notas detalle-notas--vacio">
      Este título todavía no tiene notas cargadas.
    </p>

    <dl class="detalle-meta">
      <div>
        <dt>ID interno</dt>
        <dd>#{{ libro.id }}</dd>
      </div>
      <div>
        <dt>Ruta</dt>
        <dd>/libros/{{ libro.id }}</dd>
      </div>
    </dl>

    <button class="btn btn--spine" @click="eliminarYVolver">Quitar del catálogo</button>
  </section>

  <section v-else class="no-encontrado">
    <h1>No encontramos ese libro</h1>
    <p>El id <code>{{ id }}</code> no corresponde a ningún título del catálogo.</p>
    <router-link to="/libros" class="btn btn--gold">Ir al catálogo</router-link>
  </section>
</template>

<script>
import { useBooksStore } from '../store/books'

export default {
  name: 'DetalleLibro',
  // La ruta /libros/:id fue configurada con props: true,
  // por eso "id" llega directamente como prop del componente.
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  setup() {
    const { obtenerLibroPorId, eliminarLibro } = useBooksStore()
    return { obtenerLibroPorId, eliminarLibro }
  },
  computed: {
    libro() {
      return this.obtenerLibroPorId(this.id)
    }
  },
  methods: {
    eliminarYVolver() {
      if (!this.libro) return
      this.eliminarLibro(this.libro.id)
      this.$router.push('/libros')
    }
  }
}
</script>

<style scoped>
.volver {
  display: inline-block;
  margin-bottom: 2rem;
  color: var(--paper-dim);
  text-decoration: none;
  font-size: 0.85rem;
}

.volver:hover {
  color: var(--gold);
}

.detalle-eyebrow {
  color: var(--teal);
  font-size: 0.82rem;
  margin: 0 0 0.5rem;
}

.detalle-titulo {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 2.3rem;
  margin: 0 0 0.5rem;
}

.detalle-autor {
  color: var(--gold);
  margin: 0 0 1.5rem;
}

.detalle-notas {
  max-width: 560px;
  color: var(--paper-dim);
  margin: 0 0 2rem;
}

.detalle-notas--vacio {
  font-style: italic;
  opacity: 0.7;
}

.detalle-meta {
  display: flex;
  gap: 2.5rem;
  margin: 0 0 2rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--rule);
}

.detalle-meta dt {
  font-size: 0.72rem;
  color: var(--paper-dim);
  margin-bottom: 0.2rem;
}

.detalle-meta dd {
  margin: 0;
  font-family: var(--font-display);
  color: var(--paper);
}

.btn--spine {
  background: none;
  border: 1px solid var(--spine);
  color: var(--spine);
  padding: 0.7rem 1.4rem;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn--spine:hover {
  background: var(--spine);
  color: var(--paper);
}

.no-encontrado h1 {
  font-family: var(--font-display);
  font-weight: 400;
}

.no-encontrado code {
  color: var(--gold);
}

.no-encontrado .btn {
  display: inline-block;
  margin-top: 1rem;
  text-decoration: none;
  padding: 0.7rem 1.4rem;
  border: 1px solid var(--gold);
}

.btn--gold {
  background: var(--gold);
  color: var(--ink);
}
</style>
