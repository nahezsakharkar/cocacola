export default Object.freeze({
  sessionKey: "user",

  sessionBaseURLKey: "baseURL",

  cryptoBaseURLKey: "Coke-Login-BaseURL",

  loginBaseURL: "http://localhost:7070/",

  dynamicBaseURL: (PORT) => "http://localhost:" + PORT + "/",

  dynamicBaseURLPORT: (companyId) => {
    if (companyId === "1428,1429,1430,1364") {
      return 7071;
    } else if (companyId === "1428,1429,1430") {
      return 7071;
    } else if (companyId === "1428,1429,1364") {
      return 7071;
    } else if (companyId === "1428,1430,1364") {
      return 7071;
    } else if (companyId === "1429,1430,1364") {
      return 7071;
    } else if (companyId === "1428,1429") {
      return 7071;
    } else if (companyId === "1428,1430") {
      return 7071;
    } else if (companyId === "1428,1364") {
      return 7071;
    } else if (companyId === "1429,1430") {
      return 7070;
    } else if (companyId === "1429,1364") {
      return 7071;
    } else if (companyId === "1430,1364") {
      return 7071;
    } else if (companyId === "1428") {
      return 7071;
    } else if (companyId === "1429") {
      return 7070;
    } else if (companyId === "1430") {
      return 7070;
    } else if (companyId === "1364") {
      return 7071;
    }
  },

  correctExpiry: (expiry) =>
    expiry.substr(3, 2) + "-" + expiry.substr(0, 2) + expiry.substr(5),
});
