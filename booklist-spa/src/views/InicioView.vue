<template>
  <section class="hero">
    <p class="hero-eyebrow">Área de Desarrollo Frontend</p>
    <h1 class="hero-title">
      Un catálogo vivo para<br /><em>Editorial Nova</em>
    </h1>
    <p class="hero-lead">
      Hola, {{ usuario }}. Esta es la SPA de gestión de libros: registrá títulos,
      organizalos por categoría y navegá el catálogo sin recargar la página.
    </p>

    <div class="hero-actions">
      <router-link to="/libros" class="btn btn--gold">Ir al catálogo</router-link>
    </div>
  </section>

  <section class="counter-card">
    <div class="counter-head">
      <h2>Visitas al panel</h2>
      <p>Contador básico con datos reactivos (<code>data</code>, <code>methods</code>)</p>
    </div>
    <div class="counter-body">
      <button class="counter-btn" @click="restar" :disabled="visitas === 0" aria-label="Restar visita">−</button>
      <span class="counter-value">{{ visitas }}</span>
      <button class="counter-btn" @click="sumar" aria-label="Sumar visita">+</button>
    </div>
  </section>

  <section class="stats-grid">
    <div class="stat">
      <p class="stat-value">{{ totalLibros }}</p>
      <p class="stat-label">Libros registrados</p>
    </div>
    <div class="stat">
      <p class="stat-value">{{ totalCategorias }}</p>
      <p class="stat-label">Categorías activas</p>
    </div>
    <div class="stat">
      <p class="stat-value">{{ visitas }}</p>
      <p class="stat-label">Visitas de esta sesión</p>
    </div>
  </section>
</template>

<script>
import { useBooksStore } from '../store/books'

export default {
  name: 'InicioView',
  setup() {
    const { state, categorias } = useBooksStore()
    return { state, categorias }
  },
  data() {
    return {
      visitas: 1,
      usuario: this.state.usuario
    }
  },
  computed: {
    totalLibros() {
      return this.state.libros.length
    },
    totalCategorias() {
      return this.categorias.length
    }
  },
  methods: {
    sumar() {
      this.visitas++
    },
    restar() {
      if (this.visitas > 0) this.visitas--
    }
  }
}
</script>

<style scoped>
.hero {
  max-width: 640px;
}

.hero-eyebrow {
  color: var(--gold);
  font-size: 0.85rem;
  margin: 0 0 0.75rem;
}

.hero-title {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 2.75rem;
  line-height: 1.15;
  margin: 0 0 1.25rem;
}

.hero-title em {
  font-style: italic;
  color: var(--gold);
}

.hero-lead {
  color: var(--paper-dim);
  font-size: 1.05rem;
  margin: 0 0 2rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  font-size: 0.95rem;
  border: 1px solid var(--gold);
  transition: background 0.15s ease, color 0.15s ease;
}

.btn--gold {
  background: var(--gold);
  color: var(--ink);
}

.btn--gold:hover {
  background: transparent;
  color: var(--gold);
}

.counter-card {
  margin-top: 3.5rem;
  border: 1px solid var(--rule);
  background: var(--panel);
  padding: 1.75rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.counter-head h2 {
  font-family: var(--font-display);
  font-weight: 400;
  margin: 0 0 0.35rem;
  font-size: 1.2rem;
}

.counter-head p {
  margin: 0;
  color: var(--paper-dim);
  font-size: 0.85rem;
}

.counter-head code {
  color: var(--teal);
}

.counter-body {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.counter-btn {
  width: 38px;
  height: 38px;
  border: 1px solid var(--rule);
  background: var(--panel-2);
  color: var(--paper);
  font-size: 1.2rem;
  cursor: pointer;
  line-height: 1;
}

.counter-btn:hover:not(:disabled) {
  border-color: var(--gold);
  color: var(--gold);
}

.counter-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.counter-value {
  font-family: var(--font-display);
  font-size: 1.8rem;
  min-width: 2ch;
  text-align: center;
}

.stats-grid {
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--rule);
  border: 1px solid var(--rule);
}

.stat {
  background: var(--ink);
  padding: 1.5rem;
}

.stat-value {
  font-family: var(--font-display);
  font-size: 2rem;
  margin: 0;
  color: var(--gold);
}

.stat-label {
  margin: 0.35rem 0 0;
  font-size: 0.82rem;
  color: var(--paper-dim);
}

@media (max-width: 600px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
