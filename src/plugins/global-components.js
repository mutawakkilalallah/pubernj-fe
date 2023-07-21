import { defineAsyncComponent } from "vue";
// register components
export const registerComponents = (app) => {
  app.component(
    "app-btn-loading",
    defineAsyncComponent(() => import("@/components/~global/AppBtnLoading.vue"))
  );
  app.component(
    "app-alert",
    defineAsyncComponent(() => import("@/components/~global/AppAlert.vue"))
  );
};