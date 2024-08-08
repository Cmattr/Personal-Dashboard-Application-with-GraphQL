import React from "react";
import { useQuery } from "@apollo/client";
import { GET_TODO } from "../Queries/Queries";
import NavBar from "./NavBar";

interface ToDosProps {
  todoId: string;
}

const ToDos: React.FC<ToDosProps> = ({ todoId }) => {
    const { data, loading, error } = useQuery(GET_TODO, {
        variables: { todoId },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <NavBar />
            {data && data.todo && (
                <div className="todo-details">
                    <h2>Todo Details:</h2>
                    <p>ID: {data.todo.id}</p>
                    <p>Title: {data.todo.title}</p>
                    <p>Completed: {data.todo.completed ? "Yes" : "No"}</p>
                </div>
            )}
        </div>
    );
};

export default ToDos;