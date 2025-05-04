import DB from "../DB/Config.js";

const usersModel = {
    getAllUsers: (callback) => {
        DB.query("SELECT * FROM users", callback);
    },

    getUserById: (id, callback) => {
        DB.query("SELECT * FROM users WHERE id=?", [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },

    addUser: (userData, callback) => {
        const { name, username, email, password } = userData;

        DB.query(
            "INSERT INTO users (name, username, email) VALUES (?, ?, ?)",
            [name, username, email],
            (err, result) => {
                if (err) return callback(err);

                const userId = result.insertId;

                DB.query(
                    "INSERT INTO passwords (user_id, password_hash) VALUES (?, ?)",
                    [userId, password],
                    (err2, result2) => {
                        if (err2) return callback(err2);
                        callback(null, { userId }); 
                    }
                );
            }
        );
    }
};

export default usersModel;
