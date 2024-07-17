<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();

const signup = async () => {
  try {
    await axios.post('http://localhost:10000/register', {
      username: username.value,
      password: password.value,
    });
    router.push('/login');
  } catch (error) {
    console.error('Signup failed:', error);
  }
};
</script>

<template>
  <div class="signup-box">
    <h2>Sign Up</h2>
    <form @submit.prevent="signup" class="signup-form">
      <input type="text" v-model="username" placeholder="Username" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

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
