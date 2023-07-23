<template>
  <Suspense>
    <!-- component with nested async dependencies  -->
    <area-page />
    <!-- loading state via #fallback slot -->
    <template #fallback>
      <app-loading />
    </template>
  </Suspense>
</template>
<script setup>
import { defineAsyncComponent } from "vue";

const AreaPage = defineAsyncComponent(() =>
  import("./AreaPage.vue" /* webpackChunkName: "BeritaPage" */)
);
</script>
