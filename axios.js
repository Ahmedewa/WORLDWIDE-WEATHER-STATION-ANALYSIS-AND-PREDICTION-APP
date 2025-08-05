                AXIOS.JS[MIDDLEWARE]

## 📡 2. Axios.js Middleware

**Tool**: `axios-middleware` or custom interceptors  
**Use Case**: Add request/response interceptors for logging, error handling, and retries.

### Example Setup:
```ts
import axios from 'axios';

axios.interceptors.request.use(config => {
  console.log('Request:', config);
  return config;
});

axios.interceptors.response.use(
  response => response,
  error => {
    console.error('Error:', error);
    return Promise.reject(error);
  }
);
```
