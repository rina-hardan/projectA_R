import { useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from '../App';
import Post from './Post';
import Search from './Search.jsx';
import Create from './Create.jsx';
import styles from "../CSS/Posts.module.css";
import useMessage from '../hooks/useMessage.jsx';
import { sendRequest } from '../DB_API.jsx';

export default function Posts() {
    const { currentUser } = useContext(CurrentUserContext);
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useMessage("");
    const [isAdding, setIsAdding] = useState(false);
    const [isAllPosts, setIsAllPosts] = useState(false);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const fetchPosts = async (url) => {
        const { data, status } = await sendRequest({ method: 'GET', url: `/${url}` });
        if (status === 'FAILED') {
            setMessage("Failed getting posts.");
            setPosts([]);
            return;
        }
        if (!data || (Array.isArray(data) && data.length === 0)) {
            setMessage("No posts. Click + to add.");
            setPosts([]);
            return;
        }
        setMessage("");
        setPosts(data);
    };

    const handleAdd = async (setLocalMessage) => {
        if (!title || !content) {
            setLocalMessage("Please fill all the details");
            return;
        }

        const newPost = {
            title,
            content: content,
        };

        const { data, status } = await sendRequest({ method: 'POST', url: `/posts/addPost/${currentUser.id}`, body: newPost });
        if (status === 'FAILED') {
            setLocalMessage("Failed adding post.");
            return;
        }

        setMessage("Post added successfully!");
        setIsAdding(false);
        setTitle("");
        setContent("");
        const postAdded = {
            user_id: currentUser.id,
            title,
            content: content,
            id: data.id
        };
        if (!isAllPosts) {
            setPosts(prevPosts => [postAdded, ...prevPosts]);
        }
        else {
            fetchPosts(`posts/getAllPosts`);
        }
    };
 async function handleSearchPosts( url) {
    const { data, status } = await sendRequest({
        method: 'POST',
        url,
        body:{},
    });

    if (status === 'SUCCESS') {
        setMessage("Post search completed successfully.");
        setPosts(data);
    } else if (status === 'NOT_FOUND') {
        setMessage("No posts found.");
        setPosts([]);
    } else {
        setMessage("Failed to search posts.");
    }
}
    useEffect(() => {
        fetchPosts(`posts/getPostsByUserId/${currentUser.id}`);
    }, []);

    return (
        <div className={styles.postsContainer}>
            <h1 className={styles.header}>Posts:</h1>

            <div className={styles.toggleButtons}>
                <h2 className={styles.header}>
                    {isAllPosts ? "ALL POSTS" : "MY POSTS"}
                </h2>
                <br></br>
                {!isAllPosts && (
                    <button className={styles.toggleButton} onClick={() => {
                        fetchPosts(`posts/getAllPosts`);
                        setIsAllPosts(true);
                    }}>
                        All posts
                    </button>
                )}
                {isAllPosts && (
                    <button className={styles.toggleButton} onClick={() => {
                        fetchPosts(`posts/getPostsByUserId/${currentUser.id}`);
                        setIsAllPosts(false);
                    }}>
                        My posts
                    </button>
                )}
            </div>

            <Search

                    entity={"posts"}
                fetch={(searchUrl) => fetchPosts(searchUrl)}
                searchUrl={isAllPosts ? `posts/getAllPosts` : `posts/search/${currentUser.id}`}
                fetchUrl={isAllPosts ? `posts/getAllPosts` : `posts/getPostsByUserId/${currentUser.id}`}
                handleSearch={(fullUrl)=>handleSearchPosts(fullUrl)}
                fetchEntities={fetchPosts}
            />
            <Create isAdding={isAdding} setIsAdding={setIsAdding} handleAdd={handleAdd}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className={styles.textInput}
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="content"
                    className={styles.textInput}
                />
            </Create>

            <p className={styles.message}>{message}</p>

            <div className={styles.postsList}>
                {posts &&
                    posts.map((post, i) => (
                        <Post key={post.id} post={post} setPosts={setPosts} isAllPosts={isAllPosts} setGlobalMessage={setMessage} />
                    ))}
            </div>
        </div>
    );
}
