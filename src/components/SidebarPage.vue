<template>
  <aside class="sidebar">
    <ul>
      <li id="s-logo">
        <router-link to="/">
          <font-awesome-icon :icon="['fas', 'cat']" />
          &nbsp; POS - แมวขาว
        </router-link>
      </li>
      <hr>
      <li id="s-item">
        <router-link to="/reports">
          <font-awesome-icon :icon="['fas', 'chart-line']" />
          &nbsp; Reports
        </router-link>
      </li>
      <li id="s-item">
        <router-link to="/pos">
          <font-awesome-icon :icon="['fas', 'cash-register']" />
          &nbsp; POS
        </router-link>
      </li>
      <li id="s-item">
        <router-link to="/settings">
          <font-awesome-icon :icon="['fas', 'cog']" />
          &nbsp; Settings
        </router-link>
      </li>
      <li id="s-item">
        <router-link to="/logout">
          <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
          &nbsp; Logout
        </router-link>
      </li>
    </ul>

    <div class="footer">
      <p>© {{ new Date().getFullYear() }} POS - แมวขาว</p>
    </div>
  </aside>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCat, faCashRegister, faChartLine, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faCat, faCashRegister, faChartLine, faCog, faSignOutAlt)

export default {
  components: {
    FontAwesomeIcon,
  },
}
</script>
<style scoped>
.sidebar {
  background-color: #1f2937;
  color: #fff;
  padding: 1rem;
  height: 100%;
  width: 100%;
  max-width: 350px;
}

#s-logo {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  cursor: pointer;
}

#s-item {
  font-size: 18px;
  color: #fff;
}

#s-item:hover {
  background-color: #89f5ea;
  color: #000;
  cursor: pointer;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin: 1rem 0;
}

.sidebar a {
  color: inherit;
  text-decoration: none;
}

.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 1rem;
  background-color: #1f2937;
  color: #fff;
  text-align: center;
}

@media (max-width: 1280px) {
  .sidebar {
    width: 300px;
    max-width: 100%;
    position: relative;
    top: auto;
    left: auto;
  }
}
</style>
