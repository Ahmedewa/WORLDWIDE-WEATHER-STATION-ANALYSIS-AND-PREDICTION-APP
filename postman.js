TESTING WITH POSTMAN

**1. Postman (API Testing)**

Postman is a powerful tool for testing API endpoints by sending HTTP requests and automating test collections.

#### **Manually Test API Endpoints**
1. Open Postman and create a **new request**.
   - Method: `POST`
   - URL: `http://localhost:5000/api/login`
   - Headers:
     ```json
     {
       "Content-Type": "application/json"
     }
     ```
   - Body (JSON):
     ```json
     {
       "username": "testuser",
       "password": "password123"
     }
     ```
2. Click **Send** and review the response.

---

#### **Save Test Collections for Automation**
1. Create a **collection** in Postman.
2. Add test scripts to validate responses. Example:
   ```javascript
   pm.test("Status code is 200", function () {
       pm.response.to.have.status(200);
   });

   pm.test("Response contains access token", function () {
       pm.response.to.have.jsonBody("accessToken");
   });
   ```
3. Run the collection using the **Collection Runner** or export it as a JSON file for CI/CD pipelines.

---

#### **Automated Postman Tests with Newman**
1. Install Newman:
   ```bash
   npm install -g newman
   ```
2. Run the collection:
   ```bash
   newman run your-collection.json
   ```

---

