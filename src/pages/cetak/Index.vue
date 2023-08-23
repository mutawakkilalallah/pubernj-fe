<template>
  <Suspense>
    <!-- component with nested async dependencies  -->
    <cetak-page />
    <!-- loading state via #fallback slot -->
    <template #fallback>
      <app-loading />
    </template>
  </Suspense>
</template>
<script setup>
import { defineAsyncComponent } from "vue";

const CetakPage = defineAsyncComponent(() =>
  import("./CetakPage.vue" /* webpackChunkName: "BeritaPage" */)
);
</script>
