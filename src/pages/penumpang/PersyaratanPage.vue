<template>
  <!-- judul -->
  <div class="row align-items-center">
    <div class="col-md-2 text-start">
      <h3 class="titlePage">Data Persyaratan</h3>
    </div>
    <div class="col-md-10 text-end g-2">
      <button
        v-if="access.keuangan()"
        class="btn btn-sm btn-outline-info mx-1 my-1"
        type="button"
        @click="table.setOpenKosmara"
      >
        <font-awesome-icon icon="file-import" class="icon" /> Import KOSMARA
      </button>
      <button
        v-if="access.keuangan()"
        class="btn btn-sm btn-outline-warning mx-1 my-1"
        type="button"
        @click="table.export('kosmara')"
      >
        <font-awesome-icon icon="download" class="icon" /> Unduh Template
        KOSMARA
      </button>
      <button
        v-if="access.bps()"
        class="btn btn-sm btn-outline-info me-2"
        type="button"
        @click="table.setOpenBps"
      >
        <font-awesome-icon icon="file-import" class="icon" /> Import BPS
      </button>
      <button
        v-if="access.bps()"
        class="btn btn-sm btn-outline-warning me-2"
        type="button"
        @click="table.export('bps')"
      >
        <font-awesome-icon icon="download" class="icon" /> Unduh Template BPS
      </button>
    </div>
  </div>
  <hr />
  <h6 class="text-primary" v-if="access.keuangan()">NOTE :</h6>
  <ul>
    <li class="text-primary" v-if="access.keuangan()">
      Untuk fitur <b>"Unduh Template"</b> berlaku filter (Wilayah, Daerah dan
      Jenis Kelamin)
    </li>
    <li class="text-primary" v-if="access.keuangan()">
      Untuk KOSMARA otomatis menyesuaikan template aplikasi Admin PSP
    </li>
  </ul>
  <hr v-if="access.keuangan()" />
  <!-- menu filter -->
  <div class="filter-box row">
    <div
      class="col-md-2"
      v-if="
        storeAuth.user.role != 'pendamping' &&
        storeAuth.user.role != 'p4nj' &&
        storeAuth.user.role != 'armada'
      "
    >
      <select
        class="form-select form-select-sm mb-2"
        v-model="table.params.wilayah"
        @change="table.getBlok"
      >
        <option value="" selected>Semua Wilayah</option>
        <option
          v-for="w in table.filter.wilayah"
          :key="w"
          :value="w.alias_wilayah"
        >
          {{ w.wilayah }}
        </option>
      </select>
      <select
        class="form-select form-select-sm mb-2"
        :disabled="table.params.wilayah === ''"
        v-model="table.params.blok"
        @change="table.getData"
      >
        <option value="" selected>Semua Daerah</option>
        <option v-for="b in table.filter.blok" :key="b" :value="b.id_blok">
          {{ b.blok }}
        </option>
      </select>
    </div>
    <div class="col-md-2">
      <select
        class="form-select form-select-sm mb-2"
        v-model="table.params.lunas_bps"
        @change="table.getData"
      >
        <option value="" selected>Semua Status BPS</option>
        <option :value="1">Lunas</option>
        <option :value="0">Belum Lunas</option>
      </select>
      <select
        class="form-select form-select-sm mb-2"
        v-model="table.params.lunas_kosmara"
        @change="table.getData"
        v-if="storeAuth.user.role != 'bps'"
      >
        <option value="" selected>Semua Status KOSMARA</option>
        <option :value="1">Lunas</option>
        <option :value="0">Belum Lunas</option>
      </select>
      <select
        class="form-select form-select-sm mb-2"
        v-model="table.params.tuntas_fa"
        @change="table.getData"
        v-if="storeAuth.user.role != 'bps'"
      >
        <option value="" selected>Semua Status FA</option>
        <option :value="1">Tuntas</option>
        <option :value="0">Belum Tuntas</option>
      </select>
      <select
        class="form-select form-select-sm mb-2"
        v-model="table.params.bebas_kamtib"
        @change="table.getData"
        v-if="storeAuth.user.role != 'bps'"
      >
        <option value="" selected>Semua Status KAMTIB</option>
        <option :value="1">Bebas</option>
        <option :value="0">Belum Bebas</option>
      </select>
    </div>
    <div class="col-md-2">
      <select
        class="form-select form-select-sm mb-2"
        v-model="table.params.jenis_kelamin"
        @change="table.getData"
      >
        <option value="" selected>Semua Jenis Kelamin</option>
        <option value="L">Laki-Laki</option>
        <option value="P">Perempuan</option>
      </select>
    </div>
  </div>
  <!-- jumlah data dan pencarian -->
  <div class="serach-box row mt-2">
    <div class="col-md-6 mb-2 d-flex">
      <div class="col-sm-3 col-md-1 me-3">
        <select
          class="form-select form-select-sm mb-2"
          v-model="table.params.limit"
          @change="table.getData"
        >
          <option value="25" selected>25</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="250">250</option>
          <option value="500">500</option>
          <option value="1000">1000</option>
        </select>
      </div>
      <div class="col-sm-9 col-md-11">
        <div class="form-control-plaintext form-control-sm">
          Total data {{ table.meta["x_total_data"] }}
        </div>
      </div>
    </div>
    <div class="col-md-6 mb-2">
      <div class="row justify-content-end">
        <div class="col-md-3">
          <input
            type="text"
            v-model="table.params.cari"
            class="form-control form-control-sm mb-2"
            placeholder="Cari Penumpang ..."
            @update:model-value="table.searchPage"
          />
        </div>
        <div class="col-auto d-flex flex-column align-items-end">
          <button class="btn btn-danger btn-sm" @click="table.handleReset">
            RESET
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- table data utama -->
  <div :class="isMobile ? 'table-responsive myTable' : 'table-responsive'">
    <table class="table table-sm table-hover mt-3">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">NIUP</th>
          <th scope="col">Nama Santri</th>
          <th scope="col" class="text-center">BPS</th>
          <th scope="col" class="text-center">KOSMARA</th>
          <th scope="col" class="text-center">FA</th>
          <th scope="col" class="text-center">KAMTIB</th>
          <th scope="col">Wilayah</th>
          <th scope="col">Daerah</th>
        </tr>
      </thead>
      <tbody>
        <tr
          style="cursor: pointer"
          v-for="(d, i) in table.items"
          :key="i"
          @contextmenu.prevent="table.showContextMenu($event, d)"
        >
          <td>{{ i + 1 + (table.params.page - 1) * table.params.limit }}</td>
          <td>{{ d.santri.niup }}</td>
          <td>{{ d.santri.nama_lengkap }}</td>
          <!-- <td
            v-if="d.persyaratan.lunas_bps"
            class="text-center bg-success"
            @click="
              access.bps() &&
                table.ubahPersyaratan(
                  'bps',
                  d.id,
                  'error',
                  'membatalkan',
                  'LUNAS BPS',
                  d.santri.nama_lengkap
                )
            "
          >
            <font-awesome-icon icon="check-circle" class="icon text-white" />
          </td>
          <td
            v-else
            class="text-center bg-danger"
            @click="
              access.bps() &&
                table.ubahPersyaratan(
                  'bps',
                  d.id,
                  'error',
                  'memberikan',
                  'LUNAS BPS',
                  d.santri.nama_lengkap
                )
            "
          >
            <font-awesome-icon icon="times-square" class="icon text-white" />
          </td> -->
          <td
            v-if="
              d.persyaratan.lunas_bps && d.persyaratan.is_dispen_bps === 'Y'
            "
            class="text-center bg-warning"
          >
            <font-awesome-icon icon="info-circle" class="icon text-white" />
          </td>
          <td
            v-else-if="d.persyaratan.lunas_bps"
            class="text-center bg-success"
          >
            <font-awesome-icon icon="check-circle" class="icon text-white" />
          </td>
          <td v-else class="text-center bg-danger">
            <font-awesome-icon icon="check-circle" class="icon text-white" />
          </td>
          <td
            v-if="d.persyaratan.lunas_kosmara"
            class="text-center bg-success"
            @click="
              access.keuangan() &&
                table.ubahPersyaratan(
                  'kosmara',
                  d.id,
                  'error',
                  'membatalkan',
                  'LUNAS KOSMARA',
                  d.santri.nama_lengkap
                )
            "
          >
            <font-awesome-icon icon="check-circle" class="icon text-white" />
          </td>
          <td
            v-else
            class="text-center bg-danger"
            @click="
              access.keuangan() &&
                table.ubahPersyaratan(
                  'kosmara',
                  d.id,
                  'error',
                  'memberikan',
                  'LUNAS KOSMARA',
                  d.santri.nama_lengkap
                )
            "
          >
            <font-awesome-icon icon="times-square" class="icon text-white" />
          </td>
          <td
            v-if="d.persyaratan.tuntas_fa"
            class="text-center bg-success"
            @click="
              access.wilayah() &&
                table.ubahPersyaratan(
                  'fa',
                  d.id,
                  'error',
                  'membatalkan',
                  'TUNTAS FA',
                  d.santri.nama_lengkap
                )
            "
          >
            <font-awesome-icon icon="check-circle" class="icon text-white" />
          </td>
          <td
            v-else
            class="text-center bg-danger"
            @click="
              access.wilayah() &&
                table.ubahPersyaratan(
                  'fa',
                  d.id,
                  'info',
                  'memberikan',
                  'TUNTAS FA',
                  d.santri.nama_lengkap
                )
            "
          >
            <font-awesome-icon icon="times-square" class="icon text-white" />
          </td>
          <td
            v-if="d.persyaratan.bebas_kamtib"
            class="text-center bg-success"
            @click="
              access.internalNonDaerah() &&
                table.ubahPersyaratan(
                  'kamtib',
                  d.id,
                  'error',
                  'membatalkan',
                  'BEBAS KAMTIB',
                  d.santri.nama_lengkap
                )
            "
          >
            <font-awesome-icon icon="check-circle" class="icon text-white" />
          </td>
          <td
            v-else
            class="text-center bg-danger"
            @click="
              access.internalNonDaerah() &&
                table.ubahPersyaratan(
                  'kamtib',
                  d.id,
                  'info',
                  'memberikan',
                  'BEBAS KAMTIB',
                  d.santri.nama_lengkap
                )
            "
          >
            <font-awesome-icon icon="times-square" class="icon text-white" />
          </td>
          <td>
            {{ d.santri.wilayah }}
          </td>
          <td>
            {{ d.santri.blok }}
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="table.items.length > 0">
      <app-paginate
        v-if="table.meta['x_total_data']"
        :meta="table.meta"
        :per_page="table.params.limit"
        @set-page="(val) => table.setPage(val)"
        @next="table.nexPage"
        @prev="table.prevPage"
        @last="table.setPage"
        @first="table.setPage"
      />
    </div>
  </div>
  <!-- modal import BPS -->
  <div
    class="modal fade"
    v-if="table.openBps === true"
    :class="{ show: table.openBps }"
    style="display: block"
    id="modalEdit"
    tabindex="-1"
    aria-labelledby="modalEditLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modalEditLabel">Import BPS</h1>
          <button
            class="btn-close"
            type="button"
            @click="table.setOpenBps"
          ></button>
        </div>
        <form @submit.prevent="table.import('bps')">
          <div class="modal-body">
            <div class="form-group mb-3">
              <small>File Excel (.xlsx only)</small>
              <input
                type="file"
                @change="table.handleFileBPS"
                accept=".xlsx"
                class="form-control mt-2"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-sm btn-secondary"
              @click="table.setOpenBps"
            >
              Tutup
            </button>
            <button type="submit" class="btn btn-sm btn-primary">Proses</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- modal import Kosmara -->
  <div
    class="modal fade"
    v-if="table.openKosmara === true"
    :class="{ show: table.openKosmara }"
    style="display: block"
    id="modalEdit"
    tabindex="-1"
    aria-labelledby="modalEditLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modalEditLabel">Import KOSMARA</h1>
          <button
            class="btn-close"
            type="button"
            @click="table.setOpenKosmara"
          ></button>
        </div>
        <form @submit.prevent="table.import('kosmara')">
          <div class="modal-body">
            <div class="form-group mb-3">
              <small>File Excel (.xlsx only)</small>
              <input
                type="file"
                @change="table.handleFileKosmara"
                accept=".xlsx"
                class="form-control mt-2"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-sm btn-secondary"
              @click="table.setOpenKosmara"
            >
              Tutup
            </button>
            <button type="submit" class="btn btn-sm btn-primary">Proses</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { usePersyaratanTable } from "../../store/penumpang/persyaratan";
import { useAuthStore } from "../../store/auth/index";
import * as access from "../../plugins/access";
import { onMounted, ref } from "vue";

const storeAuth = useAuthStore();
const table = usePersyaratanTable();
const isMobile = ref("");

onMounted(() => {
  table.getData();

  if (storeAuth.user.role != "p4nj") {
    table.getWilayah();
  }

  const mobileQuery = window.matchMedia("(max-width: 767px)");

  isMobile.value = mobileQuery.matches;

  mobileQuery.addListener((query) => {
    isMobile.value = query.matches;
  });
});
</script>
<style lang="scss" scoped>
.myTable {
  margin-bottom: 60px;
}
</style>
>
