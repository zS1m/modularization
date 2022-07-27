import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'module-preview',
    component: () => import('@/views/module-preview')
  }
];

const router = new VueRouter({
  routes
});

export default router;
