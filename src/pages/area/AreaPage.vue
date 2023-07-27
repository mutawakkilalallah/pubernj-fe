<template>
  <!-- judul -->
  <h3>Data Area</h3>
  <hr />
  <!-- jumlah data dan pencarian -->
  <div class="search-box row">
    <div class="col-md-10 d-flex align-items-center mb-2">
      <small>Total data {{ table.items.length }}</small>
    </div>
    <div class="col-md-2 d-flex align-items-center">
      <input
        type="text"
        class="form-control form-control-sm mb-2"
        placeholder="Cari Area"
        v-model="table.params.cari"
        @keyup="table.getData"
      />
    </div>
  </div>
  <hr />
  <!-- tombol tambah data -->
  <button
    v-if="table.user.role == 'sysadmin'"
    type="button"
    class="btn btn-sm btn-primary"
    @click="form.setOpenAdd()"
  >
    Tambah Area
  </button>
  <!-- table data utama -->
  <div class="table-responsive">
    <table class="table table-sm table-hover mt-3">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Nama Area</th>
          <th scope="col">PIC</th>
          <th scope="col">No. HP</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(a, i) in table.items"
          :key="i"
          @dblclick="table.user.role == 'sysadmin' && form.handleDoubleClick(a)"
        >
          <td>{{ i + 1 }}</td>
          <td>{{ a.nama }}</td>
          <td>{{ a.pic }}</td>
          <td>{{ "+62" + a.no_hp }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- modal tambah data -->
  <div
    class="modal fade"
    style="display: block"
    v-if="form.isOpenAdd === true"
    :class="{ show: form.isOpenAdd }"
    id="modalTambah"
    tabindex="-1"
    aria-labelledby="modalTambahLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modalTambahLabel">Tambah Area</h1>
          <button
            type="button"
            class="btn-close"
            @click="form.setOpenAdd"
          ></button>
        </div>
        <form @submit.prevent="form.tambahData">
          <div class="modal-body">
            <div class="form-group mb-3">
              <small>Nama Area</small>
              <input
                type="text"
                v-model="form.form.nama"
                class="form-control mt-2"
                placeholder="Masukkan nama area .."
              />
            </div>
            <div class="form-group mb-3">
              <small>PIC</small>
              <input
                type="text"
                v-model="form.form.pic"
                class="form-control mt-2"
                placeholder="Masukkan nama pic .."
              />
            </div>
            <div class="form-group mb-3">
              <small>NO HP</small>
              <input
                type="number"
                class="form-control mt-2"
                v-model="form.form.no_hp"
                placeholder="Masukkan nama no hp .."
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-sm btn-secondary"
              @click="form.setOpenAdd"
            >
              Tutup
            </button>
            <button type="submit" class="btn btn-sm btn-primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- modal edit data -->
  <div
    class="modal fade"
    v-if="form.isOpenEdit === true"
    :class="{ show: form.isOpenEdit }"
    style="display: block"
    id="modalEdit"
    tabindex="-1"
    aria-labelledby="modalEditLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modalEditLabel">Edit Area</h1>
          <button
            type="button"
            class="btn-close"
            @click="form.setOpenEdit"
          ></button>
        </div>
        <form @submit.prevent="form.editData">
          <div class="modal-body">
            <div class="form-group mb-3">
              <small>Nama Area</small>
              <input
                type="text"
                v-model="form.form.nama"
                class="form-control mt-2"
                placeholder="Masukkan nama area .."
              />
            </div>
            <div class="form-group mb-3">
              <small>PIC</small>
              <input
                type="text"
                v-model="form.form.pic"
                class="form-control mt-2"
                placeholder="Masukkan nama pic .."
              />
            </div>
            <div class="form-group mb-3">
              <small>No. HP</small>
              <input
                type="text"
                v-model="form.form.no_hp"
                class="form-control mt-2"
                placeholder="Masukkan nomor handphone pic .."
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-sm btn-secondary"
              @click="form.setOpenEdit"
            >
              Tutup
            </button>
            <button
              v-if="table.user.role === 'sysadmin'"
              type="button"
              class="btn btn-sm btn-danger"
              @click="form.deleteData()"
            >
              Hapus
            </button>
            <button
              v-if="table.user.role === 'sysadmin'"
              type="submit"
              class="btn btn-sm btn-primary"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useAreaTable } from "../../store/area/table";
import { useAreaForm } from "../../store/area/form";

const table = useAreaTable();
const form = useAreaForm();

table.getData();
</script>
