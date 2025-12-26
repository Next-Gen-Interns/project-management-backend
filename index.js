require("dotenv").config();
const express = require("express");
const sequelize = require("./config/db");
const db = require("./model/user.model");
const router = require("./routes/user.routes");
const authRoute = require("./routes/user.auth.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:3000", // <-- frontend URL
  credentials: true                 // <-- allow cookies
}));
sequelize
  .sync()
  .then(() => console.log("✅ User table synced"))
  .catch((err) => console.error(err));

app.use("/api/users", router);
app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`The server is ruuning at ${PORT}`);
});
