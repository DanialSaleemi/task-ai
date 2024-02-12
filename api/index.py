from fastapi import Body, Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.data._db_config import get_db, create_tables, DB_URL
from api._models import *
from api.service._crud import *

from sqlmodel import Session, select

from typing import Annotated



app = FastAPI(
    title='Task Genius',
    description='### An authenticated task management tool with __NextJS14__ Web Frontend App and Multi-User __Custom GPT__ action framework',
    docs_url='/api/docs',
    openapi_url='/api/openapi.json',
    servers=[
                {
                    'url': 'https://task-genius-genai.vercel.app/',
                    'description': 'Production Server'
                },
                {
                    'url' : 'http://localhost:3000',
                    'description' : 'Development Server'
                }
            ],
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


dbDependency = Annotated[Session, Depends(get_db)]

@app.get('/api/health', tags=["Health Check"])
def health_check():
    """
    Endpoint for checking the health of the API server.

    Parameters:
    - None

    Returns:
    - a dictionary with the status and message of the server health check.
    """
    return {'status': 'success', "message" : "Proxy Server Health Check Successful"}


# Route to create a new task item
@app.post("/api/items", status_code=201, response_model=TaskResponse, tags=["Task CRUD"])
async def create_item(task: CreateTask, db: dbDependency):
    """
    Create a new item in the database.

    Parameters:
    - task : CreateTask - an instance of CreateTask
    - db : dbDependency - The database dependency.

    Returns:
    - the result of creating the task

    Raises:
    - HTTPException with status code
    """
    try:
        # Call the create_task_service function with the given database session and task
        return await create_task_service(db, task)
    except Exception as e:
        # If an exception occurs, raise an HTTPException with status code 500 and the exception message
        raise HTTPException(status_code=500, detail=str(e))
    
# Route to get all task items
@app.get("/api/items", response_model=list[TaskResponse], tags=["Task CRUD"])
async def get_all_items(db: dbDependency) -> list[Task]:
    """
    Retrieves all task items from the database.

    dbDependency = Type Annotated Dependency Injection for database session
    
    Parameters:
    - db : dbDependency - The database dependency.
    
    Returns:
    - The result of the get all tasks service
    
    Raises:
    - HTTPException with status code
    """
    try:
        return await get_all_tasks_service(db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# Route to get a specific item by ID
@app.get("/api/items/{item_id}", response_model=TaskResponse, tags=["Task CRUD"])
async def get_item(item_id: UUID, db: dbDependency) -> Task:
    """
    Get an item by its item_id from the database.
    
    Parameters:
    - item_id : UUID - The unique identifier of the task item.
    - db : dbDependency - The database dependency.

    Returns:
    - Task - The retrieved item.

    Raises:
    - HTTPException with status code
    """
    try:
        return await get_single_task_service(db, item_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Route to update an item
@app.patch("/api/items/{item_id}", response_model=TaskResponse, tags=["Task CRUD"])
async def update_item(item_id : str, update_task : UpdateTask, db : dbDependency)-> Task:
    """
    Update an item in the database.

    Parametes:
    - item_id : UUID - The ID of the item to be updated.
    - update_task : UpdateTask - The updated task information.
    - db : dbDependency - The database dependency.

    Returns:
    - Task: The updated task.

    Raises:
    - HTTPException with status code
    
    """
    try:
        return await update_task_service(db, UUID(item_id), update_task)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# Route to delete an item
@app.delete("/api/items/{item_id}", response_model=str, tags=["Task CRUD"])
async def delete_item(item_id: str, db:dbDependency) -> str:
    """
    Delete an item by its title from the database and return a status message.

    Parameters:
    - item_title: str - Title of the item to be deleted.
    - db: dbDependency - The database dependency.

    Returns:
    - str - A success message or the error message.
    """
    try:
        await delete_task_service(db, UUID(item_id))
        return(f"{item_id} deleted succesfully")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/items", tags=["Task CRUD"])
def delete_all_items(db: dbDependency) -> str:
    """
    Delete all items from the database.

    Parameters:
    - db : dbDependency - The database dependency.

    Returns:
    - str: A message indicating that all items have been deleted.
    """
    try:
        rows_deleted : int = delete_all_tasks_service(db)
        return(f"{rows_deleted} items deleted succesfully")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



def main():
    """
    main function that calls create_tables
    """
    create_tables()

if __name__ == '__main__':
    main()