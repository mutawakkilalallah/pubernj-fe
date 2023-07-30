import { defineStore } from "pinia";
import * as storage from "../../modules/storage";
import { api } from "../../plugins/axios";

export const useArmadaDetailTable = defineStore("table_armada_detail", {
  state: () => ({
    user: localStorage.getItem("user") ? storage.getUser() : null,
    armada: {},
    items: [],
    filter: {
      area: [],
      dropspot: [],
    },
    meta: {},
    params: {
      cari: "",
      armada: "n",
      area: "",
      dropspot: "",
      jenis_kelamin: "",
      limit: "",
    },
  }),
  actions: {
    async getData() {
      const params = { params: this.params };
      try {
        await api.get("penumpang", params).then((resp) => {
          if ((resp.data.code = 200)) {
            this.items = resp.data.data;
            this.filter.area = resp.data.filter.area;
            this.meta = resp.headers;
          }
        });
      } catch (error) {}
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
    async getDataDetail(id) {
      try {
        await api.get(`armada/${id}`).then((resp) => {
          if ((resp.data.code = 200)) {
            this.armada = resp.data.data;
          }
        });
      } catch (error) {}
    },
  },
});
