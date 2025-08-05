UI TESTING WITH -SELENIUM

 UI Testing (Selenium or Cypress)**

#### **Selenium (Code  for Login Test)**
1. Install Selenium:
   ```bash
   pip install selenium
   ```
2. Code :
   ```python
   from selenium import webdriver
   from selenium.webdriver.common.by import By
   from selenium.webdriver.common.keys import Keys

   driver = webdriver.Chrome()

   # Open the login page
   driver.get("http://localhost:3000/login")

   # Fill login form
   driver.find_element(By.ID, "username").send_keys("testuser")
   driver.find_element(By.ID, "password").send_keys("password123")
   driver.find_element(By.ID, "submit").click()

   # Assert login success
   assert "Welcome" in driver.page_source

   driver.quit()
   ```

---

