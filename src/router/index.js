import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'module-preview',
    component: () => import('@/views/module-preview')
  },
  {
    path: '/play',
    name: 'test-play',
    component: () => import('@/views/test-play')
  }
];

const router = new VueRouter({
  routes
});

export default router;
