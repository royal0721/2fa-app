const express = require("express");
const router = express.Router();

const users = require("../data/user-store");
const { createBase32Secret } = require("../utils/secret.util");
const { createQRCode } = require("../utils/qrcode.util");
const { createTOTPUrl, verifyTOTP } = require("../services/totp.service");

router.post("/2fa/setup", async (req, res) => {
  const { email } = req.body;
  const user = users[email];
  if (!user) return res.status(404).json({ message: "查無此用戶" });

  try {
    const secret = createBase32Secret();
    const url = createTOTPUrl(secret, email);
    const qrCode = await createQRCode(url);

    user.secret = secret;

    res.json({ qrCode, secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "生成 QR Code 時發生錯誤" });
  }
});

router.post("/2fa/verify", (req, res) => {
  const { email, token } = req.body;
  const user = users[email];

  if (!user || !user.secret) {
    return res.status(400).json({ message: "無效使用者或尚未設定密鑰" });
  }

  const result = verifyTOTP(user.secret, token, email);
  if (result !== null) {
    user.is2FAEnabled = true;
    return res.json({ success: true, message: "驗證成功！" });
  } else {
    return res
      .status(400)
      .json({ success: false, message: "驗證碼錯誤或過期" });
  }
});

module.exports = router;
