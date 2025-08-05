CODE COVERAGE

### 🧪 Run Tests with Coverage
```bash
ng test --code-coverage
```

### 📁 View Report
Open `coverage/index.html` in your browser.

### 🔒 Enforce Minimum Coverage
Edit `karma.conf.js`:
```js
coverageReporter: {
  check: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80
    }
  }
}
```
