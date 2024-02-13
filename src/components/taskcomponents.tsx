"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { UUID } from "crypto";
import { BiLoader, BiRefresh } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";

interface TaskItem {
  [x: string]: any;
  id: UUID;
  title: string;
  completed: boolean;
}

const URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api` ||
    `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}/api`
  : "http://localhost:3000/api";

// axios.defaults.withCredentials = true;

const TaskComponents = () => {
  const [todos, setTodos] = useState<TaskItem[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [todoCompleted, setTodoCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    // Fetch ToDo items on component mount

    axios
      // .get(`${URL}/items`, { withCredentials: true})
      .get(`${URL}/items`)
      .then((response) => setTodos(response.data))
      .catch((error) => console.error(error));
  };

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
    <div className="p-4 w-full lg:w-1/2 mt-8 space-x-2">
      <BiRefresh
        title="Refresh list"
        size={30}
        onClick={fetchTodos}
        className="absolute right-0 top-0"
      />
      <div className="flex items-start justify-around">
        <div>
          <h1 className="text-3xl lg:text-6xl font-extrabold text-[#3e2890] text-opacity-70 tracking-wider">
            Task Genius AI
          </h1>
          <p className="font-extralight text-violet-800">
            Generative Genius: Transform Your Daily activities with AI-Driven
            Action!
          </p>
        </div>
        <Link href={"https://chat.openai.com/g/g-pRFPHnbZb-taskgenius"}>
          <Image
            src="/logo.png"
            alt="logo"
            loading="lazy"
            style={{
              width: "80%",
              height: "auto",
            }}
            width={75}
            height={75}
          />
        </Link>
      </div>
      {/* <input
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
      </button> */}
      <div className="flex flex-col ">
        <div className=" space-y-4 py-6">
          {todos
            .sort((a, b) => {
              return a.completed === b.completed
                ? b.index - a.index
                : a.completed
                ? 1
                : -1;
            })
            .map((todo) => (
              <div key={todo.index} className="flex space-x-6 items-center">
                <div
                  className={`flex basis-10/12 bg-gradient-to-l from-slate-300/30 to-slate-100/10 border-blue-200/20 text-lg text-[#333333] shadow-md border-2 rounded-md py-6 px-2 ${
                    todo.completed
                      ? "text-green-800 bg-green-400/50 line-through font-light"
                      : "font-normal"
                  }`}
                >
                  {todo.title}
                </div>

                {!todo.isLoading ? (
                  <input
                    title="Mark completed/incomplete"
                    type="checkbox"
                    checked={todo.completed}
                    className="accent-[#24194d88] h-5 w-5"
                    onChange={() => updateTodo(todo.id)}
                  />
                ) : (
                  <BiLoader size={30} />
                )}
                <MdDelete title="Remove this task" size={30} onClick={() => deleteTodo(todo.id)} />
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
