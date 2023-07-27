<template>
  <!-- judul -->
  <h3>Data Penumpang</h3>
  <hr />
  <!-- menu filter -->
  <div class="filter-box mb-5 row">
    <div class="col-md-2">
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
  </div>
  <!-- jumlah data dan pencarian -->
  <div class="serach-box row">
    <div class="col-md-10 d-flex align-items-center mb-2">
      <small>Total data {{ table.totalData }}</small>
    </div>
    <div class="col-md-2 d-flex align-items-center">
      <input
        type="text"
        v-model="table.params.cari"
        class="form-control form-control-sm mb-2"
        placeholder="Cari Penumpang ..."
        @keyup="table.getData"
      />
    </div>
  </div>
  <hr />
  <!-- tombol tambah data -->
  <!-- <button class="btn btn-sm btn-primary" @click="form.setOpenAdd">
    Tambah Dropspot
  </button> -->
  <!-- table data utama -->
  <div class="table-responsive">
    <table class="table table-sm table-hover mt-3">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">NIUP</th>
          <th scope="col">Nama Santri</th>
          <th scope="col">Wilayah</th>
          <th scope="col">Daerah</th>
          <th scope="col">Kecamatan</th>
          <th scope="col">Kabupaten</th>
          <th scope="col">Provinsi</th>
          <th scope="col">Dropsot</th>
          <th scope="col">Area</th>
          <th scope="col">Tarif</th>
          <th scope="col">Jumlah Bayar</th>
          <th scope="col">Status Pembayaran</th>
        </tr>
      </thead>
      <tbody>
        <!-- @dblclick="form.handleDoubleClik(d)" -->
        <tr v-for="(d, i) in table.items" :key="i">
          <td>{{ i + 1 + (table.params.page - 1) * table.params.limit }}</td>
          <td>{{ d.santri.raw.warga_pesantren.niup }}</td>
          <td>{{ d.santri.raw.nama_lengkap }}</td>
          <td>
            {{
              d.santri.raw.domisili_santri[
                d.santri.raw.domisili_santri.length - 1
              ].wilayah
            }}
          </td>
          <td>
            {{
              d.santri.raw.domisili_santri[
                d.santri.raw.domisili_santri.length - 1
              ].wilayah
            }}
          </td>
          <td>{{ d.santri.raw.kecamatan }}</td>
          <td>{{ d.santri.raw.kabupaten }}</td>
          <td>{{ d.santri.raw.provinsi }}</td>
          <td v-if="d.dropspot">{{ d.dropspot.nama }}</td>
          <td v-else class="text-danger"><i>belum-ditentukan</i></td>
          <td v-if="d.dropspot">
            {{ d.dropspot.area.nama }}
          </td>
          <td v-else class="text-danger"><i>belum-ditentukan</i></td>
          <td v-if="d.dropspot">{{ "Rp. " + d.dropspot.harga }}</td>
          <td v-else class="text-danger">Rp. 0</td>
          <td>{{ "Rp. " + d.jumlah_bayar }}</td>
          <td>
            <i>{{ d.status_bayar }}</i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <app-paginate
    v-if="table.meta['x_total_data']"
    :meta="table.meta"
    :per_page="table.params.limit"
    @set-page="(val) => table.setPage(val)"
    @next="table.nexPage"
    @prev="table.prevPage"
    @last="table.setPage"
    @first="table.setPage"
  />
  <!-- modal tambah -->
  <!-- <div
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
          <h1 class="modal-title fs-5" id="modalTambahLabel">Tambah Dropsot</h1>
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
            <select class="form-select" v-model="form.form.area_id">
              <option value="" selected>Pilih Area</option>
              <option v-for="a in form.isArea" :key="a" :value="a.id">
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
          >
            Tutup
          </button>
          <button class="btn btn-sm btn-primary" @click="form.tambahData">
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div> -->
  <!-- modal edit data -->
  <!-- <div
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
          <h1 class="modal-title fs-5" id="modalEditLabel">Edit Dropspot</h1>
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
            <select class="form-select" v-model="form.form.area_id">
              <option value="" selected>
                {{ form.namaArea }}
              </option>
              <option v-for="a in form.isArea" :key="a" :value="a.id">
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
          >
            Tutup
          </button>
          <button class="btn btn-sm btn-danger" @click="form.deleteData">
            Hapus
          </button>
          <button class="btn btn-sm btn-primary" @click="form.editData">
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div> -->
</template>
<script setup>
import { onMounted } from "vue";
import { usePenumpangTable } from "../../store/penumpang/table";

const table = usePenumpangTable();

onMounted(() => {
  table.getData();
});
</script>
