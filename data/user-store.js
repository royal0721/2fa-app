// 模擬 user data，可以轉換成在資料庫中讀取
// 切記實際情況下，不要把機敏資料放上來！
const users = {
  "test@example.com": {
    password: "123456",
    secret: "",
    is2FAEnabled: false,
  },
};

module.exports = users;
