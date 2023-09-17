<template>
  <div>
    <select
      :class="myClass"
      @change="setChangeData($event)"
    >
      <option
        value=""
        selected
      >{{ label }}</option>
      <option
        v-for="
      a
      in
      props.data"
        :key="a"
        :value="a.id"
      >
        {{ a.nama }}
      </option>
    </select>
  </div>
</template>

<script setup>
const props = defineProps({
  data: { type: Object, default: null },
  label: { type: String, default: "label" },
  myClass: { type: String, default: "form-select form-select-sm" },
  myValue: { type: String, default: "" },
});

const emits = defineEmits(["setChange", "setModel"]);

function setChangeData(evt) {
  emits("setChange", evt.target.value);
  emits("setModel", evt.target.value);
}
</script>