import { defineStore } from "pinia";
import * as storage from "../../modules/storage";
import { api } from "../../plugins/axios";
import { swalSuccess } from "../../modules/untils";

export const useSyncTable = defineStore("table_sync", {
  state: () => ({
    user: localStorage.getItem("user") ? storage.getUser() : null,
    isLoading: false,
  }),
  actions: {
    async generatePenumpangv1() {
      try {
        this.isLoading = true;
        await api.post("sync/generate/penumpang/v1").then((resp) => {
          if ((resp.data.code = 200)) {
            this.isLoading = false;
            swalSuccess(resp.data.message);
          }
        });
      } catch (error) {}
    },
    async generatePenumpangv2() {
      try {
        this.isLoading = true;
        await api.post("sync/generate/penumpang/v2").then((resp) => {
          if ((resp.data.code = 200)) {
            this.isLoading = false;
            swalSuccess(resp.data.message);
          }
        });
      } catch (error) {}
    },
    async generatePenumpangv3() {
      try {
        this.isLoading = true;
        await api.post("sync/generate/penumpang/v3").then((resp) => {
          if ((resp.data.code = 200)) {
            this.isLoading = false;
            swalSuccess(resp.data.message);
          }
        });
      } catch (error) {}
    },
    async generatePenumpangv4() {
      try {
        this.isLoading = true;
        await api.post("sync/generate/penumpang/v4").then((resp) => {
          if ((resp.data.code = 200)) {
            this.isLoading = false;
            swalSuccess(resp.data.message);
          }
        });
      } catch (error) {}
    },
    async generatePenumpangv5() {
      try {
        this.isLoading = true;
        await api.post("sync/generate/penumpang/v5").then((resp) => {
          if ((resp.data.code = 200)) {
            this.isLoading = false;
            swalSuccess(resp.data.message);
          }
        });
      } catch (error) {}
    },
    async generatePenumpangv6() {
      try {
        this.isLoading = true;
        await api.post("sync/generate/penumpang/v6").then((resp) => {
          if ((resp.data.code = 200)) {
            this.isLoading = false;
            swalSuccess(resp.data.message);
          }
        });
      } catch (error) {}
    },
    async generatePenumpangv7() {
      try {
        this.isLoading = true;
        await api.post("sync/generate/penumpang/v7").then((resp) => {
          if ((resp.data.code = 200)) {
            this.isLoading = false;
            swalSuccess(resp.data.message);
          }
        });
      } catch (error) {}
    },
    async generatePenumpangv8() {
      try {
        this.isLoading = true;
        await api.post("sync/generate/penumpang/v8").then((resp) => {
          if ((resp.data.code = 200)) {
            this.isLoading = false;
            swalSuccess(resp.data.message);
          }
        });
      } catch (error) {}
    },
    async generatePenumpangv9() {
      try {
        this.isLoading = true;
        await api.post("sync/generate/penumpang/v9").then((resp) => {
          if ((resp.data.code = 200)) {
            this.isLoading = false;
            swalSuccess(resp.data.message);
          }
        });
      } catch (error) {}
    },
    async generatePenumpangv10() {
      try {
        this.isLoading = true;
        await api.post("sync/generate/penumpang/v10").then((resp) => {
          if ((resp.data.code = 200)) {
            this.isLoading = false;
            swalSuccess(resp.data.message);
          }
        });
      } catch (error) {}
    },
    async generatePenumpangv11() {
      try {
        this.isLoading = true;
        await api.post("sync/generate/penumpang/v11").then((resp) => {
          if ((resp.data.code = 200)) {
            this.isLoading = false;
            swalSuccess(resp.data.message);
          }
        });
      } catch (error) {}
    },
    async generatePenumpangv12() {
      try {
        this.isLoading = true;
        await api.post("sync/generate/penumpang/v12").then((resp) => {
          if ((resp.data.code = 200)) {
            this.isLoading = false;
            swalSuccess(resp.data.message);
          }
        });
      } catch (error) {}
    },
    async updatePenumpang() {
      try {
        this.isLoading = true;
        await api.put("sync/update/penumpang/").then((resp) => {
          if ((resp.data.code = 200)) {
            this.isLoading = false;
            swalSuccess(resp.data.message);
          }
        });
      } catch (error) {}
    },
    async updateUser() {
      try {
        this.isLoading = true;
        await api.put("sync/update/user/").then((resp) => {
          if ((resp.data.code = 200)) {
            this.isLoading = false;
            swalSuccess(resp.data.message);
          }
        });
      } catch (error) {}
    },
    async generateSantri() {
      try {
        this.isLoading = true;
        await api.post("sync/generate/santri").then((resp) => {
          if ((resp.data.code = 200)) {
            this.isLoading = false;
            swalSuccess(resp.data.message);
          }
        });
      } catch (error) {}
    },
    async updateSantri() {
      try {
        this.isLoading = true;
        await api.put("sync/update/santri/").then((resp) => {
          if ((resp.data.code = 200)) {
            this.isLoading = false;
            swalSuccess(resp.data.message);
          }
        });
      } catch (error) {}
    },
  },
});
