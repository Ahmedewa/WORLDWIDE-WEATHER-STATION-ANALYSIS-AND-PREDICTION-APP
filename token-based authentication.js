             JWT TOKENS

4. **Generate JWT Tokens**:
   ```javascript
   const jwt = require("jsonwebtoken");

   const generateToken = (user) => {
       return jwt.sign({ id: user.id }, "your_secret_key", { expiresIn: "1h" });
   };
   ```

5. **Benefits**:
   - Supports token-based authentication.
   - Easily integrates with OAuth 2.0 for external logins (e.g., Google, Facebook).

---

