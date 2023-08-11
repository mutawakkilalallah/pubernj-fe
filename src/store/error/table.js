import { defineStore } from "pinia";
import { api } from "../../plugins/axios";

export const useErrorTable = defineStore("table_error", {
  state: () => ({
    items: [],
    totaldata: 0,
    params: {
      limit: 500,
      page: 1,
    },
  }),
  actions: {
    async getData() {
      const params = { params: this.params };
      try {
        await api.get("log/error-report", params).then((resp) => {
          if ((resp.data.code = 200)) {
            this.items = resp.data.data;
            this.totaldata = resp.headers["x_total_data"];
          }
        });
      } catch (error) {}
    },
  },
});
