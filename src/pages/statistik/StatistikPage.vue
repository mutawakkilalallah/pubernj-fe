<template>
  <div>
    <div style="margin-left: -120px">
      <GChart
        type="ColumnChart"
        :data="storeAuth.chart"
        :options="chartOptions"
      />
    </div>
  </div>
</template>
<script setup>
import { useAuthStore } from "../../store/auth/index";

import { GChart } from "vue-google-charts";
const storeAuth = useAuthStore();
const chartOptions = {
  chart: {
    title: "Company Performance",
    subtitle: "Sales, Expenses, and Profit: 2014-2017",
  },
};
storeAuth.getStats();
</script>