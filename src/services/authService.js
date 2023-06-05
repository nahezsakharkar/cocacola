import http from "./httpService";
import { encrypt, decrypt } from "./cryptoService";

const sessionKey = "user";
const cryptoKey = "Coke-Login-BaseURL";
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
  const baseURL = decrypt(localStorage.getItem("baseURL"), cryptoKey);
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
  const plainText = "http://localhost:" + PORT + "/";
  localStorage.setItem("baseURL", encrypt(plainText, cryptoKey));
}

const auth = {
  login,
  logout,
  getCurrentUser,
  getCurrentUserDetails,
  setBaseURL,
};

export default auth;
