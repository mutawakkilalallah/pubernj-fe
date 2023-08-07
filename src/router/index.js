import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/Login.vue"),
  },
  {
    path: "/",
    name: "main",
    component: () => import("@/layouts/Main.vue"),
    children: [
      {
        path: "",
        name: "dashboard",
        component: () => import("@/pages/Dashboard.vue"),
      },
      {
        path: "/statistik",
        name: "statistik",
        component: () => import("@/pages/statistik/Index.vue"),
      },
      {
        path: "/santri",
        name: "santri",
        component: () => import("@/pages/santri/Index.vue"),
      },
      {
        path: "/penumpang",
        name: "penumpang",
        component: () => import("@/pages/penumpang/Index.vue"),
      },
      {
        path: "/penumpang/:uuid/detail",
        name: "penumpang-detail",
        component: () => import("@/pages/penumpang/DetailPage.vue"),
      },
      {
        path: "/area",
        name: "area",
        component: () => import("@/pages/area/Index.vue"),
      },
      {
        path: "/dropspot",
        name: "dropspot",
        component: () => import("@/pages/dropspot/Index.vue"),
      },
      {
        path: "/keuangan",
        name: "keuangan",
        component: () => import("@/pages/keuangan/Index.vue"),
      },
      {
        path: "/user",
        name: "user",
        component: () => import("@/pages/user/Index.vue"),
      },
      {
        path: "/drag",
        name: "drag",
        component: () => import("@/pages/drag/Index.vue"),
      },
      {
        path: "/sync",
        name: "sync",
        component: () => import("@/pages/sync/Index.vue"),
      },
      {
        path: "/armada",
        name: "armada",
        component: () => import("@/pages/armada/Index.vue"),
      },
      {
        path: "/armada/:id/penumpang",
        name: "armada-detail",
        component: () => import("@/pages/armada/DetailPage.vue"),
      },
      {
        path: "/pendamping",
        name: "pendamping",
        component: () => import("@/pages/pendamping/Index.vue"),
      },
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
  if (to.name !== "login" && !localStorage.getItem("token"))
    next({ name: "login" });
  if (to.name === "login" && localStorage.getItem("token"))
    next({ name: "dashboard" });
  else next();
});

export default router;
