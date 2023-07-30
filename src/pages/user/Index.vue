<template>
  <Suspense>
    <!-- component with nested async dependencies  -->
    <user-page />
    <!-- loading state via #fallback slot -->
    <template #fallback>
      <app-loading />
    </template>
  </Suspense>
</template>
<script setup>
import { defineAsyncComponent } from "vue";

const UserPage = defineAsyncComponent(() =>
  import("./UserPage.vue" /* webpackChunkName: "BeritaPage" */)
);
</script>
