import { createRouter, createWebHistory } from 'vue-router';
import PosPage from '../pages/PosPage.vue';
import LogoutPage from '../pages/LogoutPage.vue';
import ReportsPage from '../pages/ReportsPage.vue';
import SettingsPage from '../pages/SettingsPage.vue';

const routes = [
  { path: '/', component: PosPage },
  { path: '/pos', component: PosPage },
  { path: "/reports", component: ReportsPage },
  { path: "/settings", component: SettingsPage },
  { path: "/logout", component: LogoutPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
