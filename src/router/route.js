import { createRouter, createWebHistory } from 'vue-router';
import PosPage from '../pages/PosPage.vue';
import ReceiptPage from '../pages/ReceiptPage.vue';
import LoginPage from '../pages/LoginPage.vue';
import ReportsPage from '../pages/ReportsPage.vue';
import SettingsPage from '../pages/SettingsPage.vue';
import ProfilePage from "../pages/ProfilePage.vue";

const routes = [
  {
    path: '/',
    component: PosPage,
    meta: { requiresAuth: true, roles: ['admin', 'manager', 'staff'] }
  },
  {
    path: '/pos',
    component: PosPage,
    meta: { requiresAuth: true, roles: ['admin', 'manager', 'staff'] }
  },
  {
    path: "/receipt",
    component: ReceiptPage,
    meta: { requiresAuth: true, roles: ['admin', 'manager', 'staff'] }
  },
  {
    path: "/reports",
    component: ReportsPage,
    meta: { requiresAuth: true, roles: ['admin', 'manager', 'staff'] }
  },
  {
    path: "/profile",
    component: ProfilePage,
    meta: { requiresAuth: true, roles: ['admin', 'manager', 'staff'] }
  },
  {
    path: "/settings",
    component: SettingsPage,
    meta: { requiresAuth: true, roles: ['admin', 'manager',] }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { requiresAuth: false }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

function getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

router.beforeEach((to, from, next) => {
  const user = getUser();
  if (to.meta.requiresAuth) {
    if (!user) {
      return next({ path: '/login' });
    }

    if (to.meta.roles && !to.meta.roles.includes(user.role)) {
      alert('คุณไม่มีสิทธิ์เข้าถึงหน้านี้');
      return next(from.fullPath);
    }
  }

  next();
});

export default router;
