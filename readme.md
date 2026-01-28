# 🛡️ Auth Service — Multi-Tenant Identity & Access Management (IAM)

A **Spring Boot–based Authentication & Authorization Service** built for **microservices architecture**, supporting:

* Multi-tenancy
* JWT-based stateless authentication
* Role / Function-based authorization
* Tenant-level and System-level administration

This service acts as a **central IAM provider** for other microservices.

---

## 🚀 Features

### 🔐 Authentication

* Email + Password login
* JWT token generation
* Stateless security (no server sessions)
* Passwords stored using BCrypt

### 🧑‍💼 Authorization

* Function/permission-based access control
* Spring Security + `@PreAuthorize`
* Authorities embedded inside JWT

### 🏢 Multi-Tenancy

* Each tenant is logically isolated
* Users, Groups, and Functions are tenant-scoped
* JWT carries `tenantId` claim

### 👑 Admin Levels

| Role         | Scope      | Capabilities                                  |
| ------------ | ---------- | --------------------------------------------- |
| SYSTEM_ADMIN | Global     | Manage tenants                                |
| TENANT_ADMIN | Per-tenant | Manage users, groups, functions inside tenant |

---

## 🧱 Architecture

```
Client → API Gateway → Auth Service → Other Microservices
```

Other services validate JWT and trust authorities issued by Auth Service.

---

## 📦 Tech Stack

* Java 17+
* Spring Boot 3+
* Spring Security
* Spring Data JPA
* PostgreSQL
* JWT (jjwt)
* Lombok

---

## 📂 Project Structure

```
auth-service
├── config        → Security configuration
├── security      → JWT filter + token logic
├── controller    → REST APIs
├── service       → Business logic
├── repository    → JPA repositories
├── entity        → Database models
├── dto           → Request/response models
```

---

## 🗄️ Data Model

### Core Entities

| Entity            | Description                   |
| ----------------- | ----------------------------- |
| Tenant            | Organization using the system |
| User              | User belonging to a tenant    |
| UserGroup         | Role-like grouping of users   |
| Function          | Permission / action           |
| UserUserGroup     | User ↔ Group mapping          |
| UserGroupFunction | Group ↔ Function mapping      |

---

### Permission Flow

```
User → Groups → Functions → JWT Authorities
```

---

## 🔑 SYSTEM ADMIN (Global)

Configured in `application.properties`:

```properties
system.admin.email=sysadmin@company.com
system.admin.password=ChangeMe123
system.admin.authority=SYSTEM_ADMIN
```

SYSTEM_ADMIN:

* Exists only in configuration (not DB)
* Can create/update/delete tenants
* JWT does NOT contain tenantId

---

## 🏢 Tenant Bootstrap

When a new tenant is created:

1. `TENANT_ADMIN` function is created
2. `TENANT_ADMIN_GROUP` is created
3. Function is mapped to group
4. Default admin user is created:

   ```
   admin@<tenant>.com
   password: ChangeMe123
   ```
5. User is mapped to admin group

---

## 🔐 JWT Structure

### Tenant User

```json
{
  "sub": "admin@acme.com",
  "tenantId": 1,
  "authorities": ["TENANT_ADMIN"]
}
```

### System Admin

```json
{
  "sub": "sysadmin@company.com",
  "authorities": ["SYSTEM_ADMIN"]
}
```

---

## 🔌 APIs

### 🔓 Public

| Method | Endpoint      | Description       |
| ------ | ------------- | ----------------- |
| POST   | `/auth/login` | Login and get JWT |

---

### 👑 SYSTEM ADMIN APIs

| Method | Endpoint            | Authority    |
| ------ | ------------------- | ------------ |
| POST   | `/api/tenants`      | SYSTEM_ADMIN |
| PUT    | `/api/tenants/{id}` | SYSTEM_ADMIN |
| DELETE | `/api/tenants/{id}` | SYSTEM_ADMIN |

---

### 🏢 TENANT ADMIN APIs

| Resource  | Authority    |
|-----------|--------------|
| Users     | TENANT_ADMIN |
| Groups    | TENANT_ADMIN |
| Functions | TENANT_ADMIN |

---

## 🧪 Login Examples

### System Admin

```json
{
  "email": "sysadmin",
  "password": "sys@123"
}
```

### Tenant Admin

```json
{
  "tenantId": 1,
  "email": "admin@acme.com",
  "password": "ChangeMe123"
}
```

---

## 🛠️ How to Run

1. Start PostgreSQL
2. Configure DB in `application.properties`
3. Run:

```bash
./mvnw spring-boot:run
```

---

## 🔒 Security Design Principles

* No sessions → JWT only
* Tenant isolation via `tenantId`
* Authority-based endpoint security
* Global admin separated from tenant users

---

## 🌍 Future Enhancements

* Refresh tokens
* Redis token blacklist (logout)
* Audit logs
* API Gateway integration
* Permission caching
* MFA support

---

## 📌 Use Case

Designed as a **central IAM service** for microservices-based SaaS platforms.

---

## 👨‍💻 Author

Durgesh Kumar
Backend / Distributed Systems / IAM Design
