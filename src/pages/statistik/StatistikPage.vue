<template>
  <div>
    <div class="row">
      <div class="col-md-8 text-start">
        <h3 class="titlePage">Statistik</h3>
      </div>
      <div class="col-md-4 text-end">
        <button
          class="btn btn-sm btn-outline-primary"
          type="button"
          v-print="'#printMe'"
        >Print</button>

      </div>
    </div>
    <div
      id="printMe"
      class="table-responsive"
    >
      <table class="table table-sm mt-3">
        <thead>
          <tr class="table-primary">
            <th
              rowspan="2"
              scope="col"
              class="text-center align-middle"
            >No</th>
            <th
              rowspan="2"
              scope="col"
              class="text-center align-middle"
            >
              Nama Dropspot
            </th>
            <th
              colspan="3"
              scope="colgroup"
              class="text-center"
            >Penumpang</th>
            <th
              colspan="5"
              scope="colgroup"
              class="text-center"
            >
              Armada Putra
            </th>
            <th
              colspan="5"
              scope="colgroup"
              class="text-center"
            >
              Armada Putri
            </th>
          </tr>
          <tr class="table-primary">
            <th scope="col">Pa</th>
            <th scope="col">Pi</th>
            <th scope="col">Total</th>
            <th scope="col">Bus</th>
            <th scope="col">Minibus</th>
            <th scope="col">Elf</th>
            <th scope="col">Hiace</th>
            <th scope="col">Mpv</th>
            <th scope="col">Bus</th>
            <th scope="col">Minibus</th>
            <th scope="col">Elf</th>
            <th scope="col">Hiace</th>
            <th scope="col">Mpv</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(ea, i) in store.estArmada"
            :key="i"
          >
            <td>{{ i + 1 }}</td>
            <td>{{ ea.nama_dropspot }}</td>
            <td class="table-info">
              {{ ea.total_putra ? ea.total_putra : "0" }}
            </td>
            <td class="table-info">
              {{ ea.total_putri ? ea.total_putri : "0" }}
            </td>
            <td class="table-info">
              {{ ea.total_penumpang ? ea.total_penumpang : "0" }}
            </td>
            <td class="table-warning">
              {{ ea.bus_putra ? ea.bus_putra : "0" }}
            </td>
            <td class="table-warning">
              {{ ea.minibus_putra ? ea.minibus_putra : "0" }}
            </td>
            <td class="table-warning">
              {{ ea.elf_putra ? ea.elf_putra : "0" }}
            </td>
            <td class="table-warning">
              {{ ea.hiace_putra ? ea.hiace_putra : "0" }}
            </td>
            <td class="table-warning">
              {{ ea.mpv_putra ? ea.mpv_putra : "0" }}
            </td>
            <td class="table-danger">
              {{ ea.bus_putri ? ea.bus_putri : "0" }}
            </td>
            <td class="table-danger">
              {{ ea.minibus_putri ? ea.minibus_putri : "0" }}
            </td>
            <td class="table-danger">
              {{ ea.elf_putri ? ea.elf_putri : "0" }}
            </td>
            <td class="table-danger">
              {{ ea.hiace_putri ? ea.hiace_putri : "0" }}
            </td>
            <td class="table-danger">
              {{ ea.mpv_putri ? ea.mpv_putri : "0" }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      id="chart"
      v-if="users.user.role === 'sysadmin' || users.user.role ==='admin'"
    >
      <apexchart
        type="bar"
        height="5500"
        :options="data.chartOptions"
        :series="data.series"
      ></apexchart>
    </div>
  </div>
</template>
<script setup>
import { useStatistikStore } from "../../store/auth/statistik";
import apexCharts from "apexcharts";
import print from "vue3-print-nb";
import { useAuthStore } from "../../store/auth";

const users = useAuthStore();

const store = useStatistikStore();
store.getStatArmada();

const data = {
  series: [
    {
      name: "Santri Putra",
      data: store.stats.jumlahPutra,
    },
    {
      name: "Santri Putri",
      data: store.stats.jumlahPutri,
    },
    {
      name: "Total Santri",
      data: store.stats.totalSantri,
    },
  ],
  chartOptions: {
    chart: {
      type: "bar",
      height: 5000,
    },

    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: "top",
        },
      },
    },

    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: "12px",
        colors: ["#fff"],
      },
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["#fff"],
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    xaxis: {
      categories: store.stats.namaDropspot,
    },
  },
};
</script>
