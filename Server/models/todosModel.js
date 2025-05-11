
import DB from "../DB/Config.js";

const todosModel = {
   getAllTodosByUserId: (id, sortBy = "id", callback) => {
        const allowedSortFields = ["id", "title", "completed"];
        const sortField = allowedSortFields.includes(sortBy) ? sortBy : "id";

        const query = `SELECT * FROM todos WHERE user_id = ? ORDER BY ${sortField}`;
        DB.query(query, [id], (err, results) => {
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

        if (fields.length === 0) return callback(null, { affectedRows: 0 });

        const query = `UPDATE todos SET ${fields.join(", ")} WHERE id = ?`;
        values.push(todoId);

        DB.query(query, values, (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },
   searchTodos: (userId, filterBy, value, callback) => {
    let sql = "";
    let params = [];

    if (filterBy === "id") {
        sql = "SELECT * FROM todos WHERE user_id = ? AND id = ?";
        params = [userId, value];
    } else if (filterBy === "title") {
        sql = "SELECT * FROM todos WHERE user_id = ? AND title LIKE ?";
        params = [userId, `%${value}%`];
    } else if (filterBy === "completed") {
        sql = "SELECT * FROM todos WHERE user_id = ? AND completed = ?";
        params = [userId, value === "true" ? 1 : 0];
    } else {
        return callback(null, []);
    }

    DB.query(sql, params, (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
}
};

export default todosModel;