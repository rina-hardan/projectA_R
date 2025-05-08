import { useEffect, useRef, useState, useContext } from "react";
import { CurrentUserContext } from '../App';
import Sort from "./Sort.jsx";
// import Search from "./Search.jsx";
import Create from "./Create.jsx";
import useMessage from "../hooks/useMessage.jsx";
import { getById, addEntity, SUCCESS, NOT_FOUND, FAILED, sendRequest } from '../DB_API.jsx';
import styles from "../CSS/Todos.module.css";
import Todo from "./Todo";

export default function Todos() {
    const { currentUser } = useContext(CurrentUserContext);
    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useMessage("");
    const [title, setTitle] = useState("");
    const addTodoRefs = useRef({});
    const [completed, setCompleted] = useState(false);
    
    const sortSelectRef = useRef(null);
    const [isAdding, setIsAdding] = useState(false);

    
    // async function fetchTodos() {
    //     const { data, status } = await sendRequest(todos/getAllTodosByUserId/${currentUser.id});
    //     if (status === FAILED) {
    //         setMessage("Failed getting todos.");
    //         return;
    //     }
    //     if (status === NOT_FOUND || !data || data.length === 0) {
    //         setMessage("No todos. Click + to add.");
    //         setTodos([]);
    //         return;
    //     }
    //     setTodos(data);
    // }

    useEffect(() => {
        fetchTodos(`todos/getAllTodosByUserId/${currentUser.id}`);
    }, []);

    const fetchTodos = async (url) => {
        const { data, status } = await sendRequest({ method: 'GET', url: `/${url}` });
        if (status === 'FAILED') {
            setMessage("Failed getting todos.");
            setTodos([]);
            return;
        }
        if (!data || (Array.isArray(data) && data.length === 0)) {
            setMessage("No todos. Click + to add.");
            setTodos([]);
            return;
        }
        setMessage("");
        setTodos(data);
    }

    async function handleAddTodo() {
        const newTodo = {
            title: addTodoRefs.current.title.value,
            completed: addTodoRefs.current.completed.checked,
            userId: currentUser.id
        };
        const { data, status } = await addEntity("todos", newTodo);
        if (status === SUCCESS) {
            setMessage("Todo added successfully!");
            setTodos(prev => [...prev, data]);
            setIsAdding(false);
        } else {
            setMessage("Failed to add todo.");
        }
    }

    return (
        <div className={styles.todosWrapper}>
            <header>
                <h1>Todo List</h1>
            </header>

            <Sort
                config={{
                    entity: "todos",
                    setEntities: setTodos,
                    setMessage,
                    currentEntity: currentUser
                }}
                sortSelectRef={sortSelectRef}
            />

            {/* <Search
                config={{
                    entity: "todos",
                    setEntities: setTodos,
                    setMessage,
                }}
                searchUrl={todos/getAllTodosByUserId/${currentUser.id}}
                fetchUrl={todos/getAllTodosByUserId/${currentUser.id}}
            /> */}

            <Create
                addRefs={addTodoRefs}
                isAdding={isAdding}
                setIsAdding={setIsAdding}
                handleAdd={handleAddTodo}
            >
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
                    <Todo key={index} todo={todo} config={{
                        entity: "todos",
                        setEntities: setTodos,
                        setMessage
                    }} />
                ))}
            </ul>
        </div>
    );
}