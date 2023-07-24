import { defineStore } from "pinia";
import { api } from "../../plugins/axios";

export const usePenumpangTable = defineStore("table_penumpang", {
  state: () => ({
    items: [],
    totalData: 0,
    filter: {
      area: [],
      dropspot: [],
    },
    areaId: "",
    params: {
      cari: "",
      dropspot: "",
    },
  }),
  actions: {
    async getData() {
      const params = { params: this.params };
      try {
        await api.get("penumpang", params).then((resp) => {
          if ((resp.data.code = 200)) {
            this.totalData = resp.headers["x_total_data"];
            this.items = resp.data.data;
            this.filter.area = resp.data.filter.area;
          }
        });
      } catch (error) {}
    },
    async getDropspot() {
      const params = { params: { area: this.areaId } };
      try {
        await api.get("dropspot", params).then((resp) => {
          console.log(resp.data);
          if ((resp.data.code = 200)) {
            this.filter.dropspot = resp.data.data;
          }
        });
      } catch (error) {}
    },
  },
});
