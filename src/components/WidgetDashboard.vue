<template>
  <div class="col-md-3">
    <div
      class="box-widget rounded text-white text-center p-4 mb-4"
      :style="{ backgroundColor: warna }"
    >
      <h1>{{ total }}</h1>
      <hr />
      <p>{{ nama }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  warna: {
    type: String,
    default: "primary",
  },
  total: {
    type: Object,
    default: [],
  },
  nama: {
    type: String,
    default: "nama",
  },
});
// export default {
//   props: ["warna", "total", "nama"],
// };
</script>
