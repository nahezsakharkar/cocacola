import CryptoJS from "crypto-js";

export const encrypt = (plainText, KEY) =>
  CryptoJS.AES.encrypt(plainText, KEY).toString();

export const decrypt = (cypherText, KEY) =>
  CryptoJS.AES.decrypt(cypherText, KEY).toString(CryptoJS.enc.Utf8);

const crypto = {
  encrypt,
  decrypt,
};

export default crypto;
