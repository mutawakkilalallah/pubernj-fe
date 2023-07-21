import { defineStore } from "pinia";
import { api } from "../../plugins/axios";

export const useAreaTable = defineStore('table_area', {
    state: () => ({
        items: [],
        params: {
            cari: '',
        }
    }),
    actions: {
        async getData() {
            const params = { params: this.params }
            try {
                await api.get('area', params).then(resp => {
                    // console.log('response area', resp)    
                   if (resp.data.code = 200) {
                    this.items = resp.data.data
                   }
                })
            } catch (error) {
                console.log('error',error);
            }
        }
    }
})