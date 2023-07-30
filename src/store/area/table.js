import { defineStore } from "pinia";
import * as storage from "../../modules/storage";
import { api } from "../../plugins/axios";

export const useAreaTable = defineStore("table_area", {
  state: () => ({
    user: localStorage.getItem("user") ? storage.getUser() : null,
    items: [],
    totaldata: 0,
    params: {
      cari: "",
    },
  }),
  actions: {
    async getData() {
      const params = { params: this.params };
      try {
        await api.get("area", params).then((resp) => {
          // console.log('response area', resp)
          if ((resp.data.code = 200)) {
            this.items = resp.data.data;
            this.totaldata = resp.headers["x_total_data"];
          }
        });
      } catch (error) {}
    },
  },
});
