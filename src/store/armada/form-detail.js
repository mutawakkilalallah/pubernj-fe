import { defineStore } from "pinia";
import { api } from "../../plugins/axios";
import { useArmadaDetailTable } from "./table-detail";

export const useArmadaDetailForm = defineStore("form_armada_detail", {
  state: () => ({
    formAddArmada: {
      id_penumpang: [],
    },
    formDelArmada: {
      id_penumpang: [],
    },
    lastSelectedIndexAddArmada: null,
    lastSelectedIndexDelArmada: null,
  }),
  actions: {
    handleRowClickAddArmada(id) {
      const idnya = id;
      // kondisi mengambil event shift javascript
      if (event.shiftKey && this.lastSelectedIndexAddArmada !== null) {
        const minIndex = Math.min(id, this.lastSelectedIndexAddArmada);
        const maxIndex = Math.max(id, this.lastSelectedIndexAddArmada);
        // shift dari bawah
        if (idnya === maxIndex) {
          for (let i = minIndex + 1; i <= maxIndex; i++) {
            this.addIdPenumpangAddArmada(i);
          }
          // shift dari atas
        } else if (idnya === minIndex) {
          for (let i = minIndex; i + 1 <= maxIndex; i++) {
            this.addIdPenumpangAddArmada(i);
          }
        } else {
          for (let i = minIndex; i <= maxIndex; i++) {
            this.addIdPenumpangAddArmada(i);
          }
        }
      } else {
        this.addIdPenumpangAddArmada(id);
      }
      this.lastSelectedIndexAddArmada = id;
    },
    handleRowDelArmada(id) {
      const idnya = id;
      // kondisi mengambil event shift javascript
      if (event.shiftKey && this.lastSelectedIndexDelArmada !== null) {
        const minIndex = Math.min(id, this.lastSelectedIndexDelArmada);
        const maxIndex = Math.max(id, this.lastSelectedIndexDelArmada);
        if (idnya === maxIndex) {
          for (let i = minIndex + 1; i <= maxIndex; i++) {
            this.addIdPenumpangDelArmada(i);
          }
        } else if (idnya === minIndex) {
          for (let i = minIndex; i + 1 <= maxIndex; i++) {
            this.addIdPenumpangDelArmada(i);
          }
        } else {
          for (let i = minIndex; i <= maxIndex; i++) {
            this.addIdPenumpangDelArmada(i);
          }
        }
      } else {
        this.addIdPenumpangDelArmada(id);
      }
      this.lastSelectedIndexDelArmada = id;
    },
    addIdPenumpangAddArmada(id) {
      const index = this.formAddArmada.id_penumpang.indexOf(id);
      if (index == -1) {
        this.formAddArmada.id_penumpang.push(id);
      } else {
        this.formAddArmada.id_penumpang.splice(index, 1);
      }
    },
    addIdPenumpangDelArmada(id) {
      const index = this.formDelArmada.id_penumpang.indexOf(id);
      if (index === -1) {
        this.formDelArmada.id_penumpang.push(id);
      } else {
        this.formDelArmada.id_penumpang.splice(index, 1);
      }
    },
    dragStartAddArmada(id) {
      // pindah satu data tanpa terselect
      this.formAddArmada.id_penumpang.push(id);
    },
    allowDropAddArmada(event) {
      event.preventDefault();
    },
    dropAddArmada(event, id) {
      console.log(id);
      event.preventDefault();
      this.hitAddArmada(this.formAddArmada, id);
      this.formAddArmada.id_penumpang = [];
    },
    dragStartDellArmada(id) {
      // pindah satu data tanpa terselect
      this.formDelArmada.id_penumpang.push(id);
    },
    allowDropDelArmada(event) {
      event.preventDefault();
    },
    dropDelArmada(event, id) {
      event.preventDefault();
      this.hitDelArmada(this.formDelArmada, id);
      this.formDelArmada.id_penumpang = [];
    },
    async hitAddArmada(form, id) {
      try {
        await api.put(`penumpang/armada/${id}`, form).then((resp) => {
          const table = useArmadaDetailTable();
          table.getData();
          table.getDataDetail(id);
        });
      } catch (err) {}
    },
    async hitDelArmada(form, id) {
      try {
        await api.put(`penumpang/armada/delete`, form).then((resp) => {
          const table = useArmadaDetailTable();
          table.getData();
          table.getDataDetail(id);
        });
      } catch (err) {}
    },
  },
});
