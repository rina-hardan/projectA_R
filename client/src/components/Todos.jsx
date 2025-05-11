import { useEffect, useRef, useState, useContext } from "react";
import { CurrentUserContext } from '../App';
import Sort from "./Sort.jsx";
 import Search from "./Search.jsx";
import Create from "./Create.jsx";
import useMessage from "../hooks/useMessage.jsx";
import { SUCCESS, NOT_FOUND, FAILED, sendRequest } from '../DB_API.jsx';
import styles from "../CSS/Todos.module.css";
import Todo from "./Todo";

export default function Todos() {
    const { currentUser } = useContext(CurrentUserContext);
    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useMessage("");
    const [title, setTitle] = useState("");
    const [completed, setCompleted] = useState(false);
    const [sortOption, setSortOption] = useState("id");
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        fetchTodos(`/todos/getAllTodosByUserId/${currentUser.id}`);
    }, []);

    const fetchTodos = async (url) => {
        const { data, status } = await sendRequest({ method: 'GET', url: `${url}` });
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
    };

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

        const { data, status } = await sendRequest({
            method: 'POST',
            url: `/todos/addTodo/${currentUser.id}`,
            body: newTodo
        });

        console.log("Response from adding todo:", data, status);

        if (status === "SUCCESS") {
            setMessage("Todo added successfully!");
            const addedTodo = {
                id: data.id,
                user_id: currentUser.id,
                completed: newTodo.completed,
                title: newTodo.title,
            };
            setTodos(prev => [...prev, addedTodo]);
            setIsAdding(false);
        } else {
            setMessage("Failed to add todo.");
        }
    }

   async function handleSort(option) {
    try {
        const url = `/todos/getAllTodosByUserId/${currentUser.id}?sortBy=${option}`;

        const { data, status } = await sendRequest({
            method: 'GET',
            url
        });

        if (status === "SUCCESS") {
            setMessage("Todos sorted successfully!");
            setTodos(data);
        } else if (status === "NOT_FOUND") {
            setMessage("No todos found for sorting.");
            setTodos([]);
        } else {
            setMessage("Failed to sort todos.");
        }
    } catch (error) {
        console.error("Error sorting todos:", error);
        setMessage("Error occurred while sorting todos.");
    }
}
 async function handleSearchTodos(fullUrl) {
        const { data, status } = await sendRequest({
            method: 'POST',
            url: fullUrl,
            body: {},
        });

        if (status === 'SUCCESS') {
            setMessage("Todos found successfully.");
            setTodos(data);
        } else if (status === 'NOT_FOUND') {
            setMessage("No todos found.");
            setTodos([]);
        } else {
            setMessage("Failed to search todos.");
        }
    }
    return (
        <div className={styles.todosWrapper}>
            <header>
                <h1>Todo List</h1>
            </header>

            <Sort
                handleSort={(option) => handleSort(option)}
            />

            <Search
                        entity={"todos"}
                fetch={(searchUrl) => fetchTodos(searchUrl)}
                searchUrl={`todos/search/${currentUser.id}`}
                fetchUrl={ `/todos/getAllTodosByUserId/${currentUser.id}`}
                handleSearch={(fullUrl)=>handleSearchTodos(fullUrl)}
                fetchEntities={fetchTodos}  
            />

            <Create isAdding={isAdding} setIsAdding={setIsAdding} handleAdd={handleAddTodo} >
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className={styles.textInput}
                />
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
                {todos.map((todo) => (
                    <Todo
                        key={todo.id}
                        todo={todo}
                        setTodos={setTodos}
                        setGlobalMessage={setMessage}
                    />
                ))}
            </ul>
        </div>
    );
}
