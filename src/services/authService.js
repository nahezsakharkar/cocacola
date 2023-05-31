import http from "./httpService";
import { baseURL } from "../helpers/config";

const sessionKey = "user";
let currentDate = new Date();

const correctExpiry = (expiry) =>
  expiry.substr(3, 2) + "-" + expiry.substr(0, 2) + expiry.substr(5);

export async function login(formValues) {
  const response = await http.post(baseURL + "authenticate", formValues);
  localStorage.setItem(sessionKey, JSON.stringify(response.data));
  return response.data;
}

export function logout() {
  localStorage.removeItem(sessionKey);
}

export function getCurrentUser() {
  let user = localStorage.getItem(sessionKey);
  try {
    if (user && JSON.parse(user).jwtToken !== undefined) {
      if (new Date(correctExpiry(JSON.parse(user).expiresOn)) > currentDate) {
        // means date is not expired
        return user;
      } else {
        localStorage.removeItem(sessionKey);
        return null;
      }
    } else {
      localStorage.removeItem(sessionKey);
      return null;
    }
  } catch (error) {
    return null;
  }
}

export async function getCurrentUserDetails() {
  const user = JSON.parse(localStorage.getItem(sessionKey));
  try {
    const response = await http.get(baseURL + "api/admin/byid?id=" + user.id, {
      headers: {
        Authorization: user.jwtToken,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Login Required!");
  }
}

const auth = {
  login,
  logout,
  getCurrentUser,
  getCurrentUserDetails,
};

export default auth;
