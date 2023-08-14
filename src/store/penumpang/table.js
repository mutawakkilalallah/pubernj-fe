import { defineStore } from "pinia";
import { api } from "../../plugins/axios";
import { utils, writeFile, write } from "xlsx";
import { saveAs } from "file-saver";

export const usePenumpangTable = defineStore("table_penumpang", {
  state: () => ({
    items: [],
    meta: {},
    myPage: "",
    filter: {
      area: [],
      dropspot: [],
      wilayah: [],
      blok: [],
      armada: [],
    },
    // areaId: "",
    params: {
      cari: "",
      dropspot: "",
      area: "",
      wilayah: "",
      blok: "",
      pembayaran: "",
      jenis_kelamin: "",
      armada: "",
      page: 1,
      limit: 25,
    },
    params2: {
      limit: 50,
    },
    itemsExport: [],
    btnDisable: true,
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
        await api.get("penumpang", params).then((resp) => {
          console.log("data", resp.data.data);
          if ((resp.data.code = 200)) {
            this.totalData = resp.headers["x_total_data"];
            this.items = resp.data.data;
            this.meta = resp.headers;
            this.filter.area = resp.data.filter.area;
            this.params2.limit = resp.headers.x_total_data;
            this.getDataExport();
          }
        });
      } catch (error) {}
    },

    async getDataExport() {
      const params = { params: this.params2 };
      try {
        await api.get("penumpang", params).then((resp) => {
          if ((resp.data.code = 200)) {
            this.itemsExport = resp.data.data;
          }
        });
      } catch (error) {}
    },

    exportExel() {
      if (this.itemsExport.length > 0) {
        const tanggal = this.tanggal();
        const data = this.formatJson(this.itemsExport);
        const worksheet = utils.json_to_sheet(data);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, "Data");
        const excelBuffer = this.writeExcelBuffer(workbook);
        this.saveExcelFile(excelBuffer, `datapenumpang ${tanggal}.xlsx`);
      } else {
        this.btnDisable = false;
      }
    },

    saveExcelFile(buffer, fileName) {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, fileName);
    },
    writeExcelBuffer(workbook) {
      const excelBuffer = write(workbook, { bookType: "xlsx", type: "array" });
      return excelBuffer;
    },

    // mengambil semua data yaang akan di export
    formatJson(data) {
      const temp = [];
      data.forEach((a) => {
        const tampung = {
          niup: "",
          nama: "",
          kecamatan: "",
          kabupaten: "",
          provinsi: "",
          daerah: "",
          wilayah: "",
          lembaga: "",
          status_kepulangan: "",
          dropspot: "",
          armada: "",
          area: "",
          tarif: "",
          status_pembayaran: "",
        };
        tampung.niup = a.santri.niup;
        tampung.nama = a.santri.nama_lengkap;
        tampung.kecamatan = a.santri.kecamatan;
        tampung.kabupaten = a.santri.kabupaten;
        tampung.provinsi = a.santri.provinsi;
        tampung.daerah = a.santri.blok;
        tampung.wilayah = a.santri.wilayah;
        tampung.lembaga = "";
        tampung.status_kepulangan = a.santri.status_kepulangan;
        tampung.dropspot = a.dropspot.nama;
        tampung.armada = "";
        tampung.area = a.dropspot.area.nama;
        tampung.tarif = a.dropspot.harga;
        tampung.status_pembayaran = a.status_bayar;

        temp.push(tampung);
      });
      return temp;
    },

    tanggal() {
      const date = new Date();
      const d = date.getDate();
      const m = date.getMonth() + 1;
      const y = date.getFullYear();
      return (d <= 9 ? "0" + d : d) + "-" + (m <= 9 ? "0" + m : m) + "-" + y;
    },

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
    async getArmada() {
      try {
        await api.get(`armada`).then((resp) => {
          if ((resp.data.code = 200)) {
            this.filter.armada = resp.data.data;
          }
        });
      } catch (error) {}
    },
  },
});
