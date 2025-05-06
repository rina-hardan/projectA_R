import commentsModel from "../models/commentsModel.js";

const commentsController = {
    

    getCommentsByPostId: (req, res) => {
        const { post_id } = req.params;
        commentsModel.getPostByUserId(post_id, (err, post) => {
            if (err) return res.status(500).json({ error: "Database error" });
            if (!post) return res.status(404).json({ error: "comment not found" });
            res.json(post);
        });
    },

    addComment: (req, res) => {

        
          
        const comment = req.body;
        const { post_id , name,email, body} = post;

        if (!post_id|| !name|| !email|| !body ) {
            return res.status(400).json({ error: "יש למלא את כל השדות הנדרשים" });
        }

        const commentToSave = {
            post_id ,
             name,
             email, 
             body
        };

        commentsModel.addTodo(commentToSave, (err, result) => {
            if (err) {
                console.error(" שגיאה בהוספת הפוסט למסד:", err);
                return res.status(500).json({ error: "שגיאה בהוספת הפוסט" });
            }

            res.status(201).json({ message: " הפוסט נוסף בהצלחה", id: result.insertId });
        });
    },
   
    deleteComment: (req, res) => {
        const { commentId } = req.params;
    
        commentsModel.deleteComment(commentId, (err, result) => {
            if (err) return res.status(500).json({ error: "Database error" });
            if (!result) return res.status(404).json({ error: "No comments found for this user" });
    
            res.json(result); // יכול להחזיר: { message: "...", deletedCount: ... }
        });
    }
};

export default commentsController;
