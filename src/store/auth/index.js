import { defineStore } from "pinia";
import * as storage from '../../modules/storage'
import { routerInstance } from "../../plugins/router";
import { api } from "../../plugins/axios";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') ? storage.getLocalToken() : null,
        user:localStorage.getItem('data') ? storage.getUser():null
    }),
    actions: {
        async login(payload) {
            try {
                await api.post('login', payload).then(resp => {
                    storage.setLocalToken(resp.data.token)
                    storage.setUser(resp.data.data)
                    const hdd = storage.getLocalToken()
                    const hddUser = storage.getUser()
                    if (hdd) {
                        this.SET_TOKEN_USER(hdd, hddUser)
                    } else {
                        console.log('error')
                        this.router.push('/login')
                    }
                    
                })
            } catch (error) {
                console.log('error', error);
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