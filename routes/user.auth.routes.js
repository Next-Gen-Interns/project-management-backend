const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");
const { getMe } = require("../controller/user.controller");
const { employeeRegister } = require("../controller/employee.controller");

router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
  res.json({
    message: "Welcome to admin dashboard",
    user: req.user,
  });
});

router.get("/hr", verifyToken, authorizeRoles("admin", "hr"), (req, res) => {
  res.json({
    message: `Welcome ${req.user.role} dashboard`,
    user: req.user,
  });
});

router.get("/tl", verifyToken, authorizeRoles("admin", "tl"), (req, res) => {
  res.json({
    message: `Welcome to ${req.user.role} dashboard`,
    user: req.user,
  });
});

router.get("/employee", verifyToken, authorizeRoles("employee"), (req, res) => {
  res.json({
    message: `Welcome to ${req.user.role} dashboard`,
    user: req.user,
  });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.status(200).json({ message: "Logout successful" });
});

router.get("/me", verifyToken, getMe);

router.post(
  "/employee-create",
  verifyToken,
  authorizeRoles("admin"),
  employeeRegister
);

module.exports = router;
