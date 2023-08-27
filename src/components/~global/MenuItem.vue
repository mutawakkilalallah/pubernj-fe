<template>
  <div>
    <router-link :to="{ name: path }" style="text-decoration: none">
      <div
        v-if="isMobile"
        class="text-center p-2 mx-2 menu-atas-item rounded"
        :class="
          routePath === props.path && myTheme.themes === 'light'
            ? 'menu-active'
            : routePath === props.path && myTheme.themes === 'dark'
            ? 'menu-dark'
            : routePath === props.path
            ? 'menu-active'
            : 'menu-atas-item '
        "
      >
        <font-awesome-icon
          :icon="icon"
          :class="
            routePath === props.path && myTheme.themes === 'light'
              ? 'text-white'
              : routePath === props.path && myTheme.themes === 'dark'
              ? 'text-dark'
              : routePath === props.path
              ? 'text-white'
              : 'text-secondary'
          "
          class="iconMobile text-secondary"
        />
        <p
          class="text-secondary namaMobile"
          :class="routePath === props.path ? 'text-white' : 'text-secondary'"
        >
          {{ title }}
        </p>
      </div>
      <div
        v-else
        class="text-center p-3 mx-3 menu-atas-item"
        :class="
          routePath === props.path && myTheme.themes === 'light'
            ? 'menu-active'
            : routePath === props.path && myTheme.themes === 'dark'
            ? 'menu-dark'
            : routePath === props.path
            ? 'menu-active'
            : 'menu-atas-item '
        "
      >
        <font-awesome-icon
          :icon="icon"
          :class="
            routePath === props.path && myTheme.themes === 'light'
              ? 'text-white'
              : routePath === props.path && myTheme.themes === 'dark'
              ? 'text-dark'
              : routePath === props.path
              ? 'text-white'
              : 'text-secondary'
          "
          class="icon text-secondary"
        />
        <p
          class="text-secondary nama"
          :class="routePath === props.path ? 'text-white' : 'text-secondary'"
        >
          {{ title }}
        </p>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useThemeStore } from "../../store/auth/theme";

const isMobile = ref("");
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

  const mobileQuery = window.matchMedia("(max-width: 767px)");

  isMobile.value = mobileQuery.matches;

  mobileQuery.addListener((query) => {
    isMobile.value = query.matches;
  });
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
  font-size: 18px;
}
.nama {
  font-size: 12px;
  margin-bottom: 0;
}
.iconMobile {
  font-size: 20px;
}
.namaMobile {
  font-size: 10px;
  margin-bottom: 0;
}
</style>
