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
    fotoDiri: "",
    mode: "internal",
    editMode: "",
    isArea: [],
    personUser: {},
    idEdit: "",
    roleValue: "",
    namaPerson: "",
    niup: "",
    formInt: {
      nama_lengkap: "",
      niup: "",
      username: "",
      no_hp: "",
      role: "",
      password: "",
      area_id: "",
    },
    formEdit: {
      santri_uuid: "",
      no_hp: "",
      role: "",
      area_id: "",
    },
    formEditPassword: {
      password: "",
    },
  }),
  actions: {
    resetForm() {
      (this.formInt.niup = ""), (this.formInt.username = "");
      this.formInt.role = "";
      this.formInt.password = "";
      this.formInt.no_hp = "";
      // form edit
      this.formEdit.santri_uuid = "";
      this.formEdit.username = "";
      this.formEdit.role = "";
      this.formEdit.area_id = "";
      this.formEdit.no_hp = "";
      // form edit password
      this.formEditPassword.password = "";
      // mode
      this.mode = "internal";
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
    setInternalMode() {
      this.mode = "internal";
      this.formInt.role = "";
    },
    setExternalMode() {
      this.mode = "external";
      this.formInt.role = "p4nj";
    },
    setOpenPilihUser() {
      this.isOpenPilihUser = !this.isOpenPilihUser;
    },
    async tambahData() {
      try {
        const resp = await api.post(`user/${this.mode}`, this.formInt);
        this.isOpenAdd = false;
        const table = useUserTable();
        table.getData();
        this.resetForm();
        this.namaSantri = "";
        this.santriUser = {};
      } catch (err) {}
    },
    async getByNiup() {
      try {
        await api.get(`user/pilih/${this.niup}`).then((resp) => {
          if ((resp.data.code = 200)) {
            this.personUser = resp.data.data;
            this.getImage(this.niup);
          }
        });
      } catch (error) {}
    },
    async getArea() {
      try {
        await api.get("area").then((resp) => {
          this.isArea = resp.data.data;
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
      } catch (error) {
        console.log("error", error);
      }
    },
    handleDoubleClik(d) {
      this.idEdit = d.uuid;
      this.roleValue = d.role ? d.role : "kosong";
      this.formEdit.santri_uuid = d.santri_uuid;
      this.formEdit.role = d.role;
      this.formEdit.no_hp = d.no_hp;
      this.formEdit.username = d.username;
      this.isOpenEdit = true;
      this.editMode = d.type;
      if (d.role === "p4nj") {
        this.formEdit.area_id = d.area_id;
      }
    },
    handleChangePassword(d) {
      this.idEdit = d.uuid;
      this.formEdit.password = null;
      this.isOpenEditPassword = true;
    },
    handleOpenPilihUser() {
      this.isOpenPilihUser = true;
    },
    handleUserPilih(nama, niup) {
      this.formInt.niup = niup;
      this.namaPerson = nama;
      this.niup = "";
      this.personUser = {};
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
            this.idEdit=""
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
