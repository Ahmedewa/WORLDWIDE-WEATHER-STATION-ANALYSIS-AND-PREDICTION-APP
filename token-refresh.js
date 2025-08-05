
    STORE-REFRESH-TOKENS

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

