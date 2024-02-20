"use client";
import React from "react";
import { useState, useEffect } from "react";
// import axios from "axios";
import { MdDelete } from "react-icons/md";
import { UUID } from "crypto";
import { BiLoader, BiRefresh } from "react-icons/bi";
// import AddTask from "./addtaskform";
import {
  fetchItems,
  // addItem,
  updateItem,
  deleteItem,
  deleteAllItems,
} from "@/utils/crud";
import axios from "axios";

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


const TaskComponents = ( {items} : {items : TaskItem[]}) => {
  const [todos, setTodos] = useState<TaskItem[]>([]);
  const [isLoading, setIsLoading] = useState();
  // Fetch ToDo items on component mount
  // useEffect(() => {
  //   const mountItems = () => {
  //    fetchItems()
  //     .then((response) => {
  //       const sortedList = response.data.sort((a: { created_at: Date; }, b: { created_at: Date; }) => {
  //         const dateA = new Date(a.created_at || 0);
  //         const dateB = new Date(b.created_at || 0);
  //         return dateB.getTime() - dateA.getTime();
  //       });
  //       setTodos(sortedList);
  //     })
  //     .catch((error) => console.error(error))
  //     .finally(() => setIsLoading(false));
  //   }
  //   mountItems();
  //   const intervalID = setInterval(mountItems, 15000);      // poll every 10 seconds to update the list
  //   return () => clearInterval(intervalID);                 // Clear the interval on component unmount
  // }, []);

  /**
   * Add a new item to the todos list.
   *
   * @param {TaskItem} newItem - the new item to be added
   * @return {void} 
   */
  const handleAddItem = async (newItem: TaskItem) => {
    setTodos([...todos, newItem]);
  };

  /**
   * A function to handle the update of items.
   *
   * @param {UUID} id - the unique identifier of the item to be updated
   * @return {void} no return value
   */
  const handleUpdateItems = async (id: UUID) => {
    // update Loading state for the specified task
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, setIsLoading: true } : todo
      )
    );
    // find the task in the list
    // if not found throw an error and change the loading state as well
    const taskToUpdate = todos.find((todo) => todo.id === id);
    if (!taskToUpdate) {
      console.error("No such task found");
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, setIsLoading: false } : todo
        )
      );
      return;
    }

    const updateData: TaskItem = {
      ...taskToUpdate,
      completed: !taskToUpdate.completed,
    };


    // pass updateData and id to Axios request
    await updateItem(id, updateData)
      .then((response) => {
        setTodos(
          todos.map((todo) =>
            todo.id === id
              ? { ...todo, completed: !todo.completed, setIsLoading: false }
              : todo
          )
        );
        console.log("Item updated succesfully", response.data);
      })
      .catch((error) => console.error(error));
  };

  // delete an item
  const handleDeleteItem = async (id: UUID) => {
    await deleteItem(id)
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((error) => console.error(error));
  };

// Function to delete all items
const handleDeleteAllItems = async () => {
  try {
    // Call the deleteAllItems function
    await deleteAllItems();
    // Set the todos state to an empty array
    setTodos([]);
  } catch (error) {
    // Log any errors to the console
    console.error(error);
  }
};

  // const sortedList = todos.sort((a, b) => {
  //   const dateA = new Date(a.created_at || 0);
  //   const dateB = new Date(b.created_at || 0);
  //   return dateB.getTime() - dateA.getTime();
  // });
  // console.log(sortedList);
  return (
    <div className="flex items-center justify-center">

    
    <div className="w-full lg:w-1/2 mt-8 space-x-2">
      <BiRefresh
        title="Refresh list"
        size={30}
        onClick={fetchItems}
        className="absolute right-0 top-0"
      />
      

      {/* <AddTask onAdd={handleAddItem} /> */}

      <div className="flex flex-col ">
        <div className=" space-y-4 py-6">
          {items.map((todo) => (
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
        className="bg-violet-900/60 hover:ring-1 text-white text-lg font-semibold p-2 rounded"
        onClick={handleDeleteAllItems}
        title="Delete all tasks"
      >
        Delete All
      </button>
    </div>
    </div>
  );
};

export default TaskComponents;