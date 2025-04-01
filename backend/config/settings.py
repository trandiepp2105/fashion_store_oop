import os
import urllib.parse

MYSQL_HOST = os.getenv("MYSQL_HOST", "127.0.0.1")
MYSQL_PORT = os.getenv("MYSQL_PORT", "3308")
MYSQL_ROOT_PASSWORD = os.getenv("MYSQL_ROOT_PASSWORD", "Diep2105@")
MYSQL_USER = os.getenv("MYSQL_USER", "root")
MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD", "Diep2105@")    
MYSQL_DATABASE = os.getenv("MYSQL_DATABASE", "fashion_store")

MYSQL_PASSWORD_ENCODED = urllib.parse.quote(MYSQL_PASSWORD)

def get_mysql_connection_url():
    return f"mysql+mysqlconnector://{MYSQL_USER}:{MYSQL_PASSWORD_ENCODED}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DATABASE}"
