   CIRCUIT BREAKER PATTERN-FOR-FAILURE-TOLERANCE

### **3. Circuit Breaker Pattern**
Use a library like **opossum**.

```bash
npm install opossum
```

Code:
```javascript
const CircuitBreaker = require("opossum");

const options = {
    timeout: 3000, // If the function takes longer than 3 seconds, trigger a failure
    errorThresholdPercentage: 50, // Break if 50% of requests fail
    resetTimeout: 10000, // Reset after 10 seconds
};

const breaker = new CircuitBreaker(asyncFunction, options);

breaker.on("open", () => console.log("Circuit breaker is open"));
breaker.on("close", () => console.log("Circuit breaker is closed"));

breaker.fire().catch(err => console.error(err));
```

---

