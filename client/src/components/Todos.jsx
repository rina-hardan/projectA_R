import { useEffect, useRef, useState, useContext } from "react";
import { CurrentUserContext } from '../App';
import Sort from "./Sort.jsx";
import Search from "./Search.jsx";
import Create from "./Create.jsx";
import useMessage from "../hooks/useMessage.jsx";
import { fetchEntities, handleAddEntity } from '../CRUDS.jsx';
import styles from "../CSS/Todos.module.css";
import Todo from "./Todo";

export default function Todos() {
    const { currentUser } = useContext(CurrentUserContext);
    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useMessage("");
    const addTodoRefs = useRef({});
    const sortSelectRef = useRef(null);
    const [isAdding, setIsAdding] = useState(false);
    const config = {
        entity: "todos",
        setEntities: setTodos,
        setMessage,
        currentEntity: currentUser
    };

    useEffect(() => {
        fetchEntities(config, `todos?userId=${currentUser.id}`);
    }, []);

    return (
        <div className={styles.todosWrapper}>
            <header>
                <h1>Todo List</h1>
            </header>
            <Sort config={config} sortSelectRef={sortSelectRef} />
            <Search config={config} searchUrl={`todos?userId=${currentUser.id}&`}
                fetchUrl={`todos?userId=${currentUser.id}`} />
            <Create addRefs={addTodoRefs} isAdding={isAdding} setIsAdding={setIsAdding} handleAdd={() => handleAddEntity(config,setIsAdding,{title: addTodoRefs.current.title.value,completed: addTodoRefs.current.completed.checked},`todos?userId=${currentUser.id}`)}>
                <label className={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        className={styles.checkboxInput}
                        ref={el => (addTodoRefs.current.completed = el)}
                    />
                    <span>Is completed?</span>
                </label>
            </Create>
            <p className={styles.message}>{message}</p>
            <ul className={styles.todosList}>
                {todos.map((todo, index) => (
                    <Todo key={index} todo={todo} config={config} />
                ))}
            </ul>
        </div>
    );
}
