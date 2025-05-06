import express from "express";
import postsController from "../controllers/postsController.js";

const postRouter = express.Router();

postRouter.get("/getAllPosts", postsController.getAllPosts);
postRouter.get("/getPostByUserId/:user_id", postsController.getPostByUserId);
postRouter.post("/addPost", postsController.addPost);


export default postRouter;
