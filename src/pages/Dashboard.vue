<template>
  <h3>Dashboard</h3>
  <hr />
  <div class="user-card d-flex align-items-center bg-primary p-2 rounded">
    <div
      v-show="storeAuth.loading === true"
      style="
        width: 80px;
        height: 80px;
        background-color: rgba(255, 255, 255, 0.363);
        border-radius: 50%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      "
      class="me-3"
    >
      <div
        class="spinner-border text-primary"
        style="width: 3rem; height: 3rem"
        role="status"
      ></div>
    </div>
    <img
      v-show="storeAuth.loading === false"
      :src="storeAuth.foto"
      alt="pohto-profile"
      width="80"
      class="rounded-circle me-3"
    />
    <div class="user-info text-white">
      <p style="font-size: 20px; margin-bottom: 0" class="fw-bold">
        {{ storeAuth.user.santri_nama }}
      </p>
      <i v-if="storeAuth.user.role === 'wilayah'">{{
        storeAuth.user.raw.domisili_santri[
          storeAuth.user.raw.domisili_santri.length - 1
        ].wilayah +
        " - " +
        storeAuth.user.raw.domisili_santri[
          storeAuth.user.raw.domisili_santri.length - 1
        ].blok
      }}</i>
      <i v-else>{{ storeAuth.user.role }}</i>
    </div>
  </div>
  <div class="row mt-3">
    <widget-dashboard
      v-for="c in counter"
      :key="c.nama"
      :warna="c.warna"
      :total="c.total"
      :nama="c.nama"
    />
  </div>
</template>

<script setup>
import WidgetDashboard from "../components/WidgetDashboard.vue";
import { onMounted } from "vue";
import { useAuthStore } from "../store/auth";
const storeAuth = useAuthStore();

onMounted(() => {
  storeAuth.getImage(storeAuth.user.santri_uuid, "small");
});

const counter = [
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
];
// import WidgetDashboard from "../components/WidgetDashboard.vue";
// import axios from "axios";
// export default {
//   components: {
//     WidgetDashboard,
//   },
//   data() {
//     return {
//       namaUser: localStorage.getItem("nama"),
//       roleUser: localStorage.getItem("role"),
//       counter: [
//         {
//           warna: "#315200",
//           total: 0,
//           nama: "Total Area",
//         },
//         {
//           warna: "#2d0063",
//           total: 0,
//           nama: "Total Dropspot",
//         },
//         {
//           warna: "#5e0600",
//           total: 0,
//           nama: "Total User",
//         },
//       ],
//     };
//   },
//   mounted() {
//     this.getData();
//   },
//   methods: {
//     async getData() {
//       const result = await axios.get(
//         "https://puber-api.kildev.my.id/dashboard",
//         {
//           headers: {
//             "x-auth-token": localStorage.getItem("token"),
//           },
//         }
//       );
//       this.counter[0].total = result.data.data.totalUser;
//       this.counter[1].total = result.data.data.totalArea;
//       this.counter[2].total = result.data.data.totalDropspot;
//     },
//   },
// };
</script>
