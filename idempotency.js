           IDEMPOTENCY DESIGN


## 🔁 2. Idempotency Design

Idempotency ensures that repeated actions (e.g., API calls) produce the same result. Here's how to implement it:

### ✅ Best Practices
- Use **idempotency keys** for POST requests.
- Prefer **PUT/DELETE** for operations that should be idempotent.
- Store processed request IDs in the backend to prevent duplicates.

### 🧠  (Node.js Backend)
```ts
const processedRequests = new Set();

app.post('/api/weather-alert', (req, res) => {
  const key = req.headers['idempotency-key'];
  if (processedRequests.has(key)) {
    return res.status(200).send({ message: 'Already processed' });
  }
  processedRequests.add(key);
  // Process alert logic
  res.status(201).send({ message: 'Alert created' });
});
```




