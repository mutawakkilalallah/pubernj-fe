import { ref } from "vue";


export function usePaginate() {
    const pages = ref(1)
    const limitPages=ref(5) //default

    function setMaxPages(val) {
        limitPages.value = val
    }

    function setPages(val) {
        pages.value = val
    }

    return {
        pages, limitPages,
        setPages
    }
}