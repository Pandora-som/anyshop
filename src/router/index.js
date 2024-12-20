import { createRouter, createWebHistory } from 'vue-router'
import Catalog from '../views/CatalogPage.vue';
import Details from '../views/GoodCard.vue';
const routes = [
  {
      path:      '/',
      name:      'catalog',
      component: Catalog,
  },
  {
    path:      '/details',
    name:      'details',
    component: Details,
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
