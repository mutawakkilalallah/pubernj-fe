<template>
  <!-- judul -->
  <h3 class="titlePage">Data Keuangan</h3>
  <hr />
  <div class="row">
    <div
      class="col-md-2"
      v-for="(value, key) in table.stats.keuanganTotal"
      :key="key"
    >
      <div class="row g-5">
        <div class="col-lg-12 col-md-4">
          <div class="p-1">
            <div class="card-body bg-primary text-white rounded p-3">
              <b
                class="card-text"
                v-if="value"
              >
                {{
            new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumSignificantDigits: 12,
            }).format(value)
          }}
              </b>
              <p>{{ startCase(key) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <hr />
  <!-- table data utama -->
  <div class="table-responsive">
    <table class="table table-sm table-hover mt-3">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Nama Dropspot</th>
          <th scope="col">Jml Pa/Pi</th>
          <th scope="col">Jml Putri</th>
          <th scope="col">Jml Putra</th>
          <th scope="col">Total Est Pa/Pi</th>
          <th scope="col">Total Est Putri</th>
          <th scope="col">Total Est Putra</th>
          <th scope="col">Total Byr Pa/Pi</th>
          <th scope="col">Total Byr Putra</th>
          <th scope="col">Total Byr Putra</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(kd, i) in table.stats.keuanganByDropspot"
          :key="i"
        >
          <td>{{ i + 1 }}</td>
          <td>{{ kd.nama_dropspot.substring(0, 20) + ".." }}</td>
          <td>{{ kd.jumlah_penumpang_total }}</td>
          <td>{{ kd.jumlah_penumpang_putra }}</td>
          <td>{{ kd.jumlah_penumpang_putri }}</td>
          <td v-rupiah="kd.total_jumlah_estimasi_pendapatan"></td>
          <td v-rupiah="kd.total_jumlah_estimasi_pendapatan_putra"></td>
          <td v-rupiah="kd.total_jumlah_estimasi_pendapatan_putri"></td>
          <td v-rupiah="kd.total_jumlah_bayar"></td>
          <td v-rupiah="kd.total_jumlah_bayar_putra"></td>
          <td v-rupiah="kd.total_jumlah_bayar_putri"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { useKeuanganTable } from "../../store/keuangan/table";
import { startCase } from "lodash";

const table = useKeuanganTable();

onMounted(() => {
  table.getData();
});
</script>
