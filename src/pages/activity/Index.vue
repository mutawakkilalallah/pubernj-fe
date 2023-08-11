<template>
  <Suspense>
    <!-- component with nested async dependencies  -->
    <activity-page />
    <!-- loading state via #fallback slot -->
    <template #fallback>
      <app-loading />
    </template>
  </Suspense>
</template>
<script setup>
import { defineAsyncComponent } from "vue";

const ActivityPage = defineAsyncComponent(() =>
  import("./ActivityPage.vue" /* webpackChunkName: "BeritaPage" */)
);
</script>
