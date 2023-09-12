<template>
  <!-- judul -->
  <h3 class="titlePage">Data User</h3>
  <hr />
  <!-- menu filter -->
  <div class="filter-box row">
    <div class="col-md-2">
      <select
        class="form-select form-select-sm"
        v-model="table.params.role"
        @change="table.getData"
      >
        <option
          value=""
          selected
        >Semua Hak Akses</option>
        <option
          v-for="r in table.roles"
          :key="r"
          :value="r.key"
        >
          {{ r.value }}
        </option>
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
        placeholder="Cari User ..."
        @keyup="table.getData"
      />
    </div>
  </div>
  <!-- tombol tambah data -->
  <button
    class="btn btn-sm btn-primary"
    @click="form.setOpenAdd"
  >
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
          <td>{{ d.nama_lengkap }}</td>
          <td>{{ "@" + d.username }}</td>
          <td>{{ d.role }}</td>
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
          <h1
            class="modal-title fs-5"
            id="modalTambahLabel"
          >Tambah User</h1>
          <button
            class="btn-close"
            type="button"
            @click="form.setOpenAdd"
          ></button>
        </div>
        <form @submit.prevent="form.tambahData">
          <div class="modal-body">
            <button
              v-if="form.mode === 'external'"
              class="btn btn-outline-primary btn-sm me-2 mb-3"
              @click="form.setInternalMode"
              type="button"
            >
              Internal
            </button>
            <button
              v-if="form.mode === 'internal'"
              class="btn btn-outline-primary btn-sm me-2 mb-3"
              @click="form.setExternalMode"
              type="button"
            >
              External
            </button>
            <input
              type="hidden"
              v-model="form.formInt.niup"
            />
            <div
              class="form-group mb-3"
              v-if="form.mode === 'internal'"
            >
              <div class="input-group mb-3">
                <input
                  type="text"
                  v-model="form.namaPerson"
                  class="form-control"
                  placeholder="Pilih Person .."
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
            <div
              class="form-group mb-3"
              v-if="form.mode === 'external'"
            >
              <small>Nama Lengkap</small>
              <input
                type="text"
                v-model="form.formInt.nama_lengkap"
                placeholder="Masukkan nama .."
                class="form-control mt-2"
              />
            </div>
            <div class="form-group mb-3">
              <small>Hak Akses</small>
              <select
                class="form-select"
                v-model="form.formInt.role"
                :disabled="form.mode === 'external'"
              >
                <option
                  value=""
                  selected
                >Pilih Hak Akses</option>
                <option
                  v-for="r in table.roles"
                  :key="r.key"
                  :value="r.key"
                >
                  {{ r.value }}
                </option>
              </select>
            </div>
            <div
              class="form-group mb-3"
              v-if="form.formInt.role === 'p4nj'"
            >
              <small>Area</small>
              <select
                class="form-select"
                v-model="form.formInt.area_id"
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
              <small>Username</small>
              <input
                type="text"
                v-model="form.formInt.username"
                placeholder="Masukkan username .."
                class="form-control mt-2"
              />
            </div>
            <div class="form-group mb-3">
              <small>No HP (Optional)</small>
              <input
                type="number"
                v-model="form.formInt.no_hp"
                placeholder="Masukkan nomer hp .."
                class="form-control mt-2"
              />
            </div>
            <div class="form-group mb-3">
              <small>Password</small>
              <input
                type="password"
                v-model="form.formInt.password"
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
          >Edit User</h1>
          <button
            class="btn-close"
            type="button"
            @click="form.setOpenEdit"
          ></button>
        </div>
        <form @submit.prevent="form.editData">
          <div class="modal-body">
            <input
              type="hidden"
              v-model="form.formEdit.santri_uuid"
            />
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
              <small>No HP (Optional)</small>
              <input
                type="text"
                v-model="form.formEdit.no_hp"
                placeholder="Masukkan nomer hp .."
                class="form-control mt-2"
              />
            </div>
            <div class="form-group mb-3">
              <small>Hak Akses</small>
              <select
                class="form-select"
                v-model="form.formEdit.role"
                :disabled="form.editMode === 'external'"
              >
                <!-- <option value="" selected>{{ form.roleValue }}</option> -->
                <option
                  v-for="r in table.roles"
                  :key="r.key"
                  :value="r.key"
                >
                  {{ r.value }}
                </option>
              </select>
            </div>
            <div
              class="form-group mb-3"
              v-if="form.formEdit.role === 'p4nj'"
            >
              <small>Area</small>
              <select
                class="form-select"
                v-model="form.formEdit.area_id"
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
            <button
              type="submit"
              class="btn btn-sm btn-primary"
            >Simpan</button>
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
          <h1
            class="modal-title fs-5"
            id="modalEditLabel"
          >Update Password</h1>
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
            <button
              type="submit"
              class="btn btn-sm btn-primary"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- modal pilih user -->
  <div
    class="modal fade modal-lg"
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
          <h1
            class="modal-title fs-5"
            id="modalEditLabel"
          >
            Cari Santri/Pengurus By NIUP
          </h1>
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
              v-model="form.niup"
              placeholder="Masukkan NIUP"
              class="form-control mt-2"
            />
          </div>
          <button
            class="btn btn-sm btn-warning"
            @click="form.getByNiup"
          >
            Preview
          </button>
          <hr />
          <div
            class="text-center"
            v-if="form.personUser.warga_pesantren"
          >
            <img
              v-show="form.fotoDiri != ''"
              :src="form.fotoDiri"
              alt="pohto-profile"
              width="200"
              class="img-thumbnail"
            />
            <p class="fw-bold mb-0">NIUP :</p>
            <p class="mb-0">
              {{ form.personUser ? form.personUser.warga_pesantren.niup : "-" }}
            </p>
            <p class="fw-bold mb-0">Nama :</p>
            <p class="mb-0">
              {{ form.personUser ? form.personUser.nama_lengkap : "-" }}
            </p>
            <p class="fw-bold mb-0">Tetala :</p>
            <p class="mb-0">
              {{
                form.personUser
                  ? form.personUser.tempat_lahir +
                    ", " +
                    form.personUser.tanggal_lahir
                  : "-"
              }}
            </p>
          </div>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-sm btn-success"
            @click="
              form.handleUserPilih(
                form.personUser.nama_lengkap,
                form.personUser.warga_pesantren.niup
              )
            "
          >
            Pilih
          </button>
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

onMounted(() => {
  table.getData();
  form.getArea();
});
</script>
