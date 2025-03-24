const QRCode = require("qrcode");

const createQRCode = (totpUrl) => {
  return new Promise((resolve, reject) => {
    QRCode.toDataURL(totpUrl, (err, url) => {
      if (err) return reject(err);
      resolve(url);
    });
  });
};

module.exports = { createQRCode };
