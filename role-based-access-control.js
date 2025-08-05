           RBAC[ROLE-BASED-ACCESS-CONTROL]

### **3. API Security Measures (Best Practices)**

#### **1. Authentication and Authorization**
- Use **OAuth 2.0** for secure third-party authentication.
- Implement **JWT** for token-based authentication.
- Apply **Role-Based Access Control (RBAC)** to restrict sensitive data access:
  ```javascript
  const checkRole = (role) => (req, res, next) => {
      if (req.user.role !== role) {
          return res.status(403).json({ error: "Access denied" });
      }
      next();
  };

  router.get("/admin", checkRole("admin"), (req, res) => {
      res.json({ message: "Admin access granted" });
  });
  ```

---

