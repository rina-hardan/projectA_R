import styles from '../CSS/Sort.module.css'
import { handleSort } from '../CRUDS.jsx';
export default function Sort({config,sortSelectRef}) {
    return (
        <form className={styles.actionGroup}>
            <label>
                Sort by:
                <select className={styles.selectInput} ref={sortSelectRef}>
                    <option value="id">ID</option>
                    <option value="title">Alphabet</option>
                    <option value="completed">Completed</option>
                    <option value="random">Random</option>
                </select>
            </label>
            <button
                className={styles.actionButton}
                type="button"
                onClick={() => handleSort(config, sortSelectRef)}
            >
                Sort
            </button>
        </form>
    )
}