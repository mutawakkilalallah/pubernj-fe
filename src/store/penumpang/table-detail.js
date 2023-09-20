import { defineStore } from "pinia";
import { api } from "../../plugins/axios";
import router from "../../router";
import Swal from "sweetalert2";

export const usePenumpangDetailTable = defineStore("table_penumpang_detail", {
  state: () => ({
    isOpenUpload: false,
    isAddMahrom: false,
    item: {},
    berkas: [],
    mahrom: [],
    fotoDiri: "",
    form: {
      type: "",
      description: "",
      berkas: "",
    },
  }),
  actions: {
    resetForm() {
      this.form.berkas = "";
      this.form.description = "";
      this.form.type = "";
    },
    setOpenUpload() {
      this.isOpenUpload = !this.isOpenUpload;
      this.resetForm();
    },
    setAddMahrom() {
      this.getMahrom();
      this.isAddMahrom = !this.isAddMahrom;
    },
    handleFileChange(event) {
      this.form.berkas = event.target.files[0];
    },
    downloadFile(file) {
      const link = document.createElement("a");
      link.href = file.blobUrl;
      link.download = file.path.split("/").pop(); // Mengambil nama file dari path
      link.click();
    },
    openInNewTab(blobUrl) {
      window.open(blobUrl, "_blank");
    },
    async getDataDetail(uuid) {
      try {
        const resp = await api.get(`penumpang/${uuid}`);
        if (resp.data.code === 200) {
          this.item = resp.data.data;
          if (this.item.mahrom) {
            this.item.mahrom.foto = await this.getFoto(
              this.item.mahrom.santri.niup
            );
          }
          this.berkas = resp?.data?.data?.berkas;
          this.getImage(resp.data.data.santri.niup, "medium");
          for (const doc of this.berkas) {
            doc.blobUrl = await this.getPathBlob(doc.path);
          }
        }
      } catch (err) {}
    },
    async getMahrom() {
      try {
        const resp = await api.get(`penumpang/mahrom/${this.item.santri_uuid}`);
        if (resp.data.code === 200) {
          this.mahrom = resp.data.data;
          for (const d of this.mahrom) {
            d.foto = await this.getFoto(d?.santri?.niup);
          }
        }
      } catch (err) {}
    },
    async saveMahrom(id) {
      try {
        const resp = await api.put(`penumpang/mahrom/${this.item.id}`, {
          mahrom_id: id,
        });
        if (resp.data.code === 201) {
          this.setAddMahrom();
          this.getDataDetail(this.item.santri_uuid);
        }
      } catch (err) {}
    },
    async deleteMahrom() {
      try {
        await api.delete(`penumpang/mahrom/${this.item.id}`);
        this.getDataDetail(this.item.santri_uuid);
      } catch (err) {}
    },
    async getImage(uuid) {
      try {
        const params = {
          responseType: "blob",
        };
        await api.get("santri/image/" + uuid, params).then((resp) => {
          this.fotoDiri = URL.createObjectURL(resp.data);
        });
      } catch (err) {}
    },
    async getFoto(niup) {
      try {
        const params = {
          responseType: "blob",
        };
        const resp = await api.get(`santri/image/${niup}?size=small`, params);
        return URL.createObjectURL(resp.data);
      } catch (err) {}
    },
    async getPathBlob(path) {
      try {
        const params = {
          responseType: "blob",
        };
        const response = await api.get(`penumpang/${path}`, params);
        return URL.createObjectURL(response.data);
      } catch (err) {}
    },
    async uploadBerkas(uuid) {
      try {
        const formData = new FormData();
        formData.append("berkas", this.form.berkas);
        formData.append("type", this.form.type);
        formData.append("description", this.form.description);
        await api
          .post(`penumpang/upload-berkas/${uuid}`, formData)
          .then((resp) => {
            this.isOpenUpload = false;
            this.resetForm();
            this.getDataDetail(uuid);
          });
      } catch (err) {}
    },
    async deleteBerkas(id, uuid) {
      this.isOpen = false;
      Swal.fire({
        title: "Konfirmasi",
        text: "Apakah anda yakin ingin menghapus berkas ?",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Hapus",
        confirmButtonColor: "#DC3545",
      }).then((result) => {
        if (result.isConfirmed) {
          api.delete(`penumpang/berkas/${id}`).then((result) => {
            this.getDataDetail(uuid);
          });
        }
      });
    },
  },
});
