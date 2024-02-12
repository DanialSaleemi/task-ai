# from jose import jwt, JWTError
# from passlib.context import CryptContext


# from fastapi.security import OAuth2PasswordBearer
# from fastapi import Security
# from fastapi import HTTPException, status

# from dotenv import load_dotenv, find_dotenv
# import os

# from datetime import datetime, timedelta, timezone
# from typing import Union
# from uuid import UUID


# _ : bool = load_dotenv(find_dotenv())


# SECRET_KEY = os.getenv("SECRET_KEY")
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 30

# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# pwd_context = CryptContext(schemes=["sha256_crypt"], deprecated="auto")


# def verify_password(plain_password, hashed_password):
#     return pwd_context.verify(plain_password, hashed_password)


# def get_password_hash(password):
#     return pwd_context.hash(password)


