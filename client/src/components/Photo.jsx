import { useState } from 'react';
import styles from "../CSS/Photo.module.css";
import { handleDeleteEntity } from '../CRUDS';
import Edit from "./Edit";

export default function Photo({ photo, configPhoto }) {
    const [isEditing, setIsEditing] = useState(false);
    const fieldNames = ["title", "url", "thumbnailUrl"];

    return (
        <div className={styles.photoBox}>
            <div className={styles.photoButtons}>
                <button onClick={() => handleDeleteEntity(configPhoto, photo.id, `photos/${photo.id}`)} title="Delete Photo"  ><img src="https://cdn-icons-png.flaticon.com/128/5305/5305859.png" alt="Delete" width="20" height="20" /> </button>
                <button onClick={() => setIsEditing(true)} title="Edit Photo" > ✎ </button>
            </div>
            {isEditing ? (
                <Edit config={configPhoto} setIsEditing={setIsEditing} entity={photo} fieldNames={fieldNames}
                />
            ) : (
                <div>
                    <h3 className={styles.photoTitle}>{photo.title}</h3>
                    <img className={styles.photoThumbnail} src={photo.thumbnailUrl} alt={photo.title} />
                </div>
            )}
        </div>
    );
}
