<template>
  <!-- judul -->
  <h3>Data User</h3>
  <hr />
  <!-- menu filter -->
  <div class="filter-box mb-5 row">
    <div class="col-md-2">
      <select
        class="form-select form-select-sm"
        v-model="table.params.role"
        @change="table.getData"
      >
        <option value="" selected>Semua Hak Akses</option>
        <option v-for="r in table.roles" :key="r" :value="r.key">
          {{ r.value }}
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
        placeholder="Cari User ..."
        @keyup="table.getData"
      />
    </div>
  </div>
  <hr />
  <!-- tombol tambah data -->
  <button class="btn btn-sm btn-primary" @click="form.setOpenAdd">
    Tambah User
  </button>
  <!-- table data utama -->
  <div class="table-responsive">
    <table class="table table-sm table-hover mt-3">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Nama</th>
          <th scope="col">Username</th>
          <th scope="col">Hak Akses</th>
          <th scope="col">Daerah</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(d, i) in table.items"
          :key="i"
          @dblclick="form.handleDoubleClik(d)"
        >
          <td>{{ i + 1 }}</td>
          <td>{{ d.santri_nama }}</td>
          <td>{{ "@" + d.username }}</td>
          <td>{{ d.role }}</td>
          <td>
            {{ d.raw.domisili_santri[d.raw.domisili_santri.length - 1].blok }}
          </td>
          <td>
            <button
              @click="form.handleChangePassword(d)"
              class="btn btn-sm btn-primary"
            >
              Ubah Password
            </button>
          </td>
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
          <h1 class="modal-title fs-5" id="modalTambahLabel">Tambah User</h1>
          <button
            class="btn-close"
            type="button"
            @click="form.setOpenAdd"
          ></button>
        </div>
        <form @submit.prevent="form.tambahData">
          <div class="modal-body">
            <input type="hidden" v-model="form.form.santri_uuid" />
            <div class="form-group mb-3">
              <div class="input-group mb-3">
                <input
                  type="text"
                  v-model="form.namaSantri"
                  class="form-control"
                  placeholder="Pilih Santri .."
                  disabled
                  readonly
                  aria-describedby="basic-addon2"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-outline-secondary"
                    @click="form.setOpenPilihUser"
                    type="button"
                  >
                    <font-awesome-icon icon="pen-alt" />
                  </button>
                </div>
              </div>
            </div>
            <div class="form-group mb-3">
              <small>Hak Akses</small>
              <select class="form-select" v-model="form.form.role">
                <option value="" selected>Pilih Hak Akses</option>
                <option v-for="r in table.roles" :key="r.key" :value="r.key">
                  {{ r.value }}
                </option>
              </select>
            </div>
            <div class="form-group mb-3">
              <small>Username</small>
              <input
                type="text"
                v-model="form.form.username"
                placeholder="Masukkan username .."
                class="form-control mt-2"
              />
            </div>
            <div class="form-group mb-3">
              <small>Password</small>
              <input
                type="password"
                v-model="form.form.password"
                placeholder="Masukkan password .."
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
          <h1 class="modal-title fs-5" id="modalEditLabel">Edit User</h1>
          <button
            class="btn-close"
            type="button"
            @click="form.setOpenEdit"
          ></button>
        </div>
        <form @submit.prevent="form.editData">
          <div class="modal-body">
            <input type="hidden" v-model="form.formEdit.santri_uuid" />
            <div class="form-group mb-3">
              <small>Username</small>
              <input
                type="text"
                v-model="form.formEdit.username"
                placeholder="Masukkan username .."
                class="form-control mt-2"
              />
            </div>
            <div class="form-group mb-3">
              <small>Hak Akses</small>
              <select class="form-select" v-model="form.formEdit.role">
                <!-- <option value="" selected>{{ form.roleValue }}</option> -->
                <option v-for="r in table.roles" :key="r.key" :value="r.key">
                  {{ r.value }}
                </option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-sm btn-secondary"
              @click="form.isOpenEdit = false"
            >
              Tutup
            </button>
            <button
              type="button"
              class="btn btn-sm btn-danger"
              @click="form.deleteData"
            >
              Hapus
            </button>
            <button type="submit" class="btn btn-sm btn-primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- modal edit password -->
  <div
    class="modal fade"
    v-if="form.isOpenEditPassword === true"
    :class="{ show: form.isOpenEditPassword }"
    style="display: block"
    id="modalEdit"
    tabindex="-1"
    aria-labelledby="modalEditLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modalEditLabel">Update Password</h1>
          <button
            class="btn-close"
            type="button"
            @click="form.setOpenEditPassword"
          ></button>
        </div>
        <form @submit.prevent="form.editDataPassword">
          <div class="modal-body">
            <div class="form-group mb-3">
              <small>Password</small>
              <input
                type="password"
                v-model="form.formEditPassword.password"
                placeholder="Masukkan password .."
                class="form-control mt-2"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-sm btn-secondary"
              @click="form.setOpenEditPassword"
            >
              Tutup
            </button>
            <button type="submit" class="btn btn-sm btn-primary">
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- modal edit password -->
  <div
    class="modal fade modal-xl"
    v-if="form.isOpenPilihUser === true"
    :class="{ show: form.isOpenPilihUser }"
    style="display: block"
    id="modalEdit"
    tabindex="-1"
    aria-labelledby="modalEditLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modalEditLabel">Pilih User</h1>
          <button
            class="btn-close"
            type="button"
            @click="form.isOpenPilihUser = false"
          ></button>
        </div>
        <div class="modal-body">
          <div class="form-group mb-3">
            <p>Pilih Santri</p>
            <input
              type="text"
              v-model="form.cariSantri"
              placeholder="Pilih Nama Santri .."
              @keyup="form.getSantri"
              class="form-control mt-2"
            />
          </div>
          <hr />
          <div class="table-responsive">
            <table class="table table-sm table-hover mt-3">
              <thead>
                <tr>
                  <th scope="col">NIUP</th>
                  <th scope="col">Nama</th>
                  <th scope="col">Wilayah</th>
                  <th scope="col">Daerah</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(s, i) in form.santriUser"
                  :key="i"
                  @dblclick="form.handleUserPilih(s.uuid, s.nama_lengkap)"
                >
                  <td>{{ s.raw.warga_pesantren.niup }}</td>
                  <td>{{ s.raw.nama_lengkap }}</td>
                  <td>
                    {{
                      s.raw.domisili_santri[s.raw.domisili_santri.length - 1]
                        .wilayah
                    }}
                  </td>
                  <td>
                    {{
                      s.raw.domisili_santri[s.raw.domisili_santri.length - 1]
                        .blok
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-sm btn-secondary"
            @click="form.isOpenPilihUser = false"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { useUserFrom } from "../../store/user/form";
import { useUserTable } from "../../store/user/table";

const table = useUserTable();
const form = useUserFrom();
table.getData();
</script>
