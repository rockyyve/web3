import { createBrowserRouter, Navigate } from "react-router-dom";
import TodoList from "../pages/TodoList";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/todo-list" replace />,
    },
    {
        path: "/todo-list",
        element: <TodoList />,
    },
    {
        path: "*",
        element: <div style={{padding: "20px", textAlign: "center"}}>
            <h2>Page Not Found</h2>
            <p>The page you're looking for doesn't exist.</p>
            <a href="/todo-list">Go to Todo List</a>
        </div>,
    },
]);

export default router;