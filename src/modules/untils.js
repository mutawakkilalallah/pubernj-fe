import Swal from 'sweetalert2'
import * as storage from '../modules/storage'
import router from '../router'

const removeToken = ()=>{
    storage.deleteLocalToken()
    storage.deleteHeaderToken()
    storage.deleteUser()
    router.replace('/login')
}

const notifErr = (resp, next) => {
    const status = resp ? resp.data.code : 401
    const message = resp ? resp.data.message : 401
    console.log('status', status);
    if (status === 401 && message === 'Unauthorized') {
        return removeToken()
    }
}
    
const notifSuccessVue = (resp) => {
    const msg = resp ? resp.data.message : 'Success'
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        iconColor: 'white',
        customClass: {
            popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
    })
    Toast.fire({
        icon: 'success',
        title: msg || 'Success'
})
}
const notifErrorVue = (resp) => {
    const msg = resp ? resp.response.data.error : 'Error'
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        iconColor: 'white',
        customClass: {
            popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
    })
    Toast.fire({
        icon: 'error',
        title: msg || 'Error'
})
}

export {
    notifErr,
    notifSuccessVue,
    notifErrorVue
}