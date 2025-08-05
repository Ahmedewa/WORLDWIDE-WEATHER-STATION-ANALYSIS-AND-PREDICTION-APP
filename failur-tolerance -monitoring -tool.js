FAILURE TOLERANCE MONITORING TOOLS[ GRAFANA & PROMETHEUS]-

## **B) FAILURE TOLERANCE**

### **1. Failure Detection Mechanisms**

#### **Monitoring Tools**
1. **Grafana** for Visualization:
   - Query metrics (e.g., API response times, error rates) from **Prometheus**.
   - Example Grafana Query:
     ```
     rate(http_requests_total[5m])
     ```

2. **Prometheus for Metrics Collection**:
   -  Configuration:
     ```yaml
     scrape_configs:
       - job_name: "node"
         static_configs:
           - targets: ["localhost:9090"]
     ```

---

