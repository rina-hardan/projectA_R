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
    const [completed, setCompleted] = useState(false);
    
    const sortSelectRef = useRef(null);
    const [isAdding, setIsAdding] = useState(false);

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

        if (!title) {
            setMessage("Please fill in the title.");
            return;
        }
        if (completed === undefined) {
            setMessage("Please select if the todo is completed.");
            return;
        }
        const newTodo = {
            title,
            completed
        };
        
        const { data, status } = await sendRequest({ method: 'POST', url: `/todos/addTodo/${currentUser.id}`, body: newTodo });
       console.log("Response from adding todo:", data, status);
        if (status === 'SUCCESS') {
            setMessage("Todo added successfully!");
            setTodos(prev => [...prev, data]);
            setIsAdding(false);
            setTitle(""); // ניקוי השדות אחרי הוספה
            setCompleted(false);
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
                title={title}      
                setTitle={setTitle}
                type="text"
                isAdding={isAdding}
                setIsAdding={setIsAdding}
                handleAdd={handleAddTodo}
            >
                <label className={styles.checkboxLabel}>
                <input
                    type="checkbox"
                    className={styles.checkboxInput}
                    checked={completed}
                    onChange={e => setCompleted(e.target.checked)}
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