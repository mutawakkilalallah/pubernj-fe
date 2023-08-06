import { defineStore } from "pinia";
import * as storage from "../../modules/storage";
import { api } from "../../plugins/axios";
import router from "../../router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") ? storage.getLocalToken() : null,
    user: localStorage.getItem("user") ? storage.getUser() : null,
    foto: "",
    stast: {},
    chart: [],
    loading: false,
  }),
  getters: {
    isAuth(state) {
      return state.token !== null || state.token !== undefined;
    },
    getToken: () => storage.getLocalToken(),
    useGetter: () =>
      storage.getUser() !== null || storage.getUser() !== undefined,
    getNamaLengkap: () =>
      storage.getNama() !== null || storage.getNama() !== undefined,
    getFotoProfil: () =>
      storage.getFoto() !== null || storage.getFoto() !== undefined,
  },
  actions: {
    async login(payload) {
      this.loading = true;
      try {
        await api.post("login", payload).then((resp) => {
          storage.setLocalToken(resp.data.token);
          storage.setUser(resp.data.data);
          const hdd = storage.getLocalToken();
          const hddUser = storage.getUser();
          if (hdd) {
            this.SET_TOKEN_USER(hdd, hddUser);
            this.loading = false;
          } else {
            this.loading = false;
            router.push("/login");
          }
        });
      } catch (error) {
        this.loading = false;
      }
    },
    async getImage(uuid, size) {
      this.loading = true;
      try {
        const params = {
          responseType: "blob",
        };
        await api
          .get("santri/image/" + uuid + "?size=" + size, params)
          .then((resp) => {
            this.foto = URL.createObjectURL(resp.data);
            this.loading = false;
          });
      } catch (error) {
        this.loading = false;
      }
    },
    async getStats() {
      try {
        await api.get("dashboard").then((resp) => {
          this.stast = resp.data.data.counter;
          this.chart = resp.data.data.stat;
          console.log('chatr', this.chart);
        });
      } catch (error) {}
    },
    SET_TOKEN_USER(token, user) {
      storage.setHeaderToken(token);
      this.token = token;
      this.user = user;
      router.push("/");
    },
  },
});
