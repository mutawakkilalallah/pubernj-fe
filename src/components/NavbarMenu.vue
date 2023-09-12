<template>
  <!-- <nav class="navbar navbar-dark navbar-expand bg-primary p-2 fixed-top"> -->
  <nav
    class="navbar navbar-dark navbar-expand p-2 fixed-top"
    :style="
      myTheme.themes === 'light'
        ? 'background-color: #003E1E'
        : myTheme.themes === 'dark'
        ? 'background-color: var(--bs-body-bg)'
        : 'background-color: #003E1E'
    "
  >
    <div class="container-fluid">
      <a
        v-if="isMobile"
        class="navbar-brand"
        style="font-size: 14px"
        href="#"
      >PUBER NJ</a>
      <a
        v-else
        class="navbar-brand"
        style="font-size: 14px"
        href="#"
      >Pulang Bersama - PP. Nurul Jadid</a>
      <div
        class="collapse navbar-collapse"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>

        <div class="form-check form-switch">
          <input
            type="checkbox"
            id="flexSwitchCheckCheked"
            role="switch"
            :checked="cekak"
            style="cursor: pointer; background-color: var(--bs-body-bg)"
            class="form-check-input mt-2"
            @click="setDark"
          />
        </div>
        <button
          class="btn-kecil btn btn-outline-info me-2"
          type="submit"
        >
          <font-awesome-icon icon="brush" /> Clear Cache
        </button>
        <button
          class="btn-kecil btn btn-outline-danger"
          type="button"
          @click="prosesLogout"
        >
          <font-awesome-icon icon="sign-out-alt" /> Keluar
        </button>
      </div>
    </div>
  </nav>

  <div
    class="menu-atas shadow d-flex justify-content-start bg-white fixed-bottom"
    style="overflow-x: auto"
    v-if="isMobile"
  >
    <MenuItem
      v-for="m in filterMenu()"
      :key="m.title"
      :title="m.title"
      :icon="m.icon"
      :path="m.path"
    />

  </div>

  <div
    v-else
    class="menu-atas shadow d-flex justify-content-start bg-white fixed-top mt-5"
    style="overflow-x: auto"
  >
    <MenuItem
      v-for="m in filterMenu()"
      :key="m.title"
      :title="m.title"
      :icon="m.icon"
      :path="m.path"
    />

  </div>

</template>

<script setup>
import MenuItem from "./~global/MenuItem.vue";
import router from "../router";
import Swal from "sweetalert2";
import { useAuthStore } from "../store/auth/index";
import { useThemeStore } from "../store/auth/theme";
import { computed, onMounted, ref } from "vue";

const myTheme = useThemeStore();
const storeAuth = useAuthStore();
const isMobile = ref("");
const cekak = ref(false);
// const routeDash = ref("");

const menu = ref([
  {
    icon: "chart-simple",
    title: "Dashboard",
    path: "dashboard",
    rules: [
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
        name: "armada",
      },
      {
        id: 7,
        name: "pendamping",
      },
      {
        id: 8,
        name: "p4nj",
      },
      {
        id: 9,
        name: "keuangan",
      },
      {
        id: 10,
        name: "bps",
      },
    ],
  },
  {
    icon: "square-poll-horizontal",
    title: "Statistik",
    path: "statistik",
    rules: [
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
    ],
  },
  {
    icon: "user",
    title: "Santri",
    path: "santri",
    rules: [
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
    ],
  },
  {
    icon: "briefcase",
    title: "Penumpang",
    path: "penumpang",
    rules: [
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
        name: "armada",
      },
      {
        id: 7,
        name: "pendamping",
      },
      {
        id: 8,
        name: "p4nj",
      },
      {
        id: 9,
        name: "keuangan",
      },
    ],
  },
  {
    icon: "bus",
    title: "Armada",
    path: "armada",
    rules: [
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
    ],
  },
  {
    icon: "file-pen",
    title: "Persyaratan",
    path: "persyaratan",
    rules: [
      {
        id: 1,
        name: "sysadmin",
      },
      {
        id: 2,
        name: "admin",
      },
      {
        id: 3,
        name: "supervisor",
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
      {
        id: 7,
        name: "bps",
      },
    ],
  },
  {
    icon: "print",
    title: "Cetak Surat",
    path: "cetak-surat",
    rules: [
      {
        id: 1,
        name: "sysadmin",
      },
      {
        id: 2,
        name: "admin",
      },
      {
        id: 3,
        name: "wilayah",
      },
    ],
  },
  {
    icon: "map",
    title: "Area",
    path: "area",
    rules: [
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
    ],
  },
  {
    icon: "location-dot",
    title: "Dropspot",
    path: "dropspot",
    rules: [
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
    ],
  },
  {
    icon: "credit-card",
    title: "Keuangan",
    path: "keuangan",
    rules: [
      {
        id: 1,
        name: "sysadmin",
      },
    ],
  },
  {
    icon: "user-cog",
    title: "Users",
    path: "user",
    rules: [
      {
        id: 1,
        name: "sysadmin",
      },
      {
        id: 2,
        name: "admin",
      },
    ],
  },
  {
    icon: "stopwatch",
    title: "Activity",
    path: "user-activity",
    rules: [
      {
        id: 1,
        name: "sysadmin",
      },
    ],
  },
  {
    icon: "circle-exclamation",
    title: "Errors",
    path: "error-report",
    rules: [
      {
        id: 1,
        name: "sysadmin",
      },
    ],
  },
  {
    icon: "rotate",
    title: "Syncronize",
    path: "sync",
    rules: [
      {
        id: 1,
        name: "sysadmin",
      },
    ],
  },
]);

const role = computed(() => {
  return storeAuth.user ? storeAuth.user.role : "wilayah";
});

function filterMenu() {
  const arr = menu.value;
  const a = arr.filter(function (item) {
    return item.rules
      ? item.rules.some(function (group) {
          return group.name === role.value;
        })
      : null;
  });
  return a;
}

const routeDash = computed(() => {
  return router.options.routes[2].children[0].name;
});

onMounted(() => {
  const mobileQuery = window.matchMedia("(max-width: 767px)");

  isMobile.value = mobileQuery.matches;

  mobileQuery.addListener((query) => {
    isMobile.value = query.matches;
  });

  // routeDash.value = router.options.routes[2].children[0].name;

  // get theme local storage
  const getTheme = JSON.parse(localStorage.getItem("pageTheme"));
  const myBody = document.body;

  if (getTheme === "dark") {
    cekak.value = true;
    myBody.dataset.bsTheme = "dark";
  } else {
    cekak.value = false;
    myBody.dataset.bsTheme = "light";
  }
});

function setDark() {
  myTheme;
  const setTheme = document.body;
  const constains = setTheme.dataset.bsTheme;
  if (constains === "light") {
    setTheme.dataset.bsTheme = "dark";
    myTheme.themes = "dark";
    cekak.value = true;
  } else {
    setTheme.dataset.bsTheme = "light";
    myTheme.themes = "light";
    cekak.value = false;
  }
  // save local storage
  localStorage.setItem("pageTheme", JSON.stringify(setTheme.dataset.bsTheme));
}

function prosesLogout() {
  Swal.fire({
    title: "Konfirmasi",
    text: "Apakah anda yakin ingin mengakhiri sesi ?",
    icon: "info",
    showCancelButton: true,
    cancelButtonText: "Batal",
    confirmButtonText: "Iya",
    cancelButtonColor: "#28A745",
    confirmButtonColor: "#DC3545",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("x-token");
      router.replace("/login");
    }
  });
}
</script>
