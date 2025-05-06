import express from "express";
import todosController from "../controllers/todosController"

const todoRouter = express.Router();

todoRouter.get("/getAllTodos", todosController.getAllTodos);
todoRouter.get("/getTodoById/:user_id", todosController.getTodoById);
todoRouter.post("/addTodo", todosController.addTodo);


export default todoRouter;