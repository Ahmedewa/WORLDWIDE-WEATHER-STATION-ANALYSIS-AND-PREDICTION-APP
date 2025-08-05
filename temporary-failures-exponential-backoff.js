HANDLING TEMPORARY FAILURES[EXPONENTIAL-BACK-OFF WITH JITTER]

### **2. Temporary and Permanent Failures**

#### **Handling Temporary Failures**
Implement retry mechanisms:

1. **Exponential Backoff with Jitter**:
   ```javascript
   const retryWithBackoff = async (fn, retries = 5) => {
       for (let i = 0; i < retries; i++) {
           try {
               return await fn();
           } catch (err) {
               const delay = Math.pow(2, i) * 100 + Math.random() * 100;
               console.log(`Retrying in ${delay}ms`);
               await new Promise(res => setTimeout(res, delay));
           }
       }
       throw new Error("Max retries reached");
   };
   ```

---

