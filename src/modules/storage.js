import { setToken, deleteToken } from '../plugins/axios'

export const setHeaderToken = token => setToken(token)
export const setLocalToken = token => localStorage.setItem('token', JSON.stringify(token))
export const getLocalToken = () => localStorage.getItem('token')
export const setUser = user => localStorage.setItem('user', JSON.stringify(user))
export const getUser = () => JSON.parse(localStorage.getItem('data'))
export const deleteHeaderToken = () => deleteToken()
export const deleteLocalToken = () => localStorage.removeItem('token')
export const isBlocked = () => localStorage.getItem('blocked') === 'true'
export const setBlocked = value => localStorage.setItem('blocked', JSON.stringify(value))
export const deleteUser = () => localStorage.removeItem('user')