<template>
  <Suspense>
    <!-- component with nested async dependencies  -->
    <keuangan-page />
    <!-- loading state via #fallback slot -->
    <template #fallback>
      <app-loading />
    </template>
  </Suspense>
</template>
<script setup>
import { defineAsyncComponent } from "vue";

const KeuanganPage = defineAsyncComponent(() =>
  import("./KeuanganPage.vue" /* webpackChunkName: "BeritaPage" */)
);
</script>
