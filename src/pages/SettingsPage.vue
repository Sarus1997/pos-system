<template>
  <div class="settings-page">
    <h1>Settings</h1>
    <div class="theme-picker">
      <label for="theme">Theme:</label>
      <select id="theme" v-model="theme" @change="updateTheme">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const theme = ref('light');
const updateTheme = () => {
  document.body.classList.toggle('dark-theme', theme.value === 'dark');
};


watch(theme, () => {
  updateTheme();
});
</script>

<style>
:root {
  --theme-light: #ffffff;
  --theme-dark: #1a202c;
}

body {
  background-color: var(--theme-light);
  transition: background-color 0.3s;
}

body.dark-theme {
  background-color: var(--theme-dark);
}

.settings-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f7fafc;
}

.theme-picker {
  margin-top: 2rem;
}

.theme-picker label {
  margin-right: 1rem;
}
</style>
