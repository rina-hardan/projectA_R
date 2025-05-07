import express from "express";
import commentsController from "../controllers/commentsController.js";

const commentRouter = express.Router();

commentRouter.get("/getCommentsByPostId/:post_id", commentsController.getCommentsByPostId);
commentRouter.post("/addComment/:post_id", commentsController.addComment);
commentRouter.delete("/deleteComment/:commentId", commentsController.deleteComment);
commentRouter.put("/updateComment/:comment_id", commentsController.updateComment);

export default commentRouter;
