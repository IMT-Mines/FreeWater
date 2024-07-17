<script setup>
import Header from '@/components/Header.vue';
</script>

<template>
  <div id="app">
    <Header />
    <router-view></router-view>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

input[type=text] {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid gray
}

input[type=password] {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid gray
}

input {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid gray
}

button {
  background-color: #18838c;
  color: white;
  border-radius: 10px;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
}
</style>