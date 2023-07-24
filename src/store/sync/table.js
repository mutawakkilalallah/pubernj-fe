import { defineStore } from "pinia";
import { api } from "../../plugins/axios";
import { swalSuccess } from "../../modules/untils";

export const useSyncTable = defineStore("table_sync", {
  state: () => ({
    setupPenumpangItems: 0,
    setupSantriItems: 0,
    showSyncButtonPenumpang: false,
    showSyncButtonSantri: false,
    isLoading: false,
  }),
  actions: {
    async getSetupPenumpang() {
      try {
        await api.get("sync/setup/penumpang").then((resp) => {
          if ((resp.data.code = 200)) {
            swalSuccess(resp.data.message);
            this.setupPenumpangItems = resp.data.data;
            this.showSyncButtonPenumpang = true;
          }
        });
      } catch (error) {}
    },
    async generatePenumpang(page) {
      try {
        this.isLoading = true;
        await api.post("sync/generate/penumpang/" + page).then((resp) => {
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
    async getSetupSantri() {
      try {
        await api.get("sync/setup/santri").then((resp) => {
          if ((resp.data.code = 200)) {
            swalSuccess(resp.data.message);
            this.setupSantriItems = resp.data.data;
            this.showSyncButtonSantri = true;
          }
        });
      } catch (error) {}
    },
    async generateSantri(page) {
      try {
        this.isLoading = true;
        await api.post("sync/generate/santri/" + page).then((resp) => {
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
