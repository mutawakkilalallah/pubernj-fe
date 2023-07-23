import { defineStore } from "pinia";
import { api } from "../../plugins/axios";
import Swal from "sweetalert2";
import { useDropsotTable } from "./table";

export const useDropspotForm = defineStore("form_dropspot", {
  state: () => ({
    isOpenAdd: false,
    isOpenEdit: false,
    isArea: [],
    idEdit: "",
    namaArea: "",
    form: {
      nama: "",
      type: "",
      area_id: "",
      cakupan: "",
      harga: "",
    },
  }),
  actions: {
    setOpenAdd() {
      this.isOpenAdd = !this.isOpenAdd;
    },
    setOpenEdit() {
      this.isOpenEdit = !this.isOpenEdit;
    },
    getArea() {
      try {
        api.get("area").then((resp) => {
          //  console.log('areadrop', resp.data.data);
          this.isArea = resp.data.data;
        });
      } catch (error) {}
    },
    async tambahData() {
      try {
        const resp = await api.post("dropspot", this.form);
        this.isOpenAdd = false;
        const table = useDropsotTable();
        table.getData();
        this.form = {};
      } catch (err) {}
    },
    handleDoubleClik(d) {
      this.idEdit = d.id;
      this.namaArea = d.area ? d.area.nama : "kosong";
      this.form.nama = d.nama;
      this.form.type = d.type;
      this.form.area_id = d.area_id;
      this.form.cakupan = d.cakupan;
      this.form.harga = d.harga;
      this.isOpenEdit = true;
    },
    async editData() {
      try {
        await api.put(`dropspot/${this.idEdit}`, this.form).then((resp) => {
          this.isOpenEdit = false;
          this.form = {};
          const table = useDropsotTable();
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
          api.delete(`dropspot/${this.idEdit}`).then((result) => {
            this.isOpenEdit = false;
            this.form = {};
            const table = useDropsotTable();
            table.getData();
          });
        }
      });
    },
  },
});
