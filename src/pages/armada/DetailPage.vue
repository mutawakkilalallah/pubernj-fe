<template>
  <!-- judul -->
  <h3>Pengelolaan Data Penumpang</h3>
  <hr />
  <div class="row">
    <div class="col-md-6">
      <div class="row">
        <div class="col-md-2">
          <font-awesome-icon icon="bus" class="icon" style="font-size: 100px" />
        </div>
        <div class="col-md-8">
          <h3>{{ table.armada.nama }}</h3>
          <hr />
          <p class="mb-1">
            <b>Dropspot : </b
            >{{ table.armada.dropspot ? table.armada.dropspot.nama : "-" }}
          </p>
          <p class="mb-1"><b>Pendamping : </b>-</p>
          <p class="mb-1"><b>No. HP : </b>-</p>
          <hr />
          <p class="mb-1">
            <b>Jumlah Penumpang : </b
            >{{ table.armada.penumpang ? table.armada.penumpang.length : 0 }}
          </p>
        </div>
      </div>
      <hr />
      <!-- table data utama -->
      Total
      <p class="badge bg-success">
        {{ form.formDelArmada.id_penumpang.length }}
      </p>
      item dipilih
      <div class="table-responsive">
        <table
          class="table table-sm table-hover mt-3"
          @dragover="form.allowDropAddArmada"
          @drop="form.dropAddArmada($event, route.params.id)"
        >
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nama</th>
              <th scope="col">Dropspot</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(d, i) in table.armada.penumpang"
              :key="i"
              draggable="true"
              @dragstart="form.dragStartDellArmada(d.id)"
              @click="form.handleRowDelArmada(d.id)"
              :class="{ 'table-active': isActiveDelArmada(d.id) }"
            >
              <td>{{ i + 1 }}</td>
              <td>{{ d.santri.nama_lengkap }}</td>
              <td>{{ d.dropspot ? d.dropspot.nama : "-" }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="col-md-6">
      <!-- menu filter -->
      <div class="filter-box mb-5 row">
        <div class="col-md-4">
          <select
            class="form-select form-select-sm mb-2"
            v-model="table.params.area"
            @change="table.getDropspot"
          >
            <option value="" selected>Semua Area</option>
            <option v-for="a in table.filter.area" :key="a" :value="a.id">
              {{ a.nama }}
            </option>
          </select>
          <select
            class="form-select form-select-sm mb-2"
            :disabled="table.params.area === ''"
            v-model="table.params.dropspot"
            @change="table.getData"
          >
            <option value="" selected>Semua Dropsot</option>
            <option v-for="d in table.filter.dropspot" :key="d" :value="d.id">
              {{ d.nama }}
            </option>
          </select>
        </div>
        <div class="col-md-4">
          <select
            class="form-select form-select-sm mb-2"
            v-model="table.params.jenis_kelamin"
            @change="table.getData"
          >
            <option value="" selected>Semua Jenis Kelamin</option>
            <option value="L" selected>Laki-laki</option>
            <option value="P" selected>Perempuan</option>
          </select>
          <select
            class="form-select form-select-sm mb-2"
            v-model="table.params.limit"
            @change="table.getData"
          >
            <option value="" selected>Limit by Kapasitas</option>
            <option value="60" selected>BUS (60)</option>
            <option value="34" selected>Mini Bus (34)</option>
            <option value="18" selected>ELF (18)</option>
            <option value="13" selected>HIACE (13)</option>
            <option value="7" selected>MPV (8)</option>
          </select>
        </div>
      </div>
      <!-- jumlah data dan pencarian -->
      <div class="serach-box row">
        <div class="col-md-8 d-flex align-items-center mb-2">
          <small>Total data {{ table.meta["x_total_data"] }}</small>
        </div>
        <div class="col-md-4 d-flex align-items-center">
          <input
            type="text"
            v-model="table.params.cari"
            class="form-control form-control-sm mb-2"
            placeholder="Cari Santri ..."
            @keyup="table.getData"
          />
        </div>
      </div>
      <hr />
      <!-- table data utama -->
      Total
      <p class="badge bg-success">
        {{ form.formAddArmada.id_penumpang.length }}
      </p>
      item dipilih
      <div class="table-responsive">
        <table
          class="table table-sm table-hover mt-3"
          @dragover="form.allowDropDelArmada"
          @drop="form.dropDelArmada($event, route.params.id)"
        >
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nama</th>
              <th scope="col">Wilayah</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(d, i) in table.items"
              :key="i"
              draggable="true"
              @dragstart="form.dragStartAddArmada(d.id)"
              @click="form.handleRowClickAddArmada(d.id)"
              :class="{ 'table-active': isActiveAddArmada(d.id) }"
            >
              <td>{{ i + 1 }}</td>
              <td>{{ d.santri.nama_lengkap }}</td>
              <td>{{ d.santri.wilayah }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { useArmadaDetailForm } from "../../store/armada/form-detail";
import { useArmadaDetailTable } from "../../store/armada/table-detail";
import { useRoute } from "vue-router";

const table = useArmadaDetailTable();
const form = useArmadaDetailForm();
const route = useRoute();

const isActiveAddArmada = (id) => {
  return form.formAddArmada.id_penumpang.includes(id);
};
const isActiveDelArmada = (id) => {
  return form.formDelArmada.id_penumpang.includes(id);
};
onMounted(() => {
  table.getData();
  table.getDataDetail(route.params.id);
});
</script>
