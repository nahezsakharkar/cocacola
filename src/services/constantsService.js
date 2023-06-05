export default Object.freeze({
  sessionKey: "user",

  sessionBaseURLKey: "baseURL",

  cryptoBaseURLKey: "Coke-Login-BaseURL",

  loginBaseURL: "http://localhost:7070/",

  dynamicBaseURL: (PORT) => "http://localhost:" + PORT + "/",

  correctExpiry: (expiry) =>
    expiry.substr(3, 2) + "-" + expiry.substr(0, 2) + expiry.substr(5),
});
