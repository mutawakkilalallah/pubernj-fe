import { defineStore } from "pinia";
import { api } from "../../plugins/axios";
import Swal from "sweetalert2";
import { useArmadaTable } from "./table";

export const useArmadaForm = defineStore("form_armada", {
  state: () => ({
    isOpenAdd: false,
    isOpenEdit: false,
    isArea: [],
    isDropspot: [],
    idEdit: "",
    idArea: "",
    namaArea: "",
    namaDropsot: "",
    form: {
      nama: "",
      type: "",
      dropspot_id: "",
    },
  }),
  actions: {
    resetForm() {
      this.idArea = "";
      this.form.nama = "";
      this.form.type = "";
      this.form.dropspot_id = "";
    },
    setOpenAdd() {
      this.isOpenAdd = !this.isOpenAdd;
    },
    setOpenEdit() {
      this.isOpenEdit = !this.isOpenEdit;
      this.resetForm();
    },
    getArea() {
      try {
        api.get("area").then((resp) => {
          this.isArea = resp.data.data;
        });
      } catch (error) {}
    },
    getArea() {
      try {
        api.get("area").then((resp) => {
          this.isArea = resp.data.data;
        });
      } catch (error) {}
    },
    async getDropspot() {
      this.form.dropspot_id = "";
      const params = { params: { area: this.idArea } };
      try {
        await api.get("dropspot", params).then((resp) => {
          this.isDropspot = resp.data.data;
        });
      } catch (error) {}
    },
    async tambahData() {
      try {
        await api.post("armada", this.form);
        this.isOpenAdd = false;
        const table = useArmadaTable();
        table.getData();
        this.resetForm();
      } catch (err) {}
    },
    handleDoubleClik(d) {
      this.idEdit = d.id;
      this.idArea = d.dropspot.area_id;
      this.namaDropsot = d.dropspot.nama;
      this.form.nama = d.nama;
      this.form.type = d.type;
      this.getDropspot();
      this.form.dropspot_id = d.dropspot_id;
      this.isOpenEdit = true;
    },
    async editData() {
      try {
        await api.put(`armada/${this.idEdit}`, this.form).then((resp) => {
          this.isOpenEdit = false;
          this.resetForm();
          const table = useArmadaTable();
          table.getData();
        });
      } catch (err) {}
    },
    async deleteData() {
      Swal.fire({
        title: "Konfirmasi",
        text: "Apakah anda yakin ingin menghapus data ?",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Hapus",
        confirmButtonColor: "#DC3545",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          api.delete(`armada/${this.idEdit}`).then((result) => {
            this.isOpenEdit = false;
            this.resetForm();
            const table = useArmadaTable();
            table.getData();
          });
        }
      });
    },
  },
});
