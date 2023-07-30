<template>
  <router-link :to="{ name: path }" style="text-decoration: none">
    <div
      class="menu-atas-item text-center p-3 mx-3"
      :class="routePath == props.path ? 'menu-active' : ''"
    >
      <font-awesome-icon :icon="icon" class="icon text-secondary" />
      <p class="text-secondary nama">{{ title }}</p>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  icon: {
    type: String,
    default: "chart-simple",
  },
  title: {
    type: String,
    default: "title",
  },
  path: {
    type: String,
    default: "path",
  },
});

const route = useRoute();
const routePath = computed(() => {
  return route.name;
});
</script>
<style scoped>
.menu-active {
  background-color: #61616137;
}
.icon {
  font-size: 30px;
}
.nama {
  font-size: 12px;
  margin-bottom: 0;
}
</style>
