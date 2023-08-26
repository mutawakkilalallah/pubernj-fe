import { defineStore } from "pinia";
import { api } from "../../plugins/axios";
import print from "print-js";

export const useCetakPenumpang = defineStore("cetak_penumpang", {
  state: () => ({
    item: {},
    qr: "",
  }),
  actions: {
    async getDataDetail(niup) {
      try {
        await api.get(`penumpang/surat-jalan/${niup}`).then((resp) => {
          if ((resp.data.code = 200)) {
            console.log(resp.data.data);
            this.item = resp.data.data;
            this.getQr(resp.data.data.niup);
          }
        });
      } catch (error) {}
    },
    async getQr(niup) {
      try {
        const params = {
          responseType: "blob",
        };
        await api.get(`penumpang/qrcode/${niup}`, params).then((resp) => {
          this.qr = URL.createObjectURL(resp.data);
          console.log(this.qr);
        });
      } catch (error) {}
    },
    cetak() {
      print({
        printable: "kertas",
        type: "html",
        css: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css",
        font_size: "11px",
        targetStyle: "background-color: black",
        style: `
          @media print {
            @page {
              size: F4 landscape;
              width: 50%;
              height: auto;
              margin: 0 0 0 2cm;
            }
            body {
              font-family: 'Arial', sans-serif;
            }
          }
        `,
      });
    },
  },
});
