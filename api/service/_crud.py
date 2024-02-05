from typing import Awaitable
from fastapi import HTTPException, status
from api.data._db_config import engine
from sqlmodel import Session, select
from sqlalchemy.exc import SQLAlchemyError

from api.models import *
from uuid import UUID

#get all items
def get_all_data(db: Session) -> list[Task]:
    """
Retrieves all data from the specified database session and returns a list of Task objects.

Parameters:
-db : Session -- The database session to retrieve data from.

Returns:
- tasks : list[Task] -- A list of Task objects retrieved from the database session.
"""
    statement = select(Task)
    tasks = db.exec(statement).all()
    return list(tasks)
    
def get_all_tasks_service(db: Session) -> list[Task]:
    """
Service to call get_all_data function and returns a list of Task objects.

    """
    
    try:
        get_tasks : list[Task] = get_all_data(db)
        return [Task.model_validate(task) for task in get_tasks]
    except Exception as e:
        print(f"Error getting all tasks: {e}")
        raise

#get single item
async def get_single_item(db: Session, id: UUID) -> Task:
    """
Retrieves a single item from the specified database session and returns a Task object.

Parameters:
- db : Session -- The database session to retrieve data from.
- id : UUID -- The ID of the item to retrieve.
    
Returns:
- task : Task -- A Task object retrieved from the database session.
"""

    item = db.get(Task, id)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task not found with id: {id}"
        )
    return item

async def get_single_task_service(db: Session, id: UUID) -> Task:
    """
Service to call get_single_item function and returns a Task object.

    """
    try:
        get_task : Task = await get_single_item(db, id)
        return Task.model_validate(get_task)
    except Exception as e:
        print(f"Error getting single task: {e}")
        raise


#create a task
async def create_task(db: Session, task: CreateTask) -> Task:
    """
Creates a new item in the specified database session and returns the created Task object.

Parameters:
- db : Session -- The database session to create the item in.
- task : TaskCreate -- The Task object to create.
    
Returns:
- task: Task -- The created Task object.
"""
    try:
        new_task = Task(**task.model_dump())        
        db.add(new_task)
        db.commit()
        return new_task
    except SQLAlchemyError as e:
        #rollback if error occurs
        db.rollback()
        print(f"Error creating task: {e}")
        raise

#create a task service
async def create_task_service(db: Session, task: CreateTask) -> Task:
    """
Service to call create_task function and returns a Task object.

    """
    try:
        new_task : Task = await create_task(db, task)
        return Task.model_validate(new_task)
    except Exception as e:
        print(f"Error creating task: {e}")
        raise


#update a task
async def update_task_data(db: Session, title : str, task: UpdateTask) -> Task:
    """
Updates an existing item in the specified database session and returns the updated Task object.

Parameters:
- db : Session -- The database session to update the item in.
- id : UUID -- The ID of the item to update.
- task : TaskUpdate -- The updated Task object.
    
Returns:
- Task: The updated Task object.
"""
    try:
        statement = select(Task).where(func.lower(func.trim(Task.title)) == func.lower(func.trim(title)))
        existing_task = db.exec(statement).first()
        if existing_task is None:
            raise HTTPException(status_code=404, detail="Task not found")
        task_data = task.model_dump(exclude_unset=True)
        for key, value in task_data.items():
            if hasattr(existing_task, key):
                setattr(existing_task, key, value)
        db.add(existing_task)
        db.commit()
        db.refresh(existing_task)        

        return existing_task
    
    except SQLAlchemyError as e:
        #rollback if error occurs
        db.rollback()
        print(f"Error updating task: {e}")
        raise


#update a task service
async def update_task_service(db: Session, title : str, task: UpdateTask) -> Task:
    """
Service to call update_task_data function and returns a Task object.
    """
    try:
        return await update_task_data(db, title, task)
    except Exception as e:
        print(f"Error updating task: {e}")
        raise


#delete a task
async def delete_task_data(db: Session, title: str) ->None:
    """
Deletes an item with given id from the specified database session.

Parameters:
- db : Session -- The database session to delete the item from.
- id : UUID -- The ID of the item to delete.

Returns:
- None
"""
    try:
        statement = select(Task).where(func.lower(func.trim(Task.title)) == func.lower(func.trim(title)))
        existing_task = db.exec(statement).first()
        if existing_task is None:
            raise HTTPException(status_code=404, detail="Task not found")
        db.delete(existing_task)
        db.commit()
    except SQLAlchemyError as e:
        #rollback if error occurs
        db.rollback()
        print(f"Error deleting task: {e}")
        raise

#delete a task service
async def delete_task_service(db: Session, title: str) -> None:
    """
Service to call delete_task_data function
        
    """
    try:
        return await delete_task_data(db, title)
    except Exception as e:
        print(f"Error deleting task: {e}")
        raise HTTPException(status_code=500, detail=str(e))

#delete all tasks from the list
def delete_all_tasks_data(db: Session) -> int:
    """
Delete all rows in the specified database session and returns the number of rows deleted.

Parameters:
- db : Session -- The database session to delete all rows from.

Returns: 
- int -- The number of rows deleted.
    """
    try:
        statement = select(Task)
        result = db.exec(statement).all()
        if len(result) > 0:
            for task in result:
                db.delete(task)
            db.commit()
        else:
            raise HTTPException(status_code=404, detail="No data exists")

        return len(result)
    except SQLAlchemyError as e:
        #rollback if error occurs
        db.rollback()
        print(f"Error deleting all tasks: {e}")
        raise

#delete all tasks service
def delete_all_tasks_service(db: Session) -> int:
    """
Service to call delete_all_tasks_data function and returns the number of rows deleted.    
    """
    try:
        result = delete_all_tasks_data(db)
        if result < 1:
            raise HTTPException(status_code=404)
        else:
            return result        
    except Exception as e:
        print(f"Error deleting all tasks: {e}")
        raise