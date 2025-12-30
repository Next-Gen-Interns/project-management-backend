const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Name is required" },
        len: {
          args: [3, 100],
          msg: "Name must be between 3 and 100 characters",
        },
      },
    },

    email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Invalid email format" },
        notEmpty: { msg: "Email is required" },
      },
    },

    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: { args: [6, 100], msg: "Password must be at least 6 characters" },
      },
    },
    
    must_change_password: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    role: {
      type: DataTypes.STRING(50),
      defaultValue: "employee",
      validate: {
        isIn: {
          args: [["employee", "admin", "hr", "tl"]],
          msg: "Invalid role",
        },
      },
    },

    type: {
      type: DataTypes.STRING(50),
      defaultValue: "active",
      validate: {
        isIn: {
          args: [["active", "inactive"]],
          msg: "Status must be active or inactive",
        },
      },
    },
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = User;
