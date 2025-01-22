import { createRouter, createWebHistory } from 'vue-router';
import PosPage from '../pages/PosPage.vue';
import EceiptPage from '../pages/EceiptPage.vue';
import LogoutPage from '../pages/LogoutPage.vue';
import LoginPage from '../pages/LoginPage.vue';
import ReportsPage from '../pages/ReportsPage.vue';
import SettingsPage from '../pages/SettingsPage.vue';

const routes = [
  { path: '/', component: PosPage },
  { path: '/pos', component: PosPage },
  { path: "/eceipt", component: EceiptPage },
  { path: "/reports", component: ReportsPage },
  { path: "/settings", component: SettingsPage },
  { path: "/logout", component: LogoutPage },
  { path: "/login", component: LoginPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
