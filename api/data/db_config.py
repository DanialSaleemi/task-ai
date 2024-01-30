from sqlmodel import SQLModel, create_engine
from dotenv import load_dotenv, find_dotenv
import os

_ : bool = load_dotenv(find_dotenv())

DB_URL = os.environ.get("DATABASE_URL")
