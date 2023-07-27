import { defineStore } from "pinia";
import { api } from "../../plugins/axios";
import Swal from "sweetalert2";
import { useUserTable } from "./table";

export const useUserFrom = defineStore("form_user", {
  state: () => ({
    isOpenAdd: false,
    isOpenEdit: false,
    isOpenEditPassword: false,
    isOpenPilihUser: false,
    isArea: [],
    santriUser: [],
    idEdit: "",
    roleValue: "",
    namaSantri: "",
    cariSantri: "",
    form: {
      santri_uuid: "",
      username: "",
      role: "",
      password: "",
    },
    formEdit: {
      santri_uuid: "",
      username: "",
      role: "",
    },
    formEditPassword: {
      password: "",
    },
  }),
  actions: {
    resetForm() {
      (this.form.santri_uuid = ""), (this.form.username = "");
      this.form.role = "";
      this.form.password = "";
      // form edit
      this.formEdit.santri_uuid = "";
      this.formEdit.username = "";
      this.formEdit.role = "";
      // form edit password
      this.formEditPassword.password = "";
    },
    setOpenAdd() {
      this.isOpenAdd = !this.isOpenAdd;
    },
    setOpenEdit() {
      this.isOpenEdit = !this.isOpenEdit;
      this.resetForm();
    },
    setOpenEditPassword() {
      this.isOpenEditPassword = !this.isOpenEditPassword;
      this.resetForm();
    },
    setOpenPilihUser() {
      this.isOpenPilihUser = !this.isOpenPilihUser;
    },
    async tambahData() {
      try {
        const resp = await api.post("user", this.form);
        this.isOpenAdd = false;
        const table = useUserTable();
        table.getData();
        this.resetForm();
        this.namaSantri = "";
        this.santriUser = [];
      } catch (err) {}
    },
    async getSantri() {
      try {
        const params = {
          cari: this.cariSantri,
        };
        await api.get("santri", { params: params }).then((resp) => {
          if ((resp.data.code = 200)) {
            this.santriUser = resp.data.data;
          }
        });
      } catch (error) {}
    },
    handleDoubleClik(d) {
      this.idEdit = d.id;
      this.roleValue = d.role ? d.role : "kosong";
      this.formEdit.santri_uuid = d.santri_uuid;
      this.formEdit.role = d.role;
      this.formEdit.username = d.username;
      this.isOpenEdit = true;
    },
    handleChangePassword(d) {
      this.idEdit = d.id;
      this.formEdit.password = null;
      this.isOpenEditPassword = true;
    },
    handleOpenPilihUser() {
      this.isOpenPilihUser = true;
    },
    handleUserPilih(uuid, nama) {
      this.form.santri_uuid = uuid;
      this.namaSantri = nama;
      this.cariSantri = "";
      this.isOpenPilihUser = false;
    },
    async editData() {
      try {
        await api.put(`user/${this.idEdit}`, this.formEdit).then((resp) => {
          this.isOpenEdit = false;
          this.resetForm();
          const table = useUserTable();
          table.getData();
        });
      } catch (err) {}
    },
    async editDataPassword() {
      try {
        await api
          .put(`user/password/${this.idEdit}`, this.formEditPassword)
          .then((resp) => {
            this.isOpenEditPassword = false;
            this.resetForm();
            const table = useUserTable();
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
          api.delete(`user/${this.idEdit}`).then((result) => {
            this.isOpenEdit = false;
            this.resetForm();
            const table = useUserTable();
            table.getData();
          });
        }
      });
    },
  },
});
