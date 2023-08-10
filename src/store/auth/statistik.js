import { defineStore } from "pinia";
import { api } from "../../plugins/axios";

export const useStatistikStore = defineStore("statistik", {
  state: () => ({
    viewMode: "detail",
    stats: {
      namaDropspot: [],
      jumlahPutra: [],
      jumlahPutri: [],
      totalSantri: [],
    },
    estArmada: [],
    keuanganByDropspot: [],
    keuanganAll: {},
  }),
  actions: {
    async getData() {
      try {
        await api.get("keuangan").then((resp) => {
          if ((resp.data.code = 200)) {
            const data = resp.data.data.keuanganByDropspot;
            for (let i = 0; i < data.length; i++) {
              const respn = data[i];
              this.dataArmada(respn.nama_dropspot);
              this.jumlahSantriPutra(respn.jumlah_penumpang_putra);
              this.jumlahSantriPutri(respn.jumlah_penumpang_putri);
              this.totalSantri(respn.jumlah_penumpang_total);
            }
          }
        });
      } catch (error) {}
    },
    async getStatArmada() {
      try {
        await api.get("statistik/estimasi-armada").then((resp) => {
          if ((resp.data.code = 200)) {
            this.estArmada = resp.data.data.estArmada;
          }
        });
      } catch (error) {}
    },
    async getKeuangan() {
      try {
        await api.get("statistik/keuangan").then((resp) => {
          if ((resp.data.code = 200)) {
            this.keuanganByDropspot = resp.data.data.keuanganByDp;
            this.keuanganAll = resp.data.data.keuanganAll;
          }
        });
      } catch (error) {}
    },
    dataArmada(data) {
      this.stats.namaDropspot.push(data);
    },
    jumlahSantriPutra(data) {
      this.stats.jumlahPutra.push(data);
    },
    jumlahSantriPutri(data) {
      this.stats.jumlahPutri.push(data);
    },
    totalSantri(data) {
      this.stats.totalSantri.push(data);
    },
  },
});
