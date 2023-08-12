<template>
  <Suspense>
    <!-- component with nested async dependencies  -->
    <pendamping-page />
    <!-- loading state via #fallback slot -->
    <template #fallback>
      <app-loading />
    </template>
  </Suspense>
</template>
<script setup>
import { defineAsyncComponent } from "vue";

const PendampingPage = defineAsyncComponent(() =>
  import("./PendampingPage.vue" /* webpackChunkName: "PendampingPage" */)
);
</script>
