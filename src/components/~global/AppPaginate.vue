<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-start">
      <li
        class="page-item"
        style="cursor: pointer"
      >
        <a
          class="page-link"
          :class="{ disabled: meta.x_current_page <= 1 }"
          @click="emits('first', 1)"
        >First</a>
      </li>
      <li
        class="page-item"
        style="cursor: pointer"
      >
        <a
          class="page-link"
          :class="{ disabled: meta.x_current_page <= 1 }"
          @click="emits('prev', meta.x_current_page)"
        >Previous</a>
      </li>
      <template
        v-for="n in limit"
        :key="n"
      >
        <li
          v-if="bilangan(n) <= meta.x_total_page"
          style="cursor: pointer"
          class="page-item"
          :class="meta.x_current_page == bilangan(n) ? 'active' : ''"
        >
          <a
            class="page-link"
            aria-current="page"
            @click="emits('setPage', bilangan(n))"
          >{{ bilangan(n) }}</a>
        </li>
      </template>

      <li
        class="page-item"
        style="cursor: pointer"
      >
        <a
          :class="{ disabled: meta.x_current_page == meta.x_total_page }"
          class="page-link"
          @click="emits('next', meta.x_current_page)"
        >Next</a>
      </li>

      <li
        class="page-item"
        style="cursor: pointer"
      >
        <a
          class="page-link"
          :class="{ disabled: meta.x_current_page == meta.x_total_page }"
          @click="emits('last', meta.x_total_page)"
        >Last</a>
      </li>
    </ul>
    <!-- {{ meta.x_current_page }} {{ kelipatan }} -->
  </nav>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  meta: { type: Object, default: null },
  limit: { type: Number, default: 5 },
  per_page: { type: Number, default: 10 },
});

const emits = defineEmits(["setPage", "next", "prev", "last", "first"]);

const middle = computed(() => props.limit / 2);

const kelipatan = computed(() => {
  const angka = [];
  for (let i = 1; i <= props.meta.x_total_page; i++) {
    if (i % props.limit === 0) {
      angka.push(i);
    }
  }
  return angka;
});

function bilangan(n) {
  // dengan midle
  return parseInt(props.meta.x_current_page) >= props.limit - middle.value
    ? parseInt(props.meta.x_current_page) + n - Math.ceil(middle.value)
    : n;
  // limit biasa
  //   return parseInt(props.meta.x_current_page) > props.limit
  //     ? parseInt(props.meta.x_current_page) + n - 1
  //     : n;
}
</script>

<style scoped>
nav ul li a {
  font-size: 12px;
}
</style>
