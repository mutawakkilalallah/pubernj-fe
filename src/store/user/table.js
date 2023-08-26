import { defineStore } from "pinia";
import { api } from "../../plugins/axios";

export const useUserTable = defineStore("table_user", {
  state: () => ({
    roles: [],
    items: [],
    params: {
      cari: "",
      role: "",
      limit: 200,
    },
  }),
  actions: {
    async getData() {
      const params = { params: this.params };
      try {
        await api.get("user", params).then((resp) => {
          if ((resp.data.code = 200)) {
            this.items = resp.data.data;
            this.roles = resp.data.filter.role;
          }
        });
      } catch (error) {}
    },
  },
});
