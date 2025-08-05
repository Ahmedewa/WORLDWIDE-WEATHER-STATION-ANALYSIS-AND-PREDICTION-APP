               INPUT VALIDATION & SANITATION[via 'EXPRESS-VALIDATION']

#### **Input Validation and Sanitization**
- Validate and sanitize inputs using libraries like **express-validator** or **Joi**:
   ```javascript
   const { body, validationResult } = require("express-validator");

   router.post(
       "/api/data",
       body("email").isEmail().withMessage("Invalid email address"),
       (req, res) => {
           const errors = validationResult(req);
           if (!errors.isEmpty()) {
               return res.status(400).json({ errors: errors.array() });
           }
           res.json({ message: "Input validated" });
       }
   );
   ```

---

re API     
