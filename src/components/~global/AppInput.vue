<template>
  <div class="form-group mb-3">
    <small>{{ label }}</small>
    <input
      :type="type"
      :placeholder="placeholder"
      class="form-control mt-2"
      @change="setChangeData($event)"
    />
  </div>
</template>
<script setup>
const props = defineProps({
  label: { type: String, default: "Label" },
  type: { type: String, default: "text" },
  placeholder: { type: String, default: "Masukkan" },
});

const emits = defineEmits(["setModelInput"]);

function setChangeData(evt) {
  emits("setModelInput", evt.target.value);
}
</script>