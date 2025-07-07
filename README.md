# Pot Green Nursery Management System with Plant Recognition

A comprehensive nursery management system with plant recognition capabilities, built using React, Node.js, and Flask.

## Project Structure

### Frontend (React + Vite)
- **Components**:
  - User authentication (login/register)
  - Plant catalog and shopping cart
  - Order management
  - Plant recognition interface
  - Admin dashboard
- **Technologies**:
  - React with Vite
  - Tailwind CSS for styling
  - Context API for state management

### Backend (Node.js)
- **Features**:
  - User authentication and authorization
  - Order processing and management
  - Cart management
  - Plant inventory management
  - Admin controls

- **API Endpoints**:
  - Auth:
    - POST `/api/auth/login` - User login
    - GET `/api/auth/logouted` - User logout
  
  - Users:
    - GET `/api/users/me` - Get current user profile
    - GET `/api/users/userslist` - Get all users (admin)
    - DELETE `/api/users/userdelete/:id` - Delete user
    - GET `/api/users/total` - Get total users count
    - PUT `/api/users/:id/role` - Update user role

  - Cart:
    - GET `/api/cart` - Get user's cart
    - POST `/api/cart` - Add item to cart

  - Orders:
    - POST `/api/orders` - Create new order
    - GET `/api/orders/myorders` - Get user's orders
    - GET `/api/orders/:id` - Get order by ID
    - PUT `/api/orders/:id/status` - Update order status

  - Plant Recognition:
    - POST `/api/plant/recognize` - Recognize plant from image

### Flask API (Plant Recognition)
- **Features**:
  - Plant image classification
  - Integration with machine learning model
  - Image processing and prediction

## Setup Instructions

### Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd Backend
npm install
nodemon index
```

### Flask API Setup
```bash
cd flask-api
pip install -r requirements.txt
python app.py
```

## Important Notes
- Ensure all required dependencies are installed
- Configure environment variables properly
- Make sure the machine learning model file is present in the flask-api directory
- Backend server runs on port 5000
- Frontend development server runs on port 3000
- Flask API runs on port 5000

## Features
- Plant recognition using machine learning
- Real-time inventory management
- Order tracking and management
- User authentication and authorization
- Admin dashboard for business analytics
- Shopping cart functionality
- Secure payment processing
- Email notifications