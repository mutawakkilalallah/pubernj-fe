import { defineStore } from "pinia";
import { api } from "../../plugins/axios";
import { swalSuccess } from "../../modules/untils";

export const useSuratJalanTable = defineStore("table_surat_jalan", {
  state: () => ({
    loading: false,
    openLogin: false,
    openLog: false,
    successIzin: false,
    itemsLog: [],
    itemsIzin: [],
    itemsKonfir: [],
    itemsSurat: [],
    metaIzin: {},
    metaKonfir: {},
    metaSurat: {},
    logIzin: {},
    blob: "",
    form: {
      username: "",
      password: "",
    },
    filterIzin: {
      wilayah: [],
      blok: [],
    },
    filterKonfir: {
      wilayah: [],
      blok: [],
    },
    filterSurat: {
      wilayah: [],
      blok: [],
    },
    paramsIzin: {
      cari: "",
      wilayah: "",
      blok: "",
      limit: 50,
    },
    paramsKonfir: {
      cari: "",
      wilayah: "",
      blok: "",
      limit: 50,
    },
    paramsSurat: {
      cari: "",
      wilayah: "",
      blok: "",
      cetak: "T",
      limit: 50,
    },
  }),
  actions: {
    setOpenLogin() {
      this.openLogin = !this.openLogin;
      this.form.username = "";
      this.form.password = "";
    },
    setOpenLog() {
      this.openLog = !this.openLog;
    },

    async loginPedatren(uuid) {
      this.loading = true;
      try {
        const resp = await api.put(
          `surat-jalan/tautkan-pedatren/${uuid}`,
          this.form
        );
        this.setOpenLogin();
        localStorage.setItem("x-token", JSON.stringify(resp.data.token));
        const user = JSON.parse(localStorage.getItem("user"));
        user.username_pedatren = resp.data.value.username;
        user.password_pedatren = resp.data.value.password;
        localStorage.setItem("user", JSON.stringify(user));
        this.loading = false;
        swalSuccess("Berhasil Menghubungkan ke PEDATREN");
        location.reload();
      } catch (err) {
        this.loading = false;
      }
    },

    async hapusPedatren(uuid) {
      this.loading = true;
      try {
        const resp = await api.put(`surat-jalan/hapus-pedatren/${uuid}`);
        localStorage.removeItem("x-token");
        const user = JSON.parse(localStorage.getItem("user"));
        user.username_pedatren = null;
        user.password_pedatren = null;
        localStorage.setItem("user", JSON.stringify(user));
        this.loading = false;
        swalSuccess("Berhasil menghapus tautan ke PEDATREN");
        location.reload();
      } catch (err) {
        this.loading = false;
      }
    },

    async generateIzin() {
      this.loading = true;
      const authToken = JSON.parse(localStorage.getItem("x-token"));
      const params = {
        params: this.paramsIzin,
        headers: {
          "x-pedatren-token": authToken,
        },
      };
      try {
        const resp = await api.post(`surat-jalan/create-izin`, null, params);
        this.successIzin = true;
        this.logIzin = resp.data.data;
        this.getDataIzin();
        this.getDataKonfir();
        this.getDataSurat();
        this.loading = false;
      } catch (err) {
        this.loading = false;
      }
    },

    async konfirIzin() {
      const authToken = JSON.parse(localStorage.getItem("x-token"));
      const params = {
        params: this.paramsKonfir,
        headers: {
          "x-pedatren-token": authToken,
        },
      };
      try {
        const resp = await api.put(`surat-jalan/konfirmasi-izin`, null, params);
        this.getDataIzin();
        this.getDataKonfir();
        this.getDataSurat();
      } catch (err) {}
    },

    async syncPedatren(uuid) {
      this.loading = true;
      try {
        const resp = await api.get(`surat-jalan/login-pedatren/${uuid}`);
        localStorage.setItem("x-token", JSON.stringify(resp.data.token));
        swalSuccess("Berhasil Sinkronasi Ulang ke PEDATREN");
        this.loading = false;
      } catch (err) {
        this.loading = false;
      }
    },

    async getDataIzin() {
      const params = { params: this.paramsIzin };
      try {
        await api.get("surat-jalan/izin-pedatren", params).then((resp) => {
          if ((resp.data.code = 200)) {
            this.itemsIzin = resp.data.data;
            this.metaIzin = resp.headers;
            this.filterIzin.area = resp.data.filter.area;
          }
        });
      } catch (error) {}
    },

    async getDataKonfir() {
      const params = { params: this.paramsKonfir };
      try {
        await api.get("surat-jalan/konfirmasi-izin", params).then((resp) => {
          if ((resp.data.code = 200)) {
            this.itemsKonfir = resp.data.data;
            this.metaKonfir = resp.headers;
            this.filterKonfir.area = resp.data.filter.area;
          }
        });
      } catch (error) {}
    },

    async getDataSurat() {
      const params = { params: this.paramsSurat };
      try {
        const resp = await api.get("surat-jalan/cetak-surat", params);
        if ((resp.data.code = 200)) {
          this.itemsSurat = resp.data.data;
          this.metaSurat = resp.headers;
          this.filterSurat.area = resp.data.filter.area;
          for (const d of this.itemsSurat) {
            d.qrIzin = await this.getQR(d.santri.niup);
          }
        }
      } catch (error) {}
    },

    async getQR(niup) {
      try {
        const params = {
          responseType: "blob",
          headers: {
            "x-token": JSON.parse(localStorage.getItem("x-token")),
          },
        };
        const response = await api.get(`surat-jalan/qr-izin/${niup}`, params);
        return URL.createObjectURL(response.data);
      } catch (err) {}
    },

    async getLog() {
      this.openLog = true;
      try {
        await api.get("surat-jalan/view-log").then((resp) => {
          if ((resp.data.code = 200)) {
            this.itemsLog = resp.data;
          }
        });
      } catch (error) {}
    },

    async getWilayahIzin() {
      try {
        await api.get("santri/filter/wilayah").then((resp) => {
          if ((resp.data.code = 200)) {
            this.filterIzin.wilayah = resp.data;
          }
        });
      } catch (error) {}
    },
    async getBlokIzin() {
      this.paramsIzin.blok = "";
      this.getDataIzin();
      try {
        await api
          .get(`santri/filter/blok?alias_wilayah=${this.paramsIzin.wilayah}`)
          .then((resp) => {
            if ((resp.data.code = 200)) {
              this.filterIzin.blok = resp.data;
            }
          });
      } catch (error) {}
    },

    async getWilayahKonfir() {
      try {
        await api.get("santri/filter/wilayah").then((resp) => {
          if ((resp.data.code = 200)) {
            this.filterKonfir.wilayah = resp.data;
          }
        });
      } catch (error) {}
    },
    async getBlokKonfir() {
      this.paramsKonfir.blok = "";
      this.getDataKonfir();
      try {
        await api
          .get(`santri/filter/blok?alias_wilayah=${this.paramsKonfir.wilayah}`)
          .then((resp) => {
            if ((resp.data.code = 200)) {
              this.filterKonfir.blok = resp.data;
            }
          });
      } catch (error) {}
    },

    async getWilayahSurat() {
      try {
        await api.get("santri/filter/wilayah").then((resp) => {
          if ((resp.data.code = 200)) {
            this.filterSurat.wilayah = resp.data;
          }
        });
      } catch (error) {}
    },
    async getBlokSurat() {
      this.paramsSurat.blok = "";
      this.getDataSurat();
      try {
        await api
          .get(`santri/filter/blok?alias_wilayah=${this.paramsSurat.wilayah}`)
          .then((resp) => {
            if ((resp.data.code = 200)) {
              this.filterSurat.blok = resp.data;
            }
          });
      } catch (error) {}
    },
  },
});
