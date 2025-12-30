const bcrypt = require("bcrypt");
const sequelize = require("../config/db");
const User = require("../model/user.model");
const EmployeeDeatil = require("../model/employeeDetails.model");
const jwt = require("jsonwebtoken");

const employeeRegister = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const {
      name,
      email,
      password,
      role,
      phone,
      designation,
      department,
      date_of_joining,
      date_of_birth,
      gender,
      work_type,
      work_location,
      address,
      emergency_contact,
      image_url,
    } = req.body;

    const existinUser = await User.findOne({ where: { email } });
    if (existinUser)
      return res.status(400).json({ message: "Employee already exists" });

    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    let employee_code;
    const lastEmployee = await EmployeeDeatil.findOne({
      order: [["user_id", "DESC"]],
    });

    if (!lastEmployee) {
      employee_code = "EMP1001";
    } else {
      const lastCode = parseInt(lastEmployee.employee_code.replace("EMP", ""));
      employee_code = "EMP" + (lastCode + 1);
    }

    const user = await User.create(
      {
        name,
        email,
        password: hashedPassword,
        role: role || "employee",
        must_change_password: true,
      },
      { transaction: t }
    );

    await EmployeeDeatil.create(
      {
        user_id: user.user_id,
        phone,
        employee_code,
        designation,
        department,
        date_of_joining,
        date_of_birth,
        gender,
        work_type,
        work_location,
        address,
        emergency_contact,
        image_url,
      },
      { transaction: t }
    );

    await t.commit();
    res.status(201).json({
      message: "Employee created successfully",
      tempPassword, // send temp password to admin to give employee
      employeeId: user.user_id,
      employee_code
    });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error: error.message });
  }
};

const employeeLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        user_id: user.user_id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    // 🔴 FIRST LOGIN
    if (user.must_change_password) {
      return res.status(200).json({
        message: "Password change required",
        mustChangePassword: true,
        token,
        user: {
          id: user.user_id,
          role: user.role,
        },
      });
    }

    // 🟢 NORMAL LOGIN
    return res.status(200).json({
      message: "Login successful",
      mustChangePassword: false,
      token,
      user: {
        id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { password } = req.body;
    console.log(password);

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(req.user);
    await User.update(
      { password: hashedPassword, must_change_password: false },
      { where: { user_id: req.user.id } }
    );

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  employeeRegister,
  employeeLogin,
  changePassword,
};
