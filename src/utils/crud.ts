import axios from 'axios';
import { BaseURL, TaskItem } from '@/components/taskcomponents';
import { UUID } from 'crypto';


export const fetchItems = async () => axios.get(`${BaseURL}/items`)
export const addItem = async (newTodo : string) => axios.post(`${BaseURL}/items`, { title : newTodo })
export const updateItem = async (id : UUID, updatedTodo : TaskItem) => axios.patch(`${BaseURL}/items/${id}`, updatedTodo)
export const deleteItem = async (id : UUID) => axios.delete(`${BaseURL}/items/${id}`)
export const deleteAllItems = async () => axios.delete(`${BaseURL}/items`)