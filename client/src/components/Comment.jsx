import styles from '../CSS/Comment.module.css';
import { useState, useContext } from "react";
import { CurrentUserContext } from '../App';
import { handleDeleteEntity } from '../CRUDS';
import Edit from './Edit'

export default function Comment({ comment, configComment }) {
    const [isEditing, setIsEditing] = useState(false);
    const { currentUser } = useContext(CurrentUserContext);
    const fieldNames = ["name", "body"];

    return (
        <div className={styles.commentBox}>
            <div className={styles.commentButtons}>
                <button disabled={currentUser.email != comment.email} onClick={e => handleDeleteEntity(configComment, comment.id, `comments/${comment.id}`)}>
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
            {isEditing && <Edit config={configComment} setIsEditing={setIsEditing} entity={comment} fieldNames={fieldNames} />}
        </div>
    );
}
