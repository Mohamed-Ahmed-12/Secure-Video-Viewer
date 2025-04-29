# Secure-Video-Viewer
A simple web application that allows users to register, log in, and view a specific video stream securely . Build Using Reactjs and Django

---

## 📚 Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technology](#technology)
- [Demo](#demo)

---

## ✨ Features

- User Authentication 
    - Registration Page 
    - Login Page 
    - JWT tokens Management
- Protected Video Page
- Backend API endpoints to support the authentication flow
    - User Registration: Register new users with email/username and password.

    - User Login: Login with a username/email and password to obtain a JWT token.

    - Token Verification: Verify the validity of the JWT token.

    - User Info: Access user info with the token from the /me endpoint.

---

## 🚀 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Mohamed-Ahmed-12/Secure-Video-Viewer.git
2. Setup Frontend
    ```bash
    cd Secure-Video-Viewer
    cd frontend/vedio-viewer
    npm i
    npm run dev
3. Setup Backend
    ```bash
    cd Secure-Video-Viewer
    docker-compose up --build
4. create superuser 
    ```bash
    docker exec -it <dj container name> python manage.py createsuperuser
 ---   
 
## 🚀 Usage

1. Run Frontend:
   - open in browser http://localhost:5173/login
2. Run Backend:
   - open in browser http://localhost:8000/admin 
---

## 🚀 Technology

1. Frontend
- reactjs 19
- chakra-ui/react
- react-dom
- axios
- react-hook-form
2. Backend
- Django 4.2.20
- django-cors-headers
- djangorestframework
- djangorestframework-simplejwt
---

## 🚀 Demo
