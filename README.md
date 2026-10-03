# 🚀 Urban Nexus Services

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.0.1-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB)
![Vite](https://img.shields.io/badge/Vite-5.4.21-646CFF)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1)
![Redis](https://img.shields.io/badge/Redis-Cache-DC382D)
![RabbitMQ](https://img.shields.io/badge/RabbitMQ-Messaging-FF6600)
![Docker](https://img.shields.io/badge/Docker-Containerization-2496ED)
![Project](https://img.shields.io/badge/Project-Academic-purple)

A full-stack service marketplace that connects users with service providers across **Home Services, Beauty & Wellness, Fitness, and Arts & Recreation**.

The platform allows users to discover service providers, search and filter services, check availability, book appointments, manage bookings, and generate booking invoices. Service providers can manage their services and availability, while administrators can review and approve or reject provider applications.

---

## ✨ Features

### User

- Registration and email OTP verification
- JWT-based authentication
- Forgot-password and password reset using OTP
- Browse services by category
- Search and filter service providers
- Profession and city-based filtering
- View provider details, services, experience, pricing, and location
- Book available dates and time slots
- Pincode-based city/state auto-fill
- Manage saved address details
- View active, cancelled, and completed bookings
- Cancel bookings with a reason
- GST-based booking invoice
- Generate and download invoice as PDF

### Service Provider

- Service provider registration and onboarding
- Admin approval workflow
- Category and profession selection
- Dynamic service list management
- Profile and document image upload
- Pincode-based location
- Home-service and reach-workplace options
- Create and manage available time slots
- View and manage bookings
- Mark bookings as completed
- Cancel bookings with customer notification
- Remove available time slots

### Admin

- View pending service provider applications
- View provider profile and submitted documents
- Approve service providers
- Reject applications with a reason
- Manage provider enable/disable status

---

## 🛠️ Tech Stack

### Frontend
- React 18.2
- Vite 5.4.21
- JavaScript
- React Router 6.20
- Tailwind CSS 3.4
- Axios
- jsPDF

### Backend
- Java 17
- Spring Boot 4.0.1
- Spring Security
- JWT (JJWT 0.11.5)
- Spring Data JPA / Hibernate
- Spring Mail

### Database & Infrastructure
- MySQL
- Redis
- RabbitMQ
- Docker

---

## 🏗️ Architecture

The application follows a layered architecture with a React frontend and Spring Boot REST API.

```text
  React (Vite)
      │
      ▼
  Axios API Layer
      │
      │ JWT Bearer Token
      ▼
Spring Boot REST API
      │
      ▼
Spring Security + JWT
      │
      ▼
  Controller
      │
      ▼
  Service
      │
      ▼
  Repository
      │
      ▼
    MySQL
```

### Asynchronous Email

```text
Application Service
        │
        ▼
   MailProducer
        │
        ▼
    RabbitMQ
        │
        ▼
   MailConsumer
        │
        ▼
   EmailService
        │
        ▼
   SMTP / Gmail
```

---

## 🔐 Authentication & Security

- Stateless JWT authentication
- Spring Security
- Role-based access control
- BCrypt password hashing
- Email OTP verification
- OTP-based password reset
- Protected REST APIs
- Bearer token authentication
- Configurable CORS

---

### Redis Caching

```text
AuthenticationService
        │
        ▼
   RedisService
        │
        ▼
      Redis
```

---

### Roles

| Role | Responsibility |
|---|---|
| `ROLE_USER` | Browse services, book appointments, and manage bookings |
| `ROLE_SERVICE` | Manage provider profile, services, availability, and bookings |
| `ROLE_ADMIN` | Review and manage provider applications |

---

## 📅 Booking Workflow

```text
Browse Services
      ↓
Select Provider
      ↓
Check Available Dates
      ↓
Select Time Slot
      ↓
Enter / Select Address
      ↓
Review Invoice
      ↓
Confirm Booking
      ↓
Booking Saved
      ↓
Download PDF Invoice
```

Already-booked time slots are excluded from selection to help prevent users from selecting unavailable slots.

---

## 🧾 Invoice Generation

The frontend generates booking invoices using **jsPDF**.

The invoice includes:

- Booking information
- Provider information
- Date and time
- GST calculation
- Total amount
- Project branding

Users can download the generated invoice as a PDF.

---

## 📧 Email & Messaging

RabbitMQ is used for asynchronous email processing.

```text
MailProducer
     ↓
RabbitMQ Queue
     ↓
MailConsumer
     ↓
EmailService
     ↓
    SMTP
```

This architecture is used for operations such as password-reset OTP processing and relevant email notifications.

---

## 🔎 Service Discovery

Users can discover service providers through:

- Service categories
- Keyword search
- Search autocomplete
- Profession filtering
- City filtering

### Categories

- Home Services
- Beauty & Wellness
- Fitness
- Arts & Recreation

---

## 📍 Location & Address

The application supports address management and pincode-based location lookup.

The `postalpincode.in` API is used to automatically retrieve city and state information from a pincode.

This is used during relevant booking and service-provider onboarding flows.

---

## 🗄️ Database

The application uses **MySQL with Spring Data JPA and Hibernate**.

### Main Entities

```text
User
 │
 ├── Roles
 │
 └── UserBookings
          │
          ▼
   ServiceProvider
          │
          ▼
    ProviderSlot
```

### Main Tables

- `user`
- `role`
- `role_user`
- `service_provider`
- `provider_slot`
- `user_booking`

---

## 📁 Project Structure

```text
Urban-Nexus-Services/
│
├── Backend/
│   ├── src/main/java/
│   │   └── com/urbannexus/backend/
│   │       ├── config/
│   │       ├── controller/
│   │       ├── dto/
│   │       ├── messaging/
│   │       ├── model/
│   │       ├── repository/
│   │       ├── responses/
│   │       └── service/
│   │
│   ├── src/main/resources/
│   ├── Dockerfile
│   ├── docker-compose.yaml
│   └── pom.xml
│
└── Front-end/
    ├── src/
    │   ├── auth/
    │   ├── admin/
    │   ├── ServiceProvider/
    │   ├── booking/
    │   ├── order/
    │   ├── pages/
    │   ├── components/
    │   ├── errorpages/
    │   └── utils/
    │
    ├── package.json
    └── vite.config.js
```

---

## 🚀 Setup

### Prerequisites

- Java 17+
- Node.js 18+
- MySQL
- Redis
- Docker

### Clone Repository

```bash
git clone https://github.com/Vphere/multiservices-marketplace.git

cd multiservices-marketplace
```

### Backend

```bash
cd Backend

docker compose up -d

./mvnw spring-boot:run
```

Backend:

```text
http://localhost:8080
```

### Frontend

```bash
cd Front-end

npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## ⚙️ Configuration

Configure the backend with the required MySQL, JWT, email, Redis, RabbitMQ, and CORS settings.

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/your_database
spring.datasource.username=your_username
spring.datasource.password=your_password

JWT_SECRET_KEY=your_secret_key
JWT_EXPIRATION_TIME=3600000

MAIL_USERNAME=your_email
MAIL_PASSWORD=your_app_password

REDIS_HOST=localhost
REDIS_PORT=6379

RABBITMQ_HOST=localhost
RABBITMQ_PORT=5672

FRONTEND_URL=http://localhost:5173
```

---

## 📈 Planned Improvements

- Integrate secure online payment processing.
- Implement refresh-token rotation for improved authentication security.
- Add automated unit and integration testing for critical backend APIs and booking workflows.
- Add API documentation using OpenAPI/Swagger.
- Add CI/CD pipeline for automated build, testing, and deployment.
