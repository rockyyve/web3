import { useState, useEffect } from "react";
import "./TodoList.css";

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const handleAddTodo = () => {
        if (inputValue.trim()) {
            setTodos([...todos, { text: inputValue.trim(), completed: false }]);
            localStorage.setItem("todos", JSON.stringify([...todos, { text: inputValue.trim(), completed: false }]));
            setInputValue("");
        }
    }

    useEffect(() => {
        const storedTodos = localStorage.getItem("todos");
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, []);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddTodo();
        }
    }

    const handleDeleteTodo = (indexToDelete) => {
        setTodos(todos.filter((_, index) => index !== indexToDelete));
    }

    const handleToggleTodo = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].completed = !updatedTodos[index].completed;
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }

    return (
        <div className="todo-container">
            <div className="todo-card">
                <h1 className="todo-title">TodoList</h1>
                <div className="input-container">
                    <input 
                        type="text" 
                        className="todo-input"
                        value={inputValue} 
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="What needs to be done?"
                    />
                    {inputValue.trim() !== "" && (
                        <button className="add-btn" onClick={handleAddTodo}>Add</button>
                    )}
                </div>
                {todos.length > 0 && (
                    <ul className="todo-list">
                        {todos.map((todo, index) => (
                            <li key={index} className="todo-item">
                                <input type="checkbox" className="todo-checkbox" checked={todos[index].completed} onChange={() => handleToggleTodo(index)} />
                                <span className={`todo-text ${todo.completed ? "completed" : ""}`}>{todo.text}</span>
                                <button 
                                    className="delete-btn"
                                    onClick={() => handleDeleteTodo(index)}
                                >
                                    ×
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default TodoList;