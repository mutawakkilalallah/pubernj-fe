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
        path: "/area",
        name: "area",
        component: () => import("@/pages/area/Index.vue"),
      },
      {
        path: "/dropspot",
        name: "dropspot",
        component: () => import("@/pages/dropspot/Index.vue"),
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
