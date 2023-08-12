import { defineStore } from "pinia";
import { api } from "../../plugins/axios";
import { usePenumpangTable } from "./table";
import router from "../../router";
import Swal from "sweetalert2";

export const usePenumpangForm = defineStore("form_penumpang", {
  state: () => ({
    contextMenuVisible: false,
    contextMenuPosition: { x: 0, y: 0 },
    isOpenEditDropspot: false,
    isOpenEditPembayaran: false,
    isArea: [],
    isDropspot: [],
    idEdit: "",
    idDelete: "",
    idArea: "",
    dataEdit: {},
    formEditDropspot: {
      dropspot_id: "",
    },
    formEditPembayaran: {
      jumlah_bayar: "",
      status_bayar: "",
    },
    isOpen: false
  }),
  actions: {
    setOpen(a) {
      this.dataEdit = a
      this.isOpen = true
    },
    closeOpen() {
      this.dataEdit={}
      this.isOpen = false
    },
    showContextMenu(event, d) {
      event.preventDefault();
      this.dataEdit = d;
      this.idEdit = d.id;
      this.contextMenuPosition = { x: event.clientX, y: event.clientY };
      this.contextMenuVisible = true;
      document.addEventListener("click", this.handleOutsideClick);
    },
    handleOutsideClick(event) {
      this.contextMenuVisible = false;
      document.removeEventListener("click", this.handleOutsideClick);
    },
    resetFormEditDropspot() {
      this.formEditDropspot.dropspot_id = "";
    },
    resetFormEditPembayaran() {
      this.formEditPembayaran.jumlah_bayar = "";
      this.formEditPembayaran.status_bayar = "";
    },
    setOpenEditDropspot() {
      this.isOpenEditDropspot = !this.isOpenEditDropspot;
      this.resetFormEditDropspot();
    },
    setOpenEditPembayaran() {
      this.isOpenEditPembayaran = !this.isOpenEditPembayaran;
      this.resetFormEditPembayaran();
    },
    handleOpenEditDropspot() {
       this.isOpen = false
      this.idArea = this.dataEdit.dropspot.area_id;
      this.getArea();
      this.getDropspot();
      this.formEditDropspot.dropspot_id = this.dataEdit.dropspot_id;
      this.isOpenEditDropspot = true;
    },
    handleOpenEditPembayaran() {
       this.isOpen = false
      this.formEditPembayaran.status_bayar = this.dataEdit.status_bayar;
      this.formEditPembayaran.jumlah_bayar = this.dataEdit.jumlah_bayar;
      this.isOpenEditPembayaran = true;
    },
    goToDetail() {
       this.isOpen = false
      router.push(`penumpang/${this.dataEdit.santri_uuid}/detail`);
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
    async editDropspot() {
      try {
        await api
          .put(`penumpang/dropspot/${this.idEdit}`, this.formEditDropspot)
          .then((resp) => {
            this.isOpenEditDropspot = false;
            this.resetFormEditDropspot();
            const table = usePenumpangTable();
            table.getData();
          });
      } catch (err) {}
    },
    async editPembayaran() {
      try {
        await api
          .put(`penumpang/pembayaran/${this.idEdit}`, this.formEditPembayaran)
          .then((resp) => {
            this.isOpenEditPembayaran = false;
            this.resetFormEditPembayaran();
            const table = usePenumpangTable();
            table.getData();
          });
      } catch (err) {}
    },
    async deleteRombongan() {
       this.isOpen = false
      Swal.fire({
        title: "Konfirmasi",
        text: "Apakah anda yakin ingin mengeluarkan dari rombongan ?",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "keluarkan",
        confirmButtonColor: "#DC3545",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          api
            .delete(`penumpang/${this.dataEdit.santri_uuid}`)
            .then((result) => {
              this.isOpenEdit = false;
              const table = usePenumpangTable();
              table.getData();
            });
        }
      });
    },
  },
});
