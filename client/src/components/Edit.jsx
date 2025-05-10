import styles from '../CSS/Edit.module.css';
import { useState } from 'react';

export default function Edit({setIsEditing, entity, fieldNames ,handleUpdate}) {
    const [editEntity, setEditEntity] = useState(entity);
console.log(entity);
console.log(editEntity);

    function handleUpdateAttribute(e, attribute) {
        e.preventDefault();
        setEditEntity(prevEntity => ({ ...prevEntity, [attribute]: e.target.value }));
    }

    function saveEntity(e) {
        e.preventDefault();
        handleUpdate(editEntity);
        setIsEditing(false);
    }

    return (
        <div className={styles.updateContainer}>
            {fieldNames.map((key, index) => (
                <textarea
                    key={index}
                    type="text"
                    value={editEntity[key]}
                    onChange={e => handleUpdateAttribute(e, key)}
                    className={styles.updateInput}
                />
            ))}
            <button onClick={saveEntity} className={styles.saveButton}>
                Save
            </button>
        </div>
    );
}
