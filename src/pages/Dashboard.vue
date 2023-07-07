<template>
  <h3>Dashboard</h3>
  <app-loading />

  <hr />
  <div class="user-card d-flex align-items-center bg-primary p-3 rounded">
    <img
      src="/logo.png"
      alt="puber-logo"
      width="60"
      class="me-3"
    />
    <div class="user-info text-white">
      <p
        style="font-size: 20px; margin-bottom: 0"
        class="fw-bold"
      >
        {{ namaUser }}
      </p>
      <i>{{ roleUser }}</i>
    </div>
  </div>
  <div class="row p-3">
    <widget-dashboard
      v-for="c in counter"
      :key="c.nama"
      :warna="c.warna"
      :total="c.total"
      :nama="c.nama"
    />
  </div>
</template>

<script>
import WidgetDashboard from "../components/WidgetDashboard.vue";
import axios from "axios";
// import AppLoading from "../components/~global/AppLoading.vue";
export default {
  components: {
    WidgetDashboard,
    // AppLoading,
  },
  data() {
    return {
      namaUser: localStorage.getItem("nama"),
      roleUser: localStorage.getItem("role"),
      counter: [
        {
          warna: "#315200",
          total: 0,
          nama: "Total Area",
        },
        {
          warna: "#2d0063",
          total: 0,
          nama: "Total Dropspot",
        },
        {
          warna: "#5e0600",
          total: 0,
          nama: "Total User",
        },
      ],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const result = await axios.get(
        "https://puber-api.kildev.my.id/dashboard",
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      this.counter[0].total = result.data.data.totalUser;
      this.counter[1].total = result.data.data.totalArea;
      this.counter[2].total = result.data.data.totalDropspot;
    },
  },
};
</script>
