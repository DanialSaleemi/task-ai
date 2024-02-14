import axios from 'axios';
import { BaseURL, TaskItem } from '@/components/taskcomponents';
import { UUID } from 'crypto';


export const fetchItems = () => axios.get(`${BaseURL}/items`)
export const addItem = (newTodo : string) => axios.post(`${BaseURL}/items`, { title : newTodo })
export const updateItem = (id : UUID, updatedTodo : TaskItem) => axios.patch(`${BaseURL}/items/${id}`, updatedTodo)
export const deleteItem = (id : UUID) => axios.delete(`${BaseURL}/items/${id}`)
export const deleteAllItems = () => axios.delete(`${BaseURL}/items`)