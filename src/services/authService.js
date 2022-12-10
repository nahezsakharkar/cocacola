import http from './httpService'
import { baseURL } from '../helpers/config';

const sessionKey = "user";
// const currentDate = new Date().toISOString();
let date_ob = new Date();
let currentDate = (("0" + date_ob.getDate()).slice(-2) + "-" + ("0" + (date_ob.getMonth() + 1)).slice(-2) + "-" + date_ob.getFullYear() + " " + date_ob.getHours() + ":" + date_ob.getMinutes() + ":" + date_ob.getSeconds());

export async function login(formValues) {
    const response = await http.post(baseURL + "authenticate",
        formValues
    );
    localStorage.setItem(sessionKey, JSON.stringify(response.data));
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

const auth = {
    login,
    logout,
    getCurrentUser,
}

export default auth