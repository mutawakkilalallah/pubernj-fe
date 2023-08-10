import { defineStore } from "pinia";
import { api } from "../../plugins/axios";

export const useSantriTable = defineStore("table_santri", {
  state: () => ({
    isOpenDetail: false,
    items: [],
    item: {},
    fotoDiri: "",
    meta: {},
    myPage: "",
    filter: {
      wilayah: [],
      blok: [],
    },
    uuid:'',
    params: {
      cari: "",
      wilayah: "",
      blok: "",
      status_kepulangan: "",
      jenis_kelamin: "",
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
        await api.get("santri", params).then((resp) => {
          if ((resp.data.code = 200)) {
            this.items = resp.data.data;
            this.meta = resp.headers;
          }
        });
      } catch (error) {}
    },
    async handleDoubelClick(uuid) {
      this.uuid = uuid
      try {
        this.isOpenDetail = true;
        await api.get("santri/" + uuid).then((resp) => {
          if ((resp.data.code = 200)) {
            this.item = resp.data.data;
            this.getImage(resp.data.data.niup, "medium");
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
      } catch (error) {}
    },
    async getWilayah() {
      try {
        await api.get("santri/filter/wilayah").then((resp) => {
          if ((resp.data.code = 200)) {
            this.filter.wilayah = resp.data;
          }
        });
      } catch (error) {}
    },
    async getBlok() {
      this.params.blok = "";
      this.getData();
      try {
        await api
          .get(`santri/filter/blok?alias_wilayah=${this.params.wilayah}`)
          .then((resp) => {
            if ((resp.data.code = 200)) {
              this.filter.blok = resp.data;
            }
          });
      } catch (error) {}
    },
  },
});
