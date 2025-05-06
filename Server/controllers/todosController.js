import todosModel from "../models/todosModel.js";

const todosController = {
  
    getAllTodosByUserId: (req, res) => {
        const { user_id } = req.params;
        todosModel.getAllTodosByUserId(user_id, (err, todo) => {
            if (err) return res.status(500).json({ error: "Database error" });
            if (!todo) return res.status(404).json({ error: "todo not found" });
            res.json(todo);
        });
    },

    addTodo: (req, res) => {
        const { title, completed } = req.body;
        const { user_id } = req.params;
    
        if (!title || completed == null) {
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
    },
    
    deleteTodo: (req, res) => {
        const { id } = req.params;
    
        todosModel.deleteTodo(id, (err, result) => {
            if (err) return res.status(500).json({ error: "Database error" });
            if (!result) return res.status(404).json({ error: "No todos found for this user" });
    
            res.json(result); // יכול להחזיר: { message: "...", deletedCount: ... }
        });
    },
    updateTodoTitle: (req, res) => {
        const { todo_id } = req.params;
        const { newTitle } = req.body;
    
        if (!newTitle) {
            return res.status(400).json({ error: "יש לספק כותרת חדשה" });
        }
    
        todosModel.updateTodoTitle(todo_id, newTitle, (err, result) => {
            if (err) return res.status(500).json({ error: "שגיאה במסד הנתונים" });
            if (result.affectedRows === 0) return res.status(404).json({ error: "משימה לא נמצאה" });
    
            res.json({ message: "הכותרת עודכנה בהצלחה" });
        });
    }    
    
};

export default todosController;
