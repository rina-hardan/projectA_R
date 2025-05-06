import DB from "../DB/Config.js";

const commentsModel = {
    addComment: (commentData, callback) => {
        const { content, post_id, user_id } = commentData;
        DB.query(
            "INSERT INTO comments (content, post_id, user_id) VALUES (?, ?, ?)",
            [content, post_id, user_id],
            (err, result) => {
                if (err) return callback(err);
                callback(null, result); // מחזיר את insertId וכו'
            }
        );
    },

    deleteComment: (post_id, callback) => {
        DB.query(
            "DELETE FROM comments WHERE post_id = ?",
            [post_id],
            (err) => {
                if (err) return callback(err);
                return callback(null, { message: "Comments deleted successfully" });
            }
        );
    }  
};

export default commentsModel;

 