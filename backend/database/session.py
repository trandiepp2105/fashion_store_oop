from config.settings import get_mysql_connection_url
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Generate the database connection URL from environment variables
SQLALCHEMY_DATABASE_URL = get_mysql_connection_url()

try:
    # Create the SQLAlchemy engine for connecting to the MySQL database
    engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)

    # Create a session factory bound to the engine
    SessionLocal = sessionmaker(
        autocommit=False,
        autoflush=False,
        bind=engine
    )
except Exception as e:
    # Log and re-raise any exceptions during engine creation
    print(f"Error creating database engine: {e}")
    raise e

def get_db():
    """
    Dependency function to provide a database session.
    This function is typically used in FastAPI dependency injection.

    Yields:
        Session: A database session object.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        # Ensure the session is closed after use
        db.close()
