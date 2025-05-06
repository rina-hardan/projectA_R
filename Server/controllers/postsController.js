import postsModel from "../models/postsModel.js";

const postsController = {
    getAllPosts: (req, res) => {
        postsModel.getAllPosts((err, posts) => {
            if (err) return res.status(500).json({ error: "Database error" });
            if (!posts) return res.status(404).json({ error: "posts not found" });
            res.json(posts);
        });
    },

    getPostByUserId: (req, res) => {
        const { user_id } = req.params;
        postsModel.getPostByUserId(user_id, (err, post) => {
            if (err) return res.status(500).json({ error: "Database error" });
            if (!post) return res.status(404).json({ error: "post not found" });
            res.json(post);
        });
    },

    addPost: (req, res) => {
        const post = req.body;
        const { title, content, user_id } = post;

        if (!title || !content || !user_id ) {
            return res.status(400).json({ error: "יש למלא את כל השדות הנדרשים" });
        }

        const postToSave = {
            title,
            content,
            user_id
        };

        postsModel.addTodo(postToSave, (err, result) => {
            if (err) {
                console.error(" שגיאה בהוספת הפוסט למסד:", err);
                return res.status(500).json({ error: "שגיאה בהוספת הפוסט" });
            }

            res.status(201).json({ message: " הפוסט נוסף בהצלחה", id: result.insertId });
        });
    }
};

export default postsController;
