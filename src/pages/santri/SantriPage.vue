<template>
  <!-- judul -->
  <h3 class="titlePage">Data Santri</h3>
  <!-- {{ paginate }} -->
  <hr />
  <!-- menu filter -->
  <div class="filter-box row">
    <div class="col-md-2">
      <select
        class="form-select form-select-sm mb-2"
        v-model="table.params.wilayah"
        @change="table.getBlok"
      >
        <option value="" selected>Semua Wilayah</option>
        <option
          v-for="w in table.filter.wilayah"
          :key="w"
          :value="w.alias_wilayah"
        >
          {{ w.wilayah }}
        </option>
      </select>
      <select
        class="form-select form-select-sm mb-2"
        :disabled="table.params.wilayah === ''"
        v-model="table.params.blok"
        @change="table.getData"
      >
        <option value="" selected>Semua Daerah</option>
        <option v-for="b in table.filter.blok" :key="b" :value="b.id_blok">
          {{ b.blok }}
        </option>
      </select>
    </div>
    <div class="col-md-2">
      <select
        class="form-select form-select-sm mb-2"
        v-model="table.params.status_kepulangan"
        @change="table.getData"
      >
        <option value="" selected>Semua Status Kepulangan</option>
        <option value="rombongan">Rombongan</option>
        <option value="non-rombongan">Non Rombongan</option>
      </select>
      <select
        class="form-select form-select-sm mb-2"
        v-model="table.params.jenis_kelamin"
        @change="table.getData"
      >
        <option value="" selected>Semua Jenis Kelamin</option>
        <option value="L">Laki-Laki</option>
        <option value="P">Perempuan</option>
      </select>
    </div>
  </div>
  <!-- jumlah data dan pencarian -->
  <div class="serach-box row mt-2">
    <div class="col-md-6 mb-2 d-flex">
      <div class="col-auto me-2">
        <select
          class="form-select form-select-sm mb-2"
          v-model="table.params.limit"
          @change="table.getData"
        >
          <option value="25" selected>25</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="250">250</option>
          <option value="500">500</option>
          <option value="1000">1000</option>
        </select>
      </div>
      <div class="col-auto">
        <div class="form-control-plaintext form-control-sm">
          Total data {{ table.meta["x_total_data"] }}
        </div>
      </div>
    </div>
    <div class="col-md-6 mb-2">
      <div class="row justify-content-end">
        <div class="col-md-3">
          <input
            type="text"
            v-model="table.params.cari"
            class="form-control form-control-sm mb-2"
            placeholder="Cari Santri ..."
            @update:model-value="table.searchPage"
          />
        </div>
        <div class="col-auto d-flex flex-column align-items-end">
          <button class="btn btn-danger btn-sm" @click="table.handleReset">
            RESET
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="table-responsive">
    <table class="table table-sm table-hover mt-3">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">NIUP</th>
          <th scope="col">Nama Lengkap</th>
          <th scope="col">JK</th>
          <th scope="col">Wilayah</th>
          <th scope="col">Daerah</th>
          <th scope="col">Kab/Kota</th>
          <th scope="col">Status Kepulangan</th>
        </tr>
      </thead>
      <tbody>
        <tr
          style="cursor: pointer"
          v-for="(d, i) in table.items"
          :key="i"
          @dblclick="table.handleDoubelClick(d.uuid)"
        >
          <td>
            {{ i + 1 + (table.params.page - 1) * table.params.limit }}
          </td>
          <td>{{ d.niup }}</td>
          <td>{{ d.nama_lengkap }}</td>
          <td>{{ d.jenis_kelamin }}</td>
          <td>
            {{ d.wilayah ? d.wilayah : "-" }}
          </td>
          <td>
            {{ d.blok ? d.blok : "-" }}
          </td>
          <td>{{ d.kabupaten }}</td>
          <td
            class="text-capitalize"
            v-if="d.status_kepulangan === 'non-rombongan'"
          >
            <small class="badge bg-danger">{{ d.status_kepulangan }}</small>
          </td>
          <td class="text-capitalize" v-else>
            <small class="badge bg-success">{{ d.status_kepulangan }}</small>
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
  <!-- modal detail data -->
  <div
    class="modal fade modal-lg"
    v-if="table.isOpenDetail === true"
    :class="{ show: table.isOpenDetail }"
    style="display: block"
    id="modalDetail"
    tabindex="-1"
    aria-labelledby="modalDetailLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modalDetailLabel">Detail Santri</h1>
          <button
            class="btn-close"
            type="button"
            @click="table.isOpenDetail = false"
          ></button>
        </div>
        <div class="modal-body">
          <p class="alert alert-secondary p-1" role="alert">
            <i
              ><font-awesome-icon icon="bell" class="icon" /> Data santri hanya
              bersifat temporary sebagai kebutuhan Pulang Bersama, untuk data
              lebih detail silahkan lihat di Aplikasi PEDATREN</i
            >
          </p>

          <div class="row">
            <div class="col-md-8 order-sm-2 order-md-2">
              <div class="mb-3 row">
                <label class="col-sm-4 col-form-label">NIUP</label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    readonly
                    class="form-control-plaintext"
                    v-model="table.item.niup"
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-4 col-form-label">Nama Lengkap</label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    readonly
                    class="form-control-plaintext"
                    v-model="table.item.nama_lengkap"
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-4 col-form-label">Tanggal Lahir</label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    readonly
                    class="form-control-plaintext"
                    :value="
                      table.item.raw.tempat_lahir +
                      ', ' +
                      table.item.raw.tanggal_lahir
                    "
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-4 col-form-label">Wilayah</label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    readonly
                    class="form-control-plaintext"
                    v-model="table.item.wilayah"
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-4 col-form-label">Daerah</label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    readonly
                    class="form-control-plaintext"
                    v-model="table.item.blok"
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-4 col-form-label">Kamar</label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    readonly
                    class="form-control-plaintext"
                    v-model="
                      table.item.raw.domisili_santri[
                        table.item.raw.domisili_santri.length - 1
                      ].kamar
                    "
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-4 col-form-label">Kecamatan</label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    readonly
                    class="form-control-plaintext"
                    :value="table.item.raw.kecamatan"
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-4 col-form-label">Kabupaten</label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    readonly
                    class="form-control-plaintext"
                    :value="table.item.raw.kabupaten"
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label class="col-sm-4 col-form-label">Provinsi</label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    readonly
                    class="form-control-plaintext"
                    :value="table.item.raw.provinsi"
                  />
                </div>
              </div>
            </div>
            <div class="col-md-4 order-sm-1 order-md-2 mb-5 text-end">
              <img
                :src="table.fotoDiri"
                alt="foto-diri"
                class="img-thumbnail"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <router-link
            v-if="table.item.status_kepulangan === 'rombongan'"
            :to="{
              name: 'penumpang-detail',
              params: { uuid: table.item.uuid },
            }"
          >
            <button
              class="btn btn-primary"
              type="button"
              @click="table.isOpenDetail = false"
            >
              Lihat Data Rombongan
            </button>
          </router-link>
          <button
            v-else-if="
              table.item.status_kepulangan === 'non-rombongan' &&
              storeAuth.user.role != 'keuangan' &&
              storeAuth.user.role != 'armada' &&
              storeAuth.user.role != 'p4nj' &&
              storeAuth.user.role != 'supervisor'
            "
            class="btn btn-primary"
            type="button"
            @click="form.isOpenEdit = true"
          >
            Daftarkan Rombongan
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            @click="table.isOpenDetail = false"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- edit data dropsot -->
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
          <h1 class="modal-title fs-5" id="modalEditLabel">Edit Dropsot</h1>
          <button
            class="btn-close"
            type="button"
            @click="form.setOpenEdit"
          ></button>
        </div>
        <form @submit.prevent="form.editData()">
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
              @click="form.setOpenEdit"
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
import { useSantriTable } from "../../store/santri/table";
import { useSantriForm } from "../../store/santri/form";
import { useAuthStore } from "../../store/auth/index";

const table = useSantriTable();
const form = useSantriForm();
const storeAuth = useAuthStore();

form.getArea();
table.getData();
table.getWilayah();
</script>

<style scoped>
input {
  font-size: 12px;
}
.form-control-plaintext {
  font-size: 12px;
}
.form-select {
  font-size: 12px;
}
.btn {
  font-size: 12px;
}
</style>
