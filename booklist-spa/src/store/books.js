import { reactive, computed } from 'vue'

// Estado centralizado y reactivo del catálogo de libros.
// Se expone como un composable para mantener el sistema modular
// y reutilizable entre componentes, tal como pide la consigna.

let nextId = 4

const state = reactive({
  usuario: 'Equipo Frontend',
  libros: [
    {
      id: 1,
      titulo: 'Cien años de soledad',
      autor: 'Gabriel García Márquez',
      categoria: 'Novela',
      notas: 'Edición conmemorativa. Clásico del realismo mágico.'
    },
    {
      id: 2,
      titulo: 'Sapiens',
      autor: 'Yuval Noah Harari',
      categoria: 'Ensayo',
      notas: 'Breve historia de la humanidad.'
    },
    {
      id: 3,
      titulo: 'El nombre del viento',
      autor: 'Patrick Rothfuss',
      categoria: 'Fantasía',
      notas: 'Primer libro de la Crónica del Asesino de Reyes.'
    }
  ]
})

function agregarLibro(libro) {
  state.libros.push({
    id: nextId++,
    titulo: libro.titulo.trim(),
    autor: libro.autor.trim(),
    categoria: libro.categoria,
    notas: libro.notas?.trim() || ''
  })
}

function eliminarLibro(id) {
  const index = state.libros.findIndex((l) => l.id === id)
  if (index !== -1) state.libros.splice(index, 1)
}

function obtenerLibroPorId(id) {
  return state.libros.find((l) => l.id === Number(id))
}

const categorias = computed(() =>
  [...new Set(state.libros.map((l) => l.categoria))].sort()
)

export function useBooksStore() {
  return {
    state,
    categorias,
    agregarLibro,
    eliminarLibro,
    obtenerLibroPorId
  }
}
