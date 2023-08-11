<template>
  <!-- judul -->
  <h3 class="titlePage">User Activity</h3>
  <hr />
  <small>Total data {{ table.totaldata }}</small>
  <!-- table data utama -->
  <div class="table-responsive">
    <table class="table table-sm table-hover mt-3">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">User & Time</th>
          <th scope="col">Method, Path & Code</th>
          <th scope="col">Visitor Info</th>
          <th scope="col">Payload</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(l, i) in table.items" :key="l.id">
          <td>{{ i + 1 }}</td>
          <td>
            <p class="mb-0">{{ l.nama_lengkap }}</p>
            <p class="mb-0">{{ l.username }}</p>
            <p class="mb-0">{{ l.time }}</p>
          </td>
          <td>
            <p class="mb-0">{{ l.method }}</p>
            <p class="mb-0">{{ l.path }}</p>
            <p class="mb-0">{{ l.code }}</p>
          </td>
          <td class="json-cell">{{ l.user_info }}</td>
          <td class="json-cell">{{ l.payload }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { useActivityTable } from "../../store/activity/table";

const table = useActivityTable();
table.getData();
</script>

<style scoped>
.json-cell {
  white-space: pre;
}
</style>
