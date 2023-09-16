<template>
  <!-- judul -->
  <div class="row">
    <div class="col-md-8">
      <h3 class="titlePage">Data Dropspot</h3>
    </div>
    <div class="col-md-4 text-end">
      <button
        class="btn btn-sm btn-outline-success"
        type="button"
        @click="table.exportExel"
      >
        Export
      </button>
    </div>
  </div>
  <hr />
  <!-- menu filter -->
  <div class="filter-box row g-2">
    <div class="col-md-2">
      <app-select
        :data="form.isArea"
        label="Semua Area"
        @setChange="table.changeArea"
      />
    </div>
    <div class="col-md-2">
      <app-select
        v-model="table.params.grub"
        :data="form.opsiGrup"
        label="Semua Grub"
        @setChange="table.changeGrub"
      />
    </div>
  </div>
  <!-- jumlah data dan pencarian -->
  <div class="serach-box mt-2 row">
    <div class="col-md-10 d-flex align-items-center mb-2">
      <div class="form-control-plaintext form-control-sm">
        Total data {{ table.meta["x_total_data"] }}
      </div>
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
  <!-- tombol tambah data -->
  <button
    v-if="table.user.role === 'sysadmin'"
    class="btn btn-sm btn-primary"
    @click="form.setOpenAdd"
  >
    Tambah Dropspot
  </button>
  <!-- table data utama -->
  <div class="table-responsive">
    <table class="table table-sm table-hover mt-3">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Nama Dropspot</th>
          <th scope="col">Grup</th>
          <th scope="col">Tarif</th>
          <th scope="col">Area</th>
          <th scope="col">Keberangkatan Putri</th>
          <th scope="col">Keberangkatan Putra</th>
          <th scope="col">Cakupan</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(d, i) in table.items"
          :key="i"
          @dblclick="table.user.role === 'sysadmin' && form.handleDoubleClik(d)"
        >
          <td>{{ i + 1 }}</td>
          <td>{{ d.nama }}</td>
          <td>{{ d.grup.toUpperCase() }}</td>
          <td>{{ "Rp. " + d.harga }}</td>
          <td>{{ d.area.nama }}</td>
          <td>
            {{ toTglIndo(d.jam_berangkat_pi) }}
          </td>
          <td>
            {{ toTglIndo(d.jam_berangkat_pa) }}
          </td>
          <td>{{ d.cakupan }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- modal tambah -->
  <div
    class="modal fade"
    v-if="form.isOpenAdd === true"
    :class="{ show: form.isOpenAdd }"
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
            @click="form.setOpenAdd"
          ></button>
        </div>
        <form @submit.prevent="form.tambahData">
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
              <small>Grup</small>
              <app-select
                :data="form.opsiGrup"
                label="Pilih grup"
                @set-model="(val)=>{form.form.grup=val}"
              />
            </div>
            <div class="form-group mb-3">
              <small>Area</small>
              <select
                class="form-select mt-2"
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
            <div class="form-group mb-3">
              <div class="row g-2">
                <div class="col">
                  <small>Waktu Keberangkatan Putri</small>

                  <VueDatePicker
                    v-model="form.form.jam_berangkat_pi"
                    time-picker-inline
                  />
                </div>
                <div class="col">
                  <small>Waktu Keberangkatan Putra</small>
                  <VueDatePicker
                    v-model="form.form.jam_berangkat_pa"
                    time-picker-inline
                  />
                </div>
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
            <button
              type="submit"
              class="btn btn-sm btn-primary"
            >Simpan</button>
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
          <h1
            class="modal-title fs-5"
            id="modalEditLabel"
          >Edit Dropspot</h1>
          <button
            class="btn-close"
            type="button"
            @click="form.setOpenEdit"
          ></button>
        </div>
        <form @submit.prevent="form.editData">
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
              <small>Grup</small>
              <select
                class="form-select mt-2"
                v-model="form.form.grup"
              >
                <option value="jatim">JATIM</option>
                <option value="jawa-non-jatim">JAWA NON JATIM</option>
                <option value="luar-pulau">LUAR PULAU</option>
                <option value="luar-jawa">LUAR JAWA</option>
              </select>
            </div>
            <div class="form-group mb-3">
              <small>Area</small>
              <select
                class="form-select mt-2"
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
            <div class="form-group mb-3">
              <div class="row g-2">
                <div class="col">
                  <small>Waktu Keberangkatan Putri</small>

                  <VueDatePicker
                    v-model="form.form.jam_berangkat_pi"
                    time-picker-inline
                  />
                </div>
                <div class="col">
                  <small>Waktu Keberangkatan Putra</small>
                  <VueDatePicker
                    v-model="form.form.jam_berangkat_pa"
                    time-picker-inline
                  />
                </div>
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
              v-if="table.user.role == 'sysadmin'"
              type="button"
              class="btn btn-sm btn-danger"
              @click="form.deleteData"
            >
              Hapus
            </button>
            <button
              v-if="table.user.role == 'sysadmin'"
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
import { onMounted } from "vue";
import { useDropspotForm } from "../../store/dropsot/form";
import { useDropsotTable } from "../../store/dropsot/table";
import { DateTime } from "luxon";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const table = useDropsotTable();
const form = useDropspotForm();
// const defaultTime = new Date(2000, 1, 1, 6, 0, 0);
const toTglIndo = (tgl) => {
  const dateTimeWIB = DateTime.fromISO(tgl, { zone: "Asia/Jakarta" });
  return dateTimeWIB.toFormat("dd LLLL yyyy HH:mm");
};
onMounted(() => {
  table.getData();
  form.getArea();
  form.getArea();
});
</script>
<style scoped>
</style>