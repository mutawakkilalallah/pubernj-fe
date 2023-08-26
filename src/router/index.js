import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/Login.vue"),
  },
  {
    path: "/not-found",
    name: "not-found",
    component: () => import("@/pages/NotFound.vue"),
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
        path: "/sync",
        name: "sync",
        component: () => import("@/pages/sync/Index.vue"),
      },
      {
        path: "/user-activity",
        name: "user-activity",
        component: () => import("@/pages/activity/Index.vue"),
      },
      {
        path: "/error-report",
        name: "error-report",
        component: () => import("@/pages/error/Index.vue"),
      },
      {
        path: "/armada",
        name: "armada",
        component: () => import("@/pages/armada/Index.vue"),
      },
      {
        path: "/persyaratan",
        name: "persyaratan",
        component: () => import("@/pages/penumpang/PersyaratanPage.vue"),
      },
      {
        path: "/profil/:uuid",
        name: "profil",
        component: () => import("@/pages/profil/ProfilPage.vue"),
      },
      {
        path: "/armada-print",
        name: "armada-print",
        component: () => import("@/pages/printarmada/Index.vue"),
      },
      {
        path: "/armada/:id/penumpang",
        name: "armada-detail",
        component: () => import("@/pages/armada/DetailPage.vue"),
      },
      {
        path: "penumpang/surat-jalan/:niup",
        name: "surat-jalan",
        component: () => import("@/pages/cetak/CetakPage.vue"),
      },
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
  const rules = JSON.parse(localStorage.getItem("user"));
  //  data role setiap url
  const ruleSantri = [
    {
      id: 1,
      name: "sysadmin",
    },
    {
      id: 2,
      name: "supervisor",
    },
    {
      id: 3,
      name: "admin",
    },
    {
      id: 4,
      name: "wilayah",
    },
  ];
  const ruleStatistik = [
    {
      id: 1,
      name: "sysadmin",
    },
    {
      id: 2,
      name: "supervisor",
    },
    {
      id: 3,
      name: "admin",
    },
    {
      id: 4,
      name: "armada",
    },
  ];
  const ruleAmrada = [
    {
      id: 1,
      name: "sysadmin",
    },
    {
      id: 2,
      name: "supervisor",
    },
    {
      id: 3,
      name: "admin",
    },
    {
      id: 4,
      name: "armada",
    },
    {
      id: 5,
      name: "pendamping",
    },
    {
      id: 6,
      name: "p4nj",
    },
  ];
  const ruleArea = [
    {
      id: 1,
      name: "sysadmin",
    },
    {
      id: 2,
      name: "supervisor",
    },
    {
      id: 3,
      name: "admin",
    },
    {
      id: 4,
      name: "wilayah",
    },
    {
      id: 5,
      name: "daerah",
    },
    {
      id: 6,
      name: "keuangan",
    },
  ];
  const ruleDropspot = [
    {
      id: 1,
      name: "sysadmin",
    },
    {
      id: 2,
      name: "supervisor",
    },
    {
      id: 3,
      name: "admin",
    },
    {
      id: 4,
      name: "wilayah",
    },
    {
      id: 5,
      name: "daerah",
    },
    {
      id: 6,
      name: "keuangan",
    },
  ];
  // set permission
  if (to.name !== "login" && !localStorage.getItem("token")) {
    next({ name: "login" });
  } else if (to.name === "login" && localStorage.getItem("token")) {
    next({ name: "dashboard" });
  }
  // set permission role
  else if (to.name === "santri") {
    const temp = ruleSantri.filter((a) => a.name === rules.role);
    if (temp.length) {
      next();
    } else {
      next({ name: "not-found" });
    }
  } else if (to.name === "statistik") {
    const temp = ruleStatistik.filter((a) => a.name === rules.role);
    if (temp.length) {
      next();
    } else {
      next({ name: "not-found" });
    }
  } else if (to.name === "armada") {
    const temp = ruleAmrada.filter((a) => a.name === rules.role);
    if (temp.length) {
      next();
    } else {
      next({ name: "not-found" });
    }
  } else if (to.name === "area") {
    const temp = ruleArea.filter((a) => a.name === rules.role);
    if (temp.length) {
      next();
    } else {
      next({ name: "not-found" });
    }
  } else if (to.name === "dropspot") {
    const temp = ruleDropspot.filter((a) => a.name === rules.role);
    if (temp.length) {
      next();
    } else {
      next({ name: "not-found" });
    }
  } else if (to.name === "keuangan") {
    if (rules.role !== "sysadmin") {
      next({ name: "not-found" });
    } else {
      next();
    }
  } else if (to.name === "user") {
    if (rules.role !== "sysadmin" && rules.role !== "admin") {
      next({ name: "not-found" });
    } else {
      next();
    }
  } else if (to.name === "user-activity") {
    if (rules.role !== "sysadmin") {
      next({ name: "not-found" });
    } else {
      next();
    }
  } else if (to.name === "error-report") {
    if (rules.role !== "sysadmin") {
      next({ name: "not-found" });
    } else {
      next();
    }
  } else if (to.name === "sync") {
    if (rules.role !== "sysadmin") {
      next({ name: "not-found" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
