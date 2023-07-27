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
      if (event.shiftKey && this.lastSelectedIndexSatu !== null) {
        const minIndex = Math.min(id, this.lastSelectedIndexSatu);
        const maxIndex = Math.max(id, this.lastSelectedIndexSatu);
        for (let i = minIndex + 1; i <= maxIndex; i++) {
          this.addIdUserSatu(i);
        }
      } else {
        this.addIdUserSatu(id);
      }

      this.lastSelectedIndexSatu = id;
    },
    handleRowClickDua(id) {
      if (event.shiftKey && this.lastSelectedIndexDua !== null) {
        const minIndex = Math.min(id, this.lastSelectedIndexDua);
        const maxIndex = Math.max(id, this.lastSelectedIndexDua);
        for (let i = minIndex + 1; i <= maxIndex; i++) {
          this.addIdUserDua(i);
        }
      } else {
        this.addIdUserDua(id);
      }

      this.lastSelectedIndexDua = id;
    },
    addIdUserSatu(id) {
      const index = this.formSatu.id_user.indexOf(id);
      if (index === -1) {
        this.formSatu.id_user.push(id);
      } else {
        this.formSatu.id_user.splice(index, 1);
      }
      console.log(this.formSatu.id_user.length);
    },
    addIdUserDua(id) {
      const index = this.formDua.id_user.indexOf(id);
      if (index === -1) {
        this.formDua.id_user.push(id);
      } else {
        this.formDua.id_user.splice(index, 1);
      }
      console.log(this.formDua.id_user.length);
    },
    dragStartSatu(id) {
      //
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
      //
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
          console.log("success");
          const table = useDragTable();
          table.getData1();
          table.getData2();
        });
      } catch (err) {}
    },
  },
});
