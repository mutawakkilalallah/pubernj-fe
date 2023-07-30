<template>
  <Suspense>
    <!-- component with nested async dependencies  -->
    <dropspot-page />
    <!-- loading state via #fallback slot -->
    <template #fallback>
      <app-loading />
    </template>
  </Suspense>
</template>
<script setup>
import { defineAsyncComponent } from "vue";

const DropspotPage = defineAsyncComponent(() =>
  import("./DropspotPage.vue" /* webpackChunkName: "BeritaPage" */)
);
</script>
