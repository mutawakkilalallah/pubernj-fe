import { defineStore } from "pinia";
import { api } from "../../plugins/axios";

export const useSantriTable = defineStore("table_santri", {
  state: () => ({
    isOpenDetail: false,
    items: [],
    item: {},
    fotoDiri: "",
    headers: {
      totalData: 0,
    },
    params: {
      cari: "",
    },
  }),
  actions: {
    async getData() {
      const params = { params: this.params };
      try {
        await api.get("santri", params).then((resp) => {
          if ((resp.data.code = 200)) {
            this.items = resp.data.data;
            this.headers.totalData = resp.headers["x_total_data"];
          }
        });
      } catch (error) {}
    },
    async handleDoubelClick(uuid) {
      try {
        this.isOpenDetail = true;
        await api.get("santri/" + uuid).then((resp) => {
          if ((resp.data.code = 200)) {
            this.item = resp.data.data;
            this.getImage(resp.data.data.uuid, "medium");
          }
        });
      } catch (error) {}
    },
    async getImage(uuid) {
      try {
        const params = {
          responseType: "blob",
        };
        await api.get("santri/image/" + uuid, params).then((resp) => {
          this.fotoDiri = URL.createObjectURL(resp.data);
        });
      } catch (error) {
        console.log("error", error);
      }
    },
  },
});
