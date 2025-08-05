          TOKENS-IN-DATABASE


## **1. Storing Refresh Tokens Securely in a Database**

To securely store refresh tokens:
- Store **hashed refresh tokens** in the database for extra security.
- Associate tokens with users and set expiration dates.
- Clean up expired tokens periodically.

### **Database Schema**
```javascript
const mongoose = require('mongoose');

const RefreshTokenSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true }, // Hashed refresh token
    expiresAt: { type: Date, required: true }, // Expiry date
});

module.exports = mongoose.model('RefreshToken', RefreshTokenSchema);
```

---

### **storeRefreshToken Function Implementation**
This function hashes the refresh token and stores it in the database.

```javascript
const crypto = require('crypto');
const RefreshToken = require('../models/RefreshToken');

const storeRefreshToken = async (userId, refreshToken) => {
    const hashedToken = crypto.createHash('sha256').update(refreshToken).digest('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Set expiration to 7 days

    const newToken = new RefreshToken({
        userId,
        token: hashedToken,
        expiresAt,
    });

    await newToken.save();
};

module.exports = { storeRefreshToken };
```

---

### **Verifying Refresh Tokens**
When a user requests a new access token, verify the refresh token by matching its hash.

```javascript
const verifyRefreshToken = async (userId, refreshToken) => {
    const hashedToken = crypto.createHash('sha256').update(refreshToken).digest('hex');
    const storedToken = await RefreshToken.findOne({ userId, token: hashedToken });

    if (!storedToken || storedToken.expiresAt < new Date()) {
        throw new Error('Invalid or expired refresh token');
    }

    return true;
};
```

---

## **2. JWT with Refresh Tokens**

### **Generate Access and Refresh Tokens**
```javascript
const jwt = require('jsonwebtoken');

const generateTokens = (user) => {
    const accessToken = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
        { id: user._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
};
```

---

### **Login Route**
```javascript
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Validate user credentials (e.g., using bcrypt)
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const { accessToken, refreshToken } = generateTokens(user);

    // Store refresh token securely
    await storeRefreshToken(user._id, refreshToken);

    res.json({ accessToken, refreshToken });
});
```

---

### **Refresh Token Route**
```javascript
router.post('/token', async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token required' });
    }

    try {
        // Decode and verify refresh token
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        // Verify refresh token in the database
        await verifyRefreshToken(decoded.id, refreshToken);

        // Generate new access token
        const accessToken = jwt.sign(
            { id: decoded.id },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );

        res.json({ accessToken });
    } catch (err) {
        res.status(403).json({ message: 'Invalid refresh token' });
    }
});
```

---

## **3. API Gateway for Security**

Use **Kong** or **AWS API Gateway** to:
- Manage authentication.
- Enforce rate limits.
- Terminate SSL connections.

### Kong
1. Install Kong Gateway.
2. Set up authentication plugins:
   ```bash
   curl -X POST http://localhost:8001/services \
        --data "name=my-service" \
        --data "url=http://my-api.com"

   curl -X POST http://localhost:8001/services/my-service/routes \
        --data "paths[]=/api"

   curl -X POST http://localhost:8001/services/my-service/plugins \
        --data "name=key-auth"
   ```
3. Configure rate limiting:
   ```bash
   curl -X POST http://localhost:8001/services/my-service/plugins \
        --data "name=rate-limiting" \
        --data "config.minute=10"
   ```

---

## **4. Regular Security Audits with OWASP ZAP**

### **Automate Security Scans with GitHub Actions**
```yaml
name: Security Scan

on: push

jobs:
  zap-scan:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: OWASP ZAP Full Scan
        uses: zaproxy/action-full-scan@v1
        with:
          target: "http://localhost:5000" # Replace with your API URL
          rules_file: zap-rules.txt
```

---

## **5. Server-Side and User-Side Security**

