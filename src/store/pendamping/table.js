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
    jumlahPenumpang: '',
         namaPendamping: "",
       noPendamping: '',
    // nota
    jumlahHarga: '',
    
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
               this.myHarga(resp.data.data)
                }
            });
        } catch (error) {}
    },
    // async getDataDetail(id) {
    //     try {
    //         await api.get(`armada/${id}`).then((resp) => {
    //       if ((resp.data.code = 200)) {
    //           this.armada = resp.data.data;
    //           this.jumlahPenumpang = resp.data.data.penumpang;
    //           this.namaArmada = resp.data.data.nama
    //           this.namaDropspot = resp.data.data.dropspot.nama
    //       }
    //     });
    //   } catch (error) {}
    // },
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

    myHarga(data) {
      console.log('data',data);
   const total = data.map(a=>a.harga).reduce((b,c)=>b+c,0)
      this.jumlahHarga = total
      console.log('harga', this.jumlahHarga);
  //     const dataNama = data.map(a => a.dropspot.nama)
  //     const namaArray = [...new Set(dataNama)]
  //     // convert stirng
  //     const namaStirng = namaArray.join(', ')
  //  console.log('total',namaStirng);
   
    },
 
  
     
    async getDataDetail(id) {
        try {
          await api.get(`armada/${id}`).then((resp) => {
          if ((resp.data.code = 200)) {
              this.armada = resp.data.data;
              this.jumlahPenumpang = resp.data.data.penumpang;
              this.namaArmada = resp.data.data.nama
              this.namaDropspot = resp.data.data.dropspot.nama
              this.namaPendamping = resp.data.data.user.nama_lengkap
              this.noPendamping = resp.data.data.user.no_hp
          }
        });
      } catch (error) {}
    },  
  },
});
