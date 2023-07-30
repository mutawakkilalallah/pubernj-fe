<template>
  <Suspense>
    <!-- component with nested async dependencies  -->
    <drag-page />
    <!-- loading state via #fallback slot -->
    <template #fallback>
      <app-loading />
    </template>
  </Suspense>
</template>
<script setup>
import { defineAsyncComponent } from "vue";

const DragPage = defineAsyncComponent(() =>
  import("./DragPage.vue" /* webpackChunkName: "BeritaPage" */)
);
</script>
