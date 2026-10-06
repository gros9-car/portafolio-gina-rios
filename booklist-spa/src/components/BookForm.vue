<template>
  <form class="form" @submit.prevent="enviar">
    <div class="form-row">
      <label for="titulo">Título</label>
      <input
        id="titulo"
        v-model.trim="borrador.titulo"
        type="text"
        placeholder="Ej: Rayuela"
        @keyup.enter="enviar"
        required
      />
    </div>

    <div class="form-row">
      <label for="autor">Autor</label>
      <input
        id="autor"
        v-model.trim="borrador.autor"
        type="text"
        placeholder="Ej: Julio Cortázar"
        @keyup.enter="enviar"
        required
      />
    </div>

    <div class="form-row">
      <label for="categoria">Categoría</label>
      <select id="categoria" v-model="borrador.categoria" required>
        <option value="" disabled>Elegí una categoría</option>
        <option v-for="cat in opcionesCategoria" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>

    <div class="form-row">
      <label for="notas">Notas (opcional)</label>
      <textarea
        id="notas"
        v-model="borrador.notas"
        rows="3"
        placeholder="Edición, estado, comentarios..."
      ></textarea>
    </div>

    <div class="form-preview" v-if="hayContenido">
      <p class="form-preview-label">Vista previa en tiempo real</p>
      <p class="form-preview-line">
        <strong>{{ borrador.titulo || '(sin título)' }}</strong>
        <span v-if="borrador.autor"> — {{ borrador.autor }}</span>
        <span v-if="borrador.categoria" class="form-preview-tag">{{ borrador.categoria }}</span>
      </p>
    </div>

    <div class="form-actions">
      <button type="submit" class="btn btn--gold">Añadir libro</button>
      <button
        type="button"
        class="btn btn--ghost"
        @click.once="mostrarTip = false"
        v-if="mostrarTip"
      >
        Tip: también podés presionar Enter para agregar
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'BookForm',
  emits: ['agregar'],
  data() {
    return {
      borrador: {
        titulo: '',
        autor: '',
        categoria: '',
        notas: ''
      },
      opcionesCategoria: ['Novela', 'Ensayo', 'Fantasía', 'Poesía', 'Ciencia', 'Biografía'],
      mostrarTip: true
    }
  },
  computed: {
    hayContenido() {
      return this.borrador.titulo || this.borrador.autor || this.borrador.categoria
    }
  },
  methods: {
    enviar() {
      if (!this.borrador.titulo || !this.borrador.autor || !this.borrador.categoria) return
      this.$emit('agregar', { ...this.borrador })
      this.borrador = { titulo: '', autor: '', categoria: '', notas: '' }
    }
  }
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-row label {
  font-size: 0.82rem;
  color: var(--paper-dim);
}

.form-row input,
.form-row select,
.form-row textarea {
  background: var(--panel-2);
  border: 1px solid var(--rule);
  color: var(--paper);
  padding: 0.6rem 0.7rem;
  font-family: var(--font-body);
  font-size: 0.95rem;
}

.form-row input:focus,
.form-row select:focus,
.form-row textarea:focus {
  border-color: var(--gold);
}

.form-row textarea {
  resize: vertical;
}

.form-preview {
  border-left: 2px solid var(--gold);
  padding: 0.6rem 0.9rem;
  background: var(--panel-2);
}

.form-preview-label {
  margin: 0 0 0.3rem;
  font-size: 0.72rem;
  color: var(--gold);
}

.form-preview-line {
  margin: 0;
  font-size: 0.92rem;
}

.form-preview-tag {
  margin-left: 0.5rem;
  font-size: 0.75rem;
  color: var(--teal);
  border: 1px solid var(--teal);
  padding: 0.1rem 0.45rem;
}

.form-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  cursor: pointer;
  font-family: var(--font-body);
}

.btn--ghost {
  background: none;
  border: none;
  color: var(--paper-dim);
  font-size: 0.78rem;
  text-decoration: underline;
  text-underline-offset: 3px;
  padding: 0;
}
</style>
