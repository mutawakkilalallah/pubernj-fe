<template>
  <Suspense>
    <!-- component with nested async dependencies  -->
    <penumpang-page />
    <!-- loading state via #fallback slot -->
    <template #fallback>
      <app-loading />
    </template>
  </Suspense>
</template>
<script setup>
import { defineAsyncComponent } from "vue";

const PenumpangPage = defineAsyncComponent(() => import("./PenumpangPage.vue"));
</script>
