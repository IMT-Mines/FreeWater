<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const errorMessage = ref('');
const username = ref('');
const password = ref('');
const repeatPassword = ref('');
const router = useRouter();

const signup = async () => {
  if (password.value !== repeatPassword.value) {
    errorMessage.value = 'Passwords do not match';
    return;
  }
  try {
    await axios.post('http://localhost:10000/register', {
      username: username.value,
      password: password.value,
    });
    router.push('/login');
  } catch (error) {
    errorMessage.value = 'Signup failed, please try again';
  }
};
</script>

<template>
  <div class="signup-box">
    <h2>Sign Up</h2>
    <form @submit.prevent="signup" class="signup-form">
      <input type="text" v-model="username" placeholder="Username" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <input type="password" v-model="repeatPassword" placeholder="Repeat Password" required />
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
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

.error {
  color: red;
  font-size: 14px;
  margin: 0
}
</style>
