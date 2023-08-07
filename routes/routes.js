import express from "express";
import { registerUser,login } from "../controllers/authControllers.js";
import { storeData,getData,updateData,deleteData} from "../controllers/dataController.js";
import { verifyAccessToken } from "./middleware.js";

const router = express.Router();

// Auth routes
router.post("/register", registerUser);
router.post("/login", login);

// Data routes
router.post("/data", verifyAccessToken,storeData);
router.get("/data/:key",verifyAccessToken,getData);
router.put("/data/:key", verifyAccessToken,updateData);
router.delete("/data/:key", verifyAccessToken,deleteData);

export default router;
