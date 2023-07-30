import { defineStore } from "pinia";
import * as storage from "../../modules/storage";
import { api } from "../../plugins/axios";

export const useArmadaTable = defineStore("table_armada", {
  state: () => ({
    user: localStorage.getItem("user") ? storage.getUser() : null,
    items: [],
    filter: {
      area: [],
      dropspot: [],
    },
    meta: {},
    params: {
      cari: "",
      area: "",
      dropspot: "",
      type: "",
    },
  }),
  actions: {
    async getData() {
      const params = { params: this.params };
      try {
        await api.get("armada", params).then((resp) => {
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
  },
});
