import http from './httpService'
import config from './../config.json'

const sessionKey = "user";
// const currentDate = new Date().toISOString();
let date_ob = new Date();
let currentDate = (("0" + date_ob.getDate()).slice(-2) + "-" + ("0" + (date_ob.getMonth() + 1)).slice(-2) + "-" + date_ob.getFullYear() + " " + date_ob.getHours() + ":" + date_ob.getMinutes() + ":" + date_ob.getSeconds());

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
    let user = localStorage.getItem(sessionKey);
    try {
        if (user && JSON.parse(user).jwtToken !== undefined) {
            if (JSON.parse(user).expiresOn > currentDate) { // means date is not expired
                return user;
            } else {
                localStorage.removeItem(sessionKey);
                return null
            }
        } else {
            localStorage.removeItem(sessionKey);
            return null
        }
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