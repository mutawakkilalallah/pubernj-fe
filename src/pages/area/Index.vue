<template>
  <h1>{{ store.form.nama }} {{ tiga }}</h1>
  <form @submit.prevent="ubahData">
    <input type="text" v-model="tiga" />
    <br />
    <input type="text" v-model="store.form.alamat" />
    <button type="submit">test</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useCobaStore } from "../../store/coba/satu";
const tiga = ref("tiga");

const store = useCobaStore();
function ubahData() {
  tiga.value = "Empat";
}
</script>
