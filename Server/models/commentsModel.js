import DB from "../DB/Config.js";

const commentsModel = {
    getCommentsByPostId: (post_id, callback) => {
        DB.query("SELECT * FROM comments WHERE post_id=?", [post_id], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    addComment: (commentData, callback) => {
        const { name, email, body, post_id } = commentData;
        DB.query(
            "INSERT INTO comments (name ,email ,body ,post_id) VALUES (?, ?, ?,?)",
            [name, email, body, post_id],
            (err, result) => {
                if (err) return callback(err);
                callback(null, result);
            }
        );
    },

    deleteComment: (id, callback) => {
        DB.query(
            "DELETE FROM comments WHERE id = ?",
            [id],
            (err) => {
                if (err) return callback(err);
                return callback(null, { message: "Comments deleted successfully" });
            }
        );
    },
    getCommentById: (commentId, callback) => {
        DB.query(
            "SELECT * FROM comments WHERE id = ?",
            [commentId],
            (err, results) => {
                if (err) return callback(err);
                callback(null, results[0]);
            }
        );
    },
    updateComment: (commentId, updatedFields, callback) => {
        const fields = [];
        const values = [];

        // הכנה של השדות לעדכון
        for (const [key, value] of Object.entries(updatedFields)) {
            fields.push(`${key} = ?`);
            values.push(value);
        }

        // אם לא נשלח כלום – אין מה לעדכן
        if (fields.length === 0) {
            return callback(new Error("No fields provided to update"));
        }

        // הוספת ה-ID לסוף – כי הוא יהיה ב- WHERE
        const sql = `UPDATE comments SET ${fields.join(', ')} WHERE id = ?`;
        values.push(commentId);

        DB.query(sql, values, (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    }
};

export default commentsModel;