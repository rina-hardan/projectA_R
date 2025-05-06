import DB from "../DB/Config.js";

const todosModel = {
    getAllTodos: (callback) => {
        DB.query("SELECT * FROM todos", callback);
    },

    getTodoByUserId: (id, callback) => {
        DB.query("SELECT * FROM todos WHERE user_id=?", [userId], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },

    addTodo: (todoData, callback) => {
        const { title, completed ,user_id } = todoData;

        DB.query(
            "INSERT INTO todos (title, completed ,user_id) VALUES (?, ?, ?)",
            [title,completed,user_id],
            (err, result) => {
                if (err) return callback(err);
                const id = result.insertId;
            }
        );
    }
};

export default todosModel;
