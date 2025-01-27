<template>
  <aside class="sidebar">
    <ul>
      <li id="s-logo">
        <router-link to="/">
          <font-awesome-icon :icon="['fas', 'cat']" />
          POS - แมวขาว
        </router-link>
      </li>
      <hr>
      <li id="s-item" class="btn" v-for="item in filteredMenuItems" :key="item.text" type="button">
        <router-link :to="item.link" @click="item.action && item.action()">
          <font-awesome-icon :icon="item.icon" />
          {{ item.text }}
        </router-link>
      </li>
    </ul>

    <div class="footer">
      <p style="font-size: 14px">© {{ new Date().getFullYear() }} POS System</p>
      <p style="font-size: 14px">บริษัท แมวขาว อินเตอร์เทค จำกัด (มหาชน)</p>
    </div>
  </aside>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCat, faCashRegister, faChartLine, faCog, faSignOutAlt, faSignInAlt, faFileInvoice } from '@fortawesome/free-solid-svg-icons'

library.add(faCat, faCashRegister, faChartLine, faCog, faSignOutAlt, faSignInAlt, faFileInvoice)

export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      isLoggedIn: false,
      menuItems: [
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
          text: "ใบเสร็จ",
          link: '/eceipt',
          icon: ['fas', 'file-invoice'],
        },
        {
          text: 'โปรไฟล์',
          link: '/profile',
          icon: ['fas', 'cat'],
        },
        {
          text: 'ตั้งค่า',
          link: '/settings',
          icon: ['fas', 'cog'],
        },
      ],
    }
  },
  computed: {
    filteredMenuItems() {
      if (this.$route.path === '/login') {
        return [];
      }
      return this.isLoggedIn ? this.menuItems : this.menuItems.filter(item => item.text !== 'ออกจากระบบ');
    }
  },
  mounted() {
    const user = localStorage.getItem('user');
    this.isLoggedIn = user ? true : false;
  }
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
  display: flex;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
}

#s-item:hover {
  background-color: #89f5ea;
  color: #000;
}

.btn {
  background-color: #363e46;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
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
  background-color: #363e46;
  color: #fff;
  text-align: center;
  justify-self: center;
  width: 350px;
}

@media (max-width: 1920px) {
  .sidebar {
    width: 300px;
    max-width: 100%;
    background-color: #1f2937;
    color: #fff;
    padding: 1.5rem;
    height: 100%;
    width: 100%;
    max-width: 350px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  #s-logo {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    cursor: pointer;
  }

  #s-item {
    font-size: 18px;
    color: #fff;
    display: flex;
    align-items: center;
    padding: 0.75rem;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
  }

  #s-item:hover {
    background-color: #89f5ea;
    color: #000;
  }

  .sidebar ul {
    list-style: none;
    padding: 0;
  }

  .sidebar li {
    margin: 1.5rem 0;
  }

  .sidebar a {
    color: inherit;
    text-decoration: none;
  }

  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 1.5rem;
    background-color: #363e46;
    color: #fff;
    text-align: center;
    justify-self: center;
    width: 100%;
    max-width: 350px;
  }
}
</style>
