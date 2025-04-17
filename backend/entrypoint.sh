#!/bin/sh
echo "Waiting for MySQL to be ready..."

# Kiểm tra trạng thái của MySQL, thử lại nếu thất bại
until mysqladmin ping -h "$MYSQL_HOST" -P "$MYSQL_PORT" -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" --silent; do
  echo "MySQL at $MYSQL_HOST:$MYSQL_PORT is unavailable - waiting..."
  sleep 5
done

# Sửa: Thêm $MYSQL_PORT vào thông báo thành công
echo "MySQL at $MYSQL_HOST:$MYSQL_PORT is ready."

# # Keep the container running
# tail -f /dev/null

# run fastapi app
python main.py
