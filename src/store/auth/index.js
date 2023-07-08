import { defineStore } from "pinia";
import * as storage from '../../modules/storage'
import { api } from "../../plugins/axios";
import router from "../../router";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token : localStorage.getItem('token') ? storage.getLocalToken() : null,
        user : localStorage.getItem('user') ? storage.getUser() : null,
        loading: false,
        alert : false,
    }),
    getters: {
      isAuth(state) {
      return state.token !== null || state.token !== undefined
    },
    getToken: () => storage.getLocalToken(),
    useGetter: () => storage.getUser() !== null || storage.getUser() !== undefined
    },
    actions: {
        async login(payload) {
            this.loading = true
            try {
                await api.post('login', payload).then(resp => {
                    storage.setLocalToken(resp.data.token)
                    storage.setUser(resp.data.data)
                    const hdd = storage.getLocalToken()
                    const hddUser = storage.getUser()
                    if (hdd) {
                        this.alert=true
                        this.SET_TOKEN_USER(hdd, hddUser)
                        this.loading = false
                    } else {
                        this.loading = false
                        router.push('/login')
                    }
                    
                })
            } catch (error) {
                console.log('error', error);
                this.loading = false
            }
        },
        SET_TOKEN_USER(token, user) {
            storage.setHeaderToken(token)
            this.token = token
            this.user = user
            router.push('/')
        }
    }
})