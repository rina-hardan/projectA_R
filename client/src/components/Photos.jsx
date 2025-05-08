import { useParams } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from 'react';
import useMessage from "../hooks/useMessage.jsx";
import { FAILED, NOT_FOUND, getById } from "../DB_API.jsx";
import { albumTitleContext } from '../App';
import styles from "../CSS/Photos.module.css";
import Photo from "./Photo.jsx";
import { handleAddEntity } from '../CRUDS';
import Create from "./Create.jsx";

export default function Photos() {
    const { albumTitle } = useContext(albumTitleContext);
    const { albumId } = useParams();
    const [photos, setPhotos] = useState([]);
    const [message, setMessage] = useMessage("");
    const configPhotos = {
        entity: "photos",
        setEntities: setPhotos,
        setMessage: setMessage,
    };
    const inputRef = useRef({});
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const loader = useRef(null);
    const [isAdding, setIsAdding] = useState(false);
    const LIMIT = 10;

    async function loadMorePhotos() {
        const { data, status } = await getById(`photos?albumId=${albumId}&_start=${page * LIMIT}&_limit=${LIMIT}`);
        if (status === NOT_FOUND) {
            setHasMore(false);
            return;
        }
        if (status === FAILED) {
            setMessage("Failed to fetch photos");
            return;
        }
        setPhotos((prevPhotos) => [...prevPhotos, ...data]);
        setPage((prevPage) => prevPage + 1);
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && hasMore) {
                    loadMorePhotos();
                }
            },
            { threshold: 1.0 }
        );
        if (loader.current) {
            observer.observe(loader.current);
        }
        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    }, [page]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3>Album ID: {albumId}</h3>
                <p>{albumTitle}</p>
            </div>
            <div className={styles.createSection}>
                <Create addRefs={inputRef} isAdding={isAdding} setIsAdding={setIsAdding} handleAdd={() => handleAddEntity(configPhotos, setIsAdding, { albumId: albumId, title: inputRef.current.title.value, url: inputRef.current.url.value, thumbnailUrl: inputRef.current.thumbnailUrl.value, }, `photos?albumId=${albumId}`)}  >
                    <input
                        placeholder="Url:"
                        type="text"
                        ref={(el) => (inputRef.current.url = el)}
                    />
                    <input
                        placeholder="Thumbnail URL:"
                        type="text"
                        ref={(el) => (inputRef.current.thumbnailUrl = el)}
                    />
                </Create>
            </div>
            <p className={styles.message}>{message}</p>
            <div className={styles.photosGrid}>
                {photos.map((photo) => (
                    <div key={photo.id} className={styles.photoCard}>
                        <Photo photo={photo} configPhoto={configPhotos} />
                    </div>
                ))}
            </div>
            {hasMore && <div ref={loader} className={styles.loader}>Loading...</div>}
        </div>
    );
}
