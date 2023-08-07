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
      <p style="font-size: 20px; margin-bottom: 0" class="fw-bold">
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
    <!-- {{ storeAuth.stast }}
    <br />
    {{ counter }} -->
    <widget-dashboard
      v-for="c in counter"
      :key="c.id"
      :warna="c.warna"
      :total="c ? c.total : c.total"
      :nama="c.nama"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../store/auth";

const storeAuth = useAuthStore();

const counter = ref([
  {
    warna: "#006c8a",
    total: storeAuth.stast.totalSantri,
    nama: "Total Santri",
  },
  {
    warna: "#8a5700",
    total: storeAuth.stast.totalPenumpang,
    nama: "Total Penumpang",
  },
  {
    warna: "#8a5700",
    total: storeAuth.stast.totalTidakRombongan,
    nama: "Total Santri Tidak Rombongan",
  },
  {
    warna: "#315200",
    total: storeAuth.stast.totalArea,
    nama: "Total Area",
  },
  {
    warna: "#2d0063",
    total: storeAuth.stast.totalDropspot,
    nama: "Total Dropspot",
  },
  ...(storeAuth.user.role == "sysadmin"
    ? [
        {
          warna: "#5e0600",
          total: storeAuth.stast.totalUser,
          nama: "Total User",
        },
      ]
    : []),
]);
storeAuth.getStats();
storeAuth.getImage(storeAuth.user.santri_uuid, "small");
</script>
