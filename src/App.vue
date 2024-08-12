<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import BidCalculation from './components/BidCalculation.vue';
</script>

<template>
  <Suspense>
    <BidCalculation/>
  </Suspense>

</template>

<style scoped>


@media (min-width: 1024px) {
}
</style>
