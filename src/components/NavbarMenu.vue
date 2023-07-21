<template>
  <nav class="navbar navbar-dark navbar-expand bg-primary p-2">
    <div class="container-fluid">
      <a
        v-if="isMobile"
        class="navbar-brand fs-6"
        href="#"
      >PUBER NJ</a>
      <a
        v-else
        class="navbar-brand fs-6"
        href="#"
      >Pulang Bersama - PP. Nurul Jadid</a>
      <div
        class="collapse navbar-collapse"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
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
    class="menu-atas shadow d-flex justify-content-start"
    style="overflow-x: auto"
  >
    <menu-item
      v-for="m in menu"
      :key="m.title"
      :title="m.title"
      :icon="m.icon"
      :path="m.path"
    />
  </div>
</template>

<script>
import MenuItem from "./MenuItem.vue";
import Swal from "sweetalert2";
export default {
  components: {
    MenuItem,
  },
  data() {
    return {
      isMobile: false,
      menu: [
        {
          icon: "chart-simple",
          title: "Dashboard",
          path: "dashboard",
        },
        {
          icon: "user",
          title: "Santri",
          path: "santri",
        },
        {
          icon: "briefcase",
          title: "Penumpang",
          path: "dashboard",
        },
        {
          icon: "map",
          title: "Area",
          path: "area",
        },
        {
          icon: "location-dot",
          title: "Dropspot",
          path: "dropspot",
        },
        {
          icon: "user-cog",
          title: "User Account",
          path: "user",
        },
      ],
    };
  },
  mounted() {
    const mobileQuery = window.matchMedia("(max-width: 767px)");

    this.isMobile = mobileQuery.matches;

    mobileQuery.addListener((query) => {
      this.isMobile = query.matches;
    });
  },
  methods: {
    prosesLogout() {
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
          localStorage.clear();
          this.$router.replace("/login");
        }
      });
    },
  },
};
</script>
