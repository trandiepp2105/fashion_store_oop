FROM python:3.11

# Set work directory
WORKDIR /backend
ENV PYTHONPATH=/backend

COPY requirements.txt /backend/
RUN apt update && apt install -y default-mysql-client
RUN python -m pip install --upgrade pip
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Run entrypoint.sh
COPY ./entrypoint.sh /backend/entrypoint.sh
RUN chmod +x /backend/entrypoint.sh
RUN sed -i 's/\r$//' /backend/entrypoint.sh
ENTRYPOINT ["/backend/entrypoint.sh"]