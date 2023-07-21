<template>
  <!-- judul -->
  <h3>Data Dropspot</h3>
  <hr />
  <!-- menu filter -->
  <div class="filter-box mb-5 row">
    <div class="col-md-2">
      <select
        class="form-select form-select-sm"
        v-model="table.params.area"
        @change="table.getData"
      >
        <option
          value=""
          selected
        >Semua Area</option>
        <option
          v-for="a in form.isArea"
          :key="a"
          :value="a.id"
        >
          {{ a.nama }}
        </option>
      </select>
    </div>
  </div>
  <!-- jumlah data dan pencarian -->
  <div class="serach-box row">
    <div class="col-md-10 d-flex align-items-center mb-2">
      <small>Total data {{ table.items.length }}</small>
    </div>
    <div class="col-md-2 d-flex align-items-center">
      <input
        type="text"
        v-model="table.params.cari"
        class="form-control form-control-sm mb-2"
        placeholder="Cari Dropspot ..."
        @keyup="table.getData"
      />
    </div>
  </div>
  <hr />
  <!-- tombol tambah data -->
  <button
    class="btn btn-sm btn-primary"
    @click="form.setOpenAdd"
  >Tambah Dropspot</button>
  <!-- table data utama -->
  <div class="table-responsive">
    <table class="table table-sm table-hover mt-3">
      <thead>
        <tr>
          <td scope="col">No</td>
          <td scope="col">Nama Dropspot</td>
          <td scope="col">Area</td>
          <td scope="col">Cakupan</td>
          <td scope="col">Harga</td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(d, i) in table.items"
          :key="i"
          @dblclick="form.handleDoubleClik(d)"
        >
          <td>{{ i+1 }}</td>
          <td>{{ d.nama }}</td>
          <td>{{ d.area.nama }}</td>
          <td>{{ d.cakupan }}</td>
          <td>{{ d.harga }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- modal tambah -->
  <div
    class="modal fade"
    v-if="form.isOpenAdd === true"
    :class="{show : form.isOpenAdd}"
    style="display: block"
    id="modalTambah"
    tabindex="-1"
    aria-labelledby="modalTambahLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1
            class="modal-title fs-5"
            id="modalTambahLabel"
          >Tambah Dropsot</h1>
          <button
            class="btn-close"
            type="button"
            @click="form.isOpenAdd = false"
          ></button>
        </div>
        <div class="modal-body">
          <div class="form-group mb-3">
            <small>Nama Dropspot</small>
            <input
              type="text"
              v-model="form.form.nama"
              placeholder="Masukkan nama dropspot .."
              class="form-control mt-2"
            />
          </div>
          <div class="form-group mb-3">
            <small>Area</small>
            <select
              class="form-select"
              v-model="form.form.area_id"
            >
              <option
                value=""
                selected
              >Pilih Area</option>
              <option
                v-for="a in form.isArea"
                :key="a"
                :value="a.id"
              >
                {{ a.nama }}
              </option>
            </select>

          </div>
          <div class="form-group mb-3">
            <small>Cakupan Daerah</small>
            <input
              type="text"
              v-model="form.form.cakupan"
              placeholder="Masukkan cakupan daerah .."
              class="form-control mt-2"
            />
          </div>
          <div class="form-group mb-3">
            <small>Harga</small>
            <input
              type="text"
              v-model="form.form.harga"
              placeholder="Masukkan cakupan harga .."
              class="form-control mt-2"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-sm btn-secondary"
            @click="form.isOpenAdd = false"
          >Tutup</button>
          <button
            class="btn btn-sm btn-primary"
            @click="form.tambahData"
          >Simpan</button>
        </div>
      </div>
    </div>
  </div>
  <!-- modal edit data -->
  <div
    class="modal fade"
    v-if="form.isOpenEdit === true"
    :class="{show : form.isOpenEdit}"
    style="display: block"
    id="modalEdit"
    tabindex="-1"
    aria-labelledby="modalEditLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1
            class="modal-title fs-5"
            id="modalEditLabel"
          >Edit Dropspot</h1>
          <button
            class="btn-close"
            type="button"
            @click="form.isOpenEdit = false"
          ></button>
        </div>
        <div class="modal-body">
          <div class="form-group mb-3">
            <small>Nama Dropspot</small>
            <input
              type="text"
              class="form-control mt-2"
              v-model="form.form.nama"
            />
          </div>
          <div class="form-group mb-3">
            <small>Area</small>
            <select
              class="form-select"
              v-model="form.form.area_id"
            >
              <option
                value=""
                selected
              >
                {{ form.namaArea }}
              </option>
              <option
                v-for="a in form.isArea"
                :key="a"
                :value="a.id"
              >
                {{ a.nama }}
              </option>
            </select>
          </div>
          <div class="form-group mb-3">
            <small>Cakupan Daerah</small>
            <input
              type="text"
              class="form-control mt-2"
              v-model="form.form.cakupan"
            />
          </div>
          <div class="form-group mb-3">
            <small>Harga</small>
            <input
              type="text"
              class="form-control mt-2"
              v-model="form.form.harga"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-sm btn-secondary"
            @click="form.isOpenEdit = false"
          >Tutup</button>
          <button
            class="btn btn-sm btn-danger"
            @click="form.deleteData"
          >Hapus</button>
          <button
            class="btn btn-sm btn-primary"
            @click="form.editData"
          >Simpan</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { useDropspotForm } from "../../store/dropsot/form";
import { useDropsotTable } from "../../store/dropsot/table";

const table = useDropsotTable();
const form = useDropspotForm();
table.getData();
form.getArea();

onMounted(() => {
  form.getArea();
});
</script>