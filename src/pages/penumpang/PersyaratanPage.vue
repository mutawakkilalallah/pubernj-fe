<template>
  <!-- judul -->
  <div class="row">
    <div class="col-md-8">
      <h3 class="titlePage">Data Persyaratan</h3>
    </div>
    <div class="col-md-4 text-end g-2">
      <button class="btn btn-sm btn-outline-primary" type="button">
        Export
      </button>
    </div>
  </div>
  <hr />
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
      >
        <option value="" selected>Semua Status KOSMARA</option>
        <option :value="1">Lunas</option>
        <option :value="0">Belum Lunas</option>
      </select>
      <select
        class="form-select form-select-sm mb-2"
        v-model="table.params.tuntas_fa"
        @change="table.getData"
      >
        <option value="" selected>Semua Status FA</option>
        <option :value="1">Tuntas</option>
        <option :value="0">Belum Tuntas</option>
      </select>
      <select
        class="form-select form-select-sm mb-2"
        v-model="table.params.bebas_kamtib"
        @change="table.getData"
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
  <div class="table-responsive">
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
          <td v-if="d.persyaratan.lunas_bps" class="text-center bg-success">
            <font-awesome-icon icon="check-circle" class="icon text-white" />
          </td>
          <td v-else class="text-center bg-danger">
            <font-awesome-icon icon="times-square" class="icon text-white" />
          </td>
          <td v-if="d.persyaratan.lunas_kosmara" class="text-center bg-success">
            <font-awesome-icon icon="check-circle" class="icon text-white" />
          </td>
          <td v-else class="text-center bg-danger">
            <font-awesome-icon icon="times-square" class="icon text-white" />
          </td>
          <td
            v-if="d.persyaratan.tuntas_fa"
            class="text-center bg-success"
            @click="
              (storeAuth.user.role === 'sysadmin' ||
                storeAuth.user.role === 'admin' ||
                storeAuth.user.role === 'wilayah' ||
                storeAuth.user.role === 'daerah') &&
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
              (storeAuth.user.role === 'sysadmin' ||
                storeAuth.user.role === 'admin' ||
                storeAuth.user.role === 'wilayah' ||
                storeAuth.user.role === 'daerah') &&
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
              (storeAuth.user.role === 'sysadmin' ||
                storeAuth.user.role === 'admin' ||
                storeAuth.user.role === 'wilayah' ||
                storeAuth.user.role === 'daerah') &&
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
              (storeAuth.user.role === 'sysadmin' ||
                storeAuth.user.role === 'admin' ||
                storeAuth.user.role === 'wilayah' ||
                storeAuth.user.role === 'daerah') &&
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
  </div>
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
  <!-- <div
    v-if="form.contextMenuVisible"
    class="context-menu"
    :style="{
      top: `${form.contextMenuPosition.y}px`,
      left: `${form.contextMenuPosition.x}px`,
    }"
  >
    <ul class="list-group list-group-flush">
      <li class="list-group-item px-5" @click="form.goToDetail">
        Lihat Detail Rombongan
      </li>
    </ul>
  </div> -->
</template>
<script setup>
import { usePersyaratanTable } from "../../store/penumpang/persyaratan";
import { useAuthStore } from "../../store/auth/index";

const storeAuth = useAuthStore();
const table = usePersyaratanTable();
table.getData();

if (storeAuth.user.role != "p4nj") {
  table.getWilayah();
}
</script>
