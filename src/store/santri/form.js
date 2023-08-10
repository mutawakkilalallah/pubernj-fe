import { defineStore } from "pinia";
import { api } from "../../plugins/axios";
import Swal from "sweetalert2";
import { useSantriTable } from "./table";

export const useSantriForm = defineStore("form_santri", {
  state: () => ({
    isOpenEdit: false,
    idArea: "",
    isArea: [],
    isDropspot: [],
    formEditDropspot: {
      dropspot_id: "",
    },
  }),
  actions: {
    setOpenEdit() {
      this.isOpenEdit = !this.isOpenEdit;
    },
    getArea() {
      try {
        api.get("area").then((resp) => {
          this.isArea = resp.data.data;
        });
      } catch (error) {}
    },
    async getDropspot() {
      this.formEditDropspot.dropspot_id = "";
      const params = { params: { area: this.idArea } };
      try {
        await api.get("dropspot", params).then((resp) => {
          this.isDropspot = resp.data.data;
        });
      } catch (error) {}
    },
    async editData() {
      const table = useSantriTable();
      try {
        await api
          .post(`santri/daftar/${table.uuid}`, this.formEditDropspot)
          .then((resp) => {
            this.isOpenEdit = false;
            this.formEditDropspot.dropspot_id = "";
            this.idArea = "";
            table.uuid = "";
            table.isOpenDetail = false;
            table.getData();
          });
      } catch (err) {
        Swal.fire(err.response.data.message, err.response.data.error, "error");
      }
    },
  },
});
