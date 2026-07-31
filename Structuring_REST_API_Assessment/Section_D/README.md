# Section D – AI Augmented Learning

## Student Name

Your Name

---

## AI Tool Used

ChatGPT

---

## Prompt Given

See **prompts.txt**

---

## How to Run

```bash
npm install
node app.js
```

Server runs on

```
http://localhost:3000
```

---

## API Endpoint

### POST /api/orders

### Valid Request

```json
{
    "customerId":"C101",
    "restaurantId":"R201",
    "menuItems":["M1","M2"]
}
```

### Valid Response

```json
{
    "success": true,
    "message":"Order token generated successfully.",
    "token":"eyJhbGc..."
}
```

---

### Invalid Request

```json
{
    "customerId":"C101",
    "restaurantId":"R201",
    "menuItems":[]
}
```

### Invalid Response

```json
{
    "error": true,
    "message":"menuItems must contain at least one item."
}
```

---

# AI Original Bug

The AI-generated code only checked if `menuItems` existed but did not verify that it contained at least one item.

---

# My Fix

I added:

- Validation to ensure `menuItems` is an array.
- Validation to ensure `menuItems` contains at least one item.
- Type validation for `customerId` and `restaurantId`.
- Improved success and error responses.

This makes the endpoint comply with the assignment requirements.