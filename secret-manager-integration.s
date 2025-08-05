       SECRET MANAGER INTEGRATION  


## 🔐 3. Secrets Manager Integration

Avoid hardcoding secrets like API keys. Use cloud-based secrets managers:

### 🔑 Options
| Provider | Integration Method |
|----------|--------------------|
| **AWS Secrets Manager** | Use AWS SDK in backend to fetch secrets |
| **Azure Key Vault** | Use REST API or Azure SDK |
| **HashiCorp Vault** | Use Vault CLI or HTTP API |

### 🧪 Angular Strategy
- Store secrets in environment variables during build.
- Use Angular’s `environment.ts` for non-sensitive config.
- Use a proxy/backend to fetch secrets securely.

### 🧬 Example (Environment Setup)
```ts
// environment.ts
export const environment = {
  production: false,
  apiUrl: process.env['API_URL'] || 'http://localhost:3000'
};
```
