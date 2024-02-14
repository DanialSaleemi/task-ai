"use client";
import React, { useState } from "react";
import { addItem } from "@/utils/crud";
import { TaskItem } from "./taskcomponents";
import { stringify } from "querystring";



interface AddTaskProps {
  onAdd: (newTask: TaskItem) => void; // Define the type for the onAdd prop
}
const AddTask = ( { onAdd } : AddTaskProps ) => {
  const [newTodo, setNewTodo] = useState("");


  const handleAddItem = () => {

    addItem(newTodo)         // use the addItem function from crud
      .then((response) => {
        onAdd(response.data); // call the onAdd callback with the new task
        setNewTodo(""); // Clear the input field
      })
      .catch((error) => console.error(error));
  };


  return (
    <div className="space-x-2 md:space-x-4 py-10">
      <input
        name="item-title-name"
        aria-label="item-title-label"
        id="taskid"
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        className="bg-white border-2 border-gray-200 rounded w-4/6 py-4 text-gray-700 text-lg leading-tight focus:outline-none focus:bg-white focus:border-purple-500/40"
      />
      <button
        className="bg-[#43766C] hover:ring-1 text-white text-lg font-semibold p-2 rounded"
        onClick={handleAddItem}
      >
        Add Item
      </button>
    </div>
  );
};

export default AddTask;
