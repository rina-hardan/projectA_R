import express from "express";
import todosController from "../controllers/todosController.js"

const todoRouter = express.Router();

todoRouter.get("/getAllTodosByUserId/:user_id", todosController.getAllTodosByUserId);
todoRouter.post("/addTodo/:user_id", todosController.addTodo);
todoRouter.delete("/deleteTodo/:id", todosController.deleteTodo);
todoRouter.put("/updateTodoTitle/:todo_id", todosController.updateTodoTitle);
// todoRouter.put("/updateTodoComplated/:todo_id", todosController.updateTodoComplated);


export default todoRouter;