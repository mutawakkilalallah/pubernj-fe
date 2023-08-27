<template>
  <!-- judul -->
  <div class="row">
    <div class="col-md-8">
      <h3 class="titlePage">Data Armada</h3>
    </div>
    <div
      class="col-md-4 text-end"
      v-if="
        storeAuth.user.role != 'pendamping' && storeAuth.user.role != 'p4nj'
      "
    >
      <button
        class="btn btn-sm btn-outline-primary"
        type="button"
        @click="pagePrint"
      >
        Page Print
      </button>
    </div>
  </div>
  <hr />
  <!-- menu filter -->
  <div class="filter-box row">
    <div class="col-md-2" v-if="storeAuth.user.role != 'pendamping'">
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
        <option value="minibus" selected>MINIBUS</option>
        <option value="elf" selected>ELF</option>
        <option value="hiace" selected>HIACE</option>
        <option value="mpv" selected>MPV</option>
      </select>
      <select
        class="form-select form-select-sm mb-2"
        v-model="table.params.jenis"
        @change="table.getData"
      >
        <option value="" selected>Semua Jenis</option>
        <option value="putra" selected>PUTRA</option>
        <option value="putri" selected>PUTRI</option>
      </select>
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
        placeholder="Cari Armada ..."
        @keyup="table.getData"
      />
    </div>
  </div>
  <!-- tombol tambah data -->
  <button
    v-if="table.user.role == 'sysadmin' || table.user.role == 'armada'"
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
          <th scope="col">Jenis</th>
          <th
            scope="col"
            v-if="
              storeAuth.user.role === 'sysadmin' ||
              storeAuth.user.role === 'admin'
            "
          >
            Penumpang
          </th>
          <th
            scope="col"
            v-if="
              storeAuth.user.role === 'sysadmin' ||
              storeAuth.user.role === 'admin'
            "
          >
            Pendamping
          </th>
          <th scope="col">Dropspot</th>
          <th scope="col">Harga</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(d, i) in table.items"
          :key="i"
          @dblclick="
            (storeAuth.user.role === 'sysadmin' ||
              storeAuth.user.role === 'admin') &&
              form.handleDoubleClik(d)
          "
        >
          <td>{{ i + 1 }}</td>
          <td>{{ d.nama }}</td>
          <td>{{ d.type.toUpperCase() }}</td>
          <td>{{ d.jenis.toUpperCase() }}</td>
          <td
            v-if="
              storeAuth.user.role === 'sysadmin' ||
              storeAuth.user.role === 'admin'
            "
          >
            <router-link :to="{ name: 'armada-detail', params: { id: d.id } }">
              <button class="btn btn-primary btn-sm">
                <font-awesome-icon icon="clipboard" class="icon" /> Daftar
                Penumpang
              </button>
            </router-link>
          </td>
          <td
            v-if="
              storeAuth.user.role === 'sysadmin' ||
              storeAuth.user.role === 'admin'
            "
          >
            <button
              class="btn btn-primary btn-sm"
              @click="form.setOpenPendamping(d)"
            >
              <font-awesome-icon icon="user-md" class="icon" /> Pendamping
            </button>
          </td>
          <td>{{ d.dropspot.nama }}</td>
          <td>{{ forMat(d.dropspot.harga) }}</td>
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
              <small>Urutan Armada</small>
              <input
                type="text"
                v-model="form.form.nama"
                placeholder="Masukkan urutan armada .."
                class="form-control mt-2"
              />
              <small class="text-danger"
                >*) saat membuat armada penamaan masukkan urutan saja contoh
                1,2,3 dari setiap dropspot</small
              >
            </div>
            <div class="form-group mb-3">
              <small>Type</small>
              <select class="form-select" v-model="form.form.type">
                <option value="" selected>Pilih Type</option>
                <option value="bus" selected>bus</option>
                <option value="minibus" selected>minibus</option>
                <option value="elf" selected>elf</option>
                <option value="hiace" selected>hiace</option>
                <option value="mpv" selected>mpv</option>
              </select>
            </div>
            <div class="form-group mb-3">
              <small>Jenis</small>
              <select class="form-select" v-model="form.form.jenis">
                <option value="" selected>Pilih Jenis</option>
                <option value="putra" selected>putra</option>
                <option value="putri" selected>putri</option>
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
            <div class="form-group mb-3">
              <small>Harga Armada</small>
              <input
                type="text"
                v-model="form.form.harga"
                placeholder="Masukkan harga armada .."
                class="form-control mt-2"
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
                <option value="minibus" selected>minibus</option>
                <option value="elf" selected>elf</option>
                <option value="hiace" selected>hiace</option>
                <option value="mpv" selected>mpv</option>
              </select>
            </div>
            <div class="form-group mb-3">
              <small>Jenis</small>
              <select class="form-select" v-model="form.form.jenis">
                <option value="putra" selected>putra</option>
                <option value="putri" selected>putri</option>
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
                <!-- <option value="" selected>{{ form.namaDropsot }}</option> -->
                <option v-for="d in form.isDropspot" :key="d" :value="d.id">
                  {{ d.nama }}
                </option>
              </select>
            </div>
            <div class="form-group mb-3">
              <small>Harga Armada</small>
              <input
                type="text"
                v-model="form.form.harga"
                placeholder="Masukkan harga armada .."
                class="form-control mt-2"
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
  <!-- modal Tambah Pendamping -->
  <div
    class="modal fade modal-lg"
    v-if="form.isOpenPendamping === true"
    :class="{ show: form.isOpenPendamping }"
    style="display: block"
    id="modalEdit"
    tabindex="-1"
    aria-labelledby="modalEditLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modalEditLabel">
            Kelola Pendamping
          </h1>
          <button
            class="btn-close"
            type="button"
            @click="form.setOpenPendamping"
          ></button>
        </div>
        <form>
          <div class="modal-body">
            <p>
              <b>Nama Pendamping : </b
              >{{
                form.data_pendamping ? form.data_pendamping.nama_lengkap : "-"
              }}
            </p>
            <p>
              <b>NO. HP : </b
              >{{ form.data_pendamping ? form.data_pendamping.no_hp : "-" }}
            </p>
            <button
              v-if="form.data_pendamping.nama_lengkap"
              type="button"
              class="btn btn-sm btn-danger"
              @click="form.deletePendamping()"
            >
              HAPUS PENDAMPING
            </button>
          </div>
          <div class="modal-body">
            <input
              type="text"
              v-model="table.paramsPendamping.cari"
              class="form-control mb-2"
              placeholder="Cari Pendamping ..."
              @keyup="table.getPendamping"
            />
            <div class="table-responsive">
              <table class="table table-sm table-hover mt-3">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Nama</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(d, i) in table.itemsPendamping" :key="i">
                    <td>{{ i + 1 }}</td>
                    <td>{{ d.nama_lengkap }}</td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-primary btn-sm"
                        @click="form.setPendamping(d.uuid)"
                      >
                        Pilih
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-sm btn-secondary"
              @click="form.setOpenPendamping"
            >
              Tutup
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
import router from "../../router";
import { useAuthStore } from "../../store/auth/index";

const table = useArmadaTable();
const form = useArmadaForm();
const storeAuth = useAuthStore();

function pagePrint() {
  router.replace("/armada-print");
}
const forMat = (i) => {
  return "Rp. " + i.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
};

onMounted(() => {
  table.getData();
  form.getArea();
});
</script>
