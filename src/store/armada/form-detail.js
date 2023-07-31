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
        // perulangan mengambil index table
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
      const table = useArmadaDetailTable()
      // mengambil id table
      const index = this.formAddArmada.id_penumpang.indexOf(table.items[id].id);
      if (index === -1) {
        this.formAddArmada.id_penumpang.push(table.items[id].id);
      } else {
        this.formAddArmada.id_penumpang.splice(index, 1);
      }
    },
    addIdPenumpangDelArmada(id) {
      const table = useArmadaDetailTable()
      const index = this.formDelArmada.id_penumpang.indexOf(table.armada.penumpang[id].id);
      if (index === -1) {
        this.formDelArmada.id_penumpang.push(table.armada.penumpang[id].id);
      } else {
        this.formDelArmada.id_penumpang.splice(index, 1);
      }
    },
    dragStartAddArmada(id) {
      const table = useArmadaDetailTable()
      // pindah satu data tanpa terselect
      this.formAddArmada.id_penumpang.push(table.items[id].id);
    },
    allowDropAddArmada(event) {
      event.preventDefault();
    },
    dropAddArmada(event, id) {
      event.preventDefault();
      this.hitAddArmada(this.formAddArmada, id);
      this.formAddArmada.id_penumpang = [];
    },
    dragStartDellArmada(id) {
      const table = useArmadaDetailTable()
      // pindah satu data tanpa terselect
      this.formDelArmada.id_penumpang.push(table.armada.penumpang[id].id);
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
