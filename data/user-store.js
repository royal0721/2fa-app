// 模擬 user data，可以轉換成在資料庫中讀取
const users = {
  "test@example.com": {
    password: "123456",
    secret: "",
    is2FAEnabled: false,
  },
};

module.exports = users;
