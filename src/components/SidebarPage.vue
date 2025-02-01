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
      <TransitionGroup name="menu-fade">
        <div v-for="item in filteredMenuItems" :key="item.text" class="nav-item-wrapper">
          <router-link :to="item.link" class="nav-item" :class="{ 'active': $route.path === item.link }"
            @click="item.action && item.action()">
            <font-awesome-icon :icon="item.icon" class="nav-icon" />
            <span class="nav-text">{{ item.text }}</span>
          </router-link>
        </div>
      </TransitionGroup>
    </nav>

    <footer class="sidebar-footer">
      <p>© {{ new Date().getFullYear() }} POS System</p>
      <p>บริษัท แมวขาว อินเตอร์เทค จำกัด (มหาชน)</p>
    </footer>
  </aside>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCat, faCashRegister, faChartLine, faCog, faUser, faSignOutAlt, faSignInAlt, faFileInvoice, faBars } from '@fortawesome/free-solid-svg-icons'
library.add(faCat, faCashRegister, faChartLine, faCog, faUser, faSignOutAlt, faSignInAlt, faFileInvoice, faBars)

const isLoggedIn = ref(false)
const isCollapsed = ref(false)
const menuItems = [
  {
    text: 'รายงาน',
    link: '/reports',
    icon: ['fas', 'chart-line'],
  },
  {
    text: 'POS',
    link: '/pos',
    icon: ['fas', 'cash-register'],
  },
  {
    text: 'ใบเสร็จ',
    link: '/eceipt',
    icon: ['fas', 'file-invoice'],
  },
  {
    text: 'โปรไฟล์',
    link: '/profile',
    icon: ['fas', 'user'],
  },
  {
    text: 'ตั้งค่า',
    link: '/settings',
    icon: ['fas', 'cog'],
  },
]

const filteredMenuItems = computed(() => {
  if (isCollapsed.value) {
    return menuItems.map(item => ({
      ...item,
      text: ''
    }))
  }
  return menuItems
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
  transition: all 0.50s cubic-bezier(0.5, 0, 0.5, 1);
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar-collapsed {
  width: 85px;
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
  color: #89f5ea;
}

.sidebar-collapsed .logo-text {
  display: none;
}

.collapse-btn {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 0.5rem;
  font-size: 1.25rem;
  transition: color 0.2s ease;
}

.divider {
  height: 1px;
  background-color: #374151;
  margin: 0.5rem 1rem;
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
  padding: 0.75rem 1rem;
  color: #fff;
  text-decoration: none;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  gap: 1rem;
}

.nav-icon {
  font-size: 1.25rem;
  min-width: 1.25rem;
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
  padding: 1rem;
  background-color: #2d3748;
  font-size: 0.875rem;
  color: #9ca3af;
  text-align: center;
}

.sidebar-collapsed .sidebar-footer {
  display: none;
}

/* Transitions */
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: all 0.3s ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    z-index: 50;
  }

  .sidebar-collapsed {
    transform: translateX(-100%);
  }
}
</style>