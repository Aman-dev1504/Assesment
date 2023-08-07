import jwt from "jsonwebtoken";
import Data from "../models/data.js";
export const storeData = async (req, res) => {
  const { key, value } = req.body;

  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        status: "error",
        code: "UNAUTHORIZED",
        message: "Authorization token not provided.",
      });
    }
    const existingData = await Data.findOne({ where: { key } });
    if (existingData) {
      return res.status(400).json({
        status: "error",
        code: "KEY_EXISTS",
        message:
          "The provided key already exists. Please choose a different key.",
      });
    }
    await Data.create({
      key,
      value,
    });

    res.json({
      status: "success",
      message: "Data stored successfully.",
    });
  } catch (error) {
    console.error("Error storing data:", error);
    res.status(500).json({
      status: "error",
      code: "SERVER_ERROR",
      message: "Internal server error. Please try again later.",
    });
  }
};

export const getData = async (req, res) => {
  const key = req.params.key;

  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        status: "error",
        code: "UNAUTHORIZED",
        message: "Authorization token not provided.",
      });
    }
    const data = await Data.findOne({ where: { key } });
    if (!data) {
      return res.status(404).json({
        status: "error",
        code: "DATA_NOT_FOUND",
        message: "Data not found for the provided key.",
      });
    }

    res.json({
      status: "success",
      data: {
        key: data.key,
        value: data.value,
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      status: "error",
      code: "SERVER_ERROR",
      message: "Internal server error. Please try again later.",
    });
  }
};
export const updateData = async (req, res) => {
  const { key } = req.params;
  const { value } = req.body;

  try {
    const existingData = await Data.findOne({ where: { key } });
    if (!existingData) {
      return res.status(404).json({
        status: "error",
        code: "DATA_NOT_FOUND",
        message: "Data not found for the provided key.",
      });
    }
    await Data.update({ value }, { where: { key } });

    res.json({
      status: "success",
      message: "Data updated successfully.",
    });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({
      status: "error",
      code: "SERVER_ERROR",
      message: "Internal server error. Please try again later.",
    });
  }
};
export const deleteData = async (req, res) => {
  const { key } = req.params;

  try {
    const existingData = await Data.findOne({ where: { key } });
    if (!existingData) {
      return res.status(404).json({
        status: "error",
        code: "DATA_NOT_FOUND",
        message: "Data not found for the provided key.",
      });
    }
    await Data.destroy({ where: { key } });

    res.json({
      status: "success",
      message: "Data deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({
      status: "error",
      code: "SERVER_ERROR",
      message: "Internal server error. Please try again later.",
    });
  }
};
