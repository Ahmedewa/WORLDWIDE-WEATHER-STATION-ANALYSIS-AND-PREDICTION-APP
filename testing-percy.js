VIVISAUL REGRESSION TESTING[PERCY OR APPLITOOLS]


### **Visual Regression Testing (Percy.io or Applitools)**

#### **Percy.io Integration with Cypress**
1. Install Percy:
   ```bash
   npm install --save-dev @percy/cypress
   ```
2. Add Percy Commands:
   ```javascript
   import "@percy/cypress";
   ```
3. Code Example:
   ```javascript
   describe("Visual Test", () => {
     it("Should look the same", () => {
       cy.visit("http://localhost:3000");
       cy.percySnapshot("Home Page");
     });
   });
   ```
4. Run Percy:
   ```bash
   npx percy exec -- cypress run
   ```

