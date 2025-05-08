// Create.jsx
import styles from '../CSS/Create.module.css';
import useMessage from '../hooks/useMessage';

export default function Create({ handleAdd, children, isAdding, setIsAdding }) {
    const [message, setMessage] = useMessage("");

    return (
        <div className={styles.addTodoContainer}>
            {!isAdding && (
                <button className={styles.addButton} onClick={() => setIsAdding(true)}>+</button>
            )}
            {isAdding && (
                <>
                    <button className={styles.addButton} onClick={() => setIsAdding(false)}>-</button>
                    <form className={styles.addTodoForm} onSubmit={(e) => e.preventDefault()}>
                        {children}
                        <p>{message}</p>
                        <button
                            className={styles.saveButton}
                            type="button"
                            onClick={() => {
                                handleAdd(setMessage);
                            }}
                        >
                            Save
                        </button>
                    </form>
                </>
            )}
        </div>
    );
}
