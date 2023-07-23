<template>
  <Suspense>
    <!-- component with nested async dependencies  -->
    <santri-page />
    <!-- loading state via #fallback slot -->
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>
<script setup>
import SantriPage from "./SantriPage.vue";
</script>