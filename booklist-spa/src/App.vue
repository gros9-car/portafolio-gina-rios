<template>
  <div class="frame">
    <aside class="rail">
      <div class="rail-brand">
        <span class="rail-mark">N</span>
        <div class="rail-brand-text">
          <p class="rail-eyebrow">Editorial Nova</p>
          <p class="rail-title">BookList</p>
        </div>
      </div>

      <nav class="rail-nav" aria-label="Navegación principal">
        <router-link to="/" class="rail-link" exact-active-class="rail-link--active">
          <span class="rail-num">01</span> Inicio
        </router-link>
        <router-link to="/libros" class="rail-link" active-class="rail-link--active">
          <span class="rail-num">02</span> Catálogo
        </router-link>
      </nav>

      <div class="rail-footer">
        <p>{{ contador }} {{ contador === 1 ? 'título' : 'títulos' }} en catálogo</p>
        <p class="rail-user">Sesión: {{ usuario }}</p>
      </div>
    </aside>

    <main class="stage">
      <router-view />
    </main>
  </div>
</template>

<script>
import { useBooksStore } from './store/books'

export default {
  name: 'App',
  setup() {
    const { state } = useBooksStore()
    return { state }
  },
  data() {
    return {
      usuario: this.state.usuario
    }
  },
  computed: {
    contador() {
      return this.state.libros.length
    }
  }
}
</script>

<style>
.frame {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
}

.rail {
  background: var(--panel);
  border-right: 1px solid var(--rule);
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: sticky;
  top: 0;
  height: 100vh;
}

.rail-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.rail-mark {
  width: 42px;
  height: 42px;
  border: 1px solid var(--gold);
  color: var(--gold);
  font-family: var(--font-display);
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.rail-eyebrow {
  margin: 0;
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  color: var(--paper-dim);
}

.rail-title {
  margin: 0.15rem 0 0;
  font-family: var(--font-display);
  font-size: 1.35rem;
  color: var(--paper);
}

.rail-nav {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.rail-link {
  text-decoration: none;
  color: var(--paper-dim);
  padding: 0.65rem 0.5rem;
  border-radius: 3px;
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  font-size: 0.95rem;
  transition: color 0.15s ease, background 0.15s ease;
}

.rail-num {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 0.8rem;
  color: var(--gold-dim);
}

.rail-link:hover {
  color: var(--paper);
  background: var(--panel-2);
}

.rail-link--active {
  color: var(--paper);
  background: var(--panel-2);
  border-left: 2px solid var(--gold);
  padding-left: calc(0.5rem - 2px);
}

.rail-footer {
  border-top: 1px solid var(--rule);
  padding-top: 1rem;
  font-size: 0.78rem;
  color: var(--paper-dim);
}

.rail-footer p {
  margin: 0.2rem 0;
}

.rail-user {
  color: var(--teal);
}

.stage {
  padding: 3rem 4rem;
  max-width: 980px;
}

@media (max-width: 800px) {
  .frame {
    grid-template-columns: 1fr;
  }
  .rail {
    position: relative;
    height: auto;
    flex-direction: row;
    align-items: center;
    gap: 1.5rem;
    padding: 1.25rem 1.5rem;
  }
  .rail-nav {
    margin-top: 0;
    flex-direction: row;
  }
  .rail-footer {
    display: none;
  }
  .stage {
    padding: 2rem 1.5rem;
  }
}
</style>
