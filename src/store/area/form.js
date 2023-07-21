import { defineStore } from "pinia";
import { useAreaTable } from "../area/table"
import { api } from "../../plugins/axios";
import Swal from "sweetalert2";
import { notifErrorVue, notifSuccessVue } from "../../modules/untils";




export const useAreaForm = defineStore('form_area', {
    state: () => ({
        isOpenAdd: false,
        isOpenEdit: false,
        idEdit:'',
        form: {
            nama: '',
            pic: '',
            no_hp: ''
        }
    }),
    actions: {
        setOpenAdd() {
            this.isOpenAdd = !this.isOpenAdd
        },
        setOpenEdit() {
            this.isOpenAdd = !this.isOpenAdd
        },
      async tambahData() {
           try {
             const resp = await api.post('area', this.form)              
            //    Swal.fire("Berhasil", resp.data.message, "success")       
            notifSuccessVue(resp)   
                this.setOpenAdd()
                this.form = {}
                const table = useAreaTable()
                table.getData()
           } catch (err) {              
            console.log(err);   
        //    Swal.fire(err.response.data.message, err.response.data.error, "error");
               notifErrorVue(err)
           }
        },
        handleDoubleClick(data) {
            // console.log('datahandle', data.id);
            this.idEdit = data.id
            this.isOpenEdit = true
            this.form.nama = data.nama
            this.form.pic = data.pic
            this.form.no_hp = data.no_hp
        },
         async editData() {
            try {
                const resp = await api.put(`area/${this.idEdit}`, this.form)
                this.isOpenEdit = false
                // Swal.fire("Berhasil", resp.data.message, "success");
                notifSuccessVue(resp)
                this.form = {}
                const table = useAreaTable()
                table.getData()
                
            } catch (err) {
                 Swal.fire(err.response.data.message, err.response.data.error, "error");
            }
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
                    api.delete(`area/${this.idEdit}`).then((result) => {
                        this.isOpenEdit = false
                        // Swal.fire("Berhasil", result.data.message, "success");
                        notifSuccessVue(result)
                        this.form = {}
                        const table = useAreaTable()
                        table.getData()
                    })
                }
            })
        }
    },

})