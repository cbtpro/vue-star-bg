<script setup lang="ts">
import { ref } from 'vue';
import Star from './components/star/index.vue';

const imageUrl = ref('./vite.svg')

setTimeout(() => {
  imageUrl.value = 'https://blog.chenbitao.com/vue3-in-action/assets/T5.03361c86.jpg';
  console.log(imageUrl.value);
}, 2000)
</script>

<template>
  <div class="container">
    <star :imageUrl="imageUrl" />
    <!-- <star imageUrl="./vite.svg" /> -->
  </div>
</template>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
}
</style>
