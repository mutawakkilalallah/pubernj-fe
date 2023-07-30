<template>
  <Suspense>
    <!-- component with nested async dependencies  -->
    <armada-page />
    <!-- loading state via #fallback slot -->
    <template #fallback>
      <app-loading />
    </template>
  </Suspense>
</template>
<script setup>
import { defineAsyncComponent } from "vue";

const ArmadaPage = defineAsyncComponent(() =>
  import("./ArmadaPage.vue" /* webpackChunkName: "BeritaPage" */)
);
</script>
