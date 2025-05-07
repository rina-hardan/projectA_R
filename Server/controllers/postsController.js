import postsModel from "../models/postsModel.js";

const postsController = {
    getAllPosts: (req, res) => {
        postsModel.getAllPosts((err, posts) => {
            if (err) return res.status(500).json({ error: "Database error" });
            if (!posts) return res.status(404).json({ error: "Posts not found" });
            res.json(posts);
        });
    },

    getPostsByUserId: (req, res) => {
        const { user_id } = req.params;
        postsModel.getPostsByUserId(user_id, (err, post) => {
            if (err) return res.status(500).json({ error: "Database error" });
            if (post.length === 0) return res.status(404).json({ error: "Post not found" });
            res.json(post);
        });
    },

    addPost: (req, res) => {
        const { title, content } = req.body;
        const { user_id } = req.params;

        if (!title || !content) {
            return res.status(400).json({ error: "All required fields must be filled" });
        }

        const postToSave = {
            title,
            content,
            user_id: parseInt(user_id)
        };

        postsModel.addPost(postToSave, (err, result) => {
            if (err) {
                console.error("Error adding the post to the database:", err);
                return res.status(500).json({ error: "Error adding the post" });
            }

            res.status(201).json({ message: "Post added successfully", id: result.insertId });
        });
    },

    updatePost: (req, res) => {
        const { post_id } = req.params;
        const { title, content } = req.body;
    
        if (!title && !content) {
            return res.status(400).json({ error: "At least one field (title or content) must be provided" });
        }
    
        postsModel.updatePost(post_id, { title, content }, (err, result) => {
            if (err) {
                console.error("Error updating the post:", err);
                return res.status(500).json({ error: "Error updating the post" });
            }
    
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Post not found" });
            }
    
            res.json({ message: "Post updated successfully" });
        });
    },
    deletePost: (req, res) => {
        const { post_id } = req.params; 
    
        postsModel.deletePost(post_id, (err, result) => {
            if (err) return res.status(500).json({ error: "Database error" });
            if (!result) return res.status(404).json({ error: "No post found" }); 
            res.json(result);
        });
    }
};

export default postsController;
