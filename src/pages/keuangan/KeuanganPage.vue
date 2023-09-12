<template>
  <!-- judul -->
  <h3 class="titlePage">Data Keuangan</h3>
  <hr />
  <button
    class="btn btn-outline-primary btn-sm me-3"
    @click="store.viewMode = 'detail'"
  >
    Detail
  </button>
  <button
    class="btn btn-outline-primary btn-sm"
    @click="store.viewMode = 'total'"
  >
    Total
  </button>
  <div
    v-if="store.viewMode === 'total'"
    class="table-responsive"
  >
    <table class="table table-bordered table-sm mt-3">
      <thead>
        <tr class="table-primary">
          <th scope="col">NO</th>
          <th scope="col">DATA</th>
          <th scope="col">KATEGORI</th>
          <th scope="col">JUMLAH</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td
            rowspan="3"
            class="align-middle"
          >PENUMPANG</td>
          <td>PUTRA</td>
          <td>{{ store.keuanganAll.putra }}</td>
        </tr>
        <tr>
          <td>2</td>
          <td>PUTRI</td>
          <td>{{ store.keuanganAll.putri }}</td>
        </tr>
        <tr>
          <td>3</td>
          <td>PUTRA - PUTRI</td>
          <td>{{ store.keuanganAll.putra_putri }}</td>
        </tr>
        <tr>
          <td>4</td>
          <td
            rowspan="3"
            class="align-middle"
          >TOTAL BAYAR</td>
          <td>PUTRA</td>
          <td>{{ formatMinus(store.keuanganAll.estimasi_bayar_putra) }}</td>
        </tr>
        <tr>
          <td>5</td>
          <td>PUTRI</td>
          <td>{{ formatMinus(store.keuanganAll.estimasi_bayar_putri) }}</td>
        </tr>
        <tr>
          <td>6</td>
          <td>PUTRA - PUTRI</td>
          <td>{{ formatMinus(store.keuanganAll.estimasi_bayar_putra_putri) }}</td>
        </tr>
        <tr>
          <td>7</td>
          <td
            rowspan="3"
            class="align-middle"
          >PENDAPATAN</td>
          <td>PUTRA</td>
          <td>{{ formatMinus(store.keuanganAll.pendapatan_putra) }}</td>
        </tr>
        <tr>
          <td>8</td>
          <td>PUTRI</td>
          <td>{{ formatMinus(store.keuanganAll.pendapatan_putri) }}</td>
        </tr>
        <tr>
          <td>9</td>
          <td>PUTRA - PUTRI</td>
          <td>{{ formatMinus(store.keuanganAll.pendapatan_putra_putri) }}</td>
        </tr>
        <tr>
          <td>10</td>
          <td
            rowspan="3"
            class="align-middle"
          >ONGKOS ARMADA</td>
          <td>PUTRA</td>
          <td>{{ formatMinus(store.keuanganAll.ongkos_putra) }}</td>
        </tr>
        <tr>
          <td>11</td>
          <td>PUTRI</td>
          <td>{{ formatMinus(store.keuanganAll.ongkos_putri) }}</td>
        </tr>
        <tr>
          <td>12</td>
          <td>PUTRA - PUTRI</td>
          <td>{{ formatMinus(store.keuanganAll.ongkos_putra_putri) }}</td>
        </tr>
        <tr>
          <td>13</td>
          <td
            rowspan="3"
            class="align-middle"
          >PRA LABA</td>
          <td>PUTRA</td>
          <td>{{ formatMinus(store.keuanganAll.pra_laba_putra) }}</td>
        </tr>
        <tr>
          <td>14</td>
          <td>PUTRI</td>
          <td>{{ formatMinus(store.keuanganAll.pra_laba_putri) }}</td>
        </tr>
        <tr>
          <td>15</td>
          <td>PUTRA - PUTRI</td>
          <td>{{ formatMinus(store.keuanganAll.pra_laba_putra_putri) }}</td>
        </tr>
        <tr>
          <td>16</td>
          <td
            rowspan="3"
            class="align-middle"
          >LABA</td>
          <td>PUTRA</td>
          <td>{{ formatMinus(store.keuanganAll.laba_putra) }}</td>
        </tr>
        <tr>
          <td>17</td>
          <td>PUTRI</td>
          <td>{{ formatMinus(store.keuanganAll.laba_putri) }}</td>
        </tr>
        <tr>
          <td>18</td>
          <td>PUTRA - PUTRI</td>
          <td>{{ formatMinus(store.keuanganAll.laba_putra_putri) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- table data utama -->
  <div
    v-if="store.viewMode === 'detail'"
    class="table-responsive"
  >
    <table class="table table-sm mt-3">
      <thead>
        <tr class="table-primary">
          <th
            scope="col"
            rowspan="2"
            class="text-center align-middle"
          >No</th>
          <th
            scope="col"
            rowspan="2"
            class="text-center align-middle"
          >
            Nama Dropspot
          </th>
          <th
            scope="col"
            colspan="3"
            class="text-center"
          >PENUMPANG</th>
          <th
            scope="col"
            colspan="3"
            class="text-center"
          >TOTAL BAYAR</th>
          <th
            scope="col"
            colspan="3"
            class="text-center"
          >PENDAPATAN</th>
          <th
            scope="col"
            colspan="3"
            class="text-center"
          >ONGKOS ARMADA</th>
          <th
            scope="col"
            colspan="3"
            class="text-center"
          >PRA LABA</th>
          <th
            scope="col"
            colspan="3"
            class="text-center"
          >LABA</th>
        </tr>
        <tr class="table-primary">
          <th scope="col">Putra</th>
          <th scope="col">Putri</th>
          <th scope="col">Putra/Putri</th>
          <th scope="col">Putra</th>
          <th scope="col">Putri</th>
          <th scope="col">Putra/Putri</th>
          <th scope="col">Putra</th>
          <th scope="col">Putri</th>
          <th scope="col">Putra/Putri</th>
          <th scope="col">Putra</th>
          <th scope="col">Putri</th>
          <th scope="col">Putra/Putri</th>
          <th scope="col">Putra</th>
          <th scope="col">Putri</th>
          <th scope="col">Putra/Putri</th>
          <th scope="col">Putra</th>
          <th scope="col">Putri</th>
          <th scope="col">Putra/Putri</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(kd, i) in store.keuanganByDropspot"
          :key="i"
        >
          <td>{{ i + 1 }}</td>
          <td>{{ kd.nama_dropspot }}</td>
          <td class="table-info">{{ kd.total_putra }}</td>
          <td class="table-info">{{ kd.total_putri }}</td>
          <td class="table-info">{{ kd.total_putra_putri }}</td>
          <td class="table-success">{{ formatMinus(kd.bayar_putra) }}</td>
          <td class="table-success">{{ formatMinus(kd.bayar_putri) }}</td>
          <td class="table-success">{{ formatMinus(kd.bayar_putra_putri) }}</td>
          <td class="table-danger">{{ formatMinus(kd.pendapatan_putra) }}</td>
          <td class="table-danger">{{ formatMinus(kd.pendapatan_putri) }}</td>
          <td class="table-danger">{{ formatMinus(kd.pendapatan_putra_putri) }}</td>
          <td class="table-primary">{{ formatMinus(kd.ongkos_putra) }}</td>
          <td class="table-primary">{{ formatMinus(kd.ongkos_putri) }}</td>
          <td class="table-primary">{{ formatMinus(kd.ongkos_putra_putri) }}</td>
          <td class="table-warning">{{ formatMinus(kd.pra_laba_putra) }}</td>
          <td class="table-warning">{{ formatMinus(kd.pra_laba_putri) }}</td>
          <td class="table-warning">{{ formatMinus( kd.pra_laba_putra_putri) }}</td>
          <td class="table-dark">{{ formatMinus( kd.laba_putra) }}</td>
          <td class="table-dark">{{ formatMinus( kd.laba_putri) }}</td>
          <td class="table-dark">{{ formatMinus( kd.laba_putra_putri) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { useStatistikStore } from "../../store/auth/statistik";

const store = useStatistikStore();

onMounted(() => {
  store.getKeuangan();
});

const formatMinus = (i) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(i);
};
</script>
