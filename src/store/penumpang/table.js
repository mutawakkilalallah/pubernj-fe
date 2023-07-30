import { defineStore } from "pinia";
import { api } from "../../plugins/axios";

export const usePenumpangTable = defineStore("table_penumpang", {
  state: () => ({
    items: [],
    meta: {},
    myPage: "",
    filter: {
      area: [],
      dropspot: [],
    },
    // areaId: "",
    params: {
      cari: "",
      dropspot: "",
      area: "",
      page: 1,
      limit: 25,
    },
  }),
  actions: {
    nexPage(a) {
      this.params.page = parseInt(a) + 1;
      this.getData();
    },
    prevPage(a) {
      this.params.page = parseInt(a) - 1;
      this.getData();
    },
    setPage(a) {
      this.params.page = parseInt(a);
      this.getData();
    },
    searchPage() {
      this.params.page = 1;
      this.getData();
    },

    async getData() {
      const params = { params: this.params };
      try {
        await api.get("penumpang", params).then((resp) => {
          if ((resp.data.code = 200)) {
            this.totalData = resp.headers["x_total_data"];
            this.items = resp.data.data;
            this.meta = resp.headers;
            this.filter.area = resp.data.filter.area;
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
