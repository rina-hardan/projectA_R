import styles from '../CSS/Sort.module.css';
import { useState } from 'react';

export default function Sort({ handleSort }) {
    const [selectedOption, setSelectedOption] = useState("id");

    return (
        <form className={styles.actionGroup}>
            <label>
                Sort by:
                <select
                    className={styles.selectInput}
                    value={selectedOption}
                    onChange={e => setSelectedOption(e.target.value)}
                >
                    <option value="id">ID</option>
                    <option value="title">Alphabet</option>
                    <option value="completed">Completed</option>
                </select>
            </label>
            <button
                className={styles.actionButton}
                type="button"
               onClick={() => handleSort(selectedOption)}
            >
                Sort
            </button>
        </form>
    );
}