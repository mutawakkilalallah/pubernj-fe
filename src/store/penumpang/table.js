import { defineStore } from "pinia";
import { api } from "../../plugins/axios";

export const usePenumpangTable = defineStore("table_penumpang", {
  state: () => ({
    openExport: false,
    items: [],
    meta: {},
    myPage: "",
    filter: {
      area: [],
      dropspot: [],
      wilayah: [],
      blok: [],
      armada: [],
    },
    // areaId: "",
    params: {
      cari: "",
      dropspot: "",
      area: "",
      wilayah: "",
      blok: "",
      pembayaran: "",
      jenis_kelamin: "",
      armada: "",
      hak_pulang: "",
      tagihan: "",
      nominal: "",
      page: 1,
      limit: 25,
    },
    paramsExp: {
      in_dropspot: false,
      in_domisili: false,
      in_alamat: false,
      in_pembayaran: false,
      in_persyaratan: false,
      in_armada: false,
      in_limit: false,
    },
    btnDisable: true,
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

    setOpenExport() {
      this.openExport = !this.openExport;
      this.paramsExp.in_dropspot = false;
      this.paramsExp.in_domisili = false;
      this.paramsExp.in_pembayaran = false;
      this.paramsExp.in_alamat = false;
      this.paramsExp.in_armada = false;
      this.paramsExp.in_persyaratan = false;
      this.paramsExp.in_limit = false;
    },

    async getData() {
      const params = { params: this.params };
      this.getArmada();
      try {
        await api.get("penumpang", params).then((resp) => {
          if ((resp.data.code = 200)) {
            this.totalData = resp.headers["x_total_data"];
            this.items = resp.data.data;
            this.meta = resp.headers;
            this.filter.area = resp.data.filter.area;
            this.params2.limit = resp.headers.x_total_data;
          }
        });
      } catch (error) {}
    },

    async unduhTemplate() {
      try {
        await api
          .get(
            `penumpang/unduh-template?wilayah=${this.params.wilayah}&blok=${this.params.blok}&pembayaran=${this.params.pembayaran}&jenis_kelamin=${this.params.jenis_kelamin}&tagihan=${this.params.tagihan}`,
            {
              responseType: "blob",
            }
          )
          .then((resp) => {
            const blob = new Blob([resp.data], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "template_puber.xlsx");
            document.body.appendChild(link);

            link.click();

            link.remove();
          });
      } catch (error) {}
    },

    async export() {
      const cekLimit = !this.paramsExp.in_limit ? this.params.limit : 10000;
      const params = {
        in_dropspot: this.paramsExp.in_dropspot,
        in_domisili: this.paramsExp.in_domisili,
        in_alamat: this.paramsExp.in_alamat,
        in_persyaratan: this.paramsExp.in_persyaratan,
        in_armada: this.paramsExp.in_armada,
        in_pembayaran: this.paramsExp.in_pembayaran,
        limit: cekLimit,
        dropspot: this.params.dropspot,
        area: this.params.area,
        wilayah: this.params.wilayah,
        blok: this.params.blok,
        pembayaran: this.params.pembayaran,
        jenis_kelamin: this.params.jenis_kelamin,
      };
      try {
        await api
          .get("penumpang/export-excel", {
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
            link.setAttribute("download", "data-penumpang.xlsx");
            document.body.appendChild(link);

            link.click();

            link.remove();
          });
      } catch (error) {}
    },

    async handleReset() {
      this.params = {
        cari: "",
        dropspot: "",
        area: "",
        wilayah: "",
        blok: "",
        pembayaran: "",
        jenis_kelamin: "",
        armada: "",
        hak_pulang: "",
        page: 1,
        limit: 25,
      };
      this.getData();
    },

    async getDropspot() {
      this.params.dropspot = "";
      this.getData();
      const params = { params: { area: this.params.area } };
      try {
        await api.get("dropspot", params).then((resp) => {
          if ((resp.data.code = 200)) {
            this.filter.dropspot = resp.data.data;
          }
        });
      } catch (error) {}
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
    async getArmada() {
      const params = { params: { area: this.params.area } };
      try {
        await api.get(`armada`, params).then((resp) => {
          if ((resp.data.code = 200)) {
            this.filter.armada = resp.data.data;
          }
        });
      } catch (error) {}
    },
  },
});
