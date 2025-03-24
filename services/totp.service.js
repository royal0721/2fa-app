const OTPAuth = require("otpauth");

const createTOTPUrl = (base32Secret, email) => {
  const totp = new OTPAuth.TOTP({
    issuer: "example.com",
    label: email,
    algorithm: "SHA1",
    digits: 6,
    secret: OTPAuth.Secret.fromBase32(base32Secret),
    period: 30,
  });
  return totp.toString();
};

const verifyTOTP = (base32Secret, token, email) => {
  const totp = new OTPAuth.TOTP({
    issuer: "example.com",
    label: email,
    algorithm: "SHA1",
    digits: 6,
    secret: OTPAuth.Secret.fromBase32(base32Secret),
    period: 30,
  });

  return totp.validate({ token }); // 回傳 delta（成功）或 null（失敗）
};

module.exports = { createTOTPUrl, verifyTOTP };
