<script>
export default {
  computed: {
    isAuthenticated() {
      return false // TODO Implement logic
    },
  },
  methods: {
    logout() {
      this.$router.push('/login');
    },
  },
};
</script>

<template>
  <header>
    <nav>
      <div class="left-side">
        <router-link class="home" to="/">FreeWater</router-link>
      </div>
      <div class="right-side">
        <router-link v-if="!isAuthenticated" to="/login">Sign In</router-link>
        <router-link v-if="!isAuthenticated" class="signup" to="/signup">Sign Up</router-link>
        <button class="logout" v-if="isAuthenticated" @click="logout">Logout</button>
      </div>
    </nav>
  </header>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  background-color: #2c188d;
  padding: 1em 4em;
}

nav .left-side {
  display: flex;
}

nav .left-side .home {
  font-size: 22px;
  font-weight: 700;
}

nav .right-side {
  display: flex;
  gap: 20px;
  font-size: 16px;
  align-items: center
}

nav .right-side .signup {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  border: 1px white solid;
  padding: 5px 7px;
}

nav a, nav button {
  color: white;
  text-decoration: none;
}

nav button {
  background: none;
  border: none;
  cursor: pointer;
}

.logout {
  background-color: #da4a43;
  font-size: 16px;
  border-radius: 100px;
  width: 100px;
}
</style>
