NGINIX [LOAD BALANCER-'FRONTEND'- & REVERSE PROXY]

## ⚙️ 1. Load Balancer Middleware

**Tool**: NGINX or HAProxy  
**Use Case**: Distribute incoming API requests across multiple backend instances.

### Example NGINX Config:
```nginx
http {
  upstream backend_servers {
    server backend1.example.com;
    server backend2.example.com;
  }

  server {
    listen 80;
    location /api/ {
      proxy_pass http://backend_servers;
    }
  }
}
