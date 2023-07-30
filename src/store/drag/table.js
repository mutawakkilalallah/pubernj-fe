import { defineStore } from "pinia";
import { api } from "../../plugins/axios";

export const useDragTable = defineStore("table_drag", {
  state: () => ({
    roles1: [],
    items1: [],
    params1: {
      cari: "",
      role: "daerah",
    },
    roles2: [],
    items2: [],
    params2: {
      cari: "",
      role: "wilayah",
    },
  }),
  actions: {
    async getData1() {
      const params = { params: this.params1 };
      try {
        await api.get("user", params).then((resp) => {
          if ((resp.data.code = 200)) {
            this.items1 = resp.data.data;
            this.roles1 = resp.data.filter.role;
          }
        });
      } catch (error) {}
    },
    async getData2() {
      const params = { params: this.params2 };
      try {
        await api.get("user", params).then((resp) => {
          if ((resp.data.code = 200)) {
            this.items2 = resp.data.data;
            this.roles2 = resp.data.filter.role;
          }
        });
      } catch (error) {}
    },
  },
});
