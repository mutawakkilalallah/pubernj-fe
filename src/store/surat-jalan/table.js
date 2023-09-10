import { defineStore } from "pinia";
import { api } from "../../plugins/axios";

export const useSuratJalanTable = defineStore("table_surat-jalan", {
  state: () => ({
    itemsIzin: [],
    itemsSurat: [],
    metaIzin: {},
    metaSurat: {},
    filterIzin: {
      wilayah: [],
      blok: [],
    },
    filterSurat: {
      wilayah: [],
      blok: [],
    },
    paramsIzin: {
      cari: "",
      wilayah: "",
      blok: "",
      limit: 25,
    },
    paramsSurat: {
      cari: "",
      wilayah: "",
      blok: "",
      limit: 25,
    },
  }),
  actions: {
    async getDataIzin() {
      const params = { params: this.paramsIzin };
      try {
        await api.get("penumpang", params).then((resp) => {
          if ((resp.data.code = 200)) {
            this.itemsIzin = resp.data.data;
            this.metaIzin = resp.headers;
            this.filterIzin.area = resp.data.filter.area;
          }
        });
      } catch (error) {}
    },
    async getWilayahIzin() {
      try {
        await api.get("santri/filter/wilayah").then((resp) => {
          if ((resp.data.code = 200)) {
            this.filterIzin.wilayah = resp.data;
          }
        });
      } catch (error) {}
    },
    async getBlokIzin() {
      this.params.blok = "";
      this.getData();
      try {
        await api
          .get(`santri/filter/blok?alias_wilayah=${this.params.wilayah}`)
          .then((resp) => {
            if ((resp.data.code = 200)) {
              this.filterIzin.blok = resp.data;
            }
          });
      } catch (error) {}
    },
  },
});
