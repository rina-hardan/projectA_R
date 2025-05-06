import express from "express";
import commentsController from "../controllers/commentsController.js";

const commentRouter = express.Router();

commentRouter.get("/getCommentsByPostId/:post_id", commentsController.getCommentsByPostId);
commentRouter.post("/addPost", commentsController.addComment);
commentRouter.delete("/deleteComment/:commentId", commentsController.deleteComment);

export default commentRouter;
