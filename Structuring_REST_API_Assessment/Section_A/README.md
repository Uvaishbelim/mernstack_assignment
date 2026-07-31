# Section A — Concept Application

## Q1. Async/Await vs Nested Callbacks

### Scenario
You are building an order-tracking feature for a food delivery app. The current implementation fetches order status, driver location, and restaurant updates using three nested callback functions, making the code difficult to read and maintain.

### Answer

Nested callbacks create **callback hell**, where the code becomes deeply nested and difficult to understand. Refactoring to **async/await** makes asynchronous code look like synchronous code, improving readability and maintainability.

Using `await`, each asynchronous operation executes in sequence without excessive nesting. Error handling is also improved because a single `try...catch` block can catch errors from all awaited operations instead of handling errors in multiple callback functions.

### Advantages

- Improves code readability.
- Eliminates callback hell.
- Simplifies debugging.
- Uses a single `try...catch` block for error handling.
- Makes code easier to maintain and extend.

---

## Q2. Error Handling in Async Payment Module

### Scenario
You are building the payment processing module for a food delivery platform. The payment gateway can timeout, reject transactions, or return unexpected responses.

### Answer

The payment processing function should use `async/await` inside a `try...catch` block. Any network error, timeout, rejected transaction, or unexpected gateway response should be caught and handled properly.

Instead of allowing the server to crash, the application should return an appropriate HTTP error response (such as **500 Internal Server Error** or **502 Bad Gateway**) along with a descriptive message. Errors should also be logged on the server for debugging purposes.

### Benefits

- Prevents server crashes.
- Handles all asynchronous errors gracefully.
- Returns meaningful responses to clients.
- Improves application reliability.

---

## Q3. Custom Express Logger Middleware

### Scenario
Every incoming API request should be logged with its HTTP method, URL, timestamp, and response time.

### Answer

A custom logging middleware should record:

- HTTP Method
- Request URL
- Timestamp
- Response Time

The middleware records the request start time, calls `next()`, and logs the total response time after the response finishes.

```javascript
const loggerMiddleware = (req, res, next) => {

    const start = Date.now();

    res.on("finish", () => {

        const responseTime = Date.now() - start;

        console.log(
            `${req.method} ${req.originalUrl} ${new Date().toISOString()} ${responseTime}ms`
        );

    });

    next();
};

app.use(loggerMiddleware);
```

### Why place it first?

The middleware should be registered **before authentication and all route handlers** so that every request is logged, including requests rejected by authentication or validation middleware.

---

## Q4. MVC Architecture

### Scenario
The same restaurant endpoints are used by both the mobile application and the admin panel.

### Answer

The application should follow the **MVC (Model-View-Controller)** architecture.

### Structure

```
project/
│
├── routes/
│   └── restaurantRoutes.js
│
├── controllers/
│   └── restaurantController.js
│
├── models/
│   └── Restaurant.js
│
└── app.js
```

### Responsibilities

**Routes**
- Define API endpoints.

**Controllers**
- Contain business logic.

**Models**
- Manage application data.

### Advantages

- Better code organization.
- Reusable business logic.
- Easier maintenance.
- Easier testing.
- Supports multiple clients without duplicating code.

---

## Q5. JWT Authentication

### Scenario
Only authenticated customers should be allowed to place orders.

### Answer

JWT (JSON Web Token) enables **stateless authentication**.

After a successful login:

1. The server generates a signed JWT.
2. The client stores the token.
3. The client sends the token in:

```
Authorization: Bearer <token>
```

4. The server verifies the token on every request.

### Store in JWT

- User ID
- Email
- User Role
- Issue Time (`iat`)
- Expiration Time (`exp`)

### Never Store

- Passwords
- Credit Card Details
- OTPs
- Secret Keys
- Sensitive Personal Information

JWT payloads are **encoded, not encrypted**, so sensitive information should never be included.

---

## Q6. Multer File Upload Validation

### Scenario

Restaurant owners can upload menu images and PDF menus.

### Answer

Multer should enforce:

- Allowed file types (`.jpg`, `.png`, `.pdf`)
- Maximum file size of **2 MB**

Example:

```javascript
const multer = require("multer");

const upload = multer({

    limits: {
        fileSize: 2 * 1024 * 1024
    },

    fileFilter(req, file, cb) {

        const allowed = [
            "image/jpeg",
            "image/png",
            "application/pdf"
        ];

        if (allowed.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only JPG, PNG, and PDF files are allowed."));
        }
    }

});
```

### Why Server-Side Validation?

Frontend validation alone is **not secure** because users can bypass it using tools such as:

- Postman
- cURL
- Custom scripts
- Modified browser requests

Server-side validation:

- Protects against malicious uploads.
- Prevents unsupported file types.
- Enforces file size limits.
- Improves application security.
- Ensures consistent validation regardless of the client.

---

# Conclusion

This section demonstrates the application of core Node.js and Express.js concepts including:

- Async/Await
- Error Handling
- Express Middleware
- MVC Architecture
- JWT Authentication
- Multer File Upload Validation

These concepts are fundamental for building secure, scalable, and maintainable backend applications.