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
    isOpenImportPembayaran: false,
    isArea: [],
    isDropspot: [],
    idEdit: "",
    idDelete: "",
    idArea: "",
    dataEdit: {},
    formImportPembayaran: {
      excelFile: null,
    },
    formEditDropspot: {
      dropspot_id: "",
    },
    formEditPembayaran: {
      jumlah_bayar: "",
      status_bayar: "",
    },
  }),
  actions: {
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
    resetFormImportPembayaran() {
      this.formImportPembayaran.excelFile = null;
    },
    setOpenEditDropspot() {
      this.isOpenEditDropspot = !this.isOpenEditDropspot;
      this.resetFormEditDropspot();
    },
    setOpenImportPembayaran() {
      this.isOpenImportPembayaran = !this.isOpenImportPembayaran;
      this.resetFormImportPembayaran();
    },
    setOpenEditPembayaran() {
      this.isOpenEditPembayaran = !this.isOpenEditPembayaran;
      this.resetFormEditPembayaran();
    },
    handleOpenEditDropspot() {
      this.idArea = this.dataEdit.dropspot.area_id;
      this.getArea();
      this.getDropspot();
      this.formEditDropspot.dropspot_id = this.dataEdit.dropspot_id;
      this.isOpenEditDropspot = true;
    },
    handleOpenEditPembayaran() {
      this.formEditPembayaran.status_bayar = this.dataEdit.status_bayar;
      this.formEditPembayaran.jumlah_bayar = this.dataEdit.jumlah_bayar;
      this.isOpenEditPembayaran = true;
    },
    goToDetail() {
      router.push(`penumpang/${this.dataEdit.santri_uuid}/detail`);
    },
    goToDetailClick(a) {
      // console.log('DETAIL', a.santri_uuid);
      this.dataEdit = a;
      router.push(`penumpang/${this.dataEdit.santri_uuid}/detail`);
    },
    handleFileChange(event) {
      this.formImportPembayaran.excelFile = event.target.files[0];
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
    async importPembayaran() {
      try {
        const formData = new FormData();
        formData.append("excelFile", this.formImportPembayaran.excelFile);
        await api.post(`penumpang/import-pembayaran`, formData).then((resp) => {
          this.isOpenImportPembayaran = false;
          this.resetFormImportPembayaran();
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
      this.isOpen = false;
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
