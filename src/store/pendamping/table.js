import { defineStore } from "pinia";
import * as storage from "../../modules/storage";
import { api } from "../../plugins/axios";

export const usePendampingTable = defineStore("table_pendamping", {
  state: () => ({
    user: localStorage.getItem("user") ? storage.getUser() : null,
    items: [],
    filter: {
      area: [],
      dropspot: [],
    },
    meta: {},
    params: {
      cari: "",
      area: "",
      dropspot: "",
      type: "",
    },
        armada: {},
        namaArmada: '',
        namaDropspot: '',
        jumlahPenumpang:''
    
  }),
  actions: {
    async getData() {
      const params = { params: this.params };
      try {
          await api.get("armada", params).then((resp) => {
            if ((resp.data.code = 200)) {
                  this.items = resp.data.data;
                  this.filter.area = resp.data.filter.area;
                  this.meta = resp.headers;
                }
            });
        } catch (error) {}
    },
    async getDataDetail(id) {
        try {
            await api.get(`armada/${id}`).then((resp) => {
            console.log('armada', resp.data.data);
          if ((resp.data.code = 200)) {
              this.armada = resp.data.data;
              this.jumlahPenumpang = resp.data.data.penumpang;
              this.namaArmada = resp.data.data.nama
              this.namaDropspot = resp.data.data.dropspot.nama
          }
        });
      } catch (error) {}
    },
    // async getDropspot() {
    //   this.params.dropspot = "";
    //   this.getData();
    //   const params = { params: { area: this.params.area } };
    //   try {
    //     await api.get("dropspot", params).then((resp) => {
    //       if ((resp.data.code = 200)) {
    //         this.filter.dropspot = resp.data.data;
    //       }
    //     });
    //   } catch (error) {}
    // },
  },
});
