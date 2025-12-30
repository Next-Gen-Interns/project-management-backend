const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const EmployeeDetails = sequelize.define(
  "EmployeeDetails",
  {
    detail_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id",
      },
      onDelete: "CASCADE",
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },

    employee_code: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    designation: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    department: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    date_of_joining: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM("Male", "Female", "other"),
      allowNull: true,
    },
    work_type: {
      type: DataTypes.ENUM("Full Time", "Part Time", "Intern"),
      allowNull: true,
    },
    work_location: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    emergency_contact: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "employee_details",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = EmployeeDetails;
