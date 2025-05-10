import DB from "../DB/Config.js";

const postsModel = {
    getAllPosts: (callback) => {
        DB.query("SELECT * FROM posts", callback);
    },

    getPostsByUserId: (userId, callback) => {
        DB.query("SELECT * FROM posts WHERE user_id=? ORDER BY id", [userId], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    addPost: (postData, callback) => {
        const { title, content ,user_id } = postData;
    
        DB.query(
            "INSERT INTO posts (title, content ,user_id) VALUES (?, ?, ?)",
            [title,content,user_id],
            (err, result) => {
                if (err) return callback(err);
                callback(null, result); 
            }
        );
    },

    updatePost: (postId, postData, callback) => {
        const fields = [];
        const values = [];
    
        if (postData.title !== undefined) {
            fields.push("title = ?");
            values.push(postData.title);
        }
    
        if (postData.content !== undefined) {
            fields.push("content = ?");
            values.push(postData.content);
        }
    
        const sql = `UPDATE posts SET ${fields.join(', ')} WHERE id = ?`;
        values.push(postId);
    
        DB.query(sql, values, (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },
    deletePost: (id, callback) => {
        DB.query(
            "DELETE FROM posts WHERE id = ?",
            [id],
            (err) => {
                if (err) return callback(err);
                return callback(null, { message: "post deleted successfully" });
            }
        );
    },
   searchPost: (type, value, callback) => {
        const allowedTypes = ["post_id", "user_id"];

        if (!allowedTypes.includes(type)) {
            return callback(new Error("Invalid search type"));
        }

        const sql = `SELECT * FROM comments WHERE ${type} = ?`;

        DB.query(sql, [value], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};
    

export default postsModel;