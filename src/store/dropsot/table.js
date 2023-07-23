import { defineStore } from "pinia";
import { api } from "../../plugins/axios";

export const useDropsotTable = defineStore("table_dropspot", {
  state: () => ({
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
