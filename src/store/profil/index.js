import { defineStore } from "pinia";
import { api } from "../../plugins/axios";

export const useProfilStore = defineStore("profil_store", {
  state: () => ({
    data: {},
    fotoDiri: "",
    form: {
      password: "",
    },
    confirm: {
      password: "",
    },
  }),
  actions: {
    async getDataDetail(uuid) {
      try {
        await api.get(`user/${uuid}`).then((resp) => {
          if ((resp.data.code = 200)) {
            this.getImage(resp.data.data.niup);
            this.data = resp.data.data;
          }
        });
      } catch (error) {}
    },

    async getImage(niup) {
      try {
        const params = {
          responseType: "blob",
        };
        await api.get("santri/image/" + niup, params).then((resp) => {
          this.fotoDiri = URL.createObjectURL(resp.data);
        });
      } catch (error) {}
    },

    async updatePassword(uuid) {
      try {
        await api.put(`user/password/${uuid}`, this.form).then((resp) => {
          this.form.password = "";
          this.confirm.password = "";
        });
      } catch (error) {}
    },
  },
});
