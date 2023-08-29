<template>
  <h3 class="titlePage">Dashboard</h3>
  <hr />
  <div
    class="user-card row align-items-center justify-content- bg-primary p-2 rounded"
    style="margin: 0 0 0 0"
  >
    <div class="d-flex align-items-center col-md-10 text-start">
      <div
        v-if="storeAuth.user.role != 'p4nj'"
        v-show="storeAuth.loading === true"
        style="
          width: 48px;
          height: 48px;
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
        width="48"
        class="rounded-circle me-3"
      />
      <div class="user-info text-white">
        <p
          style="font-size: 14px; margin-bottom: 0"
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
    <div class="col-md-2 text-end">
      <router-link
        :to="{ name: 'profil', params: { uuid: storeAuth.user.uuid } }"
        style="text-decoration: none"
      >
        <font-awesome-icon
          icon="cog"
          class="icon text-white fs-3 sm-fs-6"
        />
      </router-link>
    </div>
  </div>

  <!-- mobile -->
  <div
    class="row mt-3 g-3 mx-2 text-center"
    v-if="isMobile"
  >
    <div class="col mb-3 mb-sm-0">
      <div>
        <div
          class="badge bg-primary bg-gradient position-relative"
          @click="toDataSantri"
        >
          <font-awesome-icon
            icon="user"
            class="p-2"
            style="font-size: 20px; color: white"
          />
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {{ forMat(storeAuth.stast.totalSantri) }}
            <span class="visually-hidden">unread messages</span>
          </span>
        </div>
        <br />
        <p class=""><small>Total Santri</small></p>
      </div>
    </div>
    <div class="col mb-3 mb-sm-0">
      <div>
        <div
          class="badge  bg-success bg-gradient position-relative"
          @click="toDataPenumpang"
        >
          <font-awesome-icon
            icon="briefcase"
            class="p-2"
            style="font-size: 20px; color: white; "
          />
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {{forMat( storeAuth.stast.totalPenumpang) }}
            <span class="visually-hidden">unread messages</span>
          </span>
        </div>
        <br />
        <p class=""><small>Total Penumpang</small></p>
      </div>
    </div>
    <div class="col mb-3 mb-sm-0">
      <div>
        <div
          class="badge bg-secondary bg-gradient position-relative"
          @click="toDataSantri"
        >
          <font-awesome-icon
            icon="user-xmark"
            class="p-2"
            style="font-size: 20px; color: white"
          />
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {{ forMat(storeAuth.stast.totalTidakRombongan) }}
            <span class="visually-hidden">unread messages</span>
          </span>
        </div>
        <br />
        <p class=""><small>Total Tidak Rombongan</small></p>
      </div>
    </div>
    <div
      class="col mb-3 mb-sm-0"
      v-if="storeAuth.user.role != 'wilayah' && storeAuth.user.role != 'daerah'"
    >
      <div>
        <div
          class="badge bg-danger bg-gradient position-relative"
          @click="toDataArmada"
        >
          <font-awesome-icon
            icon="bus"
            class="p-2"
            style="font-size: 20px; color: white"
          />
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {{ storeAuth.stast.totalArmada }}
            <span class="visually-hidden">unread messages</span>
          </span>
        </div>
        <br />
        <p class=""><small>Total Armada</small></p>
      </div>
    </div>
    <div class="col mb-3 mb-sm-0">
      <div>
        <div
          class="badge bg-warning bg-gradient position-relative"
          @click="toDataArea"
        >
          <font-awesome-icon
            icon="map"
            class="p-2"
            style="font-size: 20px; color: white"
          />
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {{ storeAuth.stast.totalArea }}
            <span class="visually-hidden">unread messages</span>
          </span>
        </div>
        <br />
        <p class=""><small>Total Area</small></p>
      </div>
    </div>
    <div class="col mb-3 mb-sm-0">
      <div>
        <div
          class="badge bg-info bg-gradient position-relative"
          @click="toDataDropspot"
        >
          <font-awesome-icon
            icon="location-dot"
            class="p-2"
            style="font-size: 20px; color: white"
          />
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {{ storeAuth.stast.totalDropspot }}
            <span class="visually-hidden">unread messages</span>
          </span>
        </div>
        <br />
        <p class=""><small>Total Dropspot</small></p>
      </div>
    </div>
    <div
      class="col mb-3 mb-sm-0"
      v-if="storeAuth.user.role != 'wilayah' && storeAuth.user.role != 'daerah'"
    >
      <div>
        <div
          class="badge bg-dark bg-gradient position-relative"
          @click="toDataUser"
        >
          <font-awesome-icon
            icon="user-cog"
            class="p-2"
            style="font-size: 20px; color: white"
          />
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {{ storeAuth.stast.totalUser }}
            <span class="visually-hidden">unread messages</span>
          </span>
        </div>
        <br />
        <p class=""><small>Total User</small></p>
      </div>
    </div>
  </div>

  <!-- dekstop -->
  <div
    class="row mt-3 g-2"
    v-else
  >
    <!-- card -->
    <div
      class="col-sm-3 mb-3 mb-sm-0"
      v-if="
        storeAuth.user.role !== 'armada' &&
        storeAuth.user.role !== 'keuangan' &&
        storeAuth.user.role !== 'pendamping' &&
        storeAuth.user.role !== 'p4nj'
      "
    >
      <div
        class="card"
        style="background-color: #006c8a; cursor: pointer"
        @click="toDataSantri"
      >
        <div class="card-body">
          <div class="row">
            <div class="col">
              <font-awesome-icon
                icon="user"
                style="font-size: 60px; color: white"
              />
            </div>
            <div class="col">
              <h3 class="card-title text-end text-light">
                {{ storeAuth.stast.totalSantri }}
              </h3>
              <p class="card-text text-end fw-bold text-light">Total Santri</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-sm-3 mb-3 mb-sm-0">
      <div
        class="card text-bg-primary"
        style="cursor: pointer"
        @click="toDataPenumpang"
      >
        <div class="card-body">
          <div class="row">
            <div class="col">
              <font-awesome-icon
                icon="briefcase"
                style="font-size: 60px"
              />
            </div>
            <div class="col">
              <h3 class="card-title text-end">
                {{ storeAuth.stast.totalPenumpang }}
              </h3>
              <p class="card-text text-end fw-bold">Total Penumpang</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="col-sm-3 mb-3 mb-sm-0"
      v-if="
        storeAuth.user.role !== 'armada' &&
        storeAuth.user.role !== 'keuangan' &&
        storeAuth.user.role !== 'pendamping' &&
        storeAuth.user.role !== 'p4nj'
      "
    >
      <div
        class="card"
        style="background-color: #8a5700; cursor: pointer"
        @click="toDataSantri"
      >
        <div class="card-body">
          <div class="row">
            <div class="col">
              <font-awesome-icon
                icon="user-xmark"
                style="font-size: 60px; color: white"
              />
            </div>
            <div class="col">
              <h3 class="card-title text-end text-light">
                {{ storeAuth.stast.totalTidakRombongan }}
              </h3>
              <p class="card-text text-end fw-bold text-light">
                Total Tidak Rombongan
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="col-sm-3 mb-3 mb-sm-0"
      v-if="
        storeAuth.user.role !== 'wilayah' &&
        storeAuth.user.role !== 'daerah' &&
        storeAuth.user.role !== 'keuangan'
      "
    >
      <div
        class="card"
        style="background-color: #cd0052; cursor: pointer"
        @click="toDataArmada"
      >
        <div class="card-body">
          <div class="row">
            <div class="col">
              <font-awesome-icon
                icon="bus"
                style="font-size: 60px; color: white"
              />
            </div>
            <div class="col">
              <h3 class="card-title text-end text-light">
                {{ storeAuth.stast.totalArmada }}
              </h3>
              <p class="card-text text-end fw-bold text-light">Total Armada</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-sm-3 mb-3 mb-sm-0">
      <div
        class="card"
        style="background-color: #315200; cursor: pointer"
        @click="toDataArea"
        v-if="
          storeAuth.user.role !== 'pendamping' && storeAuth.user.role !== 'p4nj'
        "
      >
        <div class="card-body">
          <div class="row">
            <div class="col">
              <font-awesome-icon
                icon="map"
                style="font-size: 60px; color: white"
              />
            </div>
            <div class="col">
              <h3 class="card-title text-end text-light">
                {{ storeAuth.stast.totalArea }}
              </h3>
              <p class="card-text text-end fw-bold text-light">Total Area</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-sm-3 mb-3 mb-sm-0">
      <div
        class="card"
        style="background-color: #2d0063; cursor: pointer"
        @click="toDataDropspot"
        v-if="
          storeAuth.user.role !== 'pendamping' && storeAuth.user.role !== 'p4nj'
        "
      >
        <div class="card-body">
          <div class="row">
            <div class="col">
              <font-awesome-icon
                icon="location-dot"
                style="font-size: 60px; color: white"
              />
            </div>
            <div class="col">
              <h3 class="card-title text-end text-light">
                {{ storeAuth.stast.totalDropspot }}
              </h3>
              <p class="card-text text-end fw-bold text-light">
                Total Dropspot
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="
        storeAuth.user.role === 'sysadmin' || storeAuth.user.role === 'admin'
      "
      class="col-sm-3 mb-3 mb-sm-0"
    >
      <div
        class="card"
        style="background-color: #5e0600; cursor: pointer"
        @click="toDataUser"
      >
        <div class="card-body">
          <div class="row">
            <div class="col">
              <font-awesome-icon
                icon="user-cog"
                style="font-size: 60px; color: white"
              />
            </div>
            <div class="col">
              <h3 class="card-title text-end text-light">
                {{ storeAuth.stast.totalUser }}
              </h3>
              <p class="card-text text-end fw-bold text-light">Total User</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div>
    <set-time />
    <p class="text-center text-uppercase">input terakhir</p>
  </div> -->
</template>

<script setup>
import { onMounted, ref } from "vue";
import router from "../router";
import { useAuthStore } from "../store/auth/index";
// import { useSantriTable } from "../store/santri/table";

// const santri = useSantriTable();
const storeAuth = useAuthStore();
const isMobile = ref("");

// santri.getData();
storeAuth.getStats();
if (storeAuth.user.role != "p4nj") {
  storeAuth.getImage(storeAuth.user.niup, "small");
}
function toDataSantri() {
  router.push("/santri");
}
function toDataPenumpang() {
  router.push("/penumpang");
}
function toDataArmada() {
  router.push("/armada");
}
function toDataArea() {
  router.push("/area");
}
function toDataDropspot() {
  router.push("/dropspot");
}
function toDataUser() {
  router.push("/user");
}
const forMat = (i) => {
  return i ? i.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.") : "";
};
onMounted(() => {
  const mobileQuery = window.matchMedia("(max-width: 767px)");

  isMobile.value = mobileQuery.matches;

  mobileQuery.addListener((query) => {
    isMobile.value = query.matches;
  });
});
</script>
