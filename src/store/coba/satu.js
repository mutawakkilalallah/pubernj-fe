import { defineStore } from "pinia";

export const useCobaStore = defineStore("coba_lagi", {
  state: () => ({
    dua: "test",
    form: {
      alamat: null,
      nama: null,
    },
  }),
  actions: {
    ubah() {
      console.log(this.form);
    },
  },
});
