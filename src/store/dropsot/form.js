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
      grup: "",
      area_id: "",
      cakupan: "",
      harga: "",
      jam_berangkat_pa: "" ,
      jam_berangkat_pi: "",
    },
    opsiGrup: [
      {
        id: 'jatim',
        nama:'JATIM'
      },
      {
        id: 'jawa-non-jatim',
        nama: 'JAWA NON JATIM'
      },
      {
        id: 'luar-pulau',
        nama: 'LUAR PULAU'
      },
      {
        id: 'luar-jawa',
        nama: 'LUAR JAWA'
      },
    ]
  }),
  actions: {
    resetForm() {
      this.form.nama = "";
      this.form.grup = "";
      this.form.area_id = "";
      this.form.cakupan = "";
      this.form.harga = "";
      this.form.jam_berangkat_pa = "";
      this.form.jam_berangkat_pi = "";
    },
    setOpenAdd() {
      this.isOpenAdd = !this.isOpenAdd;
     this.resetForm();
    },
    setOpenEdit() {
      this.isOpenEdit = !this.isOpenEdit;
      this.resetForm();
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
      console.log('form', this.form);
      // this.form.jam_berangkat_pa = this.formatDateUTC(this.form.jam_berangkat_pa)
      // this.form.jam_berangkat_pi = this.formatDateUTC(this.form.jam_berangkat_pi)
      // try {
      //   await api.post("dropspot", this.form);
      //   this.isOpenAdd = false;
      //   const table = useDropsotTable();
      //   table.getData();
      //   this.resetForm();
      // } catch (err) {}
    },
    formatDateUTC(a) {
     return new Date(a).toUTCString();
    },
    handleDoubleClik(d) {
      this.idEdit = d.id;
      this.namaArea = d.area ? d.area.nama : "kosong";
      this.form.nama = d.nama;
      this.form.grup = d.grup;
      this.form.area_id = d.area_id;
      this.form.cakupan = d.cakupan;
      this.form.harga = d.harga;
      this.form.jam_berangkat_pa = d.jam_berangkat_pa;
      this.form.jam_berangkat_pi = d.jam_berangkat_pi;
      this.isOpenEdit = true;
    },
    async editData() {
      try {
        await api.put(`dropspot/${this.idEdit}`, this.form).then((resp) => {
          this.isOpenEdit = false;
          this.resetForm();
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
            this.resetForm();
            const table = useDropsotTable();
            table.getData();
          });
        }
      });
    },
  },
});
