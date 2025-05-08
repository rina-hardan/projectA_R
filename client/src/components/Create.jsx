import styles from '../CSS/Create.module.css'
import useMessage from '../hooks/useMessage';
export default function Create({ handleAdd, title, setTitle, children, isAdding, setIsAdding }) {
    const [message,setMessage]=useMessage("")
    return (
        <div className={styles.addTodoContainer}>
            {!isAdding && <button className={styles.addButton} onClick={() => setIsAdding(true)}>+</button>}
            {isAdding && <button className={styles.addButton} onClick={() => setIsAdding(false)}>-</button>}
            {isAdding && (
                <form className={styles.addTodoForm}>
                    <label>
                        Title:
                        <input
                            placeholder="Title"
                            className={styles.textInput}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                    {children}
                    <p>{message}</p>
                    <button
                        className={styles.saveButton}
                        type="button"
                        onClick={()=>{
                            if (title.trim() === "") {
                                setMessage("Please fill in the title.");
                                return;
                            }                            
                            handleAdd()
                        }}
                    >
                        Save
                    </button>
                </form>
            )}
        </div>
    )
}