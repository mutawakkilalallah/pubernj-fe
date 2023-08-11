<template>
  <Suspense>
    <!-- component with nested async dependencies  -->
    <error-page />
    <!-- loading state via #fallback slot -->
    <template #fallback>
      <app-loading />
    </template>
  </Suspense>
</template>
<script setup>
import { defineAsyncComponent } from "vue";

const ErrorPage = defineAsyncComponent(() =>
  import("./ErrorPage.vue" /* webpackChunkName: "BeritaPage" */)
);
</script>
