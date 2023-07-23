<template>
  <Suspense>
    <!-- component with nested async dependencies  -->
    <sync-page />
    <!-- loading state via #fallback slot -->
    <template #fallback>
      <app-loading />
    </template>
  </Suspense>
</template>
<script setup>
import { defineAsyncComponent } from "vue";

const SyncPage = defineAsyncComponent(() =>
  import("./SyncPage.vue" /* webpackChunkName: "BeritaPage" */)
);
</script>
