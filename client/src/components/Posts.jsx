import { useContext, useState, useRef, useEffect } from 'react';
import { CurrentUserContext } from '../App';
import { fetchEntities, handleAddEntity } from '../CRUDS.jsx';
import Post from './Post';
import Search from './Search.jsx';
import Create from './Create.jsx';
import styles from "../CSS/Posts.module.css";
import useMessage from '../hooks/useMessage.jsx';

export default function Posts() {
    const { currentUser } = useContext(CurrentUserContext);
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useMessage("");
    const [isAdding, setIsAdding] = useState(false);
    const inputRef = useRef({});
    const config = { entity: "posts", setEntities: setPosts, setMessage: setMessage, currentEntity: currentUser };
    const [isAllPosts, setIsAllPosts] = useState(false)

    useEffect(() => {
        fetchEntities(config, `posts?userId=${currentUser.id}`);
    }, []);

    return (
        <div className={styles.postsContainer}>
            <h1 className={styles.header}>Posts:</h1>
            <div className={styles.toggleButtons}>
                {!isAllPosts && (
                    <button className={styles.toggleButton} onClick={() => {
                        fetchEntities(config, `posts`);
                        setIsAllPosts(true);
                    }}>
                        All posts:
                    </button>
                )}
                {isAllPosts && (
                    <button className={styles.toggleButton} onClick={() => {
                        fetchEntities(config, `posts?userId=${currentUser.id}`);
                        setIsAllPosts(false);
                    }}>
                        My posts:
                    </button>
                )}
            </div>
            <Search config={config} searchUrl={isAllPosts ? `posts?` : `posts?userId=${currentUser.id}&`} fetchUrl={isAllPosts ? `posts` : `posts?userId=${currentUser.id}`} />
            <Create addRefs={inputRef} isAdding={isAdding} setIsAdding={setIsAdding} handleAdd={() => handleAddEntity(config, setIsAdding, {userId:currentUser.id,title: inputRef.current.title.value, body: inputRef.current.description.value}, `posts?userId=${currentUser.id}`)}>
                <textarea
                    placeholder="Description:"
                    type="text"
                    className={styles.textInput}
                    ref={el => (inputRef.current.description = el)}
                />
            </Create>

            <p className={styles.message}>{message}</p>

            <div className={styles.postsList}>
                {posts &&
                    posts.map((post, i) => (
                        <Post key={i} post={post} configPost={config} isAllPosts={isAllPosts} />
                    ))}
            </div>
        </div>

    );
}
