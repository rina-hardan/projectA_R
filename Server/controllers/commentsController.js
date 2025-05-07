import commentsModel from "../models/commentsModel.js";

const commentsController = {

    getCommentsByPostId: (req, res) => {
        const { post_id } = req.params;
        commentsModel.getCommentsByPostId(post_id, (err, comments) => {
            if (err) return res.status(500).json({ error: "Database error" });
            if (!comments) return res.status(404).json({ error: "Comments not found" });
            res.json(comments);
        });
    },

    addComment: (req, res) => {
        const { name, email, body } = req.body;
        const { post_id } = req.params;

        if (!name || !email || !body) {
            return res.status(400).json({ error: "All required fields must be filled" });
        }

        const commentToSave = {
            post_id: parseInt(post_id),
            name,
            email,
            body
        };

        commentsModel.addComment(commentToSave, (err, result) => {
            if (err) {
                console.error("Error adding the comment to the database:", err);
                return res.status(500).json({ error: "Error adding the comment" });
            }

            res.status(201).json({ message: "Comment added successfully", id: result.insertId });
        });
    },

    deleteComment: (req, res) => {
        const { commentId } = req.params;
        commentsModel.deleteComment(commentId, (err, result) => {
            if (err) return res.status(500).json({ error: "Database error" });
            if (!result) return res.status(404).json({ error: "No comments found for this user" });

            res.json(result);
        });
    },
    updateComment: (req, res) => {
        const { comment_id } = req.params;
        const { post_id, name, email, body } = req.body;

        if (!post_id) {
            return res.status(400).json({ error: "post_id is required" });
        }

        commentsModel.getCommentById(comment_id, (err, existingComment) => {
            if (err) return res.status(500).json({ error: "Database error" });
            if (!existingComment) return res.status(404).json({ error: "Comment not found" });

            if (existingComment.post_id !== post_id) {
                return res.status(403).json({ error: "You are not authorized to update this comment" });
            }

            const updateFields = { name, email, body };
            const filteredFields = Object.fromEntries(
                Object.entries(updateFields).filter(([_, value]) => value)
            );

            if (Object.keys(filteredFields).length === 0) {
                return res.status(400).json({ error: "No fields provided to update" });
            }

            commentsModel.updateComment(comment_id, filteredFields, (err) => {
                if (err) return res.status(500).json({ error: "Failed to update comment" });
                res.json({ message: "Comment updated successfully" });
            });
        });
    }

};

export default commentsController;
