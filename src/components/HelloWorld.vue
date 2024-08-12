<script setup lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { apiService } from './../services/apiService';
import { CarCostCalculationRequest } from './../commons/requests';

 
let request : CarCostCalculationRequest = {
  carCost : 1100,
  type: 0
}

let response = await apiService.RetrieveTotalCost(request);

console.log(response);

defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      Haciendo puebas de vue.js ps
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
