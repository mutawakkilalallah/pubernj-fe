import { defineAsyncComponent } from "vue";
// register components
export const registerComponents = (app) => {
  app.component(
    "app-loading",
    defineAsyncComponent(() => import("@/components/~global/AppLoading.vue"))
  );
};