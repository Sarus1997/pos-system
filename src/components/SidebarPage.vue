<template>
  <aside :class="['sidebar', { 'sidebar-collapsed': isCollapsed }]">
    <div class="sidebar-header">
      <router-link to="/" class="logo-link">
        <font-awesome-icon :icon="['fas', 'cat']" class="logo-icon" />
        <span class="logo-text">POS</span>
      </router-link>
      <button @click="toggleSidebar" class="collapse-btn">
        <font-awesome-icon :icon="['fas', 'bars']" />
      </button>
    </div>

    <div class="divider"></div>

    <nav class="sidebar-nav">
      <TransitionGroup name="menu-slide">
        <div v-for="item in filteredMenuItems" :key="item.text" class="nav-item-wrapper">
          <router-link :to="item.link" class="nav-item" :class="{ 'active': $route.path === item.link }"
            @click="item.action && item.action()" v-tooltip="isCollapsed ? item.text : null">
            <font-awesome-icon :icon="item.icon" class="nav-icon" />
            <span class="nav-text">{{ item.text }}</span>
          </router-link>
        </div>
      </TransitionGroup>

      <div class="language-selector" v-show="!isCollapsed">
        <select v-model="$i18n.locale" @change="changeLanguage" class="language-select">
          <option value="en">🇺🇸 English</option>
          <option value="th">🇹🇭 ไทย</option>
        </select>
      </div>
    </nav>

    <footer class="sidebar-footer">
      <p>© {{ new Date().getFullYear() }} POS System</p>
      <p>{{ $t('footer_company') }}</p>
    </footer>
  </aside>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCat, faCashRegister, faChartLine, faCog, faUser, faSignOutAlt, faSignInAlt, faFileInvoice, faBars } from '@fortawesome/free-solid-svg-icons'

library.add(faCat, faCashRegister, faChartLine, faCog, faUser, faSignOutAlt, faSignInAlt, faFileInvoice, faBars)

const { t } = useI18n() // ✅ ใช้ useI18n เพื่อเข้าถึง `t`  = translate

const isLoggedIn = ref(false)
const isCollapsed = ref(false)

const menuItems = computed(() => [
  {
    text: t('report'),
    link: '/reports',
    icon: ['fas', 'chart-line'],
  },
  {
    text: t('menu_pos'),
    link: '/pos',
    icon: ['fas', 'cash-register'],
  },
  {
    text: t('receipt'),
    link: '/receipt',
    icon: ['fas', 'file-invoice'],
  },
  {
    text: t('profile'),
    link: '/profile',
    icon: ['fas', 'user'],
  },
  {
    text: t('settings'),
    link: '/settings',
    icon: ['fas', 'cog'],
  },
])

const filteredMenuItems = computed(() => {
  if (isCollapsed.value) {
    return menuItems.value.map(item => ({
      ...item,
      text: ''
    }))
  }
  return menuItems.value
})

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

onMounted(() => {
  const user = localStorage.getItem('user')
  isLoggedIn.value = !!user
})

import { defineExpose } from 'vue'

defineExpose({
  isLoggedIn,
  isCollapsed,
  menuItems,
  filteredMenuItems,
  toggleSidebar
})
</script>




<style scoped>
.sidebar {
  position: relative;
  background-color: #1f2937;
  height: 100vh;
  width: 280px;
  transition: all 0.35s cubic-bezier(0.5, 0, 0.5, 1);
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
  border-right: 1px solid #37415135;
}

.sidebar-collapsed {
  width: 90px;
}

.sidebar-header {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: #fff;
  font-weight: 600;
  font-size: 1.25rem;
}

.logo-icon {
  font-size: 1.5rem;
  color: #7dd3fc;
  transition: transform 0.3s ease;
}

.logo-link:hover .logo-icon {
  transform: rotate(-15deg);
}

.sidebar-collapsed .logo-text {
  display: none;
}

.collapse-btn {
  background-color: #1f2937;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 0.6rem;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  transition: all 0.2s ease;
  backdrop-filter: blur(4px);
}

.collapse-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: scale(1.05);
}

.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, #334155 50%, transparent 100%);
  margin: 1rem 1.5rem;
}

.sidebar-nav {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.nav-item-wrapper {
  margin: 0.5rem 0;
  background-color: #8ea1ff45;
  border-radius: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.9rem 1.2rem;
  color: #170c28;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  border-radius: 0.75rem;
  transition: all 0.25s ease;
  gap: 1.25rem;
  position: relative;
  overflow: hidden;
}

.nav-item::before {
  content: '';
  position: absolute;
  left: -100%;
  width: 4px;
  height: 100%;
  background: #fcc97d;
  transition: left 0.3s ease;
}

.nav-item:hover {
  background: rgba(119, 244, 255, 0.404);
  color: #e2e8f0;
  transform: translateX(4px);
}

.nav-item:hover .nav-icon {
  color: #7dd3fc;
}

.nav-item.active {
  background: rgba(234, 183, 183, 0.453);
  color: #7dd3fc;
}

.nav-item.active::before {
  left: 0;
}

/* Icons */
.nav-item.active .nav-icon {
  color: #b05144;
}

.nav-icon {
  font-size: 1.3rem;
  min-width: 1.5rem;
  transition: color 0.2s ease;
}

.nav-item:hover {
  background-color: #374151;
  color: #89f5ea;
}

.nav-item.active {
  background-color: #89f5ea;
  color: #1f2937;
}

.sidebar-footer {
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  font-size: 0.8rem;
  color: #64748b;
  text-align: center;
  line-height: 1.4;
  backdrop-filter: blur(4px);
}

.sidebar-collapsed .sidebar-footer {
  display: none;
}

/* Transitions */
.language-selector {
  margin-top: 2rem;
  padding: 0 1rem;
}

.language-select {
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #334155;
  color: #fff;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.language-select:hover {
  border-color: #475569;
}

.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-slide-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.menu-slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>