import { defineStore } from "pinia";
import { api } from "../../plugins/axios";

export const useSantriTable = defineStore("table_santri", {
  state: () => ({
    isOpenDetail: false,
    items: [],
    item: {},
    fotoDiri: "",
  
    meta: {      
    },
    myPage:'',
    params: {
      cari: "",
      page: 1,
      limit:25
    },
   
  }),
  actions: {
    nexPage(a) {
      console.log('next', a);
      this.params.page = parseInt(a) + 1
      this.getData()
    },
    prevPage(a) {
      console.log('prev',a);
      this.params.page = parseInt(a) - 1
      this.getData()
    },
    setPage(a) {
      console.log('setPAge', a);
      this.params.page = parseInt(a)
      this.getData()
    },
    searchPage() {
      this.params.page = 1
      this.getData()
    },

 
    async getData() {
      const params = { params: this.params };
      try {
        await api.get("santri", params).then((resp) => {
          console.log('meta headers', resp.headers);
          if ((resp.data.code = 200)) {
            this.items = resp.data.data;
            this.meta = resp.headers
            this.kelipatan()
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
