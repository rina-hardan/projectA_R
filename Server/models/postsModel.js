import DB from "../DB/Config.js";

const postsModel = {
    getAllPosts: (callback) => {
        DB.query("SELECT * FROM posts", callback);
    },

    getPostByUserId: (id, callback) => {
        DB.query("SELECT * FROM posts WHERE user_id=?", [userId], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },

    addPost: (postData, callback) => {
        const { title, content ,user_id } = postData;

        DB.query(
            "INSERT INTO todos (title, content ,user_id) VALUES (?, ?, ?)",
            [title,content,user_id],
            (err, result) => {
                if (err) return callback(err);
                const id = result.insertId;
            }
        );
    }
};

export default postsModel;
