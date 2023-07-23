<template>
  <router-link
    :to="{ name: path }"
    style="text-decoration: none"
  >
    <div
      class="menu-atas-item text-center p-3 mx-3"
      :class="{
        'menu-active': isActive('/' + (title != 'Dashboard' ? path : '')),
      }"
    >
      <font-awesome-icon
        :icon="icon"
        class="icon text-secondary"
      />
      <p class="text-secondary nama">{{ title }}</p>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ["icon", "title", "path", "isActive"],
  methods: {
    isActive(route) {
      console.log("route menu", route);
      console.log("$routePath", this.$route);
      return this.$route.path === route;
    },
  },
};
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
