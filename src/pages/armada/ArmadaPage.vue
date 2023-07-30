<template>
  <!-- judul -->
  <h3>Data Armada</h3>
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
        v-model="table.params.type"
        @change="table.getData"
      >
        <option value="" selected>Semua Type</option>
        <option value="bus" selected>BUS</option>
        <option value="mini_bus" selected>MINI BUS</option>
        <option value="elf" selected>ELF</option>
        <option value="hiace" selected>HIACE</option>
        <option value="mpv" selected>MPV</option>
      </select>
    </div>
  </div>
  <!-- jumlah data dan pencarian -->
  <div class="serach-box row">
    <div class="col-md-10 d-flex align-items-center mb-2">
      <small>Total data {{ table.meta["x_total_data"] }}</small>
    </div>
    <div class="col-md-2 d-flex align-items-center">
      <input
        type="text"
        v-model="table.params.cari"
        class="form-control form-control-sm mb-2"
        placeholder="Cari Armada ..."
        @keyup="table.getData"
      />
    </div>
  </div>
  <hr />
  <!-- tombol tambah data -->
  <button
    v-if="table.user.role == 'sysadmin'"
    class="btn btn-sm btn-primary"
    @click="form.setOpenAdd"
  >
    Tambah Armada
  </button>
  <!-- table data utama -->
  <div class="table-responsive">
    <table class="table table-sm table-hover mt-3">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Nama Armada</th>
          <th scope="col">Type</th>
          <th scope="col">Penumpang</th>
          <th scope="col">Dropspot</th>
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
          <td>{{ d.type.toUpperCase() }}</td>
          <td>
            <router-link :to="{ name: 'armada-detail', params: { id: d.id } }">
              <button class="btn btn-primary btn-sm">
                <font-awesome-icon icon="clipboard" class="icon" /> Daftar
                Penumpang
              </button>
            </router-link>
          </td>
          <td>{{ d.dropspot.nama }}</td>
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
          <h1 class="modal-title fs-5" id="modalTambahLabel">Tambah Armada</h1>
          <button
            class="btn-close"
            type="button"
            @click="form.setOpenAdd"
          ></button>
        </div>
        <form @submit.prevent="form.tambahData">
          <div class="modal-body">
            <div class="form-group mb-3">
              <small>Nama Armada</small>
              <input
                type="text"
                v-model="form.form.nama"
                placeholder="Masukkan nama armada .."
                class="form-control mt-2"
              />
            </div>
            <div class="form-group mb-3">
              <small>Type</small>
              <select class="form-select" v-model="form.form.type">
                <option value="" selected>Pilih Type</option>
                <option value="bus" selected>bus</option>
                <option value="mini_bus" selected>mini_bus</option>
                <option value="elf" selected>elf</option>
                <option value="hiace" selected>hiace</option>
                <option value="mpv" selected>mpv</option>
              </select>
            </div>
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
                v-model="form.form.dropspot_id"
                :disabled="form.idArea === ''"
              >
                <option value="" selected>Pilih Dropsot</option>
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
          <h1 class="modal-title fs-5" id="modalEditLabel">Edit Armada</h1>
          <button
            class="btn-close"
            type="button"
            @click="form.setOpenEdit"
          ></button>
        </div>
        <form @submit.prevent="form.editData">
          <div class="modal-body">
            <div class="form-group mb-3">
              <small>Nama Armada</small>
              <input
                type="text"
                class="form-control mt-2"
                v-model="form.form.nama"
              />
            </div>
            <div class="form-group mb-3">
              <small>Type</small>
              <select class="form-select" v-model="form.form.type">
                <option value="bus" selected>bus</option>
                <option value="mini_bus" selected>mini_bus</option>
                <option value="elf" selected>elf</option>
                <option value="hiace" selected>hiace</option>
                <option value="mpv" selected>mpv</option>
              </select>
            </div>
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
                v-model="form.form.dropspot_id"
                :disabled="form.idArea === ''"
              >
                <option v-if="form.form.dropspot_id === ''" value="" selected>
                  Pilih Dropspot
                </option>
                <option value="" selected>{{ form.namaDropsot }}</option>
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
import { useArmadaForm } from "../../store/armada/form";
import { useArmadaTable } from "../../store/armada/table";

const table = useArmadaTable();
const form = useArmadaForm();

onMounted(() => {
  table.getData();
  form.getArea();
});
</script>
