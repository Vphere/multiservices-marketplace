# 🚀 Urban Nexus Services

Urban Nexus Services is a **full-stack web application** that connects users with verified service providers for home and lifestyle services such as plumbing, cleaning, beauty services, gym training, yoga, and music classes.

## 📌 Features

### 👤 User Features
- User registration & login (JWT + OTP verification)
- Browse services by category
- Search, filter, and view service providers
- Book services with date & time slot
- Cancel or manage bookings
- Receive email notifications

### 🧑‍🔧 Service Provider Features
- Register as a service provider
- Add, update, or delete services
- Manage availability and time slots
- Accept or reject booking requests
- View bookings and earnings

### 🧑‍💼 Admin Features
- Approve/reject service providers
- Manage users and services
- Monitor bookings
- Manage service categories

---

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- CSS (Custom Styling)
- Axios (API communication)
### Backend
- Spring Boot
- Spring Security
- JWT Authentication
### Database
- MySQL

---

## 🧠 System Architecture

The system follows a **Layered Architecture (MVC Pattern)**:
```bash
Frontend (React)
↓
REST API (Spring Boot Controllers)
↓
Service Layer (Business Logic)
↓
Repository Layer (JPA / Hibernate)
↓
MySQL Database
```
---

## 🔐 Security

- JWT-based authentication
- Role-based access control (User, Provider, Admin)
- Password encryption using BCrypt
- OTP-based email verification

---

## 🔄 Booking Workflow

1. User logs in and selects a service
2. User books a service with preferred time slot
3. Booking request stored in database
4. Service provider receives request
5. Provider accepts/rejects booking
6. User gets notification via email
7. Booking status updated

---
## 📦 Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Vphere/multiservices-marketplace
```

### 2️⃣ Backend Setup (Spring Boot)
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### 3️⃣ Frontend Setup (React)
```bash
cd Front-end
npm install
npm run dev
```

### 4️⃣ Database Setup (MySQL)
- Create a MySQL database  
- Update `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/your_db
spring.datasource.username=root
spring.datasource.password=your_password
```
