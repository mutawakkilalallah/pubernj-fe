<template>
  <!-- judul -->
  <div class="row align-items-center">
    <h3 class="titlePage">Peizinan & Surat Jalan</h3>
  </div>
  <hr />
  <h6 class="text-primary">NOTE :</h6>
  <ul>
    <li class="text-primary" v-if="access.keuangan">
      Untuk fitur <b>"Unduh Template"</b> berlaku filter (Wilayah, Daerah, Jenis
      Kelamin dan Status Pembayaran)
    </li>
  </ul>
  <hr />
  <!-- menu filter -->
  <div class="filter-box row">
    <div class="col-md-2" v-if="access.notInternal()">
      <select
        class="form-select form-select-sm mb-2"
        v-model="table.paramsIzin.wilayah"
        @change="table.getBlokIzin"
      >
        <option value="" selected>Semua Wilayah</option>
        <option
          v-for="w in table.filterIzin.wilayah"
          :key="w"
          :value="w.alias_wilayah"
        >
          {{ w.wilayah }}
        </option>
      </select>
      <select
        class="form-select form-select-sm mb-2"
        :disabled="table.paramsIzin.wilayah === ''"
        v-model="table.paramsIzin.blok"
        @change="table.getDataIzin"
      >
        <option value="" selected>Semua Daerah</option>
        <option v-for="b in table.filter.blok" :key="b" :value="b.id_blok">
          {{ b.blok }}
        </option>
      </select>
    </div>
  </div>
  <!-- jumlah data dan pencarian -->
  <div class="serach-box row mt-2">
    <div class="col-md-6 mb-2 d-flex">
      <div class="col-auto me-3">
        <select
          class="form-select form-select-sm mb-2"
          v-model="table.paramsIzin.limit"
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
      <div class="col-auto">
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
            v-model="table.paramsIzin.cari"
            class="form-control form-control-sm mb-2"
            placeholder="Cari Penumpang ..."
            @update:model-value="table.searchPage"
          />
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
          <th scope="col">Wilayah</th>
          <th scope="col">Daerah</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(d, i) in table.items" :key="i">
          <td>{{ i + 1 }}</td>
          <td>{{ d.santri.niup }}</td>
          <td>{{ d.santri.nama_lengkap }}</td>
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
</template>
<script setup>
import { useSuratJalanTable } from "../../store/surat-jalan/table";
import { useAuthStore } from "../../store/auth/index";
import * as access from "../../plugins/access";

const storeAuth = useAuthStore();
const table = useSuratJalanTable();
table.getData();

if (storeAuth.user.role != "p4nj") {
  table.getWilayah();
}
</script>
