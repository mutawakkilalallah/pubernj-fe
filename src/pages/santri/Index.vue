<template>
  <Suspense>
    <!-- component with nested async dependencies  -->
    <santri-page />
    <!-- loading state via #fallback slot -->
    <template #fallback>
      <app-loading />
    </template>
  </Suspense>
</template>
<script setup>
import { defineAsyncComponent } from "vue";

const SantriPage = defineAsyncComponent(() => import("./SantriPage.vue"));
</script>
