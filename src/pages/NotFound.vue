<template>
  <div class="text-center pt-5 mt-5">
    <h1 class="display-1 text-danger"><b>403</b></h1>
    <h3 class="text-capitalize pb-4">akses ditolak</h3>
    <button
      type="button"
      class="btn btn-sm btn-outline-secondary"
      @click="back"
    >Beranda</button>
  </div>
</template>
<script setup>
import router from "../router";

function back() {
  router.push("/");
}
</script>