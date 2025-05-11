import styles from '../CSS/Comment.module.css';
import { useState, useContext } from "react";
import { CurrentUserContext } from '../App';
import {sendRequest} from "../DB_API"
import Edit from './Edit'

export default function Comment({ comment, setComments,setMessage }) {
    const [isEditing, setIsEditing] = useState(false);
    const { currentUser } = useContext(CurrentUserContext);
    const fieldNames = ["name", "body"];
    async function handleDeleteComments(commentId) {
    try {
          const { status } = await sendRequest({
                method: "DELETE",
                url: `/comments/deleteComment/${comment.id}`,
                body: {
                    email: currentUser.email 
                },
            });
        if (status === 'SUCCESS') {
           setMessage(`comment deleted successfully!`);
            setComments(prev => prev.filter(comment => comment.id !== commentId));
        } else if (status === 'NOT_FOUND') {
            setMessage(`comment not found.`);
        } else {
            setMessage(`Failed to delete comment.`);
        }
    } catch (error) {
        console.error(`Error while deleting comment with ID ${commentId}:`, error);
        setMessage(`Error deleting comment.`);
    }
}

async function handleUpdateComment(commentId, updatedComment, setComments, setGlobalMessage) {
    try {
        const { status } = await sendRequest({
            method: "PUT",
            url: `/comments/updateComment/${commentId}`,
            body: updatedComment
        });

        if (status === 'SUCCESS') {
            setGlobalMessage("Comment updated successfully!");
            setComments(prevComments =>
                prevComments.map(comment =>
                    comment.id === commentId ? { ...comment, ...updatedComment } : comment
                )
            );
        } else {
            setGlobalMessage("Failed to update comment.");
        }
    } catch (error) {
        console.error("Error updating comment:", error);
        setGlobalMessage("Error updating comment.");
    }
}

    return (
        <div className={styles.commentBox}>
            <div className={styles.commentButtons}>
                <button disabled={currentUser.email != comment.email} onClick={e => handleDeleteComments(comment.id)}>
                    <img width="30px" height="30px" src="https://cdn-icons-png.flaticon.com/128/5305/5305859.png" alt="Recycle Bin" />
                </button>
                <button disabled={currentUser.email != comment.email} onClick={() => setIsEditing(true)}>✎</button>
            </div>
            <strong className={styles.commentId}>{comment.id}:</strong>
            <p className={styles.commentText}>{comment.email}</p>
            {!isEditing && (
                <div>
                    <p className={styles.commentText}>{comment.name}</p>
                    <p className={styles.commentText}>{comment.body}</p>
                </div>)
            }
            {isEditing && <Edit  setIsEditing={setIsEditing} entity={comment} fieldNames={fieldNames} handleUpdate={( updatedEntity) => handleUpdateComment(comment.id, updatedEntity, setComments, setMessage)} />}
        </div>
    );
}
