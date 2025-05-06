import DB from "../DB/Config.js";

const todosModel = {
    getAllTodosByUserId: (id, callback) => {
        DB.query("SELECT * FROM todos WHERE user_id=?", [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results); // תחזיר את כל התוצאות
        });
    },

    addTodo: (todoData, callback) => {
        const { title, completed, user_id } = todoData;

        DB.query(
            "INSERT INTO todos (title, completed, user_id) VALUES (?, ?, ?)",
            [title, completed, user_id],
            (err, result) => {
                if (err) return callback(err);
                callback(null, result); // מחזיר את insertId וכו'
            }
        );
    },

    deleteTodo: (id, callback) => {
        DB.query(
            "DELETE FROM todos WHERE user_id = ?",
            [id],
            (err) => {
                if (err) return callback(err);
                return callback(null, { message: "Todos deleted successfully" });
            }
        );
    },
    updateTodoTitle: (todoId, newTitle, callback) => {
        const query = "UPDATE todos SET title = ? WHERE id = ?";
        DB.query(query, [newTitle, todoId], (err, result) => {
            if (err) return callback(err);
            callback(null, result); 
        });
    }    
};

export default todosModel;
