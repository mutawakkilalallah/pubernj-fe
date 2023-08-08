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

  <div class="row mt-3 g-2">
    <!-- card -->
    <div class="col-sm-3 mb-3 mb-sm-0">
      <div
        class="card"
        style="background-color:#006c8a ;"
      >
        <div class="card-body">
          <div class="row">
            <div class="col">
              <font-awesome-icon
                icon="user"
                style="font-size: 90px; color: white;"
              />
            </div>
            <div class="col">
              <h2 class="card-title text-end text-light">{{ storeAuth.stast.totalSantri }}</h2>
              <p class="card-text text-end h6 text-light">Total Santri</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-sm-3 mb-3 mb-sm-0">
      <div class="card text-bg-primary">
        <div class="card-body">
          <div class="row">
            <div class="col">
              <font-awesome-icon
                icon="briefcase"
                style="font-size: 90px;"
              />
            </div>
            <div class="col">
              <h2 class="card-title text-end">{{ storeAuth.stast.totalPenumpang }}</h2>
              <p class="card-text text-end h6">Total Penumpang</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-sm-3 mb-3 mb-sm-0">
      <div
        class="card"
        style="background-color:#8a5700 ;"
      >
        <div class="card-body">
          <div class="row">
            <div class="col">
              <font-awesome-icon
                icon="user-xmark"
                style="font-size: 90px; color: white;"
              />
            </div>
            <div class="col">
              <h2 class="card-title text-end text-light">{{ storeAuth.stast.totalTidakRombongan }}</h2>
              <p class="card-text text-end h6 text-light">Total Tidak Rombongan</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-sm-3 mb-3 mb-sm-0">
      <div
        class="card"
        style="background-color:#315200 ;"
      >
        <div class="card-body">
          <div class="row">
            <div class="col">
              <font-awesome-icon
                icon="map"
                style="font-size: 90px; color: white;"
              />
            </div>
            <div class="col">
              <h2 class="card-title text-end text-light">{{ storeAuth.stast.totalArea }}</h2>
              <p class="card-text text-end h6 text-light">Total Area</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-sm-3 mb-3 mb-sm-0">
      <div
        class="card"
        style="background-color:#2d0063 ;"
      >
        <div class="card-body">
          <div class="row">
            <div class="col">
              <font-awesome-icon
                icon="location-dot"
                style="font-size: 90px; color: white;"
              />
            </div>
            <div class="col">
              <h2 class="card-title text-end text-light">{{ storeAuth.stast.totalDropspot }}</h2>
              <p class="card-text text-end h6 text-light">Total Dropspot</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="storeAuth.user.role === 'sysadmin'"
      class="col-sm-3 mb-3 mb-sm-0"
    >
      <div
        class="card"
        style="background-color:#5e0600 ;"
      >
        <div class="card-body">
          <div class="row">
            <div class="col">
              <font-awesome-icon
                icon="user-cog"
                style="font-size: 90px; color: white;"
              />
            </div>
            <div class="col">
              <h2 class="card-title text-end text-light">{{ storeAuth.stast.totalUser }}</h2>
              <p class="card-text text-end h6 text-light">Total User</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "../store/auth/index";
import { useSantriTable } from "../store/santri/table";
const santri = useSantriTable();
santri.getData();
const storeAuth = useAuthStore();
storeAuth.getStats();

// storeAuth.getImage(storeAuth.user.santri_uuid, "small");

const ts = storeAuth.stast.totalSantri;
const tp = storeAuth.stast.totalPenumpang;
const ttr = storeAuth.stast.totalTidakRombongan;
const ta = storeAuth.stast.totalArea;
const td = storeAuth.stast.totalDropspot;
const tu = storeAuth.stast.totalUser;

onMounted(() => {
  storeAuth.getStats();
  storeAuth.getImage(storeAuth.user.santri_uuid, "small");
});

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
    total: tp,
    nama: "Total Penumpang",
  },
  {
    id: 3,
    warna: "#8a5700",
    total: ttr,
    nama: "Total Santri Tidak Rombongan",
  },
  {
    id: 4,
    warna: "#315200",
    total: ta,
    nama: "Total Area",
  },
  {
    id: 5,
    warna: "#2d0063",
    total: td,
    nama: "Total Dropspot",
  },
  ...(storeAuth.user.role == "sysadmin"
    ? [
        {
          id: 6,
          warna: "#5e0600",
          total: tu,
          nama: "Total User",
        },
      ]
    : []),
];
</script>
