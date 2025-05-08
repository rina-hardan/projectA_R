import styles from '../CSS/Edit.module.css';
import { useState } from 'react';
import { handleUpdateEntity } from '../CRUDS';

export default function Edit({ config, setIsEditing, entity, fieldNames }) {
    const [editEntity, setEditEntity] = useState(entity);

    function handleUpdateAttribute(e, attribute) {
        e.preventDefault();
        setEditEntity(prevEntity => ({ ...prevEntity, [attribute]: e.target.value }));
    }

    function saveEntity(e) {
        e.preventDefault();
        handleUpdateEntity(config, entity.id, editEntity);
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
