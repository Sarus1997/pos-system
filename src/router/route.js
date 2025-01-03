import { createRouter, createWebHistory } from 'vue-router';
import PosPage from '../pages/PosPage.vue'; // ตรวจสอบ path ของ PosPage.vue

const routes = [
  { path: '/', component: PosPage },
  // { path: '/reports', component: () => import('./pages/ReportsPage.vue') },
  // { path: '/settings', component: () => import('./pages/SettingsPage.vue') },
  // { path: '/logout', component: () => import('./pages/LogoutPage.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
