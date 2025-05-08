import styles from '../CSS/Albums.module.css';
import { albumTitleContext, CurrentUserContext } from '../App';
import { useContext, useState, useEffect, useRef } from 'react';
import { fetchEntities, handleAddEntity } from '../CRUDS.jsx';
import useMessage from '../hooks/useMessage.jsx';
import { Link } from 'react-router-dom';
import Search from './Search.jsx';
import Create from './Create.jsx';

export default function Albums() {
    const [albums, setAlbums] = useState([]);
    const { currentUser } = useContext(CurrentUserContext);
    const { setAlbumTitle } = useContext(albumTitleContext);
    const [message, setMessage] = useMessage("");
    const [isAdding, setIsAdding] = useState(false);
    const inputRef = useRef({});
    const configAlbums = { entity: "albums", setEntities: setAlbums, setMessage: setMessage, currentEntity: currentUser };

    useEffect(() => {
        fetchEntities(configAlbums, `albums?userId=${currentUser.id}`);
    }, []);

    return (
        <div className={styles.container}>
            <h1>Albums:</h1>
            <Search config={configAlbums} searchUrl={`albums?`} fetchUrl={`albums?userId=${currentUser.id}`} />
            <Create addRefs={inputRef} isAdding={isAdding} setIsAdding={setIsAdding} handleAdd={() => handleAddEntity(configAlbums, setIsAdding, { userId: currentUser.id, title: inputRef.current.title.value }, `albums?userId=${currentUser.id}`)} />
            <p className={styles.message}>{message}</p>
            <ul className={styles.albumList}>
                {albums &&
                    albums.map((album, i) => (
                        <li key={album.id} className={styles.albumItem}>
                            <Link onClick={() => setAlbumTitle(album.title)} to={`${album.id}/photos`}>
                                <strong>{album.id}</strong>
                                <p>{album.title}</p>
                            </Link>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
