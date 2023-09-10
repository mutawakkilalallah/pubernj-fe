import { defineStore } from "pinia";
import { api } from "../../plugins/axios";
import Swal from "sweetalert2";

export const usePersyaratanTable = defineStore("table_persyaratan", {
  state: () => ({
    openBps: false,
    openKosmara: false,
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
    formBps: {
      excelFile: null,
    },
    formKosmara: {
      excelFile: null,
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

    resetFormBps() {
      this.formBps.excelFile = null;
    },
    resetFormKosmara() {
      this.formKosmara.excelFile = null;
    },
    setOpenBps() {
      this.openBps = !this.openBps;
      this.resetFormBps();
    },
    setOpenKosmara() {
      this.openKosmara = !this.openKosmara;
      this.resetFormKosmara();
    },
    handleFileBPS(event) {
      this.formBps.excelFile = event.target.files[0];
    },
    handleFileKosmara(event) {
      this.formKosmara.excelFile = event.target.files[0];
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
    async export(jenis) {
      const params = {
        jenis: jenis,
        wilayah: this.params.wilayah,
        blok: this.params.blok,
        jenis_kelamin: this.params.jenis_kelamin,
      };
      try {
        await api
          .get("penumpang/export-persyaratan", {
            params: params,
            responseType: "blob",
          })
          .then((resp) => {
            const blob = new Blob([resp.data], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `template-${jenis}.xlsx`);
            document.body.appendChild(link);

            link.click();

            link.remove();
          });
      } catch (error) {}
    },
    async import(jenis) {
      try {
        const formData = new FormData();
        if (jenis === "bps") {
          formData.append("excelFile", this.formBps.excelFile);
        } else if (jenis === "kosmara") {
          formData.append("excelFile", this.formKosmara.excelFile);
        }
        await api
          .post(`penumpang/import-persyaratan?jenis=${jenis}`, formData)
          .then((resp) => {
            if (jenis === "bps") {
              this.openBps = false;
              this.resetFormBps();
            } else if (jenis === "kosmara") {
              this.openKosmara = false;
              this.resetFormKosmara();
            }
            this.getData();
          });
      } catch (err) {}
    },
  },
});
