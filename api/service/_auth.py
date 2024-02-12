from typing import Union, List

from sqlmodel import Session, select
from sqlalchemy import SQLAlchemyError

from api._models import Users, User, RegisterUser


class InvalidUserException(Exception):
    def __init__(self, status_code :  int, detail : str):
        self.status_code = status_code
        self.detail = detail
        super().__init__(detail)


def get_user(db: Session, username: Union[str, None] = None) -> Users:
    if username is None:
        raise InvalidUserException(status_code=404, detail="Username not provided")
        
    statement = select(Users).where(Users.username == username)
    user = db.exec(statement).first()

    if user is None:
        raise InvalidUserException(status_code=404, detail="User not found")

    print("user : ", user)
    return user


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
            # hashed_password=user.hashed_password,
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