<script setup>
import axios from 'axios';
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {useStore} from "vuex";

const username = ref('');
const password = ref('');
const router = useRouter();
const store = useStore();

const login = async () => {
  try {
    await axios.post('http://localhost:10000/login', {
      username: username.value,
      password: password.value,
    });
    await store.dispatch('checkAuth');
    router.push('/');
  } catch (error) {
    console.error('Login failed:', error);
  }
};
</script>

<template>
  <div class="signin-box">
    <h2 class="title">Sign In</h2>
    <form @submit.prevent="login" class="signin-form">
      <input type="text" v-model="username" placeholder="Username" required/>
      <input type="password" v-model="password" placeholder="Password" required/>
      <button type="submit">Sign In</button>
    </form>
  </div>
</template>

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
