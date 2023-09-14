import { defineStore } from "pinia";
import { api } from "../../plugins/axios";
import { swalSuccess } from "../../modules/untils";

export const useCompareTable = defineStore("table_compare", {
  state: () => ({
    loading: false,
    itemsBeda: [],
    itemsNoTagihan: [],
    metaBeda: {},
    metaNoTagihan: {},
    filterBeda: {
      wilayah: [],
      blok: [],
    },
    filterNoTagihan: {
      wilayah: [],
      blok: [],
    },
    paramsBeda: {
      cari: "",
      wilayah: "",
      blok: "",
      jenis_kelamin: "",
      pembayaran: "",
      limit: 100,
    },
    paramsNoTagihan: {
      cari: "",
      wilayah: "",
      blok: "",
      jenis_kelamin: "",
      limit: 100,
    },
  }),
  actions: {
    async getDataBeda() {
      const params = { params: this.paramsBeda };
      try {
        await api.get("penumpang/all-compare", params).then((resp) => {
          if ((resp.data.code = 200)) {
            this.itemsBeda = resp.data.data;
            this.metaBeda = resp.headers;
          }
        });
      } catch (error) {}
    },

    async getDataNoTagihan() {
      const params = { params: this.paramsNoTagihan };
      try {
        await api.get("penumpang/no-tagihan", params).then((resp) => {
          if ((resp.data.code = 200)) {
            this.itemsNoTagihan = resp.data.data;
            this.metaNoTagihan = resp.headers;
          }
        });
      } catch (error) {}
    },

    async getWilayahBeda() {
      try {
        await api.get("santri/filter/wilayah").then((resp) => {
          if ((resp.data.code = 200)) {
            this.filterBeda.wilayah = resp.data;
          }
        });
      } catch (error) {}
    },
    async getBlokBeda() {
      this.paramsBeda.blok = "";
      this.getDataBeda();
      try {
        await api
          .get(`santri/filter/blok?alias_wilayah=${this.paramsBeda.wilayah}`)
          .then((resp) => {
            if ((resp.data.code = 200)) {
              this.filterBeda.blok = resp.data;
            }
          });
      } catch (error) {}
    },

    async getWilayahNoTagihan() {
      try {
        await api.get("santri/filter/wilayah").then((resp) => {
          if ((resp.data.code = 200)) {
            this.filterNoTagihan.wilayah = resp.data;
          }
        });
      } catch (error) {}
    },
    async getBlokNoTagihan() {
      this.paramsNoTagihan.blok = "";
      this.getDataNoTagihan();
      try {
        await api
          .get(
            `santri/filter/blok?alias_wilayah=${this.paramsNoTagihan.wilayah}`
          )
          .then((resp) => {
            if ((resp.data.code = 200)) {
              this.filterNoTagihan.blok = resp.data;
            }
          });
      } catch (error) {}
    },
  },
});
