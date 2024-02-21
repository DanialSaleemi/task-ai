from typing import Union, List

from sqlmodel import Session, select
from sqlalchemy.exc import SQLAlchemyError

from api._models import Users, User, RegisterUser, UpdateUser


class InvalidUserException(Exception):
    def __init__(self, status_code :  int, detail : str):
        self.status_code = status_code
        self.detail = detail
        super().__init__(detail)


async def get_user(db: Session, username: Union[str, None] = None) -> Users:
    if username is None:
        raise InvalidUserException(status_code=404, detail="Username not provided")
        

    statement = select(Users).where(Users.username == username)
    user = db.exec(statement).first()
    
    if user is not None:
        print("user : ", user)
        return user
    else: raise InvalidUserException(status_code=404, detail="User not found")



async def db_get_all_users(db: Session) -> list[User]:        
    """
    Async function to get all users from the database.

    Params:
    - db (Session): The database session.

    Returns:
    - list[User]: A list of User objects.

    Raises:
    - InvalidUserException: If no users are found in the database.

    """

    statement = select(Users)
    user = db.exec(statement)
    
    if user is not None:
        all_users : list[User] = [User.model_validate(user) for user in user]
        return all_users
    
    else: raise InvalidUserException(status_code=404, detail="No users found")

async def service_get_all_users(db: Session) -> list[User]:
    try:
        get_users : list[User] = await db_get_all_users(db)
        return get_users
    except Exception as e:
        raise e

def db_signup_user(db: Session, user: RegisterUser) -> Users:
    try:
        statement = select(Users).where((Users.username == user.username) | (Users.email == user.email))
        existing_user = db.exec(statement).first()
        if existing_user:
            raise InvalidUserException(status_code=400, detail="Email or username already exists")
        
        # Hash the password
        # hashed_password = get_hashed_password(user.password)

        # Create a new user
        new_user = Users(
            username = user.username,
            email=user.email,
            full_name=user.full_name,
            hashed_password=user.password,
                    )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        # Return the new user
        return new_user
    except SQLAlchemyError as e:
        #rollback if error occurs
        db.rollback()
        print(f"Error signing up user: {e}")
        raise InvalidUserException(status_code=500, detail=str(e))
    
def service_signup_user(db : Session, user : RegisterUser) -> Users:
    try:
        return db_signup_user(db, user)
    except InvalidUserException as e:
        raise e
    except Exception as e:
        raise InvalidUserException(status_code=500, detail=str(e))
    




async def db_update_user(db: Session, username : str, user : UpdateUser) -> User:
    statement = select(Users).where(Users.username == username)
    existing_user = db.exec(statement).first()
    if existing_user is None:
        raise InvalidUserException(status_code=404, detail="User not found")
    
    user.full_name = user.full_name if user.full_name is not None else existing_user.full_name
    existing_user.full_name = user.full_name
    if user.password is not None:
        # Hash the password
        hashed_password = get_hashed_password(user.password)
        existing_user.hashed_password = hashed_password
    db.add(existing_user)
    db.commit()
    db.refresh(existing_user)
    updated_user = User.model_validate(existing_user)
    return updated_user

async def service_update_user(db : Session, username : str, user : UpdateUser) -> User:
    try:
        return await db_update_user(db, username, user)
    except SQLAlchemyError as e:
        #rollback if error occurs
        db.rollback()
        print(f"Error updating user: {e}")
        raise InvalidUserException(status_code=500, detail=str(e))