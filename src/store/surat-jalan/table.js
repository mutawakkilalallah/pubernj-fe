import { defineStore } from "pinia";
import { api } from "../../plugins/axios";
import { swalSuccess } from "../../modules/untils";
import * as access from "../../plugins/access";

export const useSuratJalanTable = defineStore("table_surat_jalan", {
  state: () => ({
    load: false,
    loading: false,
    btnPrint: true,
    openLogin: false,
    openLog: false,
    successIzin: false,
    errorSurat: [],
    itemsLog: [],
    itemsIzin: [],
    itemsKonfir: [],
    itemsSurat: [],
    metaIzin: {},
    metaKonfir: {},
    metaSurat: {},
    logIzin: {},
    blob: "",
    kop: "",
    qr: "",
    paraf1: "",
    paraf2: "",
    form: {
      username: "",
      password: "",
    },
    filterIzin: {
      wilayah: [],
      blok: [],
      area: [],
      dropspot: [],
    },
    filterKonfir: {
      wilayah: [],
      blok: [],
      area: [],
      dropspot: [],
    },
    filterSurat: {
      wilayah: [],
      blok: [],
      area: [],
      dropspot: [],
    },
    paramsIzin: {
      cari: "",
      wilayah: "",
      blok: "",
      area: "",
      dropspot: "",
      limit: 10,
    },
    paramsKonfir: {
      cari: "",
      wilayah: "",
      blok: "",
      area: "",
      dropspot: "",
      limit: 10,
    },
    paramsSurat: {
      cari: "",
      wilayah: "",
      blok: "",
      area: "",
      dropspot: "",
      cetak: "T",
      limit: 10,
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
      this.load = true;
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
        this.load = false;
        swalSuccess("Berhasil Menghubungkan ke PEDATREN");
        location.reload();
      } catch (err) {
        this.load = false;
      }
    },

    async hapusPedatren(uuid) {
      this.load = true;
      try {
        const resp = await api.put(`surat-jalan/hapus-pedatren/${uuid}`);
        localStorage.removeItem("x-token");
        const user = JSON.parse(localStorage.getItem("user"));
        user.username_pedatren = null;
        user.password_pedatren = null;
        localStorage.setItem("user", JSON.stringify(user));
        this.load = false;
        swalSuccess("Berhasil menghapus tautan ke PEDATREN");
        location.reload();
      } catch (err) {
        this.load = false;
      }
    },

    async generateIzin() {
      this.load = true;
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
        if (access.wilayah()) {
          this.getDataIzin();
        } else if (access.biktren()) {
          this.getDataKonfir();
        } else if (access.admin()) {
          this.getDataIzin();
          this.getDataKonfir();
        }
        this.load = false;
      } catch (err) {
        this.load = false;
      }
    },

    async konfirIzin() {
      this.load = true;
      const authToken = JSON.parse(localStorage.getItem("x-token"));
      const params = {
        params: this.paramsKonfir,
        headers: {
          "x-pedatren-token": authToken,
        },
      };
      try {
        const resp = await api.put(`surat-jalan/konfirmasi-izin`, null, params);
        this.load = false;
        swalSuccess(resp?.data?.message);
        if (access.biktren()) {
          this.getDataKonfir();
        } else if (access.admin()) {
          this.getDataKonfir();
          this.getDataSurat();
        }
      } catch (err) {
        this.load = false;
      }
    },

    async syncPedatren(uuid) {
      this.load = true;
      try {
        const resp = await api.get(`surat-jalan/login-pedatren/${uuid}`);
        localStorage.setItem("x-token", JSON.stringify(resp.data.token));
        swalSuccess("Berhasil Sinkronasi Ulang ke PEDATREN");
        location.reload();
        this.load = false;
      } catch (err) {
        this.load = false;
      }
    },

    async getDataIzin() {
      this.load = true;
      const params = { params: this.paramsIzin };
      try {
        await api.get("surat-jalan/izin-pedatren", params).then((resp) => {
          if ((resp.data.code = 200)) {
            this.itemsIzin = resp.data.data;
            this.metaIzin = resp.headers;
            this.load = false;
          }
        });
      } catch (error) {
        this.load = false;
      }
    },

    async getDataKonfir() {
      this.load = true;
      const params = { params: this.paramsKonfir };
      try {
        await api.get("surat-jalan/konfirmasi-izin", params).then((resp) => {
          if ((resp.data.code = 200)) {
            this.itemsKonfir = resp.data.data;
            this.metaKonfir = resp.headers;
            this.load = false;
          }
        });
      } catch (error) {
        this.load = false;
      }
    },

    async getDataSurat() {
      this.load = true;
      this.kop = await this.getImageSurat("kop.png");
      this.qr = await this.getImageSurat("ttd-qr.png");
      this.paraf1 = await this.getImageSurat("paraf1.png");
      this.paraf2 = await this.getImageSurat("paraf2.png");
      const params = { params: this.paramsSurat };
      try {
        const resp = await api.get("surat-jalan/cetak-surat", params);
        if ((resp.data.code = 200)) {
          this.itemsSurat = resp.data.data;
          this.metaSurat = resp.headers;
          for (const d of this.itemsSurat) {
            if (this.errorSurat.length >= 1) {
              break;
            }
            try {
              d.qrIzin = await this.getQR(d.santri.niup);
            } catch (err) {
              this.errorSurat.push(d.niup);
            }
          }
          this.load = false;
        }
      } catch (error) {
        this.load = false;
      }
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
      } catch (err) {
        this.errorSurat.push(niup);
      }
    },

    async getImageSurat(image) {
      try {
        const params = {
          responseType: "blob",
        };
        const response = await api.get(
          `cari-santri/surat-image/${image}`,
          params
        );
        return URL.createObjectURL(response.data);
      } catch (err) {
        this.errorSurat.push(niup);
      }
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
      this.load = true;
      try {
        await api.get("santri/filter/wilayah").then((resp) => {
          if ((resp.data.code = 200)) {
            this.filterIzin.wilayah = resp.data;
            this.load = false;
          }
        });
      } catch (error) {
        this.load = false;
      }
    },
    async getBlokIzin() {
      this.load = true;
      this.paramsIzin.blok = "";
      this.getDataIzin();
      try {
        await api
          .get(`santri/filter/blok?alias_wilayah=${this.paramsIzin.wilayah}`)
          .then((resp) => {
            if ((resp.data.code = 200)) {
              this.filterIzin.blok = resp.data;
              this.load = false;
            }
          });
      } catch (error) {
        this.load = false;
      }
    },
    async getAreaIzin() {
      this.load = true;
      try {
        await api.get("area").then((resp) => {
          if ((resp.data.code = 200)) {
            this.filterIzin.area = resp.data.data;
            this.load = false;
          }
        });
      } catch (error) {
        this.load = false;
      }
    },
    async getDropIzin() {
      this.load = true;
      this.paramsIzin.dropspot = "";
      this.getDataIzin();
      try {
        await api.get(`dropspot?area=${this.paramsIzin.area}`).then((resp) => {
          if ((resp.data.code = 200)) {
            this.filterIzin.dropspot = resp.data.data;
            this.load = false;
          }
        });
      } catch (error) {
        this.load = false;
      }
    },

    async getWilayahKonfir() {
      this.load = true;
      try {
        await api.get("santri/filter/wilayah").then((resp) => {
          if ((resp.data.code = 200)) {
            this.filterKonfir.wilayah = resp.data;
            this.load = false;
          }
        });
      } catch (error) {
        this.load = false;
      }
    },
    async getBlokKonfir() {
      this.load = true;
      this.paramsKonfir.blok = "";
      this.getDataKonfir();
      try {
        await api
          .get(`santri/filter/blok?alias_wilayah=${this.paramsKonfir.wilayah}`)
          .then((resp) => {
            if ((resp.data.code = 200)) {
              this.filterKonfir.blok = resp.data;
              this.load = false;
            }
          });
        this.load = false;
      } catch (error) {
        this.load = false;
      }
    },
    async getAreaKonfir() {
      this.load = true;
      try {
        await api.get("area").then((resp) => {
          if ((resp.data.code = 200)) {
            this.filterKonfir.area = resp.data.data;
            this.load = false;
          }
        });
      } catch (error) {
        this.load = false;
      }
    },
    async getDropKonfir() {
      this.load = true;
      this.paramsKonfir.dropspot = "";
      this.getDataKonfir();
      try {
        await api
          .get(`dropspot?area=${this.paramsKonfir.area}`)
          .then((resp) => {
            if ((resp.data.code = 200)) {
              this.filterKonfir.dropspot = resp.data.data;
              this.load = false;
            }
          });
      } catch (error) {
        this.load = false;
      }
    },

    async getWilayahSurat() {
      this.load = true;
      try {
        await api.get("santri/filter/wilayah").then((resp) => {
          if ((resp.data.code = 200)) {
            this.filterSurat.wilayah = resp.data;
            this.load = false;
          }
        });
      } catch (error) {
        this.load = false;
      }
    },
    async getBlokSurat() {
      this.load = true;
      this.paramsSurat.blok = "";
      this.getDataSurat();
      try {
        await api
          .get(`santri/filter/blok?alias_wilayah=${this.paramsSurat.wilayah}`)
          .then((resp) => {
            if ((resp.data.code = 200)) {
              this.filterSurat.blok = resp.data;
              this.load = false;
            }
          });
      } catch (error) {
        this.load = false;
      }
    },
    async getAreaSurat() {
      this.load = true;
      try {
        await api.get("area").then((resp) => {
          if ((resp.data.code = 200)) {
            this.filterSurat.area = resp.data.data;
            this.load = false;
          }
        });
      } catch (error) {
        this.load = false;
      }
    },
    async getDropSurat() {
      this.load = true;
      this.paramsSurat.dropspot = "";
      this.getDataSurat();
      try {
        await api.get(`dropspot?area=${this.paramsSurat.area}`).then((resp) => {
          if ((resp.data.code = 200)) {
            this.filterSurat.dropspot = resp.data.data;
            this.load = false;
          }
        });
      } catch (error) {
        this.load = false;
      }
    },
  },
});
