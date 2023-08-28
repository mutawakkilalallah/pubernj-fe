import { defineStore } from "pinia";
import { useAreaTable } from "../area/table";
import { api } from "../../plugins/axios";
import Swal from "sweetalert2";

export const useAreaForm = defineStore("form_area", {
  state: () => ({
    isOpenAdd: false,
    isOpenEdit: false,
    idEdit: "",
    form: {
      nama: "",
      pic: "",
      no_hp: "",
      pic_ext: "",
      no_hp_ext: "",
    },
  }),
  actions: {
    resetForm() {
      this.form.nama = "";
      this.form.pic = "";
      this.form.no_hp = "";
      this.form.pic_ext = "";
      this.form.no_hp_ext = "";
    },
    setOpenAdd() {
      this.isOpenAdd = !this.isOpenAdd;
    },
    setOpenEdit() {
      this.isOpenEdit = !this.isOpenEdit;
      this.resetForm();
    },
    async tambahData() {
      try {
        const resp = await api.post("area", this.form);
        this.setOpenAdd();
        this.resetForm();
        const table = useAreaTable();
        table.getData();
      } catch (err) {}
    },
    handleDoubleClick(data) {
      console.log(data);
      this.idEdit = data.id;
      this.isOpenEdit = true;
      this.form.nama = data.nama;
      this.form.pic = data.pic;
      this.form.no_hp = data.no_hp;
      this.form.pic_ext = data.pic_ext;
      this.form.no_hp_ext = data.no_hp_ext;
    },
    async editData() {
      try {
        const resp = await api.put(`area/${this.idEdit}`, this.form);
        this.isOpenEdit = false;
        this.resetForm();
        const table = useAreaTable();
        table.getData();
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
          api.delete(`area/${this.idEdit}`).then((result) => {
            this.isOpenEdit = false;
            this.resetForm();
            const table = useAreaTable();
            table.getData();
          });
        }
      });
    },
  },
});
