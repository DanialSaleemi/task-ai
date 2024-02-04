from typing import Optional, Union
from sqlmodel import Field, SQLModel, Column, TIMESTAMP, text, DateTime, func
from datetime import datetime

from uuid import uuid4, UUID

# Base class for tasks
class TaskBase(SQLModel):
    title: str = Field(index=True, unique=True)
    description: Union[str,None] = Field(nullable=True)
    completed: bool = Field(default=False)

class CreateTask(TaskBase):
    pass

class UpdateTask(SQLModel):
    title : Optional[str] = None
    description : Optional[str] = None
    completed : Optional[bool] = None    
    

# Database model for tasks, inherits base class (TaskBase)
class Task(TaskBase, table=True):
    id: Optional[UUID] = Field(default_factory=uuid4, primary_key=True, index=True) 
    # id: Optional[int] = Field(default_factory=int, primary_key=True, index=True)
    created_at: Optional[datetime] = Field(sa_column=Column(DateTime, server_default=func.now()))
    updated_at: Optional[datetime] = Field(sa_column=Column(DateTime, onupdate=func.now()))


