         MONITORING  & LOGGING[USING 'WINSTON']



Monitoring and Logging**
- Use **Winston** for logging:
   ```javascript
   const winston = require("winston");

   const logger = winston.createLogger({
       level: "info",
       format: winston.format.json(),
       transports: [
           new winston.transports.File({ filename: "error.log", level: "error" }),
           new winston.transports.Console(),
       ],
   });
   ```

- Monitor APIs with tools like **Postman API Gateway** or **Datadog**.

---

#### **6. Secu
