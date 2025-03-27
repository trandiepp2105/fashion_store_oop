#!/bin/sh
echo "Waiting for MySQL to be ready..."

# Kiểm tra trạng thái của MySQL, thử lại nếu thất bại
until mysqladmin ping -h "viperphone_mysql" --silent; do
  echo "MySQL is unavailable - waiting..."
  sleep 5
done

echo "MySQL is ready!"

# Keep the container running
tail -f /dev/null
