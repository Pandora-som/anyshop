import { createRouter, createWebHistory } from 'vue-router'
import Catalog from '../views/CatalogPage.vue';
const routes = [
  {
      path:      '/',
      name:      'catalog',
      component: Catalog,
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
