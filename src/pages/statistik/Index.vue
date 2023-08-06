<template>
  <Suspense>
    <!-- component with nested async dependencies  -->
    <statistik-page />
    <!-- loading state via #fallback slot -->
    <template #fallback>
      <app-loading />
    </template>
  </Suspense>
</template>
<script setup>
import { defineAsyncComponent } from "vue";

const StatistikPage = defineAsyncComponent(() => import("./StatistikPage.vue"));
</script>
