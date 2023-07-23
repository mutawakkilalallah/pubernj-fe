<template>
  <navbar-menu />
  <main class="px-3" style="margin-top: 150px">
    <router-view />
  </main>
</template>

<script setup>
import NavbarMenu from "../components/NavbarMenu.vue";
import { RouterView } from "vue-router";
</script>
