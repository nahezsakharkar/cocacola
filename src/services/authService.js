import http from "./httpService";
import { encrypt, decrypt } from "./cryptoService";
import constantsService from "./constantsService";
const {
  sessionKey,
  sessionBaseURLKey,
  cryptoBaseURLKey,
  loginBaseURL,
  dynamicBaseURL,
  correctExpiry,
} = constantsService;

let currentDate = new Date();

export async function login(formValues) {
  const response = await http.post(loginBaseURL + "authenticate", formValues);
  localStorage.setItem(sessionKey, JSON.stringify(response.data));
  return response.data;
}

export function logout() {
  localStorage.removeItem(sessionKey);
  localStorage.removeItem(sessionBaseURLKey);
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
  const baseURLCypherText = localStorage.getItem(sessionBaseURLKey);
  const baseURL = decrypt(baseURLCypherText, cryptoBaseURLKey);
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
  const baseURLPlainText = dynamicBaseURL(PORT);
  localStorage.setItem(
    sessionBaseURLKey,
    encrypt(baseURLPlainText, cryptoBaseURLKey)
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
