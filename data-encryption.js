             DATA ENCRPTION

#### **Data Encryption**
- **Enable HTTPS** and redirect all HTTP traffic:
   ```javascript
   const enforceHTTPS = (req, res, next) => {
       if (!req.secure) {
           return res.redirect(`https://${req.headers.host}${req.url}`);
       }
       next();
   };

   app.use(enforceHTTPS);
   ```

- Secure your API endpoints with **TLS/SSL certificates** (e.g., using Let’s Encrypt).

---

