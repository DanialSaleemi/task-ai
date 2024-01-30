from typing import Optional, Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel

from sqlmodel import Field, SQLModel, create_engine

app = FastAPI(
    title='Task Genius',
    description='An authenticated task management tool with NextJS14 Web App and Multi-User Custom GPT action framework',
    docs_url='/api/docs',
    openapi_url='/api/openapi.json'
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TodoCreate(SQLModel):
    title: str


class TodoUpdate(SQLModel):
    title: Union[str, None] = None
    completed: Union[bool, None] = None


class TodoItem(SQLModel):
    id: int
    title: str
    completed: bool
todos :list[TodoItem] = []

@app.get('/api/health')
def health_check():
    return {'status': 'success', "message" : "Proxy Server Health Check Successful"}


# Route to create a new todo item
@app.post("/api/todos")
def create_todo_item(todo: TodoCreate):
    new_todo = TodoItem(id=len(todos) + 1, title=todo.title, completed=False)
    todos.append(new_todo)
    return new_todo

# Route to get all todo items
@app.get("/api/todos")
def get_all_todo_items():
    return todos

# Route to get a specific todo item by ID
@app.get("/api/todos/{todo_id}")
def get_todo_item(todo_id: int):
    for todo in todos:
        if todo.id == todo_id:
            return todo
    return {"error": "Todo item not found"}

# Route to update a specific todo item by ID
@app.patch("/api/todos/{todo_id}")
def update_todo_item(todo_id: int, todo: TodoUpdate):
    for todo_item in todos:
        if todo_item.id == todo_id:
            todo_item.title = todo.title if todo.title is not None else todo_item.title
            todo_item.completed = todo.completed if todo.completed is not None else todo_item.completed
            return todo_item
    return {"error": "Todo item not found"}

# Route to delete a specific todo item by ID
@app.delete("/api/todos/{todo_id}")
def delete_todo_item(todo_id: int):
    for i, todo_item in enumerate(todos):
        if todo_item.id == todo_id:
            del todos[i]
            return {"message": "Todo item deleted"}
    return {"error": "Todo item not found"}
