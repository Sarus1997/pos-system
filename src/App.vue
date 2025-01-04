<template>
  <div class="app-container">
    <Sidebar />
    <div class="main-content">
      <AppHeader />
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from './components/SidebarPage.vue';
import AppHeader from './components/HeaderPage.vue';

export default {
  components: { Sidebar, AppHeader }
};
</script>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
</style>
