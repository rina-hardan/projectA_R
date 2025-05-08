import styles from '../CSS/Create.module.css'
import useMessage from '../hooks/useMessage';
export default function Create({ handleAdd, addRefs, children, isAdding, setIsAdding }) {
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
                            type="textarea"
                            className={styles.textInput}
                            ref={el => (addRefs.current.title = el)}
                        />
                    </label>
                    {children}
                    <p>{message}</p>
                    <button
                        className={styles.saveButton}
                        type="button"
                        onClick={()=>{
                            if (Object.values(addRefs.current).some(input => input.value == "")) {
                                setMessage("Please fiil all the details");
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