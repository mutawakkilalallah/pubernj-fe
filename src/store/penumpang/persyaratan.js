import { defineStore } from "pinia";
import { api } from "../../plugins/axios";
import Swal from "sweetalert2";

export const usePersyaratanTable = defineStore("table_persyaratan", {
  state: () => ({
    items: [],
    meta: {},
    myPage: "",
    filter: {
      wilayah: [],
      blok: [],
    },
    params: {
      cari: "",
      wilayah: "",
      blok: "",
      jenis_kelamin: "",
      lunas_bps: "",
      lunas_kosmara: "",
      tuntas_fa: "",
      bebas_kamtib: "",
      page: 1,
      limit: 25,
    },
    params2: {
      limit: "",
    },
  }),
  actions: {
    nexPage(a) {
      this.params.page = parseInt(a) + 1;
      this.getData();
    },
    prevPage(a) {
      this.params.page = parseInt(a) - 1;
      this.getData();
    },
    setPage(a) {
      this.params.page = parseInt(a);
      this.getData();
    },
    searchPage() {
      this.params.page = 1;
      this.getData();
    },
    async getData() {
      const params = { params: this.params };
      try {
        await api.get("penumpang/persyaratan", params).then((resp) => {
          if ((resp.data.code = 200)) {
            this.totalData = resp.headers["x_total_data"];
            this.items = resp.data.data;
            this.meta = resp.headers;
            this.filter.area = resp.data.filter.area;
            this.params2.limit = resp.headers.x_total_data;
            this.getDataExport();
          }
        });
      } catch (error) {}
    },
    async handleReset() {
      this.params = {
        cari: "",
        wilayah: "",
        blok: "",
        pembayaran: "",
        jenis_kelamin: "",
        lunas_bps: "",
        lunas_kosmara: "",
        tuntas_fa: "",
        bebas_kamtib: "",
        page: 1,
        limit: 25,
      };
      this.getData();
    },
    async getWilayah() {
      try {
        await api.get("santri/filter/wilayah").then((resp) => {
          if ((resp.data.code = 200)) {
            this.filter.wilayah = resp.data;
          }
        });
      } catch (error) {}
    },
    async getBlok() {
      this.params.blok = "";
      this.getData();
      try {
        await api
          .get(`santri/filter/blok?alias_wilayah=${this.params.wilayah}`)
          .then((resp) => {
            if ((resp.data.code = 200)) {
              this.filter.blok = resp.data;
            }
          });
      } catch (error) {}
    },
    async ubahPersyaratan(type, id, swType, textOne, textTwo, nama) {
      Swal.fire({
        title: "Konfirmasi",
        text: `Apakah anda yakin "${textOne}" status "${textTwo}" untuk (${nama}) ?`,
        icon: swType,
        showCancelButton: true,
        confirmButtonText: "Iya",
      }).then((result) => {
        if (result.isConfirmed) {
          api.put(`penumpang/persyaratan/${id}`, { type }).then((result) => {
            this.getData();
          });
        }
      });
    },
  },
});
