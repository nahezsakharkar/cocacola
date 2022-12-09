import http from './httpService'
import config from './../config.json'

const sessionKey = "user";

http.setJwt(getJwt())

export async function login(email, password) {
    const response = await http.post(config.baseURL + "auth", {
        email: email,
        password: password
    });
    localStorage.setItem(sessionKey, response.data);
}

export function loginWithJwt(jwt) {
    localStorage.setItem(sessionKey, jwt);
}

export function logout() {
    localStorage.removeItem(sessionKey);
}

export function getCurrentUser() {
    try {
        const user = localStorage.getItem(sessionKey);
        return user;
    } catch (error) {
        return null
    }
}

export function getJwt() {
    return localStorage.getItem(sessionKey)
}

const auth = {
    login,
    loginWithJwt,
    logout,
    getCurrentUser,
    getJwt
}

export default auth