<template>
  <div class="app-container">
    <Sidebar />
    <div class="main-content">
      <AppHeader />
      <div class="content-wrapper">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/SidebarPage.vue';
import AppHeader from './components/HeaderPage.vue';
</script>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
}

.sidebar-wrapper {
  width: 280px;
  background-color: #1f2937;
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 24px;
}

.content-wrapper {
  flex-grow: 1;
  overflow-y: auto;
  padding: 24px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
</style>
