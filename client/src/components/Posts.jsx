import { useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from '../App';
import Post from './Post';
// import Search from './Search.jsx';
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
    const [description, setDescription] = useState('');

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

    const handleAdd = async () => {
        const newPost = {
            userId: currentUser.id,
            title,
            body: description,
        };

        const { status } = await sendRequest({ method: 'post', url: `/posts`, body: newPost });

        if (status === 'FAILED') {
            setMessage("Failed adding post.");
            return;
        }

        setMessage("Post added successfully!");
        setIsAdding(false);
        setTitle("");        
        setDescription(""); 

        const url = isAllPosts ? `posts/getAllPosts` : `posts/getPostsByUserId/${currentUser.id}`;
        fetchPosts(url);
    };

    useEffect(() => {
        fetchPosts("posts/getAllPosts");
    }, []);

    return (
        <div className={styles.postsContainer}>
            <h1 className={styles.header}>Posts:</h1>
            <div className={styles.toggleButtons}>
            
                {!isAllPosts && (
                    <button className={styles.toggleButton} onClick={() => {
                        fetchPosts(`posts/getAllPosts`);
                        setIsAllPosts(true);
                    }}>
                        All posts:
                    </button>
                )}
                {isAllPosts && (
                    <button className={styles.toggleButton} onClick={() => {
                        fetchPosts(`posts/getPostsByUserId/${currentUser.id}`);
                        setIsAllPosts(false);
                    }}>
                        My posts:
                    </button>       
                )}
            </div>
            {/* <Search
                fetch={(searchUrl) => fetchPosts(searchUrl)}
                searchUrl={isAllPosts ? `posts/getAllPosts` : `posts/getPostsByUserId/${currentUser.id}`}
                fetchUrl={isAllPosts ? `posts/getAllPosts` : `posts/getPostsByUserId/${currentUser.id}`}
            /> */}
            <Create isAdding={isAdding} setIsAdding={setIsAdding} handleAdd={handleAdd}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className={styles.textInput}
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className={styles.textInput}
                />
            </Create>

            <p className={styles.message}>{message}</p>

            <div className={styles.postsList}>
                {posts &&
                    posts.map((post, i) => (
                        <Post key={i} post={post} configPost={{ entity: "posts", currentEntity: currentUser }} isAllPosts={isAllPosts} />
                    ))}
            </div>
        </div>
    );
}
