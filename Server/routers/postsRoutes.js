import express from "express";
import postsController from "../controllers/postsController.js";

const postRouter = express.Router();

postRouter.get("/getAllPosts", postsController.getAllPosts);
postRouter.get("/getPostsByUserId/:user_id", postsController.getPostsByUserId);
postRouter.post("/addPost/:user_id", postsController.addPost);
postRouter.put("/updatePost/:post_id", postsController.updatePost);
postRouter.delete("/deletePost/:id", postsController.deletePost);
postRouter.get("/search/:userId", postsController.searchPosts);


export default postRouter;
