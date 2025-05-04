import express from "express";
import usersController from "../controllers/usersController.js";

const userRouter = express.Router();

userRouter.get("/getAllUsers", usersController.getAllUsers);
userRouter.get("/getUserById/:user_id", usersController.getUserById);
userRouter.post("/addUser", usersController.addUser);

export default userRouter;
