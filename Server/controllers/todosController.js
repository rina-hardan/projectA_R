import todosModel from "../models/todosModel.js";

const todosController = {

    getAllTodosByUserId: (req, res) => {
        const { user_id } = req.params;
        todosModel.getAllTodosByUserId(user_id, (err, todo) => {
            if (err) return res.status(500).json({ error: "Database error" });
            if (!todo) return res.status(404).json({ error: "Todo not found" });
            res.json(todo);
        });
    },

    addTodo: (req, res) => {
        const { title, completed } = req.body;
        const { user_id } = req.params;

        if (!title || completed == null) {
            return res.status(400).json({ error: "All required fields must be filled" });
        }

        const todoToSave = {
            title,
            completed,
            user_id
        };

        todosModel.addTodo(todoToSave, (err, result) => {
            if (err) {
                console.error("Error adding the todo to the database:", err);
                return res.status(500).json({ error: "Error adding the todo" });
            }

            res.status(201).json({ message: "Todo added successfully", id: result.insertId });
        });
    },

    deleteTodo: (req, res) => {
        const { id } = req.params;

        todosModel.deleteTodo(id, (err, result) => {
            if (err) return res.status(500).json({ error: "Database error" });
            if (!result) return res.status(404).json({ error: "No todos found for this user" });
            res.json(result);
        });
    },

    updateTodo: (req, res) => {
        const { todo_id } = req.params;
        const { title, completed } = req.body;

        if (title == null && completed == null) {
            return res.status(400).json({ error: "At least one field must be provided for update" });
        }

        todosModel.updateTodo(todo_id, { title, completed }, (err, result) => {
            if (err) return res.status(500).json({ error: "Database error" });
            if (result.affectedRows === 0) return res.status(404).json({ error: "Todo not found" });

            res.json({ message: "Todo updated successfully" });
        });
    }
};

export default todosController;
