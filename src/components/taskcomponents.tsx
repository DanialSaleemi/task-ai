"use client";
import React from "react";
import { useState, useEffect } from "react";
// import axios from "axios";
import { MdDelete } from "react-icons/md";
import { UUID } from "crypto";
import { BiLoader, BiRefresh } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";
import AddTask from "./addtaskform";
import {
  fetchItems,
  addItem,
  updateItem,
  deleteItem,
  deleteAllItems,
} from "@/utils/crud";

export interface TaskItem {
  [x: string]: any;
  id: UUID;
  title: string;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
}

export const BaseURL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api` ||
    `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}/api`
  : "http://localhost:3000/api";

// axios.defaults.withCredentials = true;

const TaskComponents = () => {
  const [todos, setTodos] = useState<TaskItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // Fetch ToDo items on component mount
  useEffect(() => {
    fetchItems()
      .then((response) => {
        const sortedList = response.data.sort((a: { created_at: Date; }, b: { created_at: Date; }) => {
          const dateA = new Date(a.created_at || 0);
          const dateB = new Date(b.created_at || 0);
          return dateB.getTime() - dateA.getTime();
        });
        setTodos(sortedList);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  const handleAddItem = (newItem: TaskItem) => {
    setTodos([...todos, newItem]);
  };

  const handleUpdateItems = (id: UUID) => {
    // update Loading state for the specified task
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isLoading: true } : todo
      )
    );
    // find the task in the list
    // if not found throw an error and change the loading state as well
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

    const updateData: TaskItem = {
      ...taskToUpdate,
      completed: !taskToUpdate.completed,
    };

    // pass updateData and id to Axios request
    updateItem(id, updateData)
      .then((response) => {
        setTodos(
          todos.map((todo) =>
            todo.id === id
              ? { ...todo, completed: !todo.completed, isLoading: false }
              : todo
          )
        );
        console.log("Item updated succesfully", response.data);
      })
      .catch((error) => console.error(error));
  };

  // delete an item
  const handleDeleteItem = (id: UUID) => {
    deleteItem(id)
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((error) => console.error(error));
  };

  // delete all items
  const handleDeleteAllItems = () => {
    deleteAllItems()
      .then(() => {
        setTodos([]);
      })
      .catch((error) => console.error(error));
  };

  const sortedList = todos.sort((a, b) => {
    const dateA = new Date(a.created_at || 0);
    const dateB = new Date(b.created_at || 0);
    return dateB.getTime() - dateA.getTime();
  });
  console.log(sortedList);
  return (
    <div className="p-4 w-full lg:w-1/2 mt-8 space-x-2">
      <BiRefresh
        title="Refresh list"
        size={30}
        onClick={fetchItems}
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
        <Link
          href={"https://chat.openai.com/g/g-pRFPHnbZb-taskgenius"}
          target="_blank"
          title="Open custom ChatGPT interface for Task Genius"
        >
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

      <AddTask onAdd={handleAddItem} />

      <div className="flex flex-col ">
        <div className=" space-y-4 py-6">
          {/* {todos
            .sort((a, b) => {

              // Convert created_at strings to Date objects, handling undefined or null values
              const dateA = a.created_at ? new Date(a.created_at) : new Date(0);
              const dateB = b.created_at ? new Date(b.created_at) : new Date(0);
               
              // Compare the timestamps
                return dateB.getTime() - dateA.getTime() || (a.completed === b.completed
                ? 0
                : a.completed
                ? 1
                : -1  )
}); */}

          {sortedList.map((todo) => (
            <div key={todo.id} className="flex space-x-6 items-center">
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
                  onChange={() => handleUpdateItems(todo.id)}
                />
              ) : (
                <BiLoader size={30} />
              )}
              <MdDelete
                title="Remove this task"
                size={30}
                onClick={() => handleDeleteItem(todo.id)}
              />
            </div>
          ))}
        </div>
      </div>
      {isLoading && (
        <p className="text-xl font-bold text-center w-full text-indigo-700 animate-pulse my-8">
          Loading...
        </p>
      )}
      <button
        className="bg-[#3f7cc2d4] hover:ring-1 text-white text-lg font-semibold p-2 rounded"
        onClick={handleDeleteAllItems}
      >
        Delete All
      </button>
    </div>
  );
};

export default TaskComponents;
