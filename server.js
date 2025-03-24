const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 指定靜態檔路徑（Angular build 出來的資料夾）
app.use(express.static(path.join(__dirname, "dist/2fa-client")));

// 將其他未指定的路由交由 Angular 處理
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/2fa-client"));
});

const authRoutes = require("./routes/auth.routes");
app.use("/api", authRoutes);

app.listen(3000, () => {
  console.log("伺服器運行在 http://localhost:3000");
});
