import { loginUser, signupUser } from "../controllers/userController.js";
import express from "express";

const userRoutes = express.Router();

userRoutes.post("/login", loginUser);
userRoutes.post("/signup", signupUser);

export default userRoutes;