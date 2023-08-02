import { defineStore } from "pinia";
import * as storage from "../../modules/storage";
import { api } from "../../plugins/axios";

export const useKeuanganTable = defineStore("table_keuangan", {
  state: () => ({
    user: localStorage.getItem("user") ? storage.getUser() : null,
    stats: {
      keuanganTotal: {},
      keuanganByDropspot: [],
    },
  }),
  actions: {
    async getData() {
      try {
        await api.get("keuangan").then((resp) => {
          if ((resp.data.code = 200)) {
            this.stats.keuanganByDropspot = resp.data.data.keuanganByDropspot;
            this.stats.keuanganTotal = resp.data.data.keuanganTotal;
          }
        });
      } catch (error) {}
    },
  },
});
