
import DB from "../DB/Config.js";

const todosModel = {
    getAllTodosByUserId: (id, callback) => {
        DB.query("SELECT * FROM todos WHERE user_id=?", [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results); 
        });
    },

    addTodo: (todoData, callback) => {
        const { title, completed, user_id } = todoData;

        DB.query(
            "INSERT INTO todos (title, completed, user_id) VALUES (?, ?, ?)",
            [title, completed, user_id],
            (err, result) => {
                if (err) return callback(err);
                callback(null, result); 
            }
        );
    },

    deleteTodo: (id, callback) => {
        DB.query(
            "DELETE FROM todos WHERE id = ?",
            [id],
            (err) => {
                if (err) return callback(err);
                return callback(null, { message: "Todo deleted successfully" });
            }
        );
    },

    updateTodo: (todoId, data, callback) => {
        const fields = [];
        const values = [];
    
        if (data.title != null) {
            fields.push("title = ?");
            values.push(data.title);
        }
        if (data.completed != null) {
            fields.push("completed = ?");
            values.push(data.completed);
        }
    
        // אם לא נשלח כלום, אל תמשיך
        if (fields.length === 0) return callback(null, { affectedRows: 0 });
    
        const query = `UPDATE todos SET ${fields.join(", ")} WHERE id = ?`;
        values.push(todoId);
    
        DB.query(query, values, (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    }
    
};

export default todosModel;