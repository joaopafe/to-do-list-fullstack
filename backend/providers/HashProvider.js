const bcrypt = require("bcrypt");

class HashProvider {
  /**
   * Generate a hash for the given text
   * @param {string} text plain text
   * @returns a string hash
   */
  static async hash(text) {
    return bcrypt.hash(text, 10);
  }

  /**
   * Compare if the text matches the given hash
   * @param {string} text plain text
   * @param {string} hash hash generate by `HashProvider.hash`
   * @returns true if the text matches the given hash, false otherwise
   */
  static async compare(text, hash) {
    return bcrypt.compare(text, hash);
  }
}

module.exports = HashProvider;
