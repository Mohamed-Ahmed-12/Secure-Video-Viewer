# Step 1: Use a Python base image
FROM python:3.10-slim

# Step 2: Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Step 3: Set the working directory in the container
WORKDIR /app

# Step 4: Install dependencies from requirements.txt
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Step 5: Copy the backend code into the container
COPY . /app/

# Step 6: Expose the Django port (default is 8000)
EXPOSE 8000

# Step 7: Run the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
