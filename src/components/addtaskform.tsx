"use client";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { BaseURL, TaskItem } from "./taskcomponents";

const AddTask = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState<TaskItem[]>([]);

  const addTodo = () => {
    axios
      .post<TaskItem>(`${BaseURL}/items`, { title: newTodo })
      .then((response) => {
        console.log(response);
        setTodos([...todos, response.data]);
        setNewTodo("");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="space-x-2 md:space-x-4 py-10">
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
    </div>
  );
};

export default AddTask;
