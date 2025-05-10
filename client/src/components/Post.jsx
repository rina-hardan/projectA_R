import styles from "../CSS/Post.module.css";
import { useState, useContext, useRef, useEffect } from "react";
import { CurrentUserContext } from '../App';
import Comment from './Comment';
import useMessage from "../hooks/useMessage";
import Create from "./Create";
import Edit from "./Edit";
import { sendRequest } from '../DB_API.jsx';

export default function Post({ post, setPosts, isAllPosts, setGlobalMessage }) {
    const { currentUser } = useContext(CurrentUserContext);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const inputRef = useRef({ title: null, body: null });
    const configComments = { entity: "comments", setEntities: setComments, setMessage: setGlobalMessage, currentEntity: post }
    const fieldNames = ["title", "content"]
    async function updatePost(postId, updatedPost, setPosts, setGlobalMessage) {
        try {
            const { status } = await sendRequest({
                method: "PUT",
                url: `/posts/updatePost/${post.id}`,
                body: updatedPost
            });

            if (status === 'SUCCESS') {
                setGlobalMessage("Post updated successfully!");
                setPosts(prevPosts =>
                    prevPosts.map(post =>
                        post.id === postId ? { ...post, ...updatedPost } : post
                    )
                );
            } else {
                setGlobalMessage("Failed to update post.");
            }
        } catch (error) {
            console.error("Error updating post:", error);
            setGlobalMessage("Error updating post.");
        }
    }

    async function handleDeletePost() {
        try {
            const { status } = await sendRequest({
                method: "DELETE",
                url: `/posts/deletePost/${post.id}`,
                body: {}
            });

            if (status === 'SUCCESS') {
                setGlobalMessage("Post deleted successfully!");
                setPosts(prev => prev.filter(p => p.id !== post.id));
            } else {
                setGlobalMessage("Failed to delete post.");
            }
        } catch (error) {
            console.error("Error deleting post and comments:", error);
            setGlobalMessage("Error deleting post.");
        }
    }

    async function fetchComments({ setComments, setMessage, postId }) {
        try {
            const { data, status } = await sendRequest({
                method: "GET",
                url: `/comments/getCommentsByPostId/${postId}`
            });

            if (status === "FAILED") {
                setMessage("Failed getting comments.");
                return;
            }

            if (status === "NOT_FOUND") {
                setMessage("No comments yet. Click + to add.");
            }

            setComments(data);
        } catch (error) {
            console.error("Error fetching comments:", error);
            setMessage("Error fetching comments.");
        }
    }

    async function handleAddComments(setMessage, newComment) {
        try {
            const { data, status } = await sendRequest({
                method: "POST",
                url: `/comments/addComment/${newComment.postId}`,
                body: newComment
            });
            console.log(data);
            if (status === "SUCCESS") {
                setMessage("Comment added successfully!");
                const addedComment = {
                    id: data.id,
                    postId: newComment.postId,
                    name: newComment.name,
                    email: newComment.email,
                    body: newComment.body
                }
                setComments(prev => [...prev, addedComment]);
                setIsAdding(false);
            } else {
                setMessage("Failed to add comment.");
            }
        } catch (error) {
            console.error("Error adding comment:", error);
            setMessage("Error adding comment.");
        }
    }

    return (
        <div className={`${styles.postBox} ${isSelected && styles.fullscreenPost}`}>
            <div className={`${styles.postButtons} ${isSelected && styles.fullscreenPostButtons}`}>
                <button
                    disabled={isAllPosts && currentUser.id !== post.user_id}
                    onClick={handleDeletePost}>
                    <img width="30px" height="30px" src="https://cdn-icons-png.flaticon.com/128/5305/5305859.png" alt="Recycle Bin" />
                </button>
                <button disabled={isAllPosts && currentUser.id !== post.user_id} onClick={() => setIsEditing(true)}>✎</button>
                <button onClick={() => setIsSelected(!isSelected)}>{isSelected ? "❌" : "⤢"}</button>
            </div>
            <div className={`${styles.postText} ${isSelected && styles.fullscreenPostText}`}>
                <strong>{post.id}:</strong>
                {isEditing && (
                    <Edit setIsEditing={setIsEditing} entity={post} fieldNames={fieldNames} handleUpdate={(updatedPost) => updatePost(post.id, updatedPost, setPosts, setGlobalMessage)} />
                )}
                {!isEditing && !isSelected && (
                    <div>
                        <p className={styles.postTitle}>{post.title}</p>
                    </div>
                )}
                {isSelected && (
                    <div>
                        <p className={`${styles.postTitle} ${isSelected && styles.fullscreenPostTitle}`}>{post.title}</p>
                        <p className={`${styles.postDescription} ${isSelected && styles.fullscreenPostDescription}`}>
                            {post.content}
                        </p>
                        <button
                            className={`${styles.postButton} ${isSelected && styles.fullscreenPostButton}`}
                            onClick={async () => {
                                await fetchComments({ setComments, setMessage: setGlobalMessage, postId: post.id });
                                setShowComments(prev => !prev);
                            }}
                        >
                            {showComments ? "Hide Comments" : "Show Comments"}
                        </button>
                    </div>
                )}
                {showComments && isSelected && (
                    <div>
                        <Create addRefs={inputRef} isAdding={isAdding} setIsAdding={setIsAdding} handleAdd={() => handleAddComments(setGlobalMessage, { postId: post.id, name: inputRef.current.title.value,email: currentUser.email, body: inputRef.current.body.value,}) }>
                            <input
                                placeholder="Name:"
                                type="text"
                                className={`${styles.textInput} ${isSelected && styles.fullscreenTextInput}`}
                                ref={(el) => (inputRef.current.title = el)}
                            />
                            <textarea
                                placeholder="Comment:"
                                type="text"
                                className={`${styles.textInput} ${isSelected && styles.fullscreenTextInput}`}
                                ref={(el) => (inputRef.current.body = el)}
                            />
                        </Create>

                        <div className={`${styles.commentsSection} ${isSelected && styles.fullscreenCommentsSection}`}>
                            {comments.map((comment, index) => (
                                <Comment key={index} comment={comment} setComments={setComments} setMessage={setGlobalMessage} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
