import http from "./httpService";
import CryptoJS from "crypto-js";

const sessionKey = "user";
const loginBaseURL = "http://localhost:7070/";

let currentDate = new Date();

const correctExpiry = (expiry) =>
  expiry.substr(3, 2) + "-" + expiry.substr(0, 2) + expiry.substr(5);

export async function login(formValues) {
  const response = await http.post(loginBaseURL + "authenticate", formValues);
  localStorage.setItem(sessionKey, JSON.stringify(response.data));
  return response.data;
}

export function logout() {
  localStorage.removeItem(sessionKey);
  localStorage.removeItem("baseURL");
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
  const baseURL = CryptoJS.AES.decrypt(
    localStorage.getItem("baseURL"),
    "Coke-Login-BaseURL"
  ).toString(CryptoJS.enc.Utf8);
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

export function setBaseURL(PORT) {
  localStorage.setItem(
    "baseURL",
    CryptoJS.AES.encrypt(
      "http://localhost:" + PORT + "/",
      "Coke-Login-BaseURL"
    ).toString()
  );
}

const auth = {
  login,
  logout,
  getCurrentUser,
  getCurrentUserDetails,
  setBaseURL,
};

export default auth;
