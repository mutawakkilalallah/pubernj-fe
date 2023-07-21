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
    setOpenAdd() {
      this.isOpenAdd = !this.isOpenAdd;
    },
    setOpenEdit() {
      this.isOpenEdit = !this.isOpenEdit;
    },
    setOpenEditPassword() {
      this.isOpenEditPassword = !this.isOpenEditPassword;
    },
    setOpenPilihUser() {
      this.isOpenPilihUser = !this.isOpenPilihUser;
    },
    async tambahData() {
      try {
        const resp = await api.post("user", this.form);
        this.isOpenAdd = false;
        Swal.fire("Berhasil", resp.data.message, "success");
        const table = useUserTable();
        table.getData();
        this.form = {};
        this.namaSantri = "";
      } catch (err) {
        Swal.fire(err.response.data.message, err.response.data.error, "error");
      }
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
      } catch (error) {
        Swal.fire(err.response.data.message, err.response.data.error, "error");
      }
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
          this.formEdit = {};
          Swal.fire("Berhasil", resp.data.message, "success");
          const table = useUserTable();
          table.getData();
        });
      } catch (err) {
        Swal.fire(err.response.data.message, err.response.data.error, "error");
      }
    },
    async editDataPassword() {
      try {
        await api
          .put(`user/password/${this.idEdit}`, this.formEditPassword)
          .then((resp) => {
            this.isOpenEditPassword = false;
            this.formEditPassword = {};
            Swal.fire("Berhasil", resp.data.message, "success");
            const table = useUserTable();
            table.getData();
          });
      } catch (err) {
        Swal.fire(err.response.data.message, err.response.data.error, "error");
      }
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
            Swal.fire("Berhasil", result.data.message, "success");
            this.form = {};
            const table = useUserTable();
            table.getData();
          });
        }
      });
    },
  },
});
