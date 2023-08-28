import { defineStore } from "pinia";
import * as storage from "../../modules/storage";
import { api } from "../../plugins/axios";
import { utils, writeFile, write } from "xlsx";
import { saveAs } from "file-saver";

export const useDropsotTable = defineStore("table_dropspot", {
  state: () => ({
    user: localStorage.getItem("user") ? storage.getUser() : null,
    items: [],
    meta: {},
    params: {
      cari: "",
      area: "",
      grup: "",
    },
  }),
  actions: {
    async getData() {
      const params = { params: this.params };
      try {
        await api.get("dropspot", params).then((resp) => {
          if ((resp.data.code = 200)) {
            this.items = resp.data.data;
            this.meta = resp.headers;
          }
        });
      } catch (error) {}
    },
    exportExel() {
      // console.log(this.items);
      const tanggal = this.tanggal();
      const data = this.formatJson(this.items);
      const worksheet = utils.json_to_sheet(data);
      const workbook = utils.book_new();
      utils.book_append_sheet(workbook, worksheet, "Data");
      const excelBuffer = this.writeExcelBuffer(workbook);
      this.saveExcelFile(excelBuffer, `Data Armada ${tanggal}.xlsx`);
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
          area: "",
          cakupan: "",
          dropspot: "",
          jam_berangkat: "",
          tarif: "",
        };
        tampung.area = a.area.nama;
        tampung.cakupan = a.cakupan;
        tampung.dropspot = a.nama;
        tampung.jam_berangkat = a.jam_berangkat;
        tampung.tarif = a.harga;

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
  },
});
