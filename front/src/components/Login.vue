<template>
  <div class="signin-box">
    <h2 class="title">Sign In</h2>
    <form @submit.prevent="login" class="signin-form">
      <input type="text" v-model="username" placeholder="username" required/>
      <input type="password" v-model="password" placeholder="password" required/>
      <button type="submit">Sign In</button>
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
    async login() {
      // TODO Implement logic
      // const response = await axios.post('http://localhost:10002/login', { username: this.username, password: this.password });
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>

.signin-box {
  width: 20%;
  margin: auto;
}

.signin-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

</style>
