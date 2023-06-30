<template>
    <navbar-menu />
    <main class="px-3 mt-3">
      <router-view/>
    </main>
  </template>
  
<script setup>
import NavbarMenu from "../components/NavbarMenu.vue"
import {RouterView} from 'vue-router';
</script>