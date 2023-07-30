import { defineStore } from "pinia";
import { api } from "../../plugins/axios";
import { useDragTable } from "./table";

export const useDragFrom = defineStore("form_drag", {
  state: () => ({
    formSatu: {
      id_user: [],
      role: "",
    },
    formDua: {
      id_user: [],
      role: "",
    },
    lastSelectedIndexSatu: null,
    lastSelectedIndexDua: null,
  }),
  actions: {
    handleRowClickSatu(id) {
      const idnya = id;
      // kondisi mengambil event shift javascript
      if (event.shiftKey && this.lastSelectedIndexSatu !== null) {
        const minIndex = Math.min(id, this.lastSelectedIndexSatu);
        const maxIndex = Math.max(id, this.lastSelectedIndexSatu);
        // shift dari bawah
        if (idnya === maxIndex) {
          for (let i = minIndex + 1; i <= maxIndex; i++) {
            this.addIdUserSatu(i);
          }
          // shift dari atas
        } else if (idnya === minIndex) {
          for (let i = minIndex; i + 1 <= maxIndex; i++) {
            this.addIdUserSatu(i);
          }
        } else {
          for (let i = minIndex; i <= maxIndex; i++) {
            this.addIdUserSatu(i);
          }
        }
      } else {
        this.addIdUserSatu(id);
      }
      this.lastSelectedIndexSatu = id;
    },
    handleRowClickDua(id) {
      const idnya = id;
      // kondisi mengambil event shift javascript
      if (event.shiftKey && this.lastSelectedIndexDua !== null) {
        const minIndex = Math.min(id, this.lastSelectedIndexDua);
        const maxIndex = Math.max(id, this.lastSelectedIndexDua);
        if (idnya === maxIndex) {
          for (let i = minIndex + 1; i <= maxIndex; i++) {
            this.addIdUserDua(i);
          }
        } else if (idnya === minIndex) {
          for (let i = minIndex; i + 1 <= maxIndex; i++) {
            this.addIdUserDua(i);
          }
        } else {
          for (let i = minIndex; i <= maxIndex; i++) {
            this.addIdUserDua(i);
          }
        }
      } else {
        this.addIdUserDua(id);
      }
      this.lastSelectedIndexDua = id;
    },
    addIdUserSatu(id) {
      const index = this.formSatu.id_user.indexOf(id);
      if (index == -1) {
        this.formSatu.id_user.push(id);
      } else {
        this.formSatu.id_user.splice(index, 1);
      }
    },
    addIdUserDua(id) {
      const index = this.formDua.id_user.indexOf(id);
      if (index === -1) {
        this.formDua.id_user.push(id);
      } else {
        this.formDua.id_user.splice(index, 1);
      }
    },
    dragStartSatu(id) {
      // pindah satu data tanpa terselect
      this.formSatu.id_user.push(id);
    },
    allowDropDua(event) {
      event.preventDefault();
    },
    dropDua(event) {
      event.preventDefault();
      this.formDua.role = "daerah";
      this.editDataRole(this.formDua);
      this.formDua.id_user = [];
      this.formDua.role = "";
    },
    dragStartDua(id) {
      // pindah satu data tanpa terselect
      this.formDua.id_user.push(id);
    },
    allowDropSatu(event) {
      event.preventDefault();
    },
    dropSatu(event) {
      event.preventDefault();
      this.formSatu.role = "wilayah";
      this.editDataRole(this.formSatu);
      this.formSatu.id_user = [];
      this.formSatu.role = "";
    },
    async editDataRole(form) {
      try {
        await api.put(`user/roles`, form).then((resp) => {
          const table = useDragTable();
          table.getData1();
          table.getData2();
        });
      } catch (err) {}
    },
  },
});
