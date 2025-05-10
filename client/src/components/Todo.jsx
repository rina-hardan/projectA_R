import styles from "../CSS/Todo.module.css";
import { useState } from "react";
import { sendRequest } from '../DB_API.jsx';
import Edit from './Edit.jsx';

export default function Todo({ todo , setTodos, setGlobalMessage }) {
    const [isEditing, setIsEditing] = useState(false);
    const inputFields = ["title", "completed"];

    async function handleUpdateTodo(todoId, updatedTodo, setTodo, setGlobalMessage) {
        try {
            const { status } = await sendRequest({
                method: "PUT",
                url: `/todos/updateTodo/${todo.id}`,
                body: updatedTodo
            });

            if (status === 'SUCCESS') {
                setGlobalMessage("Todo updated successfully!");
                setTodos(prevTodos =>
                    prevTodos.map(todo =>
                        todo.id === todoId ? { ...todo, ...updatedTodo } : todo
                    )
                );
            } else {
                setGlobalMessage("Failed to update todo.");
            }
        } catch (error) {
            console.error("Error updating todo:", error);
            setGlobalMessage("Error updating todo.");
        }
    }

    async function handleDeleteTodo() {
        try {
            const { status } = await sendRequest({
                method: "DELETE",
                url: `/todos/deleteTodo/${todo.id}`,
                body: {}
            });

            if (status === 'SUCCESS') {
                setGlobalMessage("todo deleted successfully!");
                setTodos(prev => prev.filter(t => t.id !== todo.id));
            } else {
                setGlobalMessage("Failed to delete todo.");
            }
        } catch (error) {
            console.error("Error deleting todo:", error);
            setGlobalMessage("Error deleting todo.");
        }
    }

    return (
        <div className={styles.todoBox}>
            <div>
                <button onClick={handleDeleteTodo}>
                    <img width="30px" height="30px" src="https://cdn-icons-png.flaticon.com/128/5305/5305859.png" alt="Recycle Bin" />
                </button>
                <button onClick={() => setIsEditing(true)}>✎</button>
            </div>

            <div className={styles.todoLabel}>
                {!isEditing && (
                    <input
                        onChange={e => handleUpdateTodo(todo.id, { completed: e.target.checked }, setTodos, setGlobalMessage)}
                        type="checkbox"
                        checked={todo.completed}
                        className={styles.todoCheckbox}
                    />
                )}

                <strong>{todo.id}:</strong>

                {isEditing ? (
                    <Edit
                        setIsEditing={setIsEditing}
                        entity={todo}
                        fieldNames={["title", "completed"]}
                        handleUpdate={(updatedTodo) =>
                            handleUpdateTodo(todo.id, updatedTodo, setTodos, setGlobalMessage)
                        }
                    />
                ) : (
                    <p className={styles.textTodo}>{todo.title}</p>
                )}
            </div>
        </div>
    );
}
