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
    <div class="col-md-2">
      <select
        class="form-select form-select-sm mb-2"
        v-model="table.params.pembayaran"
        @change="table.getData"
      >
        <option value="" selected>Semua Status Pembayaran</option>
        <option value="belum-lunas">Belum Lunas</option>
        <option value="lunas">Lunas</option>
        <option value="kurang">Kurang</option>
        <option value="lebih">Lebih</option>
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
          <th scope="col">Dropsot</th>
          <th scope="col">Area</th>
          <th scope="col">Tarif</th>
          <th scope="col">Jumlah Bayar</th>
          <th scope="col">Status Pembayaran</th>
          <th scope="col">Wilayah</th>
          <th scope="col">Daerah</th>
          <th scope="col">Kecamatan</th>
          <th scope="col">Kabupaten</th>
          <th scope="col">Provinsi</th>
        </tr>
      </thead>
      <tbody>
        <!-- @dblclick="form.handleDoubleClik(d)" -->
        <tr
          v-for="(d, i) in table.items"
          :key="i"
          @contextmenu.prevent="form.showContextMenu($event, d)"
        >
          <td>{{ i + 1 + (table.params.page - 1) * table.params.limit }}</td>
          <td>{{ d.santri.niup }}</td>
          <td>{{ d.santri.nama_lengkap }}</td>
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
            <i
              v-if="d.status_bayar === 'belum-lunas'"
              class="badge bg-danger"
              >{{ d.status_bayar }}</i
            >
            <i v-if="d.status_bayar === 'lunas'" class="badge bg-success">{{
              d.status_bayar
            }}</i>
            <i v-if="d.status_bayar === 'kurang'" class="badge bg-warning">{{
              d.status_bayar
            }}</i>
            <i v-if="d.status_bayar === 'lebih'" class="badge bg-info">{{
              d.status_bayar
            }}</i>
          </td>
          <td>
            {{ d.santri.wilayah }}
          </td>
          <td>
            {{ d.santri.blok }}
          </td>
          <td>{{ d.santri.kecamatan }}</td>
          <td>{{ d.santri.kabupaten }}</td>
          <td>{{ d.santri.provinsi }}</td>
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
  <div
    v-if="form.contextMenuVisible"
    class="context-menu"
    :style="{
      top: `${form.contextMenuPosition.y}px`,
      left: `${form.contextMenuPosition.x}px`,
    }"
  >
    <ul class="list-group list-group-flush">
      <li class="list-group-item px-5" @click="form.handleOpenEditDropspot">
        Ubah Dropsot
      </li>
      <li class="list-group-item px-5" @click="form.handleOpenEditPembayaran">
        Ubah Status Pembayaran
      </li>
      <li class="list-group-item px-5" @click="form.goToDetail">
        Lihat Detail Rombongan
      </li>
    </ul>
  </div>
  <!-- modal edit data dropspot -->
  <div
    class="modal fade"
    v-if="form.isOpenEditDropspot === true"
    :class="{ show: form.isOpenEditDropspot }"
    style="display: block"
    id="modalEdit"
    tabindex="-1"
    aria-labelledby="modalEditLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modalEditLabel">Edit Dropsot</h1>
          <button
            class="btn-close"
            type="button"
            @click="form.setOpenEditDropspot"
          ></button>
        </div>
        <form @submit.prevent="form.editDropspot">
          <div class="modal-body">
            <div class="form-group mb-3">
              <small>Area</small>
              <select
                class="form-select"
                v-model="form.idArea"
                @change="form.getDropspot"
              >
                <option value="" selected>Pilih Area</option>
                <option v-for="a in form.isArea" :key="a" :value="a.id">
                  {{ a.nama }}
                </option>
              </select>
            </div>
            <div class="form-group mb-3">
              <small>Dropspot</small>
              <select
                class="form-select"
                v-model="form.formEditDropspot.dropspot_id"
                :disabled="form.idArea === ''"
              >
                <option
                  v-if="form.formEditDropspot.dropspot_id === ''"
                  value=""
                  selected
                >
                  Pilih Dropspot
                </option>
                <option v-for="d in form.isDropspot" :key="d" :value="d.id">
                  {{ d.nama }}
                </option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-sm btn-secondary"
              @click="form.setOpenEditDropspot"
            >
              Tutup
            </button>
            <button type="submit" class="btn btn-sm btn-primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- modal edit data pembayaran -->
  <div
    class="modal fade"
    v-if="form.isOpenEditPembayaran === true"
    :class="{ show: form.isOpenEditPembayaran }"
    style="display: block"
    id="modalEdit"
    tabindex="-1"
    aria-labelledby="modalEditLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modalEditLabel">Edit Pembayaran</h1>
          <button
            class="btn-close"
            type="button"
            @click="form.setOpenEditPembayaran"
          ></button>
        </div>
        <form @submit.prevent="form.editPembayaran">
          <div class="modal-body">
            <div class="form-group mb-3">
              <small>Jumlah Pembayaran</small>
              <input
                type="number"
                class="form-control mt-2"
                v-model="form.formEditPembayaran.jumlah_bayar"
              />
            </div>
            <div class="form-group mb-3">
              <small>Status Pembayaran</small>
              <select
                class="form-select"
                v-model="form.formEditPembayaran.status_bayar"
              >
                <option value="" selected>Pilih Status</option>
                <option value="lunas" selected>Lunas</option>
                <option value="belum-lunas" selected>Belum Lunas</option>
                <option value="lebih" selected>Lebih</option>
                <option value="kurang" selected>Kurang</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-sm btn-secondary"
              @click="form.setOpenEditPembayaran"
            >
              Tutup
            </button>
            <button type="submit" class="btn btn-sm btn-primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { usePenumpangTable } from "../../store/penumpang/table";
import { usePenumpangForm } from "../../store/penumpang/form";

const table = usePenumpangTable();
const form = usePenumpangForm();

onMounted(() => {
  table.getData();
});
</script>

<style>
.context-menu {
  position: absolute;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 999;
}

.context-menu li:hover {
  cursor: pointer;
  background-color: #003e1e;
  color: white;
}
</style>
