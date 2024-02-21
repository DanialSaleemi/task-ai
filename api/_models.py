from typing import Optional, Union, List
from sqlmodel import Field, SQLModel, Column, DateTime, String, func, Relationship
from datetime import datetime
from uuid import uuid4, UUID

from pydantic import EmailStr

# Base class for tasks
class TaskBase(SQLModel):
    title: str = Field(index=True, unique=True)
    description: Union[str,None] = Field(nullable=True, default=None)
    completed: bool = Field(default=False)

    class Config:
        from_attributes = True

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
    user_id : Optional[UUID] = Field(foreign_key="users.id", nullable=False)

    user : Optional["Users"] = Relationship(back_populates="tasks")


class TaskResponse(TaskBase):
    id: UUID
    user_id : UUID



class UserBase(SQLModel):
    id: Optional[UUID] = Field(default_factory=uuid4, primary_key=True, nullable=False) 
    created_at: Optional[datetime] = Field(sa_column=Column(DateTime, server_default=func.now()))
    updated_at: Optional[datetime] = Field(sa_column=Column(DateTime, onupdate=func.now()))


class Users(UserBase, table=True):
    email: str = Field(sa_column=Column(String, index=True, unique=True))
    username : str = Field(index=True, unique=True)
    full_name : str = Field(default=username)
    hashed_password: str = Field(index=True)
    email_verified: bool = Field(default=False)

    tasks : List[Task] = Relationship(back_populates="user")

    class Config:
        from_attributes = True


class User(SQLModel):
    email: Optional[str]
    username: Optional[str]
    full_name: Optional[str]

class RegisterUser(User):
    password: str

class UpdateUser(SQLModel):
    full_name: Optional[str]
    password: Optional[str]


class UserInDB(User):
    id : UUID
    hashed_password: str

class UserOutput(User):
    id : UUID
