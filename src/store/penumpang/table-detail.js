import { defineStore } from "pinia";
import { api } from "../../plugins/axios";
import router from "../../router";
import Swal from "sweetalert2";

export const usePenumpangDetailTable = defineStore("table_penumpang_detail", {
  state: () => ({
    isOpenUpload: false,
    item: {},
    berkas: [],
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
          this.berkas = resp?.data?.data?.berkas;
          this.getImage(resp.data.data.santri.niup, "medium");
          for (const doc of this.berkas) {
            doc.blobUrl = await this.getPathBlob(doc.path);
          }
        }
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
    // async izinPedatren(niup, uuid) {
    //   try {
    //     await api.post(`/penumpang/qrcode/${niup}`).then((resp) => {
    //       this.getDataDetail(uuid);
    //     });
    //   } catch (error) {
    //     console.log("error", error);
    //   }
    // },
    // goToSuratJalan(niup) {
    //   router.push(`/penumpang/surat-jalan/${niup}`);
    // },
  },
});
