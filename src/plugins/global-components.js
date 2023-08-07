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
  app.component(
    "app-paginate",
    defineAsyncComponent(() => import("@/components/~global/AppPaginate.vue"))
  );
  app.component(
    "app-loading",
    defineAsyncComponent(() => import("@/components/~global/AppLoading.vue"))
  );
  app.component(
    "widget-dashboard",
    defineAsyncComponent(() => import("@/components/~global/WidgetDashboard.vue"))
  );
};