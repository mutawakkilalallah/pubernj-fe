<template>
  <Suspense>
    <!-- component with nested async dependencies  -->
    <profil-page />
    <!-- loading state via #fallback slot -->
    <template #fallback>
      <app-loading />
    </template>
  </Suspense>
</template>
<script setup>
import { defineAsyncComponent } from "vue";

const ProfilPage = defineAsyncComponent(() =>
  import("./ProfilPage.vue" /* webpackChunkName: "BeritaPage" */)
);
</script>
