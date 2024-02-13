"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { UUID } from "crypto";
import { BiLoader } from "react-icons/bi";

interface TaskItem {
  [x: string]: any;
  id: UUID;
  title: string;
  completed: boolean;
}

const URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api` || `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}/api`
  : "http://localhost:3000/api";

axios.defaults.withCredentials = true

console.log(URL)
const TaskComponents = () => {
  const [todos, setTodos] = useState<TaskItem[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [todoCompleted, setTodoCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch ToDo items on component mount
  useEffect(() => {
    axios
      .get(`${URL}/items`, { withCredentials : true })
      .then((response) => setTodos(response.data))
      .catch((error) => console.error(error));
  }, []);

  const addTodo = () => {
    axios
      .post<TaskItem>(`${URL}/items`, { title: newTodo })
      .then((response) => {
        console.log(response);
        setTodos([...todos, response.data]);
        setNewTodo("");
      })
      .catch((error) => console.error(error));
  };

  const updateTodo = (id: UUID) => {
    // Update the state to reflect loading for the specific task being updated
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isLoading: true } : todo
      )
    );

    const taskToUpdate = todos.find((todo) => todo.id === id);
    if (!taskToUpdate) {
      console.error("No such task found");
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, isLoading: false } : todo
        )
      );
      return;
    }

    const updateData = {
      ...taskToUpdate,
      completed: !taskToUpdate.completed,
    };

    axios
      .patch<TaskItem>(`${URL}/items/${id}`, updateData)
      .then((response) => {
        setTodos(
          todos.map((todo) =>
            todo.id === id
              ? { ...todo, completed: !todo.completed, isLoading: false }
              : todo
          )
        );
        setTodoCompleted(!setTodoCompleted);
        console.log("Item updated succesfully", response.data);
      })
      .catch((error) => console.error(error));
    // .finally(() => (setIsLoading(false)))
  };
  const deleteTodo = (id: UUID) => {
    axios
      .delete(`${URL}/items/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((error) => console.error(error));
  };

  // delete all todo items
  const deleteAllTodos = () => {
    axios
      .delete(`${URL}/items`)
      .then(() => {
        setTodos([]);
      })
      .catch((error) => console.error(error));
  };
  return (
    <div
      className="space-x-2 w-1/2"
    >
      <h2 className="text-6xl py-12 font-extrabold text-[#24194d] text-opacity-70 tracking-wider">
        Task Genius AI
      </h2>
      <input
        name="task title"
        id="task1"
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        className="bg-white border-2 border-gray-200 rounded w-4/6 py-4 text-gray-700 text-lg leading-tight focus:outline-none focus:bg-white focus:border-purple-500/40"
      />
      <button
        className="bg-[#43766C] hover:ring-1 text-white text-lg font-semibold p-2 rounded"
        onClick={addTodo}
      >
        Add Item
      </button>
      <div className="flex flex-col ">
        <div className=" space-y-4 py-6">
          {todos.sort((a,b) => {
            return a.completed === b.completed ? b.index - a.index : a.completed ? 1 : -1;
          })
          .map((todo) => (
            <div
              key={todo.index}
              className="flex space-x-6 items-center"
            >
              <div
                className={`flex basis-10/12 bg-gradient-to-l from-slate-300/30 to-slate-100/10 border-blue-200/20 text-lg text-[#333333] shadow-md border-2 rounded-md py-6 px-2 ${
                  todo.completed
                    ? "text-green-800 bg-green-400/50 font-light"
                    : "font-normal"
                }`}
              >
                {todo.title}
              </div>

              {!todo.isLoading ? (
                <input
                  type="checkbox"
                  checked={todo.completed}
                  className="accent-[#24194d88] h-5 w-5"
                  onChange={() => updateTodo(todo.id)}
                />
              ) : (
                <BiLoader size={30} />
              )}
              <MdDelete size={30} onClick={() => deleteTodo(todo.id)} />
            </div>
          ))}
        </div>
      </div>
      <button
        className="bg-[#3f7cc2d4] hover:ring-1 text-white text-lg font-semibold p-2 rounded"
        onClick={deleteAllTodos}
      >
        Delete All
      </button>
    </div>
  );
};

export default TaskComponents;
