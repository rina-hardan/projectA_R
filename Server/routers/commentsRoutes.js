import express from "express";
import commentsController from "../controllers/commentsController.js";

const commentRouter = express.Router();

commentRouter.get("/getCommentsByPostId/:user_id", commentsController.getCommentsByPostId);
commentRouter.post("/addPost", commentsController.addComment);

export default commentRouter;
