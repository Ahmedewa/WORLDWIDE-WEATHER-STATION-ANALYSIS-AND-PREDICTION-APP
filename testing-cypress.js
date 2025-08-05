   CYPRESS TESTING[LOGIN TEST]


#### **Cypress (Code for Login Test)**
1. Install Cypress:
   ```bash
   npm install cypress --save-dev
   ```
2. Code Example:
   ```javascript
   describe("Login Test", () => {
     it("Should log in the user", () => {
       cy.visit("http://localhost:3000/login");
       cy.get("#username").type("testuser");
       cy.get("#password").type("password123");
       cy.get("#submit").click();
       cy.contains("Welcome");
     });
   });
   ```
3. Run Cypress:
   ```bash
   npx cypress open
   ```

---

