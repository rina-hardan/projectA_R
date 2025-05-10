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
        const { commentId } = req.params;
        const { email, ...updateFields } = req.body;

        if (!email) return res.status(400).json({ error: "Email is required for authorization" });

        commentsModel.getCommentById(commentId, (err, existingComment) => {
            if (err) return res.status(500).json({ error: "Database error" });
            if (!existingComment) return res.status(404).json({ error: "Comment not found" });

            if (existingComment.email !== email) {
                return res.status(403).json({ error: "You are not authorized to update this comment" });
            }

            const filteredFields = Object.fromEntries(
                Object.entries(updateFields).filter(([_, value]) => value !== undefined)
            );

            if (Object.keys(filteredFields).length === 0) {
                return res.status(400).json({ error: "No fields provided to update" });
            }

            commentsModel.updateComment(commentId, filteredFields, (err) => {
                if (err) return res.status(500).json({ error: "Failed to update comment" });
                res.json({ message: "Comment updated successfully" });
            });
        });
    }
};

export default commentsController;
