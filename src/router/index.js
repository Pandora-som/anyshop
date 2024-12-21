import { createRouter, createWebHistory } from 'vue-router'
import Catalog from '../views/CatalogPage.vue';
import Details from '../views/GoodCard.vue';
import Basket from '../views/BasketPage.vue';
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
  {
    path:      '/basket',
    name:      'basket',
    component: Basket,
},
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
