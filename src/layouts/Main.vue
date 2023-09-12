<template>
  <navbar-menu />
  <main
    class="px-3"
    :style="isMobile ? 'margin-top:50px' : 'margin-top: 150px;'"
  >
    <router-view />
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import NavbarMenu from "../components/NavbarMenu.vue";
import { RouterView } from "vue-router";

const isMobile = ref("");

onMounted(() => {
  const mobileQuery = window.matchMedia("(max-width: 767px)");

  isMobile.value = mobileQuery.matches;

  mobileQuery.addListener((query) => {
    isMobile.value = query.matches;
  });
});
</script>
