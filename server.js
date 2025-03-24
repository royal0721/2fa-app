const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const authRoutes = require("./routes/auth.routes");
app.use("/api", authRoutes);

app.listen(3000, () => {
  console.log("伺服器運行在 http://localhost:3000");
});
