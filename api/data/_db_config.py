from sqlmodel import SQLModel, create_engine, Session
from dotenv import load_dotenv, find_dotenv
from sqlalchemy.exc import OperationalError, SQLAlchemyError

from api._models import Task

import os
import time

_ : bool = load_dotenv(find_dotenv())

DB_URL = os.environ.get("DATABASE_URL")

if DB_URL is None:
    raise Exception("DB_URL not found")

#enable connection pooling
engine = create_engine(DB_URL, pool_pre_ping=True, echo=True)

def create_tables():
    SQLModel.metadata.create_all(engine)


SessionLocal = Session(bind=engine, autocommit=False, autoflush=False)

def get_db()->Session:
    attempts : int = 0
    max_attempts : int = 5
    retry_delay : int = 2
    while attempts < max_attempts:
        db : Session = SessionLocal
        try:
            yield db
            break   #if successful, break the loop
        except OperationalError as e:
            print(f"SSL connection error occurred: {e}, retrying...")
            attempts += 1
            time.sleep(retry_delay)
        except SQLAlchemyError as e:
            print(f"Database error: {e}")
            break
        finally:
            db.close()

        if attempts == max_attempts:
            print("Maximum number of connection attempts reached. Exiting...")
            break