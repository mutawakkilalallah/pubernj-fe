import { defineStore } from "pinia";
import * as storage from "../../modules/storage";
import { api } from "../../plugins/axios";

export const useDropsotTable = defineStore("table_dropspot", {
  state: () => ({
    user: localStorage.getItem("user") ? storage.getUser() : null,
    items: [],
    params: {
      cari: "",
      area: "",
    },
  }),
  actions: {
    async getData() {
      const params = { params: this.params };
      try {
        await api.get("dropspot", params).then((resp) => {
          if ((resp.data.code = 200)) {
            this.items = resp.data.data;
          }
        });
      } catch (error) {}
    },
  },
});
