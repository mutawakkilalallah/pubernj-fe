<template>
  <div>
    <router-link
      :to="{ name: path }"
      style="text-decoration: none"
    >
      <div
        class="text-center p-3 mx-3"
        :class="routePath === props.path && myTheme.themes === 'light' ? 'menu-active' : routePath === props.path && myTheme.themes === 'dark' ? 'menu-dark':'menu-atas-item '"
      >
        <font-awesome-icon
          :icon="icon"
          :class="routePath === props.path && myTheme.themes === 'light' ? 'text-white' : routePath === props.path && myTheme.themes === 'dark' ? 'text-dark':'text-secondary'"
          class="icon"
        />
        <p
          class="text-secondary nama"
          :class="routePath === props.path ? 'text-white' : 'text-secondary'"
        >{{ title }}</p>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useThemeStore } from "../store/auth/theme";

const myTheme = useThemeStore();
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

onMounted(() => {
  myTheme;
});
</script>
<style lang="scss" scoped>
.menu-active {
  background-color: #02582c;
  border-bottom: 5px solid #9b9999;
  border-radius: 0 0 10px 10px;

  // background-color: #61616137;
  // border-bottom: 5px solid #02582c;
}
.menu-dark {
  background-color: #7b7b7b;
  border-bottom: 5px solid #353434;
  border-radius: 0 0 10px 10px;
}
.icon {
  font-size: 30px;
}
.nama {
  font-size: 12px;
  margin-bottom: 0;
}
</style>
