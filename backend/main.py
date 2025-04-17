# backend/main.py

import uvicorn
import time
import logging
from fastapi import FastAPI
from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError

# Import configuration and routers
from config import settings
from config.settings import get_mysql_connection_url, BASE_DIR
from api.main import api_v1_router
from fastapi.staticfiles import StaticFiles

# Basic logging configuration
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# --- Database Connection Retry Configuration ---
MAX_RETRIES = 15  # Maximum number of retries
RETRY_DELAY = 5  # Delay in seconds between retries

def wait_for_db():
    """
    Function to check and wait until the database is ready.
    """
    db_url = get_mysql_connection_url()
    logger.info(f"Attempting to connect to database at: {settings.MYSQL_HOST}:{settings.MYSQL_PORT}")
    engine = create_engine(db_url)
    retries = MAX_RETRIES
    while retries > 0:
        try:
            # Attempt a simple connection
            with engine.connect() as connection:
                logger.info("Database connection successful!")
                return True  # Connection successful
        except OperationalError as e:
            logger.warning(f"Database connection failed: {e}. Retrying in {RETRY_DELAY} seconds... ({MAX_RETRIES - retries + 1}/{MAX_RETRIES})")
            retries -= 1
            time.sleep(RETRY_DELAY)
        except Exception as e:  # Catch unexpected errors
            logger.error(f"An unexpected error occurred while connecting to DB: {e}. Retrying...")
            retries -= 1
            time.sleep(RETRY_DELAY)

    logger.error("Could not connect to the database after maximum retries.")
    return False  # Unable to connect after multiple retries

# --- Initialize FastAPI App ---
app = FastAPI(
    title="OOP PROJECT",
    description="API description for OOP project.",
    version="1.0.0",
    docs_url="/docs",
)

# mount static files (if any)
app.mount("/media", StaticFiles(directory="media"), name="media")


from fastapi.middleware.cors import CORSMiddleware
origins = [
    "http://localhost:3000",  
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",   
    "http://26.178.178.33:3000",
    "http://26.178.178.33:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,                
    allow_credentials=True,            
    allow_methods=["*"],                
    allow_headers=["*"],         
)


# --- Add Routers ---
app.include_router(api_v1_router) 

# --- Application Entry Point ---
if __name__ == "__main__":
    logger.info("Starting application...")
    # Wait for the database to be ready before starting the server
    if wait_for_db():
        logger.info("Database is ready. Starting Uvicorn server...")
        uvicorn.run(
            "main:app",  # Points to the app object in this file
            host="0.0.0.0",
            port=8000,
            reload=True,  # Auto-reload for development
            log_level="info"
        )
    else:
        logger.critical("Application startup failed: Database connection could not be established.")
        # Optionally, exit the script if the database connection fails
        # exit(1)