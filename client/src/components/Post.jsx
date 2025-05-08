import styles from "../CSS/Post.module.css";
import { useState, useContext, useRef, useEffect } from "react";
import { CurrentUserContext } from '../App';
import { handleDeleteEntity, fetchEntities, handleAddEntity } from '../CRUDS';
import { getById } from '../DB_API'
import Comment from './Comment';
import useMessage from "../hooks/useMessage";
import Create from "./Create";
import Edit from "./Edit";

export default function Post({ post, configPost, isAllPosts }) {
    const { currentUser } = useContext(CurrentUserContext);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [message, setMessage] = useMessage("");
    const inputRef = useRef({})
    const configComments = { entity: "comments", setEntities: setComments, setMessage: setMessage, currentEntity: post }
    const fieldNames = ["title", "body"]

    async function handleDeletePost(){
        const { data } = await getById(`comments?postId=${post.id}`);
        data.forEach((comment) => {
            handleDeleteEntity(configComments, comment.id, `comments/${comment.id}`)
        });
        handleDeleteEntity(configPost, post.id, `posts/${post.id}`)
    }

    return (
        <div className={`${styles.postBox} ${isSelected && styles.fullscreenPost}`}>
            <div className={`${styles.postButtons} ${isSelected && styles.fullscreenPostButtons}`}>
                <button
                    disabled={isAllPosts && currentUser.id !== post.userId}
                    onClick={handleDeletePost}>
                    <img width="30px" height="30px" src="https://cdn-icons-png.flaticon.com/128/5305/5305859.png" alt="Recycle Bin" />
                </button>
                <button disabled={isAllPosts && currentUser.id !== post.userId} onClick={() => setIsEditing(true)}>✎</button>
                <button onClick={()=>setIsSelected(!isSelected)}>{isSelected ? "❌" : "⤢"}</button>
            </div>
            <div className={`${styles.postText} ${isSelected && styles.fullscreenPostText}`}>
                <strong>{post.id}:</strong>
                {isEditing && (
                    <Edit config={configPost} setIsEditing={setIsEditing} entity={post} fieldNames={fieldNames} />
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
                            {post.body}
                        </p>
                        <button
                            className={`${styles.postButton} ${isSelected && styles.fullscreenPostButton}`}
                            onClick={() => {
                                fetchEntities(configComments, `comments?postId=${post.id}`);
                                setShowComments(!showComments);
                            }
                            }
                        >
                            {showComments ? "Hide Comments" : "Show Comments"}
                        </button>
                    </div>
                )}
                <p>{message}</p>
                {showComments && isSelected && (
                    <div>
                        <Create addRefs={inputRef} isAdding={isAdding} setIsAdding={setIsAdding} handleAdd={() => handleAddEntity(configComments, setIsAdding, { postId: post.id, name: inputRef.current.title.value, email: currentUser.email, body: inputRef.current.body.value }, `comments?postId=${post.id}`)}>
                            <textarea
                                placeholder="Comment:"
                                type="text"
                                className={`${styles.textInput} ${isSelected && styles.fullscreenTextInput}`}
                                ref={(el) => (inputRef.current.body = el)}
                            />
                        </Create>

                        <div className={`${styles.commentsSection} ${isSelected && styles.fullscreenCommentsSection}`}>
                            {comments.map((comment, index) => (
                                <Comment key={index} comment={comment} configComment={configComments} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
}
