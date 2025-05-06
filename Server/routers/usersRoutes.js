import express from "express";
import usersController from "../controllers/usersController.js";

const userRouter = express.Router();

userRouter.post("/register", usersController.register);
userRouter.post("/login", usersController.login);

export default userRouter;
