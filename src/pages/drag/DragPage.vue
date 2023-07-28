<template>
  <div class="row">
    <div class="col-md-6">
      <!-- judul -->
      <h3 class="text-capitalize">Drag & Drop {{ table.params1.role }}</h3>
      <hr />
      <!-- menu filter -->
      <div class="filter-box mb-5 row">
        <div class="col-md-2">
          <select
            class="form-select form-select-sm"
            v-model="table.params1.role"
            @change="table.getData1"
          >
            <option
              value=""
              selected
            >Semua Hak Akses</option>
            <option
              v-for="r in table.roles1"
              :key="r"
              :value="r.key"
            >
              {{ r.value }}
            </option>
          </select>
        </div>
      </div>
      <!-- jumlah data dan pencarian -->
      <div class="serach-box row">
        <div class="col-md-10 d-flex align-items-center mb-2">
          <small>Total data {{ table.items1.length }}</small>
        </div>
        <div class="col-md-2 d-flex align-items-center">
          <input
            type="text"
            v-model="table.params1.cari"
            class="form-control form-control-sm mb-2"
            placeholder="Cari User ..."
            @keyup="table.getData1"
          />
        </div>
      </div>
      <hr />
      <!-- table data utama -->
      Total
      <p class="badge bg-success">
        {{ form.formSatu.id_user.length }}
      </p>
      item dipilih
      <div class="table-responsive">
        <table
          class="table table-sm table-hover mt-3"
          @dragover="form.allowDropDua"
          @drop="form.dropDua"
        >
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nama</th>
              <th scope="col">Username</th>
              <th scope="col">Hak Akses</th>
              <th scope="col">Daerah</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(d, i) in table.items1"
              :key="i"
              draggable="true"
              @dragstart="form.dragStartSatu(d.id)"
              @click="form.handleRowClickSatu(d.id)"
              :class="{ 'table-active': isActiveSatu(d.id) }"
            >
              <td>{{ i + 1 }}</td>
              <td>{{ d.santri.nama_lengkap }}</td>
              <td>{{ "@" + d.username }}</td>
              <td>{{ d.role }}</td>
              <td>
                {{
                  d.santri.blok
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="col-md-6">
      <!-- judul -->
      <h3 class="text-capitalize">Drag & Drop {{ table.params2.role }}</h3>
      <hr />
      <!-- menu filter -->
      <div class="filter-box mb-5 row">
        <div class="col-md-2">
          <select
            class="form-select form-select-sm"
            v-model="table.params2.role"
            @change="table.getData2"
          >
            <option
              value=""
              selected
            >Semua Hak Akses</option>
            <option
              v-for="r in table.roles2"
              :key="r"
              :value="r.key"
            >
              {{ r.value }}
            </option>
          </select>
        </div>
      </div>
      <!-- jumlah data dan pencarian -->
      <div class="serach-box row">
        <div class="col-md-10 d-flex align-items-center mb-2">
          <small>Total data {{ table.items2.length }}</small>
        </div>
        <div class="col-md-2 d-flex align-items-center">
          <input
            type="text"
            v-model="table.params2.cari"
            class="form-control form-control-sm mb-2"
            placeholder="Cari User ..."
            @keyup="table.getData2"
          />
        </div>
      </div>
      <hr />
      <!-- table data utama -->
      Total
      <p class="badge bg-success">
        {{ form.formDua.id_user.length }}
      </p>
      item dipilih
      <div class="table-responsive">
        <table
          class="table table-sm table-hover mt-3"
          @dragover="form.allowDropSatu"
          @drop="form.dropSatu"
        >
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nama</th>
              <th scope="col">Username</th>
              <th scope="col">Hak Akses</th>
              <th scope="col">Daerah</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(d, i) in table.items2"
              :key="i"
              draggable="true"
              @dragstart="form.dragStartDua(d.id)"
              @click="form.handleRowClickDua(d.id)"
              :class="{ 'table-active': isActiveDua(d.id) }"
            >
              <td>{{ i + 1 }}</td>
              <td>{{ d.santri.nama_lengkap }}</td>
              <td>{{ "@" + d.username }}</td>
              <td>{{ d.role }}</td>
              <td>
                {{
                  d.santri.blok
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { useDragFrom } from "../../store/drag/form";
import { useDragTable } from "../../store/drag/table";

const table = useDragTable();
const form = useDragFrom();
const isActiveSatu = (id) => {
  return form.formSatu.id_user.includes(id);
};
const isActiveDua = (id) => {
  return form.formDua.id_user.includes(id);
};

onMounted(() => {
  table.getData1();
  table.getData2();
});
</script>
