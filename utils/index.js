const crypto = require("crypto");

class Utility {
  static async generateUniqueID() {
    return Math.floor(Math.random() * 9999999 + 1000000);
  }

  static async createSalt(length) {
    return crypto.randomBytes(length).toString("base64");
  }

  static isBearerToken(token) {
    const bearerRegex = /^Bearer\s+/i;
    return bearerRegex.test(token);
  }
}

module.exports = Utility;
