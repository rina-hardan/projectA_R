import styles from '../CSS/Sort.module.css'
import { useState, useRef } from 'react';
export default function Search({ entity,searchUrl, fetchUrl, handleSearch,fetchEntities  }) {
    const [completedSelected, setCompletedSelected] = useState(false)
    const searchInputsRef = useRef({});
    const isTodos = entity == "todos"
    return (
        <div>
            <form className={styles.actionGroup}>
                <label>
                    Search by:
                    <select
                        className={styles.selectInput}
                        ref={(el) => (searchInputsRef.current.filterBy = el)}
                        onChange={(e) => {
                            if (isTodos) {
                                const value = e.target.value;
                                if (value === "completed") {
                                    setCompletedSelected(true);
                                } else {
                                    setCompletedSelected(false);
                                }
                            }
                        }}
                    >
                        <option value="id">ID</option>
                        <option value="title">Title</option>
                        {isTodos && <option value="completed">Completed</option>}
                    </select>
                </label>
                {
                    isTodos && completedSelected &&
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="completionStatus"
                                value={true}
                                onChange={(e) => (searchInputsRef.current.searchValue = e.target)}
                            />
                            Completed
                        </label>
                        <br />
                        <label>
                            <input
                                type="radio"
                                name="completionStatus"
                                value={false}
                                onChange={(e) => (searchInputsRef.current.searchValue = e.target)}
                            />
                            Not Completed
                        </label>
                    </div>

                }
                {!completedSelected &&
                    <input
                        type="text"
                        className={styles.textInput}
                        placeholder="Search..."
                        ref={el => (searchInputsRef.current.searchValue = el)}
                    />
                }

                <button
                    className={styles.actionButton}
                    type="button"
                    onClick={() => {
                        const filterByValue = searchInputsRef.current.filterBy.value;
                        const searchValue = searchInputsRef.current.searchValue.value;
                        const fullUrl = `/${searchUrl}?filterBy=${filterByValue}&value=${searchValue}`;

                        console.log("Searching with URL:", fullUrl, filterByValue, searchValue);
                        handleSearch(fullUrl);
                    }}
                >
                    Search
                </button>
            </form>
            <button
                className={styles.undoButton}
                type="button"
                onClick={() => fetchEntities(fetchUrl)}
            >
                Undo
            </button>
        </div>
    )
}