const crypto = require("crypto");
const { encode } = require("hi-base32");

const createBase32Secret = () => {
  const buffer = crypto.randomBytes(15);
  const base32Secret = encode(buffer).replace(/=/g, "").substring(0, 24);
  return base32Secret;
};

module.exports = { createBase32Secret };
