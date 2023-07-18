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

export {
    notifErr
}