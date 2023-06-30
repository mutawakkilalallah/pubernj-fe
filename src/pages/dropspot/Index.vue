<template>
  <!-- judul -->
  <h3>Data Dropspot</h3>
  <hr />
  <!-- menu filter -->
  <div class="filter-box mb-5 row">
    <div class="col-md-2">
      <select
        v-model="filterAreaId"
        @change="getData"
        class="form-select form-select-sm"
      >
        <option value="" selected>Semua Area</option>
        <option v-for="a in area" :key="a.id" :value="a.id">
          {{ a.nama }}
        </option>
      </select>
    </div>
  </div>
  <!-- jumlah data dan pencarian -->
  <div class="search-box row">
    <div class="col-md-10 d-flex align-items-center mb-2">
      <!-- <select class="form-select-inline form-select-sm me-3">
        <option value="25" selected>25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select> -->
      <small>Total data {{ jumlahData }}</small>
    </div>
    <div class="col-md-2 d-flex align-items-center">
      <input
        type="text"
        v-model="cariDropspot"
        class="form-control form-control-sm mb-2"
        placeholder="Cari Dropspot ..."
        @keyup="getData"
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
    Tambah Dropspot
  </button>
  <!-- table data utama -->
  <div class="table-responsive">
    <table class="table table-sm table-hover mt-3">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Nama Dropspot</th>
          <th scope="col">Area</th>
          <th scope="col">Cakupan</th>
          <th scope="col">Harga</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(d, index) in dropspot"
          :key="d.id"
          @dblclick="
            handleDoubleClick(
              d.id,
              d.nama,
              d.area.id,
              d.area.nama,
              d.cakupan,
              d.harga
            )
          "
        >
          <td>{{ index + 1 }}</td>
          <td>{{ d.nama }}</td>
          <td>{{ d.area.nama }}</td>
          <td>{{ d.cakupan }}</td>
          <td>Rp. {{ d.harga }}</td>
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
          <h1 class="modal-title fs-5" id="modalTambahLabel">
            Tambah Dropspot
          </h1>
          <button
            type="button"
            class="btn-close"
            @click="showModalTambah = false"
          ></button>
        </div>
        <div class="modal-body">
          <div class="form-group mb-3">
            <small>Nama Dropspot</small>
            <input
              type="text"
              v-model="namaTambah"
              class="form-control mt-2"
              placeholder="Masukkan nama dropspot .."
            />
          </div>
          <div class="form-group mb-3">
            <small>Area</small>
            <select v-model="areaIdTambah" class="form-select">
              <option value="" selected>Pilih Area</option>
              <option v-for="a in area" :key="a.id" :value="a.id">
                {{ a.nama }}
              </option>
            </select>
          </div>
          <div class="form-group mb-3">
            <small>Cakupan Daerah</small>
            <input
              type="text"
              v-model="cakupanTambah"
              class="form-control mt-2"
              placeholder="Masukkan caukpan daerah .."
            />
          </div>
          <div class="form-group mb-3">
            <small>Harga</small>
            <input
              type="text"
              v-model="hargaTambah"
              class="form-control mt-2"
              placeholder="Masukkan harga .."
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
          <h1 class="modal-title fs-5" id="modalEditLabel">Edit Dropspot</h1>
          <button
            type="button"
            class="btn-close"
            @click="showModalEdit = false"
          ></button>
        </div>
        <div class="modal-body">
          <div class="form-group mb-3">
            <small>Nama Dropspot</small>
            <input type="text" class="form-control mt-2" v-model="namaEdit" />
          </div>
          <div class="form-group mb-3">
            <small>Area</small>
            <select class="form-select">
              <option :value="areaIdEdit" selected>
                {{ areaNamaEdit }}
              </option>
              <option v-for="a in area" :key="a.id" :value="a.id">
                {{ a.nama }}
              </option>
            </select>
          </div>
          <div class="form-group mb-3">
            <small>Cakupan Daerah</small>
            <input
              type="text"
              class="form-control mt-2"
              v-model="cakupanEdit"
            />
          </div>
          <div class="form-group mb-3">
            <small>Harga</small>
            <input type="text" class="form-control mt-2" v-model="hargaEdit" />
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
      areaIdTambah: "",
      cakupanTambah: "",
      hargaTambah: "",
      // edit data
      editDropspotId: null,
      namaEdit: "",
      areaIdEdit: null,
      areaNamaEdit: "",
      cakupanEdit: "",
      hargaEdit: "",
      // filter & cari
      filterAreaId: "",
      cariDropspot: "",
      // data utama
      jumlahData: 0,
      area: [],
      dropspot: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const result = await axios.get(
        "https://puber-api.kildev.my.id/dropspot",
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
          params: {
            cari: this.cariDropspot,
            area: this.filterAreaId,
          },
        }
      );
      this.area = result.data.filter.area;
      this.dropspot = result.data.data;
      this.jumlahData = result.headers["x_total_data"];
    },
    handleDoubleClick(id, nama, areaId, areaNama, cakupan, harga) {
      this.editDropspotId = id;
      this.namaEdit = nama;
      this.areaIdEdit = areaId;
      this.areaNamaEdit = areaNama;
      this.cakupanEdit = cakupan;
      this.hargaEdit = harga;
      this.showModalEdit = true;
    },
    async tambahData() {
      const tambahDropspotData = {
        nama: this.namaTambah,
        area_id: this.areaIdTambah,
        cakupan: this.cakupanTambah,
        harga: this.hargaTambah,
      };
      try {
        const result = await axios.post(
          "https://puber-api.kildev.my.id/dropspot",
          tambahDropspotData,
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
        this.areaIdTambah = "";
        this.cakupanTambah = "";
        this.hargaTambah = "";
      } catch (err) {
        console.log(err.response);
        Swal.fire(err.response.data.message, err.response.data.error, "error");
      }
    },
    async editData() {
      const editDropspotData = {
        nama: this.namaEdit,
        area_id: this.areaIdEdit,
        cakupan: this.cakupanEdit,
        harga: this.hargaEdit,
      };
      try {
        const result = await axios.put(
          `https://puber-api.kildev.my.id/dropspot/${this.editDropspotId}`,
          editDropspotData,
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
            .delete(
              `https://puber-api.kildev.my.id/dropspot/${this.editDropspotId}`,
              {
                headers: {
                  "x-auth-token": localStorage.getItem("token"),
                },
              }
            )
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
