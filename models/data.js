import { DataTypes } from "sequelize";
import sequelize from "../config/database.js"; 

const Data = sequelize.define("Data", {
  key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

export default Data;
