<template>
  <!-- judul -->
  <h3>Data Area</h3>
  <hr />
  <!-- jumlah data dan pencarian -->
  <div class="search-box row">
    <div class="col-md-10 d-flex align-items-center mb-2">
      <small>Total data {{ jumlahData }}</small>
    </div>
    <div class="col-md-2 d-flex align-items-center">
      <input
        type="text"
        v-model="cariArea"
        @keyup="getData"
        class="form-control form-control-sm mb-2"
        placeholder="Cari Area ..."
      />
    </div>
  </div>
  <hr />
  <!-- tombol tambah data -->
  <button
    type="button"
    class="btn btn-sm btn-primary"
    @click="showModalTambah = true"
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
          v-for="(a, index) in area"
          :key="a.id"
          @dblclick="handleDoubleClick(a.id, a.nama, a.pic, a.no_hp)"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ a.nama }}</td>
          <td>{{ a.pic }}</td>
          <td>{{ a.no_hp }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- modal untuk tambah data -->
  <div
    class="modal fade"
    v-if="showModalTambah"
    :class="{ show: showModalTambah }"
    style="display: block"
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
            @click="showModalTambah = false"
          ></button>
        </div>
        <div class="modal-body">
          <div class="form-group mb-3">
            <small>Nama Area</small>
            <input
              type="text"
              v-model="namaTambah"
              class="form-control mt-2"
              placeholder="Masukkan nama area .."
            />
          </div>
          <div class="form-group mb-3">
            <small>PIC</small>
            <input
              type="text"
              v-model="picTambah"
              class="form-control mt-2"
              placeholder="Masukkan nama pic .."
            />
          </div>
          <div class="form-group mb-3">
            <small>No. HP</small>
            <input
              type="text"
              v-model="noHpTambah"
              class="form-control mt-2"
              placeholder="Masukkan nomer handphone pic .."
            />
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-sm btn-secondary"
            @click="showModalTambah = false"
          >
            Tutup
          </button>
          <button
            type="button"
            class="btn btn-sm btn-primary"
            @click="tambahData"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- modal edit data -->
  <div
    class="modal fade"
    v-if="showModalEdit"
    :class="{ show: showModalEdit }"
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
            @click="showModalEdit = false"
          ></button>
        </div>
        <div class="modal-body">
          <div class="modal-body">
            <div class="form-group mb-3">
              <small>Nama Area</small>
              <input
                type="text"
                v-model="namaEdit"
                class="form-control mt-2"
                placeholder="Masukkan nama area .."
              />
            </div>
            <div class="form-group mb-3">
              <small>PIC</small>
              <input
                type="text"
                v-model="picEdit"
                class="form-control mt-2"
                placeholder="Masukkan nama pic .."
              />
            </div>
            <div class="form-group mb-3">
              <small>No. HP</small>
              <input
                type="text"
                v-model="noHpEdit"
                class="form-control mt-2"
                placeholder="Masukkan nomer handphone pic .."
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-sm btn-secondary"
              @click="showModalEdit = false"
            >
              Tutup
            </button>
            <button
              type="button"
              class="btn btn-sm btn-danger"
              @click="deleteData"
            >
              Hapus
            </button>
            <button
              type="button"
              class="btn btn-sm btn-primary"
              @click="editData"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      // status component
      showModalTambah: false,
      showModalEdit: false,
      // tambah data
      namaTambah: "",
      picTambah: "",
      noHpTambah: null,
      // edit data
      namaEdit: "",
      picEdit: "",
      noHpEdit: null,
      editAreaId: null,
      // filter dan pencarian
      cariArea: "",
      // data utama
      area: [],
      jumlahData: 0,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const result = await axios.get("http://localhost:4001/area", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
        params: {
          cari: this.cariArea,
        },
      });
      this.area = result.data.data;
      this.jumlahData = result.headers["x_total_data"];
    },
    handleDoubleClick(id, nama, pic, no_hp) {
      this.editAreaId = id;
      this.namaEdit = nama;
      this.picEdit = pic;
      this.noHpEdit = no_hp;
      this.showModalEdit = true;
    },
    async tambahData() {
      const tambahAreaData = {
        nama: this.namaTambah,
        pic: this.picTambah,
        no_hp: this.noHpTambah,
      };
      try {
        const result = await axios.post(
          "http://localhost:4001/area",
          tambahAreaData,
          {
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        );

        this.showModalTambah = false;
        Swal.fire("Berhasil", result.data.message, "success");
        this.getData();
        this.namaTambah = "";
        this.picTambah = "";
        this.noHpTambah = "";
      } catch (err) {
        console.log(err.response);
        Swal.fire(err.response.data.message, err.response.data.error, "error");
      }
    },
    async editData() {
      const editAreaData = {
        nama: this.namaEdit,
        pic: this.picEdit,
        no_hp: this.noHpEdit,
      };
      try {
        const result = await axios.put(
          `http://localhost:4001/area/${this.editAreaId}`,
          editAreaData,
          {
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        );

        this.showModalEdit = false;
        Swal.fire("Berhasil", result.data.message, "success");
        this.getData();
      } catch (err) {
        console.log(err.response);
        Swal.fire(err.response.data.message, err.response.data.error, "error");
      }
    },
    async deleteData() {
      Swal.fire({
        title: "Konfirmasi",
        text: "Apakah anda yakin ingin menghapus data ?",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Hapus",
        confirmButtonColor: "#DC3545",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axios
            .delete(`http://localhost:4001/area/${this.editAreaId}`, {
              headers: {
                "x-auth-token": localStorage.getItem("token"),
              },
            })
            .then((result) => {
              this.showModalEdit = false;
              Swal.fire("Berhasil", result.data.message, "success");
              this.getData();
            });
        }
      });
    },
  },
};
</script>
