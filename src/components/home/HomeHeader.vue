<template>
  <div class="toolbar">
    <div class="toolbar-left">
      <img src="../../assets/img/lywlogo.png" alt="Logo" class="logo" />
      <span class="brand-text">Lead Your Way</span>
    </div>
    <div class="toolbar-middle" v-if="isDesktop">
      <p class="menu-options">
        <span>Home</span> | <span>About</span> | <span>Contact</span> |
        <span><router-link to="/search">Search</router-link></span>
      </p>
    </div>
    <div class="toolbar-right">
      <p v-if="!user">
        <a href="/login"><button class="login-button">Login</button></a>
        <a href="/signup"><button class="signup-button">Sign up</button></a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader',
  data() {
    return {
      user: localStorage.getItem('id'),
      isDesktop: true,
    };
  },
  mounted() {
    this.checkWindowSize();
    window.addEventListener('resize', this.checkWindowSize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkWindowSize);
  },
  methods: {
    checkWindowSize() {
      this.isDesktop = window.innerWidth >= 480;
    },
  },
};
</script>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}

.toolbar-left {
  display: flex;
  align-items: center;
}

.logo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.brand-text {
  font-weight: bold;
  font-size: 20px;
}

.toolbar-middle {
  flex-grow: 1;
  text-align: center;
}

.menu-options span {
  margin: 0 5px;
  text-transform: uppercase;
  font-size: 14px;
  cursor: pointer;
}

.menu-options span:hover {
  color: #f97316;
  transition: 0.1s;
}

.toolbar-right {
  text-align: right;
}

.login-button,
.signup-button {
  margin-left: 15px;
  text-transform: uppercase;
  font-weight: 100;
  font-size: 14px;
  cursor: pointer;
  padding: 7px 25px;
  border: 1px solid #f97316;
  border-radius: 2px;
}

.login-button {
  background-color: white;
  border-color: #f97316;
}
.signup-button {
  background-color: #f97316;
  color: white;
}

/* Estilos para dispositivos móviles */
@media (max-width: 768px) {
  .toolbar {
    padding: 10px;
    flex-direction: column;
  }

  .toolbar-left {
    margin-bottom: 10px;
  }

  .toolbar-right {
    margin-top: 10px;
    text-align: center;
  }

  .toolbar-middle {
    display: none;
  }
}
</style>
