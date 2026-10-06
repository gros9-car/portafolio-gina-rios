import { createRouter, createWebHistory } from 'vue-router'
import InicioView from '../views/InicioView.vue'
import ListaLibros from '../views/ListaLibros.vue'
import DetalleLibro from '../views/DetalleLibro.vue'

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: InicioView
  },
  {
    path: '/libros',
    name: 'libros',
    component: ListaLibros
  },
  {
    path: '/libros/:id',
    name: 'detalle-libro',
    component: DetalleLibro,
    props: true // el :id llega como prop, no hay que leer $route dentro del componente
  },
  {
    // Cualquier ruta desconocida vuelve al inicio
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
