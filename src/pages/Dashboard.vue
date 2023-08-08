<template>
  <h3 class="titlePage">Dashboard</h3>
  <hr />
  <div class="user-card d-flex align-items-center bg-primary p-2 rounded">
    <div
      v-if="storeAuth.user.role != 'p4nj'"
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
      v-if="storeAuth.user.role != 'p4nj'"
      v-show="storeAuth.loading === false"
      :src="storeAuth.foto"
      alt="pohto-profile"
      width="80"
      class="rounded-circle me-3"
    />
    <div class="user-info text-white">
      <p
        style="font-size: 20px; margin-bottom: 0"
        class="fw-bold"
      >
        {{ storeAuth.user.nama_lengkap }}
      </p>
      <i v-if="storeAuth.user.role === 'daerah'">{{
        `Daerah ${storeAuth.user.blok}`
      }}</i>
      <i v-else-if="storeAuth.user.role === 'wilayah'">{{
        storeAuth.user.wilayah
      }}</i>
      <i v-else>{{ storeAuth.user.role }}</i>
    </div>
  </div>

  <div class="row mt-3">
    {{ storeAuth.stast }}
    <widget-dashboard
      v-for="ca in counter"
      :key="ca.id"
      :warna="ca.warna"
      :total="ca.total"
      :nama="ca.nama"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "../store/auth";
import { useSantriTable } from "../store/santri/table";
const santri = useSantriTable();
santri.getData();
const storeAuth = useAuthStore();
storeAuth.getStats();

console.log("store", santri.meta);
storeAuth.getImage(storeAuth.user.santri_uuid, "small");

const ts = storeAuth.stast.totalSantri;

const counter = [
  {
    id: 1,
    warna: "#006c8a",
    total: ts,
    nama: "Total Santri",
  },
  {
    id: 2,
    warna: "#8a5700",
    total: 0,
    nama: "Total Penumpang",
  },
  {
    id: 3,
    warna: "#8a5700",
    total: 0,
    nama: "Total Santri Tidak Rombongan",
  },
  {
    id: 4,
    warna: "#315200",
    total: 0,
    nama: "Total Area",
  },
  {
    id: 5,
    warna: "#2d0063",
    total: 0,
    nama: "Total Dropspot",
  },
  ...(storeAuth.user.role == "sysadmin"
    ? [
        {
          id: 6,
          warna: "#5e0600",
          total: 0,
          nama: "Total User",
        },
      ]
    : []),
];
onMounted(() => {
  storeAuth.getStats();
});
</script>
