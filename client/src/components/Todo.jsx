import styles from "../CSS/Todo.module.css";
import { useState } from "react";
import {
    handleDeleteEntity,
    handleUpdateEntity
} from '../CRUDS'

import Edit from './Edit.jsx'

export default function Todo({ todo, config }) {
    const [isEditing, setIsEditing] = useState(false);
    const inputFields = ["title"];
    return (
        <div className={styles.todoBox}>
            <div>
                <button onClick={e => handleDeleteEntity(config, todo.id, `todos/${todo.id}`)}>
                    <img width="30px" height="30px" src="https://cdn-icons-png.flaticon.com/128/5305/5305859.png" alt="Recycle Bin" />
                </button>
                <button onClick={() => setIsEditing(true)}>✎</button>
            </div>

            <div className={styles.todoLabel}>
                <input
                    onChange={(e) => handleUpdateEntity(config, todo.id, { completed: e.target.checked })}
                    type="checkbox"
                    checked={todo.completed}
                    className={styles.todoCheckbox}
                />
                <strong>{todo.id}:</strong>
                {isEditing && <Edit setIsEditing={setIsEditing} config={config} entity={todo} fieldNames={inputFields} />}
                {!isEditing && <p className={styles.textTodo}>{todo.title}</p>}
            </div>
        </div>
    );
}
