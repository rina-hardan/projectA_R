import todosModel from "../models/todosModel.js";

const todosController = {
    getAlltodos: (req, res) => {
        todosModel.getAllTodos((err, todos) => {
            if (err) return res.status(500).json({ error: "Database error" });
            if (!todos) return res.status(404).json({ error: "todos not found" });
            res.json(todos);
        });
    },

    getTodoByUserId: (req, res) => {
        const { user_id } = req.params;
        todosModel.getTodoByUserId(user_id, (err, todo) => {
            if (err) return res.status(500).json({ error: "Database error" });
            if (!todo) return res.status(404).json({ error: "todo not found" });
            res.json(todo);
        });
    },

    addTodo: (req, res) => {
        const todo = req.body;
        const { title, completed, user_id } = todo;

        if (!title || completed==null || !user_id ) {
            return res.status(400).json({ error: "יש למלא את כל השדות הנדרשים" });
        }

        const todoToSave = {
            title,
            completed,
            user_id
        };

        todosModel.addTodo(todoToSave, (err, result) => {
            if (err) {
                console.error("❌ שגיאה בהוספת המשימה למסד:", err);
                return res.status(500).json({ error: "שגיאה בהוספת המשימה" });
            }

            res.status(201).json({ message: "✅ המשימה נוספה בהצלחה", id: result.insertId });
        });
    }
};

export default todosController;