### **A. Server-Side Security**
1. **Enforce HTTPS**:
   - Redirect all HTTP traffic to HTTPS.
   ```javascript
   app.use((req, res, next) => {
       if (!req.secure) {
           return res.redirect(`https://${req.headers.host}${req.url}`);
       }
       next();
   });
   ```

2. **Custom Security Policies (CSP)**:
   - Use Helmet.js to configure CSP.
   ```javascript
   app.use(helmet.contentSecurityPolicy({
       directives: {
           defaultSrc: ["'self'"],
           scriptSrc: ["'self'", "'unsafe-inline'"],
           styleSrc: ["'self'", "https:"],
           imgSrc: ["'self'", "data:"],
       },
   }));
   ```

3. **SSL Certificates**:
   - Use Let’s Encrypt to obtain and configure SSL certificates.
   ```bash
   sudo apt install certbot
   sudo certbot --nginx
   ```

4. **Authentication and Authorization**:
   - Enforce JWT-based authentication and RBAC:
   ```javascript
   const checkRole = (role) => (req, res, next) => {
       if (req.user.role !== role) {
           return res.status(403).json({ message: 'Access denied' });
       }
       next();
   };
   ```

---

### **B. User-Side Security**
1. **XSS Protection**:
   - Escape user inputs and use CSP to block malicious scripts.
2. **Secure Token Storage**:
   - Store access tokens in **HTTP-only cookies** instead of local storage.
3. **Session Timeout**:
   - Force token renewal after a certain period:
   ```javascript
   setTimeout(() => {
       alert('Your session has expired. Please log in again.');
       window.location.href = '/login';
   }, 15 * 60 * 1000); // 15 minutes
   ```

---

## **6. Summary of Best Practices**
- **Token Management**:
  - Use short-lived access tokens and securely stored refresh tokens.
- **API Security**:
  - Use gateways like Kong or AWS API Gateway for rate limiting and SSL termination.
- **Server Security**:
  - Enforce HTTPS, use CSP headers, and implement XSS protection.
- **Audits**:
  - Automate vulnerability scans with OWASP ZAP and GitHub Actions.


---

## **1. Configuring OWASP ZAP for Automated Scans**

OWASP ZAP (Zed Attack Proxy) is a popular tool for automated security testing of web applications.

### **Step 1: Install OWASP ZAP**
1. Download OWASP ZAP:
   - [OWASP ZAP Download Page](https://www.zaproxy.org/download/)
2. Install it on your system:
   ```bash
   sudo apt install zaproxy  # For Linux
   brew install zaproxy     # For macOS
   ```

---

### **Step 2: Configure OWASP ZAP for Automated Scans**

#### **Run OWASP ZAP from a Command Line**
1. Start OWASP ZAP in headless mode (no GUI):
   ```bash
   zap.sh -daemon -port 8080 -config api.key=your-api-key
   ```
   - Replace `your-api-key` with a secure key for the OWASP ZAP API.

2. Verify that ZAP is running:
   - Navigate to `http://localhost:8080`.

---

#### **Automate Scans Using GitHub Actions**
Use the OWASP ZAP GitHub Action for continuous security scans.

```yaml
name: OWASP ZAP Scan

on:
  push:
    branches:
      - main

jobs:
  zap-scan:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: OWASP ZAP Full Scan
        uses: zaproxy/action-full-scan@v1
        with:
          target: "http://localhost:5000" # Replace with your app's URL
          rules_file: zap-rules.txt
          api_key: "${{ secrets.ZAP_API_KEY }}"
          report: true
```

---

#### **OWASP ZAP API Automation**
You can also control OWASP ZAP using its REST API.

**Example: Start a Scan Using the API**
```bash
curl "http://localhost:8080/JSON/ascan/action/scan/?url=http://your-app-url&apikey=your-api-key"
```

**Retrieve Scan Results**
```bash
curl "http://localhost:8080/JSON/core/view/alerts/?baseurl=http://your-app-url&apikey=your-api-key"
```

---

### **Step 3: Customize OWASP ZAP Rules**
1. Create a file (`zap-rules.txt`) to ignore specific rules or adjust alert thresholds:
   ```
   10036 IGNORE  # Disable CSP-related alerts
   40012 WARN    # Set XSS alerts to warning level
   ```

---

### Resources
- [OWASP ZAP Documentation](https://www.zaproxy.org/docs/)
- [OWASP ZAP GitHub Action](https://github.com/
