import { defineStore } from "pinia";

export const useThemeStore = defineStore('setTheme', {
    state: () => ({
        themes: localStorage.getItem('pageTheme') ? JSON.parse(localStorage.getItem("pageTheme")) : null
        // themes: 'light'
    })
})