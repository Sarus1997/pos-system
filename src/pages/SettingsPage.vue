<template>
  <div class="settings-page">
    <h1>{{ $t('settings') }}</h1>
    <div class="setting-item theme-picker">
      <label for="theme">{{ $t('theme') }}:</label>
      <select id="theme" v-model="theme" @change="updateTheme">
        <option value="light">{{ $t('theme_light') }}</option>
        <option value="dark">{{ $t('theme_dark') }}</option>
      </select>
    </div>

  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const theme = ref('light');
const emailNotifications = ref(true);
const pushNotifications = ref(true);

const updateTheme = () => {
  document.body.classList.toggle('dark-theme', theme.value === 'dark');
};

watch(theme, updateTheme);
watch([emailNotifications, pushNotifications], () => {
  console.log('Notification settings updated');
});
</script>


<style>
:root {
  --theme-light: #ffffff;
  --theme-dark: #1a202c;
  --primary-color: #4a90e2;
  --secondary-color: #f7fafc;
  --text-color-light: #333333;
  --text-color-dark: #f7fafc;
}

body {
  background-color: var(--theme-light);
  color: var(--text-color-light);
  transition: background-color 0.3s, color 0.3s;
}

body.dark-theme {
  background-color: var(--theme-dark);
  color: var(--text-color-dark);
}

.settings-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: var(--secondary-color);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 2rem auto;
}

.settings-page h1 {
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

.setting-item {
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
}

.setting-item label {
  margin-right: 1rem;
  font-weight: bold;
}

.setting-item select,
.setting-item input[type="checkbox"] {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.setting-item select:focus,
.setting-item input[type="checkbox"]:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 5px var(--primary-color);
}

.notification-settings {
  display: flex;
  align-items: center;
}

.notification-settings input[type="checkbox"] {
  margin-right: 0.5rem;
}
</style>
