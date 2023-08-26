import { defineStore } from "pinia";
import { api } from "../../plugins/axios";
import router from "../../router";

export const usePenumpangDetailTable = defineStore("table_penumpang_detail", {
  state: () => ({
    item: {},
    fotoDiri: "",
  }),
  actions: {
    async getDataDetail(uuid) {
      try {
        await api.get(`penumpang/${uuid}`).then((resp) => {
          if ((resp.data.code = 200)) {
            this.item = resp.data.data;
            this.getImage(resp.data.data.santri.niup, "medium");
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
    async izinPedatren(niup, uuid) {
      try {
        await api.post(`/penumpang/qrcode/${niup}`).then((resp) => {
          this.getDataDetail(uuid);
        });
      } catch (error) {
        console.log("error", error);
      }
    },
    goToSuratJalan(niup) {
      router.push(`/penumpang/surat-jalan/${niup}`);
    },
  },
});
