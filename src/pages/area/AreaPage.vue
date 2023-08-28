<template>
  <!-- judul -->
  <h3 class="titlePage">Data Area</h3>
  <hr />
  <!-- jumlah data dan pencarian -->
  <div class="search-box mt-2 row">
    <div class="col-md-10 d-flex align-items-center mb-2">
      <div class="form-control-plaintext form-control-sm">
        Total data {{ table.meta["x_total_data"] }}
      </div>
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
  <!-- tombol tambah data -->
  <button
    v-if="table.user.role === 'sysadmin'"
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
          <th scope="col">PIC External</th>
          <th scope="col">No. HP PIC External</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(a, i) in table.items"
          :key="i"
          @dblclick="
            table.user.role === 'sysadmin' && form.handleDoubleClick(a)
          "
        >
          <td>{{ i + 1 }}</td>
          <td>{{ a.nama }}</td>
          <td>{{ a.pic }}</td>
          <td>+62{{ a.no_hp }}</td>
          <td>{{ a.pic_ext ?? "-" }}</td>
          <td>{{ a.no_hp_ext ? `+62${a.no_hp_ext}` : "-" }}</td>
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
              <div class="input-group mt-2">
                <span class="input-group-text" id="basic-addon1">+62</span>
                <input
                  type="number"
                  class="form-control"
                  v-model="form.form.no_hp"
                  placeholder="Masukkan no hp .."
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
            <div class="form-group mb-3">
              <small>PIC External</small>
              <input
                type="text"
                v-model="form.form.pic_ext"
                class="form-control mt-2"
                placeholder="Masukkan nama pic external .."
              />
            </div>
            <div class="form-group mb-3">
              <small>NO HP PIC External</small>
              <div class="input-group mt-2">
                <span class="input-group-text" id="basic-addon1">+62</span>
                <input
                  type="number"
                  class="form-control"
                  v-model="form.form.no_hp_ext"
                  placeholder="Masukkan no hp pic external .."
                  aria-describedby="basic-addon1"
                />
              </div>
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
              <div class="input-group mt-2">
                <span class="input-group-text" id="basic-addon1">+62</span>
                <input
                  type="number"
                  class="form-control"
                  v-model="form.form.no_hp"
                  placeholder="Masukkan no hp .."
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
            <div class="form-group mb-3">
              <small>PIC External</small>
              <input
                type="text"
                v-model="form.form.pic_ext"
                class="form-control mt-2"
                placeholder="Masukkan nama pic external .."
              />
            </div>
            <div class="form-group mb-3">
              <small>NO HP PIC External</small>
              <div class="input-group mt-2">
                <span class="input-group-text" id="basic-addon1">+62</span>
                <input
                  type="number"
                  class="form-control"
                  v-model="form.form.no_hp_ext"
                  placeholder="Masukkan no hp pic external .."
                  aria-describedby="basic-addon1"
                />
              </div>
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
