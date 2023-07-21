import { defineStore } from "pinia";
import { api } from "../../plugins/axios";
import Swal from "sweetalert2";
import {useDropsotTable} from './table'

export const useDropspotForm = defineStore('form_dropspot', {
    state: () => ({
        isOpenAdd: false,
        isOpenEdit: false,
        isArea: [],
        idEdit: '',
        namaArea:'',
        form: {
            nama: '',
            area_id: '',
            cakupan: '',
            harga:''
        }
    }),
    actions: {
        setOpenAdd() {
            this.isOpenAdd = !this.isOpenAdd
        },
        setOpenEdit() {
            this.isOpenEdit = !this.isOpenEdit
        },
        getArea() {
         try {
             api.get('area').then(resp => {
                //  console.log('areadrop', resp.data.data);
                 this.isArea = resp.data.data
            })
         } catch (error) {
            
         }   
        },
        async tambahData() {
            try {
                const resp = await api.post('dropspot', this.form)
            this.isOpenAdd = false
            Swal.fire("Berhasil", resp.data.message, "success")
            const table = useDropsotTable()
            table.getData()
            this.form = {}
            } catch (err) {
                Swal.fire(err.response.data.message, err.response.data.error, "error");
            }
        },
        handleDoubleClik(d) {
            console.log('double', d);
            this.idEdit = d.id
            this.namaArea=  d.area ? d.area.nama : 'kosong'
            this.form.nama = d.nama
            this.form.area_id = d.area_id
            this.form.cakupan = d.cakupan
            this.form.harga = d.harga
            this.isOpenEdit = true
        },
       async editData() {
           console.log('form edit', this.form);
           try {
               await api.put(`dropspot/${this.idEdit}`, this.form).then(resp => {
                   this.isOpenEdit = false
                   this.form = {}
                    Swal.fire("Berhasil", resp.data.message, "success")
                    const table = useDropsotTable()
                    table.getData()
            })
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
                    api.delete(`dropspot/${this.idEdit}`).then((result) => {
                        this.isOpenEdit = false
                        Swal.fire("Berhasil", result.data.message, "success");
                        this.form = {}
                        const table = useDropsotTable()
                        table.getData()
                    })
                }
            })
        }
    }
})