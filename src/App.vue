<template>
  <div class="app-container">
    <Sidebar />
    <div class="main-content">
      <Header />
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from './components/SidebarPage.vue';
import Header from './components/HeaderPage.vue';

export default {
  components: { Sidebar, Header },
};
</script>

<style>
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
