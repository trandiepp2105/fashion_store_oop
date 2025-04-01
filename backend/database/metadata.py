from database.session import engine
from sqlalchemy import MetaData
database_metadata = MetaData()
database_metadata.reflect(bind=engine, extend_existing=True)