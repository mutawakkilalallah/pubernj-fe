import { defineStore } from "pinia";
import { api } from "../../plugins/axios";

export const useStatistikStore = defineStore('statistik', {
    state: () => ({        
    stats: {
       namaDropspot:[],
       jumlahPutra:[],
       jumlahPutri:[],
       totalSantri:[]
        },
    }),
    actions: {
    async getData() {
      try {
        await api.get("keuangan").then((resp) => {
            if ((resp.data.code = 200)) {
                const data = resp.data.data.keuanganByDropspot
                    for (let i = 0; i < data.length ; i++) {
                        const respn = data[i];
                        this.dataArmada(respn.nama_dropspot)
                        this.jumlahSantriPutra(respn.jumlah_penumpang_putra)
                        this.jumlahSantriPutri(respn.jumlah_penumpang_putri)
                        this.totalSantri(respn.jumlah_penumpang_total)                 
                    }
            }
        });
      } catch (error) {}
        },        
        dataArmada(data) {
            this.stats.namaDropspot.push(data)
        },
        jumlahSantriPutra(data) {
            this.stats.jumlahPutra.push(data)            
        },
        jumlahSantriPutri(data) {
            this.stats.jumlahPutri.push(data)            
        },
        totalSantri(data) {
            this.stats.totalSantri.push(data)            
        },
      
    },
    
})

