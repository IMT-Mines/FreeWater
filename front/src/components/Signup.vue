<template>
  <div class="signup-box">
    <h2>Sign Up</h2>
    <form @submit.prevent="signup" class="signup-form">
      <input type="text" v-model="username" placeholder="username" required />
      <input type="password" v-model="password" placeholder="password" required />
      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async signup() {
      // TODO Implement logic
      // const response = await axios.post('http://localhost:10002/signup', { username: this.username, password: this.password });
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>

.signup-box {
  width: 20%;
  margin: auto;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

</style>
