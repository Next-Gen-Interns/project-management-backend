const express = require("express");
const { register, login } = require("../controller/user.controller");
const verifyToken = require("../middleware/auth.middleware");
const { changePassword } = require("../controller/employee.controller");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/change-password", verifyToken, changePassword);

module.exports = router;
