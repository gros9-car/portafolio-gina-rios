<template>
  <article class="libro" :class="{ 'libro--sin-notas': !libro.notas }">
    <router-link :to="`/libros/${libro.id}`" class="libro-link">
      <header class="libro-head">
        <h3 :title="libro.titulo">{{ libro.titulo }}</h3>
        <span class="libro-categoria" :class="`tag--${categoriaSlug}`">{{ libro.categoria }}</span>
      </header>
      <p class="libro-autor">{{ libro.autor }}</p>
      <p v-show="libro.notas" class="libro-notas">{{ libro.notas }}</p>
      <p v-if="!libro.notas" class="libro-notas libro-notas--vacio">Sin notas todavía.</p>
    </router-link>

    <button class="libro-eliminar" @click="$emit('eliminar', libro.id)">
      Quitar del catálogo
    </button>
  </article>
</template>

<script>
export default {
  name: 'Libro',
  props: {
    libro: {
      type: Object,
      required: true
    }
  },
  emits: ['eliminar'],
  computed: {
    categoriaSlug() {
      return this.libro.categoria
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
    }
  }
}
</script>

<style scoped>
.libro {
  border: 1px solid var(--rule);
  background: var(--panel);
  padding: 1.4rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.libro-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.libro-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
}

.libro-head h3 {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 1.15rem;
  margin: 0;
}

.libro-categoria {
  flex-shrink: 0;
  font-size: 0.72rem;
  padding: 0.2rem 0.55rem;
  border: 1px solid var(--teal);
  color: var(--teal);
  white-space: nowrap;
}

.libro-autor {
  margin: 0;
  color: var(--gold);
  font-size: 0.88rem;
}

.libro-notas {
  margin: 0;
  color: var(--paper-dim);
  font-size: 0.85rem;
}

.libro-notas--vacio {
  font-style: italic;
  opacity: 0.6;
}

.libro-eliminar {
  align-self: flex-start;
  background: none;
  border: none;
  color: var(--spine);
  font-size: 0.78rem;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.libro-eliminar:hover {
  opacity: 0.75;
}
</style>
