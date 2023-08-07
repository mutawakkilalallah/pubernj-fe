<template>
  <div>
    <h3 class="titlePage">Statistik Dropspot</h3>

    <div id="chart">
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

const store = useStatistikStore();
store.getData();

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